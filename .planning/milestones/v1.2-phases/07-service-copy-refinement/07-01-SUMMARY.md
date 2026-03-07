---
phase: 07-service-copy-refinement
plan: 01
subsystem: ui
tags: [react, tailwind, lucide-react, copy, services, timeline]

# Dependency graph
requires:
  - phase: 06-typography-layout
    provides: Brand heading styles and SectionHeader variants used by ServiceCard and ProcessTimeline
provides:
  - GC-benefit service descriptions with unique icons for all 8 services
  - Brand-consistent hover gradient on ServiceCard
  - GC-terminology process timeline with 7 rewritten steps
affects: [07-service-copy-refinement]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Two-sentence service description pattern: GC benefit + CGI differentiator"
    - "GC-outcome bullets instead of technical spec bullets"

key-files:
  created: []
  modified:
    - src/pages/HomePage.tsx
    - src/components/ServiceCard.tsx
    - src/components/ProcessTimeline.tsx

key-decisions:
  - "Used border-brand/30 instead of border-accent/30 for hover border consistency with brand/5 gradient"
  - "Selected CalendarCheck for Scope & Schedule, FileCheck for Submittals, Factory for Fabrication to differentiate timeline steps"
  - "Named final timeline step 'Closeout & Warranty' to cover both punchlist turnover and warranty documentation"

patterns-established:
  - "Service copy pattern: Sentence 1 = GC benefit, Sentence 2 = CGI differentiator"
  - "Bullet pattern: 3 GC-outcome bullets per service (schedule, coordination, punch list)"

requirements-completed: [COPY-01, COPY-02, DSGN-03, DSGN-04]

# Metrics
duration: 2min
completed: 2026-03-07
---

# Phase 07 Plan 01: Service Copy Refinement Summary

**GC-benefit service copy with unique icons for 8 services, brand hover gradient, and GC-terminology process timeline**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-07T20:32:37Z
- **Completed:** 2026-03-07T20:34:48Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Rewrote all 8 service descriptions from technical specs to GC-benefit language (schedule, coordination, callbacks)
- Assigned unique lucide-react icons to all 8 services (eliminated 3 duplicate Maximize icons)
- Updated ServiceCard hover gradient from generic blue-50 to brand/5 for brand consistency
- Rewrote all 7 Process Timeline steps with GC-project terminology, step 1 renamed to "Budget Request"

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite service copy, assign unique icons, and fix hover color** - `c5487a6` (feat)
2. **Task 2: Rewrite Process Timeline with GC terminology** - `9d95dbb` (feat)

## Files Created/Modified
- `src/pages/HomePage.tsx` - Rewritten services array with GC-benefit copy, unique icons, and updated imports
- `src/components/ServiceCard.tsx` - Hover gradient changed from blue-50 to brand/5, border from accent/30 to brand/30
- `src/components/ProcessTimeline.tsx` - All 7 steps rewritten with GC terminology, unique icons per step

## Decisions Made
- Changed hover border from `border-accent/30` to `border-brand/30` for consistency with the brand/5 gradient background
- Selected icon mapping: DoorOpen (Storefronts), PanelTop (Window Walls), Building2 (Curtain Walls), Sun (Skylights), Fence (Glass Railings), Shield (Fire-Rated), Bath (Shower Enclosures), RectangleHorizontal (Mirrors)
- Named final timeline step "Closeout & Warranty" to encompass both punchlist turnover and warranty documentation
- Used CalendarCheck, FileCheck, and Factory icons to differentiate timeline steps that previously shared duplicate icons

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Service and process content now speaks to GC project managers
- Ready for next plan in phase 07 or subsequent phases
- All content rules followed (same-day budgets, minimal punch list, 3-5 business days)

---
*Phase: 07-service-copy-refinement*
*Completed: 2026-03-07*
