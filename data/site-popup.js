// Site-wide promotional popup — all copy, links, dates and the on/off switch
// live here. Built from the design handoff in
// Plans/2026-09-21-autopilot-popups-design-handoff/.
//
// Two popups run in sequence and the switch happens BY ITSELF, off the
// timestamps below:
//
//   before Sep 30        nothing
//   Sep 30 → workshop    the workshop popup
//   workshop ends →      the sales popup
//   PROMOS_OFF →         nothing (null = stays on until Katie says)
//
// It switches itself because the handover lands at 1pm CT on Monday Oct 5,
// right after Sean finishes the second live session. Nobody should need to
// run a deploy in that hour. The switch times live in data/launch-schedule.js,
// shared with the site banner, so the two always change at the same moment.
import {
  CART_CLOSES,
  POPUP_OPENS,
  PROMOS_OFF,
  SALES_STARTS,
  SCREEN_RESET_SALE_ENDS,
  SCREEN_RESET_SALE_STARTS,
  phaseFrom,
} from './launch-schedule';

// The Screen Reset (added 2026-11-17) has one popup, for its launch price
// only, off its own two dates in data/launch-schedule.js:
//
//   before Sat Nov 21, 00:00 Central   whatever Autopilot says (currently off)
//   Nov 21 → end of Mon Nov 30         screenResetSale  ($67 + countdown)
//   Tue Dec 1, 00:00 Central onward    nothing
//
// There are two switches. Both need a deploy to take effect.

// 1) Force ONE popup on the whole site, whatever the date: any phase name
// from POPUPS below ('screenResetSale', 'workshop', 'sales', 'waitlist'), or
// 'off' for no popup at all. null = follow the dates.
export const OVERRIDE = null;

// 2) The Autopilot popups only: 'workshop', 'sales', 'waitlist' or 'off'.
// null = follow the Autopilot dates. This does not touch The Screen Reset.
// Off since 2026-10-14 (Katie). The undated 'waitlist' version is ready if
// it comes back: set this to 'waitlist' and deploy. (From Nov 21 the Screen
// Reset dates take over; to show an Autopilot popup after that, use
// OVERRIDE above.)
export const AUTOPILOT_OVERRIDE = 'off';

const AUTOPILOT_DATED_SCHEDULE = [
  [POPUP_OPENS, 'workshop'],
  [SALES_STARTS, 'sales'],
  ...(PROMOS_OFF ? [[PROMOS_OFF, null]] : []),
];

const AUTOPILOT_SCHEDULE = AUTOPILOT_OVERRIDE
  ? [[0, AUTOPILOT_OVERRIDE === 'off' ? null : AUTOPILOT_OVERRIDE]]
  : AUTOPILOT_DATED_SCHEDULE;

const SCREEN_RESET_SCHEDULE = [
  [SCREEN_RESET_SALE_STARTS, 'screenResetSale'],
  [SCREEN_RESET_SALE_ENDS, null],
];

// Autopilot's part of the calendar stops where The Screen Reset's starts.
const SCHEDULE = [
  ...AUTOPILOT_SCHEDULE.filter(([start]) => start < SCREEN_RESET_SALE_STARTS),
  ...SCREEN_RESET_SCHEDULE,
];

export function phaseAt(now = Date.now()) {
  if (OVERRIDE) return OVERRIDE === 'off' ? null : OVERRIDE;
  return phaseFrom(SCHEDULE, now);
}

// Appears once the visitor has read a little — never on arrival. Whichever of
// these comes first.
export const TRIGGER = { scrollPercent: 40, afterSeconds: 15 };

// Shows once per visit. A visit ends after this many minutes with no page
// views (GA4's session rule), so a visitor who comes back later sees it again.
// Closing it, "no thanks", or clicking the button all count as seen.
export const VISIT_GAP_MINUTES = 30;

// Pages where the popup would be pushing someone to the page they are already
// on, or interrupting a signup they have just finished. Per phase:
//
// - workshop: DOES show on /autopilot/ (the waitlist page, then the sales page
//   from Oct 3) — a waitlist visitor should hear about the workshop (Katie,
//   2026-09-30).
// - sales: hidden on /autopilot/ too, because that page IS the sales page the
//   popup points to.
const WORKSHOP_HIDDEN = [
  '/autopilot/thank-you/',
  '/autopilot/enroll-preview/', // hidden sales-page preview
  '/workshop/',
  '/workshop/thank-you/',
  '/workshop/replay/',
];

export const HIDDEN_PATHS = {
  workshop: WORKSHOP_HIDDEN,
  sales: [...WORKSHOP_HIDDEN, '/autopilot/'],
  waitlist: [...WORKSHOP_HIDDEN, '/autopilot/'],
  // Hidden on its own sales page and thank-you page, and everywhere the
  // Autopilot popups were hidden.
  screenResetSale: [...WORKSHOP_HIDDEN, '/autopilot/', '/screen-reset/', '/screen-reset/thank-you/'],
};

export const POPUPS = {
  workshop: {
    // The flag that remembers this visitor has seen it this visit. Change it and
    // everyone gets shown the popup again.
    seenKey: 'gmp_popup_workshop_seen',
    variant: 'paper',
    // Keep the date in step with WORKSHOP.eventDate in data/autopilot-workshop.js.
    eyebrow: 'Free live workshop · Sun Oct 4 or Mon Oct 5',
    // Matches the workshop page headline. `accent` is the phrase set in
    // italic serif.
    headline: 'From reminders to',
    headlineAccent: 'responsibility.',
    body: 'A free, 60-minute live workshop on handing the load back to your kid, one system at a time.',
    cta: 'Save my seat',
    href: '/workshop/?utm_source=website&utm_medium=popup&utm_campaign=autopilot-workshop',
    dismiss: "No thanks, I'll keep reminding them myself",
  },

  // Round 2 waitlist (2026-10-14). No dates and no "live" — the next round's
  // timing is unknown and the course sells as recorded classes too.
  waitlist: {
    seenKey: 'gmp_popup_waitlist_seen',
    variant: 'ink',
    eyebrow: 'Five 75-minute classes',
    headline: 'Autopilot',
    headlineAccent: null,
    body: {
      before: 'A course built to help parents ',
      accent: 'stop over-functioning',
      after: " and develop their kids' executive function.",
    },
    cta: 'Join the waitlist',
    href: '/autopilot/?utm_source=website&utm_medium=popup&utm_campaign=autopilot-waitlist',
    dismiss: 'No thanks, the chore chart is working great',
  },

  sales: {
    seenKey: 'gmp_popup_sales_seen',
    variant: 'ink',
    eyebrow: 'Doors close Oct 12 · class starts Oct 13',
    headline: 'Autopilot',
    headlineAccent: null,
    body: {
      before: 'A 5-week course, built to help parents ',
      accent: 'stop over-functioning',
      after: " and develop their kids' executive function.",
    },
    cta: 'Enroll now',
    // Live days/hours/min/sec countdown between the body and the button
    // (Katie, 2026-10-09). The timer vanishes at zero; the popup stays until
    // PROMOS_OFF.
    countdownTo: CART_CLOSES,
    href: '/autopilot/?utm_source=website&utm_medium=popup&utm_campaign=autopilot-sales',
    dismiss: 'No thanks, the chore chart is working great',
  },

  // The Screen Reset launch price (Nov 21 → end of Nov 30, Central). Same
  // trigger and once-per-visit rules as the others.
  screenResetSale: {
    seenKey: 'gmp_popup_screen_reset_sale_seen',
    variant: 'ink',
    eyebrow: '$67 through Monday, Nov 30',
    headline: 'The Screen',
    headlineAccent: 'Reset.',
    body: 'A weekend course, built to help parents stop fighting over screens and teach their kid to put them down on their own.',
    cta: 'Get The Screen Reset',
    // Days/hours/min/sec boxes counting to the end of the $67 price. The
    // popup turns off at that same moment.
    countdownTo: SCREEN_RESET_SALE_ENDS,
    href: '/screen-reset/?utm_source=website&utm_medium=popup&utm_campaign=screen-reset-launch',
    dismiss: 'No thanks, we’ll keep negotiating',
  },
};
