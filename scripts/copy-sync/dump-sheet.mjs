/** dump-sheet.mjs — writes the copy sheet to JSON for inspection. */
import { readRows } from './sheet.mjs';
import { writeFileSync } from 'fs';

const out = process.argv[2] || '/tmp/sheet.json';
const rows = await readRows();
writeFileSync(out, JSON.stringify(rows, null, 2));

const pages = new Map();
for (const r of rows) {
  if (!r.page) continue;
  if (!pages.has(r.page)) pages.set(r.page, { rows: 0, first: r.row, last: r.row, withRequest: 0 });
  const p = pages.get(r.page);
  p.rows++; p.last = r.row;
  if (r.requested.trim()) p.withRequest++;
}
console.log(`Total data rows: ${rows.filter((r) => r.page).length}  (sheet rows 2-${rows[rows.length - 1].row})\n`);
console.log('Page'.padEnd(40), 'rows'.padStart(5), 'range'.padStart(12), 'col E'.padStart(7));
for (const [page, p] of pages) {
  console.log(page.padEnd(40), String(p.rows).padStart(5), `${p.first}-${p.last}`.padStart(12), String(p.withRequest).padStart(7));
}
console.log(`\nWrote ${out}`);
