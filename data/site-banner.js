// Site-wide announcement bar ("pencil banner") — all copy, links and the
// on/off switch live here, so changing what the banner says is a content
// change, not a rebuild.
//
// `textShort` is optional. Give a phase one only when a genuinely shorter line
// says the same thing — a date, say. A phase without one shows `text` at every
// width. A phone reader who sees only the banner line and its button has to
// come away knowing what they would be signing up for.
//
// The bar switches BY ITSELF, off the launch clock in data/launch-schedule.js
// (Katie, 2026-09-30):
//
//   now → Sat Oct 3, 00:00 CT    waitlist  ("Enrollment opens tomorrow")
//   Oct 3, 00:00 → PROMOS_OFF    sales     ("Enroll now")
//   after PROMOS_OFF             off (null = stays on until Katie says)
//
// The banner flips to sales at doors open, the same moment /autopilot/
// becomes the sales page (Katie, 2026-10-02), so its button never promises a
// waitlist and lands on a sales page. The popup still switches at Oct 5 1pm,
// the end of the last live workshop. There is no workshop phase on the
// banner; the popup does that job. The site is static HTML, so every scheduled banner is in the page
// and a tiny script picks the right one before paint (lib/banner-script.js).
//
// Every banner link carries utm_source=website (see lib/attribution.js).
// Our own buttons never replace an outside source, so a visitor who arrived
// from Instagram still counts as Instagram in Kit — the banner tags only
// fill in for visitors whose source we don't already know.
import {
  CART_CLOSES,
  DOORS_OPEN,
  PROMOS_OFF,
  SCREEN_RESET_SALE_ENDS,
  SCREEN_RESET_SALE_STARTS,
  phaseFrom,
} from './launch-schedule';

// The Screen Reset (added 2026-11-17) owns the bar from its sale start, off
// its own two dates in data/launch-schedule.js:
//
//   before Sat Nov 21, 00:00 Central   whatever Autopilot says (currently off)
//   Nov 21 → end of Mon Nov 30         screenResetSale  ($67 + countdown)
//   Tue Dec 1, 00:00 Central onward    screenReset      (no price, stays on)
//
// There are two switches. Both need a deploy to take effect.

// 1) Force ONE banner on the whole site, whatever the date: any phase name
// from BANNERS below ('screenResetSale', 'screenReset', 'waitlist',
// 'workshop', 'sales'), or 'off' for no banner at all. null = follow the
// dates. For previewing a banner before its date, or if a launch moves.
export const OVERRIDE = null;

// 2) The Autopilot banners only: 'waitlist', 'workshop', 'sales' or 'off'.
// null = follow the Autopilot dates. This does not touch The Screen Reset.
// Off since 2026-10-14 (Katie). The undated 'waitlist' version is ready if
// it comes back: set this to 'waitlist' and deploy. (From Nov 21 the Screen
// Reset banner takes the bar; to show an Autopilot banner after that, use
// OVERRIDE above.)
export const AUTOPILOT_OVERRIDE = 'off';

const AUTOPILOT_DATED_SCHEDULE = [
  [0, 'waitlist'],
  [DOORS_OPEN, 'sales'],
  ...(PROMOS_OFF ? [[PROMOS_OFF, null]] : []),
];

const AUTOPILOT_SCHEDULE = AUTOPILOT_OVERRIDE
  ? [[0, AUTOPILOT_OVERRIDE === 'off' ? null : AUTOPILOT_OVERRIDE]]
  : AUTOPILOT_DATED_SCHEDULE;

const SCREEN_RESET_SCHEDULE = [
  [SCREEN_RESET_SALE_STARTS, 'screenResetSale'],
  [SCREEN_RESET_SALE_ENDS, 'screenReset'],
];

// What the page actually follows: the dates, or the override. Autopilot's
// part of the calendar stops where The Screen Reset's starts.
export const SCHEDULE = OVERRIDE
  ? [[0, OVERRIDE === 'off' ? null : OVERRIDE]]
  : [
      ...AUTOPILOT_SCHEDULE.filter(([start]) => start < SCREEN_RESET_SALE_STARTS),
      ...SCREEN_RESET_SCHEDULE,
    ];

// Every banner that can show at some point — all of them go into the HTML.
export const SCHEDULED_PHASES = [...new Set(SCHEDULE.map(([, p]) => p).filter(Boolean))];

export function phaseAt(now = Date.now()) {
  return phaseFrom(SCHEDULE, now);
}

// How long a visitor who closes the bar keeps it closed. Each phase is only
// live for about a week, so this is deliberately short: they get another look
// during the window without being nagged on every page.
export const DISMISS_DAYS = 3;

// Pages where the banner is redundant or in the way: its own destination,
// the signup thank-you pages, and the replay page.
export const HIDDEN_PATHS = [
  '/autopilot/',
  '/autopilot/thank-you/',
  '/autopilot/enroll-preview/', // hidden sales-page preview
  '/workshop/',
  '/workshop/thank-you/',
  '/workshop/replay/',
  '/screen-reset/', // the page the Screen Reset banners point to
  '/screen-reset/thank-you/',
];

export const BANNERS = {
  waitlist: {
    // Bump this when the copy changes — a visitor who dismissed the old
    // banner sees the new one.
    version: 'waitlist-5',
    text: "Autopilot: five 75-minute classes to help parents stop over-functioning and develop their kid's executive function.",
    textShort: 'Autopilot: five 75-minute classes.',
    cta: 'Join the waitlist',
    href: '/autopilot/?utm_source=website&utm_medium=banner&utm_campaign=autopilot-waitlist',
  },

  // Not on the schedule (the popup covers the workshop). Only shows if
  // OVERRIDE = 'workshop'.
  workshop: {
    version: 'workshop-2',
    // Keep this date in step with WORKSHOP.eventDate in data/autopilot-workshop.js.
    text: "Free live workshop · Sunday, Oct 4 or Monday, Oct 5 — Stop being your kid's prefrontal cortex.",
    textShort: 'Free live workshop · Sun Oct 4 or Mon Oct 5',
    cta: 'Save my spot',
    href: '/workshop/?utm_source=website&utm_medium=banner&utm_campaign=autopilot-workshop',
  },

  // Sat Oct 3, 00:00 CT (doors open) until the cart closes Mon Oct 12 at
  // 10pm CT. Links to /autopilot/, the sales page from the same moment.
  sales: {
    version: 'sales-3',
    text: 'Autopilot is open — a 5-week live course. Class starts Tuesday, October 13 at 6pm CT.',
    textShort: 'Autopilot is open. Class starts Tue, Oct 13.',
    cta: 'Enroll now',
    // Live countdown to CART_CLOSES, shown before the button (Katie,
    // 2026-10-09). The timer vanishes at zero; the banner stays until
    // PROMOS_OFF.
    countdownTo: CART_CLOSES,
    countdownSuffix: 'left',
    href: '/autopilot/?utm_source=website&utm_medium=banner&utm_campaign=autopilot-sales',
  },

  // The Screen Reset, launch price: Sat Nov 21 00:00 Central until the end
  // of Mon Nov 30 (SCREEN_RESET_SALE_ENDS). The countdown pill counts to
  // that same moment, which is also when this banner hands over to the one
  // below.
  screenResetSale: {
    version: 'screen-reset-sale-1',
    text: 'The Screen Reset: a weekend course to help parents stop fighting over screens and teach their kid to put them down. $67 through Nov 30.',
    textShort: 'The Screen Reset: $67 through Nov 30.',
    cta: 'Get it now',
    countdownTo: SCREEN_RESET_SALE_ENDS,
    countdownSuffix: 'left',
    href: '/screen-reset/?utm_source=website&utm_medium=banner&utm_campaign=screen-reset-launch',
  },

  // The Screen Reset, after the launch price: from Tue Dec 1 00:00 Central,
  // with no end date. No price and no dates in the copy, so it never goes
  // stale.
  screenReset: {
    version: 'screen-reset-1',
    text: 'The Screen Reset: a weekend course to help parents stop fighting over screens and teach their kid to put them down.',
    textShort: 'The Screen Reset: a weekend course on screens.',
    cta: 'See the course',
    href: '/screen-reset/?utm_source=website&utm_medium=banner&utm_campaign=screen-reset',
  },
};
