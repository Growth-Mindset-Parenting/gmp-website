/**
 * plan-sheet-update.mjs — turns an audit into a concrete list of sheet edits.
 *
 *   node scripts/copy-sync/plan-sheet-update.mjs --audit /tmp/audit.json --out /tmp/plan.json
 *   node scripts/copy-sync/plan-sheet-update.mjs --audit /tmp/audit.json --out /tmp/plan.json --write
 *
 * Without --write it only prints and saves the plan. Nothing touches the sheet
 * until the plan has been read.
 *
 * Rules, in order:
 *   overrides.json    a human already decided this row — set it or hold it back
 *   E_IS_LIVE         column E was applied to the site but never written back:
 *                     D <- the text actually rendered, then clear E
 *   DRIFT >= 0.75     the same line, reworded on the site: D <- the live text
 *   anything else     hold for review; never guess into the source of truth
 *
 * Column E is only ever cleared when its content is verifiably live. A request
 * that was never applied keeps its cell.
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeCells, TAB } from './sheet.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), a.startsWith('--write') ? 'true' : arr[i + 1]]);
    return acc;
  }, [])
);

const CONFIDENT = 0.75;
const { results } = JSON.parse(readFileSync(args.audit, 'utf8'));
const overrides = JSON.parse(readFileSync(join(__dirname, 'overrides.json'), 'utf8'));

const plan = { setD: [], clearE: [], review: [], unchanged: 0 };

for (const r of results) {
  if (r.freebie) continue; // freebie rows drive the site, not the other way round
  const ov = overrides[String(r.row)];

  if (ov && ov.action === 'review') {
    plan.review.push({ ...r, reason: ov.reason });
    continue;
  }
  if (ov && ov.action === 'set') {
    if (ov.value !== r.D) plan.setD.push({ row: r.row, from: r.D, to: ov.value, why: ov.reason });
    if (r.E && !r.eStillPending) plan.clearE.push({ row: r.row, was: r.E });
    continue;
  }

  if (r.verdict === 'IN_SYNC') {
    // A request that produced copy already on the page is finished business.
    if (r.E && !r.eStillPending) plan.clearE.push({ row: r.row, was: r.E });
    else if (r.E) plan.review.push({ ...r, reason: 'Column E still holds an unapplied request.' });
    else plan.unchanged++;
    continue;
  }

  if (r.verdict === 'E_IS_LIVE') {
    // Prefer the text actually rendered — the previous session tidied typos and
    // punctuation on the way in, and D must match the page, not the request.
    const value = r.how === 'exact' ? r.E : (r.candidate && r.candidate.text) || r.E;
    plan.setD.push({ row: r.row, from: r.D, to: value, why: `Column E was applied to the site (${r.how} match); writing back the live text.` });
    plan.clearE.push({ row: r.row, was: r.E });
    continue;
  }

  if (r.verdict === 'DRIFT' && r.candidate && r.candidate.score >= CONFIDENT) {
    plan.setD.push({ row: r.row, from: r.D, to: r.candidate.text, why: `Site copy was reworded (match ${r.candidate.score.toFixed(2)}).` });
    if (r.E && !r.eStillPending) plan.clearE.push({ row: r.row, was: r.E });
    else if (r.E) plan.review.push({ ...r, reason: 'Column E still holds an unapplied request.' });
    continue;
  }

  plan.review.push({ ...r, reason: `No confident match on the live page (best ${r.candidate ? r.candidate.score.toFixed(2) : '0.00'}).` });
}

writeFileSync(args.out || '/tmp/plan.json', JSON.stringify(plan, null, 2));

console.log(`Column D writes : ${plan.setD.length}`);
console.log(`Column E clears : ${plan.clearE.length}`);
console.log(`Held for review : ${plan.review.length}`);
console.log(`Already correct : ${plan.unchanged}`);

if (args.write === 'true') {
  const updates = [
    ...plan.setD.map((u) => ({ range: `${TAB}!D${u.row}`, value: u.to })),
    ...plan.clearE.map((u) => ({ range: `${TAB}!E${u.row}`, value: '' })),
  ];
  const n = await writeCells(updates);
  console.log(`\nWrote ${n} cells to the sheet.`);
} else {
  console.log('\nDry run — pass --write to apply.');
}
