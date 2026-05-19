# Horizon Care Services

A health and social care provider offering supported accommodation, staffing solutions, and comprehensive care services across the UK.

## Project Structure

This repository keeps content organized into focused folders:

### Main Directories

- **`/web`** - Next.js application (active production site)
  - `src/app/` - App Router pages and layouts
  - `src/components/` - Shared components (Nav, Footer, Hero, LocationMap, etc.)
  - `src/app/work-for-us/apply/` - Job application form (multi-section, PDF output)
  - `src/app/work-for-us/onboarding/` - Staff onboarding form (multi-section, PDF output)
  - `src/app/work-for-us/fields.tsx` - Shared form field components
  - `src/app/contact/` - Contact page with embedded map

- **`/Website`** - Legacy static website files (superseded by `/web`)
  - `content.txt` - Service information and details
  - `robots.txt` - Search engine configuration
  - `/assets` - Images, stylesheets, and JavaScript assets

- **`/Documents`** - Documentation and planning records
  - [`SITE-DESIGN.md`](Documents/SITE-DESIGN.md) - Design brief and visual direction
  - [`CLIENT-DEV-DISCUSSION.md`](Documents/CLIENT-DEV-DISCUSSION.md) - Ongoing client and web developer discussion notes for look-and-feel decisions
  - [`HOMEPAGE-SPRINT-PLAN.md`](Documents/HOMEPAGE-SPRINT-PLAN.md) - Sprint-based execution plan for homepage visual refinement

- **`.github/workflows`** - GitHub Actions automation
  - `deploy-to-pages.yml` - Automatic deployment to GitHub Pages

### Root files

- `README.md` - Project overview and instructions
- `PRODUCT.md` - Brand, users, tone, strategic principles (used by AI design tools)
- `DESIGN.md` - Design system: tokens, typography, components, patterns
- `skills-lock.json` - Installed skill lock file

This structure keeps the repository organized and easy to maintain.

## Adding a Blog Post

Blog posts live in `web/content/blog/` as Markdown files. The site picks them up automatically — no code changes needed.

### Steps

1. Create a new `.md` file in `web/content/blog/` using a kebab-case name that will become the URL slug.  
   Example: `my-article-title.md` → `/blog/my-article-title`

2. Add the frontmatter block at the top of the file:

   ```yaml
   ---
   title: "Your Article Title"
   date: YYYY-MM-DD
   author: Salwan Inayat
   category: Category Name
   excerpt: A one or two sentence summary shown on the blog listing page.
   ---
   ```

3. Write the article body in Markdown below the frontmatter.

4. **References section** — to trigger the styled references block at the bottom, use this exact heading:
   ```markdown
   ## Useful references
   ```
   List each link as a plain line followed by its URL on the next line.

### What happens automatically

- Posts are sorted newest-first on `/blog`
- The most recent post gets a "New" badge
- Reading time is calculated (approx. 220 words per minute)
- The post is statically pre-rendered at build time

### Categories used so far

- `Family guidance`
- `Care planning`

---

## Design Direction Notes

The homepage look and feel is being refined before any page expansion.

Current direction from discussion:
- Distinctive, crafted visual identity over generic templates
- Trust-first presentation for referrals and families
- Selective, purposeful animation rather than heavy motion
- Short footer on the homepage in this phase
- No new pages until homepage quality targets are met

See:
- [`Documents/CLIENT-DEV-DISCUSSION.md`](Documents/CLIENT-DEV-DISCUSSION.md)
- [`Documents/HOMEPAGE-SPRINT-PLAN.md`](Documents/HOMEPAGE-SPRINT-PLAN.md)

## Deployment Pipeline

A GitHub Actions workflow automatically deploys the website when changes are merged to the `main` branch:

- **Trigger:** Push to main branch
- **Action:** Deploys `/Website` folder to GitHub Pages
- **Result:** Website is live immediately after merge

To deploy your changes, simply merge or push to the main branch.

## Contact

**Office:**
9 Lilac Grove, Luton, LU3 3JG

**Phone:**
07572 701 349 (Urgent)
01582 354 119

**Email:**
admin@horizon-careservices.co.uk

## Service Areas

- Bedfordshire
- Buckinghamshire
- Cambridgeshire
- Hertfordshire
- Manchester
- London

## Services

- Supported Accommodation
- Staffing Solutions
- Home Care
- Care Assessment & Planning
- Care Coordination
- Personal Care
- Companionship
- Medication Management
- Meal Preparation
- Housekeeping
- Shopping Support
- Respite Care
- Dementia & Alzheimer's Care
- Hospice Care
