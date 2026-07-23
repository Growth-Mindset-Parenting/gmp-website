---
title: Website Copy Sync — Design
date: 2026-07-23
tags: [growth-mindset, website, copy, process, design]
---

# Website Copy Sync — Design

> [!abstract] What this is
> The Google Sheet **“SOT: GMP Website”** is the source of truth for every word on
> growthmindsetparenting.com. Katie drops a requested change into **column E**,
> says there are updates, and the change flows to the live site and back into the
> sheet automatically. This document describes how that works and why it is built
> this way.

Skill: `gmp-copy-sync` · Tooling: `Website/scripts/copy-sync/` · Related: [[2026-07-09-freebie-landing-pages-plan]]

---

## The loop

```
column E (request)  →  site  →  deploy  →  verify live  →  column D ← live  →  clear E
```

| Column | Meaning |
|---|---|
| A | Page |
| B | Section |
| C | Element type |
| **D** | **Live copy** — what the page says right now |
| **E** | **Requested change** — what Katie or Sean wants it to say |

## The invariant

> [!warning] Never write D or clear E until the copy is confirmed live in production.
> Column E is the only record of an unapplied request. Clearing it before the
> deploy is verified destroys the request with no way to recover it. This holds
> for one-word changes too.

Two supporting rules:

- **D is written from what the page renders, not from column E verbatim.** Copy
  gets typographically normalised on the way in (straight quotes → curly, typos
  fixed). D has to match what the next audit will see, or every run reports
  false drift.
- **Rebase onto `origin/main` before deploying.** A GitHub Action syncs Sean's
  newsletters into `content/letters.js` on its own schedule, so `origin/main` is
  routinely ahead of a local branch. This was caught during the first run — the
  branch would have deleted the 18 July newsletter from the live site.

---

## Why it needs tooling at all

The obvious implementation — search the repo for the text in column D and replace
it — does not work here. Three reasons:

1. **Copy is stored as HTML entities.** `It's` is written `It&rsquo;s`,
   `—` is `&mdash;`. A grep for the sheet text finds nothing.
2. **Copy is wrapped across lines** by the formatter, at arbitrary indentation,
   and split by inline `<em>` / `<span>` elements mid-sentence.
3. **The site splits rows across sibling elements.** A row reading
   `02 Autonomy` is two elements on the page: `02` and `Autonomy`.

So both sides are normalised — entities decoded, punctuation flattened to ASCII,
whitespace collapsed — before anything is compared.

### Components

| File | Job |
|---|---|
| `sheet.mjs` | Reads/writes/deletes rows in the sheet. Reuses the local google-docs-mcp OAuth token at runtime; no secret is stored in the repo. |
| `normalize.mjs` | Entity decoding, punctuation flattening, similarity scoring, boundary-aware substring search. |
| `extract-live.mjs` | Renders every page in a real browser and harvests the visible copy. |
| `audit.mjs` | Compares every sheet row against the rendered site and assigns a verdict. |
| `locate.mjs` | Given a row or a sentence, finds the file and line it lives on. |
| `plan-sheet-update.mjs` | Turns an audit into sheet edits. Dry-run by default. |
| `refresh-writing.mjs` | Refreshes the WRITING article rows positionally from `content/letters.js` (the /writing/ feed shifts as Sean publishes). |
| `site-check.mjs` | Full pre-deploy test suite (`Website/scripts/`). |

### What the extractor has to do that a fetch cannot

- **Expand accordions.** Sections render their body only while open
  (`{isOpen && …}`), so the copy is not in the DOM until each toggle is clicked.
- **Open the capture modal.** Modal copy exists only after a CTA click — and it
  must be the `.fb-cta` button, not the hero form's submit button, which just
  fails email validation.
- **Pin the A/B cookie.** Freebie pages render one of two variants per visitor;
  both are captured.
- **Space element boundaries.** Raw `textContent` glues siblings into
  `02Autonomy`; text is collected with element boundaries treated as whitespace.

### Audit verdicts

| Verdict | Meaning | Action |
|---|---|---|
| `IN_SYNC` | D is on the page | none |
| `E_IS_LIVE` | E was applied but never written back | D ← live, clear E |
| `DRIFT` | Same line, reworded on the site | D ← live if match ≥ 0.75, else review |
| `NOT_FOUND` | No counterpart on the page | review |
| `ANNOTATION` | Row describes the page rather than quoting it | review |

> [!note] Confidence floor
> A fuzzy match below 0.75 is never written into column D. A wrong value in the
> source of truth is worse than a stale one, because it looks correct.

---

## Rows that track generated content

Some rows describe content the page generates rather than fixed copy. Resolved
2026-07-23 per Katie:

- **`WRITING / Archive Stats`, `WRITING / Article N` — kept, and auto-refreshed.**
  The writing index is a live feed, so `refresh-writing.mjs` rewrites these
  positionally from `content/letters.js` on every sync (Article N ← the Nth
  newest post; archive count ← total posts). The sheet stays a complete
  inventory at zero maintenance cost. The sheet tracks 7 article slots; the site
  shows more, so it's the 7 newest — expand the slots later if a fuller list is
  wanted.
- **`HOME / Skill NN / Subtitle` — deleted from the sheet.** The homepage's
  six-skills section was rebuilt (`SixSkillsSection`) with no subtitle element,
  so there was nothing on the site to sync to. The skill Title and Description
  rows remain.
- `COURSE / Pricing / Fine Print` — replaced on the site by the pre-order steps
  list; held for a Sean decision in `overrides.json`.
- Modal confirmation rows (`[First Name]` / `[email]`) and the struck-out price
  (`$499 (crossed out: $599)`) — recognised by the audit's `ANNOTATION` rule and
  left as written; no override entry needed.

---

## Test suite

`scripts/site-check.mjs` replaced `smoke-test.mjs`, which still tested `/letters/`
and `/practices/` — routes renamed months earlier, so it passed by never reaching
a real page.

Covers every current route: status codes, 404 handling, metadata, console errors
and failed requests, mobile overflow at 375px, internal link resolution, both
freebie A/B variants (headline, subhead, outcome, italic `<em>`, hero form,
modal), Kit form-id agreement between `content/freebies.js` and the subscribe
route, and image alt text.

> [!important] The suite never submits a real signup.
> A valid email plus a valid slug would create an actual Kit subscriber. Form
> wiring is verified structurally and through the API's validation paths, which
> return before Kit is called.

### Known pre-existing failures

Present on production before this work; not regressions:

- `/feed.xml` 404s. `scripts/generate-rss.mjs` writes to `out/feed.xml`, but the
  app is not a static export, so nothing serves it. The footer links to it on
  every page and `app/layout.jsx` declares it as the RSS alternate. Still open.
- ~~`app/course/page.jsx` links to `/contact`, which does not exist.~~ **Fixed
  2026-07-23** — the FAQ "Email me directly" link is now a `mailto:` to
  sean@growthmindsetparenting.com.

---

## First run — 2026-07-23

The sheet and the site had drifted apart for months before this process existed.

| | |
|---|---|
| Rows audited | 503 |
| Column D corrected from the live site | 47 |
| Column E cells cleared (already applied) | 34 |
| Freebie copy edits pushed to the site | 19 |
| Rows held for review | 15 |

Two directions in one pass, per Katie's instruction: for every page except the
freebies the **site won** and column D was rewritten from it; for the four
freebie pages **column D won** — Sean had put his rewrites in D instead of E —
and the site was updated to match.

Result: 159/159 freebie rows and 321 of 336 site rows in sync with production,
the remainder being the generated-content rows above.
