# Horizon Care Services — Full Site Redesign

This document is the single source of truth for the redesign. Any agent picking this up should read this before touching any file. After completing the redesign, fold the relevant parts into `README.md` and delete this file.

---

## Why

The existing site has a generic "AI-generated healthcare" aesthetic: purple/teal gradients, glowing orb animations, Inter + Playfair Display, aurora effects. It looks like every other care-sector site produced in 2024. The redesign replaces the entire visual language with something warm, grounded, and editorially confident.

Additionally: no cookie consent banner (legally required), no dedicated About or Careers pages, and the contact page conflates two distinct audiences (enquirers vs. job seekers).

---

## Constraints (never break these)

- Static HTML/CSS/JS. **No build step.**
- One stylesheet: `assets/css/style.css`. One nav/footer source: `assets/js/layout.js`.
- British English throughout ("specialised", "organisation", "tailored").
- No inline styles except per-page hero `background-image` URLs.
- No icon libraries — inline SVG only.
- BEM-ish class names: `block__element--modifier`.
- Desktop-first CSS. Breakpoints: `1024px`, `768px`, `480px`.
- Script load order is mandatory: `layout.js` first, `main.js` last before `</body>`.
- `data-base` attribute on `<site-nav>` and `<site-footer>`: `"."` from `index.html`, `".."` from `pages/*.html`.
- `data-active` key on `<site-nav>` must match a key in `NAV_LINKS` or `CTA_LINK` in `layout.js`.
- Do not introduce a build step, package manager, or JS framework.
- Do not make claims like "certified by X" — factual quality statements only.

---

## New Design System

### Palette (replaces purple/teal entirely)

```css
--ink:           #1E1A17   /* warm near-black — primary text */
--ink-mid:       #4A4239   /* secondary text */
--ink-soft:      #7A6E65   /* muted/tertiary */
--ink-faint:     #ADA299   /* placeholder/disabled */

--canvas:        #FDFAF6   /* warm off-white — page background */
--canvas-warm:   #F5F0E8   /* slightly deeper warm surface */
--canvas-sand:   #EDE7DB   /* section divider / elevated surface */
--white:         #FFFFFF

--sage:          #4D7066   /* primary brand — deep sage green */
--sage-dark:     #324A44   /* hover/emphasis */
--sage-mid:      #6B9088   /* lighter sage */
--sage-tint:     #EBF0EE   /* sage wash backgrounds */
--sage-pale:     #F4F7F6

--terra:         #B85C3A   /* terracotta accent — CTAs, energy */
--terra-dark:    #8A3E22   /* hover */
--terra-tint:    #F7EDE8   /* terracotta wash */

--sand:          #C4A882   /* warm neutral accent */
--sand-light:    #F0E8DC

--border:        rgba(30, 26, 23, 0.10)
--border-mid:    rgba(30, 26, 23, 0.18)
--border-strong: rgba(30, 26, 23, 0.28)
```

### Typography (replaces Inter + Playfair Display)

- **Display / headings:** `Lora` — warm humanist serif, editorial without being ornate
- **Body / UI:** `Source Sans 3` — clean, warm, highly readable

Google Fonts link (replace the existing one on every page):
```html
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Shadows

Warm-toned only — `rgba(30, 26, 23, …)`. Three levels:
- `--shadow-sm`:  `0 1px 3px rgba(30,26,23,0.08)`
- `--shadow`:     `0 2px 8px rgba(30,26,23,0.10)`
- `--shadow-md`:  `0 4px 16px rgba(30,26,23,0.12)`
- `--shadow-lg`:  `0 8px 32px rgba(30,26,23,0.16)`
- `--shadow-card`: `0 1px 3px rgba(30,26,23,0.06), 0 2px 8px rgba(30,26,23,0.07)`
- `--shadow-card-hover`: `0 4px 12px rgba(30,26,23,0.10), 0 2px 6px rgba(30,26,23,0.07)`

### Radius

- `--radius-sm`: `4px` (inputs, tags, small elements)
- `--radius`:    `8px` (default — cards, buttons)
- `--radius-md`: `12px` (larger cards)
- `--radius-lg`: `20px` (modals, hero panels)

### Motion

Keep the existing `[data-animate]` / `[data-stagger]` / `.is-visible` scroll-reveal system from `main.js` — it requires no changes. Remove: orb animations (`orbDrift1–4`), `auroraDrift`, `float`, `shimmer`, `softShake`. Remove all SVG texture data URIs (`--tex-dots`, `--tex-scanline`, etc.).

### Spacing

4px base unit. Variables: `--sp-1` (4px) through `--sp-24` (96px) in common multiples.

---

## Pages

8 pages total. Current `pages/contact-apply.html` is **deleted** once `pages/contact.html` exists.

| File | Status | data-active key |
|---|---|---|
| `index.html` | Full rewrite | `home` |
| `pages/about.html` | **Create new** | `about` |
| `pages/supported-accommodation.html` | Full rewrite (content preserved) | `supported` |
| `pages/staffing-solutions.html` | Full rewrite (content preserved) | `staffing` |
| `pages/careers.html` | **Create new** | `careers` |
| `pages/contact.html` | **Create new** (replaces contact-apply.html) | `contact` |
| `pages/privacy-policy.html` | Full rewrite (content preserved) | _(none)_ |
| `pages/legal-notice.html` | Full rewrite (content preserved) | _(none)_ |

### Nav links (layout.js)

```js
const NAV_LINKS = [
  { key: 'home',      href: 'index.html',                         label: 'Home' },
  { key: 'about',     href: 'pages/about.html',                   label: 'About Us' },
  { key: 'supported', href: 'pages/supported-accommodation.html', label: 'Supported Accommodation' },
  { key: 'staffing',  href: 'pages/staffing-solutions.html',      label: 'Staffing Solutions' },
  { key: 'careers',   href: 'pages/careers.html',                 label: 'Work With Us' },
];
const CTA_LINK = { key: 'contact', href: 'pages/contact.html', label: 'Contact Us' };
```

---

## Page Content Specifications

### index.html — Home

1. **Hero** — Split grid (55% text / 45% photo). Left: label chip "Registered Health & Social Care Provider", `<h1>` "Where care meets *commitment.*" (italic sage), subheading about Horizon Care Services. CTAs: "Our services" (sage outline) + "Contact us" (terracotta). Right: `<img>` panel, full-height, `object-fit: cover`.
2. **Services strip** — `--canvas-warm` background. Two cards: Supported Accommodation (sage icon) + Staffing Solutions (terracotta icon). Each: short description, stat badge, "Learn more" link.
3. **About strip** — `--canvas-sand` background. Split: left text ("A care provider with purpose", 2–3 sentences), right three value pillars (Person-Centred / Professional / Partnered) each with SVG icon.
4. **Coverage band** — `--sage-dark` background. Text: "Serving Bedfordshire · Buckinghamshire · Cambridgeshire · Hertfordshire".
5. **CTA band** — "Ready to talk?" + phone number 07572 701 349 + "Send us a message" button (terracotta → `pages/contact.html`).

### pages/about.html — About Us

1. **Page hero** — `--canvas-warm` bg, no photo. Heading: "About Horizon Care Services".
2. **Mission** — 2–3 paragraphs on who they are, what drives them. True statements about quality, person-centred approach. No fabricated credentials.
3. **Values grid** — 4 columns: Dignity & Respect / Professionalism / Collaboration / Continuity. Each: sage SVG icon, heading, 2-sentence description.
4. **Our approach** — split section (text + photo): holistic assessment, personalised plans, regular review.
5. **Regulatory note** — sage-tint panel: "Horizon Care Services operates as a registered health and social care provider, working in compliance with CQC standards and UK GDPR." Factual only.
6. **CTA** — "Refer a client" (sage) + "Work with us" (outline → `pages/careers.html`).

### pages/supported-accommodation.html — Supported Accommodation

All existing content preserved. Visual redesign only:
- Page hero: `--canvas-warm` bg, no image overlay
- Stats bar: `--canvas-sand` bg, sage numerals
- 4 scheme cards: warm border, `--sage-tint` left accent
- Split sections: new tokens
- Accommodation cards: warm surface, terracotta "Coming Soon" badge
- CTA block: terracotta bg

Existing stats: 5+ Bed spaces, 4 Scheme types, 7 Days a week support, 24/7 On-call.

Schemes: Adult Placement (6mo–2yr), Short-Term Support (1–6mo), Step-Down Transitional (1–6wk), Outreach Floating Support (time-limited).

### pages/staffing-solutions.html — Staffing Solutions

All existing content preserved. Same visual treatment as above. The `[data-mobile-preview]` + `[data-preview-label]` attributes on the roles and tiles grids must be preserved — `main.js` depends on them.

Existing stats: 4 Counties, 24/7 Availability, 8+ Role types, 100% DBS checked.

### pages/careers.html — Work With Us

1. **Hero** — "Join a team that cares". Subheading about always recruiting.
2. **Why work with us** — 4 benefit tiles: Competitive rates / Flexible shifts / Training & induction / Supportive culture.
3. **Roles** — grid of 7 roles (RN RGN/RMN, HCA, Social Worker, OT, Support Worker, Physiotherapist, Admin). Each: one-line description.
4. **How to apply** — 3-step process: (1) Email CV to admin@horizon-careservices.co.uk (2) Reply within 2 working days (3) Interview & induction.
5. **CTA** — `mailto:admin@horizon-careservices.co.uk?subject=Job%20Application`.

### pages/contact.html — Contact

1. **Hero** — "Let's talk about how we can help." Subheading: urgent staffing call 07572 701 349.
2. **Contact grid** — 2-col: info blocks left (address, phone, email, response times), form right.
3. Form fields: Full Name, Email, Phone, Type of Enquiry (dropdown: Accommodation Referral / Staffing / Job Application / General / Feedback), Organisation (optional), Message. `onsubmit="return false;"` (placeholder, no backend). `data-ai-no-submit="true"` `autocomplete="off"`.

### pages/privacy-policy.html and pages/legal-notice.html

All existing text preserved verbatim. Visual redesign only: new typography, `--canvas-warm` page hero, single `.content-card` container.

---

## Cookie Banner

**New file: `assets/js/cookies.js`**

- On DOMContentLoaded: check `localStorage.getItem('hcs-cookie-consent')`
- If not set: insert `.cookie-bar` into `document.body`, then add `.is-visible` on next frame (triggers CSS slide-up)
- "Accept" button: sets `localStorage.setItem('hcs-cookie-consent','accepted')`, removes `.is-visible`, removes element after transition
- "Learn more" link: `href` to `pages/privacy-policy.html` (use relative path: `pages/…` from root, `privacy-policy.html` from pages)
- Footer "Cookie settings" button: `localStorage.removeItem('hcs-cookie-consent')`, re-inject banner

Add to every page `<head>` (before `</head>`):
```html
<script src="[base]/assets/js/cookies.js" defer></script>
```

CSS in `style.css`:
```css
.cookie-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: var(--ink); color: rgba(253,250,246,0.85);
  padding: var(--sp-4) var(--sp-8);
  display: flex; align-items: center; justify-content: space-between;
  gap: var(--sp-6); flex-wrap: wrap; z-index: 300;
  transform: translateY(100%);
  transition: transform 0.4s var(--ease-out);
}
.cookie-bar.is-visible { transform: translateY(0); }
```

---

## New Footer Structure

Replace the current minimal footer with:

```
[ Logo + company name + address + phone + email ]   [ Pages nav ]   [ Legal nav ]
────────────────────────────────────────────────────────────────────────────────
© 2025 Horizon Care Services Ltd.          Privacy Policy · Legal Notice · Cookie settings
```

The "Cookie settings" element is a `<button>` that calls `localStorage.removeItem('hcs-cookie-consent')` and re-shows the banner. It must be a `<button>` (not `<a>`) since it has no destination URL.

---

## What to Remove

- Purple/teal colour palette (all `--purple-*`, `--teal-*`, `--lilac`, `--mist` tokens)
- `--grad-*` gradient tokens (7 removed; no new gradients — warmth comes from palette)
- `--tex-*` texture data URIs (all 8 SVG patterns)
- Aurora pseudo-elements (`.philosophy::before`, `.philosophy::after`)
- Orb keyframes: `orbDrift1`–`orbDrift4`
- Extra keyframes: `auroraDrift`, `float`, `shimmer`, `softShake`
- `.hero__orb--1` through `--4` elements
- `.philosophy` section (replaced by About page)
- `pages/contact-apply.html` (replaced by `pages/contact.html`)

---

## Task Breakdown

### Claude tasks (complex or creative — use Sonnet/Opus)

These require design judgment, creative writing, or architectural decisions:

| # | Task | File(s) |
|---|---|---|
| 1 | Write complete new `style.css` | `assets/css/style.css` |
| 2 | Rewrite `index.html` home page with editorial split hero | `index.html` |
| 3 | Create `pages/about.html` (new content: mission, values, approach) | `pages/about.html` |
| 4 | Create `pages/careers.html` (new content: benefits, roles, apply flow) | `pages/careers.html` |
| 5 | Rewrite `pages/supported-accommodation.html` (preserve content, new markup) | `pages/supported-accommodation.html` |
| 6 | Rewrite `pages/staffing-solutions.html` (preserve content, new markup) | `pages/staffing-solutions.html` |

### Non-Claude tasks (straightforward — any capable model or human)

These are specification-driven with no creative decisions:

| # | Task | File(s) | Notes |
|---|---|---|---|
| A | Update `layout.js` nav links + new footer template | `assets/js/layout.js` | See NAV_LINKS spec above |
| B | Create `cookies.js` | `assets/js/cookies.js` | See full spec above |
| C | Create `pages/contact.html` | `pages/contact.html` | Copy structure from old contact-apply.html; remove "Work for Us" section |
| D | Rewrite `pages/privacy-policy.html` | `pages/privacy-policy.html` | Verbatim content, new HTML skeleton only |
| E | Rewrite `pages/legal-notice.html` | `pages/legal-notice.html` | Verbatim content, new HTML skeleton only |
| F | Delete `pages/contact-apply.html` | — | Only after `pages/contact.html` is done |
| G | Update `sitemap.xml` | `sitemap.xml` | Add: about, careers, contact. Remove: contact-apply |
| H | Update `README.md` | `README.md` | Reflect new design system, pages, components |

---

## HTML Page Skeleton

All pages use this skeleton. Copy it exactly; adjust `[base]`, `[active-key]`, `[title]`, and `[description]`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] — Horizon Care Services</title>
  <meta name="description" content="[Page description]">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="[base]/assets/css/style.css">
  <script src="[base]/assets/js/cookies.js" defer></script>
</head>
<body>
  <site-nav data-base="[base]" data-active="[active-key]">
    <noscript><a href="[base]/index.html">Horizon Care Services</a></noscript>
  </site-nav>

  <main>
    <!-- page content here -->
  </main>

  <site-footer data-base="[base]">
    <noscript><p>&copy; Horizon Care Services Ltd</p></noscript>
  </site-footer>

  <script src="[base]/assets/js/layout.js"></script>
  <script src="[base]/assets/js/main.js"></script>
</body>
</html>
```

For `index.html`: `[base]` = `.`  
For `pages/*.html`: `[base]` = `..`

---

## Key Selectors main.js Relies On

`main.js` requires no changes but depends on these class names existing in the rendered output:

| Selector | What it does |
|---|---|
| `.nav` | Nav scroll shadow (adds `.nav--scrolled`) |
| `.nav__hamburger` | Hamburger click toggle |
| `.nav__links` | Closes on link click (mobile); also hidden via CSS on mobile |
| `.nav--open` | Toggled onto `.nav` to show mobile menu |
| `[data-animate]` | Scroll-reveal — `main.js` observes these, adds `.is-visible` |
| `[data-mobile-preview]` | Show-more toggle on mobile (staffing page tiles/roles) |
| `[data-preview-label]` | Label text for the show-more button |

The mobile menu on the new nav must be a sibling of `.nav__inner` inside `.nav`, not inside `.nav__links`. The hamburger toggle works on `.nav--open` which shows/hides the mobile panel via CSS.

---

## Contacts & Copy (do not fabricate)

```
Company:  Horizon Care Services Ltd
Address:  9 Lilac Grove, Luton, LU3 3JG
Email:    admin@horizon-careservices.co.uk
Mobile:   07572 701 349
Office:   01582 354 119
Coverage: Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire
```

Response times: general enquiries 2 working days, feedback/complaints 3 working days, urgent staffing 24/7.

---

## Verification Checklist

Run these after all pages are done:

1. `python3 -m http.server 8000` — browse all 8 pages, no broken assets
2. Cookie bar: appears on first load, dismisses on Accept, does not reappear on reload, re-shows via footer "Cookie settings"
3. Nav active state correct on each page
4. All internal links resolve (contact-apply.html gone)
5. Scroll-reveal fires on all pages (`[data-animate]` elements)
6. Mobile hamburger works at <768px viewport
7. Mobile "show more" toggle works on staffing page
8. Layout intact at 1024px, 768px, 480px
9. British English throughout
10. No inline styles except `background-image` hero URLs
11. No purple/teal tokens remain in style.css
