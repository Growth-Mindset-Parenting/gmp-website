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

// Which page /autopilot/ shows at a given moment: 'waitlist' or 'sales'.
export function autopilotPageAt(now = Date.now()) {
  return now >= DOORS_OPEN ? 'sales' : 'waitlist';
}

// The workshop popup hands over to the sales popup: Mon Oct 5 2026, 1pm CT
// (the end of the second workshop). Pinned on 2026-10-08 — it used to follow
// the last session's endUtc, but the extra Oct 12 session would have pulled
// the workshop popup back for all of cart week.
export const SALES_STARTS = Date.parse('2026-10-05T18:00:00Z');

// Cart closes Mon Oct 12 2026, 10pm CT. The popup and banner both turn off.
export const CART_CLOSES = Date.parse('2026-10-13T03:00:00Z');

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
