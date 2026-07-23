/**
 * refresh-writing.mjs — keeps the WRITING section of the copy sheet current.
 *
 *   node scripts/copy-sync/refresh-writing.mjs            # dry run
 *   node scripts/copy-sync/refresh-writing.mjs --write    # apply
 *
 * The /writing/ index is a live feed: `content/letters.js` is regenerated from
 * Sean's newsletters on its own schedule, so "Article 1" is whichever post is
 * newest, not a fixed piece of copy. The normal copy matcher can't track this —
 * a fuzzy match against a shifting list is meaningless. So these rows are
 * refreshed POSITIONALLY instead: Article N ← the Nth newest post.
 *
 * Column D is written to exactly what the page renders (see components/
 * LettersFeed.jsx): the date badge, the "Type · N min read" tag, the title, and
 * the dek/excerpt. The archive count is the total number of posts.
 *
 * This is the one section written from the repo's source data rather than from
 * a browser capture — the rendering is a pure function of letters.js, so the
 * two agree, and reading the source avoids scraping a paginated feed.
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readRows, writeCells, TAB } from './sheet.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const WRITE = process.argv.includes('--write');

const { LETTERS } = await import(join(ROOT, 'content/letters.js'));

/** Month abbreviations, matching toLocaleString('en-US',{month:'short'}). */
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/** Render one letter's fields the way LettersFeed.jsx does. */
function render(letter) {
  // Noon avoids any date rolling backward across a timezone, matching the
  // component's `new Date(date + 'T12:00:00')`.
  const d = new Date(letter.date + 'T12:00:00');
  const dateBadge = `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  return {
    dateCategory: `${dateBadge} | ${letter.tag}`,      // "18 JUL | Newsletter · 3 min read"
    title: letter.title,
    description: letter.dek || letter.excerpt || '',
  };
}

const rows = await readRows();
const writing = rows.filter((r) => r.page === 'WRITING');

// Which article slots does the sheet track? (Article 1, Article 2, …)
const slots = [...new Set(
  writing.map((r) => (r.section.match(/^Article (\d+)$/) || [])[1]).filter(Boolean).map(Number)
)].sort((a, b) => a - b);

const updates = [];
const changes = [];

for (const n of slots) {
  const letter = LETTERS[n - 1];
  const rendered = letter ? render(letter) : null;

  const field = (elementRe, value) => {
    const row = writing.find((r) => r.section === `Article ${n}` && elementRe.test(r.element));
    if (!row) return;
    if (value == null) return; // fewer posts than slots — leave the slot alone
    if (row.live !== value) {
      updates.push({ range: `${TAB}!D${row.row}`, value });
      changes.push({ row: row.row, what: `Article ${n} ${row.element}`, from: row.live, to: value });
    }
  };

  field(/Date|Category/i, rendered && rendered.dateCategory);
  field(/Title/i, rendered && rendered.title);
  field(/Description/i, rendered && rendered.description);
}

// Archive count: "N Pieces in archive"
const archive = writing.find((r) => /Archive/i.test(r.section) && /Pieces in archive/i.test(r.live));
if (archive) {
  const value = `${LETTERS.length} Pieces in archive`;
  if (archive.live !== value) {
    updates.push({ range: `${TAB}!D${archive.row}`, value });
    changes.push({ row: archive.row, what: 'Archive count', from: archive.live, to: value });
  }
}

if (!changes.length) {
  console.log('WRITING section already current — nothing to refresh.');
} else {
  console.log(`WRITING rows needing refresh: ${changes.length}\n`);
  for (const c of changes) {
    console.log(`  r${c.row}  ${c.what}\n     from: ${JSON.stringify(c.from.slice(0, 70))}\n     to:   ${JSON.stringify(c.to.slice(0, 70))}`);
  }
  if (WRITE) {
    const n = await writeCells(updates);
    console.log(`\nWrote ${n} cells.`);
  } else {
    console.log('\nDry run — pass --write to apply.');
  }
}
