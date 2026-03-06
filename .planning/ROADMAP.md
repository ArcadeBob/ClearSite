# Roadmap: ClearSite

## Milestones

- ✅ **v1.0 Content & Style Update** — Phases 1-2 (shipped 2026-03-03)
- 🚧 **v1.1 Credibility & Conversion** — Phases 3-5 (in progress)

## Phases

<details>
<summary>✅ v1.0 Content & Style Update (Phases 1-2) — SHIPPED 2026-03-03</summary>

- [x] Phase 1: Portfolio Status (1/1 plans) — completed 2026-03-02
- [x] Phase 2: Visual Polish (2/2 plans) — completed 2026-03-03

</details>

### 🚧 v1.1 Credibility & Conversion (In Progress)

**Milestone Goal:** Strengthen CGI's credibility for commercial GCs by surfacing safety credentials, prevailing wage experience, and technical service depth — while simplifying the conversion path.

#### Phase Checklist

- [x] **Phase 3: Safety Credentials Foundation** - Consolidate credential data and add safety program section to About page (completed 2026-03-06)
- [x] **Phase 4: Prevailing Wage & Service Depth** - Add prevailing wage banner sitewide and expand service card technical detail (completed 2026-03-06)
- [ ] **Phase 5: CTA Simplification** - Unify all CTAs to two clear commercial/residential paths with form auto-tagging

## Phase Details

### Phase 3: Safety Credentials Foundation
**Goal**: Visitors to the About page can evaluate CGI's safety program depth — not just a raw EMR number, but a narrative covering training practices, incident prevention, and certifications
**Depends on**: Phase 2 (v1.0 complete)
**Requirements**: CRED-01, SAFE-01, SAFE-02, SAFE-03
**Success Criteria** (what must be TRUE):
  1. A GC can find EMR 0.87 displayed on the About page with the industry-average benchmark (1.0) stated for context
  2. A GC can read a safety narrative on the About page covering training practices, IIPP program reference, and incident prevention protocols
  3. Credential data (EMR, OSHA, bonding, CSLB, DIR) is sourced from a single constants file — no hardcoded string literals duplicated across components
  4. Safety section content is visibly flagged for owner review (bracketed placeholders or dev-only indicator) before the section is considered final
**Plans**: 1 plan

Plans:
- [x] 03-01-PLAN.md — Extract credential constants and build SafetySection component

### Phase 4: Prevailing Wage & Service Depth
**Goal**: GCs and estimators can see CGI's named prevailing wage experience and assess technical bid eligibility from expanded service capability detail
**Depends on**: Phase 3
**Requirements**: WAGE-01, WAGE-02, SERV-01, SERV-02
**Success Criteria** (what must be TRUE):
  1. A banner or badge naming PLA, Davis-Bacon, LAUSD, and State Prevailing Wage is visible on the HomePage and About page (not on Residential, Projects, or 404 pages)
  2. The Contact page FAQ no longer contains prevailing wage content (it has moved to the dedicated banner component)
  3. Each service card displays technical capability bullets (system types, typical applications) either inline or as expandable detail
  4. Service capability bullets are visibly marked as mock/placeholder content pending owner review and validation
**Plans**: 2 plans

Plans:
- [ ] 04-01-PLAN.md — Build PrevailingWageBanner component, wire into HomePage and AboutPage, remove Contact FAQ entry
- [ ] 04-02-PLAN.md — Extend ServiceCard with technical capability bullets and amber review banner

### Phase 5: CTA Simplification
**Goal**: Every visitor — commercial GC or residential homeowner — sees a CTA that matches their context and arrives at a contact form pre-tagged to their path
**Depends on**: Phase 4
**Requirements**: CTA-01, CTA-02, CTA-03
**Success Criteria** (what must be TRUE):
  1. Every commercial CTA across all pages reads "Request Prequal Package" and links to the contact form with a commercial type parameter
  2. Every residential CTA across all pages reads "Request a Quote" and links to the contact form with a residential type parameter
  3. The contact form auto-detects the type URL parameter and pre-selects the correct commercial or residential path on arrival
  4. A Formspree inbox test confirms that commercial and residential submissions appear with distinct labels (end-to-end verification, not just UI verification)
**Plans**: TBD

Plans:
- [ ] 05-01: Update ContactForm and ContactPage with inquiryType prop and useSearchParams
- [ ] 05-02: CTA link sweep across all pages and FloatingCTA — update to ?type= parameters

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Portfolio Status | v1.0 | 1/1 | Complete | 2026-03-02 |
| 2. Visual Polish | v1.0 | 2/2 | Complete | 2026-03-03 |
| 3. Safety Credentials Foundation | v1.1 | 1/1 | Complete | 2026-03-06 |
| 4. Prevailing Wage & Service Depth | 2/2 | Complete   | 2026-03-06 | - |
| 5. CTA Simplification | v1.1 | 0/2 | Not started | - |
