# Handoff: "Who you are" section, Autopilot sales page

## What this is
A new section for the Autopilot course sales page. It's a list of 15 values-based statements that describe the parent the course is for, written so readers recognize a positive version of themselves.

`who-you-are-section.html` is a **design reference** written as inline-styled HTML. Rebuild it in the page's existing stack using the patterns already in place. **The copy is final, so reproduce it verbatim,** including the curly apostrophes, the ellipsis in the heading and the italic quote in item 14.

Open `preview.html` in a browser to see it rendered on its own.

## Where it goes
**Insert it immediately before the first pricing block** (the first block with the two price cards: $297 one-time / 2 × $149).

Page order around it:
1. … "Five weeks from now" (dark band)
2. Testimonial (single pull quote)
3. **→ NEW: Who you are**
4. Pricing (first full pricing block: "Founding cohort" intro, checklist, two price cards)
5. What's inside (curriculum) …

It **replaces** the old "If you're still on the fence / You've been doing the hard version for years" section, which sat after the second pricing block and before "Why I built this." **Delete that section.** "Why I built this" now follows the second pricing block directly.

## Structure
- **Outer section:** max-width 1200px, centred. Horizontal padding `clamp(20px, 5vw, 56px)`, top padding `clamp(64px, 8vw, 104px)`, no bottom padding (the next section's top padding provides the gap).
- **Feature card:** background `var(--card-sage)`, border `1.5px solid var(--ink)`, radius 24px, padding `clamp(32px, 5vw, 64px)`. This is the only sage feature card on the page and is meant to stand out.
- **Header block** (max-width 760px, bottom margin `clamp(32px, 4vw, 48px)`):
  - Eyebrow: "Who you are", using the design system's `.gmp-eyebrow` (11px, uppercase, 0.18em tracking), 18px below.
  - H2: "You're already the kind of parent *who…*", sized `clamp(36px, 5vw, 60px)` in Inter 800 at -0.035em, with `text-wrap: balance`. The word "who…" is the heading flourish: Lora italic 500 in `var(--accent)`.
- **Grid:** `repeat(auto-fill, minmax(min(100%, 280px), 1fr))`, gap 28px vertical and `clamp(24px, 3vw, 44px)` horizontal. That gives 3 columns on desktop, 2 on tablet and 1 on mobile.
- **Each item** (15 total) has a top border of `1.5px solid var(--ink)`, padding 18px top and 8px bottom, and stacks its parts in a column with an 8px gap:
  - Numeral `01`–`15`: Inter 800, 15px, `var(--accent)`, tabular.
  - Lead sentence: Inter 700, 18px, line-height 1.3, letter-spacing -0.015em, `var(--ink)`.
  - Supporting sentence: Inter 400, 15.5px, line-height 1.55, `var(--ink-soft)`.
  - Both sentences use `text-wrap: pretty`.
- **Item 14:** the closing quote ("I handled that. I figured that out. People can rely on me.") is set in Lora italic 500, `var(--accent)`.

## Tokens (terracotta theme)
- **Ink:** ink `oklch(0.22 0.025 50)`, ink-soft `oklch(0.40 0.030 50)`
- **Accent:** `oklch(0.58 0.16 40)`
- **Card fill:** `--card-sage` (see `ds/styles.css`)

**Fonts:** Inter, Lora italic and Source Serif 4, all from Google Fonts.

## Behavior
Static. There are no hover states, animation or interactivity.

## Files
- `who-you-are-section.html`: the section markup (reference)
- `preview.html`: a standalone preview
- `ds/`: design-system CSS (tokens and the `.gmp-eyebrow` class)
