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
 *   - Newsletter body follows (everything before the first "Note 1:", "Notes//threads"
 *     or "Editor's notes" line)
 *   - "Subject lines" / "Openers" option blocks above the letter are skipped
 *   - Parsing lives in newsletter-parse.mjs (tests: newsletter-parse.test.mjs)
 */

import { google } from 'googleapis';
import { readFileSync, writeFileSync, appendFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DOC_ID = '1WNFlx8kGrIhfUfQa4jc_t7lg6yo2v0n_073Ve44gASI';
const LETTERS_FILE = join(ROOT, 'content/letters.js');

import { isNewsletterTab, tabTitleToDate, parseNewsletter } from './newsletter-parse.mjs';


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
  const refused = [];
  for (const tab of tabs) {
    if (!isNewsletterTab(tab.title)) continue;
    const date = tabTitleToDate(tab.title);
    if (existingDates.has(date)) { console.log(`Skipping ${tab.title} (already in letters.js)`); continue; }

    const rawText = extractText(tab.content);
    const { letter, error } = parseNewsletter(rawText, tab.title);
    if (error) { console.error(`::error::${error}`); refused.push(tab.title); continue; }
    if (!letter) { console.warn(`Could not parse tab ${tab.title} — skipping`); continue; }

    console.log(`New newsletter: ${tab.title} → "${letter.title}" [${letter.topic}]`);
    newLetters.push(letter);
  }

  // Tell the workflow about refused tabs. It still publishes the good letters,
  // then fails at the end so the refused tab gets noticed.
  if (refused.length && process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `refused=${refused.join(', ')}\n`);
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
