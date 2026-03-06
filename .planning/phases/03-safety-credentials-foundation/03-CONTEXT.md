# Phase 3: Safety Credentials Foundation - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Consolidate credential data into a shared constants file and add a safety program section to the About page. The safety section shows EMR with industry context, OSHA record, bonding capacity, and a training/IIPP narrative. All safety narrative content is mock/placeholder requiring owner review before final deployment. Requirements: CRED-01, SAFE-01, SAFE-02, SAFE-03.

</domain>

<decisions>
## Implementation Decisions

### Safety Section Placement
- Position: after Company Timeline section, before Mission/Goal/Promise section on About page
- Layout: stat highlights row (3 stats) at top, narrative paragraphs below
- Background: subtle contrast (bg-slate-50) to distinguish from white sections above and below — consistent with how timeline already uses bg-slate-50
- Use SectionHeader component for the section heading (consistent with other About page sections)

### Safety Stat Highlights
- 3 stats in the top row: EMR (0.87), OSHA record (Zero Incidents), Bonding ($1M)
- EMR shows industry benchmark context via inline text: "industry average: 1.0" or "13% below industry average"
- OSHA wording: "Zero OSHA Incidents" — matches existing CertificationsBadges and StatsSection language
- Static numbers only — no animated count-up. Safety section should feel serious/informational, not flashy
- Bonding included as a risk/prequalification metric (GCs see bonding capacity alongside safety in prequal evaluations)

### Safety Narrative Tone & Content
- Compliance-forward tone: lead with programs, protocols, and certifications
- Standard commercial safety program set to cover in narrative:
  - IIPP (Injury & Illness Prevention Program)
  - Toolbox talks (with bracketed frequency placeholder for owner)
  - Site-specific safety plans
  - PPE protocols
  - Fall protection
- Specific placeholders with brackets where owner needs to confirm details (e.g., "[REVIEW: confirm toolbox talk frequency]")
- Length: 2-3 short paragraphs — matches brand story section length, scannable for GCs

### Review Flagging (SAFE-03)
- Dual approach: visible on-page banner + inline `[REVIEW: description]` markers
- Banner: amber/yellow notice at top of safety section — "Draft safety content — pending owner review. Search for [REVIEW:] markers for specific items."
- Banner is visible until manually removed from JSX (no env variable / build config needed)
- Inline markers: `[REVIEW: description]` format — grepable for deployment checklist
- Banner is general notice only; brackets handle specific item-level review needs

### Credential Constants (CRED-01)
- Extract to `src/data/credentials.ts` (already decided in STATE.md)
- Single source of truth for EMR, OSHA, bonding, CSLB, DIR, SBE across all 9 files that reference these values

### Claude's Discretion
- Exact stat highlight card styling and spacing within the 3-stat row
- SectionHeader subheading text and section title wording
- Exact paragraph structure of the safety narrative (within 2-3 paragraph constraint)
- Which specific claims get `[REVIEW:]` markers (use judgment — mark anything the owner should verify)
- Credential constants file structure and TypeScript types
- How to refactor existing components to import from constants file

</decisions>

<specifics>
## Specific Ideas

- Safety section should feel professional and informational — no animated counters, no flashy effects
- The compliance-forward narrative serves as a starting draft for the owner to edit — better to be specific with bracketed placeholders than vague
- "Zero OSHA Incidents" wording is already established across the site — keep it consistent

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SectionHeader` component: used throughout About page for section headings — reuse for safety section
- `Card` component (ui/Card.tsx): available for stat highlight cards if needed
- `useOnceInView` hook: exists but NOT needed here (static numbers, no animation)
- `StatsSection` pattern: reference for stat layout structure (but safety section uses lighter theme, no animation)

### Established Patterns
- About page uses alternating white/slate-50 backgrounds for sections
- Data arrays defined inline at top of component files (team, values, milestones arrays in AboutPage.tsx)
- Named exports only, no default exports
- Tailwind utility classes directly in JSX, brand color tokens from tailwind.config.js

### Integration Points
- AboutPage.tsx: new SafetySection component inserted between timeline section (~line 222) and mission/goal/promise section (~line 225)
- 9 files reference credential values and will need refactoring to import from `src/data/credentials.ts`:
  - CertificationsBadges.tsx, StatsSection.tsx, HomePage.tsx, AboutPage.tsx, ContactPage.tsx, CaseStudyPage.tsx, Footer.tsx, FloatingCTA.tsx, GCResourcesSection.tsx

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-safety-credentials-foundation*
*Context gathered: 2026-03-05*
