---
phase: quick-2
plan: 01
subsystem: ui
tags: [content-fixes, tailwind, react]

requires: []
provides:
  - "Corrected punch-list wording site-wide"
  - "Removed draft banners from HomePage and SafetySection"
  - "Em-dash typography in SafetySection"
  - "Privacy consent text without dead link in ContactForm"
affects: []

tech-stack:
  added: []
  patterns: []

key-files:
  created: []
  modified:
    - src/components/GCPainPoints.tsx
    - src/components/SectionHeader.tsx
    - src/pages/HomePage.tsx
    - src/components/SafetySection.tsx
    - src/components/ContactForm.tsx

key-decisions:
  - "Made overlapping SectionHeader variant render identically to left-bar instead of deleting it, to avoid breaking call sites in AboutPage and CaseStudyPage"
  - "Replaced privacy policy reference with consent language rather than creating a privacy policy page"

patterns-established: []

requirements-completed: [SITE-REVIEW-FIXES]

duration: 1min
completed: 2026-03-07
---

# Quick Task 2: Site Review Fixes Summary

**Five content/display fixes: punch-list wording corrected, draft banners removed, em-dashes applied, ghost text eliminated, privacy policy reference replaced with consent language**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-07T23:54:10Z
- **Completed:** 2026-03-07T23:55:24Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Changed "Zero Punch-List Goal" to "Minimal Punch-List Goal" with matching description and metric in GCPainPoints
- Replaced overlapping SectionHeader variant ghost text (large faded duplicate title) with standard left-bar layout
- Removed DEV-gated draft/review banners from HomePage and SafetySection
- Replaced double hyphens with proper em-dashes in SafetySection safety narrative
- Updated ContactForm consent text to remove reference to nonexistent privacy policy page

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix punch-list wording and ghost text** - `5617eda` (fix)
2. **Task 2: Remove draft banners, fix em-dashes, fix privacy text** - `d7ff5db` (fix)

## Files Created/Modified
- `src/components/GCPainPoints.tsx` - Updated punch-list wording from "zero" to "minimal"
- `src/components/SectionHeader.tsx` - Replaced overlapping variant ghost text with left-bar layout
- `src/pages/HomePage.tsx` - Removed DEV-gated draft banner and unused AlertTriangle import
- `src/components/SafetySection.tsx` - Removed draft banner, replaced double hyphens with em-dashes
- `src/components/ContactForm.tsx` - Replaced privacy policy reference with consent language

## Decisions Made
- Made overlapping SectionHeader variant render identically to left-bar instead of deleting the variant, preserving call sites in AboutPage and CaseStudyPage without touching those files
- Replaced privacy policy text with consent language rather than creating a privacy policy page (no such page exists in the app)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Removed unused AlertTriangle import from HomePage**
- **Found during:** Task 2 (removing draft banner)
- **Issue:** After removing the banner JSX, AlertTriangle import became unused, which would cause lint warnings
- **Fix:** Removed AlertTriangle from the lucide-react import
- **Files modified:** src/pages/HomePage.tsx
- **Verification:** Build succeeds with no warnings
- **Committed in:** d7ff5db (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Trivial cleanup of unused import after planned removal. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Verification Results
- `npm run build` -- succeeds
- `grep "Zero Punch" src/` -- no matches
- `grep "Draft.*pending" src/` -- no matches
- `grep " -- " src/components/SafetySection.tsx` -- no matches
- `grep "privacy policy" src/` -- no matches

---
*Quick Task: 2-site-review-fixes*
*Completed: 2026-03-07*
