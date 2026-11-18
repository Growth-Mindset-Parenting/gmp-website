/**
 * newsletter-parse.mjs
 *
 * Turns the plain text of one newsletter tab into a letter for content/letters.js.
 * Kept separate from sync-newsletters.mjs so it can be tested without Google access.
 */

const SKILL_SLUGS = {
  'emotional literacy': 'emotional-literacy',
  'resilience': 'resilience',
  'reflection': 'reflection',
  'relationship': 'relationship',
  'autonomy': 'autonomy',
  'adaptation': 'adaptation',
};

export const DATE_TAB_RE = /^(\d{1,2})\.(\d{1,2})$/;

export function isNewsletterTab(title) {
  return DATE_TAB_RE.test(title.trim());
}

export function tabTitleToDate(title) {
  const [, m, d] = title.match(DATE_TAB_RE);
  const month = parseInt(m, 10);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  // If the tab month is more than 6 months ahead, it's from the previous year
  const year = month > currentMonth + 6 ? currentYear - 1 : currentYear;
  return `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export // Sean's drafting notes sometimes sit in the tab around the letter (subject
// line options, opener options, editor's notes). None of it may be published.
// Apostrophes are straightened first so "Editor’s" and "Editor's" both match.
const plain = l => l.toLowerCase().replace(/[‘’]/g, "'").trim();

// Section headings that sit above the letter.
// Matches "Subject lines", "Openers:", "Subject line ideas", "Opening line options:"...
const NOTE_HEADING = /^(subject lines?|openers?|opening lines?)( (options|ideas|drafts))?:?$/;

// A heading that ends the letter: everything from here down is notes.
const isEndOfLetter = l =>
  /^note \d+[:\s-–]/.test(l) || l.startsWith('notes//') || l.startsWith('thread') ||
  /^editor'?s?'? notes?\b/.test(l) || /^notes?:?$/.test(l);

// Safety net: if anything that looks like drafting notes survives parsing,
// the tab is refused instead of published.
const LOOKS_LIKE_NOTES = /^(subject lines?\b|openers?:?$|opening lines?\b|editor'?s?'? notes?\b|notes?:?$|(curiosity|tension|promise|my pick):)/;

// A letter never opens with a label ("Options:") or a numbered list item
// ("1. First subject line"). If the first paragraph does, it is notes.
const OPENS_LIKE_NOTES = l => (l.length <= 60 && l.endsWith(':')) || /^\d+[.)]\s/.test(l);

/**
 * Returns { letter, error }.
 *   letter — the parsed letter, or null if the tab is empty or was refused
 *   error  — why the tab was refused (drafting notes found in it), else null
 */
export function parseNewsletter(rawText, tabTitle) {
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
    'curiosity:', 'tension:', 'promise:', 'my pick:',
  ];
  while (i < allLines.length) {
    const l = plain(allLines[i]);
    if (l === '' || NOTE_HEADING.test(l) || METADATA_PREFIXES.some(p => l.startsWith(p))) { i++; continue; }
    break;
  }

  // Find end of newsletter body — stop at first "Note N:", "Notes//" or "Editor's notes"
  let end = allLines.length;
  for (let j = i; j < allLines.length; j++) {
    if (isEndOfLetter(plain(allLines[j]))) {
      end = j;
      break;
    }
  }

  // Build body paragraphs, strip "-Sean" signature
  const SIGNATURES = new Set(['-sean', '- sean', '–sean', '– sean']);
  const bodyLines = allLines
    .slice(i, end)
    .filter(l => !SIGNATURES.has(l.toLowerCase()));

  // Every line here is one whole paragraph from the Google Doc, so each one
  // stays its own paragraph. (Joining lines until a blank one turned tabs
  // with no blank lines into a single wall of text.)
  const paragraphs = bodyLines.filter(l => l !== '');

  if (!paragraphs.length) return { letter: null, error: null };

  const leaked = OPENS_LIKE_NOTES(plain(paragraphs[0]))
    ? paragraphs[0]
    : paragraphs.find(p => LOOKS_LIKE_NOTES.test(plain(p)));
  if (leaked) {
    return {
      letter: null,
      error: `Tab ${tabTitle} has drafting notes mixed into the letter ("${leaked.slice(0, 60)}"). Not published.`,
    };
  }

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

  const letter = {
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
  return { letter, error: null };
}
