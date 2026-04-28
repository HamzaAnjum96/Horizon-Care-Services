# Horizon Care Services Ltd

Static marketing website for Horizon Care Services Ltd (Luton, UK). The site is built with plain HTML, CSS, and JavaScript and is deployed directly to GitHub Pages.

## Quick Start

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

No build step is required.

## Stack

- **HTML5** (8 pages)
- **CSS3** (single stylesheet: `assets/css/style.css`)
- **Vanilla JS** (`assets/js/layout.js`, `assets/js/main.js`, `assets/js/cookies.js`)
- **Google Fonts**: Lora + Source Sans 3

## Current Site Map

- `index.html` (Home)
- `pages/about.html`
- `pages/supported-accommodation.html`
- `pages/staffing-solutions.html`
- `pages/careers.html`
- `pages/contact.html`
- `pages/legal-notice.html`
- `pages/privacy-policy.html`

## Design Planning Notes

- `DESIGN-DISCUSSION-PLAN.md` captures an agent/client self-critique workshop and a phased improvement plan that keeps the existing colour system while refining UX, copy hierarchy, and implementation consistency.
- Homepage pass now prioritises rapid user journeys with stronger hero actions and a `home-priorities` route section; footer output from `layout.js` is intentionally minimal (Legal, Privacy Policy, Contact Us, and © notice).

## Design System Highlights

The redesign uses a warm editorial palette and shared component library in `style.css`.

- **Typography**: `Lora` for display/headings, `Source Sans 3` for body/UI
- **Palette tokens**: ink/canvas/sage/terra/sand scales
- **Core sections**: `hero`, `services-strip`, `about-strip`, `coverage-band`, `cta-band`, `page-hero`
- **Shared components**: `content-card`, `split-section`, `stats-bar`, `service-card`, `scheme-card`, `role-card`, `benefit-tile`, `service-tile`, `contact__form`

## Navigation & Footer Source of Truth

`assets/js/layout.js` defines both `<site-nav>` and `<site-footer>`.

- Set `data-base="."` on root pages
- Set `data-base=".."` on pages inside `/pages`
- Set `data-active` to one of: `home`, `about`, `supported`, `staffing`, `careers`, `contact`

## Cookie Consent

Cookie banner logic lives in `assets/js/cookies.js` and uses:

- `localStorage` key: `hcs-cookie-consent`
- Footer “Cookie settings” button to re-open consent

Include `cookies.js` in each page `<head>`.

## Contact Form Behaviour

`pages/contact.html` contains a front-end placeholder form only:

- `onsubmit="return false;"`
- `data-ai-no-submit="true"`
- `autocomplete="off"`

No backend form submission is implemented.

## Deployment

GitHub Pages workflow: `.github/workflows/deploy-pages.yml`.

Push to `main`, `master`, or `work` to deploy.
