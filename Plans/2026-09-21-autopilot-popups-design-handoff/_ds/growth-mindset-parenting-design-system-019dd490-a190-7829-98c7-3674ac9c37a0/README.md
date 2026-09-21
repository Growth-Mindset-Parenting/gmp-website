# Growth Mindset Parenting (GMP) — Design System

A design system for **Growth Mindset Parenting**, the personal brand and publishing project of **Sean Kane** — a former middle-school English teacher (room 201, twelve years) who now writes about parenting his three sons using the same growth-mindset practices he used in the classroom.

The brand voice is **plainspoken, kitchen-table, classroom-tested**. The visual world is **editorial, warm, hand-built** — closer to a thoughtful Saturday newsletter than a SaaS landing page. Photography of Sean (in studio, teaching, candid) is the central visual asset.

## Source materials

This system was distilled from a single reference codebase the user provided:

- **`Gmp website/`** (mounted via the Import menu, read-only) — a multi-version design exploration containing five color themes, three website "directions" (V6 Workshop, V7 Studio, V8 Field Notes), full interior pages (homepage, about, course, letters archive, individual letter, six practices), and parallel mobile recreations.
  - `styles/themes.css` — five palette themes (terracotta, forest, navy, sage, marigold). **Terracotta is the canonical theme** (set on every page).
  - `styles/shared.css` — base body/typography tokens and editorial primitives (eyebrow, dropcap, smallcaps, rules).
  - `styles/v6.css` + `styles/v6-pages.css` — the V6 "Workshop" direction, the most-developed and the basis of this design system.
  - `pages/*.jsx` — React component sources for each page.
  - `pages/letter-data.jsx` — the full letters catalogue with bodies (canonical voice samples).
  - `assets/sean-*.jpg` — six photos of Sean, used throughout (hero, square, studio, teaching, candid, wide).

The brand has **no slide template**, **no logo file**, **no icon font** — Sean's mark is a typographic one (the word "GMP" or "Sean Kane" set in the brand sans, sometimes with an accent-colored chip behind it). See ICONOGRAPHY for substitutions.

## Products represented

There is **one product surface**: a marketing + content website ("Growth Mindset Parenting"), which contains the homepage, an essays/letters archive ("The Saturday Letter"), a practices page (the six classroom practices), a course page ("Middle Skills"), and an about page. A parallel mobile site exists.

The codebase explores three visual directions (V6 Workshop, V7 Studio, V8 Field Notes) and five palette themes. **This design system canonizes V6 Workshop on the terracotta theme** as the primary direction, because it's the most fully developed (full interior pages exist) and the most aligned with Sean's voice. V7 and V8 motifs (sticker badges, polaroid stacks, dashed rules) are documented as accent variants.

---

## Index

Once you've read the README, here's what else lives in this folder:

- **`colors_and_type.css`** — the foundational CSS variables (palette themes, type tokens, semantic styles like h1/h2/p/eyebrow/dropcap). Drop into any HTML and add `class="theme-terracotta"` to `<body>`.
- **`fonts/`** — webfont links (Inter, Source Serif 4 — Google Fonts, no local files needed). Cormorant Garamond was retired from the system in v5.
- **`assets/`** — Sean's photo library + brand mark SVG.
- **`reference/`** — read-only copies of the canonical CSS and a couple of voice-sample JSX files lifted verbatim from the source codebase. **Read these for reference; do not link them in production.**
- **`preview/`** — small HTML cards that populate the Design System tab.
- **`ui_kits/website/`** — the V6 Workshop UI kit: a clickable, multi-page hi-fi recreation of the GMP site with reusable React components (`Nav`, `Hero`, `Ticker`, `JumpGrid`, `PracticesGrid`, `Quote`, `Subscribe`, `Footer`).
- **`SKILL.md`** — agent skill manifest, so this system is also usable as a Claude Skill.

---

## Content fundamentals

**Voice.** First-person, conversational, classroom-tested. Sean writes the way a calm seventh-grade English teacher talks at a kitchen table — direct, slightly self-deprecating, allergic to jargon. Sentences are often short, occasionally long-and-rolling. He uses "I" and "you" freely. Never "we" in the corporate sense.

**Stance.** Plainspoken. He distrusts both performative gentleness and performative authority. He believes in *practices* (small, repeatable moves) over *philosophies*. He cites his sources — "stolen verbatim from a faculty meeting," "from Lemov, from Brooks-Gunn, from a librarian named Mrs. Esparza."

**Casing.** Sentence case for everything — nav, headings, buttons, eyebrows. Never Title Case. Never ALL CAPS except for the small editorial eyebrow (`.gmp-eyebrow`, ~11px, 0.18em tracking).

**Punctuation.** Em dashes used freely. Curly quotes (" "). Numbers spelled out for small ones in prose, lining numerals when listed (`gmp-num`).

**Length.** Headlines are big and confident — single-sentence, often with one **key phrase set in Lora italic, weight 500, in `--accent`** (terracotta). The italic is the editorial counter-voice to Inter; color carries the rest of the emphasis. Subheads run 12–20 words. Body paragraphs: 2–4 sentences, breathable.

**Emoji.** **Never.** Not a single emoji appears in the entire reference codebase. If a glyph is needed, use a checkmark (`✓`), em dash, or arrow (`→`).

**Specific examples lifted from the codebase:**

> "From room 201 to the kitchen table — same six practices, fewer interruptions."

> "Joining 4,820 parents and teachers who like their advice plainspoken."

> "I taught middle school for twelve years. Then I had a son. Then two more."

> "The mood you carry is the climate they live in."

> "Inspect, don't expect."

> "Three to one — three observations of growth for every correction."

> "If this is the only letter of mine you ever read, this is the one."

CTAs are verbs: **Get the guide. Subscribe. Read the letter. Join the waitlist. Enroll.** Never "Learn more," never "Click here," never "Get started today!"

---

## Visual foundations

**Colors.** Five palette themes are defined; **terracotta is canonical**. Each theme follows the same five-role structure:
- `--paper` / `--paper-2` / `--paper-3` — three increasingly tinted neutrals
- `--ink` / `--ink-soft` / `--ink-mute` — three increasingly muted texts
- `--accent` / `--accent-deep` / `--accent-soft` — the brand color in three intensities
- `--rule` — hairlines

All colors are defined in **OKLCH** for perceptual uniformity. The terracotta accent (`oklch(0.58 0.16 40)`) is a sun-baked clay red.

**Type.** Three families with two distinct accent jobs:
- **Inter** (sans, `--sans`) — UI, headlines, body, big display numerals, **and inline body emphasis**. Weights 400/500/600/700/800. Headlines lean on 800 with -0.035em tracking.
- **Lora** (serif italic, `--serif-italic`) — the **heading flourish**. One italic phrase per h1/h2 in `--accent`, weight 500. This is the signature move at display sizes.
- **Source Serif 4** (serif text, `--serif-text`) — long-form body copy on essay pages, deks, pull quotes. 17–19px, line-height 1.55–1.6. Pull quotes use weight 600 in `--accent`, no italic.

**Two accent voices, two jobs:**
1. **Heading flourish** — Lora italic 500 in `--accent` inside h1/h2. Editorial counter-voice; one phrase per heading. E.g. `<h1>From <em>room 201</em> to the kitchen table.</h1>` (where the h1 is Inter 800 and the `<em>` styles to Lora italic).
2. **Inline body accent** — Inter Semibold (600) in `--accent` inside running body copy. Confident hand-on-shoulder emphasis that pulls a key phrase forward without breaking the line. E.g. `<p>… <em>prioritization and emotional regulation</em> become non-negotiable skills.</p>` — the `<em>` styles to Inter Semibold terracotta. Use sparingly, ~one phrase per paragraph.

Cormorant Garamond was used in earlier iterations and replaced by Lora; weight 500 reads as a true italic without losing presence at display sizes.

**Spacing.** No formal scale — the codebase uses a **56px page gutter** (`padding: 24px 56px 0`), **16/24/32/56/64/80/96px** vertical rhythm, and **8px** for fine detail. Sections breathe (96px between major blocks).

**Backgrounds.** Mostly `--paper` (a warm near-white). Big sections occasionally use `--paper-2` or full-bleed `--ink` (e.g. quote section, subscribe card). One full-bleed accent ticker per page (animated horizontal marquee). **No gradients except** one radial wash on the dark course-flagship card. **No textures, patterns, or repeating illustrations.**

**Photography.** Warm, slightly desaturated, full-frame. Sean is the only person photographed. Photos live inside cards with `border-radius: 8–12px`, sometimes wearing a small caption chip in the top-left ("Sean Kane · Chicago, IL"). The photo treatment data attribute supports `duotone` (grayscale 0.6 + sepia 0.18) and `mono` (full b&w) variants for editorial pages.

**Animation.** Restrained. `transition: 0.15–0.20s` on hover only. Two repeated tropes:
- **Ticker marquee** — 28–32s linear infinite horizontal scroll on a single accent strip per page.
- **CTA gap-grow** — primary CTAs grow their `gap` from 10→16px on hover, so the arrow nudges right. Combined with `background: var(--accent)` swap on dark CTAs.

No fades, no slide-ins, no scroll-triggered reveals.

**Hover states.**
- Links: `color: var(--accent)`.
- Cards: `transform: translateY(-4px)` + soft `box-shadow: 0 12px 32px rgba(0,0,0,0.10)`. **Never** scale; never glow.
- Buttons (dark): `background: var(--accent)` swap.
- Practice grid cells: `background: var(--paper-2)`.
- Practice arrow buttons: `transform: translate(4px, -4px)` and `background: var(--accent)`.

**Press states.** Not explicitly defined in the codebase. Default browser behavior; no shrink-on-press.

**Borders.** Heavy, structural, intentional. `1.5px solid var(--ink)` is the brand border weight — used on cards, nav dividers, the practices grid (which uses negative margins to share borders), the dark subscribe card. **Borders are part of the look.** Hairlines (`1px solid var(--rule)`) divide list rows.

**Shadows.** Reserved. Only two patterns:
- Photos in hero: `0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.04)` — soft, low.
- Hovered cards: `0 12px 32px rgba(0,0,0,0.10)`.
- The V8 polaroid variation uses `0 12px 32px rgba(0,0,0,0.18)`.

No inner shadows. No elevation system beyond "card vs. hovered card."

**Layout rules.**
- **Page gutter:** `24px 56px 0`. Full-bleed strips (ticker, dark sections) escape with `margin: 0 -56px`.
- **Bento grid:** the homepage "Jump into" grid uses `grid-template-columns: 1.4fr 1fr 1.4fr 1fr 1fr` with the first card spanning 2×2 — asymmetric, editorial.
- **Practices grid:** 3-column borderless grid where cells share a single ink border (negative borders). Iconic.
- **Sticky table-of-contents** on long-form essay pages (`position: sticky; top: 24px`).
- **No fixed top nav.** The nav scrolls with the page.

**Transparency / blur.** Almost none. Form inputs on dark backgrounds use `rgba(255,255,255,0.08)` — that's the only place transparency appears. **No backdrop-blur anywhere.**

**Imagery vibe.** Warm, sun-baked, classroom/kitchen-table. Color photography, not illustration. Slight grain implied by the `geometricPrecision` text rendering and the OKLCH paper tones, but no actual film-grain overlay.

**Corner radii.**
- `4px` — small chips (nav stamp, caption tag).
- `8px` — small inputs, photos.
- `12px` — cards, photos.
- `16px` — primary content cards (jump grid, course modules, subscribe card mid-size).
- `24px` — XL feature cards (full subscribe block, course flagship).
- `999px` — pills (CTAs, eyebrow chip, ticker pills).

**Cards.** A canonical GMP card: `1.5px solid var(--ink)`, `border-radius: 16px`, internal padding `28–36px`, one of four pastel bg fills (`card-cream`, `card-blush`, `card-clay`, `card-sage`) or `card-ink` (dark). Numbered with a Cormorant italic numeral in the top-right.

**Capsules vs. protection gradients.** Pills with `1.5px` ink border are the protection mechanism — never blurred-bg gradients.

---

## Social & feed graphics (Pinterest + Instagram)

The website type tokens (`--t-h1: 64px`, `--t-body: 16px`) are sized to be read up
close. **Never use them on social graphics.** Pins and feed posts are seen as small
thumbnails, so type must read at a glance — roughly 3–5× web sizes. Use the
`--social-*` scale (defined in `colors_and_type.css`; opt in with `class="gmp-social"`).
Every format below is ~1080px wide, so the same px values apply.

### Type scale — floor values, size UP when in doubt
- Hero statement (whole-graphic idea / hot take): 90–115px, Inter 800
- Headline: 70–88px, Inter 800
- Secondary headline / Lora-italic stat: 56–66px
- Subhead / framework name: 34–44px
- List / step / tip items: 38–48px (term bold; descriptions never below 30px)
- Body / context paragraph: 30–36px
- Source / caption: 24–28px
- Eyebrow (uppercase, 0.20em tracking): 20–24px
- Footer URL: 20–24px; footer logo height: 38–44px
- **Absolute minimum for any text: 28px.**

### Canvas sizes
- Pinterest pin — **1000×1500** (2:3). Canonical. Text-rich, saveable layouts thrive.
- Instagram feed, portrait — **1080×1350** (4:5). Preferred IG post; scale carries over directly.
- Instagram feed, square — **1080×1080** (1:1). Same width, far less height — fit fewer
  items (3–4 max) and size the hero/headline up.
- Instagram Stories / Reels — **1080×1920** (9:16). Full-screen vertical.

### Platform rules
- **Stories / Reels safe zones:** keep ~250px clear at the TOP and ~320px at the BOTTOM —
  the IG UI (profile, caption, action buttons) overlays those bands. Center the message.
- **IG profile-grid crop:** a 4:5 portrait post is center-cropped to a square on the grid.
  Keep the headline and logo out of the top/bottom ~135px if the grid preview matters.
- **Pinterest** has no safe-zone or crop constraints — use the full 1000×1500.

### Density by platform
- **Pinterest** rewards saveable, reference-style density — full step lists, longer context.
- **Instagram** is faster-scroll: fewer words, even larger, first line must hook. Split long
  lists into a carousel (multiple 1080×1350 frames) rather than cramming one graphic.

### Shared layout rules
80–96px gutters. One Lora italic accent phrase per headline (terracotta). Sentence case,
no emoji. One-line logo in the footer (`logo/growth-mindset-parenting-logo.png`, or
`-reverse` on dark) with `growthmindsetparenting.com`.

---

## Iconography

**There is no icon font, sprite, or icon library in the reference codebase.** Sean uses iconography sparingly and almost entirely typographically:

- **Numerals** (Inter 700/800 in `--accent`, large, tabular-nums, -0.035em tracking) — the dominant iconographic element. `01`, `02`, `03` ... appear on every list, every card, every section. Sized 24–56px depending on context.
- **Arrows** — text glyphs only: `→` (`&rarr;`) for forward, `↓` for downward. Sometimes inside a 28–40px circle filled `--ink` or `--accent`.
- **Stars** — used once, for testimonial ratings: `★★★★★` in `--accent` color, letter-spaced.
- **Bullet checks** — `✓` in `--accent` color before list items in pricing/feature blocks.
- **Dot** — an 8px filled circle in `--accent`, used inside the eyebrow pill ("· Hey, I'm Sean.").
- **No SVG icons. No emoji. No Unicode beyond the above.** The brand's restraint here is intentional.

**If you need an icon for a new component:** prefer a typographic glyph (numeral, arrow, dot, em-dash) before reaching for SVG. If you absolutely need an icon (e.g. a podcast app icon row), use **Lucide** at `https://unpkg.com/lucide-static/icons/` with `stroke-width: 1.5` and `color: currentColor` — it's a substitution, not a brand asset, and should be flagged as such.

**Logos.** No real logo file exists. The mark in the codebase is a typographic chip: the word "GMP" or a stamp-style nav badge with `background: var(--accent); color: var(--paper); font-weight: 800; padding: 4px 8px; border-radius: 4px`. A reproduction of this mark lives in `assets/gmp-mark.svg`.

**Background images / illustrations.** None used. The only imagery is photography of Sean.

---

## Substitutions flagged

- **Fonts** — All three families (Inter, Cormorant Garamond, Source Serif 4) are loaded from **Google Fonts** in the reference codebase. No local TTF/WOFF files were provided. The Google CDN is the canonical source. **No substitution needed.**
- **Icons** — No icon system exists. Recommended Lucide as a substitution for any UI that requires actual icons. **Flag this to the user if you use it.**
- **Logo** — No final logo file. The typographic stamp mark is the working version. **Ask the user for a final logo if one exists.**
