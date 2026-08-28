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
