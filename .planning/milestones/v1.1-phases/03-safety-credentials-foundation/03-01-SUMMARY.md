---
phase: 03-safety-credentials-foundation
plan: 01
subsystem: ui
tags: [react, typescript, tailwind, credentials, safety]

# Dependency graph
requires: []
provides:
  - src/data/credentials.ts single-source-of-truth for all credential constants (EMR, bonding, CSLB, SBE, DIR, OSHA)
  - SafetySection component with IIPP narrative, stat highlights, and owner review markers
  - SafetySection rendered on /about between Company Timeline and Mission sections
affects:
  - 03-safety-credentials-foundation (phase close requires owner sign-off on safety copy)
  - any future phase updating credential values

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Credential constants pattern: all static credential values live in src/data/credentials.ts, exported as named UPPER_SNAKE_CASE constants with `as const`"
    - "Owner review markers: draft content sections carry amber banner + [REVIEW:] JSX comments for grepable owner sign-off workflow"

key-files:
  created:
    - src/data/credentials.ts
    - src/components/SafetySection.tsx
  modified:
    - src/components/CertificationsBadges.tsx
    - src/components/StatsSection.tsx
    - src/components/GCResourcesSection.tsx
    - src/components/Footer.tsx
    - src/pages/ContactPage.tsx
    - src/pages/CaseStudyPage.tsx
    - src/pages/HomePage.tsx
    - src/pages/AboutPage.tsx

key-decisions:
  - "Static numbers only in SafetySection (no useCountUp/useOnceInView) -- locked decision, section is informational not promotional"
  - "bg-slate-50 background for SafetySection to match Company Timeline above -- two consecutive bg-slate-50 sections is acceptable; Mission section below uses bg-white providing visual break"
  - "SafetySection belongs only in AboutPage (not App.tsx or global layout) to avoid z-index collision with FloatingCTA at z-40"
  - "Prose references in HomePage hero text left as hardcoded strings with inline comment pointing to credentials.ts -- prose is not structured data"

patterns-established:
  - "Credentials pattern: named constants from src/data/credentials.ts replace all hardcoded credential strings in structured data arrays"
  - "Review marker pattern: draft safety/legal content gets amber banner + [REVIEW:] JSX comments for owner sign-off before phase closes"

requirements-completed: [CRED-01, SAFE-01, SAFE-02, SAFE-03]

# Metrics
duration: 18min
completed: 2026-03-06
---

# Phase 3 Plan 01: Safety Credentials Foundation Summary

**Credential constants module (src/data/credentials.ts) consolidates EMR 0.87, bonding, CSLB, DIR, SBE across 8 consumer files; SafetySection component with IIPP narrative and 5 owner review markers wired into /about**

## Performance

- **Duration:** ~18 min
- **Started:** 2026-03-06T05:15:00Z
- **Completed:** 2026-03-06T05:33:35Z
- **Tasks:** 2 of 2
- **Files modified:** 10

## Accomplishments

- Created `src/data/credentials.ts` with 17 named constants covering EMR, bonding, CSLB license, SBE cert, DIR status, and OSHA record
- Refactored 8 consumer files to import from credentials.ts — eliminated all duplicate `CSLB_LOOKUP_URL` local declarations
- Built `SafetySection` component with 3 stat highlight cards (EMR 0.87 with industry average context, Zero OSHA Incidents, $1M Bonding), amber draft banner, and 3-paragraph safety narrative covering IIPP, toolbox talks, PPE, fall protection
- Inserted SafetySection into /about between Company Timeline and Mission/Goal/Promise sections
- 5 grepable `[REVIEW:]` markers present for owner sign-off workflow

## Task Commits

1. **Task 1: Create credentials.ts constants module and refactor all consumer files** - `a4ad8e4` (feat)
2. **Task 2: Build SafetySection component and wire into AboutPage** - `06531d7` (feat)

## Files Created/Modified

- `src/data/credentials.ts` - Single source of truth for all credential constants (CSLB, SBE, EMR, bonding, OSHA, DIR)
- `src/components/SafetySection.tsx` - Safety program section with stat highlights, narrative paragraphs, amber review banner
- `src/components/CertificationsBadges.tsx` - Refactored: imports CSLB, SBE, EMR, OSHA, DIR constants
- `src/components/StatsSection.tsx` - Refactored: imports EMR_ANIMATE_INTEGER and OSHA_RECORD_DISPLAY
- `src/components/GCResourcesSection.tsx` - Refactored: imports EMR, bonding, CSLB constants for infoCards and quickFacts
- `src/components/Footer.tsx` - Refactored: imports CSLB_LICENSE_DISPLAY and DIR_STATUS
- `src/pages/ContactPage.tsx` - Refactored: imports CSLB, SBE, EMR, DIR constants; removed local CSLB_LOOKUP_URL
- `src/pages/CaseStudyPage.tsx` - Refactored: imports bonding, EMR, DIR constants for CTA badges
- `src/pages/HomePage.tsx` - Added inline comment pointing to credentials.ts near prose reference
- `src/pages/AboutPage.tsx` - Added SafetySection import + render; replaced License #965590 hardcode with template literal

## Decisions Made

- Static numbers only in SafetySection: no animation hooks (useCountUp, useOnceInView). Section is informational/credibility-focused, not promotional.
- SafetySection uses `bg-slate-50` matching Company Timeline above — two consecutive same-background sections is acceptable given Mission section below uses `bg-white` as visual separator.
- SafetySection placed only in AboutPage, not global layout, to avoid z-index collision with existing FloatingCTA (z-40).
- Prose embedded in HomePage hero text (`$1M bonding capacity, and a 0.87 EMR`) left as hardcoded with comment — prose interpolation would reduce readability without changing displayed content.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- CRED-01, SAFE-01, SAFE-02, SAFE-03 requirements fulfilled
- Owner review of SafetySection copy required before Phase 3 closes (per STATE.md blocker)
- Grep command for owner review: `grep -rn "\[REVIEW:" src/components/SafetySection.tsx`
- All 5 markers are in SafetySection.tsx lines 43, 79, 86, 89, 97

---
*Phase: 03-safety-credentials-foundation*
*Completed: 2026-03-06*
