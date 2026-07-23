---
name: gmp-copy-sync
description: Use when Katie says there are copy updates in the website sheet, "sync the copy", "there are updates in column E", "push the copy changes", or asks to check whether growthmindsetparenting.com matches the copy source-of-truth sheet. Applies column E requests to the site, deploys, verifies, then writes the copy into column D and clears E.
---

# GMP Website Copy Sync

The Google Sheet **“SOT: GMP Website”** is the source of truth for every word on
growthmindsetparenting.com.

| Column | Meaning |
|---|---|
| A | Page (`HOME`, `WRITING`, `COURSE`, `ABOUT`, `WORK WITH ME`, `FREEBIE / …`) |
| B | Section |
| C | Element type |
| **D** | **Live copy** — what the page says right now |
| **E** | **Requested change** — what Katie or Sean wants it to say |

Sheet ID `1HYHfu-zDxNxlWraH999cw_6sSl0m_I9BJWyDv2i8qQg`, tab `Sheet1`.
Repo: `~/Documents/Growth_Mindset/Website` (Next.js 14 → Vercel, auto-deploys on
push to `main`).

## The loop

Katie drops new copy in column E and says there are updates. Then:

**E → site → deploy → verify → D ← live → clear E**

## The one rule that matters

> **Never write D or clear E until the new copy is confirmed live in production.**

Column E is the only record of an unapplied request. Clearing it before the
deploy is verified loses the request with no way to recover it. Work in this
order, every time, even when the change is one word.

## Steps

### 1. Read the requests

```bash
cd ~/Documents/Growth_Mindset/Website
node scripts/copy-sync/dump-sheet.mjs /tmp/sheet.json   # prints a per-page summary
```

Rows with a non-empty column E are the work. If there are none, skip to step 8
and report drift instead.

### 2. Decide what each request means

Most column E cells hold **literal replacement copy** — use it as written.

Some hold an **instruction** (“make this shorter”, “punch up the CTA”). Draft the
copy first, then check it with Katie before touching the site. Use the
`homepage-copywriter` skill for the homepage and opt-in pages, `sales-copy-writer`
for the course/sales pages.

Apply copy verbatim, with two exceptions — and report both in the summary:
- **Fix unambiguous misspellings** (`responsibilties` → `responsibilities`).
- **Match the file's typography.** The site uses curly quotes and em dashes
  (`’ “ ” —`). Convert straight quotes from the sheet so the new copy doesn't
  render inconsistently next to everything around it.

Leave grammar and punctuation choices alone — those are Sean's voice, not errors.

### 3. Work in a worktree

```bash
git worktree add .worktrees/copy-sync -b feature/copy-sync-YYYY-MM-DD main
ln -sfn ~/Documents/Growth_Mindset/Website/node_modules .worktrees/copy-sync/node_modules
cp .env.local .worktrees/copy-sync/.env.local
cd .worktrees/copy-sync
```

### 4. Find each piece of copy in the source

```bash
node scripts/copy-sync/locate.mjs --row 341
node scripts/copy-sync/locate.mjs "the exact sentence from column D"
```

Do **not** grep the sheet text against the repo — copy is stored as HTML
entities (`&rsquo;`, `&mdash;`), wrapped across lines, and split by inline
`<em>`/`<span>` elements, so a plain grep finds nothing and you will wrongly
conclude the copy isn't there. The locator normalises both sides.

Results marked `[structured]` are in `content/freebies.js` or `data/*.js` —
those edits are a single key and are the safe case. Everything else is inline
JSX; edit the exact string, preserving surrounding entities and markup.

**Freebie pages:** all four read from `content/freebies.js`, and both A/B
variants (`WorksheetVariant`, `KitchenTableVariant`) render from that same
object — so one edit covers both designs. Copy that is hardcoded identically in
both variant files (section eyebrows, "Get me my free guide →", the modal, the
footer) must be changed in **both** files.

After editing `content/freebies.js`, confirm the italic phrases still resolve:
`heroHeadlineItalic` must be a substring of `heroHeadline`, or the emphasis
silently disappears. `site-check.mjs` asserts this.

### 5. Build and test locally

```bash
npm run build
npx next start -p 3456 &
node scripts/site-check.mjs --base http://localhost:3456
```

Known pre-existing failures, unrelated to copy — do not treat as regressions,
and do not fix them here (see *Known issues* below): `/feed.xml → 404`,
`link /feed.xml → 404`, `link /contact/ → 404`.

### 6. Rebase before deploying

```bash
git fetch origin && git rebase origin/main
```

**Do not skip this.** A GitHub Action syncs Sean's newsletters into
`content/letters.js` on its own schedule, so `origin/main` is often ahead.
Deploying without rebasing silently deletes newsletters from the live site.
Confirm the letter count matches production: `grep -c "slug:" content/letters.js`.

### 7. Deploy and confirm it is live

```bash
git push origin HEAD:main          # Vercel auto-deploys
```

Poll production until the new copy actually appears — do not assume the push
deployed:

```bash
curl -s https://growthmindsetparenting.com/<path>/ | grep -c "<distinctive phrase>"
```

Then re-run the full check against production:

```bash
node scripts/site-check.mjs --base https://growthmindsetparenting.com
```

### 8. Write back to the sheet

Only now. Capture what production actually renders, audit it against the sheet,
and apply:

```bash
node scripts/copy-sync/extract-live.mjs --base https://growthmindsetparenting.com --out /tmp/prod.json
node scripts/copy-sync/audit.mjs --live /tmp/prod.json --out /tmp/audit.json
node scripts/copy-sync/plan-sheet-update.mjs --audit /tmp/audit.json --out /tmp/plan.json          # dry run
node scripts/copy-sync/plan-sheet-update.mjs --audit /tmp/audit.json --out /tmp/plan.json --write  # apply
```

D is written from **what the page renders**, not from column E verbatim — the
copy may have been typographically normalised on the way in, and D has to match
what the next audit will see. E is cleared only for rows whose content is
verifiably live. `/tmp/plan.json` records the previous value of every cell it
touches, so a bad write can be undone.

Then refresh the auto-tracked WRITING rows (the /writing/ feed shifts whenever
Sean publishes, so these are kept current positionally from `content/letters.js`
rather than by copy matching):

```bash
node scripts/copy-sync/refresh-writing.mjs           # dry run
node scripts/copy-sync/refresh-writing.mjs --write   # apply
```

Run this on every sync — it is cheap and idempotent (prints "already current"
when there is nothing to do). It updates the 7 `Article N` slots to the 7 newest
posts and the `Pieces in archive` count.

### 9. Report

Tell Katie, in plain language:
- every copy change that went live, page by page, before → after
- any misspelling corrected or typography normalised
- rows held for review and why
- test results, naming pre-existing failures as pre-existing

## Audit mode

To check for drift without applying anything (steps 8's first two commands, then
read the verdicts): `IN_SYNC`, `E_IS_LIVE` (a request was applied but never
written back), `DRIFT` (site reworded), `NOT_FOUND` (no counterpart on the page),
`ANNOTATION` (the row describes the page rather than quoting it).

## Rows that track generated content

Some rows describe content the page generates rather than fixed copy:

- `WRITING / Archive Stats` and `WRITING / Article N` — the writing index is a
  live feed. **Kept current automatically** by `refresh-writing.mjs` (step 8),
  which refreshes them positionally from `content/letters.js`. Do not chase them
  with the copy matcher.
- Modal confirmation rows containing `[First Name]` / `[email]`, and the
  struck-out price `$499 (crossed out: $599)` — the audit's `ANNOTATION` rule
  recognises these; they need no override entry and are left as written.
- `COURSE / Pricing / Fine Print` — replaced on the site by the pre-order steps
  list; held for a Sean decision in `overrides.json`.

`scripts/copy-sync/overrides.json` holds hand-resolved decisions and should stay
nearly empty; entries marked `review` are never auto-written. (The `HOME / Skill
NN / Subtitle` rows were deleted from the sheet on 2026-07-23 — the current
`SixSkillsSection` has no subtitle element, so there was nothing to sync to.)

## Known issues

- `/feed.xml` 404s. `scripts/generate-rss.mjs` writes to `out/feed.xml`, but the
  app is not a static export, so nothing serves it. The footer links to it on
  every page and `app/layout.jsx` declares it as the RSS alternate. Pre-existing;
  tracked in the Ops Platform. `site-check.mjs` reports it — not a regression.

*(Fixed 2026-07-23: the Course FAQ's "Email me directly" link pointed to the
non-existent `/contact` and 404'd; now a `mailto:` to sean@growthmindsetparenting.com.)*

## Never

- Never clear column E before the deploy is verified live.
- Never hand-edit column D to something not rendered on the page — D is a record
  of the site, not a wish.
- Never guess a row's live value from a fuzzy match below ~0.75; hold it for
  review instead. A wrong value in D corrupts the source of truth silently.
- Never deploy without rebasing onto `origin/main` first.
