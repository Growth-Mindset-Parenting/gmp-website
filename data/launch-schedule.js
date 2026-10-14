// The Autopilot launch clock — the moments the site banner and the popup
// switch by themselves. Both read these, so there is only one set of switch
// times on the site to keep right.
//
// All times are UTC. October is CDT (UTC-5).

// The workshop popup starts: Wed Sep 30 2026, 00:00 CT.
export const POPUP_OPENS = Date.parse('2026-09-30T05:00:00Z');

// Doors open: Sat Oct 3 2026, 00:00 CT. /autopilot/ stops being the waitlist
// page and becomes the sales page. app/autopilot/page.jsx is re-rendered on
// the server about every 60 seconds, so it flips without a deploy.
export const DOORS_OPEN = Date.parse('2026-10-03T05:00:00Z');

// Round 1 sales are over (Katie, 2026-10-14): /autopilot/ is the round 2
// waitlist page until this changes. Set to 'sales' to put the sales page back,
// or null to follow DOORS_OPEN again. The freebie essays' banner and bottom
// button follow this too (content/essays/autopilot-banner.js).
export const AUTOPILOT_PAGE = 'waitlist';

// Which page /autopilot/ shows at a given moment: 'waitlist' or 'sales'.
export function autopilotPageAt(now = Date.now()) {
  if (AUTOPILOT_PAGE) return AUTOPILOT_PAGE;
  return now >= DOORS_OPEN ? 'sales' : 'waitlist';
}

// The workshop popup hands over to the sales popup: Mon Oct 5 2026, 1pm CT
// (the end of the second workshop). Pinned on 2026-10-08 — it used to follow
// the last session's endUtc, but the extra Oct 12 session would have pulled
// the workshop popup back for all of cart week.
export const SALES_STARTS = Date.parse('2026-10-05T18:00:00Z');

// Cart closes Mon Oct 12 2026, 10pm CT. The countdown timers count to this
// and vanish when it passes.
export const CART_CLOSES = Date.parse('2026-10-13T03:00:00Z');

// When the pencil banner, the popup and the freebie essay banner turn off.
// null = they stay on. Katie (2026-10-12): keep them on past cart close; she
// will say when to turn them off. To turn all three off, set this to a moment
// that has passed, e.g. Date.parse('2026-10-13T03:00:00Z'), and deploy.
export const PROMOS_OFF = null;

// A schedule is a list of [startMs, phase] in time order; `null` means
// nothing shows. Before the first start, nothing shows either. Kept as plain
// data so the banner's before-paint script (lib/banner-script.js) can carry
// the very same list into the page.
export function phaseFrom(schedule, now = Date.now()) {
  let phase = null;
  for (const [start, p] of schedule) {
    if (now >= start) phase = p;
  }
  return phase;
}
