/**
 * audit.mjs — compares every row of the copy sheet against the rendered site.
 *
 * Usage:
 *   node scripts/copy-sync/audit.mjs --live /tmp/prod-live.json --out /tmp/audit.json
 *
 * Verdicts per row:
 *   IN_SYNC        column D is on the page verbatim
 *   E_IS_LIVE      column D is stale, but column E is already on the page
 *                  (a previous change was applied and never written back)
 *   DRIFT          neither matches; a close candidate exists on the page
 *   NOT_FOUND      nothing on the page resembles this row
 *
 * Composite rows (pipe-separated, e.g. "OUTCOME: … | THE GAP NOW: … | WHAT WE
 * TEACH: …") are checked segment by segment, because the site renders them as
 * separate elements.
 */

import { readFileSync, writeFileSync } from 'fs';
import { readRows, isFreebieRow } from './sheet.mjs';
import { norm, loose, similarity, containsPhrase } from './normalize.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const live = JSON.parse(readFileSync(args.live, 'utf8'));
const OUT = args.out || '/tmp/audit.json';
const DRIFT_FLOOR = 0.45; // below this, call it NOT_FOUND rather than guess

/** All searchable text for a page: base render + both variants + modal. */
function pageCorpus(pageData) {
  if (!pageData) return { haystack: '', elements: [] };
  const parts = [];
  const elements = [];
  const add = (p) => {
    if (!p) return;
    parts.push(p.bodyText || '');
    parts.push(p.title || '', p.description || '');
    for (const el of p.elements || []) elements.push(el);
    if (p.modal) {
      parts.push(p.modal.bodyText || '');
      for (const el of p.modal.elements || []) elements.push({ ...el, cls: 'modal' });
    }
  };
  add(pageData);
  if (pageData.variants) for (const v of Object.values(pageData.variants)) add(v);
  return { haystack: norm(parts.join('  ')), elements };
}

const corpora = {};
for (const [page, data] of Object.entries(live.pages)) corpora[page] = pageCorpus(data);

/**
 * Labels the spreadsheet uses to pack several on-page elements into one cell,
 * e.g. "OUTCOME: … | THE GAP NOW: … | WHAT WE TEACH: …". The label itself is
 * the transcriber's scaffolding, not copy that appears on the page.
 */
const SEGMENT_LABEL = /^\s*(outcome|the gap now|gap now|what we teach|teach)\s*:\s*/i;

/**
 * Is this copy present on the page?
 *
 * Whole-string match first. Failing that, the row may be a composite: the
 * transcriber joined several on-page elements into one cell with "|" or "·".
 * A composite counts as present only when EVERY segment is on the page, so a
 * row like "Self-paced · lifetime access · backed by a 30-day guarantee" still
 * reads as drift when only the first two segments survive.
 */
function present(text, corpus) {
  const whole = norm(text.replace(SEGMENT_LABEL, ''));
  if (whole.length > 1 && containsPhrase(corpus.haystack, whole)) return true;
  for (const sep of ['|', '·']) {
    if (!text.includes(sep)) continue;
    const wanted = text
      .split(sep)
      .map((s) => norm(s.replace(SEGMENT_LABEL, '')))
      .filter((s) => s.length > 1);
    if (wanted.length > 1 && wanted.every((seg) => containsPhrase(corpus.haystack, seg))) return true;
  }
  return false;
}

/**
 * Best-matching element on the page, for suggesting what the live copy is.
 * Candidates are length-banded: a whole-section container that happens to
 * contain the row's words is not a useful suggestion for a one-line row.
 */
function bestCandidate(text, corpus) {
  let best = { score: 0, text: '', tag: '' };
  const target = loose(text).length;
  const ceiling = Math.max(80, target * 3 + 40);
  for (const el of corpus.elements) {
    if (loose(el.text).length > ceiling) continue;
    const score = similarity(text, el.text);
    if (score > best.score) best = { score, text: el.text, tag: el.tag };
  }
  return best;
}

/**
 * Present, allowing for the ways the site legitimately differs from a
 * transcription: a heading split across two elements ("01" + the title), a
 * stray trailing period, a spelling fixed on the way in. Anything looser than
 * this is drift a human should look at, not something to auto-accept.
 */
function presentish(text, corpus) {
  if (present(text, corpus)) return { hit: true, how: 'exact' };
  const best = bestCandidate(text, corpus);
  if (best.score >= 0.9) return { hit: true, how: 'near', best };
  const a = loose(text), b = loose(best.text);
  if (a.length > 12 && b.length > 12 && (containsPhrase(a, b) || containsPhrase(b, a))) {
    const ratio = Math.min(a.length, b.length) / Math.max(a.length, b.length);
    if (ratio >= 0.7) return { hit: true, how: 'contained', best };
  }
  return { hit: false, best };
}

/** Rows that are human notation about the page, not copy that appears on it. */
const ANNOTATION = /\[(email|name|first name|date)\]|\(crossed out|\(placeholder/i;

const rows = await readRows();
const results = [];

for (const r of rows) {
  if (!r.page) continue;
  // Section spacer rows: a page label with no element and no copy.
  if (!r.live.trim() && !r.requested.trim() && !r.element) continue;
  const corpus = corpora[r.page];
  if (!corpus) {
    results.push({ ...r, verdict: 'NO_PAGE', note: `No live capture for page "${r.page}"` });
    continue;
  }
  const D = r.live.trim();
  const E = r.requested.trim();
  const freebie = isFreebieRow(r);

  const dHit = D ? presentish(D, corpus) : { hit: false };
  const eHit = E ? presentish(E, corpus) : { hit: false };
  const annotation = ANNOTATION.test(D) || ANNOTATION.test(E);

  let verdict, candidate = null, how = null;
  if (dHit.hit) { verdict = 'IN_SYNC'; how = dHit.how; }
  else if (eHit.hit) { verdict = 'E_IS_LIVE'; how = eHit.how; candidate = eHit.best || null; }
  else if (annotation) { verdict = 'ANNOTATION'; candidate = dHit.best || null; }
  else {
    candidate = dHit.best || bestCandidate(D || E, corpus);
    verdict = candidate.score >= DRIFT_FLOOR ? 'DRIFT' : 'NOT_FOUND';
  }

  results.push({
    row: r.row, page: r.page, section: r.section, element: r.element,
    freebie, D, E, verdict, how,
    eStillPending: !!E && !eHit.hit && !dHit.hit,
    candidate,
  });
}

writeFileSync(OUT, JSON.stringify({ live: args.live, results }, null, 2));

const tally = {};
for (const r of results) {
  const k = (r.freebie ? 'FREEBIE ' : 'SITE    ') + r.verdict;
  tally[k] = (tally[k] || 0) + 1;
}
console.log('Rows audited:', results.length, '\n');
for (const k of Object.keys(tally).sort()) console.log(' ', k.padEnd(22), tally[k]);
console.log(`\nWrote ${OUT}`);
