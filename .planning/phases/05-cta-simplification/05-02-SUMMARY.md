---
phase: 05-cta-simplification
plan: "02"
subsystem: cta-links
tags: [cta, routing, contact-form, query-params]
dependency_graph:
  requires: ["05-01"]
  provides: ["CTA-01", "CTA-02"]
  affects: ["src/pages/HomePage.tsx", "src/pages/AboutPage.tsx", "src/pages/CaseStudyPage.tsx", "src/pages/ResidentialPage.tsx", "src/components/FloatingCTA.tsx", "src/components/GCResourcesSection.tsx"]
tech_stack:
  added: []
  patterns: ["query-string CTA routing", "react-router-dom Link to with search params"]
key_files:
  created: []
  modified:
    - src/pages/HomePage.tsx
    - src/pages/AboutPage.tsx
    - src/pages/CaseStudyPage.tsx
    - src/pages/ResidentialPage.tsx
    - src/components/FloatingCTA.tsx
    - src/components/GCResourcesSection.tsx
decisions:
  - "NotFoundPage plain /contact link is navigation context, not a CTA — left unchanged (not in research inventory)"
  - "FloatingCTA Download icon replaced with ArrowRight to match non-download intent of 'Request' action"
metrics:
  duration: "1 minute"
  completed_date: "2026-03-06"
  tasks_completed: 2
  files_modified: 6
---

# Phase 05 Plan 02: CTA Link Parameter Sweep Summary

All 8 commercial CTA links updated to `/contact?type=commercial` and 1 residential CTA to `/contact?type=residential`, with FloatingCTA text corrected from "Download Prequal Package" to "Request Prequal Package" and AboutPage bottom CTA corrected from "Get a Free Consultation" to "Request Prequal Package".

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Update commercial CTA links and text across all pages and components | fa96244 | HomePage.tsx, AboutPage.tsx, CaseStudyPage.tsx, FloatingCTA.tsx, GCResourcesSection.tsx |
| 2 | Update residential CTA link on ResidentialPage | 77762d5 | ResidentialPage.tsx |

## Changes Made

### Task 1: Commercial CTAs (5 files, 8 link updates, 3 text/icon changes)

**HomePage.tsx**
- Hero CTA (~line 277): `/contact` -> `/contact?type=commercial`
- Bottom CTA (~line 493): `/contact` -> `/contact?type=commercial`

**FloatingCTA.tsx**
- Link: `/contact` -> `/contact?type=commercial`
- Desktop text: "Download Prequal Package" -> "Request Prequal Package"
- Mobile text: "Get Package" -> "Get Prequal"
- Icon: `Download` -> `ArrowRight` (both decorative circle and button)
- Import: removed `Download`, added `ArrowRight`

**GCResourcesSection.tsx**
- InfoCard "Request COI" link: `/contact` -> `/contact?type=commercial`
- "Get in Touch" bottom CTA link: `/contact` -> `/contact?type=commercial`

**AboutPage.tsx**
- "Work With Us" link (~line 355): `/contact` -> `/contact?type=commercial`
- Bottom CTA link (~line 376): `/contact` -> `/contact?type=commercial`
- Bottom CTA text: "Get a Free Consultation" -> "Request Prequal Package"

**CaseStudyPage.tsx**
- Bottom CTA link (~line 525): `/contact` -> `/contact?type=commercial`

### Task 2: Residential CTA (1 file, 1 link update)

**ResidentialPage.tsx**
- Bottom CTA (~line 216): `/contact` -> `/contact?type=residential`
- Button text "Request a Quote" unchanged (already correct per CTA-02)

## Verification Results

| Check | Result |
|-------|--------|
| `?type=commercial` matches | 8 (correct) |
| `?type=residential` matches | 1 (correct) |
| "Download Prequal Package" remaining | 0 (removed) |
| "Get a Free Consultation" remaining | 0 (removed) |
| Plain `/contact` links | Footer.tsx (nav) + NotFoundPage.tsx (nav) only |
| `npm run build` | PASS |
| `npm run lint` | PASS |

## Deviations from Plan

### Minor finding: NotFoundPage.tsx plain `/contact` link

**Found during:** Task 2 (comprehensive grep)
**Issue:** NotFoundPage.tsx has a plain `/contact` link ("Contact Us") that was not in the research inventory.
**Decision:** Left unchanged. This is a navigation button on the 404 error page, not a CTA — it has no intent context (commercial vs. residential). No `?type=` parameter is appropriate.
**Files modified:** None (no action taken)

None of the other planned changes required deviation — plan executed as written for all 9 CTA link updates and 3 text/icon changes.

## Decisions Made

1. NotFoundPage plain `/contact` link is navigation context, not a CTA — left unchanged (not in research inventory)
2. FloatingCTA `Download` icon replaced with `ArrowRight` to match non-download intent of the "Request" action wording

## Self-Check

**Files exist:**
- [x] src/pages/HomePage.tsx (modified)
- [x] src/pages/AboutPage.tsx (modified)
- [x] src/pages/CaseStudyPage.tsx (modified)
- [x] src/pages/ResidentialPage.tsx (modified)
- [x] src/components/FloatingCTA.tsx (modified)
- [x] src/components/GCResourcesSection.tsx (modified)

**Commits exist:**
- [x] fa96244 — Task 1 commercial CTA updates
- [x] 77762d5 — Task 2 residential CTA update

## Self-Check: PASSED
