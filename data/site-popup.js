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
// It switches itself because the handover lands at about 7pm on a Wednesday,
// right after Sean finishes teaching live, and the "doors are open" email goes
// out the same evening. Nobody should need to run a deploy in that hour.
//
// The workshop hand-over reuses WORKSHOP.event.endUtc — the same instant the
// calendar invites are built from — so there is only ever one workshop time on
// this site to keep right.
import { WORKSHOP } from './autopilot-workshop';

// Force a phase instead of working it out from the clock: 'workshop',
// 'sales', or 'off'. For checking the popups look right before their date,
// and as the handle to grab if the workshop moves. null = follow the dates.
export const OVERRIDE = null;

// When the workshop popup starts: Sep 30 2026, 00:00 CT.
const OPENS = Date.parse('2026-09-30T05:00:00Z');
// The workshop ends and the sales popup takes over.
const WORKSHOP_ENDS = Date.parse(WORKSHOP.event.endUtc);
// Cart closes Fri Oct 16 2026, 9pm CT. After this the popup stops.
const CART_CLOSES = Date.parse('2026-10-17T02:00:00Z');

export function phaseAt(now = Date.now()) {
  if (OVERRIDE) return OVERRIDE === 'off' ? null : OVERRIDE;
  if (now < OPENS) return null;
  if (now < WORKSHOP_ENDS) return 'workshop';
  if (now < CART_CLOSES) return 'sales';
  return null;
}

// Appears once the visitor has read a little — never on arrival. Whichever of
// these comes first.
export const TRIGGER = { scrollPercent: 40, afterSeconds: 20 };

// Pages where the popup would be pushing someone to the page they are already
// on, or interrupting a signup they have just finished.
export const HIDDEN_PATHS = [
  '/autopilot/',
  '/autopilot/thank-you/',
  '/workshop/',
  '/workshop/thank-you/',
  '/workshop/replay/',
];

export const POPUPS = {
  workshop: {
    // The flag that remembers this visitor has seen it. Change it and
    // everyone gets shown the popup again.
    seenKey: 'gmp_popup_workshop_seen',
    variant: 'paper',
    // Keep the date in step with WORKSHOP.eventDate in data/autopilot-workshop.js.
    eyebrow: 'Free live workshop · Oct 7, 6pm CT',
    // PLACEHOLDER — final title comes from Sean once the workshop is set.
    // `accent` is the phrase set in italic serif.
    headline: 'Placeholder workshop',
    headlineAccent: 'title goes here',
    // PLACEHOLDER — same.
    body: "Placeholder tagline — one sentence on what parents will walk away with. Sixty minutes, recorded if you can't make it.",
    cta: 'Save my seat',
    href: '/workshop/?utm_source=website&utm_medium=popup&utm_campaign=autopilot-workshop',
    dismiss: "No thanks, I'll keep reminding them myself",
  },

  sales: {
    seenKey: 'gmp_popup_sales_seen',
    variant: 'ink',
    eyebrow: 'Now enrolling · starts Oct 20',
    headline: 'Autopilot',
    headlineAccent: null,
    body: {
      before: 'A 5 week course, built to help parents ',
      accent: 'stop over functioning',
      after: " and develop their kids' executive function.",
    },
    cta: 'Enroll now',
    href: '/autopilot/?utm_source=website&utm_medium=popup&utm_campaign=autopilot-sales',
    dismiss: 'No thanks, the chore chart is working great',
  },
};
