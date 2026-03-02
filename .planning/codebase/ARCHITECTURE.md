# Architecture

**Analysis Date:** 2026-03-01

## Pattern Overview

**Overall:** Component-Based Marketing Website with Client-Centric Routing

**Key Characteristics:**
- Single-page application (SPA) with client-side routing via React Router v6
- Layered component architecture: pages compose section components which compose UI primitives
- No backend integration or state management library — all data hardcoded inline within pages
- Scroll-driven animations and interactions (parallax, fade-on-scroll, sticky floating CTA)
- Hybrid rendering: static content + interactive scroll listeners

## Layers

**Presentation (UI Components):**
- Purpose: Render interactive brand-safe UI primitives with consistent variants
- Location: `src/components/ui/`
- Contains: `Button.tsx`, `Card.tsx`, `Input.tsx`, `TextArea.tsx`, `Select.tsx`
- Depends on: Tailwind CSS theme tokens (brand, accent colors), lucide-react icons, React
- Used by: Section components and pages
- Pattern: Variant-based prop APIs (e.g., `variant="primary" | "secondary" | "outline" | "ghost"`, `size="sm" | "md" | "lg"`)

**Section Components (Reusable Sections):**
- Purpose: Combine UI primitives into feature-complete sections (ServiceCard, Testimonial carousel, timeline, etc.)
- Location: `src/components/`
- Contains: `ServiceCard.tsx`, `ProjectCard.tsx`, `SectionHeader.tsx`, `ProcessTimeline.tsx`, `FloatingCTA.tsx`, `TestimonialCarousel.tsx`, `ContactForm.tsx`, and others
- Depends on: UI components, lucide-react, react-router-dom for Links, internal state via `useState`/`useEffect`
- Used by: Page components
- Pattern: Self-contained with internal state, props for data/copy, no prop drilling

**Pages (Route Containers):**
- Purpose: Full page experiences that compose sections and manage page-level state
- Location: `src/pages/`
- Contains: `HomePage.tsx`, `AboutPage.tsx`, `ProjectsPage.tsx`, `CaseStudyPage.tsx`, `ResidentialPage.tsx`, `ContactPage.tsx`, `NotFoundPage.tsx`
- Depends on: Section components, UI components, routing (useParams, Link from react-router-dom)
- Used by: `App.tsx` routing configuration
- Pattern: Inline data objects (services array, projects array, team array, etc.), heavy composition, scroll state management

**Layout (Navigation + App Shell):**
- Purpose: Shared layout structure wrapping all pages
- Location: `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- Contains: Top bar with phone/location, sticky desktop nav, mobile hamburger menu, footer with quick links
- Depends on: React Router, lucide-react icons, UI components
- Used by: `App.tsx` root component

**App Root:**
- Purpose: Define routing, error boundaries, scroll handling
- Location: `src/App.tsx`
- Triggers: Renders from `src/index.tsx`
- Responsibilities: Wraps entire app in `BrowserRouter`, applies `ErrorBoundary`, handles `ScrollToHash` anchor navigation, renders `Navbar` + main routes + `Footer`

## Data Flow

**Static Data Hardcoded Inline:**

1. User navigates to page via URL or link
2. Router matches path to page component in `App.tsx`
3. Page component (e.g., `HomePage.tsx`) renders, initializing hardcoded data objects (services, projects, testimonials)
4. Page composes section components, passing data as props
5. Section components render with data, applying styles via Tailwind classes
6. Interactive state (hover, scroll, form input) managed locally within components via `useState`/`useEffect`

**Scroll-Driven Animations (HomePage):**

1. `HomePage.tsx` attaches `useEffect` listener to `window.scroll` events (passive)
2. Scroll handler updates `scrollY` state
3. Hero section elements use inline `style` objects to compute opacity based on `scrollY` and constants (HERO_BADGE_FADE_PX, HERO_TITLE_FADE_PX, etc.)
4. `FloatingCTA.tsx` similarly listens to scroll, shows/hides sticky bottom bar when `window.scrollY > 500px`

**Form Submission (ContactForm):**

1. User fills form fields in `ContactPage.tsx`
2. On submit, `ContactForm.tsx` sends POST to Formspree endpoint (`FORMSPREE_URL = 'https://formspree.io/f/mreayoqq'`)
3. Response triggers success/error state display
4. File upload validated client-side (max 10MB, accepted formats: `.pdf`, `.dwg`, `.dxf`, `.zip`, `.png`, `.jpg`, `.jpeg`)

**Case Study Navigation (Parameterized Routes):**

1. `CaseStudyPage.tsx` uses `useParams()` to extract `slug` from URL (e.g., `/projects/:slug`)
2. Page defines hardcoded `caseStudies` array with slug matching
3. Lookups return case study object, rendered with all details, phases, gallery images, testimonial

**State Management:**

- No global state (Redux, Zustand, Context)
- All state local to components via `useState`
- Example: `HomePage` tracks `scrollY`, `ProcessTimeline` tracks animation visibility via IntersectionObserver, `ContactForm` tracks form submission state

## Key Abstractions

**SectionHeader:**
- Purpose: Standardized section title pattern (subheading + title + optional description)
- Examples: Used in `ProcessTimeline.tsx`, `GCPainPoints.tsx`, `CertificationsBadges.tsx`, `TestimonialCarousel.tsx`, `HomePage.tsx`
- Pattern: Configurable via props (`subheadingColor`, `titleSize: 'sm' | 'lg'`, `className`)
- Props: `subheading` (string), `title` (string), `description?` (ReactNode), `subheadingColor?` (default `'text-accent'`), `titleSize?` (default `'lg'`), `className?`

**StepIcon (ProcessTimeline):**
- Purpose: Reusable animated step icon circle with conditional number badge
- Examples: Internal sub-component in `ProcessTimeline.tsx`, used for both desktop and mobile layouts
- Pattern: Accepts `isActive` boolean to toggle styling (scale, border color, background color)
- Props: `icon` (ReactNode), `index` (number), `isActive` (boolean), `numberDelay` (string for staggered CSS delay), `size` ('lg' | 'sm')

**Button Variants:**
- Purpose: Single Button component with pluggable visual styles
- Examples: `variant="primary"` (navy brand), `variant="secondary"` (blue accent), `variant="outline"`, `variant="ghost"`
- Pattern: Apply variant classes to base button structure; size variants control padding/height
- Props: `variant?` (default `'primary'`), `size?` (default `'md'`), `fullWidth?`, standard button HTML attributes

**ErrorBoundary:**
- Purpose: Class component that catches React rendering errors app-wide
- Location: `src/components/ErrorBoundary.tsx`
- Pattern: Wraps entire app in `App.tsx`, displays fallback UI with contact phone number on error, logs to console

## Entry Points

**HTML Root:**
- Location: `index.html`
- Triggers: Browser loads HTML, renders `<div id="root"></div>`, loads `/src/index.tsx` as module script
- Responsibilities: SEO metadata (title, description, Open Graph, Twitter Card, JSON-LD schema), favicon, viewport config

**React App Entry:**
- Location: `src/index.tsx`
- Triggers: Vite/browser loads module script from index.html
- Responsibilities: Creates React root via `createRoot()`, imports and renders `<App />` component

**App Component:**
- Location: `src/App.tsx`
- Triggers: Rendered by `src/index.tsx`
- Responsibilities: Wraps app in error boundary, browser router, scroll-to-hash handler; defines all routes; renders layout (Navbar + main + Footer)

**Route Mapping in App.tsx:**
- `/` → `HomePage`
- `/about` → `AboutPage`
- `/projects` → `ProjectsPage`
- `/projects/:slug` → `CaseStudyPage`
- `/residential` → `ResidentialPage`
- `/contact` → `ContactPage`
- `*` → `NotFoundPage`

## Error Handling

**Strategy:** Client-side error boundary with graceful fallback

**Patterns:**
- `ErrorBoundary` class component catches React errors during render
- Fallback UI displays friendly message and contact phone number
- Logs error to console for debugging
- Form errors in `ContactForm.tsx`: file size validation (client), Formspree response error handling, network error fallback
- Missing case study slug: `CaseStudyPage` renders 404-style message if slug doesn't match any case study

## Cross-Cutting Concerns

**Logging:**
- No logging framework configured
- Console.error used in `ErrorBoundary.componentDidCatch()`
- No structured logging or analytics integration

**Validation:**
- File upload validation in `ContactForm.tsx`: checks file size, accepts only specific extensions
- Form fields are standard HTML inputs — no form validation library
- TypeScript types enforce shape of data objects at compile time

**Authentication:**
- Not applicable — marketing website, no authentication
- Contact form uses Formspree (external email service), no user login

**Styling:**
- Tailwind utility classes exclusively
- Brand colors defined as theme tokens in `tailwind.config.js`: `brand` (#1e3a5f), `brand-dark` (#162c47), `accent` (#2563eb), `accent-dark` (#1d4ed8)
- SVGs in `ServiceAreaMap.tsx` use raw hex values inline (not Tailwind classes) — must be manually synced with theme
- Responsive classes (e.g., `md:`, `lg:`, `sm:`) used throughout for mobile-first design

---

*Architecture analysis: 2026-03-01*
