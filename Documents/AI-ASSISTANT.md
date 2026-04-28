# AI Assistant Setup

This repository is configured for use with [Claude Code](https://claude.ai/code) and other AI coding assistants. A bundle of UI/UX and frontend skills is installed so the assistant can help build and review the website.

## Installed skills

Skill source files live in `.agents/skills/`. `.claude/skills/` contains symlinks (and one direct copy) so Claude Code picks them up automatically.

### UI/UX design

| Skill | Purpose |
| --- | --- |
| `ui-ux-pro-max` | UI/UX design intelligence: 67 styles, 96 palettes, 57 font pairings, 25 charts, 13 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui). |
| `frontend-design` | Anthropic's skill for distinctive, production-grade frontend interfaces. |
| `impeccable` | Design, critique, audit, polish, and improve frontend interfaces (UX review, visual hierarchy, accessibility, motion, theming). |
| `web-design-guidelines` | Reviews UI code against the Web Interface Guidelines (accessibility, UX best practices). |

### React / Next.js / Vercel

| Skill | Purpose |
| --- | --- |
| `vercel-react-best-practices` | React and Next.js performance optimization guidelines from Vercel Engineering. |
| `vercel-composition-patterns` | React composition patterns for scalable component APIs. |
| `vercel-react-view-transitions` | Smooth animations using React's View Transition API. |
| `vercel-react-native-skills` | React Native and Expo best practices for mobile apps. |
| `deploy-to-vercel` | Deploy applications and websites to Vercel. |
| `vercel-cli-with-tokens` | Manage Vercel projects via CLI using token-based auth. |

## Reinstalling

If you clone the repo on a new machine and the skills are missing, run:

```bash
# UI/UX design intelligence (Claude Code only)
npm install -g uipro-cli && uipro init --ai claude

# Anthropic frontend-design skill
npx skills add https://github.com/anthropics/skills --skill frontend-design

# Vercel React / Next.js / UI quality skills
npx skills add vercel-labs/agent-skills
```

The `skills-lock.json` file at the repo root tracks the installed skill versions.

## Usage

After installing, restart Claude Code (or your AI assistant) to pick up the skills. Then describe what you need — e.g. "Review the homepage for accessibility", "Build a service-card component for the website", "Deploy the site to Vercel" — and the matching skill will be invoked automatically.

> Skills run with full agent permissions. Review them before use.
