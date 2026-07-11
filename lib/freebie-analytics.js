// GA4 events for the freebie-page A/B test. No-ops when gtag is unavailable
// (GA not configured, SSR, or a non-JS crawler). `variant` and `slug` must be
// registered as GA4 custom dimensions (event-scoped) to appear in reports — see
// Task 9. The window.gtag global is provided by @next/third-parties/google.
export function trackFreebieView(variant, slug) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'freebie_view', { variant, slug });
}

export function trackFreebieSubscribe(variant, slug) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'freebie_subscribe', { variant, slug });
}
