/**
 * normalize.mjs — text normalisation shared by the audit and apply steps.
 *
 * Copy on this site lives inside JSX, where the same sentence can be written
 * with HTML entities (&rsquo; &mdash; &hellip;), curly punctuation, or plain
 * ASCII, and wrapped across lines with arbitrary indentation. Comparing the
 * spreadsheet against the site therefore has to happen on a normalised form —
 * otherwise identical copy reads as a mismatch.
 */

const ENTITIES = {
  '&rsquo;': '’', '&lsquo;': '‘',
  '&rdquo;': '”', '&ldquo;': '“',
  '&mdash;': '—', '&ndash;': '–',
  '&hellip;': '…', '&nbsp;': ' ',
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
  '&apos;': "'", '&middot;': '·', '&copy;': '©',
  '&times;': '×', '&#8594;': '→', '&#10003;': '✓',
};

/** Decode the HTML entities that actually appear in this codebase. */
export function decodeEntities(s) {
  let out = String(s);
  for (const [ent, ch] of Object.entries(ENTITIES)) {
    out = out.split(ent).join(ch);
  }
  // Numeric entities (decimal and hex)
  out = out.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
  out = out.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
  return out;
}

/**
 * Canonical comparison form: entity-decoded, punctuation flattened to ASCII,
 * whitespace collapsed, lowercased. Two strings that normalise the same are
 * the same copy as far as a reader is concerned.
 */
export function norm(s) {
  return decodeEntities(s)
    .replace(/[‘’‛′]/g, "'")
    .replace(/[“”‟″]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/…/g, '...')
    .replace(/[   ]/g, ' ')
    .replace(/→/g, '->')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/** Same as norm() but also drops all punctuation — used for fuzzy matching. */
export function loose(s) {
  return norm(s).replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Substring search that will not match across a word boundary.
 *
 * Plain includes() reports "7 Pieces in archive" as present on a page reading
 * "17 Pieces in archive" — the stale row silently passes as correct. Both
 * strings must already be normalised.
 */
export function containsPhrase(haystack, needle) {
  if (!needle) return false;
  const wordish = /[a-z0-9]/;
  let from = 0;
  for (;;) {
    const at = haystack.indexOf(needle, from);
    if (at === -1) return false;
    const before = at === 0 ? '' : haystack[at - 1];
    const after = haystack[at + needle.length] || '';
    if (!wordish.test(before) && !wordish.test(after)) return true;
    from = at + 1;
  }
}

/** Token-overlap similarity in [0,1]. Order-insensitive, length-aware. */
export function similarity(a, b) {
  const A = loose(a).split(' ').filter(Boolean);
  const B = loose(b).split(' ').filter(Boolean);
  if (!A.length && !B.length) return 1;
  if (!A.length || !B.length) return 0;
  const counts = new Map();
  for (const t of A) counts.set(t, (counts.get(t) || 0) + 1);
  let shared = 0;
  for (const t of B) {
    const c = counts.get(t) || 0;
    if (c > 0) { shared++; counts.set(t, c - 1); }
  }
  return (2 * shared) / (A.length + B.length);
}
