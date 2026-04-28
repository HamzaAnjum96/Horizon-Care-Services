# Horizon Care Services — Site Design Brief

## Overview

A complete redesign of the Horizon Care Services website. Current state: a basic HTML placeholder with a purple gradient header and repeated card grid. Target state: a professional, editorially designed site that earns trust from NHS referrers and families at first impression.

The guiding scene: *A hospital discharge coordinator at 4pm on a Friday, searching for a supported accommodation provider. She opens this site on two browsers to compare. This site needs to tell her, in under 10 seconds, that Horizon Care Services is credible, competent, and human — before she reads a single service description.*

---

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSG/ISR for performance, great SEO, Vercel deployment |
| Language | TypeScript | Type safety across components |
| Styling | Tailwind CSS v4 + OKLCH custom tokens | Utility-first, design tokens in CSS |
| Component base | shadcn/ui | Accessible primitives for nav, forms, buttons |
| Animation | Framer Motion | Scroll-triggered reveals, staggered text, smooth transitions |
| Fonts | Fraunces (display) + Inter (body) via next/font | Fraunces is a high-contrast optical-size variable serif — editorial, distinctive |
| Premium effect 1 | Aceternity — Moving Border or Beams background | Hero only. Ambient depth without distraction |
| Premium effect 2 | Magic UI — Number Ticker | Stats section. Satisfying on scroll entry |
| Icons | Lucide React | Consistent, clean, tree-shakeable |
| Deployment | Vercel | Edge network, instant deploys |

---

## Color System (OKLCH)

**Strategy: Committed** — deep forest green carries 40–60% of the surface area. Warm amber as the single accent. This deliberately avoids the NHS blue / teal healthcare reflex.

### Roles

```css
/* Backgrounds */
--bg-base:     oklch(97% 0.008 145);   /* near-white, green-tinted */
--bg-subtle:   oklch(94% 0.015 145);   /* light sage tint for alternating sections */
--bg-deep:     oklch(22% 0.05 148);    /* near-black forest for hero, footer */
--bg-mid:      oklch(34% 0.09 148);    /* deep forest green for feature sections */

/* Brand */
--green-600:   oklch(42% 0.12 148);    /* primary action, links on light */
--green-500:   oklch(52% 0.14 150);    /* hover state */
--green-300:   oklch(72% 0.09 148);    /* text on dark backgrounds */
--green-100:   oklch(92% 0.025 145);   /* light tint for chips/badges */

/* Accent */
--amber-400:   oklch(78% 0.14 75);     /* warm amber — CTAs, highlights, hover indicators */
--amber-300:   oklch(86% 0.10 78);     /* lighter amber for text on dark */

/* Text */
--text-primary:   oklch(20% 0.04 148);  /* deep green-black for body */
--text-secondary: oklch(45% 0.05 148);  /* muted, used for metadata */
--text-inverse:   oklch(96% 0.01 145);  /* on dark backgrounds */

/* Border */
--border-subtle:  oklch(88% 0.02 145);
--border-mid:     oklch(80% 0.04 145);
```

---

## Typography

### Fonts

- **Display**: Fraunces — optical-size variable serif. Use for hero headlines, section titles. High contrast, editorial, distinctive. Avoid weight 400 (too thin at display sizes); use 600–900.
- **Body**: Inter — humanist sans. Clean, highly legible. Use for all running text, UI labels.

### Scale (Desktop)

| Token | Size | Weight | Font | Use |
|---|---|---|---|---|
| `display-2xl` | 80px / 5rem | 800 | Fraunces | Hero headline |
| `display-xl` | 60px / 3.75rem | 700 | Fraunces | Section hero heads |
| `display-lg` | 44px / 2.75rem | 700 | Fraunces | Page titles |
| `display-md` | 32px / 2rem | 600 | Fraunces | Sub-section heads |
| `body-xl` | 20px / 1.25rem | 400 | Inter | Lead paragraphs |
| `body-lg` | 18px / 1.125rem | 400 | Inter | Body text |
| `body-md` | 16px / 1rem | 400 | Inter | Default |
| `label` | 13px / 0.8125rem | 600 | Inter | Caps labels, metadata |

Line-height: 1.15 for display, 1.6–1.7 for body. Max line length: 68ch.

---

## Sitemap

```
/                        Home
/services                Services overview
/services/supported-accommodation    Supported accommodation detail
/services/staffing       Staffing solutions detail
/services/home-care      Home care detail
/services/specialist     Dementia, hospice, respite
/about                   About, values, approach
/referrals               For NHS/LA professionals — referral portal
/work-for-us             Careers
/contact                 Contact form + details
/legal                   Legal notice
/privacy-policy          Privacy policy
```

---

## Page-by-Page Design

---

### Homepage `/`

#### 1. Navigation

Sticky. Transparent over hero, transitions to `--bg-base` with border on scroll.

- Left: Wordmark "Horizon Care Services" in Fraunces 600
- Centre (desktop): Services, About, Work For Us
- Right: Contact link + "Make a Referral" button (amber fill, dark text)
- Mobile: hamburger → full-screen overlay menu

No sub-menus on mobile. Desktop: hover reveals a simple dropdown for Services with links to the four service pages.

---

#### 2. Hero

Full viewport height. Background: `--bg-deep` (near-black forest green).

**Aceternity effect**: Subtle "Beams of Light" rays emanating from top-left or "Aurora" background — muted, ambient. Green/amber tones only. Slow animation, not distracting.

**Content layout** (asymmetric):
- Left column (65% width): large editorial headline
- Right column (35%): a quiet supporting element (small descriptor text + contact nudge)

**Headline approach** — two lines, large Fraunces display-2xl, `--text-inverse`:
```
Care that holds
people steady.
```
*(or similar — to be copywritten)*

Below headline: a single sentence in `body-xl`, `--green-300`. Then two CTA buttons:
1. "Our Services" — outlined, white border
2. "Make a Referral" — amber fill

Bottom of hero: a horizontal ticker/marquee of service area names scrolling slowly. Subtle. Not a spinning animation. Uses `--green-300` text on `--bg-deep`.

---

#### 3. Services Strip

Full-width, `--bg-subtle`. NOT a card grid.

**Format**: Numbered editorial list. Four service pillars:

```
01  Supported Accommodation
02  Staffing Solutions
03  Home Care
04  Specialist Care
```

Each item: large two-digit number in Fraunces (decorative, `--green-100` on dark or `--green-100` faint on light), service name in display-md, one-sentence descriptor in body-md, and a right-arrow link.

Hover: the row expands inline to show 3–4 bullet points. Framer Motion height animation. No modal, no navigation.

Layout: single-column list on mobile, 2-column asymmetric on desktop (number + name on left, description + expand on right).

---

#### 4. About / Mission

`--bg-base`. Asymmetric two-column.

Left (40%): a large pull-quote in Fraunces display-xl, `--green-600`:
> "Care built around the person — not the paperwork."

Right (60%): three short paragraphs on who Horizon Care Services is, what they believe in, and their approach. Body-lg, `--text-primary`.

No image. No person photo. The typography carries the weight.

---

#### 5. Stats Bar

Full-width strip, `--bg-mid` (deep forest green). Three stats in a horizontal row.

| Stat | Label |
|---|---|
| 6 | Service areas across England |
| 2 working days | Referral response time |
| 7 days a week | On-site staffing availability |

Magic UI **Number Ticker** on the first stat (the "6" counts up). Others use a simple fade-in.

Each stat: number in Fraunces display-xl `--amber-300`, label in label caps `--green-300`.

No borders between stats. Generous horizontal padding creates implied separation.

---

#### 6. How It Works (Process)

`--bg-subtle`. Four horizontal steps for referrers:

```
Assessment  →  Care Plan  →  Placement  →  Review
```

Not boxes with icons. Instead: each step is a typographic block. Step name in display-md Fraunces. One-sentence description in body-md. A subtle connecting line between them (CSS, not SVG).

On mobile: vertical stack with a left connecting line.

---

#### 7. Service Areas

`--bg-base`. A typographic map — not a literal map image.

Large Fraunces heading: "Serving England." Below: the six service areas rendered in large, generous text at different weights and sizes — creating visual rhythm, not a list. Think: typographic poster layout.

```
Bedfordshire     Buckinghamshire
        Cambridgeshire
Hertfordshire    Manchester
           London
```

Each area name is a subtle link that goes to contact with a pre-filled "area" field.

---

#### 8. Dual CTA

`--bg-deep`. Two large call-to-action blocks side by side (stacked on mobile).

Left: "For referrers and commissioners"
- Headline: "Make a Referral"
- Body: process summary, 2 working day response
- CTA: amber button

Right: "For care professionals"
- Headline: "Work With Us"
- Body: roles available, benefits
- CTA: outlined button

Dividing line between them: `--green-500`, 1px.

---

#### 9. Footer

`--bg-deep`. Three columns:

1. Wordmark + address + phone numbers
2. Services links (4)
3. Company links: About, Work For Us, Referrals, Legal, Privacy Policy

Bottom bar: copyright + "Regulated health and social care provider" in label caps.

No large footer with decorative elements. Clean, functional, on-brand.

---

### Services Overview `/services`

`--bg-base`. Four large service sections, each full-width alternating between `--bg-base` and `--bg-subtle`.

Each section:
- Section number (01–04) in large faint Fraunces behind the heading (decorative)
- Service name as display-xl heading
- 2–3 sentence description
- Bulleted sub-service list (clean, no icons)
- "Explore [service]" link in `--green-600`

---

### Supported Accommodation `/services/supported-accommodation`

Four scheme types each get a dedicated block:
1. Adult Placement (6mo–2yr)
2. Short-Term Support (1–6mo)
3. Step-Down Transitional (1–6wk)
4. Outreach Floating Support

Each block: scheme name, duration, key focus points (clean list, no icons), who it's for.

A "Current Projects" section covers the Hatfield property (5-bed, details from content.txt) and pipeline properties.

A "Make a Referral" CTA strip at the bottom of the page.

---

### Staffing Solutions `/services/staffing`

Three-section structure:

1. **Who we staff** — settings list (hospitals, care homes, etc.) in editorial format
2. **Roles available** — listed with brief description of each role type
3. **Why Horizon** — short-notice cover, competitive rates, trained staff, 24/7 availability

Contact strip: direct number for urgent booking.

---

### Home Care `/services/home-care`

Service grid — but NOT identical cards. An asymmetric masonry-inspired layout where some services get more visual real estate based on complexity.

Core six: Personal Care, Companionship, Medication Management, Meal Preparation, Housekeeping, Shopping.

Each with: name, one-sentence description, and a small detail line (e.g. "Including dietary restrictions and personal preferences" for Meal Preparation).

---

### Referrals `/referrals`

Professional-focused. Clean, form-centric.

Page sections:
1. **Eligibility criteria** — who can be referred (mental health needs, learning difficulties)
2. **How to refer** — 3-step process (contact, assessment, response within 2 working days)
3. **Referral form** — shadcn form components. Fields: organisation, professional role, service needed, urgency, contact details, brief description of need
4. **Contact for urgent referrals** — the phone number prominently

---

### Work For Us `/work-for-us`

Two sections:

1. **Who we're looking for** — roles listed (RNs, SWs, OTs, physios, HCAs, support workers, admin)
2. **What we offer** — benefits listed: competitive rates, flexible shifts, professional development, career progression, Bright Exchange access

CTA: apply by email or phone.

---

### Contact `/contact`

Split layout:
- Left: contact form (shadcn, name / email / phone / message / reason for contact)
- Right: contact details block (address, phone, email) + office hours

Map: consider embedding only if a solid embed option exists without cookie/GDPR complications. Otherwise: address as plain text with a "View on Maps" external link.

---

## Motion Design

All motion: exponential ease-out curves (`cubic-bezier(0.16, 1, 0.3, 1)`). No bounce. No elastic.

| Element | Animation | Trigger |
|---|---|---|
| Hero headline | Staggered word reveal: opacity 0→1 + translateY 24px→0 | Page load, 100ms delay |
| Hero sub-text | Fade in, 200ms delay after headline | Page load |
| Section headings | Fade in + translateY 16px→0 | Viewport entry (IntersectionObserver or Framer Motion whileInView) |
| Stats numbers | Count-up via Magic UI NumberTicker | Viewport entry |
| Services list items | Stagger: each item fades + slides up 12px, 50ms apart | Viewport entry |
| Nav background | Opacity + blur transition over 200ms on scroll | Scroll past hero |
| CTA buttons | Scale 1→1.02 on hover, 150ms ease-out | Hover |
| Hover on service rows | Height expand, opacity reveal of sub-bullets | Hover |

No parallax (layout property, banned). No morphing shapes. No looping background animations on long-scroll sections (only hero).

---

## Component Inventory (Quick Pass)

| Component | Location | Notes |
|---|---|---|
| `<Nav>` | layout | Sticky, transparent→solid scroll, mobile drawer |
| `<HeroSection>` | homepage | Aceternity beams, staggered text |
| `<ServicesList>` | homepage, /services | Numbered editorial list, expandable rows |
| `<StatsBand>` | homepage | Magic UI NumberTicker, `--bg-mid` strip |
| `<HowItWorks>` | homepage | 4-step typographic process |
| `<AreaMap>` | homepage | Typographic service areas layout |
| `<DualCTA>` | homepage | Two-column CTA block on dark bg |
| `<Footer>` | layout | 3-column, dark bg |
| `<ServicePage>` | /services/* | Reusable page template |
| `<ReferralForm>` | /referrals | shadcn form, validation |
| `<ContactForm>` | /contact | shadcn form |
| `<PageHero>` | all inner pages | Smaller hero, dark bg, page title + breadcrumb |
| `<SectionHeading>` | everywhere | Fraunces display heading, animated on scroll |

---

## Accessibility Notes

- All color combinations must pass WCAG AA (4.5:1 for body, 3:1 for large text)
- The `--green-300` on `--bg-mid` must be checked — green on green can fail
- All Framer Motion animations must respect `prefers-reduced-motion`
- Navigation must be keyboard accessible; shadcn NavigationMenu handles this
- Form fields must have explicit labels (not placeholder-only)
- Mobile tap targets minimum 44×44px

---

## Open Questions (To Resolve in Flesh-Out)

1. **Photography policy**: If any photography is used, what subjects? Architecture/space shots of the Hatfield property could work. Commission or AI-generated? Both are options.
2. **Testimonials / social proof**: Does the company have CQC rating, testimonials, or partner logos? These would materially improve trust.
3. **Referral form handling**: Does this need a backend (email service), or is a mailto fallback acceptable for now?
4. **Cookie consent**: UK GDPR requires a consent mechanism if using analytics. Confirm whether GA or similar is needed.
5. **Branding assets**: Is there an existing logo or brand mark? If not, the Fraunces wordmark is the logo for now.
6. **Copy**: All headline copy above is placeholder/directional. Final copy needs approval.

---

## What's Next

This is the quick-pass brief. Next passes will flesh out each section in detail:

1. **Nav + Footer** — component code
2. **Hero** — Aceternity integration, staggered animation
3. **Homepage sections** — each section built in order
4. **Inner pages** — Services, Referrals, Work For Us, Contact
5. **Polish pass** — typography fine-tuning, spacing rhythm, accessibility audit
