# Horizon Care Services

A health and social care provider offering supported accommodation, staffing solutions, and comprehensive care services across the UK.

## Project Structure

This repository keeps content organized into focused folders:

### Main Directories

- **`/Website`** - Website content and deployable files
  - `content.txt` - Service information and details
  - `robots.txt` - Search engine configuration
  - `/assets` - Images, stylesheets, and JavaScript files

- **`/Documents`** - Documentation and planning records
  - [`SITE-DESIGN.md`](Documents/SITE-DESIGN.md) - Design brief and visual direction
  - [`CLIENT-DEV-DISCUSSION.md`](Documents/CLIENT-DEV-DISCUSSION.md) - Ongoing client and web developer discussion notes for look-and-feel decisions
  - [`HOMEPAGE-SPRINT-PLAN.md`](Documents/HOMEPAGE-SPRINT-PLAN.md) - Sprint-based execution plan for homepage visual refinement

- **`.github/workflows`** - GitHub Actions automation
  - `deploy-to-pages.yml` - Automatic deployment to GitHub Pages

### Why Keep Root Clean?

The root directory contains only essential files:
- `README.md` - Project overview and instructions
- `skills-lock.json` - Installed skill lock file

This structure keeps the repository organized and easy to maintain.

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
