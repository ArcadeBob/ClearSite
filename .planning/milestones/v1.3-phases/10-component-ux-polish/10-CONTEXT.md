# Phase 10: Component UX Polish - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Tighten individual components — add visual context to service cards, reduce process timeline dead space, enhance contact sidebar value, and make the FloatingCTA smart enough to hide near inline CTAs. No new pages, routes, or capabilities.

</domain>

<decisions>
## Implementation Decisions

### Service card images (VIZZ-02)
- Top banner image strip above the icon/title/description area
- Short height (~120px) — visual accent, not dominant
- Subtle brand-navy gradient overlay at bottom edge to tie image to card content
- Claude selects appropriate Unsplash stock photos for each of the 8 service types (storefronts, curtain walls, window walls, skylights, glass railings, fire-rated glazing, shower enclosures, mirrors)
- Add `image` prop to ServiceCard interface

### Timeline compactness (UX-01)
- Keep current icon sizes (96px desktop, 64px mobile) — they're fine
- Reduce section padding from py-24 to py-16 or py-12
- Keep 7-column single-row desktop layout as-is
- Reduce mobile step gaps from space-y-8 to space-y-4 or space-y-5
- Keep header margin and internal layout unchanged

### Contact sidebar content (UX-02)
- Sidebar content tailored by inquiry type (commercial vs residential) using existing `inquiryType` state
- Commercial sidebar: keep existing prequal checklist, trust badges, contact info, CSLB link
- Residential sidebar: replace prequal checklist with residential services list (shower enclosures, mirrors, glass railings, custom glass)
- Claude's discretion on whether to add a response timeline or "why choose us" bullets if it adds value without clutter

### FloatingCTA smart hide (UX-03)
- Mark all inline CTA buttons with a data attribute (e.g., `data-cta-inline`)
- FloatingCTA uses IntersectionObserver to detect when any marked CTA is visible in viewport
- When an inline CTA is visible, FloatingCTA auto-hides (slide-down transition, same as current dismiss)
- When all inline CTAs scroll out of view, FloatingCTA reappears
- Hide FloatingCTA entirely on the Contact page (user is already at the destination)
- Manual dismiss (X button) still works independently — if user dismisses, stays dismissed until scroll reset regardless of inline CTA visibility

### Claude's Discretion
- Specific Unsplash image selection for each service type
- Exact section padding value (py-16 vs py-12) based on visual result
- Whether to add response timeline or differentiator bullets to commercial sidebar
- IntersectionObserver threshold and rootMargin values for CTA detection
- Which specific CTA buttons get the data-cta-inline attribute

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. User selected recommended options across all areas, indicating trust in conventional patterns.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ServiceCard` (src/components/ServiceCard.tsx): Currently icon-only, needs `image` prop added. Has hover gradient and accent line already.
- `FloatingCTA` (src/components/FloatingCTA.tsx): Already has scroll-based show/hide, manual dismiss with scroll reset, and route-aware content (residential/commercial).
- `ContactPage` (src/pages/ContactPage.tsx): Already has `inquiryType` derived from `useSearchParams` — sidebar conditional content can key off this.
- `ProcessTimeline` (src/components/ProcessTimeline.tsx): Uses `useOnceInView` hook for scroll-triggered animation, `StepIcon` sub-component. Spacing changes are CSS-only.
- Credential constants from `src/data/credentials.ts` — already imported in ContactPage.

### Established Patterns
- Unsplash images used as placeholders throughout (hero, about page, map placeholder)
- Route-aware behavior pattern: FloatingCTA and ContactForm already branch on residential/commercial
- Brand hover: `bg-brand/5` gradient + `border-brand/30` on ServiceCard
- SectionHeader with `variant` prop (left-bar, banner, overlapping) — timeline uses left-bar

### Integration Points
- ServiceCard image prop: HomePage passes services array with new `image` field
- FloatingCTA: data-cta-inline attributes added to CTA buttons across HomePage, AboutPage, ResidentialPage, ProjectsPage
- ContactPage sidebar: conditional rendering based on existing `inquiryType` variable
- ProcessTimeline: CSS-only changes, no integration impact

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 10-component-ux-polish*
*Context gathered: 2026-03-08*
