/** dump-sheet.mjs — writes the copy sheet (every page tab) to JSON and prints a per-tab summary. */
import { readRows } from './sheet.mjs';
import { writeFileSync } from 'fs';

const out = process.argv[2] || '/tmp/sheet.json';
const rows = await readRows();
writeFileSync(out, JSON.stringify(rows, null, 2));

const tabs = new Map();
for (const r of rows) {
  if (!tabs.has(r.tab)) tabs.set(r.tab, { rows: 0, withRequest: 0, pages: new Set() });
  const t = tabs.get(r.tab);
  if (!r.page && !r.live.trim() && !r.requested.trim()) continue;
  t.rows++;
  if (r.page) t.pages.add(r.page);
  if (r.requested.trim()) t.withRequest++;
}
console.log(`Total rows: ${rows.filter((r) => r.page).length} across ${tabs.size} page tabs\n`);
console.log('Tab'.padEnd(50), 'rows'.padStart(5), 'col E'.padStart(7));
for (const [tab, t] of tabs) {
  const warn = t.pages.size !== 1 || ![...t.pages][0] ? `   ⚠ column A says: ${[...t.pages].join(', ') || '(blank)'}` : '';
  console.log(tab.padEnd(50), String(t.rows).padStart(5), String(t.withRequest).padStart(7), warn);
}
console.log(`\nWrote ${out}`);
