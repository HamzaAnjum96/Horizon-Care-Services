# Horizon Care Services Ltd

Marketing website for Horizon Care Services Ltd — a registered health and social care provider based in Luton, UK. Static HTML/CSS/JS, no build step, deployed to GitHub Pages.

This README is written for whoever lands here next — whether that's a human dev or an AI agent — so they can install, run, ship, and extend the site without first reading the source.

---

## Quick Start

```bash
# from the repo root
python3 -m http.server 8000
# → open http://localhost:8000/
```

Any static server works (VS Code Live Server, `npx serve`, etc.). There is **no build step**: edits to `.html`/`.css`/`.js` are reflected on refresh.

---

## Tech Stack

- **HTML5** — six pages of semantic markup. Shared `<site-nav>` / `<site-footer>` Web Components mean every page is short.
- **CSS3** — a single stylesheet (`assets/css/style.css`) using custom properties, grid, flexbox, layered backgrounds, conic gradients, and `clamp()`-based fluid type. ~2,150 lines, structured by section banners.
- **Vanilla JavaScript** — two small files. `layout.js` defines the shared nav + footer. `main.js` wires nav-shadow on scroll, the mobile hamburger, and a scroll-reveal `IntersectionObserver`.
- **Google Fonts** — Inter (body) and Playfair Display (display headings).
- **GitHub Pages** — `actions/deploy-pages` workflow uploads the repo as-is.

No package.json. No bundler. No frameworks.

---

## Folder Structure

```
Horizon-Care-Services/
├── index.html                          # Home
├── assets/
│   ├── css/
│   │   └── style.css                   # Global stylesheet (single file)
│   ├── js/
│   │   ├── layout.js                   # <site-nav> + <site-footer> custom elements
│   │   └── main.js                     # Nav scroll, hamburger, scroll-reveal
│   └── images/
│       ├── logo.svg
│       └── logo-1.jpg                  # Used by nav, footer, and the about block
├── pages/
│   ├── supported-accommodation.html
│   ├── staffing-solutions.html
│   ├── contact-apply.html
│   ├── legal-notice.html
│   └── privacy-policy.html
├── .github/
│   └── workflows/
│       └── deploy-pages.yml            # Deploy on push to main/master/work
└── README.md
```

---

## Pages

| File | Role | Key sections (top → bottom) |
|---|---|---|
| `index.html` | Home | Hero (centred text + animated orb background), intro strip, about, services, CTA band, contact form |
| `pages/supported-accommodation.html` | Service detail | Page hero (image), stats bar, scheme types, "how we support" split, our team split, accommodation projects |
| `pages/staffing-solutions.html` | Service detail | Page hero (image), stats bar, products & services tiles (mobile preview + show more), roles we place (mobile preview + show more), why-choose-us split, service promise, CTA band |
| `pages/contact-apply.html` | Contact + jobs | Page hero (modern), contact info + enquiry form, "Work for Us" panel |
| `pages/legal-notice.html` | Legal | Hero + single content card with company info, IP, liability, governing law |
| `pages/privacy-policy.html` | Legal | Hero + single content card; sections 1–13 of UK GDPR-style policy |

---

## Path Conventions

| From | CSS | JS | Images | Home | Sibling pages |
|---|---|---|---|---|---|
| `index.html` (root) | `assets/css/style.css` | `assets/js/...` | `assets/images/` | — | `pages/<page>.html` |
| `pages/*.html` | `../assets/css/style.css` | `../assets/js/...` | `../assets/images/` | `../index.html` | `<page>.html` |

The `<site-nav>` and `<site-footer>` components handle paths automatically via the `data-base` attribute (`"."` from root, `".."` from any `pages/*` file). You only need to remember the convention when writing new content links.

---

## Design System

All design tokens live in `:root` at the top of `style.css`. Reach for these instead of hard-coding values.

### Colour

| Token | Hex | Used for |
|---|---|---|
| `--purple` | `#6B2D8B` | Primary brand colour |
| `--purple-dark` | `#4A1F5F` | Headings, dark surfaces |
| `--purple-mid` | `#7A3899` | Aurora glows, gradient mids |
| `--purple-light` | `#A875C4` | Accents, soft borders |
| `--lilac` | `#EDE5F5` | Hero gradient, soft tints |
| `--mist` | `#FAF8FE` | Section backgrounds |
| `--teal` | `#3F8FB5` | Secondary accent |
| `--teal-dark` | `#2D6B8B` | Dark wave gradient stop |
| `--off-white` / `--white` | `#FAFAFA` / `#FFFFFF` | Section + card surfaces |
| `--text` / `--text-muted` | `#1A1A1A` / `#666` | Body / secondary text |

### Typography

- Body: **Inter** (300/400/500/600/700)
- Display headings (`h1`–`h3`, big quotes): **Playfair Display** (400/600/700)
- Fluid sizes via `clamp()` — see `.hero__title`, `.section-header h2`.

### Surfaces

- `--shadow-card` / `--shadow-card-hover` / `--shadow-card-deep` — light surfaces
- `--shadow-phil` / `--shadow-phil-hover` — dark surfaces
- `--shadow-nav` / `--shadow-nav-scroll` — header at rest / when scrolled

### Gradients

`--grad-hero`, `--grad-dark-wave`, `--grad-section-top`, `--grad-section-bottom`, `--grad-card-wash`, `--grad-accent-card`, `--grad-page-image-veil`, `--grad-about-block`.

### Textures

`--tex-dots`, `--tex-dots-soft`, `--tex-dots-light`, `--tex-grid`, `--tex-grid-light`, `--tex-diagonal`, `--tex-scanline`, `--tex-noise` (SVG data URI). Layer up to three at once for richness without weight.

### Motion

- `--ease` = `cubic-bezier(.4,0,.2,1)`
- `--ease-out-back` = `cubic-bezier(.34,1.56,.64,1)`
- `--transition` = the standard 300ms ease used by buttons/links

---

## CSS Architecture

`style.css` is one file, organised by banner comments. In top-down order:

| Section | Lines (approx.) | What's there |
|---|---|---|
| `:root` tokens | 1–110 | Colour, type, shadow, gradient, texture, motion variables |
| Reset & base | ~110–180 | Box sizing, anchor reset, container, `.btn` system |
| Nav | ~190–280 | `.nav`, `.nav__logo`, `.nav__links`, hamburger |
| Hero | ~280–480 | `.hero`, `.hero__bg`, animated orbs (`.hero__orb--1`–`4`), centred content, scroll hint |
| Intro / About / Services / Philosophy / CTA / Contact | ~415–950 | Home-page sections |
| Footer | ~950–1010 | Three-column footer + bottom strip |
| Subpages: page-hero, stats bar, schemes, splits, content-card, info-block, process steps, role/service tiles, benefit tiles | ~1010–2000 | Subpage components |
| `TEXTURE, DEPTH & POLISH` | ~1620–1830 | Aurora layers, crosshatches, scan lines, dual-blob philosophy/CTA |
| Nav polish, dividers, accent borders | ~1830–1880 | Final visual touches |
| Form inputs refined | ~1880–1980 | Inputs/selects/textareas |
| `ANIMATION SYSTEM` | ~2000–2150 | `[data-animate]` + keyframes + `prefers-reduced-motion` |
| Custom-element layout reservations | ~2155 | Prevents FOUC on `<site-nav>`/`<site-footer>` |
| Component spacing & utilities | ~2160–end | `.muted-note`, `.text-purple`, `.heading-sm`, `.work-grid`, etc. |

---

## Animation System

Add scroll-reveal animation to any element with two attributes:

```html
<div data-animate="fade-up" data-stagger="2">…</div>
```

| `data-animate` | Effect |
|---|---|
| `fade-up` | Translate from 32px below |
| `fade-down` | Translate from 24px above |
| `fade-left` | Translate from 32px right |
| `fade-right` | Translate from 32px left |
| `scale-in` | Scale from 0.94 |

`data-stagger="1..6"` adds 80ms × N delay (lets sibling cards cascade). The `IntersectionObserver` in `main.js` adds `.is-visible` once an element scrolls into view; CSS does the rest.

`@media (prefers-reduced-motion: reduce)` disables all transitions and shows revealed content immediately. Test with DevTools → Rendering → "Emulate CSS prefers-reduced-motion".

---

## Component Catalog

Reusable class names in `style.css`. BEM-style: `block__element--modifier`.

**Buttons.** `.btn`, `.btn--primary`, `.btn--outline`, `.btn--ghost`, `.btn--lg`, `.btn--full`.

**Layout.** `.container` (max-width content wrapper), `.section-header` / `.subsection-header`, `.split-section` (img+content split), `.content-grid` (2-up grid), `.work-grid` (2-up "work for us" grid).

**Labels & headings.** `.label` (small caps eyebrow), `.heading-sm` (Playfair sub-heading).

**Cards.** `.intro__card`, `.service-card` (`--accent` variant), `.scheme-card`, `.role-card`, `.content-card`, `.info-block`, `.benefit-tile`, `.service-tile`, `.phil-card`.

**Bands.** `.cta-band`, `.cta-block`, `.stats-bar` (with `.stat-item`).

**Forms.** `.contact__form`, `.form-group`, `.form-row`, `.form-note`.

**Lists.** `.check-list` (rendered with check-mark bullets).

**Process.** `.process-steps` / `.process-step` (numbered vertical timeline).

**Utilities.** `.text-purple`, `.muted-note`.

---

## Adding a New Page

1. Copy a sibling in `pages/` whose layout is closest to what you need.
2. Update `<title>` and the meta description.
3. Confirm asset paths use `../assets/...`.
4. Set the layout component attributes:
   ```html
   <site-nav    data-base=".." data-active="…"></site-nav>
   <site-footer data-base=".."></site-footer>
   ```
   `data-active` accepts `home`, `supported`, `staffing`, or `contact`.
5. **If the new page should appear in the nav,** add one entry to the `NAV_LINKS` array (or set it as the new CTA) in `assets/js/layout.js`. This is the **single source of truth** — every page picks it up automatically.
6. Add `data-animate` / `data-stagger` to content blocks worth revealing.
7. Commit and push to `main` / `master` / `work`. GitHub Pages deploys automatically.

---

## Conventions

- **Naming.** BEM-ish: `block__element--modifier`. Component classes describe the role, not the styling.
- **Breakpoints.** `1024px` / `768px` / `480px` (mobile-last overrides).
- **Mobile-first?** No — the CSS is desktop-first with `max-width` overrides at the breakpoints above. Match this style for new media queries.
- **No inline styles** except per-page hero `background-image` URLs, which are page data rather than presentation. Add a utility class if you find yourself reaching for `style="…"`.
- **No icon library.** Icons are inline `<svg>` for crispness and zero dependencies. Copy the existing pattern.
- **Content text** is British English (e.g. "specialised", "organisation", "behaviour").

---

## Gotchas for AI Agents

- **No build step.** Direct edits ship to GitHub Pages on the next push to `main`/`master`/`work`.
- **Nav and footer are NOT duplicated in each HTML file.** They render from `SiteNav` / `SiteFooter` defined in `assets/js/layout.js`. To change a nav link or the footer, edit `layout.js` once.
- **Two `<script>` tags per page, in this order:** `layout.js` first (defines and upgrades the custom elements), then `main.js` (wires nav/scroll/observer behaviour against the upgraded markup). Don't reverse them.
- **`data-base` is mandatory** on `<site-nav>` and `<site-footer>`: `"."` from `index.html`, `".."` from anything in `pages/`. Wrong value = broken asset/link paths.
- **Each component has a `<noscript>` child** — leave it in. Modern crawlers run JS, but it's the SEO/no-JS fallback.
- **Pexels image URLs** are hard-coded with `?auto=compress&cs=tinysrgb&w=900` (or `w=1600` for hero backgrounds). Keep the query string when swapping.
- **The contact form has no backend.** It's wired with `onsubmit="return false;"` and is a front-end placeholder. Submitting does nothing.
- **`prefers-reduced-motion` is fully respected.** When auditing animations, test with reduced-motion both off **and** on.
- **Hero animations need keyframes.** `orbDrift1`–`orbDrift4` drive the home-page hero background orbs. `auroraDrift` and `float` are used by page-hero textures on subpages. All live in the ANIMATION SYSTEM section of `style.css` — don't remove them.
- **GitHub Pages workflow** (`.github/workflows/deploy-pages.yml`) triggers on push to `main`, `master`, or `work`. Other branches just stage changes.
- **Don't introduce a build step or framework** without buy-in. The whole point of this codebase is "open in a text editor, save, refresh".

---

## Browser Support

Targets the latest two versions of Chromium-based browsers, Firefox, and Safari. Uses modern CSS features that are now baseline: `clamp()`, `mask-image`, `backdrop-filter`, `conic-gradient()`, custom properties, container-relative units, light-DOM custom elements.

---

## Deployment

`.github/workflows/deploy-pages.yml` uploads the repo root as a Pages artifact and publishes via `actions/deploy-pages@v4`. Triggers:

- Push to `main`, `master`, or `work`.
- Manual dispatch from the Actions tab (`workflow_dispatch`).

Concurrency is set so only one deployment runs at a time per the `pages` group; in-flight jobs are cancelled when a newer commit lands.
