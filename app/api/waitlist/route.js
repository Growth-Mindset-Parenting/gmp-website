import { NextResponse } from 'next/server';

const KIT_API_SECRET = process.env.KIT_API_SECRET;

// Waitlists this route can subscribe to. Each list = one Kit form (the form's
// incentive/automation sends the confirmation email) + one tag.
//   autopilot: "Autopilot: Round 2 Waitlist" form + `waitlist: autopilot` tag.
const WAITLISTS = {
  autopilot: { formId: '9852728', tagId: 22826067 },
};

// Kit custom fields created 2026-09-14 so bio / ManyChat / partner traffic
// stays attributable. Anything else in the query string is ignored.
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export async function POST(request) {
  try {
    const { email, list, utms, company } = (await request.json()) ?? {};
    const trimmed = typeof email === 'string' ? email.trim() : '';

    // Bot trap: people never see the `company` field. Pretend it worked.
    if (company) {
      return NextResponse.json({ success: true });
    }

    if (trimmed.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const waitlist = WAITLISTS[list];
    if (!waitlist) {
      return NextResponse.json({ error: 'Unknown list' }, { status: 400 });
    }

    if (!KIT_API_SECRET) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const fields = {};
    if (utms && typeof utms === 'object') {
      for (const key of UTM_FIELDS) {
        if (typeof utms[key] === 'string' && utms[key]) fields[key] = utms[key].slice(0, 255);
      }
    }

    const body = {
      api_secret: KIT_API_SECRET,
      email: trimmed,
      tags: [waitlist.tagId],
    };
    if (Object.keys(fields).length) body.fields = fields;

    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${waitlist.formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('[waitlist] Kit API error:', res.status, text);
      return NextResponse.json({ error: 'Subscription failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[waitlist]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
