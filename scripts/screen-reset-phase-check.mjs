// Checks that The Screen Reset switches itself at the right moments: the
// price on /screen-reset/, the checkout link the buy buttons use, the site
// banner and the popup.
//
// Nobody presses anything when the $67 price starts (Sat Nov 21 2026, 00:00
// Central) or ends (end of Mon Nov 30) — the site reads the clock. So the
// only thing between a correct switch and a wrong one is this arithmetic,
// and late November is Central STANDARD time (UTC-6), an hour different from
// the October dates the Autopilot launch used.
//
// Run it with:
//   npx tsx scripts/screen-reset-phase-check.mjs
//   npx tsx scripts/screen-reset-phase-check.mjs --require-live-checkout
//
// The second form also FAILS if a checkout link in data/screen-reset-sales.js
// is still the placeholder. Run that one before going live. Without the flag
// a placeholder is only a warning, so the date checks can run before the
// Kajabi offers exist.
// (tsx, because the data files import each other without a file extension.)

const REQUIRE_LIVE = process.argv.includes('--require-live-checkout');

const schedule = await import('../data/launch-schedule.js');
const sales = await import('../data/screen-reset-sales.js');
const banner = await import('../data/site-banner.js');
const popup = await import('../data/site-popup.js');
const { buildBannerScript } = await import('../lib/banner-script.js');
const { BANNER_COOKIE } = await import('../lib/analytics.js');

let failed = 0;
const check = (ok, label, detail = '') => {
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(62)} ${detail}`);
};

// Central time written out in full, so the hour offset is visible: -06:00.
const at = (central) => Date.parse(central);

console.log('— the two dates —');
check(schedule.SCREEN_RESET_SALE_STARTS === at('2026-11-21T00:00:00-06:00'), 'sale starts Sat Nov 21 2026, 00:00 Central (UTC-6)', new Date(schedule.SCREEN_RESET_SALE_STARTS).toISOString());
check(schedule.SCREEN_RESET_SALE_ENDS === at('2026-12-01T00:00:00-06:00'), 'sale ends at the end of Mon Nov 30 2026, Central (UTC-6)', new Date(schedule.SCREEN_RESET_SALE_ENDS).toISOString());
const centralDay = (ms) => new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(ms);
console.log(`      sale starts, in Texas: ${centralDay(schedule.SCREEN_RESET_SALE_STARTS)}`);
console.log(`      last minute of sale:   ${centralDay(schedule.SCREEN_RESET_SALE_ENDS - 60000)}`);

// [moment in Central time, price, banner, popup, what it is]
const CASES = [
  ['2026-11-20T12:00:00-06:00', 'sale', null, null, 'Fri Nov 20, 12:00 CST (day before; page previews the sale)'],
  ['2026-11-21T00:00:01-06:00', 'sale', 'screenResetSale', 'screenResetSale', 'Sat Nov 21, 00:00:01 CST (sale has just started)'],
  ['2026-11-30T23:59:00-06:00', 'sale', 'screenResetSale', 'screenResetSale', 'Mon Nov 30, 23:59:00 CST (last minute of the sale)'],
  ['2026-12-01T00:00:01-06:00', 'full', 'screenReset', null, 'Tue Dec 1, 00:00:01 CST (full price)'],
];

// Runs the real before-paint banner script against a fake page, so the text
// that ships in the HTML is what gets tested — not a copy of its logic.
const versions = Object.fromEntries(Object.entries(banner.BANNERS).map(([k, b]) => [k, b.version]));
const script = buildBannerScript({
  schedule: banner.SCHEDULE,
  versions,
  hiddenPaths: banner.HIDDEN_PATHS,
  cookie: BANNER_COOKIE,
});
function runScript(ms, path, cookie = '') {
  const attrs = {};
  const document = {
    documentElement: { setAttribute: (k, v) => { attrs[k] = v; } },
    cookie,
  };
  new Function('document', 'location', 'Date', script)(document, { pathname: path }, { now: () => ms });
  return attrs;
}
const shownBy = (attrs) => (attrs['data-banner'] === 'hidden' ? null : attrs['data-banner-phase'] ?? null);

// What a visitor actually reads: the real page components, drawn to HTML
// here for a given price state. (The components are written in JSX with no
// React import, which Next.js fills in; outside Next.js it has to be put in
// by hand, hence globalThis.React.)
globalThis.React = (await import('react')).default;
const { renderToStaticMarkup } = await import('react-dom/server');
const { default: ScreenResetSales } = await import('../components/ScreenResetSales.jsx');
const { default: CoursesContent } = await import('../components/CoursesContent.jsx');
const { default: SiteBanner } = await import('../components/SiteBanner.jsx');
const { COURSES } = await import('../data/courses.js');
const el = globalThis.React.createElement;
const pageHtml = {
  sales: (phase) => renderToStaticMarkup(el(ScreenResetSales, { phase })),
  courses: (phase) => renderToStaticMarkup(el(CoursesContent, { phase })),
};
// Every banner on the schedule is in the page's HTML; this is one of them.
const bannersHtml = renderToStaticMarkup(el(SiteBanner));
const bannerHtml = (phase) => (bannersHtml.match(new RegExp(`<aside[^>]*data-phase="${phase}"[\\s\\S]*?</aside>`)) || [''])[0];
// Tags out, so only the words a visitor sees are left. The screen-reader
// label inside a crossed-out price goes too.
const words = (html) => html.replace(/<span class="[^"]*sr[^"]*">[^<]*<\/span>/g, '').replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ');
// A crossed-out "$99": <s …>(Regular price )$99</s>.
const STRUCK = /<s\b[^>]*>(?:<span[^>]*>Regular price <\/span>)?\$99<\/s>/g;
// True when every "$67" in the HTML sits right next to a crossed-out $99.
// `allow` lists sentences where a bare $67 is fine (the FAQ answer).
function everySalePriceIsAnchored(html, allow = []) {
  let rest = html;
  for (const sentence of allow) rest = rest.split(sentence).join('');
  const struckAt = [...rest.matchAll(STRUCK)].map((m) => [m.index, m.index + m[0].length]);
  const bare = [];
  for (const m of rest.matchAll(/\$67/g)) {
    // "Next to" = nothing but tags and spaces between the two prices.
    const near = struckAt.some(([a, b]) => {
      const between = m.index >= b ? rest.slice(b, m.index) : rest.slice(m.index + 3, a);
      return (m.index >= b || m.index + 3 <= a) && between.replace(/<[^>]*>/g, '').trim() === '';
    });
    if (!near) bare.push(rest.slice(Math.max(0, m.index - 60), m.index + 20));
  }
  return { ok: bare.length === 0, count: [...rest.matchAll(/\$67/g)].length, bare };
}
const SALE_WORDS = /\$67|Black Friday|Nov(ember)? 30/;
const firstHit = (text, re) => { const m = text.match(re); return m ? `found "${text.slice(Math.max(0, m.index - 30), m.index + 30).trim()}"` : ''; };

const overridden = banner.OVERRIDE || popup.OVERRIDE;
if (overridden) {
  console.log(`\nNOTE: OVERRIDE is set (banner=${banner.OVERRIDE} popup=${popup.OVERRIDE}), so the banner/popup date checks below will not match the dates.`);
}

for (const [central, price, bannerPhase, popupPhase, label] of CASES) {
  const now = at(central);
  console.log(`\n— ${label} —`);
  const actualPrice = schedule.screenResetPriceAt(now);
  check(actualPrice === price, 'price phase', `expected=${price} actual=${actualPrice}`);

  const c = sales.checkoutFor(actualPrice);
  const wantUrl = price === 'full' ? sales.CHECKOUT_FULL_URL : sales.CHECKOUT_SALE_URL;
  const wantValue = price === 'full' ? 99 : 67;
  const which = price === 'full' ? 'CHECKOUT_FULL_URL' : 'CHECKOUT_SALE_URL';
  check(c.url === wantUrl && c.value === wantValue, `checkout link is ${which}, value ${wantValue}`, `url=${c.url} value=${c.value}`);
  const shownPrice = sales.forPhase(sales.SCREEN_RESET.pricing.price, actualPrice);
  const anchor = sales.forPhase(sales.SCREEN_RESET.pricing.anchor, actualPrice);
  check(shownPrice === `$${wantValue}` && (price === 'full' ? anchor === null : anchor === '$99'), 'price on the card', `price=${shownPrice} crossed-out=${anchor}`);

  const b = banner.phaseAt(now);
  check(b === bannerPhase, 'banner phase', `expected=${bannerPhase} actual=${b}`);
  const painted = shownBy(runScript(now, '/about/'));
  check(painted === bannerPhase, '  before-paint script agrees', `shows=${painted}`);

  const p = popup.phaseAt(now);
  check(p === popupPhase, 'popup phase', `expected=${popupPhase} actual=${p}`);

  // What is on the screen at this moment: sales page, courses page, banner, popup.
  const salesHtml = pageHtml.sales(actualPrice);
  const coursesHtml = pageHtml.courses(actualPrice);
  const shownBanner = b ? bannerHtml(b) : '';
  const shownPopup = p ? popup.POPUPS[p] : null;
  if (price === 'sale') {
    const faqLine = sales.SCREEN_RESET.faq.items.find((f) => f.saleOnly).a;
    const sp = everySalePriceIsAnchored(salesHtml, [faqLine]);
    check(sp.ok && sp.count >= 3, 'sales page: every $67 sits next to a crossed-out $99', `${sp.count} outside the FAQ answer${sp.bare.length ? ' | bare: ' + sp.bare[0] : ''}`);
    check(salesHtml.includes(faqLine), 'sales page: the FAQ answer about the price is there');
    check(/Black Friday/.test(words(salesHtml)), 'sales page: says Black Friday');
    const cp = everySalePriceIsAnchored(coursesHtml);
    check(cp.ok && cp.count === 1, 'courses page: $99 crossed out next to $67', `count=${cp.count}`);
    check(words(coursesHtml).includes(COURSES.courses[0].priceNote.sale), 'courses page: Black Friday price note', COURSES.courses[0].priceNote.sale);
    if (b) {
      const bp = everySalePriceIsAnchored(shownBanner);
      // Two lines in the HTML (wide screens and phones), one shown at a time.
      check(bp.ok && bp.count === 2, 'banner: $99 crossed out next to $67, on both lines', `count=${bp.count}`);
      check(/^ ?Black Friday: The Screen Reset, a weekend course to help parents stop fighting over screens\. \$99 \$67 through Nov 30\. Black Friday: The Screen Reset, \$99 \$67 through Nov 30\./.test(words(shownBanner)), 'banner: reads as approved', words(shownBanner).trim().slice(0, 60));
    } else {
      check(shownBanner === '', 'no banner yet');
    }
    if (shownPopup) {
      check(/^Black Friday price · through Monday, Nov 30$/.test(shownPopup.eyebrow), 'popup: Black Friday line', shownPopup.eyebrow);
      check(shownPopup.priceAnchor === '$99' && shownPopup.price === '$67', 'popup: $99 crossed out next to $67', `crossed-out=${shownPopup.priceAnchor} price=${shownPopup.price}`);
    } else {
      check(shownPopup === null, 'no popup yet');
    }
  } else {
    for (const [name, html] of [['sales page', salesHtml], ['courses page', coursesHtml], ['banner', shownBanner]]) {
      const text = words(html);
      check(html.length > 0 && !/<s\b/.test(html), `${name}: nothing crossed out`);
      check(!SALE_WORDS.test(text), `${name}: no $67, no Black Friday, no Nov 30`, firstHit(text, SALE_WORDS));
    }
    check(/\$99/.test(words(salesHtml)) && /\$99/.test(words(coursesHtml)), 'sales page and courses page show $99');
    check(words(coursesHtml).includes(`$99 ${COURSES.courses[0].priceNote.full}`), 'courses page: $99 with the full-price note', COURSES.courses[0].priceNote.full);
    check(shownPopup === null, 'popup: none');
  }
}

console.log('\n— exact switch moments (one second either side) —');
const S = schedule.SCREEN_RESET_SALE_STARTS;
const E = schedule.SCREEN_RESET_SALE_ENDS;
check(banner.phaseAt(S - 1000) === null && popup.phaseAt(S - 1000) === null, 'one second before sale start: no banner, no popup');
check(banner.phaseAt(S) === 'screenResetSale' && popup.phaseAt(S) === 'screenResetSale', 'at sale start: sale banner and sale popup');
check(schedule.screenResetPriceAt(E - 1000) === 'sale' && banner.phaseAt(E - 1000) === 'screenResetSale' && popup.phaseAt(E - 1000) === 'screenResetSale', 'one second before sale end: still $67, sale banner, sale popup');
check(schedule.screenResetPriceAt(E) === 'full' && banner.phaseAt(E) === 'screenReset' && popup.phaseAt(E) === null, 'at sale end: $99, plain banner, no popup');
check(banner.phaseAt(at('2027-06-01T12:00:00-05:00')) === 'screenReset' && popup.phaseAt(at('2027-06-01T12:00:00-05:00')) === null && schedule.screenResetPriceAt(at('2027-06-01T12:00:00-05:00')) === 'full', 'six months later: still $99, plain banner, no popup');

console.log('\n— sale copy vs full-price copy —');
const strings = [];
(function walk(v, phase, out) {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => walk(x, phase, out));
  else if (v && typeof v === 'object') {
    if ('sale' in v && 'full' in v) walk(sales.forPhase(v, phase), phase, out);
    else if (!(v.saleOnly && phase === 'full')) Object.values(v).forEach((x) => walk(x, phase, out));
  }
  return out;
})(sales.SCREEN_RESET, 'full', strings);
// The countdown label only renders in the sale state (the component checks).
const fullText = strings.filter((x) => x !== sales.SCREEN_RESET.hero.countdown.title).join(' | ');
check(!/\$67|November 30|Nov 30/.test(fullText), 'full-price copy never mentions $67 or November 30', (fullText.match(/[^|]*(\$67|Nov(ember)? 30)[^|]*/) || [''])[0].trim());
check(/\$99/.test(fullText), 'full-price copy shows $99');
check(!strings.includes('What happens to the price?'), 'full-price FAQ drops "What happens to the price?"');
const eb = banner.BANNERS.screenReset;
check(!/\$|Nov|\d{4}/.test(eb.text + eb.textShort) && !eb.countdownTo, 'plain banner has no price, date or countdown', eb.textShort);
check(banner.BANNERS.screenResetSale.countdownTo === E && popup.POPUPS.screenResetSale.countdownTo === E, 'sale banner and popup count down to the sale end');

console.log('\n— pages that hide the banner and popup —');
const mid = at('2026-11-25T12:00:00-06:00');
const after = at('2026-12-05T12:00:00-06:00');
for (const path of ['/screen-reset/', '/screen-reset/thank-you/', '/autopilot/', '/autopilot/thank-you/', '/autopilot/enroll-preview/', '/workshop/', '/workshop/thank-you/', '/workshop/replay/']) {
  check(runScript(mid, path)['data-banner'] === 'hidden' && runScript(after, path)['data-banner'] === 'hidden', `banner hidden on ${path}`);
  check(popup.HIDDEN_PATHS.screenResetSale.includes(path), `popup hidden on ${path}`);
}
check(shownBy(runScript(mid, '/')) === 'screenResetSale', 'sale banner shows on the home page');
check(shownBy(runScript(mid, '/courses')) === 'screenResetSale', 'sale banner shows on /courses (no trailing slash)');
check(shownBy(runScript(mid, '/screen-reset')) === null, 'banner hidden on /screen-reset (no trailing slash)');

console.log('\n— dismissing the banner —');
const saleCookie = `${BANNER_COOKIE}=${encodeURIComponent(versions.screenResetSale)}`;
check(runScript(mid, '/about/', saleCookie)['data-banner'] === 'hidden', 'a dismissed sale banner stays hidden during the sale');
check(shownBy(runScript(after, '/about/', saleCookie)) === 'screenReset', 'someone who dismissed the sale banner still sees the plain one');
check(popup.POPUPS.screenResetSale.seenKey && !Object.entries(popup.POPUPS).some(([k, v]) => k !== 'screenResetSale' && v.seenKey === popup.POPUPS.screenResetSale.seenKey), 'the popup has its own seenKey', popup.POPUPS.screenResetSale.seenKey);

console.log('\n— Autopilot is untouched —');
check(banner.AUTOPILOT_OVERRIDE === 'off' && popup.AUTOPILOT_OVERRIDE === 'off', 'Autopilot banner and popup are still switched off');
const AUTOPILOT = ['waitlist', 'workshop', 'sales'];
for (const central of ['2026-11-17T12:00:00-06:00', '2026-11-20T12:00:00-06:00', '2026-11-25T12:00:00-06:00', '2026-12-05T12:00:00-06:00']) {
  const b = banner.phaseAt(at(central));
  const p = popup.phaseAt(at(central));
  check(!AUTOPILOT.includes(b) && !AUTOPILOT.includes(p), `no Autopilot banner or popup at ${central}`, `banner=${b} popup=${p}`);
}
check(schedule.autopilotPageAt(mid) === 'waitlist' && schedule.autopilotPageAt(after) === 'waitlist', '/autopilot/ is still the waitlist page');

console.log('\n— checkout links —');
const placeholders = [
  ['CHECKOUT_SALE_URL', sales.CHECKOUT_SALE_URL],
  ['CHECKOUT_FULL_URL', sales.CHECKOUT_FULL_URL],
].filter(([, url]) => url === sales.CHECKOUT_PLACEHOLDER || /placeholder|todo/i.test(url));
for (const [name, url] of [['CHECKOUT_SALE_URL', sales.CHECKOUT_SALE_URL], ['CHECKOUT_FULL_URL', sales.CHECKOUT_FULL_URL]]) {
  let host = '';
  try { host = new URL(url).hostname; } catch { /* reported below */ }
  check(/(^|\.)(courses\.growthmindsetparenting\.com|mykajabi\.com)$/i.test(host), `${name} is a Kajabi link (utm tags will be carried)`, url);
}
if (placeholders.length === 0) {
  check(true, 'both checkout links are real (no placeholder)');
  check(sales.CHECKOUT_SALE_URL !== sales.CHECKOUT_FULL_URL, 'the $67 and $99 links are different offers');
} else if (REQUIRE_LIVE) {
  for (const [name, url] of placeholders) check(false, `${name} is still a PLACEHOLDER`, url);
} else {
  for (const [name] of placeholders) console.log(`WARN  ${name} is still a placeholder (allowed without --require-live-checkout)`);
}

if (failed) {
  console.error(`\n${failed} check(s) wrong.`);
  if (REQUIRE_LIVE && placeholders.length) {
    console.error('NOT READY TO GO LIVE: put the real Kajabi checkout links in data/screen-reset-sales.js.');
  }
  process.exit(1);
}
console.log(`\nAll Screen Reset checks correct.${placeholders.length ? ' (Checkout links are still placeholders.)' : ''}`);
