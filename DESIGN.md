# Horizon Care Services — Design System

## Register

**brand** — this is a marketing and referral site. Design serves credibility and trust, not product utility.

## Color Strategy: Restrained

One saturated accent (amber/brand red) against tinted neutrals. The palette deliberately avoids generic healthcare teal/white.

### Tokens (`globals.css`)

| Token | Value | Use |
|---|---|---|
| `--deep` | `oklch(12% 0.008 50)` | Dark backgrounds, nav overlay, form headers |
| `--forest` | `oklch(20% 0.012 50)` | Secondary dark surfaces |
| `--forest-mid` | `oklch(34% 0.015 50)` | Subtle dark accents |
| `--cream` | `oklch(97% 0.006 52)` | Primary background, form inputs |
| `--cream-dim` | `oklch(93% 0.009 50)` | Read-only inputs, subdued surfaces |
| `--brand` | `oklch(21% 0.10 9)` | Logo mark only, not for UI backgrounds |
| `--ink-dark` | `oklch(16% 0.04 22)` | Body text, headings |
| `--ink-light` | `oklch(97% 0.005 56)` | Text on dark surfaces |
| `--ink-muted-dark` | `oklch(40% 0.05 22)` | Secondary text, labels, kickers |
| `--ink-muted-light` | `oklch(70% 0.014 44)` | Secondary text on dark |
| `--amber` | `oklch(44% 0.15 12)` | Primary accent: CTAs, focus rings, required markers, error states |
| `--amber-dim` | `oklch(62% 0.11 12)` | Muted amber for subtle accents |
| `--rule-dark` | `oklch(97% 0.005 56 / 0.14)` | Borders on dark backgrounds |
| `--rule-light` | `oklch(88% 0.01 52)` | Borders on light backgrounds |
| `--moss` | `oklch(28% 0.14 24)` | Reserved; not currently used in UI |
| `--moss-soft` | `oklch(87% 0.03 18)` | Background gradient accent |
| `--sky-soft` | `oklch(92% 0.007 58)` | Reserved; not currently used in UI |

All values use OKLCH. Never use `#000` or `#fff`. Every neutral is tinted toward the brand hue.

## Typography

| Role | Font | Variable settings |
|---|---|---|
| `font-display` (`--font-source-serif`) | Source Serif 4 | Variable font, `opsz` + `wght` tuned per context |
| `font-body` (`--font-bricolage`) | Bricolage Grotesque | Variable font, body text |
| `font-mono` | System mono | Sequence numbers, codes |

- Editorial headings: `font-display`, `tracking-[-0.02em]`, `fontVariationSettings` tuned inline with `clamp()` sizes
- Body: `text-[14px]–text-[15px]`, `leading-relaxed`
- Kickers: `.section-kicker` = `text-[11px] font-medium tracking-[0.14em] uppercase`
- Line length: capped at `max-w-[58ch]`–`max-w-[65ch]` for body copy

## Spacing

No formal spacing scale token — uses Tailwind's default 4px base. Key rhythm:
- Section vertical padding: `py-20 lg:py-28`
- Content max-width: `max-w-7xl` with `px-6 lg:px-10`
- Form section gaps: `space-y-16` between sections, `space-y-6` within
- Form field grids: `gap-x-5 gap-y-5`

## Navigation

- Fixed header, `z-50`, transparent until scrolled (`window.scrollY > 24`)
- Scrolled: `bg-cream/94 backdrop-blur-md` with subtle shadow
- Mobile: full-screen slide-in overlay at `z-[60]` (above nav)
- Never use a z-index above `z-50` for page content that could conflict with the nav

## Layout Patterns

- **Page header**: `PageHeader` component with kicker + title + intro. Dark background (`bg-deep`), full-bleed.
- **Content sections**: `bg-cream`, `max-w-7xl mx-auto px-6 lg:px-10`
- **2-column grid**: `grid sm:grid-cols-2 gap-10 lg:gap-12` for paired content
- **No nested cards**: border-top-accented blocks (`border-t-2 border-amber pt-7`) for contact channels

## Form Components (`web/src/app/work-for-us/fields.tsx`)

All form components are colocated in `fields.tsx`. No third-party form library.

| Component | Purpose |
|---|---|
| `Field` | Label wrapper with hint and error state |
| `TextInput` | Single-line input |
| `TextArea` | Multi-line input, resize-y |
| `Select` | Dropdown with custom SVG arrow |
| `RadioGroup` | Pill-style radio buttons; pass `vertical` for long-label options |
| `CheckboxGroup` | Toggle-pill checkboxes for multi-select |
| `Checkbox` | Single checkbox with custom indicator |
| `FieldGrid` | Responsive grid: 2, 3, or 4 columns |
| `EmailField` | Email-typed TextInput with label |
| `PhoneField` | Tel-typed TextInput with label |
| `NiNumberField` | NI number input with format hint |
| `AddressFields` | Full address block with previous address |

### Input base styles

```
bg-cream border border-rule-light rounded-md px-3.5 py-2.5
text-[14px] text-ink-dark
focus:border-amber focus:ring-2 focus:ring-amber/20
```

### Error state: `border-amber focus:ring-amber/30`

### Required indicator: `<span class="text-amber ml-1">*</span>` inside the label

### RadioGroup `vertical` prop
Use `vertical` when options have long labels (more than ~5 words). Options render full-width with top-aligned indicator dots and wrapped text. Default pill layout is for short options (Yes/No, 2–4 word labels).

## Motion

- `EASE_OUT_EXPO` curve for all transitions
- Duration constants in `web/src/lib/motion.ts`
- Hero ambient animation: `hero-breathe` (10s ease-in-out, opacity only)
- `interactive-lift`: `translateY(-2px)` + shadow on hover (300ms)
- Respect `prefers-reduced-motion`: hero animation disabled, interactive-lift disabled

## Interaction States

All interactive elements implement:
- **Hover**: color shift or `interactive-lift`
- **Focus**: `focus:border-amber focus:ring-2 focus:ring-amber/20` on inputs
- **Active/selected**: `bg-deep text-ink-light border-deep` for pills/checkboxes
- **Disabled**: `opacity-60 cursor-wait` for async buttons
- **Error**: `border-amber` on inputs, `text-amber` error text below field

## Absolute Bans (enforced)

- No side-stripe borders as accents
- No gradient text (`background-clip: text`)
- No glassmorphism
- No hero-metric template (big number + stats grid)
- No identical card grids
- No generic teal/white healthcare palette
- No stock photography

## Blog

### Content model

Posts are markdown files in `web/content/blog/*.md` with YAML frontmatter:

```yaml
---
title: "Article title"
date: 2026-05-17        # ISO date
author: First Last
category: Family guidance
excerpt: One or two sentences shown in the index and used as the meta description.
---
```

Body is GitHub-flavoured markdown. New post = drop a new `.md` file; no code changes. The slug is the filename minus `.md`.

`web/src/lib/blog.ts` owns parsing (`gray-matter` + `marked`). Both `/blog` and `/blog/[slug]` are statically generated via `generateStaticParams` and contain zero client-side markdown parsing.

### Article typography (`.prose-blog` in `globals.css`)

- Body: Bricolage, `16px` / `1.75`, capped at `68ch` for `<p>`, `64ch` for lists
- `h2`: Source Serif 4, `clamp(1.55rem, 2.4vw, 1.95rem)`, `opsz 32 wght 580`, generous top margin
- `h3`: Source Serif 4, `clamp(1.1rem, 1.6vw, 1.3rem)`, `opsz 18 wght 620`
- Lists: amber em-dash markers (`—`) for `<ul>`, amber serif numerals for `<ol>`; no discs, no decimal markers
- Blockquote: 2px left amber rule + display serif italic, no quote glyphs
- `<hr>`: centred amber-dim three-dot break with vertical breathing room; no full-width line
- Inline links: amber underline (1px, offset 4), text turns amber on hover
- A `<h2>Useful references</h2>` block at the end of an article gets wrapped server-side with `.references-block`, turning the trailing `<ul>` into a separated link list with top/bottom rules

### Components

- `web/src/components/blog/prose.tsx` — `<Prose html={string} />`. The single source of truth for article styling.
- `web/src/components/blog/post-meta.tsx` — date · author · read time · category, sat on an amber rule.
- `web/src/components/blog/reading-progress.tsx` — 1px amber bar under the nav. Respects `prefers-reduced-motion`.

### Index page (`/blog`)

Editorial chronological list. Years group posts with a large display-serif year header (sticky on `lg:`). Each entry is a hairline-ruled row: kicker date + category, large title in `font-display`, two-line excerpt, byline. Newest entry gets a small amber `New` chip. No cards, no images.

## Map (Contact Page)

Uses Leaflet with CartoDB dark tiles. The map container **must** have `isolate` (CSS `isolation: isolate`) to create a stacking context and prevent Leaflet's internal z-index values from escaping above the nav.

## Z-index Scale

| Layer | Value |
|---|---|
| Page content | `z-0` (default) |
| Dev preview banner | `z-30` |
| Nav header | `z-50` |
| Mobile menu overlay | `z-[60]` |
| Cookie consent banner | `z-[100]` |
| Grain overlay | `z-[9999]` |
| Map internal (contained) | `z-[1000]` (scoped by `isolate`) |

## Cookie Consent

`web/src/lib/cookie-consent.ts` exposes a small helper around `localStorage` (key: `hcs-consent-v1`). The `CookieBanner` component (`web/src/components/cookie-banner.tsx`) is mounted in the root layout and shows automatically on first visit (skipped on `/privacy-policy` so users can read the policy first).

Two categories: **strictly necessary** (always on, just the consent record itself) and **functional** (loading the Leaflet map from CartoDB + unpkg). No analytics, advertising, or cross-site tracking exists in the codebase.

Components that depend on third-party content must call `useConsent()` and gate behind `consent?.functional === true`. When consent has not been hydrated yet the hook returns `undefined` — render a neutral placeholder so layout doesn't shift. The `LocationMap` component is the reference implementation.

Users can revisit their choice via the `CookiePreferencesLink` in the footer, which dispatches `hcs:open-cookie-preferences`.
