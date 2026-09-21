// Site-wide announcement bar ("pencil banner") — all copy, links and the
// on/off switch live here, so changing what the banner says is a content
// change, not a rebuild.
//
// To swap the banner from the Autopilot waitlist to the free workshop:
// change MODE to 'workshop'. To take it down entirely: change MODE to 'off'.
//
// Every banner link carries utm_source=website (see lib/attribution.js).
// Our own buttons never replace an outside source, so a visitor who arrived
// from Instagram still counts as Instagram in Kit — the banner tags only
// fill in for visitors whose source we don't already know.

export const MODE = 'waitlist'; // 'waitlist' | 'workshop' | 'off'

// Pages where the banner is redundant or in the way: its own destination,
// the signup thank-you pages, and the replay page.
export const HIDDEN_PATHS = [
  '/autopilot/',
  '/autopilot/thank-you/',
  '/workshop/',
  '/workshop/thank-you/',
  '/workshop/replay/',
];

export const BANNERS = {
  waitlist: {
    // Bump this when the copy changes — a visitor who dismissed the old
    // banner sees the new one.
    version: 'waitlist-1',
    text: 'Autopilot — a 5-week live course for parents of 9–14 year olds. Starts October.',
    // Shorter line used on phones, where the full sentence wraps to three lines.
    textShort: 'Autopilot: a 5-week live course. Starts October.',
    cta: 'Join the waitlist',
    href: '/autopilot/?utm_source=website&utm_medium=banner&utm_campaign=autopilot-waitlist',
  },

  workshop: {
    version: 'workshop-1',
    // Keep this date in step with WORKSHOP.eventDate in data/autopilot-workshop.js.
    text: "Free live workshop · Wednesday, October 7 · 6:00 pm CT — Stop being your kid's prefrontal cortex.",
    textShort: 'Free live workshop · Wed, Oct 7 · 6:00 pm CT',
    cta: 'Save my spot',
    href: '/workshop/?utm_source=website&utm_medium=banner&utm_campaign=autopilot-workshop',
  },
};

export const BANNER = MODE === 'off' ? null : BANNERS[MODE] || null;
