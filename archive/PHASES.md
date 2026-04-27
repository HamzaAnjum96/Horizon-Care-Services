# Horizon Care Services — Redesign Dev Phases

Each sprint is a self-contained unit of work with a clear commit boundary. Start a fresh session per sprint so token limits and API timeouts never cut a task in half.

---

## Sprint 1 — Infrastructure JS (no UI changes yet)

**Why first:** Every page loads these files. No visual dependency — logic can be validated in isolation before any CSS exists.

| # | Task | File | Notes |
|---|---|---|---|
| A | Update nav + footer template | `assets/js/layout.js` | New `NAV_LINKS` (add `about`, `careers`), `CTA_LINK` → `contact.html`. New 3-column footer: logo/address block · pages nav · legal nav. "Cookie settings" as `<button>` (not `<a>`). |
| B | Create cookie consent script | `assets/js/cookies.js` | Full spec in REDESIGN.md §Cookie Banner. `localStorage` key `hcs-cookie-consent`. Inject `.cookie-bar`, `Accept` dismisses, footer button re-shows. |

**Commit:** `feat: update layout.js nav links, new footer, add cookies.js`

---

## Sprint 2 — Stylesheet (biggest single file)

**Why second:** layout.js defines all the class names CSS must target. Write CSS after Sprint 1 so nav/footer class names are final. All subsequent page work needs this complete.

| # | Task | File | Notes |
|---|---|---|---|
| 1 | Full stylesheet rewrite | `assets/css/style.css` | See full spec below. |

**What the new style.css contains (top → bottom):**

1. `:root` tokens — new palette (ink/canvas/sage/terra/sand), Lora + Source Sans 3, warm shadows ×6, radius ×4, spacing `--sp-1`…`--sp-24`, motion (`--ease`, `--ease-out`, `--ease-out-back`), `--transition`
2. Reset + base — box sizing, anchor reset, `.container`, `.btn` system (primary = terra, outline = sage, ghost)
3. Nav — `.nav`, `.nav__inner`, `.nav__logo`, `.nav__links`, `.nav__cta`, `.nav__hamburger`, `.nav--open` mobile panel, `.nav--scrolled` shadow
4. Cookie bar — `.cookie-bar` + `.cookie-bar.is-visible` (slide-up from bottom)
5. Footer — new 3-column `.footer__grid`, `.footer__brand`, `.footer__nav`, `.footer__legal`, `.footer__bottom`
6. Home page sections — `.hero` (split grid 55/45), `.services-strip`, `.about-strip`, `.coverage-band`, `.cta-band`
7. Page hero — `.page-hero` (canvas-warm bg, no image overlay)
8. Shared components — `.stats-bar` / `.stat-item`, `.split-section`, `.content-card`, `.info-block`, `.process-steps`, `.check-list`
9. Cards — `.service-card`, `.scheme-card`, `.role-card`, `.benefit-tile`, `.service-tile`
10. Forms — `.contact__form`, `.form-group`, `.form-row`, `.form-note`, input/select/textarea tokens
11. Responsive — `max-width` overrides at `1024px`, `768px`, `480px` for every section above
12. Animation system — `[data-animate]` / `[data-stagger]` / `.is-visible`, keyframes: `fade-up`, `fade-down`, `fade-left`, `fade-right`, `scale-in`. **Remove:** `orbDrift1–4`, `auroraDrift`, `float`, `shimmer`, `softShake`, all `--tex-*` data URIs, all `--grad-*` tokens, all `--purple-*` / `--teal-*` / `--lilac` / `--mist` tokens
13. Custom element reservations — FOUC guard for `<site-nav>` / `<site-footer>`

**Commit:** `feat: full stylesheet rewrite — warm palette, Lora/Source Sans, clean component library`

---

## Sprint 3 — Legal Pages (content verbatim, skeleton swap only)

**Why here:** Simplest pages — zero new copy, just apply the new HTML skeleton. First live test that CSS + layout.js render together.

| # | Task | File | Notes |
|---|---|---|---|
| D | Rewrite privacy policy | `pages/privacy-policy.html` | New skeleton (REDESIGN.md §HTML Page Skeleton). `[base]=".."`. Preserve all 13 sections verbatim. Wrap in `.page-hero` + single `.content-card`. |
| E | Rewrite legal notice | `pages/legal-notice.html` | Same treatment as above. No `data-active` key (footer page only). |

Both files can be done in the same session — they're small.

**Commit:** `feat: apply new skeleton to privacy-policy and legal-notice pages`

---

## Sprint 4 — Service Detail Pages (content-preserving rewrites)

**Why here:** Existing content preserved, markup restructured. Validates all service-page CSS components (stats bar, scheme cards, role tiles, split sections). Two separate commits in case one session runs long.

| # | Task | File | Notes |
|---|---|---|---|
| 5 | Rewrite supported accommodation | `pages/supported-accommodation.html` | `data-active="supported"`. New markup, all content preserved. Stats: 5+ Bed spaces / 4 Scheme types / 7 Days / 24/7. Schemes ×4. Terracotta "Coming Soon" badge on accommodation cards. |
| 6 | Rewrite staffing solutions | `pages/staffing-solutions.html` | `data-active="staffing"`. **Must preserve** `[data-mobile-preview]` + `[data-preview-label]` on roles + tiles grids — `main.js` depends on them. Stats: 4 Counties / 24/7 / 8+ Roles / 100% DBS. |

**Commits:** one per file — `feat: redesign supported-accommodation page` / `feat: redesign staffing-solutions page`

---

## Sprint 5 — New Pages (new copy + structure)

**Why here:** All CSS components are proven. About and Careers need creative copy; Contact is spec-driven. One session per page — each is independently deployable.

| # | Task | File | Notes |
|---|---|---|---|
| 3 | Create About Us | `pages/about.html` | `data-active="about"`. Sections: page hero → mission (2–3 paras) → values grid (4 cols: Dignity/Professionalism/Collaboration/Continuity) → approach split → regulatory note (sage-tint panel) → CTA. No fabricated credentials. |
| 4 | Create Careers | `pages/careers.html` | `data-active="careers"`. Sections: hero → why-work (4 tiles) → roles grid (7 roles) → how-to-apply (3-step process) → mailto CTA. |
| C | Create Contact | `pages/contact.html` | `data-active="contact"`. 2-col grid: info blocks left (address/phone/email/response times), form right. Dropdown: Accommodation Referral / Staffing / Job Application / General / Feedback. `onsubmit="return false;"` `data-ai-no-submit="true"` `autocomplete="off"`. |

**Commits:** one per file

---

## Sprint 6 — Home Page (most complex, most visible)

**Why last:** The home page is the showpiece. By Sprint 6 all CSS components are battle-tested on simpler pages — no surprises.

| # | Task | File | Notes |
|---|---|---|---|
| 2 | Rewrite index.html | `index.html` | `[base]="."` `data-active="home"`. Sections: split hero (55/45 grid) → services strip (canvas-warm, 2 cards) → about strip (canvas-sand, text + 3 value pillars) → coverage band (sage-dark, counties list) → CTA band (phone + contact button). |

**Commit:** `feat: redesign home page — editorial split hero, services/about/coverage/cta bands`

---

## Sprint 7 — Cleanup + Documentation

**Why last:** contact-apply deletion is only safe after Sprint 5's contact.html is live. README and sitemap are housekeeping.

| # | Task | File | Notes |
|---|---|---|---|
| F | Delete old contact page | `pages/contact-apply.html` | Hard delete. Verify no internal links remain pointing to it first. |
| G | Update sitemap | `sitemap.xml` | Add: `about.html`, `careers.html`, `contact.html`. Remove: `contact-apply.html`. Update `lastmod` on all URLs. |
| H | Update README | `README.md` | Reflect: new design tokens, Lora/Source Sans, 8-page site, new components, new folder contents. Replace old colour/typography/CSS architecture tables. Remove purple/teal references. |

**Commit:** `chore: remove contact-apply, update sitemap and README for redesign`

---

## Post-Sprint Verification

Run through REDESIGN.md §Verification Checklist in order. All 11 checks must pass before merging to `main`.

---

## Dependency Graph

```
Sprint 1 (layout.js, cookies.js)
    └── Sprint 2 (style.css)
            ├── Sprint 3 (legal pages)       — parallelisable with 4, 5, 6
            ├── Sprint 4 (service pages)     — parallelisable with 3, 5
            ├── Sprint 5 (new pages)         — parallelisable with 3, 4
            └── Sprint 6 (home page)
                    └── Sprint 7 (cleanup)
```

Sprints 3–5 are independent of each other and can be tackled in any order after Sprint 2. Sprint 6 should come last because it is the most visible and benefits from all components being proven.
