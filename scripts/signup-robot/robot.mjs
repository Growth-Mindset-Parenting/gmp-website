// The signup robot: every 3 hours, sign up for real through each live form's
// endpoint and check the person actually lands in Kit with the right tag.
//
// Why: on 2026-09-23 the home page Middle Skills form told people "It's on its
// way" while Kit silently held some signups — no error anywhere, no email
// sent. A page-loads check can't see that. Only a real signup can.
//
// A broken signup is filed as an ops item owned by the Deploy Sentinel, and
// the workflow starts the fixer agent. Nobody is emailed. The item closes
// itself once the signup works again (see decide.mjs).
//
// Rules it keeps:
//   - Addresses are katie+monitor-…, which the Marketing OS dashboard already
//     excludes from every count (EXCLUDED_EMAIL_PATTERNS: /\+monitor/).
//   - The bot-trap field stays empty, so "Possible spam" stays meaningful.
//   - Every test subscriber is unsubscribed afterwards, pass or fail. If Kit
//     can't find one (e.g. it is holding the signup — the very bug this hunts),
//     the address is written on the ops item so it can be cleaned up later.
//   - The Autopilot waitlist is NOT probed here: the Marketing OS launch
//     robot (src/lib/launch/signup-robot.ts) already does it hourly.
//   - A failure is re-tried once with a fresh address before it counts, so a
//     single slow Kit read doesn't file an item.
//
// Env: KIT_API_SECRET, OPS_API_URL, OPS_API_TOKEN (required);
//      SITE_URL (default https://growthmindsetparenting.com);
//      ROBOT_DRY_RUN=1 probes but never touches the ops tracker.

import { appendFileSync } from 'node:fs';
import { decide, TITLE_PREFIX } from './decide.mjs';

const SITE = (process.env.SITE_URL || 'https://growthmindsetparenting.com').replace(/\/$/, '');
const KIT = 'https://api.convertkit.com/v3';
const WORKSPACE = 'growth-mindset';
const OWNER = 'deploy-sentinel';
const DRY_RUN = process.env.ROBOT_DRY_RUN === '1';
const LOOKUP_ATTEMPTS = 12;
const LOOKUP_DELAY_MS = 15000;

// One row per live signup path. Keep in sync with app/api/subscribe/route.js
// (FREEBIE_FORMS / FREEBIE_TAGS).
export const TARGETS = [
  {
    key: 'six-middle-skills',
    label: 'Six Middle Skills field guide (home page + /freebies/six-middle-skills/)',
    endpoint: '/api/subscribe/',
    body: { slug: 'six-middle-skills' },
    expectTag: 'Freebie: Six Middle Skills',
  },
  {
    key: 'newsletter',
    label: 'Newsletter signup (home, about, article pages)',
    endpoint: '/api/subscribe/',
    body: { slug: 'newsletter' },
    expectTag: null,
  },
];

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env: ${name}`);
  return v;
}

function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
  console.log(`output: ${key}=${value}`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const timeout = () => ({ signal: AbortSignal.timeout(30_000) });

async function kitGet(path, params = {}) {
  const qs = new URLSearchParams({ ...params, api_secret: requireEnv('KIT_API_SECRET') });
  const res = await fetch(`${KIT}${path}?${qs}`, timeout());
  if (!res.ok) throw new Error(`Kit GET ${path} → ${res.status}`);
  return res.json();
}

async function kitUnsubscribe(email) {
  const res = await fetch(`${KIT}/unsubscribe`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_secret: requireEnv('KIT_API_SECRET'), email }),
    ...timeout(),
  });
  return res.ok;
}

function monitorAddress(key) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-').toLowerCase();
  return `katie+monitor-${key}-${ts}@grandladyaustin.com`;
}

// One real signup, then look for it in Kit.
export async function probeOnce(target) {
  const email = monitorAddress(target.key);
  const started = Date.now();
  let res;
  try {
    res = await fetch(`${SITE}${target.endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        ...target.body,
        utms: { utm_source: 'launch-monitor', utm_medium: 'uptime-check' },
      }),
      ...timeout(),
    });
  } catch (e) {
    return { status: 'fail', detail: `could not reach ${target.endpoint}: ${e.message}`, email };
  }
  if (!res.ok) {
    return { status: 'fail', detail: `${target.endpoint} rejected a valid signup with HTTP ${res.status}`, email };
  }

  try {
    for (let i = 0; i < LOOKUP_ATTEMPTS; i++) {
      const { subscribers = [] } = await kitGet('/subscribers', { email_address: email });
      const sub = subscribers.find((s) => s.email_address.toLowerCase() === email);
      if (sub) {
        if (target.expectTag) {
          const { tags = [] } = await kitGet(`/subscribers/${sub.id}/tags`);
          if (!tags.some((t) => t.name === target.expectTag)) {
            return { status: 'fail', detail: `signup reached Kit but is missing the "${target.expectTag}" tag`, email };
          }
        }
        const secs = ((Date.now() - started) / 1000).toFixed(1);
        return { status: 'pass', detail: `reached Kit in ${secs}s${target.expectTag ? ` with "${target.expectTag}"` : ''}`, email };
      }
      if (i < LOOKUP_ATTEMPTS - 1) await sleep(LOOKUP_DELAY_MS);
    }
  } catch (e) {
    return { status: 'error', detail: `could not read Kit to confirm: ${e.message}`, email };
  }
  const waited = (LOOKUP_ATTEMPTS * LOOKUP_DELAY_MS) / 1000;
  return { status: 'fail', detail: `the form said OK, but the signup was not in Kit after ${waited}s`, email };
}

async function probe(target) {
  let r = await probeOnce(target);
  const emails = [r.email];
  if (r.status !== 'pass') {
    console.log(`  ${target.key}: first try ${r.status} (${r.detail}) — retrying once`);
    r = await probeOnce(target);
    emails.push(r.email);
  }
  const leftovers = [];
  for (const e of emails) {
    let ok = false;
    try { ok = await kitUnsubscribe(e); } catch { ok = false; }
    if (!ok) {
      leftovers.push(e);
      console.warn(`  could not unsubscribe ${e} — noted on the ops item if one is filed`);
    }
  }
  const detail = leftovers.length
    ? `${r.detail}. Test addresses Kit couldn't unsubscribe yet (unsubscribe them if they appear later): ${leftovers.join(', ')}`
    : r.detail;
  return { key: target.key, label: target.label, status: r.status, detail };
}

async function opsRequest(method, path, body) {
  const res = await fetch(`${requireEnv('OPS_API_URL')}${path}`, {
    method,
    headers: { Authorization: `Bearer ${requireEnv('OPS_API_TOKEN')}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    ...timeout(),
  });
  if (!res.ok) throw new Error(`ops API ${method} ${path} → ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

async function main() {
  const results = [];
  for (const t of TARGETS) {
    const r = await probe(t);
    console.log(`${r.status.toUpperCase().padEnd(5)} ${r.key}: ${r.detail}`);
    results.push(r);
  }

  if (DRY_RUN) {
    console.log('ROBOT_DRY_RUN=1 — not touching the ops tracker.');
    setOutput('action', 'none');
    return;
  }

  const { items } = await opsRequest('GET', `/api/ops/items?workspace=${WORKSPACE}`);
  const mine = items.filter((i) => i.title?.startsWith(TITLE_PREFIX));
  const plan = decide(results, mine);

  const filed = [];
  for (const f of plan.file) {
    const { item } = await opsRequest('POST', '/api/ops/items', {
      workspace: WORKSPACE,
      title: f.title,
      detail: f.detail,
      owner: OWNER,
      urgent: true,
      priority: 'high',
    });
    filed.push(item.id);
    console.log(`filed ${item.id}: ${f.title}`);
  }
  for (const id of plan.close) {
    await opsRequest('POST', `/api/ops/items/${id}/complete`, { workspace: WORKSPACE });
    console.log(`closed ${id} — signup works again`);
  }
  for (const id of plan.stillBroken) console.log(`still broken, already filed: ${id}`);

  setOutput('action', plan.runAgent ? 'agent' : 'none');
  setOutput('item_ids', filed.join(','));
  setOutput('broken', results.filter((r) => r.status !== 'pass').map((r) => r.key).join(','));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(`Signup robot failed: ${err.message}`);
    process.exit(1);
  });
}
