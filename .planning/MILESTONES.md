# Milestones

## v1.1 Credibility & Conversion (Shipped: 2026-03-06)

**Phases completed:** 3 phases, 5 plans, 10 tasks
**Timeline:** 4 days (2026-03-03 → 2026-03-06)
**Git range:** `c35f49d` docs(03) → `7b94ae1` docs(v1.1)
**LOC:** +6,302 / -298 across 56 files

**Key accomplishments:**
- Credential constants module (`src/data/credentials.ts`) consolidates EMR, bonding, CSLB, DIR, SBE across 8 consumer files — single source of truth
- SafetySection component with IIPP narrative, stat highlights (EMR 0.87, Zero OSHA, $1M Bonding), and 5 owner review markers on About page
- PrevailingWageBanner with 4 named wage types (PLA, Davis-Bacon, State PW, LAUSD) on HomePage and AboutPage
- ServiceCard extended with 24 technical capability bullets across all 8 services, amber draft banner for owner review
- Contact form auto-detects `?type=` URL parameter for commercial/residential routing with Formspree hidden field labeling
- All 9 CTA links unified to two paths: "Request Prequal Package" (commercial) and "Request a Quote" (residential)

**Tech debt carried forward:**
- 5 owner review markers in SafetySection.tsx pending sign-off
- 24 placeholder service bullets pending owner validation
- Formspree inbox E2E test not yet performed

---

## v1.0 ClearSite Content & Style Update (Shipped: 2026-03-03)

**Phases completed:** 2 phases, 3 plans, 6 tasks
**Timeline:** 2 days (2026-03-02 → 2026-03-03)
**Git range:** `cdf509d` feat(01-01) → `c6da174` feat(02-02)

**Key accomplishments:**
- Updated 7 project status strings — 4 Current→Completed, 3 Future→Current across all 17 projects
- Contact page hero replaced from SectionHeader to raw h1+p markup matching About/Projects hero pattern
- About page brand story image replaced with domain-appropriate commercial glazing crew photo (photo-1565008447742)
- All three top-level pages (About, Projects, Contact) now share identical hero section pattern

---

