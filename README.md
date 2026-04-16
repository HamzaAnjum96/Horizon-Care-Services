# Horizon Care Services Ltd

Website for Horizon Care Services Ltd — a registered health and social care provider based in Luton, UK.

## Tech Stack

- **HTML5** — semantic markup across all pages
- **CSS3** — custom stylesheet with CSS custom properties (variables), flexbox, grid, and responsive media queries
- **Vanilla JavaScript** — nav scroll effect, mobile hamburger menu, and scroll-triggered fade-in animations via Intersection Observer
- **Google Fonts** — Inter (body) and Playfair Display (headings)
- **GitHub Pages** — static site hosting via the `deploy-pages.yml` workflow

No build tools, frameworks, or dependencies are required. The site runs entirely from static files.

## Folder Structure

```
Horizon-Care-Services/
├── index.html                        # Home page
├── assets/
│   ├── css/
│   │   └── style.css                 # Global stylesheet
│   ├── js/
│   │   └── main.js                   # Site-wide JavaScript
│   └── images/
│       ├── logo.svg                  # Brand logo (SVG)
│       └── logo-1.jpg                # Brand logo (JPG)
├── pages/
│   ├── supported-accommodation.html  # Supported Accommodation service page
│   ├── staffing-solutions.html       # Staffing Solutions service page
│   ├── contact-apply.html            # Contact & Apply page
│   ├── legal-notice.html             # Legal Notice page
│   └── privacy-policy.html           # Privacy Policy page
└── .github/
    └── workflows/
        └── deploy-pages.yml          # GitHub Pages deployment workflow
```

## Path Conventions

| Location | CSS | JS | Images | Home | Sibling pages |
|---|---|---|---|---|---|
| `index.html` (root) | `assets/css/style.css` | `assets/js/main.js` | `assets/images/` | — | `pages/<page>.html` |
| `pages/*.html` | `../assets/css/style.css` | `../assets/js/main.js` | `../assets/images/` | `../index.html` | `<page>.html` |

## Deployment

The site is deployed automatically to GitHub Pages on every push to `main` or `master` via the workflow at `.github/workflows/deploy-pages.yml`. It can also be triggered manually via `workflow_dispatch`.
