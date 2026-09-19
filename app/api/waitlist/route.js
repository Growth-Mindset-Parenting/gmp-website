import { NextResponse } from 'next/server';

const KIT_API_SECRET = process.env.KIT_API_SECRET;

// Waitlists this route can subscribe to. Each list = one Kit form (the form's
// incentive/automation sends the confirmation email) + one tag.
//   autopilot: "Autopilot Interest List" form (has Sean's confirmation email)
//   + `waitlist: autopilot` tag.
//   autopilot-workshop: "Autopilot Workshop Registrants" form + `Registered:
//   Autopilot Workshop` tag. No longer used by /workshop/, which posts to
//   /api/workshop-register/ instead (Zoom + Kit) since 2026-09-19.
const WAITLISTS = {
  autopilot: { formId: '9852683', tagId: 22826067 },
  'autopilot-workshop': { formId: '9921406', tagId: 23446662 },
};

// Kit tag "Possible spam: website form" — added when the hidden bot-trap
// field comes in filled. Review and delete these subscribers in Kit.
const POSSIBLE_SPAM_TAG_ID = 23448486;

// Kit custom fields created 2026-09-14 so bio / ManyChat / partner traffic
// stays attributable. Anything else in the query string is ignored.
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export async function POST(request) {
  try {
    const { email, firstName, list, utms, company } = (await request.json()) ?? {};
    const trimmed = typeof email === 'string' ? email.trim() : '';
    const name = typeof firstName === 'string' ? firstName.trim().slice(0, 100) : '';

    // Bot trap: people never see the hidden field, so it's normally empty.
    // If it's filled we still subscribe — a real person must never be dropped
    // (e.g. by a browser autofilling it) — but tag them for review in Kit.
    const suspected = Boolean(company);

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
      tags: suspected ? [waitlist.tagId, POSSIBLE_SPAM_TAG_ID] : [waitlist.tagId],
    };
    if (name) body.first_name = name;
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
