/**
 * GET /api/publish-post?id={topicId}&token={hmacToken}
 *
 * One-click publish route. Sean clicks this link from his notification email.
 * Verifies the HMAC token, reads the generated blog draft from Google Docs,
 * prepends the post to content/letters.js, marks the queue entry published,
 * and commits both files via the GitHub Contents API (Vercel filesystem is
 * read-only at runtime, so we cannot git-push from here).
 *
 * Env vars required:
 *   PUBLISH_SECRET              — shared secret used to sign publish tokens
 *   GOOGLE_SERVICE_ACCOUNT_KEY  — JSON string of service account credentials
 *   BLOG_DRAFT_DOC_ID           — Google Doc ID for blog drafts
 *   GITHUB_PAT                  — fine-grained PAT with contents:write on gmp-website
 */

import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { google } from 'googleapis';

const REPO = 'Growth-Mindset-Parenting/gmp-website';
const GITHUB_API = 'https://api.github.com';

// ── Helpers copied exactly from scripts/sync-newsletters.mjs ─────────────────

/** Pull plain text out of a Google Docs body content array. */
function extractText(content) {
  const lines = [];
  for (const el of content || []) {
    if (el.paragraph) {
      const text = (el.paragraph.elements || [])
        .map(e => e.textRun?.content ?? '')
        .join('')
        .replace(/\n$/, '');
      lines.push(text);
    }
  }
  return lines.join('\n');
}

/** Serialise a letter object to a JS object literal for insertion into letters.js. */
function letterToJsBlock(l) {
  const bodyLines = l.body.map(p => `    ${JSON.stringify(p)},`).join('\n');
  return `  {
    slug: '${l.slug}',
    title: ${JSON.stringify(l.title)},
    date: '${l.date}',
    type: '${l.type}',
    topic: ${JSON.stringify(l.topic)},
    tag: '${l.tag}',
    readTime: '${l.readTime}',
    excerpt: ${JSON.stringify(l.excerpt)},
    dek: ${JSON.stringify(l.dek)},
    img: null,
    featured: false,
    related: [],
    body: [
${bodyLines}
    ],
  }`;
}

// ── GitHub Contents API helpers ───────────────────────────────────────────────

async function githubGetFile(path, githubPat) {
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${path}`, {
    headers: {
      Authorization: `Bearer ${githubPat}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!res.ok) throw new Error(`GitHub GET ${path} failed: ${res.status}`);
  return res.json(); // { sha, content (base64), ... }
}

async function githubPutFile(path, content, sha, message, githubPat) {
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${githubPat}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub PUT ${path} failed (${res.status}): ${errText}`);
  }
  return res.json();
}

// ── HTML response helper ──────────────────────────────────────────────────────

function htmlResponse(body, status = 200) {
  return new NextResponse(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

const HTML_401 = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Invalid Link</title>
<style>body{font-family:system-ui,sans-serif;max-width:480px;margin:80px auto;padding:0 24px;color:#1a1a1a}</style>
</head><body><h1>Invalid or expired publish link.</h1></body></html>`;

const HTML_404 = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Not Found</title>
<style>body{font-family:system-ui,sans-serif;max-width:480px;margin:80px auto;padding:0 24px;color:#1a1a1a}</style>
</head><body><h1>Post not found or not ready to publish.</h1></body></html>`;

const HTML_409 = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Already Published</title>
<style>body{font-family:system-ui,sans-serif;max-width:480px;margin:80px auto;padding:0 24px;color:#1a1a1a}</style>
</head><body><h1>This post has already been published.</h1></body></html>`;

function html500(message) {
  const escapedMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Error</title>
<style>body{font-family:system-ui,sans-serif;max-width:480px;margin:80px auto;padding:0 24px;color:#1a1a1a}</style>
</head><body><h1>Something went wrong: ${escapedMessage}</h1></body></html>`;
}

function htmlSuccess(title, slug, siteUrl) {
  const postUrl = `${siteUrl}/writing/${slug}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Post Published!</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 480px; margin: 80px auto; padding: 0 24px; color: #1a1a1a; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    p { color: #555; margin-bottom: 1.5rem; }
    a { color: #b45309; font-weight: 600; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Your post is live!</h1>
  <p>"${title}" has been published to the website.</p>
  <p><a href="${postUrl}">${postUrl} &rarr;</a></p>
  <p style="font-size:0.875rem;color:#888">Vercel will deploy the change in about 1 minute.</p>
</body>
</html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(request) {
  try {
    // 1. Read query params
    const { searchParams } = request.nextUrl;
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    if (!id || !token) {
      return htmlResponse(HTML_401, 401);
    }

    // 2. Verify HMAC using timingSafeEqual
    const publishSecret = process.env.PUBLISH_SECRET;
    if (!publishSecret) throw new Error('PUBLISH_SECRET env var is not set');

    const expectedHex = createHmac('sha256', publishSecret).update(id).digest('hex');

    // Both must be the same length for timingSafeEqual; expectedHex is always 64 chars.
    let tokenValid = false;
    if (token.length === expectedHex.length) {
      try {
        tokenValid = timingSafeEqual(
          Buffer.from(expectedHex, 'utf8'),
          Buffer.from(token, 'utf8')
        );
      } catch {
        tokenValid = false;
      }
    }

    if (!tokenValid) {
      return htmlResponse(HTML_401, 401);
    }

    // 3. Read blog-queue.json from filesystem
    const queuePath = join(process.cwd(), 'content', 'blog-queue.json');
    const queueData = JSON.parse(readFileSync(queuePath, 'utf8'));
    const entry = queueData.queue.find(e => String(e.id) === String(id));

    if (!entry || entry.status === 'pending') {
      return htmlResponse(HTML_404, 404);
    }
    if (entry.status === 'published') {
      return htmlResponse(HTML_409, 409);
    }
    if (entry.status !== 'generated') {
      return htmlResponse(HTML_404, 404);
    }

    // 4. Read blog draft tab from Google Docs
    const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!keyJson) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env var is not set');

    const docId = process.env.BLOG_DRAFT_DOC_ID || '1Mh5FR_j_FdDJ8Ec5PQFxvnSzxsFGKkY1jfQpKz81ows';

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(keyJson),
      scopes: ['https://www.googleapis.com/auth/documents.readonly'],
    });
    const docs = google.docs({ version: 'v1', auth });

    const docRes = await docs.documents.get({
      documentId: docId,
      includeTabsContent: true,
    });

    const tabs = docRes.data.tabs || [];
    const matchingTab = tabs.find(t => t.tabProperties?.title === entry.draftTabTitle);

    if (!matchingTab) {
      throw new Error(`Tab "${entry.draftTabTitle}" not found in blog draft doc`);
    }

    const tabContent = matchingTab.documentTab?.body?.content ?? [];
    const rawText = extractText(tabContent);

    // 5. Build letters.js entry
    // Split on blank lines; lines starting with ## are headings (kept as-is)
    const paragraphs = rawText
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    if (!paragraphs.length) throw new Error('No content found in blog draft tab');

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const wordCount = paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
    const mins = Math.max(5, Math.round(wordCount / 200));

    // Excerpt: first 160 chars of first paragraph (strip markdown bold markers)
    const excerpt = paragraphs[0].replace(/\*\*/g, '').slice(0, 160);

    const letterEntry = {
      slug: entry.slug,
      title: entry.title,
      date: today,
      type: 'blog',
      topic: entry.topic,
      tag: `Blog Post · ${mins} min read`,
      readTime: `${mins} min read`,
      excerpt,
      dek: excerpt,
      img: null,
      featured: false,
      related: [],
      body: paragraphs,
    };

    // 6. Prepend to letters.js (same replace pattern as sync-newsletters.mjs)
    const lettersPath = join(process.cwd(), 'content', 'letters.js');
    const existingLetters = readFileSync(lettersPath, 'utf8');
    const newJsBlock = letterToJsBlock(letterEntry);
    const updatedLetters = existingLetters.replace(
      'export const LETTERS = [',
      `export const LETTERS = [\n${newJsBlock},`
    );

    // 7. Update blog-queue.json in memory
    entry.status = 'published';
    entry.publishedAt = new Date().toISOString();
    const updatedQueue = JSON.stringify(queueData, null, 2) + '\n';

    // 8. Commit both files via GitHub Contents API
    const githubPat = process.env.GITHUB_PAT;
    if (!githubPat) throw new Error('GITHUB_PAT env var is not set');

    // Fetch current SHAs in parallel
    const [lettersFileInfo, queueFileInfo] = await Promise.all([
      githubGetFile('content/letters.js', githubPat),
      githubGetFile('content/blog-queue.json', githubPat),
    ]);

    // PUT letters.js first, then blog-queue.json
    await githubPutFile(
      'content/letters.js',
      updatedLetters,
      lettersFileInfo.sha,
      `Publish blog post: ${entry.title}`,
      githubPat
    );

    await githubPutFile(
      'content/blog-queue.json',
      updatedQueue,
      queueFileInfo.sha,
      `Mark blog post published: ${entry.title}`,
      githubPat
    );

    // 9. Return HTML success page
    const siteUrl = process.env.SITE_URL ?? 'https://growthmindsetparenting.com';
    return htmlResponse(htmlSuccess(entry.title, entry.slug, siteUrl), 200);

  } catch (err) {
    console.error('[publish-post]', err);
    return htmlResponse(html500(err.message), 500);
  }
}
