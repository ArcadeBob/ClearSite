# Roadmap: ClearSite Content & Style Update

## Overview

Two focused phases to deliver visual consistency and accurate portfolio data. Phase 1 updates project statuses in the hardcoded data. Phase 2 polishes the contact page hero and replaces the About page stock image. Both phases are independent file edits with no dependencies beyond the existing codebase.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Portfolio Status** - Move current projects to completed, future projects to current (completed 2026-03-02)
- [ ] **Phase 2: Visual Polish** - Restyle contact page hero and replace About page stock image

## Phase Details

### Phase 1: Portfolio Status
**Goal**: The projects portfolio reflects accurate, up-to-date status for every project
**Depends on**: Nothing (first phase)
**Requirements**: PORT-01, PORT-02
**Success Criteria** (what must be TRUE):
  1. No project on the Projects page shows "Current" status that was previously labeled "Current" — all such projects now display "Completed"
  2. No project on the Projects page shows "Future" status — all such projects now display "Current"
  3. The status filter tabs on the Projects page correctly surface projects under their new labels
**Plans:** 1/1 plans complete

Plans:
- [ ] 01-01-PLAN.md — Update all project status strings (Current->Completed, Future->Current) in ProjectsPage.tsx

### Phase 2: Visual Polish
**Goal**: Contact page hero matches the visual style of About and Projects pages, and About page shows a domain-appropriate crew/glazing image
**Depends on**: Phase 1
**Requirements**: CONT-01, ABUT-01
**Success Criteria** (what must be TRUE):
  1. The Contact page hero section visually matches the hero pattern on the About and Projects pages (same padding, layout, and decorative treatment)
  2. The About page brand story section displays a glazing/construction crew Unsplash photo instead of the current generic stock image
  3. The replaced About image fits within the existing image container without layout shifts or broken aspect ratios
**Plans:** 1/2 plans executed

Plans:
- [ ] 02-01-PLAN.md — Restyle ContactPage hero to match About/Projects hero pattern (CONT-01)
- [ ] 02-02-PLAN.md — Replace About page stock image with commercial glazing crew photo (ABUT-01)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Portfolio Status | 1/1 | Complete   | 2026-03-02 |
| 2. Visual Polish | 1/2 | In Progress|  |
