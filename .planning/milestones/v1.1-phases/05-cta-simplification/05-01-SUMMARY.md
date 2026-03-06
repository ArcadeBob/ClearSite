---
phase: 05-cta-simplification
plan: 01
subsystem: ui
tags: [react, react-router-dom, formspree, typescript, contact-form]

# Dependency graph
requires: []
provides:
  - ContactForm accepts optional inquiryType prop ('commercial' | 'residential'), defaults to 'commercial'
  - ContactPage reads ?type= URL parameter and passes inquiryType to ContactForm
  - Formspree submissions include hidden inquiryType and _subject fields for email labeling
  - Page and form headings/subtitles adapt conditionally to commercial vs residential visitor context
affects:
  - 05-cta-simplification (Plan 02 — CTA links will send ?type= parameters to this page)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - URL parameter-driven page variation via useSearchParams in page component (not in child component)
    - Presentational child component receives intent via props; page owns URL reading logic

key-files:
  created: []
  modified:
    - src/components/ContactForm.tsx
    - src/pages/ContactPage.tsx

key-decisions:
  - "inquiryType prop is optional with default 'commercial' — existing callers without the prop still work unchanged"
  - "useSearchParams lives in ContactPage only (not ContactForm) — ContactForm remains presentational, per plan anti-pattern guidance"
  - "Any ?type= value that is not exactly 'residential' defaults to 'commercial', including null/missing/invalid values"

patterns-established:
  - "URL parameter reading pattern: page reads searchParams, derives typed value with safe default, passes to child as prop"

requirements-completed: [CTA-03]

# Metrics
duration: 2min
completed: 2026-03-06
---

# Phase 05 Plan 01: CTA URL Parameter Routing Summary

**ContactPage reads ?type=commercial|residential URL parameter and routes visitors to context-appropriate headings, while ContactForm sends labeled Formspree submissions via hidden inquiryType and _subject inputs**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-06T14:04:07Z
- **Completed:** 2026-03-06T14:05:32Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- ContactForm extended with optional `inquiryType` prop (defaults to 'commercial') and two hidden inputs for Formspree payload labeling
- ContactPage reads `?type=` URL parameter via useSearchParams, derives typed inquiryType, passes to ContactForm
- Page hero h1/p and form section h2/p render conditionally based on inquiryType — commercial and residential visitors see distinct, contextually appropriate copy
- Default route (`/contact` with no parameter) shows commercial framing, preserving existing GC-targeted behavior

## Task Commits

Each task was committed atomically:

1. **Task 1: Add inquiryType prop to ContactForm with hidden inputs** - `c9a1901` (feat)
2. **Task 2: Add useSearchParams to ContactPage and conditional heading** - `1047887` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/components/ContactForm.tsx` — Added ContactFormProps interface, updated function signature to accept inquiryType, added hidden inquiryType and _subject inputs inside form
- `src/pages/ContactPage.tsx` — Added useSearchParams import, inquiryType derivation, four conditional text variables, updated h1/p/h2/p and ContactForm render

## Decisions Made

- inquiryType prop is optional with default 'commercial' — existing callers without the prop still work unchanged, no breaking changes
- useSearchParams lives in ContactPage only (not ContactForm) — ContactForm remains a presentational component receiving intent via props, per plan anti-pattern guidance
- Any ?type= value that is not exactly 'residential' defaults to 'commercial', including null/missing/arbitrary values

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 01 complete: the receiving end of the URL parameter routing is built and verified
- Plan 02 can now update all CTA links across the site to send `?type=commercial` or `?type=residential` to drive visitors to the appropriate contact form framing
- Formspree external verification (checking that commercial/residential submissions show distinct labels in the inbox) is noted in STATE.md as a Phase 5 external dependency

## Self-Check: PASSED

- src/components/ContactForm.tsx: FOUND
- src/pages/ContactPage.tsx: FOUND
- .planning/phases/05-cta-simplification/05-01-SUMMARY.md: FOUND
- Commit c9a1901: FOUND (Task 1)
- Commit 1047887: FOUND (Task 2)

---
*Phase: 05-cta-simplification*
*Completed: 2026-03-06*
