import { NextResponse } from 'next/server';
import { registerForWorkshop } from '../../../lib/zoom';

// Signup for the free Autopilot workshop (/workshop/).
//
// Two things happen per signup:
//   1. Zoom registers them for meeting ZOOM_WORKSHOP_MEETING_ID and hands
//      back their personal join link. Zoom emails them that link itself.
//   2. Kit adds them to form 9921406 "Autopilot Workshop Registrants" with
//      the `Registered: Autopilot Workshop` tag, their utm_* attribution and
//      their join link in the `zoom_join_url` field, so Sean's reminder
//      emails can carry the link too.
//
// A signup is never dropped: if Zoom fails we still subscribe them in Kit
// and tag it for follow-up, and if Kit fails the Zoom registration (and its
// confirmation email) still stands.

const KIT_API_SECRET = process.env.KIT_API_SECRET;

const KIT_FORM_ID = '9921406';
const REGISTERED_TAG_ID = 23446662;

// Kit tag "Possible spam: website form" — added when the hidden bot-trap
// field comes in filled. Review and delete these subscribers in Kit.
const POSSIBLE_SPAM_TAG_ID = 23448486;

// Added when someone gives us a mobile number. Typing it into the field —
// whose placeholder says "I'll text you a reminder" — is the opt-in, and
// this tag is the record of who agreed. No texts are sent yet (2026-09-21).
const SMS_OK_TAG_ID = 23797661;

// Added when Zoom registration failed, so these people can be registered by
// hand before the workshop. They have no join link yet.
const ZOOM_FAILED_TAG_ID = 23752948;

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
    fetch(`https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`, {
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

    let joinUrl = null;
    try {
      joinUrl = await registerForWorkshop({ email: trimmed, firstName: name });
      fields.zoom_join_url = joinUrl.slice(0, 255);
    } catch (err) {
      console.error('[workshop-register] zoom:', err);
    }

    const tags = [REGISTERED_TAG_ID];
    if (smsPhone) tags.push(SMS_OK_TAG_ID);
    if (suspected) tags.push(POSSIBLE_SPAM_TAG_ID);
    if (!joinUrl) tags.push(ZOOM_FAILED_TAG_ID);

    try {
      await subscribeInKit({ email: trimmed, firstName: name, fields, tags });
    } catch (err) {
      // Logged loudly: this person is registered with Zoom (and has their
      // link by email) but is NOT on Sean's list, so no reminders reach
      // them. Vercel logs are the record; check them after a launch push.
      console.error('[workshop-register] KIT SUBSCRIBE FAILED — not on the list:', trimmed, err);
      if (!joinUrl) return NextResponse.json({ error: 'Subscription failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true, joinUrl });
  } catch (err) {
    console.error('[workshop-register]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
