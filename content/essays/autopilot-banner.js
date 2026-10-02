import { CART_CLOSES, autopilotPageAt } from '../../data/launch-schedule';

// The Autopilot banner shown under the byline on every freebie essay.
// Phones get the tall version; wider screens get the wide one.
// Each essay sets its own `bannerHref` (waitlist) and `salesBannerHref`
// (Enroll now) so banner clicks are tracked apart from the essay's bottom
// button (see the GMP Link Tracker sheet, UTM tab).
export const AUTOPILOT_BANNER = {
  src: '/images/autopilot-banner-2x.png',
  mobileSrc: '/images/autopilot-banner-mobile-3x.png',
  alt: 'Autopilot: a 5 week course built to help parents stop overfunctioning and develop their kids\' executive functioning. Join the waitlist.',
};

export const AUTOPILOT_SALES_BANNER = {
  src: '/images/autopilot-sales-banner-2x.png',
  mobileSrc: '/images/autopilot-sales-banner-mobile-3x.png',
  alt: 'Autopilot: a 5 week course built to help parents stop overfunctioning and develop their kids\' executive functioning. Enrollment open 10/3 – 10/12. Enroll now.',
};

// Which banner an essay shows right now. Switches by itself at doors open
// (DOORS_OPEN in data/launch-schedule.js), the same moment /autopilot/
// becomes the sales page, and turns off at cart close (CART_CLOSES), the same
// moment as the pencil banner and popup. `null` means no banner.
export function essayBannerAt(essay, now = Date.now()) {
  if (now >= CART_CLOSES) return null;
  if (autopilotPageAt(now) === 'sales') {
    return { href: essay.salesBannerHref, image: AUTOPILOT_SALES_BANNER };
  }
  return { href: essay.bannerHref, image: AUTOPILOT_BANNER };
}

// The button at the bottom of each essay. Waitlist until doors open, then
// Enroll in Autopilot (same clock as the banner above). `next` is the essay's
// closing section, which holds both links.
export function essayCtaAt(next, now = Date.now()) {
  if (autopilotPageAt(now) === 'sales') {
    return {
      lead: 'Enrollment is open through Monday, October 12 at 10pm Central.',
      label: 'Enroll in Autopilot',
      href: next.salesCtaHref,
    };
  }
  return { lead: next.ctaLead, label: next.ctaLabel, href: next.ctaHref };
}
