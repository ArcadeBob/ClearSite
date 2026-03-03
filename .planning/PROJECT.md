# ClearSite — Clean Glass Installation Marketing Site

## What This Is

The marketing website for Clean Glass Installation (CGI), a commercial glazing subcontractor in Chatsworth, CA. Targets general contractors with project portfolio, service details, and prequalification flow. Built with React 18 + TypeScript + Vite + Tailwind CSS.

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

### Active

(None — planning next milestone)

### Out of Scope

- Content/copy changes to contact header — style only needed
- Project description or detail changes — status labels only
- Backend integration or data layer changes — site remains static/hardcoded
- Real team photos — owner hasn't provided them yet, Unsplash placeholders work well

## Context

Shipped v1.0 with 4,841 LOC TypeScript.
Tech stack: React 18, TypeScript, Vite, Tailwind CSS 3, react-router-dom v6.
All three top-level pages (About, Projects, Contact) now share identical hero pattern.
Portfolio shows 14 Completed, 3 Current, 0 Future projects.
All images remain Unsplash placeholders until owner provides real photos.

## Constraints

- **No real photos available**: Owner hasn't provided team photos — using Unsplash stock
- **Data inline**: All project/service data hardcoded in page components — no API layer
- **No test framework**: No unit/integration tests configured

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Unsplash crew photo for About page | No real team photos available yet | ✓ Good — photo-1565008447742 fits commercial glazing context |
| Match Contact hero to About/Projects style | User wants visual consistency | ✓ Good — all 3 pages now share identical hero pattern |
| Keep 'Future' filter tab with 0 projects | Graceful empty state, removing tab out of scope | ✓ Good — shows "No projects found" cleanly |
| Raw h1+p markup instead of SectionHeader for Contact hero | SectionHeader rendered invisible h2 on dark background | ✓ Good — resolved visual bug while matching other heroes |

---
*Last updated: 2026-03-03 after v1.0 milestone*
