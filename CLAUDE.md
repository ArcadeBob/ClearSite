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

**Routing:** `src/App.tsx` wraps all routes in `BrowserRouter` with a shared `Navbar` + `Footer` layout. An `ErrorBoundary` wraps the entire app, and `ScrollToHash` handles anchor-link scrolling. Routes:
- `/` — HomePage (main landing page, heavily sectioned)
- `/about` — AboutPage
- `/projects` — ProjectsPage
- `/projects/:slug` — CaseStudyPage (individual project detail pages)
- `/residential` — ResidentialPage
- `/contact` — ContactPage
- `*` — NotFoundPage (404 catch-all)

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

## Content Rules

- **No fake testimonials** — Never add fabricated quotes or testimonial content. The TestimonialsPage was intentionally removed.
- **No public pricing** on the residential page
- **Stock images** — Unsplash images are placeholders until owner provides real photos
- Use "same-day budgets" (not "quotes") for commercial; "quote" is fine for residential CTAs
- Use "minimal punch list" (not "zero")
- Bid turnaround is "3-5 business days" (not "48-72 hours")
- Do not put GC contact info (emails/phones) from project references on the public site
