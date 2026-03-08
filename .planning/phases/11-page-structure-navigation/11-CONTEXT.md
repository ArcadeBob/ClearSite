# Phase 11: Page Structure & Navigation - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Inner pages feel polished and consistent — richer headers, intuitive project card interaction, streamlined footer, and a relevant About page image. No new pages, routes, or capabilities.

Requirements: PAGE-01 (inner page headers), PAGE-02 (project card interaction), PAGE-03 (footer 3 columns), ABOUT-01 (About page image).

</domain>

<decisions>
## Implementation Decisions

### Project card interaction (PAGE-02)
- Card body click behavior depends on case study availability:
  - Projects WITH a case study: body click navigates to `/projects/:slug` case study page
  - Projects WITHOUT a case study: body click flips the card to show quick stats (current behavior preserved)
- Dedicated "Quick Stats" button at the bottom of the card front face triggers flip animation
  - Button always visible (not hover-only), clear affordance with flip icon
  - Replaces the current "Tap for details" hover hint
- For case-study projects, a "View Case Study →" link appears on the card front face
- The flip animation only triggers via the Quick Stats button (or body click for non-case-study projects) — never via navigation click
- Currently only Cabrillo Business Park has a case study page; all other cards flip on body click

### Footer consolidation (PAGE-03)
- 3 columns: Company | Services | Contact & Links
- **Company column:** Logo, blurb, CSLB badge (unchanged from current)
- **Services column:** All 8 services listed with accent dot bullets (unchanged from current)
- **Contact & Links column:** Contact info on top (address, phone, email with icons), navigation links below as secondary section
- Bottom bar unchanged: copyright, SBE Certified, DIR Registered, Fully Insured
- Quick Links column removed as standalone — nav links folded into Contact column

### About page image (ABOUT-01)
- Replace current stock crew photo with a storefront detail image
- Close-up or mid-shot of modern commercial storefront — glass, aluminum framing, clean lines
- Same position in Brand Story section layout — no structural change, just photo swap
- Stock Unsplash image (placeholder until owner provides real photos)

### Claude's Discretion
- Inner page header treatment (PAGE-01) — user skipped this area; Claude decides the richer visual treatment for About, Projects, Contact, and Residential headers
- Specific Unsplash image selection for the About page storefront detail
- Exact styling of the "Quick Stats" button (size, color, icon choice)
- How nav links are styled in the merged Contact & Links footer column
- Whether to add a subtle column divider or spacing between contact info and nav links

</decisions>

<specifics>
## Specific Ideas

No specific requirements — user selected recommended options across all areas, indicating trust in conventional patterns.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ProjectCard` (src/components/ProjectCard.tsx): Currently entire card flips on click. Has `isFlipped`/`isHovered` state, front face with image/content/accent line, back face with stats grid. Needs refactoring to separate click targets.
- `Footer` (src/components/Footer.tsx): 4-column grid (`md:grid-cols-4`). All content exists — restructure from 4 to 3 columns.
- `SectionHeader` (src/components/SectionHeader.tsx): 3 variants (left-bar, banner, overlapping) — could be used or extended for richer page headers.
- `caseStudySlugs` map in ProjectsPage.tsx: Only Cabrillo mapped. This map determines which cards get navigation vs flip behavior.

### Established Patterns
- All inner pages use identical header: `<div className="bg-brand text-white py-16">` with h1 + subtitle
- Font hierarchy: `font-heading` (Bebas Neue) for h1/h2 only, sans-serif elsewhere
- Brand colors: `bg-brand` navy, `text-accent` blue, `bg-stone-50` alternating sections
- Route-aware behavior pattern already exists (FloatingCTA, ContactForm) — could inform card click behavior

### Integration Points
- ProjectCard: needs `slug` or `caseStudyUrl` prop to know whether to navigate or flip
- ProjectsPage: passes `caseStudySlugs` map — could pass slug directly to ProjectCard
- Footer: self-contained component, grid restructure is CSS + JSX reorder
- AboutPage: image URL in Brand Story section (~line 120-140 area)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 11-page-structure-navigation*
*Context gathered: 2026-03-08*
