// Checks the purchase tracking on /screen-reset/thank-you/
// (components/ScreenResetPurchaseTracker.jsx): a purchase is reported to
// Google Analytics and the Meta pixel exactly once, and only when Kajabi's
// link ends in ?offer=sale or ?offer=full.
//
// Needs the site running. Nothing is sent to Google or Meta: the page's
// gtag and fbq are swapped for stand-ins that only write down what they
// were asked to send.
//
//   node scripts/screen-reset-purchase-check.mjs                    # localhost:3456
//   node scripts/screen-reset-purchase-check.mjs --base http://localhost:3422

import { chromium } from 'playwright';

const args = process.argv.slice(2);
const baseAt = args.indexOf('--base');
const BASE = (baseAt > -1 ? args[baseAt + 1] : 'http://localhost:3456').replace(/\/$/, '');
const PAGE = `${BASE}/screen-reset/thank-you/`;
const GUARD_KEY = 'gmp_screen_reset_purchase_reported';

let failed = 0;
const check = (ok, label, detail = '') => {
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(66)} ${detail}`);
};

// Stand-ins for gtag and fbq, put in before the page's own code runs on
// every load. `delayMs` makes them show up late, the way the real ones do.
const stubs = (delayMs) => `
  window.__ga = []; window.__fb = [];
  var install = function () {
    window.gtag = function () { window.__ga.push(Array.prototype.slice.call(arguments)); };
    window.fbq = function () { window.__fb.push(Array.prototype.slice.call(arguments)); };
  };
  if (${delayMs}) setTimeout(install, ${delayMs}); else install();
`;

async function newVisitor(browser, { delayMs = 0 } = {}) {
  const ctx = await browser.newContext();
  await ctx.addInitScript(stubs(delayMs));
  return { ctx, page: await ctx.newPage() };
}

// What the page reported on this load, after giving it time to send.
async function reported(page, waitMs = 1500) {
  await page.waitForTimeout(waitMs);
  return page.evaluate((key) => ({
    ga: window.__ga.filter((c) => c[0] === 'event' && c[1] === 'purchase').map((c) => c[2]),
    fb: window.__fb.filter((c) => c[0] === 'track' && c[1] === 'Purchase').map((c) => c[2]),
    url: location.pathname + location.search,
    guard: localStorage.getItem(key),
  }), GUARD_KEY);
}

const gaOk = (e, value) =>
  e && e.value === value && e.currency === 'USD' && /^sr-\d+-[a-z0-9]+$/.test(e.transaction_id || '') &&
  Array.isArray(e.items) && e.items.length === 1 && e.items[0].item_id === 'screen-reset' &&
  e.items[0].item_name === 'The Screen Reset' && e.items[0].price === value && e.items[0].quantity === 1;
const fbOk = (e, value) =>
  e && e.value === value && e.currency === 'USD' && e.content_name === 'The Screen Reset' &&
  Array.isArray(e.content_ids) && e.content_ids[0] === 'screen-reset' && e.content_type === 'product';

const browser = await chromium.launch();

console.log(`— someone just visiting the page (${PAGE}) —`);
{
  const { ctx, page } = await newVisitor(browser);
  await page.goto(PAGE, { waitUntil: 'load' });
  let r = await reported(page);
  check(r.ga.length === 0 && r.fb.length === 0, 'no ?offer: nothing reported', `ga=${r.ga.length} meta=${r.fb.length}`);
  check(r.guard === null, 'no ?offer: nothing remembered in the browser', `guard=${r.guard}`);
  await page.goto(`${PAGE}?offer=free`, { waitUntil: 'load' });
  r = await reported(page);
  check(r.ga.length === 0 && r.fb.length === 0, '?offer=free (not a real offer): nothing reported', `ga=${r.ga.length} meta=${r.fb.length}`);
  await page.goto(`${PAGE}?offer=SALE`, { waitUntil: 'load' });
  r = await reported(page);
  check(r.ga.length === 0 && r.fb.length === 0, '?offer=SALE (wrong capitals): nothing reported', `ga=${r.ga.length} meta=${r.fb.length}`);
  await ctx.close();
}

console.log('\n— a $67 buyer: run 1 (arrives from Kajabi), run 2 (refresh), run 3 (sent back again) —');
{
  const { ctx, page } = await newVisitor(browser);
  await page.goto(`${PAGE}?offer=sale&utm_source=kajabi`, { waitUntil: 'load' });
  let r = await reported(page);
  check(r.ga.length === 1, 'run 1: exactly one GA4 purchase', `count=${r.ga.length}`);
  check(gaOk(r.ga[0], 67), 'run 1: GA4 purchase is $67, USD, one screen-reset item', JSON.stringify(r.ga[0]));
  check(r.fb.length === 1, 'run 1: exactly one Meta Purchase', `count=${r.fb.length}`);
  check(fbOk(r.fb[0], 67), 'run 1: Meta Purchase is $67, USD, screen-reset', JSON.stringify(r.fb[0]));
  check(r.url === '/screen-reset/thank-you/?utm_source=kajabi', 'run 1: "offer" is gone from the address bar, the rest is kept', r.url);
  check(Number(r.guard) > 0, 'run 1: the browser remembers it reported', `guard=${r.guard}`);

  await page.reload({ waitUntil: 'load' });
  r = await reported(page);
  check(r.ga.length === 0 && r.fb.length === 0, 'run 2 (refresh): nothing reported again', `ga=${r.ga.length} meta=${r.fb.length}`);

  await page.goto(`${PAGE}?offer=sale`, { waitUntil: 'load' });
  r = await reported(page);
  check(r.ga.length === 0 && r.fb.length === 0, 'run 3 (same link opened again): nothing reported again', `ga=${r.ga.length} meta=${r.fb.length}`);
  check(r.url === '/screen-reset/thank-you/', 'run 3: "offer" is still taken off the address bar', r.url);

  await page.goto(`${PAGE}?offer=full`, { waitUntil: 'load' });
  r = await reported(page);
  check(r.ga.length === 0 && r.fb.length === 0, 'run 4 (other offer, same browser, same day): not counted', `ga=${r.ga.length} meta=${r.fb.length}`);

  // More than 24 hours later the same browser can report a new purchase.
  await page.evaluate((key) => localStorage.setItem(key, String(Date.now() - 25 * 60 * 60 * 1000)), GUARD_KEY);
  await page.goto(`${PAGE}?offer=full`, { waitUntil: 'load' });
  r = await reported(page);
  check(r.ga.length === 1 && gaOk(r.ga[0], 99) && r.fb.length === 1, 'run 5 (25 hours later): a new purchase is counted once', `ga=${r.ga.length} meta=${r.fb.length}`);
  await ctx.close();
}

console.log('\n— a $99 buyer in a fresh browser, with GA and Meta loading 2 seconds late —');
{
  const { ctx, page } = await newVisitor(browser, { delayMs: 2000 });
  await page.goto(`${PAGE}?offer=full`, { waitUntil: 'load' });
  let r = await reported(page, 3500);
  check(r.ga.length === 1 && gaOk(r.ga[0], 99), 'exactly one GA4 purchase, $99', JSON.stringify(r.ga));
  check(r.fb.length === 1 && fbOk(r.fb[0], 99), 'exactly one Meta Purchase, $99', JSON.stringify(r.fb));
  check(r.url === '/screen-reset/thank-you/', '"offer" is gone from the address bar', r.url);
  await page.reload({ waitUntil: 'load' });
  r = await reported(page, 3500);
  check(r.ga.length === 0 && r.fb.length === 0, 'refresh: nothing reported again', `ga=${r.ga.length} meta=${r.fb.length}`);
  await ctx.close();
}

console.log('\n— GA and Meta never load (blocked, or no IDs set) —');
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(`${PAGE}?offer=sale`, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const live = await page.evaluate(() => ({ gtag: typeof window.gtag, fbq: typeof window.fbq, h1: document.querySelector('h1')?.textContent }));
  if (live.gtag === 'function' || live.fbq === 'function') {
    console.log('SKIP  this build has real GA/Meta IDs, so "never loads" cannot be tested here');
  } else {
    check(errors.length === 0 && Boolean(live.h1), 'the page still works and throws no errors', errors.join(' | '));
  }
  await ctx.close();
}

await browser.close();
if (failed) {
  console.error(`\n${failed} check(s) wrong.`);
  process.exit(1);
}
console.log('\nAll purchase-tracking checks correct.');
