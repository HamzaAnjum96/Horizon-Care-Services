# Horizon Care Services

A health and social care provider offering supported accommodation, staffing solutions, and comprehensive care services across the UK.

## Project Structure

This repository maintains a clean root directory with all content organized into focused folders:

### Main Directories

- **`/Website`** - All website content and deployable files
  - `content.txt` - Service information and details
  - `robots.txt` - Search engine configuration
  - `/assets` - Images, stylesheets, and JavaScript files
  
- **`/Documents`** - Documentation files
  - Project documentation, guides, and reference materials
  - [`AI-ASSISTANT.md`](Documents/AI-ASSISTANT.md) - Installed AI assistant skills and reinstall instructions

- **`.github/workflows`** - GitHub Actions automation
  - `deploy-to-pages.yml` - Automatic deployment to GitHub Pages

- **`.agents/`** - AI assistant skills (UI/UX Pro Max, frontend-design, Vercel skills, etc.). See [`Documents/AI-ASSISTANT.md`](Documents/AI-ASSISTANT.md).
- **`.claude/`** - Claude Code settings and symlinks to the skills above

### Why Keep Root Clean?

The root directory contains only essential files:
- `README.md` - This file, project overview and instructions
- `skills-lock.json` - Dependency lock file

This structure keeps the repository organized and makes it easy to find what you need.

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
