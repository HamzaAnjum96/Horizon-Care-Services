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

Full viewport height. Background: `--bg-deep` (near-black forest green) with the Aceternity ambient beams — slow, muted green/amber rays. Never distracting. The effect anchors the dark bg so it reads as atmospheric, not just empty.

---

##### 2a. Document Panel (Folder Tab Structure)

The primary content lives inside a large white panel (`--bg-base`) that sits on the dark background — slightly elevated, `box-shadow: 0 32px 80px oklch(0% 0 0 / 0.45)`. The panel does not reach the viewport edges; it has generous margin on all sides (64px desktop, 20px mobile). Rounded corners: `border-radius: 20px`.

The physical detail: **folder tabs** grow out of the top edge of the panel. Not navigation tabs — literal folder-file tabs, the kind that stick above a document folder. They are part of the panel's shape, not separate elements.

**Tab structure (desktop):**

```
┌──────────────┐  ┌──────────────────┐
│  For Families │  │ For Professionals │        ← tabs, above the panel
└──────────────┘──┴──────────────────┴──────────────────────────────────┐
│                                                                        │
│   panel content                                                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

- Tabs are part of the panel's SVG/clip-path shape, or built with `::before` pseudo-elements. NOT a separate tab bar component sitting on top.
- Active tab ("For Families" by default): white, full opacity, the panel's top-left corner.
- Inactive tab ("For Professionals"): `oklch(91% 0.02 145)` — slightly greyed, appears to sit one layer behind the active tab. Subtle `box-shadow` on the bottom edge of the inactive tab to reinforce it's behind. Clicking it switches the panel content.
- Tab labels: Inter 500, 14px, `--text-secondary`. Not a heading — a quiet label.
- Tab shape: each tab has a straight inner edge and a curved outer top corner (`border-radius: 10px 10px 0 0`). The active tab's bottom border is white (same as panel), visually merging into the panel. The inactive tab has a bottom border in `--border-mid` to show its separation.
- On mobile: tabs stack horizontally above the panel, full width split 50/50. Same shape logic, smaller.

**Panel content switches** (Framer Motion `AnimatePresence`, crossfade 200ms) between two states:

**State A — "For Families & Individuals"** (default):
```
LEFT (55%)                          RIGHT (45%)
─────────────────────────────────   ─────────────────────────
Fraunces display-2xl                [Sticker badges cluster]
"Care that holds                    + contact nudge
 people steady."

Inter body-xl, --text-secondary
"Supported accommodation, home
 care, and specialist services
 across England."

[Our Services →]  [Make a Referral →]
```

**State B — "For Professionals"**:
```
LEFT (55%)                          RIGHT (45%)
─────────────────────────────────   ─────────────────────────
Fraunces display-xl                 [Different sticker cluster]
"Staff and referrals,               + urgent contact number
 handled with care."

Inter body-xl, --text-secondary
"Staffing solutions and referral
 pathways for NHS trusts, local
 authorities, and care providers."

[Staffing Solutions →]  [Submit a Referral →]
```

---

##### 2b. Sticker Badges (Hero + Recurring Motif)

Sticker badges are small, physically-present elements scattered at non-grid positions — overlapping panel edges, rotated 1–3 degrees, slightly elevated with their own shadow. They reference labels and stickers on physical care folders without being literal.

**Construction:**
```css
.sticker {
  /* Solid color fill — no gradient, no glass */
  background: var(--sticker-bg);
  border-radius: 6px;          /* slightly less round than a pill */
  padding: 6px 12px;
  font: 600 12px/1 'Inter', sans-serif;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  
  /* Physical elevation */
  box-shadow:
    0 2px 0 oklch(0% 0 0 / 0.12),   /* bottom edge shadow — like a sticker's thickness */
    0 4px 12px oklch(0% 0 0 / 0.18); /* ambient shadow lifting it off surface */
  
  /* Slight rotation — each sticker gets a fixed unique value, not random */
  transform: rotate(-2deg);  /* or +1.5deg, +3deg — varies per sticker */
  
  /* Position: absolute within the panel's right column, overlapping the panel edge */
  position: absolute;
}
```

**Sticker color palette (specific tokens):**

| Token | Value | Use |
|---|---|---|
| `--sticker-amber` | `oklch(78% 0.14 75)` | Key stats, urgent info |
| `--sticker-sage` | `oklch(85% 0.08 148)` | Service areas |
| `--sticker-cream` | `oklch(95% 0.02 90)` | Secondary labels |
| `--sticker-deep` | `oklch(30% 0.08 148)` | Inverted/dark sticker |

Text on `--sticker-amber` and `--sticker-sage`: `--text-primary` (dark). Text on `--sticker-deep`: `--text-inverse`.

**Hero sticker cluster (State A — right column):**

Three stickers, scattered naturally:
1. `STAFFED 7 DAYS A WEEK` — amber, rotate(-2deg), top of right column, slightly overlapping panel top edge
2. `6 SERVICE AREAS` — sage, rotate(1.5deg), mid-right
3. `2-DAY REFERRAL RESPONSE` — cream, rotate(-1deg), lower right

These are not perfectly aligned. They should look placed by hand, not by a grid. Absolute positioning within a relative right column container.

**Where sticker badges appear across the site:**
- Hero: 3 stickers in the right column (as above)
- Stats band: no stickers (the numbers are the feature)
- Services overview: each service pillar gets one sticker — e.g., "MENTAL HEALTH FOCUS" on Supported Accommodation, "24/7 AVAILABILITY" on Staffing
- Supported accommodation page: property sticker on the Hatfield project block — "CURRENTLY AVAILABLE"
- Work For Us page: benefit stickers — "FLEXIBLE SHIFTS", "BRIGHT EXCHANGE ACCESS"
- Contact page: a "RESPONDS IN 2 DAYS" sticker near the referral form

Rule: max 3 stickers visible at once in any section. They lose impact through overuse.

---

##### 2c. Hero Bottom — Area Scroll

Below the panel, still within the hero viewport: a slow horizontal marquee of service area names. `--green-300` text on `--bg-deep`. Separated by a thin `|` divider. No background, no border. 12px Inter 500, letter-spacing 0.1em, all caps. Speed: ~40 seconds per full loop.

```
BEDFORDSHIRE  |  BUCKINGHAMSHIRE  |  CAMBRIDGESHIRE  |  HERTFORDSHIRE  |  MANCHESTER  |  LONDON  |  ...
```

This is purely ambient — not a navigation element. On mobile it auto-scrolls and cannot be interacted with.

---

##### 2d. Hero Animation Sequence (Framer Motion)

All `ease: [0.16, 1, 0.3, 1]` (exponential ease-out). `prefers-reduced-motion`: all animations skip to final state.

| Element | Initial state | Final state | Delay |
|---|---|---|---|
| Panel | `opacity: 0, y: 40px, scale: 0.97` | `opacity: 1, y: 0, scale: 1` | 0ms |
| Folder tabs | `opacity: 0` | `opacity: 1` | 100ms |
| Headline words | Each word: `opacity: 0, y: 20px` | `opacity: 1, y: 0` | Stagger: 150ms + 40ms per word |
| Sub-text | `opacity: 0` | `opacity: 1` | 450ms |
| CTA buttons | `opacity: 0, y: 10px` | `opacity: 1, y: 0` | 550ms (stagger 80ms between) |
| Sticker 1 | `opacity: 0, scale: 0.8, rotate: -8deg` | `opacity: 1, scale: 1, rotate: -2deg` | 600ms |
| Sticker 2 | `opacity: 0, scale: 0.8, rotate: 5deg` | `opacity: 1, scale: 1, rotate: 1.5deg` | 700ms |
| Sticker 3 | `opacity: 0, scale: 0.8, rotate: -5deg` | `opacity: 1, scale: 1, rotate: -1deg` | 800ms |
| Area marquee | `opacity: 0` | `opacity: 1` | 900ms |

Stickers "land" onto the panel — they animate from a more extreme rotation to their resting rotation, simulating being placed down.

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

## Physical Motifs (Design System)

These two elements appear across the site and share a common philosophy: borrow the affordance of a real physical object without reproducing it literally. They give the site tactility and distinctiveness against flat/minimal competitors.

---

### Folder Tab Panels

A content panel (white or `--bg-subtle`) that grows folder tabs out of its top edge. Used when content has two meaningful states or audiences. Not a tab bar — the tab is structurally part of the panel shape.

**When to use:** Hero (two audience states), service detail sections with sub-categories, referral form (individual vs. organisation referral).

**When not to use:** Navigation, filtering, data tables. Not everywhere — max 2–3 instances across the site.

**Implementation approach:**
```
Option A (CSS): The panel div has `border-radius: 20px` except top-left.
The active tab is a pseudo-element or sibling div absolutely positioned
to sit flush with the panel top, with a white bottom border that
overwrites the panel's top border — classic CSS tab trick.

Option B (SVG clip-path): More flexible for organic tab shapes but
harder to animate. Use only if Option A produces jaggy edges.
```

**Inactive tab depth illusion:**
- `background: oklch(91% 0.02 145)` — slightly darker than the active panel
- `box-shadow: inset 0 -3px 6px oklch(0% 0 0 / 0.06)` — suggests it sits behind
- `z-index` lower than active tab
- Bottom border of inactive tab in `--border-subtle` to show the gap

---

### Sticker Badges

Small label elements that feel physically placed on a surface. Slight rotation, shadow that implies thickness, solid (never gradient) fill. See Hero section (2b) for full CSS spec.

**Rotation values (fixed per badge type, not randomized at runtime):**
- Primary stickers: -2deg
- Secondary: +1.5deg
- Tertiary: -1deg or +3deg

Never rotate more than ±4deg. Beyond that they read as errors, not personality.

**Placement rule:** Always position relative to a panel or section, with at least one sticker overlapping the edge or another element. This breaks the grid intentionally. If all stickers sit neatly inside their container, they've lost the point.

**Animation:** Stickers always "land" — they animate from a more extreme rotation toward their resting rotation. This is the key motion that makes them feel placed rather than rendered.

---

| Component | Location | Notes |
|---|---|---|
| `<Nav>` | layout | Sticky, transparent→solid scroll, mobile drawer |
| `<HeroSection>` | homepage | Aceternity beams, staggered text, document panel |
| `<FolderPanel>` | homepage hero, referrals | Tab panel with folder-tab top edge, audience switch |
| `<StickerBadge>` | hero, services, work-for-us, contact | Rotated label badge, lands-on animation |
| `<ServicesList>` | homepage, /services | Numbered editorial list, expandable rows |
| `<StatsBand>` | homepage | Magic UI NumberTicker, `--bg-mid` strip |
| `<HowItWorks>` | homepage | 4-step typographic process |
| `<AreaMap>` | homepage | Typographic service areas layout |
| `<DualCTA>` | homepage | Two-column CTA block on dark bg |
| `<Footer>` | layout | 3-column, dark bg |
| `<ServicePage>` | /services/* | Reusable page template |
| `<ReferralForm>` | /referrals | shadcn form, FolderPanel for individual/org switch |
| `<ContactForm>` | /contact | shadcn form + StickerBadge near submit |
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
