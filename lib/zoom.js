// Zoom registration for the Autopilot workshop (server only).
//
// The workshop is a Zoom meeting with registration required and automatic
// approval, so registering someone returns their personal join link right
// away. Credentials come from the "GMP Website Workshop Signup" Server-to-
// Server OAuth app on Sean's Zoom account (created 2026-09-19, after
// EasyWebinar was cancelled). Scopes: meeting:write:registrant:admin,
// meeting:read:list_registrants:admin, meeting:read:meeting:admin,
// report:read:list_meeting_participants:admin.

const TOKEN_URL = 'https://zoom.us/oauth/token';
const API = 'https://api.zoom.us/v2';

// Zoom must never hold a signup open: if it doesn't answer in this long we
// give up on it and let the route fall back to Kit alone.
const TIMEOUT_MS = 6000;

// Access tokens last an hour. Cache in module scope and refresh a minute
// early; a cold serverless instance just fetches a new one.
let cached = { token: null, expiresAt: 0 };

export function zoomConfig() {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;
  const meetingId = process.env.ZOOM_WORKSHOP_MEETING_ID;
  if (!accountId || !clientId || !clientSecret || !meetingId) return null;
  return { accountId, clientId, clientSecret, meetingId };
}

export function resetZoomTokenCache() {
  cached = { token: null, expiresAt: 0 };
}

async function accessToken({ accountId, clientId, clientSecret }, now = Date.now()) {
  if (cached.token && now < cached.expiresAt) return cached.token;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch(
    `${TOKEN_URL}?grant_type=account_credentials&account_id=${encodeURIComponent(accountId)}`,
    { method: 'POST', headers: { Authorization: `Basic ${auth}` }, signal: AbortSignal.timeout(TIMEOUT_MS) }
  );
  if (!res.ok) throw new Error(`zoom token ${res.status}`);
  const data = await res.json();
  if (!data.access_token) throw new Error('zoom token missing');
  cached = {
    token: data.access_token,
    expiresAt: now + Math.max(0, (data.expires_in ?? 3600) - 60) * 1000,
  };
  return cached.token;
}

// Zoom requires both names. People give us one name on our form, so a
// single word goes in first_name and last_name gets a placeholder (Zoom
// rejects an empty one).
export function splitName(name) {
  const parts = String(name ?? '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { first: 'Friend', last: '-' };
  if (parts.length === 1) return { first: parts[0].slice(0, 64), last: '-' };
  return { first: parts.slice(0, -1).join(' ').slice(0, 64), last: parts.at(-1).slice(0, 64) };
}

// Registers one person and returns their personal join link.
//
// Zoom keeps one active token per app, so a token this instance cached can be
// invalidated by another instance asking for its own. A 401/403 therefore
// means "stale token", not "bad credentials": drop the cache and try once
// more before giving up.
export async function registerForWorkshop({ email, firstName }, config = zoomConfig()) {
  if (!config) throw new Error('zoom not configured');
  const { first, last } = splitName(firstName);

  const attempt = async () => {
    const token = await accessToken(config);
    return fetch(`${API}/meetings/${config.meetingId}/registrants`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, first_name: first, last_name: last }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  };

  let res = await attempt();
  if (res.status === 401 || res.status === 403) {
    resetZoomTokenCache();
    res = await attempt();
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`zoom register ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  if (!data.join_url) throw new Error('zoom register: no join_url');
  return data.join_url;
}
