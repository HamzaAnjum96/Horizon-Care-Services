# Horizon Care Services — Self-Design Discussion and Improved Execution Plan

## Guardrail We Keep

**Non-negotiable:** keep the current colour system and colour tokens as they are.

---

## Design Critique Workshop (Agent + Client)

### Round 1 — Strategy and outcomes ("Impeccable" questions)

**Q (Impeccable):** What is the single most important conversion action per audience, and are we optimising for that action on every page?

**A (Client):** Not clearly. The website currently mixes goals: referrals, staffing requests, and job applications are present, but page intent and CTA hierarchy are not consistently explicit.

**Decision:** Define one primary action per page and one global secondary action (phone or contact page), then align hero, in-page sections, and footer CTA to that intent.

---

**Q (Impeccable):** Does the page structure prove trust before asking for action?

**A (Client):** Partially. We show service descriptions, but trust content (how we work, response times, coverage proof, process transparency) can be made more systematic.

**Decision:** Introduce a consistent trust narrative pattern:
1. What we do
2. How we do it
3. Who it is for
4. What happens next
5. How quickly we respond

---

**Q (Impeccable):** Are we writing to decision-makers with time pressure, or to general browsers?

**A (Client):** Mostly decision-makers (families, commissioners, providers, managers), often under time pressure.

**Decision:** Shorten headline/subhead copy, increase scannability, surface contact routes early, and simplify content blocks into decision-ready modules.

---

### Round 2 — UX/UI diagnosis ("UX/UI Pro" questions)

**Q (UX/UI Pro):** Is information architecture role-based (referrals vs staffing vs candidates), or organisation-based?

**A (Agent):** Mostly organisation-based.

**Decision:** Reframe top-level journeys around user jobs-to-be-done while retaining existing pages:
- Need accommodation support
- Need staffing support
- Want to work with us
- Need to contact us quickly

Each page keeps content but introduces clearer entry/exit points to adjacent journeys.

---

**Q (UX/UI Pro):** Are headings and section labels actionable, specific, and skimmable in under 15 seconds?

**A (Client):** Not consistently.

**Decision:** Rewrite headings to explicit outcomes (e.g., "Support available 7 days a week" instead of generic headings) and add section intros that answer "why this matters".

---

**Q (UX/UI Pro):** Is mobile interaction frictionless for urgent users?

**A (Agent):** Could improve. Urgent actions can be more prominent and sticky behaviour could be clearer.

**Decision:** Improve mobile priority patterns:
- keep menu + key CTA clear at first paint
- ensure clickable phone/email blocks are visible above fold on contact-critical pages
- reduce vertical cognitive load with tighter section grouping and clearer separators

---

**Q (UX/UI Pro):** Are forms minimised to required data only?

**A (Client):** The contact form is acceptable but could route intent better.

**Decision:** Keep current fields but improve microcopy and follow-up expectation text to reduce uncertainty and abandonment.

---

### Round 3 — Front-end implementation quality ("Frontend skill" questions)

**Q (Frontend skill):** Do we have a reliable, reusable page blueprint so changes stay consistent across all 8 pages?

**A (Agent):** Partly, but consistency can tighten.

**Decision:** Enforce a shared structure checklist for all pages: hero pattern, trust strip, primary content blocks, CTA band, consistent spacing rhythm.

---

**Q (Frontend skill):** Are selectors used by JavaScript protected from accidental breakage during redesign updates?

**A (Agent):** They are known, but guarding rules are mostly implicit.

**Decision:** Add an explicit implementation checklist to prevent accidental renames/removals of JS-dependent selectors and data attributes.

---

**Q (Frontend skill):** Are we optimising maintainability with the current static architecture?

**A (Client):** We can improve by reducing one-off markup decisions.

**Decision:** Standardise section variants and component usage instead of ad-hoc patterns per page.

---

## What We Keep vs What We Change

### Keep
- Existing colour palette/tokens and visual warmth.
- Static stack (HTML/CSS/JS) and current deployment model.
- Existing services and factual content integrity.

### Change
- Messaging hierarchy and conversion clarity.
- Heading/copy scannability.
- Journey clarity between service pages and contact/careers.
- Mobile-first action prominence.
- Component-level consistency and implementation guardrails.

---

## Improved Plan (Execution-Ready)

### Phase 1 — Experience architecture (content + flow)
1. Define primary CTA and secondary CTA for every page.
2. Map each page to one target user intent.
3. Rewrite hero/subhead pairs for clarity and urgency context.
4. Add "What happens next" and response-time copy consistently where enquiries happen.

### Phase 2 — UX/UI content refinement
1. Replace generic headings with outcome-led headings.
2. Trim paragraph length and convert dense blocks into bullets/cards where possible.
3. Add concise trust indicators near decision points (coverage, response windows, support availability).
4. Improve cross-links between related journeys (supported ↔ staffing ↔ contact ↔ careers).

### Phase 3 — Front-end consistency hardening
1. Apply a section and spacing audit across all pages.
2. Reuse existing component patterns instead of creating page-specific variants.
3. Preserve all JS-dependent selectors/attributes used by `main.js` and `layout.js`.
4. Validate navigation active states and relative path correctness on every page.

### Phase 4 — QA and validation
1. Mobile checks at 768px and 480px for action visibility and readability.
2. End-to-end link validation (internal and CTA links).
3. Cookie consent workflow verification (first load, accept, reset via footer).
4. Copy QA for British English, factual claims, and response-time consistency.

---

## Acceptance Criteria for "Improved"

- Every page communicates its purpose in under 5 seconds.
- Every page exposes one obvious primary action without competing CTA noise.
- Trust content appears before major conversion asks.
- Mobile users can contact or act in one to two taps from critical pages.
- No regressions in nav/footer injection, animation hooks, or cookie behaviour.

---

## Immediate Next Steps

1. Run a page-by-page copy hierarchy rewrite while preserving colour system.
2. Align CTA priorities and trust sections in existing markup.
3. Perform responsive and interaction QA.
4. Ship in one cohesive pass with no architecture changes.
