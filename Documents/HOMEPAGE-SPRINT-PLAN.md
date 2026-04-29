# Horizon Care Services — Homepage Look & Feel Plan (Sprint-Based)

## Scope Lock (Agreed)

This plan is strictly for the **existing homepage only**.

- No new pages in this phase.
- No IA expansion.
- No broad content migration.
- Primary objective: elevate visual quality, distinctiveness, and trust signals on the current homepage.

---

## Plan Overview

We will deliver the new look and feel in four focused sprints.

### Sprint 0 — Alignment and Baseline (2–3 days)

**Goal:** Remove ambiguity before design implementation.

**Tasks**
- Confirm homepage section order that stays in scope for this phase.
- Define the motion guardrails (subtle, fast, purposeful).
- Approve footer rule for this phase: short footer on homepage.
- Snapshot current homepage metrics and UX baseline (performance, readability, visual consistency).

**Deliverables**
- Locked homepage section map (single-page).
- Motion principles checklist.
- Footer content list (minimal).
- Baseline capture note for before/after comparison.

**Exit criteria**
- Team signs off on “no new pages” and homepage-only scope.
- Motion guardrails approved.
- Footer content approved.

---

### Sprint 1 — Visual Language Foundations (4–5 days)

**Goal:** Build a non-generic visual system that still feels trustworthy for care referrals.

**Tasks**
- Finalize typography hierarchy (headline, lead, body, metadata, CTA labels).
- Tune color system toward trust-first neutrals plus one high-intent accent.
- Define section rhythm rules (alternating density, spacing cadence, contrast pacing).
- Draft updated component styling for:
  - Nav
  - Hero composition
  - Primary/secondary CTAs
  - Section headers

**Deliverables**
- Homepage visual tokens (type, spacing, color usage rules).
- Updated static mock direction for homepage sections.
- Signed-off hero and CTA treatment direction.

**Exit criteria**
- Stakeholders confirm design no longer reads as templated.
- Typography and color decisions are implementation-ready.

---

### Sprint 2 — Motion and Interaction Pass (3–4 days)

**Goal:** Add polish without decorative overload.

**Tasks**
- Implement restrained entrance transitions for hero and key sections.
- Add interaction feedback for CTAs and navigation states.
- Standardize easing and duration system across homepage interactions.
- Remove or avoid any distracting animation patterns.

**Motion rules**
- Every animation must support clarity or hierarchy.
- No floaty/bouncy behavior.
- No prolonged decorative loops competing with content.
- Respect `prefers-reduced-motion`.

**Deliverables**
- Motion spec with named durations/easing.
- Implemented micro-interactions on homepage components.
- Reduced-motion behavior verified.

**Exit criteria**
- Motion feels premium and controlled.
- Team agrees animation supports, not dominates, the experience.

---

### Sprint 3 — Final Homepage Polish and QA (3–4 days)

**Goal:** Ship-ready homepage presentation quality.

**Tasks**
- Apply final spacing, alignment, and visual balance refinements.
- Implement short footer on homepage (critical links + contact only).
- Run cross-device visual QA (mobile-first priority).
- Run accessibility and performance checks.
- Tighten copy line breaks and CTA clarity.

**Deliverables**
- Final homepage styles and layout in production code.
- Short homepage footer implementation.
- QA checklist with pass/fix log.

**Exit criteria**
- Homepage meets agreed visual bar.
- Footer is concise and intentional.
- No critical accessibility or layout regressions.

---

## Definition of Done (Phase)

The phase is complete when:

1. Homepage has a distinctive, authored visual identity.
2. Trust and referral clarity remain strong.
3. Animation is subtle and purposeful.
4. Homepage uses the short footer pattern.
5. No additional pages were introduced during this phase.

---

## De-scoped Items (Explicitly Not in This Plan)

- New page creation (`/services/*`, `/about`, `/referrals`, etc.).
- Long utility footer rollout across interior pages.
- Major information architecture rewrite.
- Non-homepage visual redesign.

These can be planned as a separate post-homepage phase.
