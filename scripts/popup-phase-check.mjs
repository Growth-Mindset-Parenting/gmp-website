// Checks the popup AND the site banner switch themselves at the right moments.
//
// The popups hand over to each other off the clock, with no one pressing
// anything — so the only thing standing between a correct hand-over and a
// wrong one is this arithmetic. Two of the three boundaries fall in the middle
// of launch week, and one of them lands an hour after Sean finishes teaching
// live, which is the worst possible time to find out it was an hour off.
//
// Run it with:  npx tsx Scripts/popup-phase-check.mjs
// (tsx, because data/site-popup.js imports without a file extension.)

// A dynamic import, not a static one: this project's package.json has no
// "type": "module", so a static named import of a .js file is read as CommonJS
// and the named export is not found.
const { phaseAt, HIDDEN_PATHS: POPUP_HIDDEN } = await import('../data/site-popup.js');
const banner = await import('../data/site-banner.js');
const { buildBannerScript } = await import('../lib/banner-script.js');
const { BANNER_COOKIE } = await import('../lib/analytics.js');

// Central time in October is UTC-5. Each case is the exact UTC instant.
const CASES = [
  ['2026-09-29T12:00:00Z', null, 'the day before it opens'],
  ['2026-09-30T04:59:00Z', null, 'one minute before Sep 30 starts in Texas'],
  ['2026-09-30T05:01:00Z', 'workshop', 'one minute after Sep 30 starts'],
  ['2026-10-04T23:30:00Z', 'workshop', 'during the Sunday session'],
  ['2026-10-05T17:30:00Z', 'workshop', 'during the Monday session'],
  ['2026-10-05T17:59:00Z', 'workshop', 'one minute before Monday ends'],
  ['2026-10-05T18:01:00Z', 'sales', 'one minute after Monday ends'],
  ['2026-10-09T15:00:00Z', 'sales', 'the middle of cart week'],
  ['2026-10-13T02:59:00Z', 'sales', 'one minute before the cart closes'],
  ['2026-10-13T03:01:00Z', null, 'one minute after the cart closes'],
];

let failed = 0;
const check = (ok, label, detail) => {
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(58)} ${detail}`);
};

console.log('— popup —');
for (const [iso, expected, label] of CASES) {
  const actual = phaseAt(Date.parse(iso));
  check(actual === expected, label, `expected=${expected} actual=${actual}`);
}

console.log('\n— popup pages —');
check(!POPUP_HIDDEN.workshop.includes('/autopilot/'), 'workshop popup shows on /autopilot/', '');
check(POPUP_HIDDEN.sales.includes('/autopilot/'), 'sales popup hidden on /autopilot/', '');
for (const p of ['/workshop/', '/workshop/thank-you/', '/workshop/replay/', '/autopilot/thank-you/']) {
  check(POPUP_HIDDEN.workshop.includes(p) && POPUP_HIDDEN.sales.includes(p), `both popups hidden on ${p}`, '');
}

const BANNER_CASES = [
  ['2026-09-30T15:00:00Z', 'waitlist', 'today'],
  ['2026-10-03T15:00:00Z', 'waitlist', 'doors open (Sat Oct 3)'],
  ['2026-10-05T17:59:00Z', 'waitlist', 'one minute before Monday workshop ends'],
  ['2026-10-05T18:01:00Z', 'sales', 'one minute after Monday workshop ends'],
  ['2026-10-13T02:59:00Z', 'sales', 'one minute before the cart closes'],
  ['2026-10-13T03:01:00Z', null, 'one minute after the cart closes'],
];

// Runs the real before-paint script against a fake page, so the text that
// ships in the HTML is what gets tested — not a copy of its logic.
const versions = Object.fromEntries(Object.entries(banner.BANNERS).map(([k, b]) => [k, b.version]));
const script = buildBannerScript({
  schedule: banner.SCHEDULE,
  versions,
  hiddenPaths: banner.HIDDEN_PATHS,
  cookie: BANNER_COOKIE,
});
function runScript(iso, path, cookie = '') {
  const attrs = {};
  const document = {
    documentElement: { setAttribute: (k, v) => { attrs[k] = v; } },
    cookie,
  };
  const FakeDate = { now: () => Date.parse(iso) };
  new Function('document', 'location', 'Date', script)(document, { pathname: path }, FakeDate);
  return attrs;
}

console.log('\n— banner —');
for (const [iso, expected, label] of BANNER_CASES) {
  const actual = banner.phaseAt(Date.parse(iso));
  check(actual === expected, label, `expected=${expected} actual=${actual}`);
  const a = runScript(iso, '/letters/');
  const shown = a['data-banner'] === 'hidden' ? null : a['data-banner-phase'] ?? null;
  check(shown === expected, `  before-paint script agrees (${label})`, `shows=${shown}`);
}
check(banner.BANNERS.sales.cta === 'Enroll now', 'sales banner button says Enroll now', banner.BANNERS.sales.cta);

console.log('\n— banner pages + dismiss —');
check(runScript('2026-09-30T15:00:00Z', '/autopilot/')['data-banner'] === 'hidden', 'banner hidden on /autopilot/', '');
check(runScript('2026-09-30T15:00:00Z', '/about')['data-banner'] !== 'hidden', 'path without trailing slash still shows', '');
const wlCookie = `${BANNER_COOKIE}=${versions.waitlist}`;
check(runScript('2026-09-30T15:00:00Z', '/about/', wlCookie)['data-banner'] === 'hidden', 'dismissed waitlist stays hidden', '');
const s1 = runScript('2026-10-06T15:00:00Z', '/about/', wlCookie);
check(s1['data-banner'] !== 'hidden' && s1['data-banner-phase'] === 'sales', 'dismissed waitlist still sees the sales banner', JSON.stringify(s1));

// /autopilot/ itself: waitlist page until doors open, sales page from then.
console.log('\n— /autopilot/ page —');
const { autopilotPageAt, DOORS_OPEN } = await import('../data/launch-schedule.js');
check(DOORS_OPEN === Date.parse('2026-10-03T05:00:00Z'), 'doors open = Sat Oct 3, 00:00 CT', new Date(DOORS_OPEN).toISOString());
for (const [iso, expected, label] of [
  ['2026-10-02T20:00:00Z', 'waitlist', 'Friday afternoon'],
  ['2026-10-03T04:59:59Z', 'waitlist', 'one second before midnight CT'],
  ['2026-10-03T05:00:00Z', 'sales', 'midnight CT exactly'],
  ['2026-10-03T05:00:01Z', 'sales', 'one second after midnight CT'],
  ['2026-10-13T03:01:00Z', 'sales', 'after the cart closes (stays the sales page)'],
]) {
  const actual = autopilotPageAt(Date.parse(iso));
  check(actual === expected, label, `expected=${expected} actual=${actual}`);
}
check(runScript('2026-10-03T06:00:00Z', '/autopilot/')['data-banner'] === 'hidden', 'banner still hidden on /autopilot/ after doors open', '');

if (failed) {
  console.error(`\n${failed} check(s) wrong.`);
  process.exit(1);
}
console.log('\nAll popup and banner checks correct.');
