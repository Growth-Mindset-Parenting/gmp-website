// Remembers which link brought a visitor to the site, so every signup form
// can tell Kit where the person came from (Kit custom fields utm_*).
// Naming rules for the tags: Growth_Mindset/Link_Tracking/Plans/2026-09-17-link-tracking-plan.md
//
// The cookie is SET by middleware.js (a server-set cookie keeps its full
// 90 days in Safari / Instagram / TikTok browsers; a script-set one is capped
// at 7). Browser code only READS it.
//   - A visit with utm_* tags saves them (newest tagged visit wins).
//   - A visit with no tags, from another website, saves that site as the
//     source (medium "referral"). A newer referral replaces an older referral,
//     but never replaces a tagged visit.
// Tracking must never break a signup: nothing here throws.

export const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
export const ATTRIBUTION_COOKIE = 'gmp_src';
export const ATTRIBUTION_MAX_AGE = 60 * 60 * 24 * 90;

// Hosts that are never a "source": our own sites and the checkout/webinar
// tools people bounce back from.
const IGNORED_REFERRERS =
  /(^|\.)(growthmindsetparenting\.com|kajabi\.com|mykajabi\.com|stripe\.com|paypal\.com|easywebinar\.(com|live)|kit\.com|convertkit\.com)$|^localhost$/i;

const clean = (v) => String(v).trim().toLowerCase().slice(0, 100);

// utm_* from a query string, any capitalization of the names.
export function tagsFromSearch(searchParams) {
  const tags = {};
  try {
    for (const [k, v] of searchParams) {
      const key = k.toLowerCase();
      if (UTM_FIELDS.includes(key) && v && !tags[key]) tags[key] = clean(v);
    }
  } catch {
    // ignore
  }
  return tags.utm_source ? tags : {};
}

// What the cookie should become for this visit, or null to leave it alone.
export function nextAttribution({ searchParams, referrer, saved, landing }) {
  try {
    const tags = tagsFromSearch(searchParams);
    if (tags.utm_source) return { ...tags, landing: String(landing).slice(0, 100) };
    if (saved?.utm_source && saved.utm_medium !== 'referral') return null;

    let host = '';
    try {
      host = referrer ? new URL(referrer).hostname.replace(/^www\./, '') : '';
    } catch {
      host = '';
    }
    if (!host || IGNORED_REFERRERS.test(host)) return null;
    if (saved?.utm_source === clean(host)) return null;
    return { utm_source: clean(host), utm_medium: 'referral', landing: String(landing).slice(0, 100) };
  } catch {
    return null;
  }
}

export function parseAttribution(raw) {
  try {
    const value = raw ? JSON.parse(raw) : null;
    return value && typeof value === 'object' ? value : null;
  } catch {
    return null;
  }
}

// ---- browser-only helpers (call from event handlers / effects) ----

function readCookie() {
  try {
    const hit = document.cookie.split('; ').find((c) => c.startsWith(`${ATTRIBUTION_COOKIE}=`));
    return hit ? parseAttribution(decodeURIComponent(hit.slice(ATTRIBUTION_COOKIE.length + 1))) : null;
  } catch {
    return null;
  }
}

// The visitor's tags, as { utm_source, utm_medium, ... } (only those present).
// Tags on the current URL win over the cookie.
export function getAttribution() {
  const out = {};
  try {
    const fromUrl = tagsFromSearch(new URLSearchParams(location.search));
    const source = fromUrl.utm_source ? fromUrl : readCookie() || {};
    for (const key of UTM_FIELDS) {
      if (typeof source[key] === 'string' && source[key]) out[key] = clean(source[key]);
    }
  } catch {
    // ignore
  }
  return out;
}

// Adds fields[utm_*] to a Kit public-form request body (URLSearchParams).
export function appendKitFields(body) {
  try {
    for (const [k, v] of Object.entries(getAttribution())) body.append(`fields[${k}]`, v);
  } catch {
    // ignore
  }
  return body;
}

// Adds the visitor's tags to an outgoing URL (e.g. Kajabi checkout), unless
// that URL already carries its own tags.
export function withAttribution(href) {
  try {
    const url = new URL(href, location.href);
    if (tagsFromSearch(url.searchParams).utm_source) return href;
    const tags = getAttribution();
    if (!tags.utm_source) return href;
    for (const [k, v] of Object.entries(tags)) url.searchParams.set(k, v);
    return url.toString();
  } catch {
    return href;
  }
}
