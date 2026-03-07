# Roadmap: ClearSite

## Milestones

- ✅ **v1.0 Content & Style Update** — Phases 1-2 (shipped 2026-03-03)
- ✅ **v1.1 Credibility & Conversion** — Phases 3-5 (shipped 2026-03-06)
- 🚧 **v1.2 GC Appeal & Design Polish** — Phases 6-8 (in progress)

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

### v1.2 GC Appeal & Design Polish

- [x] **Phase 6: Typography & Layout Foundation** - Industrial heading font and varied section header layouts site-wide (completed 2026-03-07)
- [ ] **Phase 7: Service & Copy Refinement** - GC-benefit copy, distinct service icons, and brand-consistent hover states
- [x] **Phase 8: Client Presentation & UX** - Distinctive client logo treatment and route-aware FloatingCTA (completed 2026-03-07)

## Phase Details

### Phase 6: Typography & Layout Foundation
**Goal**: The site's visual language feels industrial and intentional, breaking the template-generated sameness
**Depends on**: Nothing (first phase of v1.2)
**Requirements**: DSGN-01, DSGN-02
**Success Criteria** (what must be TRUE):
  1. Headings across all pages render in a bold/condensed industrial font distinct from body text
  2. Section headers on HomePage use at least 3 different visual layouts (left-aligned, full-width, overlapping) instead of uniform centered pattern
  3. The site no longer looks like every section was stamped from the same SectionHeader template
**Plans:** 2/2 plans complete

Plans:
- [ ] 06-01-PLAN.md — Add Bebas Neue font infrastructure and refactor SectionHeader into three-variant component
- [ ] 06-02-PLAN.md — Apply font and header variants site-wide across all pages and components

### Phase 7: Service & Copy Refinement
**Goal**: Service content speaks to GCs about project outcomes (schedule, coordination, callbacks) rather than glazing specs
**Depends on**: Phase 6 (header layouts may affect service section structure)
**Requirements**: COPY-01, COPY-02, DSGN-03, DSGN-04
**Success Criteria** (what must be TRUE):
  1. Each of the 8 service descriptions leads with GC benefits (schedule impact, coordination ease, minimal callbacks) not technical specifications
  2. Process Timeline steps use GC-project terminology (e.g. "Plan Review & Budget" not "Bid Request")
  3. Each service card displays a unique lucide-react icon — no two services share an icon
  4. ServiceCard hover effect uses brand navy/accent colors instead of generic Tailwind blue
**Plans:** 1 plan

Plans:
- [ ] 07-01-PLAN.md — Rewrite service copy with GC-benefit language, assign unique icons, fix hover colors, and update Process Timeline terminology

### Phase 8: Client Presentation & UX
**Goal**: Client credibility display and CTA behavior adapt to context, completing the polished GC-focused experience
**Depends on**: Phase 7 (service content complete before final UX pass)
**Requirements**: DSGN-05, UX-01
**Success Criteria** (what must be TRUE):
  1. Client logos display with a distinctive visual treatment that is not an infinite-scroll marquee
  2. FloatingCTA on `/residential` shows "Request a Quote" linking to `/contact?type=residential`
  3. FloatingCTA on all other pages shows "Request Prequal Package" linking to `/contact?type=commercial`
**Plans:** 1/1 plans complete

Plans:
- [ ] 08-01-PLAN.md — Redesign client logos as static grid with grayscale hover, make FloatingCTA route-aware and global

## Progress

**Execution Order:** 6 -> 7 -> 8

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Portfolio Status | v1.0 | 1/1 | Complete | 2026-03-02 |
| 2. Visual Polish | v1.0 | 2/2 | Complete | 2026-03-03 |
| 3. Safety Credentials Foundation | v1.1 | 1/1 | Complete | 2026-03-06 |
| 4. Prevailing Wage & Service Depth | v1.1 | 2/2 | Complete | 2026-03-06 |
| 5. CTA Simplification | v1.1 | 2/2 | Complete | 2026-03-06 |
| 6. Typography & Layout Foundation | v1.2 | 2/2 | Complete | 2026-03-07 |
| 7. Service & Copy Refinement | v1.2 | 0/1 | Not started | - |
| 8. Client Presentation & UX | 1/1 | Complete   | 2026-03-07 | - |
