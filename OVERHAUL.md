# Design Overhaul Brief

Horizon Care Services Ltd — for Opus

---

## What exists

A complete CSS design system is built and committed. The tokens, components, and visual language are solid. **Do not change the CSS custom properties or the design tokens.** The palette, fonts, and spacing scale are intentional and should be preserved:

- **Palette:** Deep midnight (`oklch(22% 0.055 260)`) + warm amber (`oklch(70% 0.14 72)`) + barely-warm off-white canvas
- **Fonts:** `Spectral` (display/headings, 600–800 weight) + `Sora` (body/UI, 300–600)
- **Strategy:** Committed — midnight is load-bearing, amber is the warm voice
- **CSS file:** `assets/css/style.css` (1,959 lines, all tokens, components, and responsive breakpoints done)

The JS files (`layout.js`, `cookies.js`, `main.js`) are unchanged from the original and work correctly. The custom elements `<site-nav>` and `<site-footer>` render nav and footer from `data-base` / `data-active` attributes.

---

## The problem

The HTML structure was copied from an archived version of the site. It works, but the *layouts* are generic:

- Every page opens with a centered text block (page-hero), then stacks sections vertically
- Split sections (text + image) repeat on every subpage in the same rhythm
- Service grids, role card grids, benefit tile grids all follow the same `auto-fit minmax()` pattern
- The home hero is a standard two-column split — text left, image right — no structural ambition
- Nothing uses the whitespace, typographic scale, or midnight/amber system to create a distinctive compositional voice

The CSS has the vocabulary for something much bolder. The HTML does not use it.

---

## What the overhaul should do

This is a brand surface. Design IS the product. The layouts need a point of view.

### Principles from PRODUCT.md

- **Quiet confidence** — authority through restraint, not spectacle
- **Three audiences, one voice** — professional (commissioners), warm (families), credible (candidates)
- **Show, don't reassure** — specific and concrete, never generic claims
- **Trust before transaction** — earn the step before asking for action
- **Person-centred at the surface** — whole people, not categories

### Register

Brand. The impeccable brand reference applies fully:
- Asymmetric compositions over centered stacks
- Single-purpose viewports — one dominant idea per fold
- Typographic risk is permitted: large display type, unexpected scale contrasts
- Art direction per section — sections can feel visually distinct if the narrative demands it

---

## Page-by-page brief

### `index.html` — Home

**Current:** Two-column hero (text left, image right). Standard services, about, coverage, CTA sections stacked vertically.

**Required:**

**Hero** — Rethink structurally. The heading should dominate. Consider:
- A full-viewport section where the heading (`clamp(3.5rem, 7vw, 6rem)` or larger) is the primary visual element
- The image could be positioned as an inset panel, a background with opacity overlay, or an asymmetric column that doesn't split 50/50
- The three meta stats (24/7, 4 Counties, Person-centred) could be typographically integrated into the composition rather than a footer row
- The chip "Registered Health & Social Care Provider" could be repositioned to create tension in the layout

**Services section** — The two service cards should not look like cards. Consider:
- Two large horizontal rows with a prominent number, heading, and description in a wide asymmetric grid
- Or: full-width alternating sections — one light, one midnight — each dedicated to one service
- The `01` / `02` CSS counters are already in the stylesheet. Use the scale of the numbers.

**About strip** — The `2fr 3fr` grid with lede + pillars is functional but inert. The pillars could be typographically larger — treat the pillar headings as display text, not card headings.

**Coverage band** — Already bold (amber background, midnight text). Keep as-is.

**CTA band** — Currently centered-ish with phone number right-aligned. Consider making the phone number very large (Spectral, `3rem+`) as the visual anchor, with the heading and button subordinate to it.

---

### `pages/about.html`

**Current:** Page hero, then a content-card mission block, then a 4-column values grid, then a split section, then another content card, then a CTA block.

**Required:**

- The mission text doesn't need a card box. Run it as large, well-spaced body text directly on the canvas — no border, no background, just generous padding and a wide column
- The values grid (`Dignity & Respect`, `Professionalism`, `Collaboration`, `Continuity`) could be treated as a typographic list — large heading in Spectral, small descriptor below, separated by thin `--border` lines rather than card boxes. Four rows, full-width, very clean.
- The split section with the approach image should use more height — the image should be taller, not a standard `400px` crop
- Break the page's visual monotony: vary section backgrounds (canvas → canvas-mid → canvas → midnight-pale) rather than alternating the same two

---

### `pages/supported-accommodation.html`

**Current:** Midnight page-hero, stats bar, scheme cards (2-col grid), split section with process steps, split section with team checklist, content cards for accommodation.

**Required:**

- The **stats bar** (`5+`, `4`, `7`, `24/7`) could live *inside* the midnight hero as a bottom row, merging the two sections and eliminating the visual break between them
- The **scheme cards** are the most important content on this page. Four schemes with distinct time ranges. Instead of a 2×2 grid of similar cards, consider a full-width list where each scheme is a horizontal row: duration badge on the left (large, amber), heading + description on the right. More editorial, less grid.
- The **process steps** (1–4) are good as numbered rows — keep that pattern but increase the number size and give each step more vertical breathing room
- The **accommodation section** (Hatfield + Coming Soon) could break the grid entirely: one prominent feature card for the current property, and a lighter `coming-soon` row beneath it

---

### `pages/staffing-solutions.html`

**Current:** Page-hero, stats bar, service tiles grid, roles grid, split section, content cards, CTA block.

**Required:**

- The **products & services tiles** (six items) are the worst offender — six identical bordered boxes. Replace with a different structure entirely: numbered rows with a large amber number, heading on the same line or slightly overlapping, description below. No card boxes.
- The **roles we place** section (six roles) — consider a two-column dense list rather than a card grid: role name in Spectral medium, one-line descriptor in Sora small, divided by thin border lines. Compact and professional, like a capabilities table.
- The **why choose us** split section with three benefit tiles inside it is nested cards. Remove the benefit tiles and run the three points as a typographic list instead.

---

### `pages/careers.html`

**Current:** Page-hero, 4 benefit tiles, 7 role cards, process steps, CTA block.

**Required:**

- This page speaks to candidates. It should feel distinct from the commissioner-facing staffing page.
- The **why work with us** section should lead with something more compelling than four small tiles. Consider a single large statement — a quote or a sentence in large Spectral — before the specifics.
- The **roles list** (7 roles) could be a compact typographic roster: role title in Spectral semibold, one-line description, separated by `--border` lines. No cards. Fast to scan.
- The **how to apply** process steps are good — keep but give the numbers more visual weight.

---

### `pages/contact.html`

**Current:** Page-hero, then a `work-grid` (contact info left, form right).

**Required:**

- The page-hero heading is already good: "Let's talk about how we can help." — keep.
- The contact info column currently uses `info-block` rows which are clean. Consider adding the phone number in large Spectral type (similar to the CTA band treatment) as the first visual element in the left column — before the address/email details. Make it clear this is a real organisation with a real person answering.
- The form is fine. Keep structure, just ensure it benefits from the new page context.

---

## Absolute constraints

These must not appear anywhere in the overhaul:

- No `border-left` or `border-right` greater than 1px as a colored accent
- No gradient text (`background-clip: text`)
- No glassmorphism (backdrop-filter decoratively)
- No hero-metric template (big number + small label + gradient accent repeated as the hero)
- No identical card grids (same-sized box, icon + heading + text, repeated)
- No `display: none` on meaningful content as a design solution

---

## Technical constraints

- Static HTML/CSS/JS — no build step, no framework
- CSS custom properties from `:root` in `style.css` — use them, never hard-code values
- `<site-nav data-base="." data-active="home">` and `<site-footer data-base=".">` — custom elements, do not change their attributes
- `data-animate="fade-up|fade-left|fade-right"` and `data-stagger="1–7"` on elements that should reveal on scroll
- British English in all copy
- No inline styles except per-page hero `background-image` if needed
- Images: Pexels URLs are fine (`https://images.pexels.com/photos/{id}/...`) — use real IDs you're confident exist
- Font import: `Spectral:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800` + `Sora:wght@300;400;500;600`

---

## Definition of done

- All six pages (`index.html` + five in `pages/`) are structurally overhauled
- No page looks like a template
- The home hero makes a strong typographic statement
- The services/roles/benefits content is never presented as identical card grids
- The midnight/amber system is used as a compositional tool, not just a color scheme
- The site passes the AI slop test: a visitor could not immediately guess it was AI-generated
- Committed and pushed to `main`
