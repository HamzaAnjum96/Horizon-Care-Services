# Claude Instructions — Horizon Care Services

## Must-Read First

**README.md is the source of truth.** Read it before touching anything. It covers the stack, folder layout, design tokens, component catalog, gotchas, and deployment. Don't re-derive things it already documents.

## Keep README.md Up To Date

After every change, update README.md to reflect what changed. This includes:

- New or removed HTML sections / components → update **Pages** and **Component Catalog** tables
- CSS architecture changes (new sections, line-count shifts) → update the **CSS Architecture** table
- New keyframes or animation classes → update **Animation System**
- New design tokens → update the **Design System** colour/gradient tables
- Structural or convention changes → update **Conventions** or **Gotchas for AI Agents**
- New pages → update **Folder Structure**, **Pages** table, and **Adding a New Page** steps

If a change is small (wording tweak, colour nudge), a one-line README note is enough. If it reshapes a section, rewrite that section.

## Project Basics

- Static HTML/CSS/JS. **No build step.** Edits ship directly.
- One stylesheet: `assets/css/style.css`. One source of nav/footer truth: `assets/js/layout.js`.
- Dev server: `python3 -m http.server 8000` then open `http://localhost:8000/`.
- Deploy: push to `main`, `master`, or `work` — GitHub Pages picks it up automatically.
- All design tokens (colours, shadows, gradients, textures, motion) live in `:root` at the top of `style.css`. Use them; don't hard-code values.

## Style Rules

- British English in all copy ("specialised", "organisation", "tailored").
- No inline styles except per-page hero `background-image` URLs.
- No icon libraries — inline SVG only.
- BEM-ish class names: `block__element--modifier`.
- Desktop-first CSS with `max-width` breakpoints at `1024px`, `768px`, `480px`.
- No comments unless the WHY is non-obvious. No docstrings.
