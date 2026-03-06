# Project Research Summary

**Project:** ClearSite v1.1 — Credibility & Conversion
**Domain:** React marketing site — safety credentials and CTA conversion improvements for a commercial glazing subcontractor
**Researched:** 2026-03-05
**Confidence:** HIGH

## Executive Summary

ClearSite v1.1 is a targeted enhancement milestone on an existing, production React 18 + TypeScript + Vite + Tailwind CSS 3 site built for Clean Glass Installation (CGI), a commercial glazing subcontractor. The research confirms that no new dependencies are needed — all four v1.1 features (safety program expansion, prevailing wage callout, expanded service technical depth, and two-path CTA auto-tagging) are implementable entirely within the existing stack. The recommended approach is additive: two new components (`SafetySection`, `PrevailingWageBanner`) and targeted modifications to four existing ones (`ServiceCard`, `ContactForm`, `ContactPage`, `FloatingCTA`), plus a CTA link sweep across five pages.

The primary audience for these improvements is general contractors evaluating CGI for prequalification. Research confirms that GCs assess safety management systems at roughly 30% of their evaluation weight — EMR alone is insufficient. Naming specific prevailing wage experience (PLA, Davis-Bacon, LAUSD, State Prevailing Wage) is a meaningful differentiator in the California public works market, where most competitors only claim "prevailing wage certified" without specifics. The dual-path CTA clarification resolves current friction where residential visitors arrive at a "Request Prequalification Packet" page, which reads as wrong-audience content and reduces residential conversions.

The dominant risk for this milestone is not technical — it is operational. Credential data (EMR 0.87, OSHA Zero, DIR registration) is currently scattered across 7+ files with no single source of truth. Adding a new safety section creates an eighth location. If this is not consolidated first, any future credential update (EMR changes annually) requires finding and updating 8+ hardcoded string literals. A secondary risk is the mock safety program copy: safety claims are material representations in GC prequalification, not placeholder images, and the safety section must not ship to production without explicit owner sign-off.

## Key Findings

### Recommended Stack

No new dependencies are needed for v1.1. The existing stack handles all four feature additions without modification to `package.json`. All required lucide-react icons (`HardHat`, `ShieldCheck`, `BadgeCheck`, `Gavel`, `Landmark`, `ListChecks`) were verified present in the installed version (0.522.0). The `useSearchParams` hook for two-path CTA routing is part of the already-installed `react-router-dom` v6.26.2. Auto-tagging form submissions uses a native HTML hidden input, not a library. The recommendation to pin `lucide-react` at 0.522.0 (do not upgrade) is based on the risk of icon renames breaking existing components.

**Core technologies:**
- React 18.3.1: Component composition — all new features are standard React components, no new primitives
- Tailwind CSS 3.4.17: Styling — `brand` and `accent` tokens already defined, new components extend existing patterns
- lucide-react 0.522.0: Icons — all required credential icons confirmed present, no upgrade needed
- react-router-dom 6.26.2: Routing — `useSearchParams` handles two-path CTA differentiation, already installed
- Formspree (existing endpoint): Form submission — hidden `inquiryType` field auto-tags submissions, no new endpoint

See `.planning/research/STACK.md` for full details and alternatives considered.

### Expected Features

GC-audience research confirms that safety program narrative (not just raw stats) and named prevailing wage experience types are the highest-ROI additions relative to implementation cost. All four v1.1 features are P1 priority based on GC audience value vs. implementation effort.

**Must have (table stakes):**
- EMR 0.87 displayed with industry context ("vs. 1.0 industry average") — number alone is insufficient for GCs who don't know the benchmark
- Safety record substantiation beyond a 3-bullet list — training practices, IIPP reference, and toolbox talks are expected indicators of a legitimate safety program
- DIR registration as a distinct public works callout — currently buried in badge subtitles and a checklist item, needs to read as "we are ready for your prevailing wage project"
- Contact path that matches visitor intent — GCs and homeowners have different needs; same form with no differentiation signals the firm doesn't distinguish B2B from B2C

**Should have (competitive differentiators):**
- Prevailing wage callout naming PLA, Davis-Bacon, LAUSD, and State Prevailing Wage — specificity signals experience rather than just compliance
- Safety program narrative (IIPP, toolbox talks, foreman-led protocols) — addresses 30% of GC prequal evaluation weight vs. 10% for EMR alone
- Service capability technical depth (system types, NFRC-rated assemblies, aluminum system experience) — confirms bid eligibility for estimators
- Explicit audience labeling on CTAs ("For GCs" / "For Homeowners") — reduces cognitive friction for both audience segments

**Defer (v2+):**
- Individual service detail pages (`/services/curtain-walls`, etc.) — requires real owner photos, high complexity
- NACC certification pursuit — if CGI pursues, would be a strong differentiator but is out of scope
- Authenticated prequal packet portal — requires backend, defer until owner confirms interest
- PDF downloadable prequal package — goes stale with every credential update; current form-request approach is the correct professional standard

See `.planning/research/FEATURES.md` for full competitor analysis and anti-feature explanations.

### Architecture Approach

All v1.1 additions follow the existing architecture without introducing new patterns. Two new section-level components are extracted (`SafetySection`, `PrevailingWageBanner`), four existing components are modified via optional prop additions, and all CTA links across five pages are updated to include a `?type=` query parameter. The data flow for CTA routing is shallow: `ContactPage` reads `useSearchParams()`, passes a single `inquiryType` prop to `ContactForm`, and the form embeds it as a hidden field. No new routing, no new context, no new state management.

**New components:**
1. `SafetySection` (`src/components/SafetySection.tsx`) — standalone extracted section for AboutPage, no props, data hardcoded inline per existing pattern
2. `PrevailingWageBanner` (`src/components/PrevailingWageBanner.tsx`) — targeted inclusion on HomePage and AboutPage only (not global layout), supports `variant?: 'full' | 'compact'`

**Modified components:**
1. `ServiceCard` — add optional `details?: string[]` prop; backward-compatible, existing callers unchanged
2. `ContactForm` — add `inquiryType?: 'commercial' | 'residential'` prop + hidden form field
3. `ContactPage` — add `useSearchParams()`, pass `inquiryType` to form, conditional page heading
4. `FloatingCTA` — update link from `/contact` to `/contact?type=commercial`

**Architectural patterns to follow:**
- Named exports only (no default exports anywhere in the codebase)
- Data arrays declared at top of file, above the function component
- Optional props for progressive enhancement (new props must not break existing callers)
- Brand color tokens (`brand`, `accent`) via Tailwind classes — never raw hex in new components
- `SectionHeader` for all new section headings
- `PrevailingWageBanner` must NOT be inserted into `App.tsx` — Residential, Projects, and 404 pages should not receive prevailing wage messaging

See `.planning/research/ARCHITECTURE.md` for the full component inventory, data flow diagrams, and suggested build order.

### Critical Pitfalls

1. **Credential data scattered across 7+ files with no source of truth** — Before writing any new safety section markup, extract credential constants to `src/data/credentials.ts`. Importing from a single source prevents stale values when EMR changes annually. Warning sign: writing `'0.87'` as a string literal in a new component.

2. **Mock safety content shipped to production without owner review** — Safety program claims are material representations used in GC prequalification decisions, not equivalent to a placeholder image. The safety section must include a dev-only review flag (`import.meta.env.DEV`) or clearly bracketed placeholder text. Owner approval is a hard gate before the phase closes — not optional.

3. **CTA two-path tagging not verified end-to-end** — Adding a hidden `inquiryType` field to the form looks done when the UI works, but Formspree differentiation must be verified by submitting from both paths and reading the actual inbox. If Formspree's `_subject` templating is not configured, both submission types appear identical. Test the full round-trip before marking the phase complete.

4. **Prevailing wage banner implemented as a fixed/sticky element** — The site already has `FloatingCTA` at `z-40` and a fixed Navbar. Any new fixed/sticky element without z-index audit will collide. Implement `PrevailingWageBanner` as an inline section element (normal document flow) to avoid this entirely.

5. **Expanded service cards breaking the 4-column grid at tablet breakpoints** — Card content lengths vary significantly across 8 services. Enforce a strict TypeScript content schema (exactly 3 capability bullets per service card, typed as `readonly [string, string, string]`) before writing any content. Test at 768px viewport before closing the phase.

See `.planning/research/PITFALLS.md` for recovery strategies and the full "Looks Done But Isn't" checklist.

## Implications for Roadmap

Based on combined research findings, the recommended phase structure follows the build order identified in ARCHITECTURE.md — logic/data changes first, additive new components second, content-dependent changes last.

### Phase 1: Safety Credentials Foundation

**Rationale:** This phase addresses the most structurally important prerequisite: extracting credential data to a single source of truth. Without this, every subsequent phase that touches credentials creates a new duplication point. It also adds the highest-ROI credibility improvement (safety program narrative on About page), which addresses 30% of GC prequal evaluation weight. Owner review gate must be built into the phase completion criteria.

**Delivers:** Shared `credentials.ts` constants file, `SafetySection` component on AboutPage with owner-reviewed safety program content

**Addresses:** "Safety program substantiation" (table stakes), "Safety program narrative" (differentiator), EMR industry context annotation

**Avoids:** Credential data scatter pitfall (Pitfall 1), mock content shipped without review (Pitfall 3)

**Owner dependency:** Phase cannot close without owner sign-off on safety copy. Plan for a review iteration.

### Phase 2: Prevailing Wage & Service Depth

**Rationale:** Once credentials are consolidated (Phase 1), this phase adds the two visual enhancements that require no owner content review gate — the prevailing wage banner (facts are owner-confirmed) and expanded service card technical details (industry-standard terminology, not custom claims). Both are self-contained additions with no dependencies on other v1.1 work.

**Delivers:** `PrevailingWageBanner` component on HomePage and AboutPage, expanded `ServiceCard` with optional `details` prop populated for all 8 services

**Addresses:** "Prevailing wage named-programs callout" (P1 differentiator), "Service technical depth" (P1 table stakes), "DIR registration distinct callout"

**Avoids:** Prevailing wage banner z-index collision (Pitfall 4 — implement as inline section), service card grid breaking at tablet (Pitfall 5 — enforce uniform 3-bullet TypeScript schema)

**No owner dependency:** Prevailing wage programs (PLA, Davis-Bacon, LAUSD, State) are owner-confirmed facts. Service terminology is industry-standard. No review gate needed.

### Phase 3: CTA Simplification & Form Auto-Tagging

**Rationale:** The two-path CTA work is deferred to Phase 3 because it touches the most files (5 pages, 2 components) and requires end-to-end Formspree verification. Doing it last means the safety and prevailing wage content is already live, so the improved contact experience serves visitors who arrive via those new sections. The CTA link sweep also benefits from knowing the final placements of Phase 1 and Phase 2 components.

**Delivers:** `ContactForm` with `inquiryType` prop and hidden field, `ContactPage` with `useSearchParams()` and conditional heading, all CTA links across 5 pages updated to `?type=commercial` or `?type=residential`, `FloatingCTA` updated

**Addresses:** "Dual-path CTA copy and routing" (P1), "Contact path matching visitor intent" (table stakes), "ContactForm audience indicator" (P2), residential form heading mismatch (UX pitfall)

**Avoids:** Formspree not differentiating submissions (Pitfall 2) — verification step is mandatory: submit from both paths, confirm Formspree inbox shows distinct labels

**Verification requirement:** Phase cannot close until Formspree inbox confirms both `commercial` and `residential` submissions appear distinctly labeled.

### Phase Ordering Rationale

- Phase 1 first because credential data consolidation is a prerequisite that prevents technical debt in all subsequent phases
- Phase 2 second because it is additive (new components, no behavioral changes) with no owner content dependencies — can move fast
- Phase 3 last because it touches the most existing files and has an external verification dependency (Formspree inbox test)
- Owner review of safety copy (Phase 1) is the only schedule-gating dependency; Phases 2 and 3 can be planned in parallel if owner review takes time

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 1 (Safety Credentials Foundation):** Owner content review process is not defined. What is the review mechanism (email, Slack, staged deployment)? How long does owner review typically take? Planning should include buffer time and a defined feedback loop.
- **Phase 3 (CTA Simplification):** Formspree `_subject` field templating configuration needs verification. Research during planning should confirm whether Formspree's current configuration requires any changes to surface the `inquiryType` field in email notification subject lines vs. just in the dashboard.

Phases with standard patterns (skip research-phase):

- **Phase 2 (Prevailing Wage & Service Depth):** New component creation following established codebase patterns. No external integrations, no owner content dependencies, no routing changes. Patterns fully documented in ARCHITECTURE.md and STACK.md.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All conclusions from direct codebase inspection and verified icon inventory against installed node_modules; no new dependencies to evaluate |
| Features | HIGH | Research grounded in existing codebase inventory + Highwire GC prequalification sources + competitor analysis (Egan Company/InterClad); owner-confirmed facts from MEMORY.md |
| Architecture | HIGH | All integration decisions drawn from reading the live source tree; no speculation; TypeScript interfaces and code snippets verified against existing patterns |
| Pitfalls | HIGH | All pitfalls identified from direct source inspection of 9+ files; each has concrete warning signs, prevention steps, and recovery costs |

**Overall confidence:** HIGH

### Gaps to Address

- **Owner safety copy:** The safety program section content needs owner input before the phase closes. Specific gaps: confirmed training hour counts, named safety certifications held by crew (OSHA 10/30 card counts), and any formal program names (IIPP program name, if named). Plan for placeholder copy with clearly marked review brackets during development.

- **Formspree `_subject` configuration:** The current Formspree form configuration is unknown from the codebase alone. The hidden `inquiryType` field will appear in the Formspree dashboard regardless, but whether it surfaces in email notification subject lines depends on Formspree settings that need to be checked during Phase 3 planning.

- **Service card content per service:** The recommended 3-bullet capability schema needs owner validation for services where CGI's specific system experience may differ from industry-standard terminology (e.g., specific aluminum system brands used, NFRC certification scope, fire-rated assembly types). This is a content gap, not a technical gap.

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection (2026-03-05) — `src/` tree, `CLAUDE.md`, `MEMORY.md`, `.planning/PROJECT.md`
- lucide-react 0.522.0 icon inventory — verified via `node -e` against installed `node_modules`
- react-router-dom v6 public API — `useSearchParams` confirmed available since v6.0.0 (installed: 6.26.2)
- Formspree documentation — honeypot field (`_gotcha`), `_subject` templating

### Secondary (MEDIUM confidence)
- Highwire — [Experience Modification Rating Guide](https://www.highwire.com/blog/experience-modification-rating-guide) — EMR benchmarks, 30% safety management system weight in GC evaluation
- Highwire — [Complete Guide to Subcontractor Prequalification](https://www.highwire.com/blog/the-complete-guide-to-subcontractor-prequalification) — prequal dimensions
- Egan Company / InterClad — [Curtainwall Glazing Services](https://www.eganco.com/specialties/curtainwall-glass-metal-panels/) — competitor service presentation patterns
- California DIR — [Public Works / Prevailing Wage](https://www.dir.ca.gov/public-works/prevailing-wage.html) — DIR registration requirements

### Tertiary (supporting context)
- OSHA — [Construction Safety & Health Program](https://www.osha.gov/etools/construction/safety-health-program) — safety program elements GCs reference
- Thomas Industrial Coatings — [EMR Explained](https://thomasindcoatings.com/incident-and-experience-modifier-rates-explained/) — industry average 1.0 benchmark context
- Tailwind CSS — [z-index scale](https://tailwindcss.com/docs/z-index) — z-index pitfall context

---
*Research completed: 2026-03-05*
*Ready for roadmap: yes*
