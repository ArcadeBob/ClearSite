---
phase: 04-prevailing-wage-service-depth
plan: 02
subsystem: ui
tags: [react, typescript, tailwind, service-cards, content]

# Dependency graph
requires:
  - phase: 04-prevailing-wage-service-depth
    provides: PrevailingWageBanner component and HomePage integration from plan 04-01
provides:
  - ServiceCard component with optional bullets prop for technical capability display
  - All 8 HomePage service cards with 3 placeholder technical bullets each
  - Amber draft banner above services grid flagging content pending owner review
affects:
  - Any future plans that extend ServiceCard or the services data array

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Optional prop pattern: bullets?: string[] added to ServiceCard -- backward compatible with all existing callers"
    - "Section-level amber review banner pattern: one banner above section, no per-card banners"

key-files:
  created: []
  modified:
    - src/components/ServiceCard.tsx
    - src/pages/HomePage.tsx

key-decisions:
  - "Bullets rendered always-expanded (not accordion) -- GCs need to scan all capabilities at a glance, not click to expand"
  - "Single amber review banner above services grid (not per-card) -- cleaner visual, one clear review flag"
  - "No [REVIEW:] markers embedded in bullet strings -- visible to real users, section banner handles the review flag"
  - "bullets prop is optional (bullets?: string[]) -- existing callers without bullets still work unchanged"

patterns-established:
  - "Capability bullets pattern: text-xs text-slate-500 with bg-accent/60 dot, separated from description by border-t border-slate-100"
  - "Draft content banner: identical pattern to SafetySection amber banner (AlertTriangle + amber-50/300/800 color scheme)"

requirements-completed: [SERV-01, SERV-02]

# Metrics
duration: 3min
completed: 2026-03-06
---

# Phase 04 Plan 02: Service Capability Bullets Summary

**ServiceCard extended with optional bullets prop; all 8 homepage service cards now display 3 placeholder technical capability bullets with an amber owner-review banner above the grid**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-06T05:55:47Z
- **Completed:** 2026-03-06T05:58:11Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Extended ServiceCard with optional `bullets?: string[]` prop -- renders a subtle bullet list below description, fully backward compatible
- Added 24 technical capability bullets across all 8 service entries in HomePage (3 per service: Storefronts, Window Walls, Curtain Walls, Skylights, Glass Railings, Fire-Rated Glazing, Shower Enclosures, Mirrors)
- Added amber draft banner above services grid: "Draft service capability detail -- pending owner review and validation"

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend ServiceCard with optional bullets prop** - `59b8949` (feat)
2. **Task 2: Add service bullets data and amber review banner to HomePage** - `f4d0644` (feat)

## Files Created/Modified
- `src/components/ServiceCard.tsx` - Added `bullets?: string[]` prop with ul/li rendering below description paragraph
- `src/pages/HomePage.tsx` - Added AlertTriangle import, bullets arrays to all 8 services, amber draft review banner above services grid

## Decisions Made
- Bullets rendered always-expanded (not accordion) per research recommendation -- GCs scanning capabilities need instant visibility, not an extra click
- Single section-level amber banner above the grid rather than per-card banners -- cleaner, one clear review signal
- No `[REVIEW:]` text inside bullet strings -- those would be visible to real site visitors; the amber banner handles the review flag

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Edit tool rejected writes on HomePage.tsx due to git line-ending (LF -> CRLF) conversion changing the file hash between reads. Resolved by using Node.js to make all changes atomically in a single file write operation.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- ServiceCard bullets prop is available for any future service page work
- Owner review of technical bullet content is the next required action before these bullets ship to production
- Phase 04 plans 03+ (prevailing wage content) can proceed independently

---
*Phase: 04-prevailing-wage-service-depth*
*Completed: 2026-03-06*

## Self-Check: PASSED

- FOUND: src/components/ServiceCard.tsx
- FOUND: src/pages/HomePage.tsx
- FOUND: .planning/phases/04-prevailing-wage-service-depth/04-02-SUMMARY.md
- FOUND commit 59b8949: feat(04-02): extend ServiceCard with optional bullets prop
- FOUND commit f4d0644: feat(04-02): add service capability bullets and amber review banner to HomePage
