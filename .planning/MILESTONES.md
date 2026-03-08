# Milestones

## v1.3 Design Review & UX Polish (Shipped: 2026-03-08)

**Phases completed:** 3 phases, 6 plans, 12 tasks
**Timeline:** 2 days (2026-03-07 → 2026-03-08)
**Git range:** `c8bc38a` feat(09-01) → `d722b6e` feat(11-02)
**LOC:** +292 / -179 across 17 files

**Key accomplishments:**
- Fixed stats counter bug (7→13+) and reduced homepage density with 65vh hero + consolidated trust band (prequal + certifications)
- Refined typography hierarchy — Bebas Neue restricted to h1/h2 hero titles, sans-serif for card h3/h4 headings
- Added Unsplash thumbnail images to all 8 service cards with gradient overlay treatment
- Smart FloatingCTA with IntersectionObserver auto-hides when inline CTAs are in viewport
- Inquiry-type-aware contact sidebar: commercial shows prequal checklist, residential shows service highlights
- Upgraded all inner page headers from plain navy banners to gradient + diagonal stripe + accent bar treatment
- Refactored ProjectCard: body click navigates to case study, dedicated Quick Stats button triggers flip animation
- Footer consolidated from 4 columns to 3 (Quick Links merged into Contact column)

**Tech debt carried forward:**
- ContactPage.tsx line 269 — `{/* Map Placeholder */}` comment (pre-existing)
- TS6133 warnings for unused React imports across multiple page files (pre-existing)

---

## v1.2 GC Appeal & Design Polish (Shipped: 2026-03-07)

**Phases completed:** 3 phases, 4 plans, 8 tasks
**Timeline:** 1 day (2026-03-07)
**Git range:** `eec47ca` feat(06-01) → `b9705e6` feat(08-01)
**LOC:** +1,653 / -223 across 44 files

**Key accomplishments:**
- Bebas Neue industrial heading font applied to every heading across 21 files via font-heading Tailwind utility
- SectionHeader refactored into 3 layout variants (left-bar, banner, overlapping) with visual rhythm optimization across 19 consumers
- All 8 service descriptions rewritten from technical specs to GC-benefit language (schedule, coordination, callbacks)
- Process Timeline rewritten with GC-project terminology across 7 steps
- Unique lucide-react icons assigned to all 8 services, ServiceCard hover gradient updated to brand colors
- Client logos replaced from infinite-scroll marquee to static CSS grid with grayscale-to-color hover
- FloatingCTA made route-aware and global: "Request a Quote" on /residential, "Request Prequal Package" elsewhere

**Tech debt carried forward:**
- None accumulated during v1.2

---

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

