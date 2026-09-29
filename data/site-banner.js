// Site-wide announcement bar ("pencil banner") — all copy, links and the
// on/off switch live here, so changing what the banner says is a content
// change, not a rebuild.
//
// `textShort` is optional. Give a mode one only when a genuinely shorter line
// says the same thing — a date, say. A mode without one shows `text` at every
// width. A phone reader who sees only the banner line and its button has to
// come away knowing what they would be signing up for.
//
// The bar follows the launch: waitlist now, then the free workshop
// (sessions Sun Oct 4 and Mon Oct 5), then the sales page, then off after the
// cart closes Mon Oct 12. Switching is one line — change MODE.
//
// Every banner link carries utm_source=website (see lib/attribution.js).
// Our own buttons never replace an outside source, so a visitor who arrived
// from Instagram still counts as Instagram in Kit — the banner tags only
// fill in for visitors whose source we don't already know.

export const MODE = 'waitlist'; // 'waitlist' | 'workshop' | 'sales' | 'off'

// How long a visitor who closes the bar keeps it closed. Each mode is only
// live for about a week, so this is deliberately short: they get another look
// during the window without being nagged on every page.
export const DISMISS_DAYS = 3;

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
    version: 'waitlist-3',
    text: "Autopilot: a 5-week course, built to help parents stop over-functioning and develop their kid's executive function.",
    // No phone variant on purpose. Any short line that still named Autopilot
    // and said what it is came out the same height as the full sentence
    // anyway (measured at 360/390/430px), and the ones that fit were too
    // vague to tell a phone reader what the waitlist is for.
    cta: 'Join the waitlist',
    href: '/autopilot/?utm_source=website&utm_medium=banner&utm_campaign=autopilot-waitlist',
  },

  workshop: {
    version: 'workshop-2',
    // Keep this date in step with WORKSHOP.eventDate in data/autopilot-workshop.js.
    text: "Free live workshop · Sunday, Oct 4 or Monday, Oct 5 — Stop being your kid's prefrontal cortex.",
    textShort: 'Free live workshop · Sun Oct 4 or Mon Oct 5',
    cta: 'Save my spot',
    href: '/workshop/?utm_source=website&utm_medium=banner&utm_campaign=autopilot-workshop',
  },

  // From when /autopilot/ becomes the sales page until the cart closes
  // Mon Oct 12.
  sales: {
    version: 'sales-1',
    text: 'Autopilot is open — a 5-week live course. Doors close Monday, October 12.',
    textShort: 'Autopilot is open. Doors close Mon, Oct 12.',
    cta: 'See the course',
    href: '/autopilot/?utm_source=website&utm_medium=banner&utm_campaign=autopilot-sales',
  },
};

export const BANNER = MODE === 'off' ? null : BANNERS[MODE] || null;
