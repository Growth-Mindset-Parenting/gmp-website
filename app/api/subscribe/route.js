import { NextResponse } from 'next/server';

const KIT_API_SECRET = process.env.KIT_API_SECRET;
const PINTEREST_TAG_ID = 20631704;

// Kit form IDs — one per freebie slug. A missing entry means "not launchable yet":
// the API rejects the subscribe rather than sending someone the wrong guide.
// release-replay-repair-return: paste the real form ID here in Task 9.
const FREEBIE_FORMS = {
  '4s-flowchart': '9609498',
  'five-minute-meeting': '9538575',
  'six-middle-skills': '9544138',
  'release-replay-repair-return': null,
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

    // A/B variant -> Kit custom field, for conversion comparison
    if (variant === 'worksheet' || variant === 'kitchen-table') {
      body.fields = { ab_freebie_variant: variant };
    }

    // Pinterest traffic tag
    if (source === 'pinterest') {
      body.tags = [PINTEREST_TAG_ID];
    }

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
