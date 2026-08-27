/**
 * extract-live.mjs — renders every page of the site in a real browser and
 * dumps the visible copy, so the spreadsheet can be compared against what a
 * visitor actually sees rather than against the JSX source.
 *
 * Usage:
 *   node scripts/copy-sync/extract-live.mjs --base http://localhost:3456 --out /tmp/live.json
 *   node scripts/copy-sync/extract-live.mjs --base https://growthmindsetparenting.com --out /tmp/prod.json
 *
 * Freebie pages are captured twice — once per A/B variant — by pinning the
 * `freebie-variant` cookie, plus the capture modal's contents.
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const BASE = (args.base || 'http://localhost:3456').replace(/\/$/, '');
const OUT = args.out || '/tmp/live-copy.json';

/** Sheet "Page" value → site path. */
export const PAGE_MAP = {
  'HOME': '/',
  'WRITING': '/writing/',
  'COURSE': '/course/',
  'ABOUT': '/about/',
  'WORK WITH ME': '/work-with-me/',
  'FREEBIE / 4S FLOWCHART': '/freebies/4s-flowchart/',
  'FREEBIE / FIVE-MINUTE MEETING': '/freebies/five-minute-meeting/',
  'FREEBIE / RELEASE REPLAY REPAIR RETURN': '/freebies/release-replay-repair-return/',
  'FREEBIE / SIX MIDDLE SKILLS': '/freebies/six-middle-skills/',
  'FREEBIE / EMOTIONAL LITERACY': '/freebies/emotional-literacy/',
};

/**
 * Pull the visible copy at every granularity, plus placeholders and alt text.
 *
 * Two things matter here:
 *  - Text is collected with a SPACE between element boundaries. Raw textContent
 *    glues siblings together ("02" + "Autonomy" -> "02Autonomy"), which makes a
 *    perfectly correct spreadsheet row look like a mismatch.
 *  - Every element is emitted, not only leaf/own-text ones, so a row that the
 *    site splits across sibling elements still has a container to match against.
 */
function harvest() {
  const out = [];
  const seen = new Set();

  // textContent, but with element boundaries treated as whitespace.
  const spaced = (el) => {
    let s = '';
    const walk = (node) => {
      for (const n of node.childNodes) {
        if (n.nodeType === 3) s += n.textContent;
        else if (n.nodeType === 1) {
          const t = n.tagName.toLowerCase();
          if (t === 'script' || t === 'style' || t === 'noscript') continue;
          s += ' ';
          walk(n);
          s += ' ';
        }
      }
    };
    walk(el);
    return s.replace(/\s+/g, ' ').trim();
  };

  const push = (text, tag, cls) => {
    const t = (text || '').replace(/\s+/g, ' ').trim();
    if (!t || t.length > 4000) return;
    const key = tag + '|' + t;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ text: t, tag, cls: String(cls || '') });
  };

  document.querySelectorAll('body *').forEach((el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'script' || tag === 'style' || tag === 'noscript') return;
    if (el.placeholder) push(el.placeholder, tag + '[placeholder]', el.className);
    if (tag === 'img' && el.alt) push(el.alt, 'img[alt]', el.className);
    push(spaced(el), tag, el.className);
  });

  return {
    title: document.title,
    description: (document.querySelector('meta[name=description]') || {}).content || '',
    bodyText: spaced(document.body),
    elements: out,
  };
}

/** Merge a harvest into an accumulator, de-duplicating by tag+text. */
function mergeHarvest(acc, next) {
  if (!acc) return { ...next, elements: [...next.elements] };
  const seen = new Set(acc.elements.map((e) => e.tag + '|' + e.text));
  for (const el of next.elements) {
    const key = el.tag + '|' + el.text;
    if (!seen.has(key)) { seen.add(key); acc.elements.push(el); }
  }
  acc.bodyText += '  ' + next.bodyText;
  return acc;
}

async function capture(context, path, { openModal = false } = {}) {
  const page = await context.newPage();
  const url = BASE + path;
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  const status = res ? res.status() : 0;
  await page.waitForTimeout(400);
  let base = mergeHarvest(null, await page.evaluate(harvest));

  // Accordions render their body only while expanded ({isOpen && …}), so the
  // copy simply does not exist in the DOM until each one is clicked open.
  // Expand every collapsed toggle, harvesting after each.
  const toggles = page.locator('[aria-expanded]');
  const count = await toggles.count();
  for (let i = 0; i < count; i++) {
    const t = toggles.nth(i);
    try {
      if ((await t.getAttribute('aria-expanded')) === 'true') continue;
      await t.click({ timeout: 3000 });
      await page.waitForTimeout(150);
      base = mergeHarvest(base, await page.evaluate(harvest));
    } catch {
      // Not clickable (covered, off-screen, or detached) — skip it.
    }
  }

  let modal = null;
  if (openModal) {
    // Must be a CTA button that opens the capture modal — NOT the hero form's
    // submit button, which just fails validation on an empty email.
    const btn = page.locator('.fb-cta button.gmp-btn-primary').first();
    if (await btn.count()) {
      await btn.click();
      await page.waitForTimeout(500);
      const dialog = page.locator('[role=dialog]');
      if (await dialog.count()) {
        modal = await dialog.first().evaluate((el) => {
          const items = [];
          el.querySelectorAll('*').forEach((n) => {
            if (n.placeholder) items.push({ text: n.placeholder, tag: n.tagName.toLowerCase() + '[placeholder]' });
            const own = Array.from(n.childNodes).filter((x) => x.nodeType === 3).map((x) => x.textContent).join(' ');
            if (own.trim()) items.push({ text: n.textContent.replace(/\s+/g, ' ').trim(), tag: n.tagName.toLowerCase() });
          });
          return { bodyText: el.textContent.replace(/\s+/g, ' ').trim(), elements: items };
        });
      }
    }
  }
  await page.close();
  return { url, path, status, ...base, modal };
}

const browser = await chromium.launch();
const result = { base: BASE, capturedAt: new Date().toISOString(), pages: {} };

for (const [sheetPage, path] of Object.entries(PAGE_MAP)) {
  const isFreebie = sheetPage.startsWith('FREEBIE');
  if (!isFreebie) {
    const ctx = await browser.newContext();
    result.pages[sheetPage] = await capture(ctx, path);
    await ctx.close();
    console.log(`  ${result.pages[sheetPage].status}  ${path}`);
    continue;
  }
  const variants = {};
  for (const variant of ['worksheet', 'kitchen-table']) {
    const ctx = await browser.newContext();
    await ctx.addCookies([
      { name: 'freebie-variant', value: variant, url: BASE },
    ]);
    variants[variant] = await capture(ctx, path, { openModal: true });
    await ctx.close();
    console.log(`  ${variants[variant].status}  ${path}  [${variant}]`);
  }
  result.pages[sheetPage] = { ...variants.worksheet, variants };
}

await browser.close();
writeFileSync(OUT, JSON.stringify(result, null, 2));
console.log(`\nWrote ${OUT}`);
