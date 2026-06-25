/**
 * generate-blog-post.mjs
 *
 * Reads the blog queue, picks the first pending topic, generates a 1,500–2,500 word
 * blog post using the Anthropic API, writes it to a new tab in the blog draft
 * Google Doc, updates blog-queue.json, and sends an optional notification email.
 *
 * Env vars required:
 *   GOOGLE_SERVICE_ACCOUNT_KEY  — JSON string of service account credentials
 *   ANTHROPIC_API_KEY           — Anthropic API key
 *   BLOG_DRAFT_DOC_ID           — Google Doc ID for blog drafts (tab per post)
 *   PUBLISH_SECRET              — Secret for HMAC publish token
 *
 * Env vars optional:
 *   NOTIFICATION_EMAIL          — Email address for notifications
 *   RESEND_API_KEY              — Resend API key (email skipped if absent)
 *   SITE_URL                    — Defaults to https://growthmindsetparenting.com
 */

import { google } from 'googleapis';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHmac } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const QUEUE_FILE = join(ROOT, 'content/blog-queue.json');
const VOICE_RULES_FILE = join(__dirname, 'blogger-reference/voice_rules.md');
const SEO_GUIDELINES_FILE = join(__dirname, 'blogger-reference/seo_guidelines.md');

const SITE_URL = process.env.SITE_URL ?? 'https://growthmindsetparenting.com';

async function main() {
  // ── 1. Read the queue ────────────────────────────────────────────────────────
  const queueData = JSON.parse(readFileSync(QUEUE_FILE, 'utf8'));
  const topic = queueData.queue.find(e => e.status === 'pending');
  if (!topic) {
    console.log('Queue empty — no pending topics. Nothing to do.');
    return;
  }
  console.log(`Processing topic: "${topic.title}" (id: ${topic.id})`);

  // ── 2. Read reference docs ───────────────────────────────────────────────────
  const voiceRules = readFileSync(VOICE_RULES_FILE, 'utf8');
  const seoGuidelines = readFileSync(SEO_GUIDELINES_FILE, 'utf8');

  // ── 2b. Load writing examples from letters.js ────────────────────────────────
  const { LETTERS } = await import(join(ROOT, 'content/letters.js'));
  const exampleTexts = LETTERS.slice(0, 3)
    .map(letter => letter.body.join('\n\n'))
    .join('\n\n');

  // ── 3. Build prompts ─────────────────────────────────────────────────────────
  const systemPrompt = [
    'You are a ghost-writer for Sean Kane, creator of Growth Mindset Parenting.',
    'You write blog posts for growthmindsetparenting.com.',
    '',
    '=== VOICE RULES ===',
    voiceRules,
    '',
    '=== SEO GUIDELINES ===',
    seoGuidelines,
  ].join('\n');

  const userPrompt = [
    'Write a blog post for growthmindsetparenting.com on this topic:',
    '',
    `Title: ${topic.title}`,
    `Primary keyword: ${topic.keyword}`,
    `Skill tag: ${topic.topic}`,
    '',
    "Here are recent examples of Sean's writing to match his voice:",
    '',
    '---',
    exampleTexts,
    '---',
    '',
    'Requirements:',
    '- 1,500–2,500 words',
    "- Follow Sean's voice exactly (see system prompt)",
    '- Follow SEO guidelines (see system prompt)',
    '- Output format: Return ONLY the blog post content as paragraphs separated by blank lines.',
    '  Start with a scene-opening paragraph (no title heading — the title is separate).',
    '  Use ## for H2 subheadings and ### for H3 subheadings where appropriate.',
    '  Do not include a title line at the top.',
  ].join('\n');

  // ── 4. Call Anthropic API ────────────────────────────────────────────────────
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) throw new Error('ANTHROPIC_API_KEY env var is not set');

  console.log('Calling Anthropic API (claude-sonnet-4-6)...');
  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!anthropicRes.ok) {
    const errText = await anthropicRes.text();
    throw new Error(`Anthropic API error ${anthropicRes.status}: ${errText}`);
  }

  const anthropicData = await anthropicRes.json();
  const blogPost = anthropicData.content?.[0]?.text;
  if (!blogPost) throw new Error('No content returned from Anthropic API');

  const wordCount = blogPost.split(/\s+/).filter(Boolean).length;
  console.log(`Generated ~${wordCount} words`);

  // ── 5. Write to Google Docs ──────────────────────────────────────────────────
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env var is not set');

  const docId = process.env.BLOG_DRAFT_DOC_ID;
  if (!docId) throw new Error('BLOG_DRAFT_DOC_ID env var is not set');

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(keyJson),
    scopes: ['https://www.googleapis.com/auth/documents'],
  });
  const docs = google.docs({ version: 'v1', auth });

  // Write content into the pre-assigned draft doc (created ahead of time by Katie's account)
  const draftDocId = topic.draftDocId;
  if (!draftDocId) throw new Error(`No draftDocId assigned for topic ${topic.id} — add it to blog-queue.json`);
  console.log(`Writing to pre-assigned doc ${draftDocId}...`);

  await docs.documents.batchUpdate({
    documentId: draftDocId,
    requestBody: {
      requests: [{ insertText: { location: { index: 1 }, text: blogPost.trim() } }],
    },
  });
  console.log(`Doc ready: https://docs.google.com/document/d/${draftDocId}/edit`);

  // ── 6. Update blog-queue.json ────────────────────────────────────────────────
  const generatedAt = new Date().toISOString();
  topic.status = 'generated';
  topic.generatedAt = generatedAt;
  writeFileSync(QUEUE_FILE, JSON.stringify(queueData, null, 2) + '\n');
  console.log('blog-queue.json updated.');

  // ── 7. Build publish URL ─────────────────────────────────────────────────────
  if (!process.env.PUBLISH_SECRET) throw new Error('PUBLISH_SECRET env var is not set');
  const publishSecret = process.env.PUBLISH_SECRET;
  const hmac = createHmac('sha256', publishSecret).update(String(topic.id)).digest('hex');
  const publishUrl = `${SITE_URL}/api/publish-post?id=${topic.id}&token=${hmac}`;
  const draftDocUrl = `https://docs.google.com/document/d/${draftDocId}/edit`;

  // ── 8. Send notification email (optional) ────────────────────────────────────
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.log('Email skipped: RESEND_API_KEY not configured');
  } else {
    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    if (!notificationEmail) {
      console.warn('Email skipped: NOTIFICATION_EMAIL not configured');
    } else {
      const emailText = [
        'Sean,',
        '',
        'Your blog draft is ready for review.',
        '',
        `Topic: ${topic.title}`,
        `Keyword: ${topic.keyword}`,
        '',
        `View Draft in Google Docs: ${draftDocUrl}`,
        '',
        `Publish to Website: ${publishUrl}`,
        '',
        'The Blogger',
      ].join('\n');

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'The Blogger <blogger@growthmindsetparenting.com>',
          to: notificationEmail,
          subject: `New blog draft ready: ${topic.title}`,
          text: emailText,
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.warn(`Email send failed (${emailRes.status}): ${errText}`);
      } else {
        console.log(`Notification email sent to ${notificationEmail}`);
      }
    }
  }

  // ── 9. Summary ───────────────────────────────────────────────────────────────
  console.log(`\nDone! Blog post "${topic.title}" drafted successfully.`);
  console.log(`Draft doc: ${draftDocUrl}`);
  console.log(`Publish URL: ${publishUrl}`);
}

// When GENERATE_ALL=true, loop until every pending topic is generated
if (process.env.GENERATE_ALL === 'true') {
  (async () => {
    let count = 0;
    while (true) {
      const q = JSON.parse(readFileSync(QUEUE_FILE, 'utf8'));
      const pending = q.queue.find(e => e.status === 'pending');
      if (!pending) { console.log(`\nAll done — generated ${count} post(s).`); break; }
      console.log(`\n── Generating ${pending.id}/10: "${pending.title}" ──`);
      await main();
      count++;
    }
  })().catch(e => { console.error(e.message); process.exit(1); });
} else {
  main().catch(e => { console.error(e.message); process.exit(1); });
}
