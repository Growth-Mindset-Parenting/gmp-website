/**
 * locate.mjs — finds where a piece of copy lives in the source.
 *
 *   node scripts/copy-sync/locate.mjs "Feelings aren't facts"
 *   node scripts/copy-sync/locate.mjs --row 341
 *
 * Copy is written into JSX as entities (&rsquo; &mdash;), wrapped across lines
 * at arbitrary indentation, and broken up by inline elements, so grepping the
 * spreadsheet text against the repo finds nothing. This normalises both sides
 * — collapsing whitespace and decoding entities — and reports file, line, and
 * how much of the row that line accounts for.
 *
 * Structured content files (content/freebies.js, data/*.js) are the easy case
 * and are reported first: those edits are a single key, safe to change.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';
import { norm, loose, similarity } from './normalize.mjs';
import { readRows } from './sheet.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SEARCH_DIRS = ['content', 'data', 'components', 'app'];
const SKIP = /node_modules|\.next|\/out\/|_archive/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (SKIP.test(p)) continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(jsx?|mjs|json)$/.test(name)) out.push(p);
  }
  return out;
}

/** Candidate source lines, ranked by how much of `text` each one covers. */
export function locate(text, { limit = 6 } = {}) {
  const target = norm(text);
  const targetLoose = loose(text);
  if (targetLoose.length < 4) return [];
  const hits = [];

  for (const file of SEARCH_DIRS.flatMap((d) => {
    try { return walk(join(ROOT, d)); } catch { return []; }
  })) {
    const lines = readFileSync(file, 'utf8').split('\n');
    // A three-line window catches copy wrapped across lines by the formatter.
    for (let i = 0; i < lines.length; i++) {
      for (const span of [1, 2, 3]) {
        if (i + span > lines.length) continue;
        const chunk = lines.slice(i, i + span).join(' ');
        const nChunk = norm(chunk);
        if (nChunk.length < 4) continue;
        let score = 0;
        if (nChunk.includes(target)) score = 1;
        else {
          const sim = similarity(text, chunk);
          if (sim >= 0.6) score = sim;
        }
        if (score > 0) {
          hits.push({
            file: relative(ROOT, file),
            line: i + 1,
            span,
            score,
            structured: /^(content|data)\//.test(relative(ROOT, file)),
            preview: chunk.trim().replace(/\s+/g, ' ').slice(0, 160),
          });
        }
      }
    }
  }

  // Best score first; structured content files win ties — a one-key edit there
  // is safer than surgery on JSX.
  hits.sort((a, b) => b.score - a.score || b.structured - a.structured || a.span - b.span);
  const seen = new Set();
  return hits.filter((h) => {
    const key = h.file + ':' + h.line;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  let text = args.join(' ');
  if (args[0] === '--row') {
    const rows = await readRows();
    const r = rows.find((x) => x.row === Number(args[1]));
    if (!r) { console.error(`No row ${args[1]}`); process.exit(1); }
    text = r.live || r.requested;
    console.log(`Row ${r.row}: ${r.page} / ${r.section} / ${r.element}\n  ${JSON.stringify(text.slice(0, 120))}\n`);
  }
  const hits = locate(text);
  if (!hits.length) { console.log('No source match — the copy may be generated, or no longer on the site.'); process.exit(0); }
  for (const h of hits) {
    console.log(`${h.score.toFixed(2)}  ${h.file}:${h.line}${h.span > 1 ? ` (+${h.span - 1})` : ''}${h.structured ? '  [structured]' : ''}`);
    console.log(`      ${h.preview}`);
  }
}
