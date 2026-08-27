import { NextResponse } from 'next/server';

const KIT_API_SECRET = process.env.KIT_API_SECRET;
const PINTEREST_TAG_ID = 20631704;

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
};

const VARIANT_TAGS = {
  worksheet: 21015159,
  'kitchen-table': 21015160,
};

export async function POST(request) {
  try {
    const { email, firstName, slug, variant, source } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

    // Segmentation tags: which freebie, which A/B design, + Pinterest source.
    // (The PDF itself is delivered by the form's incentive email, not a tag.)
    const tags = [];
    if (FREEBIE_TAGS[slug]) tags.push(FREEBIE_TAGS[slug]);
    if (VARIANT_TAGS[variant]) tags.push(VARIANT_TAGS[variant]);
    if (source === 'pinterest') tags.push(PINTEREST_TAG_ID);
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
