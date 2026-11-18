// Site-wide GA4 events. No-ops when gtag is unavailable (GA not configured,
// SSR, or a non-JS crawler). window.gtag comes from @next/third-parties/google.
//
// begin_checkout is a GA4 recommended event, so it lands in the Monetisation
// reports without extra config. We fire it as the visitor leaves for Kajabi —
// the checkout itself is on another domain and reports to a different GA4
// property, so this is the last measurable step on our side. It answers the
// question the site could not answer before: how many readers actually reach
// a checkout.
export function trackBeginCheckout({ location, value, currency = 'USD', itemName }) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'begin_checkout', {
    currency,
    value,
    checkout_location: location,
    items: [{ item_name: itemName, price: value, quantity: 1 }],
  });
}

// A finished purchase, reported from the thank-you page Kajabi sends the
// buyer back to (components/ScreenResetPurchaseTracker.jsx). `purchase` is a GA4
// recommended event, so it lands in the Monetisation reports as revenue.
// Kajabi does not pass us an order number, so `transactionId` is made up in
// the browser. GA loads late, so this waits for it (whenGtag below) and
// gives up quietly if GA never arrives.
export function trackPurchase({ transactionId, value, currency = 'USD', itemId, itemName }) {
  whenGtag((gtag) => {
    gtag('event', 'purchase', {
      transaction_id: transactionId,
      value,
      currency,
      items: [{ item_id: itemId, item_name: itemName, price: value, quantity: 1 }],
    });
  });
}

// The same purchase for the Meta (Facebook/Instagram) pixel. `Purchase` is
// one of Meta's standard events. The pixel (components/MetaPixel.jsx) loads
// after the page starts running, and not at all without a pixel ID, so this
// waits for it the same way and gives up quietly.
export function trackMetaPurchase({ value, currency = 'USD', itemId, itemName }) {
  whenFbq((fbq) => {
    fbq('track', 'Purchase', {
      value,
      currency,
      content_name: itemName,
      content_ids: [itemId],
      content_type: 'product',
    });
  });
}

// Announcement bar (components/SiteBanner.jsx). view_promotion and
// select_promotion are GA4 recommended events, so banner impressions and
// clicks land in the Promotions report without extra config — that is how we
// answer "how many waitlist signups did the banner actually drive".
export const BANNER_COOKIE = 'gmp_banner_dismissed';

// `creative` separates the surfaces in the Promotions report, so banner and
// popup numbers never get added together.
export function trackPromotion(event, item, creative = 'site-banner') {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, {
    promotion_id: item.version,
    promotion_name: item.cta,
    creative_name: creative,
  });
}

// Runs fn(gtag) once GA is ready. GA's script loads after the page starts
// running, so an event sent the moment a page opens would find no gtag and be
// silently dropped. Checks every 100ms and gives up after `timeoutMs`
// (GA not configured, or blocked by the browser).
export function whenGtag(fn, timeoutMs = 8000) {
  whenWindowFn('gtag', fn, timeoutMs);
}

// The same wait for the Meta pixel's fbq. Its starter snippet defines
// window.fbq straight away and queues events until Meta's own script has
// loaded, so an event sent as soon as fbq exists is not lost.
export function whenFbq(fn, timeoutMs = 8000) {
  whenWindowFn('fbq', fn, timeoutMs);
}

function whenWindowFn(name, fn, timeoutMs) {
  if (typeof window === 'undefined') return;
  const started = Date.now();
  const tryNow = () => {
    if (typeof window[name] === 'function') {
      fn(window[name]);
    } else if (Date.now() - started < timeoutMs) {
      setTimeout(tryNow, 100);
    }
  };
  tryNow();
}
