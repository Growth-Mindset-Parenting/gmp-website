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
//   Oct 3, 00:00 → Oct 12, 10pm  sales     ("Enroll now")
//   after the cart closes        off
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
import { CART_CLOSES, DOORS_OPEN, phaseFrom } from './launch-schedule';

// Force a phase instead of following the clock: 'waitlist', 'workshop',
// 'sales' or 'off'. For previewing a banner before its date, or if the launch
// moves. null = follow the dates. Needs a deploy to take effect.
export const OVERRIDE = null;

const DATED_SCHEDULE = [
  [0, 'waitlist'],
  [DOORS_OPEN, 'sales'],
  [CART_CLOSES, null],
];

// What the page actually follows: the dates, or the override.
export const SCHEDULE = OVERRIDE
  ? [[0, OVERRIDE === 'off' ? null : OVERRIDE]]
  : DATED_SCHEDULE;

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
];

export const BANNERS = {
  waitlist: {
    // Bump this when the copy changes — a visitor who dismissed the old
    // banner sees the new one.
    version: 'waitlist-4',
    text: "Enrollment for Autopilot opens tomorrow, Saturday, Oct 3: a 5-week course to help parents stop over-functioning and develop their kid's executive function.",
    textShort: 'Autopilot enrollment opens tomorrow, Sat Oct 3.',
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
    version: 'sales-2',
    text: 'Autopilot is open — a 5-week live course. Doors close Monday, October 12 at 10pm CT.',
    textShort: 'Autopilot is open. Doors close Mon, Oct 12.',
    cta: 'Enroll now',
    // Live countdown to CART_CLOSES, shown before the button (Katie,
    // 2026-10-09). The banner turns off at the same moment it hits zero.
    countdownTo: CART_CLOSES,
    countdownSuffix: 'left',
    href: '/autopilot/?utm_source=website&utm_medium=banner&utm_campaign=autopilot-sales',
  },
};
