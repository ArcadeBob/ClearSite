# Phase 8: Client Presentation & UX - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Distinctive client logo treatment replacing the infinite-scroll marquee, and route-aware FloatingCTA that adapts text/link based on current page. Requirements: DSGN-05 (client logos), UX-01 (route-aware FloatingCTA).

</domain>

<decisions>
## Implementation Decisions

### Client logo treatment
- Grayscale logos by default, full color on hover — professional B2B pattern
- Must NOT be an infinite-scroll marquee — that's the explicit requirement
- Layout style, text labels, and section background are Claude's discretion (must fit industrial brand established in Phase 6)

### FloatingCTA page scope
- Show on ALL pages (HomePage, About, Projects, CaseStudy, Residential, Contact)
- Move from HomePage-only to App.tsx global layout — render once alongside Navbar/Footer
- Use `useLocation()` to determine current route and adapt CTA content
- Remove FloatingCTA import from HomePage after moving to App.tsx

### FloatingCTA dismiss behavior
- Keep current dismissible behavior (X button, reset when scrolling back to top)
- No change to scroll thresholds (show after 500px, reset at 100px)

### FloatingCTA residential copy
- Headline: "Ready for your project?"
- Subtext: "Showers, mirrors, railings & more"
- Button: "Request a Quote" linking to `/contact?type=residential`

### FloatingCTA commercial copy
- Current copy is the baseline: "Ready to prequalify?" / "Get COI, EMR, and references within 24 hours" / "Request Prequal Package"
- Claude may refine commercial copy if improvements are obvious, but current version is solid

### FloatingCTA visual style
- Same brand navy style everywhere — no visual differentiation between residential and commercial
- Only text content and link target change per route

### Claude's Discretion
- Client logo layout style (grid, cards, staggered rows, etc.) — must be distinctive, not a marquee
- Whether to show client names as text labels or logos-only
- Logo section background color (white, light gray, dark navy)
- Any refinements to commercial CTA copy
- FloatingCTA prop interface design (route detection vs explicit props)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ClientLogos` component (`src/components/ClientLogos.tsx`): 10 clients with name, logo path, and optional `invert` flag — data array is reusable, marquee animation will be removed
- `FloatingCTA` component (`src/components/FloatingCTA.tsx`): Scroll-triggered visibility, dismiss/reset logic, brand navy styling — all reusable, needs route-awareness added
- `Button` component with `variant` and `size` props — already used in FloatingCTA

### Established Patterns
- Brand colors tokenized: `brand` (#1e3a5f), `accent` (#2563eb) — use tokens not hex
- Industrial heading font (Bebas Neue, uppercase) applied site-wide from Phase 6
- SectionHeader variants (`left-bar`, `banner`, `overlapping`) available from Phase 6
- CTA URL params established: `?type=commercial` and `?type=residential` from Phase 5
- Named exports only, single component per file

### Integration Points
- `App.tsx`: FloatingCTA will be added here in the layout (alongside Navbar, Footer)
- `HomePage.tsx` line 524: Current `<FloatingCTA />` render — remove after moving to App.tsx
- `ClientLogos.tsx`: Complete rewrite of render logic, keep data array
- `useLocation` from `react-router-dom` — already available in the project, used in other components
- Client logo image files in `/images/clients/` — 10 files in mixed formats (avif, svg, gif, jpg, png, webp)

</code_context>

<specifics>
## Specific Ideas

- "Ready for your project?" chosen specifically as residential headline — friendly, homeowner-focused
- "Showers, mirrors, railings & more" lists key residential services in subtext
- Grayscale-to-color hover effect on logos — keeps section visually unified with 10 different brand palettes
- Content rules: "Request a Quote" for residential, "Request Prequal Package" for commercial (established in Phase 5)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-client-presentation-ux*
*Context gathered: 2026-03-07*
