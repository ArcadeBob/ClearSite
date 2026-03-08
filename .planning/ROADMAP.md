# Roadmap: ClearSite

## Milestones

- ✅ **v1.0 Content & Style Update** — Phases 1-2 (shipped 2026-03-03)
- ✅ **v1.1 Credibility & Conversion** — Phases 3-5 (shipped 2026-03-06)
- ✅ **v1.2 GC Appeal & Design Polish** — Phases 6-8 (shipped 2026-03-07)
- 🚧 **v1.3 Design Review & UX Polish** — Phases 9-11 (in progress)

## Phases

<details>
<summary>✅ v1.0 Content & Style Update (Phases 1-2) — SHIPPED 2026-03-03</summary>

- [x] Phase 1: Portfolio Status (1/1 plans) — completed 2026-03-02
- [x] Phase 2: Visual Polish (2/2 plans) — completed 2026-03-03

</details>

<details>
<summary>✅ v1.1 Credibility & Conversion (Phases 3-5) — SHIPPED 2026-03-06</summary>

- [x] Phase 3: Safety Credentials Foundation (1/1 plans) — completed 2026-03-06
- [x] Phase 4: Prevailing Wage & Service Depth (2/2 plans) — completed 2026-03-06
- [x] Phase 5: CTA Simplification (2/2 plans) — completed 2026-03-06

</details>

<details>
<summary>✅ v1.2 GC Appeal & Design Polish (Phases 6-8) — SHIPPED 2026-03-07</summary>

- [x] Phase 6: Typography & Layout Foundation (2/2 plans) — completed 2026-03-07
- [x] Phase 7: Service & Copy Refinement (1/1 plans) — completed 2026-03-07
- [x] Phase 8: Client Presentation & UX (1/1 plans) — completed 2026-03-07

</details>

### 🚧 v1.3 Design Review & UX Polish (In Progress)

**Milestone Goal:** Address design review findings — fix stats bug, reduce homepage density, refine typography, improve visual variety, and polish UX interactions across the site.

- [x] **Phase 9: Homepage & Visual Foundation** - Fix stats bug, reduce hero/section density, refine typography and section backgrounds
- [x] **Phase 10: Component UX Polish** - Improve service cards, process timeline, contact sidebar, and FloatingCTA behavior (completed 2026-03-08)
- [ ] **Phase 11: Page Structure & Navigation** - Upgrade inner page headers, project card interaction, footer, and About page image

## Phase Details

### Phase 9: Homepage & Visual Foundation
**Goal**: The homepage loads with correct data, reduced density, and refined visual rhythm so trust signals appear above the fold
**Depends on**: Phase 8
**Requirements**: BUG-01, HOME-01, HOME-02, HOME-03, TYPO-01, VIZZ-01
**Success Criteria** (what must be TRUE):
  1. Stats section displays "13+" years (not "7") when the counter animation completes
  2. Trust signals (client logos or certifications) are visible without scrolling on a standard 1080p display
  3. Prequal cards and certifications appear as a single compact band, not two separate full-height sections
  4. Owner quote no longer appears on the homepage (moved to About page)
  5. Card titles and smaller headings render in the body sans-serif font, with Bebas Neue reserved for hero titles and major section headers only
**Plans**: 2 plans

Plans:
- [x] 09-01-PLAN.md — Fix stats bug, reduce hero height, move owner quote, alternate section backgrounds
- [x] 09-02-PLAN.md — Consolidate trust band, restrict Bebas Neue to major headers only

### Phase 10: Component UX Polish
**Goal**: Individual components feel tighter and smarter — service cards show visual context, timeline wastes no space, contact sidebar adds value, and the FloatingCTA stays out of the way when not needed
**Depends on**: Phase 9
**Requirements**: VIZZ-02, UX-01, UX-02, UX-03
**Success Criteria** (what must be TRUE):
  1. Each service card displays a thumbnail image relevant to that service type
  2. Process timeline steps are visually compact with no excessive whitespace between steps
  3. Contact page sidebar includes additional useful content (prequal checklist or equivalent) beyond basic contact info
  4. FloatingCTA automatically hides when an inline CTA button is visible in the viewport, and reappears when scrolled past
**Plans**: 2 plans

Plans:
- [ ] 10-01-PLAN.md — Add service card thumbnail images and reduce timeline spacing
- [ ] 10-02-PLAN.md — Inquiry-aware contact sidebar and FloatingCTA smart hide

### Phase 11: Page Structure & Navigation
**Goal**: Inner pages feel polished and consistent — richer headers, intuitive project card interaction, streamlined footer, and a relevant About page image
**Depends on**: Phase 9
**Requirements**: PAGE-01, PAGE-02, PAGE-03, ABOUT-01
**Success Criteria** (what must be TRUE):
  1. Inner page headers (About, Projects, Contact, Residential) display a richer visual treatment than plain navy banners
  2. Clicking a project card navigates to its case study page; the flip animation only triggers via a dedicated "Quick Stats" button
  3. Footer displays 3 columns (Company, Contact, Certifications) instead of 4
  4. About page displays a glazing-relevant photo (storefront or curtain wall detail) instead of the current image
**Plans**: TBD

Plans:
- [ ] 11-01: TBD
- [ ] 11-02: TBD

## Progress

**Execution Order:**
Phases 10 and 11 can run in parallel after Phase 9 completes. Phase 10 touches components (ServiceCard, ProcessTimeline, ContactPage sidebar, FloatingCTA). Phase 11 touches page headers, ProjectsPage cards, Footer, and AboutPage image. No file conflicts.

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Portfolio Status | v1.0 | 1/1 | Complete | 2026-03-02 |
| 2. Visual Polish | v1.0 | 2/2 | Complete | 2026-03-03 |
| 3. Safety Credentials Foundation | v1.1 | 1/1 | Complete | 2026-03-06 |
| 4. Prevailing Wage & Service Depth | v1.1 | 2/2 | Complete | 2026-03-06 |
| 5. CTA Simplification | v1.1 | 2/2 | Complete | 2026-03-06 |
| 6. Typography & Layout Foundation | v1.2 | 2/2 | Complete | 2026-03-07 |
| 7. Service & Copy Refinement | v1.2 | 1/1 | Complete | 2026-03-07 |
| 8. Client Presentation & UX | v1.2 | 1/1 | Complete | 2026-03-07 |
| 9. Homepage & Visual Foundation | v1.3 | 2/2 | Complete | 2026-03-08 |
| 10. Component UX Polish | 2/2 | Complete    | 2026-03-08 | - |
| 11. Page Structure & Navigation | v1.3 | 0/? | Not started | - |
