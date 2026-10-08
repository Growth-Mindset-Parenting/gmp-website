import { NextResponse } from 'next/server';

// Signup for the free Autopilot workshop (/workshop/).
//
// Since 2026-10-08 (the Oct 12 session) Kit tags them
// `Registered: Autopilot Workshop Oct 12` with their utm_* attribution, and
// that tag sends the Oct 12 confirmation email. It deliberately does NOT go
// through form 9921406 or the old `Registered: Autopilot Workshop` tag: a
// Kit automation sends the Oct 4/5 confirmation (old dates, old Zoom links)
// to anyone who joins that form or gets that tag. The Zoom session is an
// open link (the same for everyone, in data/autopilot-workshop.js), so there
// is no Zoom step.

const KIT_API_SECRET = process.env.KIT_API_SECRET;

const REGISTERED_TAG_ID = 24406882;

// Kit tag "Possible spam: website form" — added when the hidden bot-trap
// field comes in filled. Review and delete these subscribers in Kit.
const POSSIBLE_SPAM_TAG_ID = 23448486;

// Added when someone gives us a mobile number. Typing it into the field —
// whose placeholder says "I'll text you a reminder" — is the opt-in, and
// this tag is the record of who agreed. No texts are sent yet (2026-09-21).
const SMS_OK_TAG_ID = 23797661;

const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

const KIT_TIMEOUT_MS = 6000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Stored in E.164 so a texting tool can use it later without cleanup.
// Anything that isn't a plausible US mobile number is dropped rather than
// stored wrong — the signup itself still goes through.
function normalizePhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}

// Kit must never quietly lose a signup, so a first failure is retried once
// before we give up on it.
async function subscribeInKit({ email, firstName, fields, tags }) {
  const body = { api_secret: KIT_API_SECRET, email, tags };
  if (firstName) body.first_name = firstName;
  if (Object.keys(fields).length) body.fields = fields;

  const send = () =>
    fetch(`https://api.convertkit.com/v3/tags/${REGISTERED_TAG_ID}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(KIT_TIMEOUT_MS),
    });

  let last;
  for (let i = 0; i < 2; i += 1) {
    try {
      const res = await send();
      if (res.ok) return;
      last = new Error(`kit ${res.status}: ${(await res.text()).slice(0, 200)}`);
      // Kit rejected the request itself; retrying won't change that.
      if (res.status >= 400 && res.status < 500) throw last;
    } catch (err) {
      last = err;
    }
  }
  throw last ?? new Error('kit failed');
}

export async function POST(request) {
  try {
    const { email, firstName, phone, utms, company } = (await request.json()) ?? {};
    const trimmed = typeof email === 'string' ? email.trim() : '';
    const name = typeof firstName === 'string' ? firstName.trim().slice(0, 100) : '';

    // Bot trap: people never see the hidden field, so it's normally empty.
    // If it's filled we still register them — a real person must never be
    // dropped — but tag them for review in Kit.
    const suspected = Boolean(company);

    if (trimmed.length > 254 || !EMAIL_RE.test(trimmed)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (!KIT_API_SECRET) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const fields = {};
    const smsPhone = normalizePhone(phone);
    if (smsPhone) fields.phone = smsPhone;
    if (utms && typeof utms === 'object') {
      for (const key of UTM_FIELDS) {
        if (typeof utms[key] === 'string' && utms[key]) fields[key] = utms[key].slice(0, 255);
      }
    }

    const tags = [REGISTERED_TAG_ID];
    if (smsPhone) tags.push(SMS_OK_TAG_ID);
    if (suspected) tags.push(POSSIBLE_SPAM_TAG_ID);

    try {
      await subscribeInKit({ email: trimmed, firstName: name, fields, tags });
    } catch (err) {
      // Kit is the only record of this signup, so tell the form it failed
      // and let them try again rather than show a false "you're in".
      console.error('[workshop-register] KIT SUBSCRIBE FAILED — not on the list:', trimmed, err);
      return NextResponse.json({ error: 'Subscription failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[workshop-register]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
