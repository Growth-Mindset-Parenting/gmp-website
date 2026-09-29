---
title: Workshop page — two open-link sessions
date: 2026-09-29
tags: [gmp-website, autopilot, workshop, plan]
---

# Workshop page — two open-link sessions

> [!note] Why
> On 2026-09-29 the Autopilot workshop moved from one session (Wed Oct 7, 6pm CT, Zoom registration required) to two sessions on open Zoom links, and Katie dropped the live-attendance bonus. Doors now open Sat Oct 3; cart closes Mon Oct 12; classes Tue Oct 13 – Nov 10.

## Root cause of the current break

`/api/workshop-register/` calls Zoom's "add registrant" API for `ZOOM_WORKSHOP_MEETING_ID` (89340579247). Registration is now turned off on that meeting, so Zoom returns error 300 ("Registration has not been enabled"). Every signup falls into the fallback: Kit gets the subscriber with the `ZOOM_FAILED` tag and no `zoom_join_url`, and the thank-you page shows the no-link version. Nobody is dropped, but nobody gets a join link from the site, and every page still says Wednesday, October 7.

## The sessions (config, not code)

| Session | Start (CT) | Start UTC | Zoom ID | Passcode |
|---|---|---|---|---|
| Sunday, October 4 | 6:00 pm | 2026-10-04T23:00:00Z | 893 4057 9247 | 685774 |
| Monday, October 5 | 12:00 pm | 2026-10-05T17:00:00Z | 868 4094 9467 | 050190 |

Both 60 minutes, open links (no registration), join-before-host off. The join links are the same for everyone, so they live in `data/autopilot-workshop.js` as `WORKSHOP.sessions[]`.

## Changes

1. **`data/autopilot-workshop.js`** — replace the single `event` with `sessions[]` (label, time line, startUtc, endUtc, joinUrl, meetingId, passcode, one-tap numbers) plus shared dial-in numbers. Update `eventDate`, FAQ, modal, thank-you copy to name both times. Remove the `bonus` block and every live-only promise (FAQ "can't make it live", modal small print, thank-you bonus line, calendar description).
2. **`components/AutopilotWorkshop.jsx`** — drop the bonus section and modal small print. Modal no longer passes a join link; it sets a "just registered" flag so the thank-you page still counts the GA4 `workshop_register` event once.
3. **`app/api/workshop-register/route.js`** — remove the Zoom call; Kit only (form 9921406, Registered tag, utm fields, phone). No `ZOOM_FAILED` tag. Keep "never drop a signup" behavior. Delete `lib/zoom.js` (no other users).
4. **`lib/workshop-calendar.js` + `/api/workshop-ics/`** — build calendar links per session; each event carries that session's join link and dial-in. The .ics route takes `?s=sun|mon`.
5. **`components/AutopilotWorkshopThankYou.jsx`** — two session cards: day, time, "Join on Zoom" link, Google / Apple / Outlook buttons.
6. **Page metadata** (`app/workshop/page.jsx`, `thank-you/page.jsx`) — new dates.
7. **`data/site-banner.js`** — workshop + sales text to the new dates (MODE unchanged; still switched by hand).
8. **`data/site-popup.js`** — workshop popup ends when Monday's session ends (2026-10-05T18:00:00Z); new eyebrows; sales popup "starts Oct 13". Cart-close instant stays until Katie gives the Oct 12 close time. Update `scripts/popup-phase-check.mjs` cases.
9. **Kit** — "You're in" confirmation email: both links and times, no bonus.
10. **SOT: GMP Website sheet** — write the new workshop copy to column D.

## Verification

- `npm run build` clean.
- Popup phase script passes with new boundaries.
- Local: page shows both times, no bonus section; signup posts to Kit with a `katie+` test address, lands on thank-you with both links; calendar buttons produce correct times (Google URL dates, .ics DTSTART) for both sessions.
- After deploy: same test on production, Kit subscriber has the Registered tag and no ZOOM_FAILED tag; test subscriber unsubscribed afterwards.
