# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClearSite is the marketing website for **Clean Glass Installation (CGI)**, a commercial glazing subcontractor based in Chatsworth, CA. The site targets general contractors (GCs) as the primary audience, with a secondary residential services section. Originally generated from a Magic Patterns design template.

## Commands

- `npm run dev` — Start Vite dev server (typically http://localhost:5173/)
- `npm run build` — Production build via Vite
- `npm run lint` — ESLint across .js/.jsx/.ts/.tsx files
- `npm run preview` — Preview production build locally

No test framework is configured.

## Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS 3 + react-router-dom v6

**Entry point:** `src/index.tsx` renders `<App />` into `#root` using the React 18 `createRoot` API.

**Routing:** `src/App.tsx` wraps all routes in `BrowserRouter` with a shared `Navbar` + `Footer` layout. Routes:
- `/` — HomePage (main landing page, heavily sectioned)
- `/about` — AboutPage
- `/projects` — ProjectsPage
- `/residential` — ResidentialPage
- `/testimonials` — TestimonialsPage
- `/contact` — ContactPage

**Component organization:**
- `src/pages/` — Full page components, one per route. Pages compose section components and contain inline data (services list, team members, project details, etc.).
- `src/components/` — Reusable section-level components (ServiceCard, TestimonialCarousel, ProcessTimeline, FloatingCTA, etc.)
- `src/components/ui/` — Primitive UI components (Button, Card, Input, TextArea) with variant/size prop APIs

**Styling approach:**
- Tailwind utility classes directly in JSX
- Brand colors defined as Tailwind theme tokens in `tailwind.config.js` — use these instead of arbitrary hex values:
  - `brand` (#1e3a5f) — primary navy (e.g. `bg-brand`, `text-brand`)
  - `brand-dark` (#162c47) — darker navy variant
  - `accent` (#2563eb) — accent blue (e.g. `text-accent`, `border-accent`)
  - `accent-dark` (#1d4ed8) — darker accent variant
- Exception: SVG inline attributes in `ServiceAreaMap.tsx` use raw hex values (not Tailwind classes) — keep in sync with tailwind.config.js tokens
- Icons from `lucide-react`

**Shared components:**
- `SectionHeader` — Reusable centered section header (subheading + title + optional description). Props: `subheading`, `title`, `description?` (ReactNode), `subheadingColor?` (default `text-accent`), `titleSize?` (`'sm'` | `'lg'`, default `'lg'`), `className?`. Used in ProcessTimeline, GCPainPoints, CertificationsBadges, TestimonialCarousel, and HomePage.
- `StepIcon` — Internal sub-component in `ProcessTimeline.tsx` for the animated step icon+number circle. Props: `icon`, `index`, `isActive`, `numberDelay`, `size` (`'lg'` | `'sm'`). Used for both desktop and mobile timeline layouts.

**Key patterns:**
- All components use named exports (not default exports)
- No global state management — each component manages its own state via `useState`/`useEffect`
- The ContactForm simulates submission with `setTimeout` (no real backend)
- HomePage uses scroll-position-based opacity animations via a `scrollY` state listener
- FloatingCTA is a scroll-triggered sticky bottom bar that appears after 500px scroll depth
- Data (services, projects, team members, testimonials) is hardcoded inline within page components — there is no data layer or API integration

## Coding Standards Applied

The following cleanup was completed (all steps verified with `npm run build`):

1. **React 18 createRoot** — `src/index.tsx` migrated from legacy `render()` to `createRoot`
2. **Tailwind theme colors** — All 122 arbitrary hex values replaced with `brand`/`brand-dark`/`accent`/`accent-dark` tokens across 23 files
3. **TypeScript strictness** — `stat: any` in `StatsSection.tsx` replaced with `StatData` interface; `as any` in `ProjectsPage.tsx` eliminated via `as const`
4. **Memory leak fix** — `ProcessTimeline.tsx` `setInterval` now stored in `useRef` and cleaned up on unmount
5. **SectionHeader extraction** — Centered header pattern (11 occurrences) deduplicated into `SectionHeader` component; applied to 5 light-background instances
6. **StepIcon deduplication** — Desktop/mobile icon rendering in `ProcessTimeline.tsx` consolidated into shared `StepIcon` sub-component
7. **Dead code removal** — Unused `@emotion/react` dependency removed; dead CSS custom properties in `src/index.css` removed; `package.json` scripts simplified (`npx vite` to `vite`)
