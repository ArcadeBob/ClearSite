# Codebase Structure

**Analysis Date:** 2026-03-01

## Directory Layout

```
clearsite/
├── .claude/                    # Claude Code local settings
├── .git/                       # Git repository
├── .planning/                  # Planning documents directory
│   └── codebase/              # Generated codebase analysis docs
├── .vercel/                    # Vercel deployment config
├── dist/                       # Production build output (generated)
├── docs/                       # Documentation (plans, specs)
├── node_modules/               # npm dependencies (not committed)
├── public/                     # Static assets served directly
│   ├── images/
│   │   └── projects/          # Project case study images
│   ├── logo.png               # Brand logo
│   ├── robots.txt             # SEO robots directive
│   └── sitemap.xml            # XML sitemap for search engines
├── src/                        # Source code
│   ├── components/            # Reusable section & UI components
│   │   ├── ui/                # Primitive UI components
│   │   ├── *.tsx              # Section components
│   │   └── index.css          # Global Tailwind styles
│   ├── pages/                 # Route page components
│   ├── App.tsx                # Root routing component
│   └── index.tsx              # React app entry point
├── .eslintrc.cjs              # ESLint configuration
├── .gitignore                 # Git ignore patterns
├── CLAUDE.md                  # Project instructions for Claude Code
├── index.html                 # HTML entry point (root DOM target)
├── package.json               # npm dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── postcss.config.js          # PostCSS (Tailwind processor)
├── README.md                  # Project readme
├── tailwind.config.js         # Tailwind theme configuration
├── tsconfig.json              # TypeScript compiler config
├── tsconfig.node.json         # TypeScript config for build tools
├── vite.config.ts             # Vite build configuration
└── vercel.json                # Vercel deployment settings
```

## Directory Purposes

**src/components/ui/:**
- Purpose: Primitive, reusable UI components with variant/size props
- Contains: Button, Card, Input, TextArea, Select
- Key files: `Button.tsx` (variant: primary/secondary/outline/ghost, size: sm/md/lg), `Card.tsx` (basic card wrapper), `Input.tsx` (text input with state), `TextArea.tsx` (multi-line input), `Select.tsx` (dropdown)
- Pattern: Each component exports a named function with TypeScript interface for props

**src/components/:**
- Purpose: Section-level components that compose UI components into features
- Contains: `ServiceCard.tsx`, `ProjectCard.tsx`, `ProcessTimeline.tsx`, `ContactForm.tsx`, `FloatingCTA.tsx`, `SectionHeader.tsx`, `TestimonialCarousel.tsx`, `GCPainPoints.tsx`, `CertificationsBadges.tsx`, `ClientLogos.tsx`, `StatsSection.tsx`, `ServiceAreaMap.tsx`, `PromiseSection.tsx`, `GCResourcesSection.tsx`
- Special files: `ErrorBoundary.tsx` (class component, error handling), `ScrollToHash.tsx` (utility component for anchor navigation), `Navbar.tsx` (layout header), `Footer.tsx` (layout footer)

**src/pages/:**
- Purpose: Full-page components that route to specific URLs
- Contains: `HomePage.tsx`, `AboutPage.tsx`, `ProjectsPage.tsx`, `CaseStudyPage.tsx`, `ResidentialPage.tsx`, `ContactPage.tsx`, `NotFoundPage.tsx`
- Pattern: Each page composes multiple section components and manages page-level state/data

**public/images/projects/:**
- Purpose: Host project case study and featured project images
- Contains: Named JPG files for each project (e.g., `cabrillo-business-park.jpg`, `cloud-nine-hangar.jpg`, `marina-drive.jpg`, etc.)
- Naming: Kebab-case project names matching case study slugs

**public/:**
- Purpose: Serve static assets without processing by Vite
- Contains: logo.png (brand logo), robots.txt (SEO), sitemap.xml (SEO), images/ directory

**docs/:**
- Purpose: Project documentation and planning
- Contains: Plan files created during phases, e.g., `2026-02-27-content-review-plan.md`

**.planning/codebase/:**
- Purpose: Auto-generated codebase analysis documents
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, STACK.md, INTEGRATIONS.md, CONCERNS.md (as written)

## Key File Locations

**Entry Points:**
- `index.html` — HTML root document, SEO metadata, renders `<div id="root"></div>`
- `src/index.tsx` — React entry point, creates root and renders `<App />`
- `src/App.tsx` — Root component, routing definition, layout wrapping

**Configuration:**
- `tsconfig.json` — TypeScript strict mode, ES2020 target, JSX as react-jsx
- `vite.config.ts` — Minimal Vite setup with React plugin
- `tailwind.config.js` — Brand color tokens (brand, brand-dark, accent, accent-dark)
- `.eslintrc.cjs` — ESLint with TypeScript and React Hooks rules
- `package.json` — React 18.3, react-router-dom v6, TypeScript 5.5, Tailwind 3.4, lucide-react icons

**Core Logic:**
- `src/pages/HomePage.tsx` — Landing page with hero parallax, services, projects, process timeline, stats, testimonials
- `src/pages/CaseStudyPage.tsx` — Individual project detail page, slug-based routing
- `src/pages/ContactPage.tsx` — Contact form (Formspree), prequalification packet copy, FAQ, trust badges
- `src/pages/ProjectsPage.tsx` — Projects gallery grid with filters and case study links
- `src/components/ContactForm.tsx` — Reusable contact/inquiry form with file upload, Formspree integration
- `src/components/ProcessTimeline.tsx` — Animated 4-step timeline with scroll trigger animations

**Styling & Layout:**
- `src/components/ui/Button.tsx` — Foundational button with 4 variants, 3 sizes
- `src/components/Navbar.tsx` — Sticky nav with top bar (phone/location), desktop menu, mobile hamburger
- `src/components/Footer.tsx` — Footer with logo, quick links, services, contact info
- `src/index.css` — Imported in `src/index.tsx`, contains Tailwind directives and any global styles

**Testing:**
- Not applicable — no test framework configured

**Utilities/Helpers:**
- `src/components/ScrollToHash.tsx` — Scroll-to-anchor on hash navigation, page reload on path change
- `src/components/ErrorBoundary.tsx` — App-level error boundary with fallback UI

## Naming Conventions

**Files:**
- React components: `PascalCase.tsx` (e.g., `HomePage.tsx`, `ServiceCard.tsx`)
- Non-component files: `camelCase.ts` or lowercase with hyphens if utilities (e.g., `index.css`)
- Page components: Named with "Page" suffix (e.g., `AboutPage.tsx`, `ContactPage.tsx`)
- UI primitives: Descriptive names matching semantic HTML or component purpose (e.g., `Button.tsx`, `Card.tsx`, `Input.tsx`)
- Projects in public/images/: Kebab-case matching case study slugs (e.g., `cabrillo-business-park.jpg`)

**Directories:**
- Feature-based grouping: `components/`, `pages/`, `components/ui/`
- No feature-specific folders (e.g., no `src/features/services/` or `src/modules/auth/`)
- Flat structure within `components/` — all section components at same level

**Variables/Functions:**
- camelCase for all variables and function names
- PascalCase only for React components and type interfaces
- Constants in UPPER_SNAKE_CASE (e.g., `PARALLAX_FACTOR`, `HERO_BADGE_FADE_PX`, `MAX_FILE_SIZE_BYTES`)
- Boolean state vars prefixed with `is` (e.g., `isVisible`, `isSubmitting`, `isDismissed`, `isActive`, `isOpen`)

**Routes/Slugs:**
- Kebab-case for URL paths (e.g., `/projects/:slug` with `cabrillo-business-park`, `cloud-nine-hangar`)
- Exact match in `caseStudies` array slug field for lookups

**Data Objects:**
- Array objects use consistent field names: `title`, `location`, `client`, `value`, `scope`, `description`, `icon`, `imageUrl`, `status`
- Enums for status: `'Completed' | 'Current' | 'Future'`

## Where to Add New Code

**New Page/Route:**
1. Create page component in `src/pages/NewPage.tsx` (export named function)
2. Import in `src/App.tsx`
3. Add Route entry in routes array: `<Route path="/new-page" element={<NewPage />} />`
4. Link to route in Navbar or Footer via `<Link to="/new-page">`

**New Section Component:**
1. Create component in `src/components/NewSection.tsx`
2. Define data object inline (array of objects, if needed)
3. Compose UI primitives from `src/components/ui/`
4. Import in page component, pass data as props
5. Apply Tailwind classes directly in JSX (no separate CSS file)

**New UI Primitive:**
1. Create component in `src/components/ui/NewComponent.tsx`
2. Define TypeScript interface for props (extend HTML element attributes if button-like)
3. Export named function
4. Use variant/size pattern if multiple visual states needed
5. Import and use in section components

**New Project/Case Study:**
1. Add project image to `public/images/projects/project-name.jpg`
2. Add project object to `caseStudies` array in `src/pages/CaseStudyPage.tsx` with slug, title, details, phases, gallery images
3. Add project object to `projects` array in `src/pages/ProjectsPage.tsx` with title, location, client, value, scope, status, imageUrl
4. Add featured project to `featuredProjects` array in `src/pages/HomePage.tsx` (optional)
5. Update `caseStudySlugs` lookup object in `src/pages/ProjectsPage.tsx` if case study has a dedicated page

**New Testimonial/Data:**
- Add to relevant data array in page component (e.g., `testimonials` in `HomePage.tsx`, `teamMembers` in `AboutPage.tsx`)
- Follow existing object structure (title, description, quote, name, company, icon, etc.)

**Styling Updates:**
- Modify `tailwind.config.js` to extend theme (add colors, fonts, spacing)
- Use Tailwind utility classes directly in JSX components
- Exception: SVG inline attributes in `ServiceAreaMap.tsx` — keep hex values synced with theme tokens

## Special Directories

**dist/:**
- Purpose: Production build output
- Generated: Yes (by `npm run build`)
- Committed: No (in .gitignore)
- Contents: Bundled JS, CSS, assets optimized by Vite

**node_modules/:**
- Purpose: npm dependency installations
- Generated: Yes (by `npm install`)
- Committed: No (in .gitignore)
- Contains: React, react-router-dom, TypeScript, Vite, Tailwind, ESLint, and transitive deps

**.git/:**
- Purpose: Git version control repository
- Committed: Yes (repo metadata)

**.env* files:**
- Not used in this project (no environment configuration file checked in)
- Contact form uses hardcoded Formspree endpoint URL in `ContactForm.tsx`
- Vercel deployment likely uses env vars for production secrets (not visible in codebase)

---

*Structure analysis: 2026-03-01*
