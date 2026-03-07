---
phase: 08-client-presentation-ux
plan: 01
subsystem: ui
tags: [react, tailwind, client-logos, floating-cta, route-aware]

requires:
  - phase: 06-visual-brand-consistency
    provides: Brand color tokens and SectionHeader component
provides:
  - Static grid ClientLogos component with grayscale hover effect
  - Route-aware FloatingCTA with residential/commercial variants
  - Global FloatingCTA rendering from App.tsx layout
affects: []

tech-stack:
  added: []
  patterns: [route-aware component behavior via useLocation]

key-files:
  created: []
  modified:
    - src/components/ClientLogos.tsx
    - src/components/FloatingCTA.tsx
    - src/App.tsx
    - src/pages/HomePage.tsx

key-decisions:
  - "Used CSS grid (2/3/5 cols) for client logos instead of flexbox for cleaner responsive layout"
  - "FloatingCTA placed after Footer in DOM order since it uses fixed positioning"

patterns-established:
  - "Route-aware components: use useLocation().pathname for conditional rendering by route"

requirements-completed: [DSGN-05, UX-01]

duration: 1min
completed: 2026-03-07
---

# Phase 08 Plan 01: Client Presentation & UX Summary

**Static grid client logos with grayscale-to-color hover, and route-aware FloatingCTA showing residential vs commercial copy on every page**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-07T22:20:08Z
- **Completed:** 2026-03-07T22:21:25Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Replaced infinite-scroll marquee with professional B2B static grid layout for client logos
- Made FloatingCTA context-aware: shows "Request a Quote" on /residential, "Request Prequal Package" on all other pages
- Moved FloatingCTA from HomePage-only to global App.tsx layout so it appears on every page

## Task Commits

Each task was committed atomically:

1. **Task 1: Redesign ClientLogos with static grid and grayscale hover** - `cc5ace4` (feat)
2. **Task 2: Make FloatingCTA route-aware and move to App.tsx global layout** - `b9705e6` (feat)

## Files Created/Modified
- `src/components/ClientLogos.tsx` - Rewritten from marquee to responsive CSS grid with grayscale hover effect and client name labels
- `src/components/FloatingCTA.tsx` - Added useLocation for route-aware headline, subtext, button text, and link targets
- `src/App.tsx` - Added FloatingCTA import and render in global layout after Footer
- `src/pages/HomePage.tsx` - Removed FloatingCTA import and render (now handled by App.tsx)

## Decisions Made
- Used CSS grid with 2/3/5 column breakpoints to fit all 10 logos in 2 rows on desktop
- Placed FloatingCTA after Footer in App.tsx DOM order (fixed positioning means no layout impact)
- Used group hover pattern for logo cards so hovering the card area triggers grayscale removal

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Client logos and FloatingCTA are production-ready
- All pre-existing TypeScript warnings remain unchanged (not caused by this plan)

---
*Phase: 08-client-presentation-ux*
*Completed: 2026-03-07*
