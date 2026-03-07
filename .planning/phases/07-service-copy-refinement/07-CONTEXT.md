# Phase 7: Service & Copy Refinement - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Service content rewritten to speak to GCs about project outcomes (schedule, coordination, callbacks) rather than glazing specs. Process Timeline steps renamed with GC-project terminology. Each service gets a unique icon and brand-consistent hover states. Requirements: COPY-01, COPY-02, DSGN-03, DSGN-04.

</domain>

<decisions>
## Implementation Decisions

### GC-benefit copy voice
- Full GC language — descriptions lead with project outcomes, not technical specifications
- Two-sentence descriptions: first sentence = GC benefit, second sentence = what makes CGI different
- Bullets replaced with 3 GC-outcome bullets per service (no spec language)
- Pain points to emphasize across 8 services: schedule reliability, minimal callbacks, coordination ease, code compliance
- Distribute pain points naturally so no two cards feel repetitive

### Process Timeline wording
- Keep all 7 steps, rename with GC-friendly terminology
- Both titles AND descriptions rewritten with GC-benefit language
- Step 1: "Budget Request" (not "Bid Request" or "Plan Review & Budget") — uses "budget" per content rules
- Remaining steps: Claude refines final names based on GC workflow (preview direction: Site Assessment, Scope & Schedule, Submittals & Approvals, Fabrication, Installation, final step TBD)
- Last step name: Claude's discretion — can emphasize punchlist/turnover, warranty/docs, or blend

### Service icons
- Claude selects all 8 icons — unique lucide-react icon per service, no duplicates
- Style: literal/representational — icons should directly represent the service (e.g. a door for storefronts, a building for curtain walls)
- Currently 3 services share Maximize icon (Window Walls, Glass Railings, Mirrors) — all must change

### Hover color treatment
- Background gradient: brand navy tint (`from-brand/5 to-transparent`) replacing generic `from-blue-50`
- Icon container on hover: `bg-brand text-white shadow-brand/30` (already in place, keep)
- Bottom accent line: `bg-gradient-to-r from-brand via-accent to-brand` (already in place, keep)
- Border on hover: Claude's discretion (currently `border-accent/30`, may shift to `border-brand/30` for cohesion)

### Claude's Discretion
- Exact copy for all 8 service descriptions and bullets (within full-GC-language constraint)
- Exact Process Timeline step names and descriptions (within GC-terminology constraint)
- Specific lucide-react icon choices for each service (within literal/representational constraint)
- Hover border color treatment
- Any micro-interactions or transition timing adjustments

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ServiceCard` component (`src/components/ServiceCard.tsx`): Has `title`, `description`, `icon`, `bullets?` props — no changes to prop interface needed, just data values
- `ProcessTimeline` component (`src/components/ProcessTimeline.tsx`): `steps` array with `icon`, `title`, `description` — data-only changes plus possible icon swaps
- `SectionHeader` with variants already applied from Phase 6

### Established Patterns
- Service data is inline in `src/pages/HomePage.tsx` (lines 45-133) — 8 objects in `services` array
- Process steps are inline in `src/components/ProcessTimeline.tsx` (lines 43-79) — 7 objects in `steps` array
- Icons imported from `lucide-react` at top of each file
- Brand colors tokenized: `brand` (#1e3a5f), `accent` (#2563eb) — use tokens not hex
- Industrial heading font (Bebas Neue, uppercase) already applied to ServiceCard h3 and ProcessTimeline h3

### Integration Points
- `ServiceCard.tsx` line 24: hover gradient `from-blue-50` — change to `from-brand/5`
- `HomePage.tsx` lines 45-133: service data array — rewrite descriptions and bullets
- `ProcessTimeline.tsx` lines 43-79: steps data — rename titles and descriptions
- `ProcessTimeline.tsx` icon imports (line 2): may need different lucide-react icons for steps

</code_context>

<specifics>
## Specific Ideas

- Copy should sound like how a GC project manager talks: "on your timeline", "no schedule gaps", "minimal punch list", "first-pass inspections", "coordinates with other subs"
- Two-sentence pattern per service: "[Service] installed/delivered [GC benefit]. [CGI differentiator — single source, coordination, etc.]"
- "Same-day budgets" not "quotes" for commercial (content rule)
- "Minimal punch list" not "zero" (content rule)
- "3-5 business days" bid turnaround (content rule)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-service-copy-refinement*
*Context gathered: 2026-03-07*
