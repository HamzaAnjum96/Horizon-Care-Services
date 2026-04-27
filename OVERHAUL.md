# Horizon Care Services — Overhaul Brief

For Opus. Read every word before touching any file.

---

## What is already built and must not change

The design system is complete. **Do not modify `assets/css/style.css` custom properties, tokens, or base component styles.**

### Palette
- **Midnight** `oklch(22% 0.055 260)` — deep navy, primary identity colour. Hero backgrounds, footer, dark panels, CTA blocks.
- **Amber** `oklch(70% 0.14 72)` — warm honey. Labels, accents, CTA buttons, decorative numbers, icon colour, coverage band.
- **Canvas** `oklch(98.5% 0.004 95)` — barely-warm off-white. Page background.
- All tokens live in `:root` in `style.css`. Use them. Never hard-code values.

### Fonts
- **Spectral** — display headings, weights 600–800, italic cuts available. All `h1`–`h3`.
- **Sora** — body and UI text, weights 300–600.
- Google Fonts import already in every HTML file. Do not change the import string.

### What the home page already does (do not regress)
`index.html` has been structurally overhauled. Study it before touching subpages:

- **Hero**: full-viewport midnight (`min-height: 100svh`), heading split into `.hero__line > span` for line-mask reveal animation (translateY from 108%), amber `.hero__rule` that draws to 80px width, `.hero__body` fades up, image wipes in with `clip-path: inset(0 100% → 0%)`, meta bar pinned to bottom of hero as full-width strip
- **Services**: `.service-panels` — full-width horizontal rows, not a card grid. Each panel has a `.service-panel__num` (enormous, 11rem, opacity 0.1 amber) that shifts on hover. CTA button hidden until hover.
- **Coverage band**: CSS `marquee` animation — duplicated text scrolling infinitely. Not a static line.
- **Value pillars**: SVG path-draw animation on scroll reveal (`stroke-dashoffset: 200 → 0`), icon scale+rotate on hover.
- **All tiles/cards**: `translateY(-4px)` lift on hover.
- **Primary buttons**: shimmer pass on hover (gradient translateX).
- **Process steps**: left-indent hover with number translate.

The CSS for all of these lives at the bottom of `style.css` under `/* Overhaul */`. Read it.

---

## What still needs doing — the five subpages

The subpages currently use the correct design tokens and midnight page-heros, but their **layout structures are generic**: centered stacks of sections, identical card grids, split sections that repeat the same rhythm on every page. Every page below needs structural ambition matching the home page.

### Shared rules for all subpages

1. **Page hero**: already midnight background with line-mask heading — keep this pattern. The headings should stay italic Spectral with `em` words in amber. Do not touch the `.page-hero` CSS class.
2. **No identical card grids**: if a section has 4+ items in a grid, find a different structure. Numbered rows, horizontal lists, typographic treatments — anything but same-sized bordered boxes.
3. **Decorative numbers**: use the `.service-panel__num` technique (or equivalent) wherever content has an inherent sequence. Large, transparent, amber, positioned behind content.
4. **Motion**: every section should have `data-animate` on its key elements. Stagger children.
5. **Breathing room**: sections should feel spacious. Vary vertical padding between sections — not every section gets the same spacing.
6. **Dark sections**: at least one non-hero dark section per page. Use `background: var(--midnight)` on a `<section>` — not just the CTA block.

---

## `pages/about.html`

### Current problems
- Mission text is inside a `.content-card` bordered box — unnecessary containment, makes the text feel trapped
- Values section is a 4-column tile grid — four identical bordered boxes with heading + text
- Everything stacks in the same rhythm

### Required structure

**Mission section**
Drop the `.content-card` wrapper entirely. Run the mission copy as large, well-spaced body text directly on the canvas — generous `max-width: 72ch`, `font-size: 1.125rem`, `line-height: 1.8`. Add a large pull-quote or the company name in Spectral 800 as a decorative element positioned near the text — something with typographic weight.

**Values section**
Replace the 4-column card grid with a **numbered list**: each value is a full-width horizontal row with a large amber number (`3rem+` Spectral 800, left column), the value name as an `h3` (centre column), and the description right-aligned or in a third column. Separated by thin `var(--border)` lines top and bottom — no card boxes. On hover: the row gets a `var(--canvas-mid)` background and the number shifts right slightly (mirror of the process-step hover).

**Approach section (split section)**
Keep the split layout but make the image taller — `height: clamp(420px, 55vw, 600px)`. The image should feel like it fills its column, not sit in a box.

**Regulatory note**
Drop the `.content-card`. One sentence of dark text on `var(--canvas-mid)` with generous padding. No border.

**CTA block**
The existing `.cta-block` (midnight background) is fine. Keep it.

---

## `pages/supported-accommodation.html`

### Current problems
- Stats bar sits separately below the page-hero as a distinct band — creates a gap in the dark → light transition
- Scheme cards are a 2×2 grid of similar bordered boxes
- Two split sections in a row (same rhythm, same image treatment)

### Required structure

**Hero + stats merged**
Move the four stats (`5+`, `4`, `7`, `24/7`) inside the page-hero as a bottom row — the same `.hero__meta-bar` / `.hero__meta` pattern used on the home page. Remove the separate `.stats-bar` element. The hero section now ends with the stats pinned to its base, just like home.

**Schemes section**
Replace the 2×2 card grid with a **vertical list of four full-width rows**. Each scheme row:
- Duration badge (amber, left) as a wide left column (`minmax(10rem, 14rem)`)
- Scheme name as large Spectral h3 (centre, `1.75rem`)
- Description text (right column)
- Thin `var(--border)` line separating rows
- On hover: subtle `var(--canvas-mid)` background, duration badge text brightens to `var(--amber)`

No card borders. No boxes. A clean, editorial list — like a programme schedule or a menu.

**Support approach section**
This currently has a split layout with a list of process steps on the right. Keep the split, but make the process step numbers **much larger** — `clamp(2.5rem, 5vw, 4rem)` — so they function as visual markers, not just labels. Add generous vertical space between steps.

**Team section**
The check-list is fine, but give the section a midnight background instead of canvas. White headings, muted body, amber check marks (already the case), amber CTA button. This creates a strong visual break between the two split sections.

**Accommodation section**
Instead of two content cards side by side, make the Hatfield property the clear primary — full-width with a horizontal layout (image placeholder or a large amber `H` monogram left, details right). The "Coming Soon" item is secondary: a slim, single-line row below with a `--midnight-tint` background and the badge.

---

## `pages/staffing-solutions.html`

### Current problems
- Products & Services: six identical service tiles — the worst offender on any page
- Roles we place: six identical role cards
- Both sections use the same `auto-fit minmax()` grid pattern

### Required structure

**Products & Services**
Replace the six tiles with a **two-column definition list style**:
- Left column: service name in Spectral 600, `1.125rem`
- Right column: description in Sora, `0.9375rem`, `var(--ink-mid)`
- Full-width rows, separated by `var(--border)` lines
- On hover: the service name shifts to `var(--midnight)` and `var(--amber)` appears as a left-edge accent on the row (this IS allowed — it's the full-width row changing, not a bordered card with a stripe)
- Background: `var(--canvas-mid)` for the section

**Roles we place**
Six roles. Use the same enormous-number technique but for a **3-column layout**:
- Each role gets a sequentially numbered block (`01`–`06`)
- The number is large (`4rem+`) and in amber at low opacity, positioned in the top-left of each block
- Role name in Spectral semibold, description in Sora small
- Full border, but the number creates visual depth that makes them feel designed rather than template

**Why choose us section**
Currently has three benefit tiles inside a split section — nested cards inside a split. Remove the tiles. Run the three points as a **numbered typographic list** (same pattern as the about page values): large amber number, heading, description. No boxes.

**Service Promise section**
Two content cards. Replace with a single full-width dark (`var(--midnight)`) section containing two columns of text — no card borders, just the midnight background dividing the content from the rest of the page.

---

## `pages/careers.html`

### Current problems
- Four benefit tiles are the first content after the hero — small and visually weak
- Seven role cards is a long grid of identical boxes
- The page doesn't feel distinct from the staffing page

### Required structure

**Why work with us**
Before the four benefit tiles, add a single large typographic statement — one sentence in Spectral italic, `clamp(1.75rem, 3.5vw, 2.75rem)`, `var(--midnight)`, max-width about `20ch`. Something like: *"A team built on consistency, not just availability."* This anchors the section with conviction before the specifics.

The four benefit tiles below it: replace with a **2-column horizontal pair** using the full width — not a `auto-fit minmax` grid. Left column: competitive rates + flexible shifts. Right column: training + culture. Each item has a large amber number, heading, description. Section background: `var(--midnight)` — make this the dark section for the careers page.

**Roles section**
Seven roles. Use a **compact typographic roster** — not cards:
- Role title in Spectral 600, `1.0625rem`
- One-line description in Sora 400, `0.875rem`, `var(--ink-soft)`
- Each role separated by a `var(--border)` line
- On hover: role title shifts to `var(--midnight)`, row gets `var(--canvas-mid)` background, a small `→` appears on the right
- This reads like a professional capabilities list — fast to scan, confident, not a card catalogue

**How to apply**
The three process steps are already good. Increase the number size to `clamp(2.5rem, 4vw, 3.5rem)` for more visual weight.

---

## `pages/contact.html`

### Current problems
- The left column (contact info) is visually weak — info blocks feel like a form, not a welcoming contact point
- The phone number doesn't lead

### Required structure

**Left column**
Lead with the phone number in very large Spectral type — `clamp(2rem, 4vw, 3rem)`, `var(--midnight)`, weight 700. A small amber label above it ("Call us"). Below the number, the office number in smaller type. Then a thin `var(--border)` rule, then the address and email in the info-block pattern.

Add a response-time callout below the info blocks: a small `var(--midnight-pale)` rounded box saying "General enquiries: 2 working days · Urgent staffing: same day" — something concrete and reassuring, not buried in prose.

**Right column (form)**
The form structure is correct. Keep it. But give the form section a `var(--midnight)` background for the outer `page-section`, with the form card itself in `var(--canvas)`. This makes the form feel like it's being presented, not just placed.

---

## Animation requirements for subpages

Every subpage should have these interactive details:

- **Numbered rows** (values, scheme list, roles roster, definition list): hover background + number translate, matching process-step style
- **Section reveals**: all major headings and content blocks use `data-animate="fade-up"` with `data-stagger` on children
- **Page hero headings**: use the `.hero__line > span` line-mask pattern for headings that are 2+ lines
- **Dark sections**: any section with `background: var(--midnight)` should have its text elements animate in with `data-animate="fade-up"`
- **Stats** (where present): use `data-count-to` attribute on numeric values — JS counter animation already handles this if the attribute is present

---

## Absolute constraints

- No `border-left` or `border-right` > 1px as a coloured card accent
- No gradient text (`background-clip: text`)
- No glassmorphism
- No identical card grids — same box repeated 4+ times
- No inline styles except `background-image` URLs
- British English in all copy
- Static HTML/CSS/JS — no build step, no framework
- All images: Pexels URLs with real photo IDs you are confident exist
- `<site-nav>` and `<site-footer>` custom elements — do not modify their attributes

## Definition of done

- All five subpages structurally overhauled per this brief
- No subpage looks like a stack of generic sections
- At least one non-hero dark section per page
- No identical card grids anywhere
- Animated elements on scroll throughout
- Committed and pushed to `main`
