---
title: Site-wide Announcement Banner — Design
date: 2026-09-21
tags: [growth-mindset, website, autopilot, conversion, link-tracking]
---

# Site-wide Announcement Banner

A bar across the top of every page on growthmindsetparenting.com, pointing at
whatever we currently want people to sign up for. It switches itself by date:
the waitlist until the last workshop ends, then the sales page until the cart
closes, then off. The workshop itself is promoted by the popup, not the banner.
Every rule, with the exact copy and links, is also on the "modals / banners"
tab of the "Auto Emails / popups / banners" sheet.

> [!note] Why a banner and not a popup
> A banner is a standing, low-friction ask — right for the waitlist, which has
> no deadline. The popup is the second half of this plan and turns on only for
> the dated workshop push, because an interruption needs a real deadline to
> earn it. Tracked in the Ops Platform.

The switch times live in `data/launch-schedule.js`, shared with the popup, so
the banner and popup always change at the same moment.

## What it does

| | |
|---|---|
| **Where** | Top of every page, sticky on desktop, scrolls away on phones |
| **Phone copy** | `textShort` is optional. A phase only gets one when a shorter line says the same thing (a date). The waitlist banner has none — every short line that still named Autopilot measured the same height as the full sentence, and the ones that fit were too vague to say what the waitlist was for. |
| **Not shown on** | `/autopilot/`, `/workshop/`, and the signup thank-you and replay pages |
| **Dismissal** | Visitor can close it; stays closed 3 days, per banner version (`DISMISS_DAYS`) |
| **Schedule (Central)** | `waitlist` until Mon Oct 5 1pm (end of the last workshop) → `sales` ("Enroll now") until Mon Oct 12 10pm → off. A `workshop` banner exists but only shows if forced with `OVERRIDE`. |

## Where the copy lives

All copy, links and the schedule are in `data/site-banner.js`; the switch
times themselves are in `data/launch-schedule.js`. To force one banner
regardless of date (to preview it, or if the launch moves), set `OVERRIDE`
in `data/site-banner.js` to `'waitlist'`, `'workshop'`, `'sales'` or `'off'`
and deploy. `null` follows the dates.

Bumping a banner's `version` makes it show again to people who dismissed the
previous one — do that whenever the copy meaningfully changes.

The same copy is mirrored in the **Site-wide Banner** tab of the
"SOT: GMP Website" sheet, like every other page's copy.

## Measurement

The banner link carries `utm_source=website&utm_medium=banner` plus a campaign
per banner, and both links have rows on the UTM tab of the "GMP Link Tracker"
sheet.

Because internal tags never replace an outside source (`lib/attribution.js`),
a reader who arrived from Instagram still counts as Instagram in Kit. The
banner tag only fills in for visitors whose source we don't already know — so
it measures "the banner was the first thing that brought them in", not "the
banner was the last thing they clicked".

GA4 also gets `view_promotion` when the bar is actually on screen and
`select_promotion` when it is clicked, which land in the Promotions report.

## How it avoids flashing or shifting the page

The site is static HTML, so every banner on the schedule is in the first HTML
the browser receives, and each is hidden by default. An inline script at the
very top of `<body>` (`lib/banner-script.js`) works out, before anything
paints, which banner is current from the visitor's clock and sets
`data-banner-phase` on `<html>`; it also sets `data-banner="hidden"` when none
should show (cart closed, dismissed, or a page that hides it). The CSS shows
only the matching banner. `components/SiteBanner.jsx` then owns the same
decision for the dismiss click and for client-side navigation (which is how a
tab left open across a switch time gets the new banner on its next page), and
must apply every reason every time it runs. No JavaScript means no banner.

`scripts/popup-phase-check.mjs` runs the real before-paint script at every
switch time and checks it agrees with `phaseAt()`:
`npx tsx scripts/popup-phase-check.mjs`.

> [!warning] Two traps found while building this (2026-09-21)
> - `overflow-x: hidden` on `html`/`body` turns them into scroll containers,
>   which silently breaks `position: sticky` on their children. `overflow-x:
>   clip` trims the same way without that side effect. The `hidden` line stays
>   first as a fallback for browsers older than Safari 16.
> - In Next 14's App Router, a raw `<script>` in the layout's `<head>` and
>   `next/script`'s `beforeInteractive` both fail to reach the served HTML.
>   A no-flash guard has to be a plain inline `<script>` at the top of `<body>`.

## Files

| File | What it holds |
|---|---|
| `data/site-banner.js` | Copy, links, schedule, `OVERRIDE`, hidden paths |
| `data/launch-schedule.js` | The switch times, shared with the popup |
| `lib/banner-script.js` | The before-paint script |
| `components/SiteBanner.jsx` | The bar, dismissal, view/click tracking |
| `styles/site-banner.css` | Appearance, sticky behaviour, phone layout |
| `app/layout.jsx` | Mounts the bar and the before-paint script |
| `lib/analytics.js` | `trackPromotion`, cookie name |
