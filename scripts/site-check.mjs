/**
 * site-check.mjs — full pre-deploy check for growthmindsetparenting.com.
 *
 *   node scripts/site-check.mjs                          # against localhost:3456
 *   node scripts/site-check.mjs --base https://…         # against a deploy
 *
 * Replaces the old smoke-test.mjs, which still tested /letters/ and /practices/
 * — routes that no longer exist, so it passed by never reaching them.
 *
 * Deliberately does NOT submit a real signup: a valid email plus a valid slug
 * would create an actual Kit subscriber. Form wiring is checked structurally
 * and through the API's validation paths, which return before Kit is called.
 */

import { chromium } from 'playwright';
import { FREEBIES } from '../content/freebies.js';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);
const BASE = (args.base || 'http://localhost:3456').replace(/\/$/, '');
const MOBILE = { width: 375, height: 812 };

const PAGES = ['/', '/writing/', '/course/', '/about/', '/work-with-me/', '/privacy/', '/terms/'];
const FREEBIE_PATHS = Object.keys(FREEBIES).map((s) => `/freebies/${s}/`);
const ASSETS = ['/sitemap.xml', '/robots.txt', '/feed.xml'];
const VARIANTS = ['worksheet', 'kitchen-table'];

let pass = 0, fail = 0;
const failures = [];
const ok = (m) => { pass++; console.log(`  ✅ ${m}`); };
const bad = (m) => { fail++; failures.push(m); console.log(`  ❌ ${m}`); };
const check = (cond, m) => (cond ? ok(m) : bad(m));

// Load a page for inspection. Uses 'load', not 'networkidle': every page is
// static, so the DOM is complete at load — but third-party analytics (GA/GTM)
// can keep a request pending indefinitely under load, and waiting for idle then
// hangs on a page that is actually fine. A short settle covers hydration.
async function visit(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(300);
}

const browser = await chromium.launch();

// ── 1. Every route responds ──────────────────────────────────────────────────
console.log('\n1. Route health');
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  for (const path of [...PAGES, ...FREEBIE_PATHS, ...ASSETS]) {
    const res = await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 45000 });
    check(res && res.status() === 200, `${path} → ${res ? res.status() : 'no response'}`);
  }
  const res404 = await page.goto(BASE + '/definitely-not-a-page/', { waitUntil: 'domcontentloaded' });
  check(res404 && res404.status() === 404, `unknown route → ${res404 ? res404.status() : '?'} (expected 404)`);
  await ctx.close();
}

// ── 2. Metadata ──────────────────────────────────────────────────────────────
console.log('\n2. Page metadata');
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  for (const path of [...PAGES, ...FREEBIE_PATHS]) {
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    const desc = await page.locator('meta[name=description]').first().getAttribute('content').catch(() => null);
    check(title && title.length > 5, `${path} has a title (${JSON.stringify((title || '').slice(0, 40))})`);
    check(desc && desc.length > 20, `${path} has a meta description`);
  }
  await ctx.close();
}

// ── 3. Console errors and failed requests ────────────────────────────────────
console.log('\n3. Runtime errors');
for (const path of [...PAGES, ...FREEBIE_PATHS]) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => {
    // Analytics/beacon blocking is environmental, not a site defect.
    if (!/googletagmanager|google-analytics|doubleclick|pinterest/.test(r.url())) {
      errors.push(`request failed ${r.url()}`);
    }
  });
  await visit(page, BASE + path);
  check(errors.length === 0, `${path} loads without console errors${errors.length ? ' — ' + errors.slice(0, 2).join(' | ') : ''}`);
  await ctx.close();
}

// ── 4. Mobile layout ─────────────────────────────────────────────────────────
console.log('\n4. Mobile 375px — no horizontal overflow');
{
  const ctx = await browser.newContext({ viewport: MOBILE });
  const page = await ctx.newPage();
  for (const path of [...PAGES, ...FREEBIE_PATHS]) {
    await visit(page, BASE + path);
    const { scroll, view } = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      view: window.innerWidth,
    }));
    check(scroll <= view + 1, `${path} (scrollWidth ${scroll} vs viewport ${view})`);
  }
  await ctx.close();
}

// ── 5. Internal links resolve ────────────────────────────────────────────────
console.log('\n5. Internal links');
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const seen = new Set();
  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    for (const h of hrefs) {
      if (!h || h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('http')) continue;
      seen.add(h);
    }
  }
  for (const href of seen) {
    const res = await page.request.get(BASE + href).catch(() => null);
    check(res && res.status() < 400, `link ${href} → ${res ? res.status() : 'error'}`);
  }
  await ctx.close();
}

// ── 6. Both A/B variants render, with copy from the config ───────────────────
console.log('\n6. Freebie A/B variants');
for (const [slug, f] of Object.entries(FREEBIES)) {
  for (const variant of VARIANTS) {
    const ctx = await browser.newContext();
    await ctx.addCookies([{ name: 'freebie-variant', value: variant, url: BASE }]);
    const page = await ctx.newPage();
    await visit(page, `${BASE}/freebies/${slug}/`);

    const text = (await page.evaluate(() => document.body.textContent)).replace(/\s+/g, ' ');
    const flat = (s) => String(s).replace(/\s+/g, ' ').trim();
    check(text.includes(flat(f.heroHeadline)), `${slug} [${variant}] shows the hero headline`);
    check(text.includes(flat(f.heroSubhead)), `${slug} [${variant}] shows the hero subhead`);
    check(text.includes(flat(f.outcomes[0].title)), `${slug} [${variant}] shows outcome 1`);

    // The italic phrase has to survive as a real <em>, not silently no-op.
    if (f.heroHeadlineItalic) {
      const ems = await page.$$eval('h1 em', (els) => els.map((e) => e.textContent.trim()));
      check(ems.some((e) => e === flat(f.heroHeadlineItalic)), `${slug} [${variant}] hero italic renders as <em>`);
    }

    const heroForm = await page.locator('form.fb-hero-form').count();
    check(heroForm > 0, `${slug} [${variant}] hero capture form present`);

    // CTA opens the modal
    await page.locator('.fb-cta button.gmp-btn-primary').first().click();
    await page.waitForTimeout(300);
    const dialog = page.locator('[role=dialog]');
    check((await dialog.count()) > 0, `${slug} [${variant}] CTA opens the capture modal`);
    if (await dialog.count()) {
      const dText = await dialog.first().evaluate((el) => el.textContent);
      check(dText.includes('Where should I send it?'), `${slug} [${variant}] modal shows its heading`);
      check((await dialog.locator('input[type=email]').count()) > 0, `${slug} [${variant}] modal has an email field`);
    }
    await ctx.close();
  }
}

// ── 7. Kit wiring ────────────────────────────────────────────────────────────
console.log('\n7. Kit form wiring');
{
  const routeSrc = await (await import('fs')).promises.readFile(
    new URL('../app/api/subscribe/route.js', import.meta.url), 'utf8'
  );
  for (const [slug, f] of Object.entries(FREEBIES)) {
    const re = new RegExp(`'${slug}':\\s*'${f.kitFormId}'`);
    check(re.test(routeSrc), `${slug} form id ${f.kitFormId} matches the subscribe route`);
  }

  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  // Invalid email is rejected before Kit is ever called — safe to exercise.
  const r1 = await page.request.post(BASE + '/api/subscribe', {
    data: { email: 'not-an-email', slug: '4s-flowchart', variant: 'worksheet' },
  });
  check(r1.status() === 400, `subscribe rejects an invalid email → ${r1.status()}`);
  // Unknown slug also returns before the Kit call, so no subscriber is created.
  const r2 = await page.request.post(BASE + '/api/subscribe', {
    data: { email: 'deploy-check@example.com', slug: 'no-such-guide', variant: 'worksheet' },
  });
  check(r2.status() >= 400, `subscribe rejects an unknown guide → ${r2.status()}`);
  await ctx.close();
}

// ── 8. Images have alt text ──────────────────────────────────────────────────
console.log('\n8. Image alt text');
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  for (const path of [...PAGES, ...FREEBIE_PATHS]) {
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    const missing = await page.$$eval('img', (imgs) =>
      imgs.filter((i) => !i.getAttribute('alt') && i.getAttribute('aria-hidden') !== 'true')
        .map((i) => i.getAttribute('src'))
    );
    check(missing.length === 0, `${path} images all have alt text${missing.length ? ' — missing: ' + missing.slice(0, 2).join(', ') : ''}`);
  }
  await ctx.close();
}

await browser.close();

console.log(`\n${'─'.repeat(60)}`);
console.log(`${pass} passed, ${fail} failed  (${BASE})`);
if (fail) {
  console.log('\nFailures:');
  failures.forEach((f) => console.log('  • ' + f));
  process.exit(1);
}
