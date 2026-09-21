// Which entry point sent someone to the Autopilot waitlist.
//
// The `waitlist: autopilot` tag says *that* a person joined. These `wl-from: *`
// tags say *where they came from*, so "how many waitlist signups did the
// Capable flow drive this week" is a tag count in Kit.
//
// They are additive: a person always keeps `waitlist: autopilot` (every email
// programmed off it is unaffected) and picks up one `wl-from:` tag as well.
// Someone who arrives through two flows over time carries both, so the
// per-source counts can add up to more than the waitlist total.
//
// The source is read from the utm_* tags the visitor is already carrying
// (lib/attribution.js remembers them for 90 days, so a link that lands on a
// freebie page still counts when the person joins the waitlist later).
//
// TO ADD A NEW FREEBIE OR PLACEMENT: create the tag in Kit, add its id to
// WL_FROM_TAGS, and add the link's utm_content to BY_CONTENT.

export const WL_FROM_TAGS = {
  capable: 23798406,
  script: 23798407,
  feelings: 23798420,
  bored: 23798422,
  repair: 23798425,
  guide: 23798426,
  'essay-capable': 23798427,
  'essay-five-minute-meeting': 23798428,
  'essay-collapsing-cruelty': 23798429,
  bio: 23798433,
  banner: 23798435,
  newsletter: 23798438,
  ads: 23798439,
  other: 23798442,
};

// utm_content on the link -> source key. This is the precise signal: every
// link we hand out carries its own utm_content.
const BY_CONTENT = {
  'capable-manychat': 'capable',
  'script-manychat': 'script',
  // The SCRIPT keyword delivers the Five Minute Meeting freebie, so its older
  // links are tagged by the freebie's name rather than the keyword.
  'five-minute-meeting-manychat': 'script',
  'feelings-manychat': 'feelings',
  'bored-manychat': 'bored',
  'repair-manychat': 'repair',
  'guide-manychat': 'guide',
  'capable-essay': 'essay-capable',
  'five-minute-meeting-essay': 'essay-five-minute-meeting',
  'collapsing-cruelty-essay': 'essay-collapsing-cruelty',
  link_in_bio: 'bio',
  banner: 'banner',
};

// Fallbacks for links that carry utm tags but no utm_content we know.
const BY_MEDIUM = {
  email: 'newsletter',
  bio: 'bio',
  banner: 'banner',
  cpc: 'ads',
  paid: 'ads',
  paid_social: 'ads',
};

const BY_SOURCE = {
  linktree: 'bio',
  newsletter: 'newsletter',
};

const norm = (v) => (typeof v === 'string' ? v.trim().toLowerCase() : '');

// The source key for a set of utm_* fields. Always returns something, so every
// waitlist signup is accounted for — unknown ones land in `other`.
export function waitlistSourceKey(fields) {
  // hasOwn, so a utm value like "constructor" is not mistaken for a source.
  const look = (map, value) => (Object.hasOwn(map, value) ? map[value] : undefined);

  const byContent = look(BY_CONTENT, norm(fields?.utm_content));
  if (byContent) return byContent;

  const byMedium = look(BY_MEDIUM, norm(fields?.utm_medium));
  if (byMedium) return byMedium;

  const bySource = look(BY_SOURCE, norm(fields?.utm_source));
  if (bySource) return bySource;

  return 'other';
}

// The Kit tag id to add alongside `waitlist: autopilot`.
export function waitlistSourceTagId(fields) {
  return WL_FROM_TAGS[waitlistSourceKey(fields)];
}
