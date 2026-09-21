---
title: Site-wide Announcement Banner — Design
date: 2026-09-21
tags: [growth-mindset, website, autopilot, conversion, link-tracking]
---

# Site-wide Announcement Banner

A bar across the top of every page on growthmindsetparenting.com, pointing at
whatever we currently want people to sign up for. It ships in waitlist mode
and switches to the free workshop when that opens.

> [!note] Why a banner and not a popup
> A banner is a standing, low-friction ask — right for the waitlist, which has
> no deadline. The popup is the second half of this plan and turns on only for
> the dated workshop push, because an interruption needs a real deadline to
> earn it. Tracked in the Ops Platform.

The three switch points are on the launch plan board
(`/dashboard/launch/plan`) alongside the bio-link switches, so the banner
moves when everything else does.

## What it does

| | |
|---|---|
| **Where** | Top of every page, sticky on desktop, scrolls away on phones |
| **Not shown on** | `/autopilot/`, `/workshop/`, and the signup thank-you and replay pages |
| **Dismissal** | Visitor can close it; stays closed 3 days, per banner version (`DISMISS_DAYS`) |
| **Modes** | `waitlist` (live), `workshop` (from Sep 30), `sales` (from Oct 7), `off` (after Oct 16) |

## Where the copy lives

All copy, links and the on/off switch are in `data/site-banner.js`. Changing
what the banner says is a content change, not a rebuild.

To switch the banner to the workshop, change one line:

```js
export const MODE = 'workshop'; // 'waitlist' | 'workshop' | 'off'
```

Bumping a mode's `version` makes it show again to people who dismissed the
previous one — do that whenever the copy meaningfully changes.

The same copy is mirrored in the **Site-wide Banner** tab of the
"SOT: GMP Website" sheet, like every other page's copy.

## Measurement

The banner link carries `utm_source=website&utm_medium=banner` plus a campaign
per mode, and both links have rows on the UTM tab of the "GMP Link Tracker"
sheet.

Because internal tags never replace an outside source (`lib/attribution.js`),
a reader who arrived from Instagram still counts as Instagram in Kit. The
banner tag only fills in for visitors whose source we don't already know — so
it measures "the banner was the first thing that brought them in", not "the
banner was the last thing they clicked".

GA4 also gets `view_promotion` when the bar is actually on screen and
`select_promotion` when it is clicked, which land in the Promotions report.

## How it avoids flashing or shifting the page

The banner markup is in the first HTML the browser receives, so nothing jumps
when it appears. An inline script at the very top of `<body>` decides, before
anything paints, whether this visitor sees it — already dismissed, or a page
that hides it — and sets `data-banner="hidden"` on `<html>` for the CSS to
read. `components/SiteBanner.jsx` then owns the same decision for the dismiss
click and for client-side navigation, and must apply **both** reasons every
time it runs.

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
| `data/site-banner.js` | Copy, links, mode switch, hidden paths |
| `components/SiteBanner.jsx` | The bar, dismissal, view/click tracking |
| `styles/site-banner.css` | Appearance, sticky behaviour, phone layout |
| `app/layout.jsx` | Mounts the bar and the pre-paint guard script |
| `lib/analytics.js` | `trackPromotion`, cookie name |

## Still to do

- The popup, for the workshop window only (filed in the Ops Platform).
- Sep 30: `MODE = 'workshop'`. Oct 7: `MODE = 'sales'`. After the cart closes
  Oct 16: `MODE = 'off'`. All three are on the launch plan board.
