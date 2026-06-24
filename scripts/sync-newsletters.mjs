/**
 * sync-newsletters.mjs
 *
 * Reads new newsletter tabs from the Weekly Content Google Doc and prepends
 * them to content/letters.js. Run via GitHub Actions every Saturday.
 *
 * Requires: GOOGLE_SERVICE_ACCOUNT_KEY env var (JSON string of service account credentials)
 * The Google Doc must be shared with the service account email.
 *
 * Tab format in the doc:
 *   - Tab name must be a date: "6.13", "6.20", etc.
 *   - First non-empty line must be: Skill: [skill name]
 *   - Newsletter body follows (everything before the first "Note 1:" or "Notes//threads" line)
 */

import { google } from 'googleapis';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DOC_ID = '1WNFlx8kGrIhfUfQa4jc_t7lg6yo2v0n_073Ve44gASI';
const LETTERS_FILE = join(ROOT, 'content/letters.js');

const SKILL_SLUGS = {
  'emotional literacy': 'emotional-literacy',
  'resilience': 'resilience',
  'reflection': 'reflection',
  'relationship': 'relationship',
  'autonomy': 'autonomy',
  'adaptation': 'adaptation',
};

const DATE_TAB_RE = /^(\d{1,2})\.(\d{1,2})$/;

function isNewsletterTab(title) {
  return DATE_TAB_RE.test(title.trim());
}

function tabTitleToDate(title) {
  const [, m, d] = title.match(DATE_TAB_RE);
  const month = parseInt(m, 10);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  // If the tab month is more than 6 months ahead, it's from the previous year
  const year = month > currentMonth + 6 ? currentYear - 1 : currentYear;
  return `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

// Pull plain text out of a Google Docs body content array
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

function parseNewsletter(rawText, tabTitle) {
  const allLines = rawText.split('\n').map(l => l.trim());
  let i = 0;

  // Skip leading blank lines
  while (i < allLines.length && allLines[i] === '') i++;

  // Extract skill from first line: "Skill: Resilience"
  let skill = null;
  if (allLines[i]?.toLowerCase().startsWith('skill:')) {
    const name = allLines[i].replace(/^skill:\s*/i, '').trim().toLowerCase();
    skill = SKILL_SLUGS[name] ?? null;
    if (!skill) console.warn(`Unknown skill "${allLines[i]}" in tab ${tabTitle} — defaulting to reflection`);
    skill = skill ?? 'reflection';
    i++;
  } else {
    console.warn(`Tab ${tabTitle} has no "Skill:" line — defaulting to reflection`);
    skill = 'reflection';
  }

  // Skip metadata lines (newsletter subject line drafts, etc.)
  const METADATA_PREFIXES = [
    'subject:', 'preview text:', 'title:', 'subheader:',
    'subject line options', 'opening line options',
    'curiosity:', 'tension:', 'promise:',
  ];
  while (i < allLines.length) {
    const l = allLines[i].toLowerCase();
    if (l === '' || METADATA_PREFIXES.some(p => l.startsWith(p))) { i++; continue; }
    break;
  }

  // Find end of newsletter body — stop at first "Note N:" or "Notes//"
  let end = allLines.length;
  for (let j = i; j < allLines.length; j++) {
    const l = allLines[j].toLowerCase().trim();
    if (/^note \d+[:\s-–]/.test(l) || l.startsWith('notes//') || l.startsWith('thread')) {
      end = j;
      break;
    }
  }

  // Build body paragraphs, strip "-Sean" signature
  const SIGNATURES = new Set(['-sean', '- sean', '–sean', '– sean']);
  const bodyLines = allLines
    .slice(i, end)
    .filter(l => !SIGNATURES.has(l.toLowerCase()));

  const paragraphs = [];
  let cur = [];
  for (const l of bodyLines) {
    if (l === '') {
      if (cur.length) { paragraphs.push(cur.join(' ')); cur = []; }
    } else {
      cur.push(l);
    }
  }
  if (cur.length) paragraphs.push(cur.join(' '));

  if (!paragraphs.length) return null;

  // Title: first paragraph, cleaned of bold markers; truncate at 90 chars
  let title = paragraphs[0].replace(/\*\*/g, '');
  if (title.length > 90) {
    // Take up to the first sentence ending
    const sentence = title.match(/^.+?[.!?]/)?.[0] ?? title.slice(0, 90);
    title = sentence.trim();
  }

  // Slug from title
  const slug = title
    .toLowerCase()
    .replace(/['"''""]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
    .replace(/-+$/, '');

  // Excerpt from second paragraph (fallback to first)
  const excerpt = (paragraphs[1] ?? paragraphs[0]).replace(/\*\*/g, '').slice(0, 160);

  // Read time (~200 wpm)
  const wordCount = paragraphs.join(' ').split(/\s+/).length;
  const mins = Math.max(2, Math.round(wordCount / 200));

  return {
    slug,
    title,
    date: tabTitleToDate(tabTitle),
    type: 'essay',
    topic: skill,
    tag: `Newsletter · ${mins} min read`,
    readTime: `${mins} min read`,
    excerpt,
    dek: excerpt,
    img: null,
    featured: false,
    related: [],
    body: paragraphs,
  };
}

function letterToJsBlock(l) {
  const bodyLines = l.body.map(p => `    ${JSON.stringify(p)},`).join('\n');
  return `  {
    slug: '${l.slug}',
    title: ${JSON.stringify(l.title)},
    date: '${l.date}',
    type: '${l.type}',
    topic: '${l.topic}',
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

async function main() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env var is not set');

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(keyJson),
    scopes: ['https://www.googleapis.com/auth/documents.readonly'],
  });
  const docs = google.docs({ version: 'v1', auth });

  // Find dates already in letters.js
  const existingSource = readFileSync(LETTERS_FILE, 'utf8');
  const existingDates = new Set(
    [...existingSource.matchAll(/date:\s*'(\d{4}-\d{2}-\d{2})'/g)].map(m => m[1])
  );

  // Fetch full document with all tab content
  console.log('Fetching Google Doc...');
  const res = await docs.documents.get({ documentId: DOC_ID, includeTabsContent: true });
  const tabs = (res.data.tabs || []).map(t => ({
    title: t.tabProperties?.title ?? '',
    content: t.documentTab?.body?.content ?? [],
  }));

  // Process new newsletter tabs
  const newLetters = [];
  for (const tab of tabs) {
    if (!isNewsletterTab(tab.title)) continue;
    const date = tabTitleToDate(tab.title);
    if (existingDates.has(date)) { console.log(`Skipping ${tab.title} (already in letters.js)`); continue; }

    const rawText = extractText(tab.content);
    const letter = parseNewsletter(rawText, tab.title);
    if (!letter) { console.warn(`Could not parse tab ${tab.title} — skipping`); continue; }

    console.log(`New newsletter: ${tab.title} → "${letter.title}" [${letter.topic}]`);
    newLetters.push(letter);
  }

  if (!newLetters.length) {
    console.log('No new newsletters. Nothing to do.');
    return;
  }

  // Sort newest first before prepending
  newLetters.sort((a, b) => b.date.localeCompare(a.date));

  const newJsBlocks = newLetters.map(letterToJsBlock).join(',\n');
  const updated = existingSource.replace(
    'export const LETTERS = [',
    `export const LETTERS = [\n${newJsBlocks},`
  );

  writeFileSync(LETTERS_FILE, updated);
  console.log(`\nDone — added ${newLetters.length} newsletter(s) to letters.js`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
