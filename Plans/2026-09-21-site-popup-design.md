---
title: Site-wide Popups — Design
date: 2026-09-21
tags: [growth-mindset, website, autopilot, conversion, link-tracking]
---

# Site-wide Popups

Two promotional popups that run in sequence during the Autopilot launch. They
are the second half of the attention plan; the first half is the
[[2026-09-21-site-banner-design|site-wide banner]].

Built from the design handoff in
`Plans/2026-09-21-autopilot-popups-design-handoff/`.

> [!note] Why a popup at all, when the banner is already there
> The banner is a standing, low-friction ask, right for something with no
> deadline. A popup interrupts, and an interruption has to be earned — so it
> only runs for the two dated pushes: the live workshop, and the nine days the
> cart is open. Nothing interrupts anyone for the waitlist.

## The two popups

| | Workshop | Sales |
|---|---|---|
| **Runs** | Sep 30 → the workshop ends | Workshop ends → cart closes |
| **Looks like** | Cream card, 3px ink border | Near-black card, no border |
| **Says** | Free live workshop · Oct 7, 6pm CT | Now enrolling · starts Oct 20 |
| **Button** | Save my seat → `/workshop/` | Enroll now → `/autopilot/` |

Copy for the workshop headline and tagline is still **placeholder** — it goes
to Sean once the workshop is finalised.

## It switches itself

There is no one to press a button at the moment that matters. The hand-over
lands about an hour after Sean finishes teaching live on a Wednesday evening,
and the "doors are open" email goes out that same night — a popup still saying
"save my seat" while the email says doors are open would be visibly broken
during the most valuable hour of the launch.

So the phase is worked out from the clock:

```
before Sep 30 00:00 CT   nothing
until the workshop ends  the workshop popup
until the cart closes    the sales popup
after Oct 16 9pm CT      nothing
```

The workshop hand-over reuses `WORKSHOP.event.endUtc` from
`data/autopilot-workshop.js` — the same instant the calendar invites are built
from — so there is only ever **one** workshop time on this site to keep right.

`scripts/popup-phase-check.mjs` checks all nine boundaries, including a minute
either side of each one. Run it after touching any date:

```
npx tsx scripts/popup-phase-check.mjs
```

> [!warning] If the workshop moves
> Change `endUtc` in `data/autopilot-workshop.js` (which the calendar invites
> also use), then re-run the check above. `OVERRIDE` in `data/site-popup.js`
> forces a phase — `'workshop'`, `'sales'` or `'off'` — for previewing a popup
> before its date, or as the handle to grab if something goes wrong.

## Behaviour

- **Appears** once the visitor has scrolled 40% of the page, or after 20
  seconds, whichever comes first. Never on arrival. The timer is what covers
  pages too short to scroll.
- **Once per visitor per popup.** Closing it, dismissing it or clicking through
  sets a flag in the browser (`gmp_popup_workshop_seen`,
  `gmp_popup_sales_seen`). Seeing the workshop popup does not use up the sales
  one — they are separate flags.
- **Closes** on the ×, the backdrop, Esc, or the dismiss link.
- **Never shows** on `/autopilot/`, `/workshop/`, or the thank-you and replay
  pages — it would be pointing at the page you are already on, or interrupting
  a signup just finished.
- **Accessibility:** `role="dialog"`, `aria-modal`, labelled by its own
  heading, focus moves into the dialog and returns to where the reader was,
  Tab is trapped inside, page scroll is locked while it is open.
- **No animation** beyond a 150ms fade on the backdrop, per brand guidance, and
  that is dropped for anyone who asks for reduced motion.

## Measurement

Each popup link carries `utm_medium=popup` and its own campaign, and both are
on the UTM tab of the "GMP Link Tracker" sheet. GA4 gets `view_promotion`,
`select_promotion` and `close_promotion` under `creative_name: site-popup`, so
popup numbers never get added to the banner's.

## Files

| File | What it holds |
|---|---|
| `data/site-popup.js` | Copy, links, the three dates, override, trigger |
| `components/SitePopup.jsx` | The dialog, triggers, focus trap, tracking |
| `components/PaperPlane.jsx` | The decorative aeroplane, both sizes |
| `styles/site-popup.css` | Both variants, desktop dialog and mobile sheet |
| `scripts/popup-phase-check.mjs` | The boundary check |

The aeroplane's position was measured off the design file's own artboards
rather than read from its written spec, which still describes an earlier
placement.

## Still to do

- Sean's real headline and tagline for the workshop popup, replacing the
  placeholders, once the workshop is finalised.
