# ClearSite Content & Style Update

## What This Is

A focused update to the ClearSite marketing website for Clean Glass Installation (CGI). Three changes: restyle the contact page header to match other page heroes, update project portfolio statuses (current → completed, future → current), and replace the About page stock image with a team/crew photo that fits a commercial glazing company.

## Core Value

Visual consistency across all pages and accurate, up-to-date project portfolio data.

## Requirements

### Validated

- ✓ Multi-page marketing site with React Router — existing
- ✓ Consistent brand colors (navy/accent) across pages — existing
- ✓ Project portfolio with status filtering (Completed/Current/Future) — existing
- ✓ Contact page with SectionHeader and form — existing
- ✓ About page with brand story section and image — existing

### Active

- [ ] Contact page header restyled to match About/Projects page hero pattern
- [ ] All current projects moved to completed status
- [ ] All future projects moved to current status
- [ ] About page image replaced with team/crew photo relevant to commercial glazing

### Out of Scope

- Content/copy changes to contact header — style only
- Project description or detail changes — status labels only
- Any new pages or routes
- Backend integration or data layer changes

## Context

- Contact page currently uses `SectionHeader` on a `bg-brand` background — structurally similar to other pages but the visual treatment may differ in padding, layout, or decoration compared to About and Projects heroes
- Projects page data is hardcoded inline with a `status` field ('Current' | 'Future' | 'Completed')
- About page uses an Unsplash stock photo (photo-1581094794329-c8112a89af12) — needs replacement with a more domain-appropriate team/crew image
- All pages share `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container pattern

## Constraints

- **No real photos available**: Owner hasn't provided team photos yet — use a better-fitting Unsplash stock photo of glazing/construction crew
- **No content changes**: Contact header copy stays the same, only visual style changes
- **Data inline**: Project statuses are hardcoded in `ProjectsPage.tsx` — change status strings directly

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Unsplash crew photo | No real team photos available yet | — Pending |
| Match hero to About/Projects style | User wants visual consistency | — Pending |

---
*Last updated: 2026-03-02 after initialization*
