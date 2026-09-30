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
//   cart closes →        nothing
//
// It switches itself because the handover lands at 1pm CT on Monday Oct 5,
// right after Sean finishes the second live session. Nobody should need to
// run a deploy in that hour. The switch times live in data/launch-schedule.js,
// shared with the site banner, so the two always change at the same moment.
import { CART_CLOSES, POPUP_OPENS, SALES_STARTS, phaseFrom } from './launch-schedule';

// Force a phase instead of working it out from the clock: 'workshop',
// 'sales', or 'off'. For checking the popups look right before their date,
// and as the handle to grab if the workshop moves. null = follow the dates.
export const OVERRIDE = null;

const SCHEDULE = [
  [POPUP_OPENS, 'workshop'],
  [SALES_STARTS, 'sales'],
  [CART_CLOSES, null],
];

export function phaseAt(now = Date.now()) {
  if (OVERRIDE) return OVERRIDE === 'off' ? null : OVERRIDE;
  return phaseFrom(SCHEDULE, now);
}

// Appears once the visitor has read a little — never on arrival. Whichever of
// these comes first.
export const TRIGGER = { scrollPercent: 40, afterSeconds: 20 };

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
};

export const POPUPS = {
  workshop: {
    // The flag that remembers this visitor has seen it. Change it and
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
    href: '/autopilot/?utm_source=website&utm_medium=popup&utm_campaign=autopilot-sales',
    dismiss: 'No thanks, the chore chart is working great',
  },
};
