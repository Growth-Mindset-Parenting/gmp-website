# Handoff: Autopilot popup modals

## Overview
Two site-wide promotional popups for growthmindsetparenting.com, run in sequence:
1. **Webinar popup** — promotes the free live Autopilot webinar (Oct 7, 6pm CST). Runs until the webinar.
2. **Sales popup** — promotes the Autopilot course sales page (course starts Oct 20). Replaces the webinar popup after Oct 7.

Each has a desktop (centered dialog) and mobile (bottom sheet) layout.

## About the design files
`Autopilot Popup Modals.dc.html` is a **design reference built in HTML**, not production code. Open it in a browser (it loads `support.js` and the `_ds/` files beside it) to see all four artboards on one canvas. Recreate the popups in the site's existing environment (Kajabi custom code block, or whatever the site runs on) using its patterns. Do not ship the HTML as-is.

Fonts load from Google Fonts: Inter (400–800), Lora (italic 500), Source Serif 4 (400).

## Fidelity
**High-fidelity.** Colors, type, spacing and copy are final except where marked "Placeholder".

## Screens

Artboard ids in the HTML: `#1a` webinar desktop, `#1b` webinar mobile, `#1c` sales desktop, `#1d` sales mobile. Each artboard shows a dimmed mock page behind the modal; only the scrim + modal are to be built.

### Shared structure (all four)
- **Scrim:** `rgba(43,35,29,0.55)`, full viewport, `position: fixed; inset: 0`. Clicking it closes.
- **Dialog:** `role="dialog" aria-modal="true"`, `overflow: hidden`, `box-sizing: border-box`. Focus moves to the dialog on open and returns to the trigger on close.
- **Close button:** 44×44 circle, top-right (`top:16px; right:16px` desktop, `12px/12px` mobile), `border: 1.5px solid` (ink on paper variant, paper on ink variant), `border-radius: 999px`, "×" at 22px, `aria-label="Close"`. Hover inverts fill/text.
- **Content stack:** flex column, gap 20px (desktop) / 16px (mobile), containing: eyebrow → h2 → paragraph → CTA block.
- **Eyebrow:** Inter 700, 11px, uppercase, `letter-spacing: 0.18em`, preceded by an 8px accent dot (gap 10px).
- **CTA block:** flex column, gap 14px, `margin-top: 8px`. Primary pill button + dismiss text link.
- **Primary CTA:** Inter 600, 17px, `padding: 16px 28px`, `border-radius: 999px`, inline-flex, gap 10px, trailing "→". Hover: gap grows to 16px (transition 0.2s) and background swaps (see variants). Mobile: full width, centered.
- **Dismiss link:** Inter 400, 14px, underlined (`text-underline-offset: 3px`). Closes the popup. Mobile: centered, 8px padding for tap target.
- **Paper airplane + dotted flight path:** decorative SVG, `pointer-events: none`, positioned absolutely in the bottom-right, behind the content (see SVG section).

### 1a · Webinar — desktop
- Dialog: width 580px, centered. Background `--paper`, `border: 3px solid --ink`, `border-radius: 24px`, `padding: 44px 48px 40px`, `box-shadow: 0 24px 64px rgba(0,0,0,0.28)`. Text color `--ink`.
- Eyebrow: color `--ink-soft`. Copy: "Free live webinar · Oct 7, 6pm CST".
- H2: Inter 800, 44px, `letter-spacing: -0.035em`, `line-height: 1.02`, `max-width: 440px`. Copy: "Placeholder webinar *title goes here*" — italic phrase in Lora italic 500, `--accent`. **Placeholder — final title TBD.**
- Paragraph: Source Serif 4, 19px, `line-height: 1.5`, `--ink-soft`, `max-width: 440px`. Copy: "Placeholder tagline — one sentence on what parents will walk away with. Sixty minutes, recorded if you can't make it." **Placeholder.**
- Primary CTA: bg `--ink`, text `--paper`. Hover bg `--accent`. Copy: "Save my seat →". Links to the webinar registration page.
- Dismiss: color `--ink-mute`, hover `--accent`. Copy: "No thanks, I'll keep reminding them myself".

### 1b · Webinar — mobile (≤ 480px)
- Bottom sheet: width 100%, anchored to viewport bottom. `border: 3px solid --ink` (no bottom border), `border-radius: 24px 24px 0 0`, `padding: 36px 28px 44px`. No shadow.
- H2: 34px, `max-width: 280px`. Paragraph: 17px. CTA full-width. Other values as 1a.

### 1c · Sales — desktop
- Dialog as 1a but background `--ink`, no border, text `--paper`, `box-shadow: 0 24px 64px rgba(0,0,0,0.35)`.
- Eyebrow: color `--paper-3`. Copy: "Now enrolling · starts Oct 20".
- H2: "Autopilot" — Inter 800, 92px, `letter-spacing: -0.05em`, `line-height: 0.9`, `margin-left: -4px`.
- Paragraph: Source Serif 4, 20px, `line-height: 1.45`, `--paper-3`, `max-width: 450px`. Copy: "A 5 week course, built to help parents *stop over functioning* and develop their kids' executive function." Italic phrase: Lora italic 500, color `oklch(0.78 0.13 45)` (lightened accent for dark ground).
- Primary CTA: bg `--accent`, text `--paper`. Hover bg `--paper`, text `--ink`. Copy: "See the course →". Links to the sales page.
- Dismiss: color `--paper-3` at 0.85 opacity, hover `--paper` at 1. Copy: "No thanks, the chore chart is working great".

### 1d · Sales — mobile
- Bottom sheet as 1b but background `--ink`, no border. H2 68px (`margin-left: -3px`), paragraph 17px. Other values as 1c.

## Paper airplane SVG
Inline SVG, `fill="none"`, absolutely positioned, `pointer-events: none`. Place it as the **first child** of the dialog (below the content stack, which is `position: relative`).

**Desktop** — `viewBox="0 0 580 200"`, `width=580 height=200`, `position:absolute; left:0; bottom:0`:
```
<path d="M 350 186 C 384 184, 404 174, 418 160 C 436 138, 480 150, 470 176 C 460 200, 412 186, 424 152 C 434 126, 464 120, 484 124"
      stroke="ACCENT" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 11"/>
<g transform="translate(528 122) rotate(-6)">
  <path d="M 0 0 L -40 -16 L -30 0 L -40 16 Z" fill="BG" stroke="FG" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 0 0 L -30 0" stroke="FG" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M -30 0 L -26 10" stroke="FG" stroke-width="2.5" stroke-linecap="round"/>
</g>
```
Note: in artboard 1a the designer nudged this SVG to `left:-157px; top:60px; width:672px; height:296px` (scaled ~1.16×, relative to the content stack). Match that placement for the paper variant; 1c uses the default bottom-right placement.

**Mobile** — `viewBox="0 0 390 120"`, `width=390 height=120`, `left:0; bottom:0`:
```
<path d="M 160 98 C 190 96, 214 88, 236 78 C 256 66, 292 76, 284 98 C 276 118, 236 108, 250 82 C 262 62, 300 70, 316 84"
      stroke="ACCENT" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="1 9"/>
<g transform="translate(350 82) rotate(-6)">
  <path d="M 0 0 L -32 -13 L -24 0 L -32 13 Z" fill="BG" stroke="FG" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M 0 0 L -24 0" stroke="FG" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M -24 0 L -21 8" stroke="FG" stroke-width="2.2" stroke-linecap="round"/>
</g>
```
Paper variant: `BG = --paper`, `FG = --ink`. Ink variant: `BG = --ink`, `FG = --paper`. `ACCENT = --accent` in both.

## Interactions & behavior
- **Trigger:** on scroll, when the visitor has scrolled ~40% of the page. Do not show on page load.
- **Frequency:** once per visitor per phase. Store a flag (localStorage or cookie) on close/dismiss/CTA click, e.g. `gmp_popup_webinar_seen`, `gmp_popup_sales_seen`. Suggested expiry: 14 days, or none since each phase is short.
- **Phase switch:** show webinar popup while `now < Oct 7 2026 18:00 CST`; afterwards show sales popup. Optionally stop the sales popup once enrollment closes.
- **Close:** × button, scrim click, Esc key, dismiss link. Primary CTA navigates (same tab) and also sets the seen flag.
- **Open/close animation:** none required (brand guidance: no fades or slide-ins). A 150ms opacity on the scrim is acceptable.
- **Hover:** primary CTA gap 10→16px and bg swap, transition 0.2s. Close button inverts. Dismiss link color change.
- **Body scroll:** lock while open.
- **Accessibility:** `role="dialog" aria-modal="true" aria-labelledby=<h2 id>`, focus trap, Esc to close, close button first in tab order after the dialog receives focus.
- **Responsive:** desktop dialog ≥ 481px viewport; bottom sheet ≤ 480px. Desktop dialog has 32px viewport padding so it never touches edges.
- **Don't show** on the webinar registration page or the sales page themselves.

## State
- `phase`: "webinar" | "sales" (derived from date)
- `open`: boolean
- `seen[phase]`: boolean (persisted)
- `scrollTriggered`: boolean (session)

## Design tokens (theme-terracotta)
Colors (OKLCH, approx hex):
- `--paper` oklch(0.985 0.006 80) ≈ #FBF9F5
- `--paper-3` oklch(0.92 0.022 65) ≈ #EAE2D6
- `--ink` oklch(0.22 0.025 50) ≈ #2B231D
- `--ink-soft` oklch(0.40 0.030 50) ≈ #5B4E44
- `--ink-mute` oklch(0.55 0.025 55) ≈ #857569
- `--accent` oklch(0.58 0.16 40) ≈ #C8623F
- Accent on dark: oklch(0.78 0.13 45) ≈ #E9A07E
- Scrim: rgba(43,35,29,0.55)

Type: Inter 400/600/700/800 · Lora italic 500 · Source Serif 4 400.
Radii: 24px dialog, 999px pills and close button. Border: 3px ink (dialog), 1.5px (close button).
Shadows: 0 24px 64px rgba(0,0,0,0.28) paper dialog / 0.35 ink dialog; none on mobile sheets.

## Assets
- Paper airplane and flight path: inline SVG above (no file).
- `assets/growth-mindset-parenting-logo.png` — used only in the mock page behind the modal; not part of the popup.

## Files
- `Autopilot Popup Modals.dc.html` — all four artboards.
- `support.js` — runtime the HTML needs to render.
- `_ds/…/colors_and_type.css`, `styles.css`, `_ds_bundle.js` — GMP design tokens.
- `assets/` — logo (mock page only).
