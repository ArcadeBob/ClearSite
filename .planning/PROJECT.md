# ClearSite — Clean Glass Installation Marketing Site

## What This Is

The marketing website for Clean Glass Installation (CGI), a commercial glazing subcontractor in Chatsworth, CA. Targets general contractors with project portfolio, safety credentials, prevailing wage experience, service depth, and prequalification flow. Built with React 18 + TypeScript + Vite + Tailwind CSS.

## Core Value

Professional credibility for a commercial glazing subcontractor — accurate project data, consistent visual presentation, and clear CTAs for general contractors.

## Requirements

### Validated

- ✓ Multi-page marketing site with React Router — existing
- ✓ Consistent brand colors (navy/accent) across pages — existing
- ✓ Project portfolio with status filtering (Completed/Current/Future) — existing
- ✓ Contact page with form and hero section — existing
- ✓ About page with brand story section and image — existing
- ✓ Contact page hero restyled to match About/Projects hero pattern — v1.0
- ✓ All current projects moved to completed status — v1.0
- ✓ All future projects moved to current status — v1.0
- ✓ About page image replaced with commercial glazing crew photo — v1.0
- ✓ Credential data consolidated into shared constants file (CRED-01) — v1.1
- ✓ About page safety program section with EMR, OSHA, certs (SAFE-01) — v1.1
- ✓ About page safety narrative with IIPP, training practices (SAFE-02) — v1.1
- ✓ Safety content flagged for owner review (SAFE-03) — v1.1
- ✓ Prevailing wage banner on HomePage/AboutPage (WAGE-01) — v1.1
- ✓ Prevailing wage removed from Contact FAQ (WAGE-02) — v1.1
- ✓ Service cards with technical capability bullets (SERV-01) — v1.1
- ✓ Service content marked as placeholder for review (SERV-02) — v1.1
- ✓ Commercial CTAs → "Request Prequal Package" with auto-tag (CTA-01) — v1.1
- ✓ Residential CTAs → "Request a Quote" with auto-tag (CTA-02) — v1.1
- ✓ Contact form auto-detects URL parameter (CTA-03) — v1.1

### Active

#### v1.2 GC Appeal & Design Polish
- [ ] **COPY-01**: Service descriptions rewritten with GC-benefit language (schedule, coordination, callbacks) instead of spec language
- [ ] **COPY-02**: Process Timeline steps renamed with GC-specific terminology
- [ ] **DSGN-01**: Section headers use varied layouts (left-aligned, full-width, overlapping) instead of uniform centered pattern
- [ ] **DSGN-02**: Industrial/bold heading font (e.g. Oswald, Barlow Condensed) replaces generic sans-serif
- [ ] **DSGN-03**: ServiceCard hover uses brand colors instead of generic Tailwind blue
- [ ] **DSGN-04**: Each service uses a distinct icon (no reuse of Maximize)
- [ ] **DSGN-05**: Client logos displayed with distinctive treatment (not standard infinite marquee)
- [ ] **UX-01**: FloatingCTA shows "Request a Quote" on residential page, "Request Prequal Package" elsewhere

### Out of Scope

- Content/copy changes to contact header — style only needed
- Backend integration or data layer changes — site remains static/hardcoded
- Real team photos — owner hasn't provided them yet, Unsplash placeholders work
- Downloadable PDF prequal package — goes stale, worse than no PDF
- Separate forms per audience — same form with auto-tagging is sufficient
- Animated safety stat counters — trivializes serious data
- OSHA 300 log display — legal exposure, not industry standard
- Individual service pages — deferred to v2 (SERV-03, SERV-04)
- Safety page with downloadable manual — deferred to v2 (SAFE-04)

## Context

Shipped v1.1 with 5,079 LOC TypeScript.
Tech stack: React 18, TypeScript, Vite, Tailwind CSS 3, react-router-dom v6.
All credential data flows from `src/data/credentials.ts` (17 named constants, 8 consumers).
Safety and service content marked with amber draft banners pending owner review.
All CTAs route through `?type=commercial` or `?type=residential` URL parameters.
No test framework configured. No backend/API layer.

## Constraints

- **No real photos available**: Owner hasn't provided team photos — using Unsplash stock
- **Data inline**: All project/service data hardcoded in page components — no API layer
- **No test framework**: No unit/integration tests configured
- **Owner review pending**: Safety section (5 markers) and service bullets (24 items) need owner validation before production

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Unsplash crew photo for About page | No real team photos available yet | ✓ Good |
| Match Contact hero to About/Projects style | Visual consistency | ✓ Good |
| Keep 'Future' filter tab with 0 projects | Graceful empty state | ✓ Good |
| Raw h1+p instead of SectionHeader for Contact hero | SectionHeader rendered invisible h2 on dark background | ✓ Good |
| Credential constants in src/data/credentials.ts | Prevent 8th duplication point, single source of truth | ✓ Good — 17 constants, 8 consumers |
| SafetySection in AboutPage only (not global) | Avoid z-index collision with FloatingCTA at z-40 | ✓ Good |
| Static numbers in SafetySection (no animation) | Informational/credibility content, not promotional | ✓ Good |
| PrevailingWageBanner inline (not App.tsx) | Restrict to HomePage/AboutPage only, avoid z-index issues | ✓ Good |
| Service bullets always-expanded (not accordion) | GCs need to scan all capabilities at a glance | ✓ Good |
| Optional props for backward compatibility | bullets?, inquiryType?, className? | ✓ Good — zero breaking changes |
| useSearchParams in ContactPage only | ContactForm stays presentational | ✓ Good |
| Non-residential defaults to commercial | Safe fallback for any ?type= value | ✓ Good |

## Current Milestone: v1.2 GC Appeal & Design Polish

**Goal:** Make the site visually distinctive and speak directly to GCs through benefit-driven copy, varied layouts, industrial typography, and route-aware UX.

**Target features:**
- Service descriptions rewritten for GC benefits (not specs)
- Process Timeline with GC-specific language
- Section header visual variety (break template feel)
- Industrial/bold heading font
- Brand-consistent hover states and distinct service icons
- Distinctive client logo treatment
- Route-aware FloatingCTA (residential vs commercial)

---
*Last updated: 2026-03-07 after v1.2 milestone start*
