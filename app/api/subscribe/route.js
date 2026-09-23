import { NextResponse } from 'next/server';

const KIT_API_SECRET = process.env.KIT_API_SECRET;
const PINTEREST_TAG_ID = 20631704;
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

// Kit form IDs — one dedicated form per freebie (best practice: the form's
// incentive email delivers that freebie's PDF). A null value means "not
// launchable yet": the API rejects the subscribe (and page.jsx 404s the page)
// rather than sending someone to a form that doesn't deliver.
//   six-middle-skills: reuses the existing "Website_Middle Skills Field Guide"
//   form (already the right magnet, already delivers).
//   4s-flowchart / five-minute-meeting / release-replay-repair-return: Katie is
//   creating fresh dedicated forms — paste each real form ID here when ready.
const FREEBIE_FORMS = {
  '4s-flowchart': '9666050',
  'five-minute-meeting': '9672214',
  'six-middle-skills': '9544138',
  'release-replay-repair-return': '9672219',
  'emotional-literacy': '9852097',
  capable: '9926763',
  'collapsing-cruelty': '9934137', // "Freebie: Collapsing Cruelty" (created 2026-09-18)
  // Not a freebie: the newsletter signup (home, about, article pages). No tag.
  newsletter: '9228951',
};

// Segmentation tags applied on every signup (in addition to the form's own
// delivery). Freebie tag = which guide; A/B tag = which design variant.
// Created via the Kit API 2026-07-09.
const FREEBIE_TAGS = {
  '4s-flowchart': 21015155,
  'five-minute-meeting': 21015156,
  'release-replay-repair-return': 21015157,
  'six-middle-skills': 21015158,
  'emotional-literacy': 22823758, // created via the Kit API 2026-08-27
  capable: 23499078, // "Freebie: Capable", created via the Kit API 2026-09-16
  'collapsing-cruelty': 23718184, // "Freebie: Collapsing Cruelty", created via the Kit API 2026-09-18
};

// Kit tag "Possible spam: website form" — added when the hidden bot-trap
// field comes in filled. Review and delete these subscribers in Kit.
const POSSIBLE_SPAM_TAG_ID = 23448486;

const VARIANT_TAGS = {
  worksheet: 21015159,
  'kitchen-table': 21015160,
};

export async function POST(request) {
  try {
    const { email: rawEmail, firstName, slug, variant, source, utms, company } = (await request.json()) ?? {};
    const email = typeof rawEmail === 'string' ? rawEmail.trim() : '';

    // Bot trap: people never see the hidden field, so it's normally empty.
    // If it's filled we still subscribe — a real person must never be dropped
    // (e.g. by a browser autofilling it) — but tag them for review in Kit.
    const suspected = Boolean(company);

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    if (!KIT_API_SECRET) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const formId = FREEBIE_FORMS[slug];
    if (!formId) {
      console.error('[subscribe] no Kit form configured for slug:', slug);
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
    }

    const body = {
      api_secret: KIT_API_SECRET,
      email,
    };

    if (firstName) {
      body.first_name = firstName;
    }

    // Where the visitor came from (lib/attribution.js) -> Kit custom fields.
    const fields = {};
    if (utms && typeof utms === 'object') {
      for (const key of UTM_FIELDS) {
        if (typeof utms[key] === 'string' && utms[key]) fields[key] = utms[key].slice(0, 255);
      }
    }
    if (Object.keys(fields).length) body.fields = fields;

    // Segmentation tags: which freebie, which A/B design, + Pinterest source.
    // (The PDF itself is delivered by the form's incentive email, not a tag.)
    const tags = [];
    if (FREEBIE_TAGS[slug]) tags.push(FREEBIE_TAGS[slug]);
    if (VARIANT_TAGS[variant]) tags.push(VARIANT_TAGS[variant]);
    if (source === 'pinterest') tags.push(PINTEREST_TAG_ID);
    if (suspected) tags.push(POSSIBLE_SPAM_TAG_ID);
    if (tags.length) body.tags = tags;

    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('[subscribe] Kit API error:', res.status, text);
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[subscribe]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
