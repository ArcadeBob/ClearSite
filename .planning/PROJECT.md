# ClearSite — Clean Glass Installation Marketing Site

## What This Is

The marketing website for Clean Glass Installation (CGI), a commercial glazing subcontractor in Chatsworth, CA. Targets general contractors with project portfolio, safety credentials, prevailing wage experience, service depth, industrial typography, benefit-driven service copy, smart UX interactions, and prequalification flow. Built with React 18 + TypeScript + Vite + Tailwind CSS.

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
- ✓ Section headers use varied layouts (left-bar, banner, overlapping) (DSGN-01) — v1.2
- ✓ Industrial heading font (Bebas Neue) applied site-wide (DSGN-02) — v1.2
- ✓ ServiceCard hover uses brand colors (DSGN-03) — v1.2
- ✓ Each service has distinct lucide-react icon (DSGN-04) — v1.2
- ✓ Client logos with distinctive static grid treatment (DSGN-05) — v1.2
- ✓ Service descriptions rewritten with GC-benefit language (COPY-01) — v1.2
- ✓ Process Timeline with GC-specific terminology (COPY-02) — v1.2
- ✓ Route-aware FloatingCTA: residential vs commercial (UX-01) — v1.2
- ✓ Stats counter bug fixed (13+ years, not 7) (BUG-01) — v1.3
- ✓ Hero height reduced to ~65vh with trust signals above fold (HOME-01) — v1.3
- ✓ Prequal cards and certifications combined into compact trust band (HOME-02) — v1.3
- ✓ Owner quote moved to About page (HOME-03) — v1.3
- ✓ Bebas Neue restricted to hero/major headers only (TYPO-01) — v1.3
- ✓ Alternating warm/stone section backgrounds (VIZZ-01) — v1.3
- ✓ Service cards include thumbnail images (VIZZ-02) — v1.3
- ✓ Process timeline dead space reduced (UX-01) — v1.3
- ✓ Contact sidebar enhanced with prequal checklist (UX-02) — v1.3
- ✓ FloatingCTA hides when inline CTA visible (UX-03) — v1.3
- ✓ Inner page headers upgraded with gradient treatment (PAGE-01) — v1.3
- ✓ Project card click navigates; Quick Stats flips (PAGE-02) — v1.3
- ✓ Footer trimmed from 4 to 3 columns (PAGE-03) — v1.3
- ✓ About page image replaced with storefront photo (ABOUT-01) — v1.3

### Active

(No active requirements — planning next milestone)

### Out of Scope

- Backend integration or data layer changes — site remains static/hardcoded
- Real team photos — owner hasn't provided them yet, Unsplash placeholders work
- Downloadable PDF prequal package — goes stale, worse than no PDF
- Animated safety stat counters — trivializes serious data
- OSHA 300 log display — legal exposure, not industry standard
- Individual service pages — deferred (DSGN-06)
- Real jobsite photography — deferred (DSGN-07)
- Additional case study pages — deferred (DSGN-08)
- Safety page with downloadable manual — deferred

## Context

Shipped v1.3 with 5,381 LOC TypeScript.
Tech stack: React 18, TypeScript, Vite, Tailwind CSS 3, react-router-dom v6, Bebas Neue (Google Fonts).
All credential data flows from `src/data/credentials.ts` (17 named constants, 8 consumers).
SectionHeader supports 3 layout variants (left-bar, banner, overlapping) across 19 consumers.
Service copy uses GC-benefit pattern: sentence 1 = GC benefit, sentence 2 = CGI differentiator.
FloatingCTA renders globally from App.tsx with smart hide (IntersectionObserver on inline CTAs) and route-aware behavior.
Inner page headers use shared gradient + diagonal stripe + accent bar pattern.
ProjectCard uses dual interaction: body click navigates to case study, Quick Stats button triggers flip.
Contact sidebar is inquiry-type-aware: commercial shows prequal checklist, residential shows service highlights.
Safety and service content marked with draft banners pending owner review.
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
| Heading color text-brand instead of text-slate-900 | Consistent navy branding across all headings | ✓ Good |
| SectionHeader defaults to left-bar variant | Visual differentiation from original centered template | ✓ Good |
| Variant rhythm: no adjacent sections share variant | Prevents visual monotony across pages | ✓ Good |
| ServiceCard hover brand/5 gradient + brand/30 border | Brand-consistent hover replacing generic blue-50 | ✓ Good |
| CSS grid (2/3/5 cols) for client logos | Cleaner responsive layout than flexbox | ✓ Good |
| FloatingCTA in App.tsx after Footer | Global visibility, fixed positioning means no layout impact | ✓ Good |
| Closeout & Warranty as final timeline step | Covers both punchlist turnover and warranty documentation | ✓ Good |
| Owner quote after team section on About page | Natural flow from team intro to founder voice | ✓ Good — v1.3 |
| CertificationsBadges variant prop (compact/full) | Reusable in trust band without breaking existing layout | ✓ Good — v1.3 |
| Font hierarchy: Bebas Neue h1/h2 only | Card titles in sans-serif prevents overuse of display font | ✓ Good — v1.3 |
| Service card h-28 image banner | Compact visual context without dominating card layout | ✓ Good — v1.3 |
| IntersectionObserver for FloatingCTA smart hide | Threshold 0.5 + 80px rootMargin for reliable detection | ✓ Good — v1.3 |
| Gradient + diagonal stripe inner page headers | Richer visual treatment consistent across all inner pages | ✓ Good — v1.3 |
| Card body click = navigate, Quick Stats = flip | Clear interaction model separating navigation from detail view | ✓ Good — v1.3 |
| Footer Quick Links merged into Contact column | 3-column layout reduces density without losing content | ✓ Good — v1.3 |

---
*Last updated: 2026-03-08 after v1.3 milestone*
