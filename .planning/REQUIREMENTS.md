# Requirements: ClearSite

**Defined:** 2026-03-05
**Core Value:** Professional credibility for a commercial glazing subcontractor — accurate project data, consistent visual presentation, and clear CTAs for general contractors.

## v1.1 Requirements

Requirements for Credibility & Conversion milestone. Each maps to roadmap phases.

### Credentials Data

- [x] **CRED-01**: Credential data (EMR, OSHA, bonding, CSLB, DIR, certifications) consolidated into a shared constants file — single source of truth across all pages

### Safety Program

- [x] **SAFE-01**: About page displays safety program section with EMR rate, OSHA incident record, and certification details
- [x] **SAFE-02**: About page displays safety management narrative covering training practices, incident prevention protocols, and IIPP program (mock content for owner review)
- [x] **SAFE-03**: Safety section content flagged for owner review before considered final

### Prevailing Wage

- [x] **WAGE-01**: Prevailing wage badge/banner component visible on HomePage and AboutPage naming PLA, Davis-Bacon, LAUSD, and State Prevailing Wage experience
- [x] **WAGE-02**: Prevailing wage content removed from Contact page FAQ (moved to dedicated component)

### Service Depth

- [ ] **SERV-01**: Each service card displays technical capability bullets (system types, typical applications) as expandable or inline detail
- [ ] **SERV-02**: Service capability content is mock/placeholder for owner review and validation

### CTA Simplification

- [ ] **CTA-01**: All commercial CTAs read "Request Prequal Package" and link to contact form with commercial auto-tag
- [ ] **CTA-02**: All residential CTAs read "Request a Quote" and link to contact form with residential auto-tag
- [ ] **CTA-03**: Contact form auto-detects intent from URL parameter and pre-selects commercial or residential path

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Service Pages

- **SERV-03**: Each service gets a dedicated route (/services/curtain-walls, etc.) with full technical detail and project examples
- **SERV-04**: Service pages include manufacturer partnerships and system specifications

### Safety Depth

- **SAFE-04**: Safety page with downloadable safety manual summary (after owner provides content)
- **SAFE-05**: Project-specific safety metrics on case study pages

## Out of Scope

| Feature | Reason |
|---------|--------|
| Downloadable PDF prequal package | Goes stale, worse than no PDF — anti-feature per research |
| Separate forms per audience | Doubles maintenance, same form with auto-tagging is sufficient |
| Animated safety stat counters | Trivializes serious data per research |
| OSHA 300 log display | Legal exposure, not industry standard |
| OAuth/login functionality | Static marketing site, no user accounts needed |
| Backend API integration | Site remains static/hardcoded |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CRED-01 | Phase 3 | Complete |
| SAFE-01 | Phase 3 | Complete |
| SAFE-02 | Phase 3 | Complete |
| SAFE-03 | Phase 3 | Complete |
| WAGE-01 | Phase 4 | Complete |
| WAGE-02 | Phase 4 | Complete |
| SERV-01 | Phase 4 | Pending |
| SERV-02 | Phase 4 | Pending |
| CTA-01 | Phase 5 | Pending |
| CTA-02 | Phase 5 | Pending |
| CTA-03 | Phase 5 | Pending |

**Coverage:**
- v1.1 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-05*
*Last updated: 2026-03-05 — traceability filled after roadmap creation*
