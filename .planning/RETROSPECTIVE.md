# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.2 — GC Appeal & Design Polish

**Shipped:** 2026-03-07
**Phases:** 3 | **Plans:** 4 | **Sessions:** ~3

### What Was Built
- Industrial typography system: Bebas Neue font + font-heading utility applied across 21 files and 19 SectionHeader consumers
- Three-variant SectionHeader (left-bar, banner, overlapping) breaking template-generated visual sameness
- GC-benefit service copy for all 8 services with unique icons and brand-consistent hover states
- Process Timeline rewritten with GC-project terminology (7 steps)
- Client logos replaced from infinite marquee to static CSS grid with grayscale-to-color hover
- Route-aware FloatingCTA: "Request a Quote" on /residential, "Request Prequal Package" globally

### What Worked
- Phase 6 font infrastructure (Plan 01) immediately consumed by Plan 02 — clean dependency chain
- All 4 plans executed with zero deviations from plan — research + planning accuracy was excellent
- Visual rhythm pattern (no adjacent sections share SectionHeader variant) created immediately noticeable improvement
- Fastest milestone yet: ~7 min total execution across 4 plans

### What Was Inefficient
- ROADMAP.md showed Phase 7 as "0/1 Not started" even though it was complete — state tracking inconsistency
- One-liner fields missing from SUMMARY frontmatter (all returned null) — should populate during summary creation

### Patterns Established
- SectionHeader variant assignment: choose based on section context, ensure visual rhythm (no adjacent duplicates)
- Service copy pattern: Sentence 1 = GC benefit, Sentence 2 = CGI differentiator, 3 GC-outcome bullets
- Route-aware components: useLocation().pathname for conditional rendering by route
- Font heading convention: `font-heading uppercase tracking-wide text-brand` on light, `text-white` on dark backgrounds

### Key Lessons
1. Typography changes are high-impact, low-effort — single font addition transformed entire site feel
2. Variant-based component architecture (SectionHeader) scales well across many consumers
3. Route-aware behavior should live in the component, not be managed by parent pages
4. Copy rewriting from specs to benefits is a high-value activity for B2B sites

### Cost Observations
- Model mix: balanced profile (sonnet for agents, opus for orchestration)
- Sessions: ~3
- Notable: Total execution ~7 min across 4 plans — fastest milestone. Planning/docs overhead still dominant

---

## Milestone: v1.1 — Credibility & Conversion

**Shipped:** 2026-03-06
**Phases:** 3 | **Plans:** 5 | **Sessions:** ~5

### What Was Built
- Credential constants module — single source of truth for EMR, bonding, CSLB, DIR, SBE across 8 consumer files
- SafetySection component with IIPP narrative, stat highlights, and owner review markers on About page
- PrevailingWageBanner with 4 named wage types on HomePage and AboutPage, FAQ entry removed from Contact
- ServiceCard extended with 24 technical capability bullets across 8 services
- Contact form URL parameter routing — `?type=commercial` and `?type=residential` with Formspree hidden field labeling
- All 9 CTA links unified to two clear paths with auto-tagging

### What Worked
- Credential constants extraction (Phase 3) paid off immediately — Phase 4 PrevailingWageBanner imported directly from it
- Optional prop pattern (`bullets?`, `inquiryType?`, `className?`) prevented breaking changes across all 5 plans
- Research phase before each plan produced accurate file inventories — zero surprise files needed modification
- Coarse granularity + YOLO mode: 10 tasks across 5 plans, all executed without deviation

### What Was Inefficient
- Phase 3 execution took 18 min (credential refactor across 8 files); Phases 4-5 combined took ~6 min — front-loading was disproportionate but necessary
- SUMMARY frontmatter inconsistency (3 different YAML field names for requirements) caused audit friction — should standardize early
- Milestone audit flagged tech debt that was intentional by design (owner review markers, amber banners) — audit needs to distinguish "expected draft content" from actual gaps

### Patterns Established
- Credential constants pattern: all static credential values in `src/data/credentials.ts`, UPPER_SNAKE_CASE, `as const`
- Owner review marker pattern: amber banner + `[REVIEW:]` JSX comments for grepable sign-off workflow
- Section-level draft banner pattern: one amber banner above a section, not per-item
- URL parameter routing pattern: page reads searchParams, derives typed value with safe default, passes to child as prop

### Key Lessons
1. Extract shared data before building consumers — the credentials.ts extraction eliminated all downstream duplication
2. Optional props with sensible defaults enable backward-compatible feature additions with zero breaking changes
3. Standardize SUMMARY frontmatter fields early to avoid audit inconsistencies later
4. Owner review content should be tracked separately from code gaps — they have different resolution paths

### Cost Observations
- Model mix: balanced profile (sonnet for agents, opus for orchestration)
- Sessions: ~5
- Notable: Total code execution time was ~24 min across 5 plans; planning/research/docs overhead was significantly more

---

## Milestone: v1.0 — ClearSite Content & Style Update

**Shipped:** 2026-03-03
**Phases:** 2 | **Plans:** 3 | **Sessions:** ~3

### What Was Built
- Updated 7 project status strings across 17 projects (4 Current→Completed, 3 Future→Current)
- Contact page hero replaced from SectionHeader to raw h1+p markup matching About/Projects pattern
- About page brand story image replaced with commercial glazing crew photo
- Unified hero pattern across all three top-level pages

### What Worked
- Small, focused milestone — 2 phases, 3 plans, completed in 2 days
- Coarse granularity kept planning overhead proportional to actual work
- YOLO mode eliminated unnecessary confirmation gates for straightforward changes
- Phase independence — both phases touched different files with no merge conflicts

### What Was Inefficient
- Phase 2 depended on Phase 1 in the roadmap but was actually independent (different files) — could have parallelized
- Milestone audit and completion ceremony overhead is significant relative to the small amount of actual code changes (3 source files modified)

### Patterns Established
- Hero section pattern: `bg-brand text-white py-16 > max-w-7xl container > h1.text-4xl.font-bold.mb-4 + p.text-xl.text-slate-300.max-w-3xl`
- All top-level pages should use raw hero markup instead of SectionHeader for hero sections

### Key Lessons
1. For very small milestones (2-3 phases), the GSD ceremony-to-code ratio is high — consider whether full workflow is warranted
2. Mark phase dependencies accurately — false dependencies prevent parallelization

### Cost Observations
- Model mix: balanced profile (sonnet for agents, opus for orchestration)
- Sessions: ~3
- Notable: Total execution time for code changes was ~14 minutes across all 3 plans

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | ~3 | 2 | First milestone — established baseline |
| v1.1 | ~5 | 3 | Optional prop pattern emerged; credential extraction as prerequisite pattern |
| v1.2 | ~3 | 3 | Variant-based architecture; route-aware components; fastest execution yet |

### Cumulative Quality

| Milestone | Tests | Coverage | Build Warnings |
|-----------|-------|----------|----------------|
| v1.0 | 0 | N/A | 0 (clean build) |
| v1.1 | 0 | N/A | 0 (clean build + lint) |
| v1.2 | 0 | N/A | 0 (clean build + lint) |

### Top Lessons (Verified Across Milestones)

1. Coarse granularity + YOLO mode is effective for this project's scale — ceremony stays proportional
2. Extract shared data/patterns before building consumers — prevents duplication across phases
3. Optional props with defaults enable incremental feature additions without breaking changes
4. Variant-based component architecture scales well — SectionHeader serves 19 consumers with 3 variants
5. Plans that execute with zero deviations correlate with thorough research phases
