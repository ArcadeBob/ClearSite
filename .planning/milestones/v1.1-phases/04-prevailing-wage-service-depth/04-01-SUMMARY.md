---
phase: 04-prevailing-wage-service-depth
plan: "01"
subsystem: components/pages
tags: [prevailing-wage, components, content]
dependency_graph:
  requires: []
  provides: [PrevailingWageBanner component]
  affects: [HomePage, AboutPage, ContactPage]
tech_stack:
  added: []
  patterns: [named-export component, optional className prop, credentials.ts imports]
key_files:
  created:
    - src/components/PrevailingWageBanner.tsx
  modified:
    - src/pages/HomePage.tsx
    - src/pages/AboutPage.tsx
    - src/pages/ContactPage.tsx
decisions:
  - "PrevailingWageBanner accepts optional className prop to allow bg-slate-50 on HomePage and bg-white on AboutPage without conditional logic"
  - "Component placed as inline section (not App.tsx) to restrict display to HomePage and AboutPage only"
  - "Prevailing wage FAQ removed from ContactPage since PrevailingWageBanner provides deeper coverage in higher-traffic locations"
metrics:
  duration: "88 seconds"
  completed: "2026-03-05"
  tasks: 2
  files: 4
---

# Phase 4 Plan 1: Prevailing Wage Banner Summary

**One-liner:** PrevailingWageBanner component with 4 named wage types (PLA, Davis-Bacon, State PW, LAUSD) wired into HomePage and AboutPage; prevailing wage FAQ removed from ContactPage.

## What Was Built

### New Component: PrevailingWageBanner

`src/components/PrevailingWageBanner.tsx` — A named-export inline section component that surfaces CGI's prevailing wage experience where GCs evaluate subcontractors. The component:

- Displays 4 wage type cards in a 2-column grid (desktop) / stacked (mobile)
- Each card: icon + bold label + short description
- Imports `DIR_STATUS` and `PREVAILING_WAGE_STATUS` from `src/data/credentials`
- Accepts optional `className` prop for outer section background control
- Uses `SectionHeader` for the heading, consistent with project patterns
- Styled with rounded borders, subtle shadow, hover effects matching CertificationsBadges pattern

**Wage types covered:**
1. Project Labor Agreements (PLA) — hiring hall obligations, union coordination
2. Davis-Bacon Act — federal prevailing wage, certified payroll
3. State Prevailing Wage (CA) — DIR registered, certified payroll, DIR reporting
4. LAUSD & Institutional Projects — public-owner track record

### Page Integrations

**HomePage.tsx:** PrevailingWageBanner inserted between `<CertificationsBadges />` (bg-white) and `<GCPainPoints />` (bg-white) with `className="bg-slate-50"` for visual alternation.

**AboutPage.tsx:** PrevailingWageBanner inserted after `<SafetySection />` (bg-slate-50) with `className="bg-white"` to alternate backgrounds.

**ContactPage.tsx:** Prevailing wage FAQ entry removed. FAQ array reduced from 5 to 4 entries. Remaining entries: response time, service area, project size, how to get a bid.

## Decisions Made

1. **Optional className prop** — Rather than hardcoding the background color inside the component, an optional `className` prop enables each page to specify its own background. This keeps the component context-agnostic and avoids duplication.

2. **Inline section only (not App.tsx)** — Component is rendered directly in HomePage and AboutPage JSX, not the global layout. This ensures it appears only on those two pages and avoids z-index collision with FloatingCTA at z-40.

3. **FAQ removal without migration** — The prevailing wage FAQ answer is not migrated verbatim to the banner. The banner's card descriptions are rewritten for section-appropriate depth and format. The FAQ's brief answer is superseded by richer content in higher-traffic locations.

## Verification Results

- `npm run build` — passed, no errors
- `npm run lint` — passed, no warnings
- `grep PrevailingWageBanner src/pages/HomePage.tsx src/pages/AboutPage.tsx` — import and JSX usage on both pages confirmed
- `grep PrevailingWageBanner src/pages/ResidentialPage.tsx src/pages/ProjectsPage.tsx src/App.tsx` — no matches (correct)
- `grep "prevailing wage" src/pages/ContactPage.tsx` — 0 matches (correct)
- All 4 wage types (PLA, Davis-Bacon, State PW, LAUSD) present in component

## Task Commits

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Create PrevailingWageBanner and wire into HomePage and AboutPage | 956d9f0 | PrevailingWageBanner.tsx, HomePage.tsx, AboutPage.tsx |
| 2 | Remove prevailing wage FAQ from ContactPage | e3bec9e | ContactPage.tsx |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- `src/components/PrevailingWageBanner.tsx` — EXISTS
- `src/pages/HomePage.tsx` — modified, PrevailingWageBanner present
- `src/pages/AboutPage.tsx` — modified, PrevailingWageBanner present
- `src/pages/ContactPage.tsx` — modified, prevailing wage FAQ removed
- Commit 956d9f0 — EXISTS
- Commit e3bec9e — EXISTS
