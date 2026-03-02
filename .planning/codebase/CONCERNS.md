# Codebase Concerns

**Analysis Date:** 2026-03-01

## Anti-Patterns in List Rendering

**Index-based keys used in dynamic lists:**
- Issue: Multiple components use `key={index}` for array rendering, which violates React's key best practices. This can cause serious issues if list items are reordered, filtered, or if the array length changes.
- Files:
  - `src/components/TestimonialCarousel.tsx` (lines 87, 130) — testimonials carousel with dynamic auto-rotation
  - `src/pages/CaseStudyPage.tsx` (lines 313, 365, 432) — project overview paragraphs, phases, and gallery images
  - `src/pages/ResidentialPage.tsx` (line 97) — list rendering
- Impact: Component state (focus, input values) may be associated with wrong list items after updates. Animation/transitions may behave incorrectly. Re-renders could display cached data from previous items.
- Fix approach: Replace with unique identifiers from data objects. For overview paragraphs in CaseStudyPage, create `id` fields or use `paragraph.slice(0, 20)` as fallback. For phases and gallery, add `id` or `slug` fields to data structures.

## Missing Test Framework

**No testing infrastructure configured:**
- Issue: `package.json` explicitly documents "No test framework is configured" (CLAUDE.md). Zero test files exist in the codebase.
- Files: No test files; testing capability completely absent
- Impact:
  - No safety net for refactoring
  - Contact form submission flow (Formspree integration) untested
  - Dynamic animations and scroll effects not validated
  - Complex data rendering in CaseStudyPage and ProjectsPage not covered
- Priority: High for production site
- Fix approach: Install Jest or Vitest. Start with critical paths: ContactForm submission, project slug routing in CaseStudyPage, carousel auto-rotation logic in TestimonialCarousel.

## Unused/Orphaned Code

**Hardcoded Formspree URL:**
- Issue: `src/components/ContactForm.tsx` hardcodes Formspree URL (`https://formspree.io/f/mreayoqq`) directly in code at line 8. No environment variable, no configuration.
- Files: `src/components/ContactForm.tsx` (line 8)
- Impact: Secrets are embedded in compiled bundle. Changing email endpoint requires code modification + redeployment. No separation of config from code.
- Fix approach: Move to `.env` file as `VITE_FORMSPREE_URL` and import via `import.meta.env.VITE_FORMSPREE_URL`. Update .gitignore to prevent .env commits.

## Data Layer / Hardcoded Content

**All site data is hardcoded inline:**
- Issue: No data abstraction layer. Services, projects, testimonials, certifications, team members, and statistics are all hardcoded in page components.
- Files:
  - `src/pages/HomePage.tsx` — services array, featured projects
  - `src/pages/ProjectsPage.tsx` — 17 projects with status filtering
  - `src/pages/CaseStudyPage.tsx` — single case study (548 lines)
  - `src/pages/AboutPage.tsx` — team member details
  - `src/components/TestimonialCarousel.tsx` — 4 testimonials
- Impact:
  - Any content update requires code change + redeploy
  - Adding new projects requires manual array entry (high error risk)
  - No way to manage content without developer involvement
  - CaseStudyPage is 548 lines due to massive inline data object
- Risk: High maintenance burden; owner cannot self-publish updates
- Fix approach: Extract data to `src/data/projects.ts`, `src/data/team.ts`, `src/data/testimonials.ts`. Eventually migrate to headless CMS (Contentful, Strapi) or JSON API.

## Accessibility Issues

**Dynamic content without proper ARIA labels:**
- Issue: TestimonialCarousel auto-rotates testimonials every 5 seconds with mouse pause. Carousel buttons have generic `aria-label` but no `role="region"` or `aria-live` to announce changes.
- Files: `src/components/TestimonialCarousel.tsx` (lines 43-142)
- Impact: Screen reader users won't be notified of carousel auto-advance. No pause indication for keyboard users.
- Fix approach: Add `aria-live="polite"` and `aria-label="Testimonials carousel"` to carousel container. Add `role="status"` to current testimonial display.

**Image alt text gaps:**
- Issue: `src/pages/HomePage.tsx` hero image has alt text, but some project card images may be missing or generic.
- Files: `src/pages/HomePage.tsx` (line 146) has good alt text; check ProjectCard.tsx
- Fix approach: Audit all `<img>` tags. Ensure descriptive alt text beyond just project names (e.g., "Curtain wall installation at Cabrillo Business Park exterior").

## Scroll Performance

**Heavy scroll listeners on HomePage:**
- Issue: `HomePage.tsx` uses scroll position listener (lines 120-128) with no throttle/debounce for parallax effect. Event fires on every pixel scrolled.
- Files: `src/pages/HomePage.tsx` (lines 120-128)
- Impact: On low-end devices or mobile, scroll performance degrades. May cause layout thrashing if scroll event triggers expensive DOM reads.
- Fix approach: Implement `requestAnimationFrame` throttling or use Intersection Observer for parallax sections instead of scroll events. Use `passive: true` (already done) but add throttle logic.

**Timer-based animations:**
- Issue: ProcessTimeline uses `setInterval` to animate line progress (line 62). Runs at 30ms intervals regardless of view state.
- Files: `src/components/ProcessTimeline.tsx` (lines 51-81)
- Impact: Timer runs and consumes CPU even if section is off-screen after initial animation. Properly cleaned up but animation design is inefficient.
- Fix approach: Use CSS animations with `@keyframes` and `animation-fill-mode: forwards` instead of JS intervals. Trigger only on visibility.

## Type Safety Gaps

**Unsafe type casts with `as const`:**
- Issue: Status fields in ProjectsPage and CaseStudyPage use repeated `as const` assertions instead of TypeScript `satisfies` or type definitions.
- Files:
  - `src/pages/ProjectsPage.tsx` (lines 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108, 117, 126, 135, 144, 153, 162, 189)
  - `src/pages/CaseStudyPage.tsx` (lines 155, 164, 173)
- Impact: Every status field needs redundant type assertion. If status union type changes, assertions must be updated manually.
- Fix approach: Define once: `type ProjectStatus = 'Current' | 'Completed' | 'Future'` in a types file. Use `satisfies ProjectStatus` for type narrowing without runtime assertion.

**Console.error left in production:**
- Issue: `ErrorBoundary.tsx` line 23 logs to console in production: `console.error('ErrorBoundary caught:', error, info)`.
- Files: `src/components/ErrorBoundary.tsx` (line 23)
- Impact: Error details exposed in user browser console; may leak sensitive info in production.
- Fix approach: Wrap in conditional: `if (process.env.NODE_ENV === 'development') console.error(...)` or use error logging service (Sentry, LogRocket) for production.

## Content / Business Logic Issues

**Broken CaseStudyPage routing:**
- Issue: Only one case study exists in `caseStudies` array (`cabrillo-business-park`). CaseStudyPage fetches by `:slug` param but has no fallback or 404 handling if slug not found.
- Files: `src/pages/CaseStudyPage.tsx` (lines 65-146, 212-217)
- Impact: Visiting `/projects/any-nonexistent-slug` will cause `caseStudy` to be undefined, leading to runtime errors when rendering.
- Fix approach: Add guard at line 212: `if (!caseStudy) return <NotFoundPage />;` OR create more case study entries to match project cards.

**Project slug mismatch between pages:**
- Issue: ProjectsPage lists 17 projects, but CaseStudyPage only has 1 case study. The `caseStudySlugs` mapping at ProjectsPage line 7 only has one entry.
- Files:
  - `src/pages/ProjectsPage.tsx` (lines 7-9, 11-162)
  - `src/pages/CaseStudyPage.tsx` (lines 65-146)
- Impact: Clicking "View Details" on most projects will 404 or show wrong case study.
- Fix approach: Add case study entries for top 3-5 projects, or hide "View Details" link for projects without case studies.

**SVG hex colors out of sync with Tailwind tokens:**
- Issue: CLAUDE.md notes that `ServiceAreaMap.tsx` uses raw hex values in SVG attributes that must stay synchronized with `tailwind.config.js` tokens manually.
- Files: `src/components/ServiceAreaMap.tsx` (SVG inline styles)
- Impact: If brand colors change, SVG won't update automatically. Easy to forget to sync.
- Fix approach: Extract SVG colors to JavaScript constants that reference Tailwind config, or convert SVG to CSS+JS rendering.

**Missing image files:**
- Issue: HomePage uses Unsplash placeholder URLs (temporary). ProjectsPage and CaseStudyPage reference local image paths that may not exist.
- Files:
  - `src/pages/HomePage.tsx` (line 145 — Unsplash URL)
  - `src/pages/ProjectsPage.tsx` (lines 19, 28, etc. — local `/images/projects/` paths)
  - CLAUDE.md notes: "Stock images — Unsplash images are placeholders until owner provides real photos"
- Impact: Production site may show broken image icons if real photos not uploaded.
- Fix approach: Ensure all `/public/images/projects/*.jpg` files exist. Document that placeholder images must be replaced before launch.

## Form Validation Gaps

**Contact form file upload lacks validation feedback:**
- Issue: File size validation exists (lines 46-51) but filetype validation is only client-side (`accept` attribute on input). No file extension check.
- Files: `src/components/ContactForm.tsx` (lines 195-207)
- Impact: User could submit file with wrong extension if they bypass browser restrictions.
- Fix approach: Add server-side validation on Formspree or add JS mime-type check: `const validTypes = ['application/pdf', 'application/x-autocad-dxf', ...]; if (!validTypes.includes(file.type)) ...`

**Form submission feedback incomplete:**
- Issue: Form shows success message after submission but doesn't reset form state (e.g., `fileName`, input values).
- Files: `src/components/ContactForm.tsx` (line 98 — success state; missing form reset)
- Impact: User sees success but form still shows previously entered data + filename, creating confusion if they send another.
- Fix approach: Add `<form ref={formRef}> ... formRef.current?.reset()` on line 74 (after success), and clear all state: `setFileName(null); clearFile();`

## Security Concerns

**CORS/CSRF not explicitly handled:**
- Issue: Formspree integration uses POST with `credentials` mode implicit. No CSRF token or origin validation.
- Files: `src/components/ContactForm.tsx` (lines 68-72)
- Impact: If site is embedded in iframe or accessed cross-origin, form requests could be intercepted. Formspree handles this, but not explicitly documented.
- Fix approach: Verify Formspree CORS settings. Add `credentials: 'same-origin'` explicitly if form is same-domain only. Document CORS policy.

**No error boundary fallback for external APIs:**
- Issue: If Formspree endpoint is down or unreachable, user sees generic error message with no retry mechanism.
- Files: `src/components/ContactForm.tsx` (lines 76-79 — generic error handling)
- Impact: Lost lead during service outage.
- Fix approach: Add retry logic (exponential backoff), or better: use client library that handles retries. Consider adding status page link in error message.

## Dead Code / Technical Debt

**Unused `caseStudySlugs` mapping:**
- Issue: `ProjectsPage.tsx` line 7 defines `caseStudySlugs` but it's only used for one project. Suggests incomplete refactoring.
- Files: `src/pages/ProjectsPage.tsx` (lines 7-9)
- Impact: Code maintenance burden; unused objects are confusing.
- Fix approach: Either populate fully for all major projects, or delete and handle routing in ProjectCard component directly.

**Large monolithic page components:**
- Issue: CaseStudyPage (548 lines), HomePage (469 lines), and AboutPage (379 lines) contain entire case studies/content inline.
- Files: `src/pages/CaseStudyPage.tsx`, `src/pages/HomePage.tsx`, `src/pages/AboutPage.tsx`
- Impact: Files are hard to maintain, refactor, and test. Lots of repetitive JSX boilerplate.
- Fix approach: Extract hero, sections, and data to separate component files. Example: `CaseStudyHero.tsx`, `CaseStudyPhases.tsx`.

## Build / Dependency Management

**Outdated TypeScript/ESLint plugins:**
- Issue: `@typescript-eslint` is at v5.54.0 (current is v7+). No explicit upgrade path documented.
- Files: `package.json` (lines 22-26)
- Impact: Missing modern rule improvements, performance fixes, type checking enhancements.
- Fix approach: Run `npm audit` and plan upgrade. Note: Breaking changes likely — test thoroughly.

**No environment variable type safety:**
- Issue: Code references `import.meta.env.VITE_*` but no TypeScript definitions or `.d.ts` file documents what env vars are available.
- Files: All files using Vite env vars (currently just ContactForm hardcodes instead)
- Impact: Developers can't autocomplete env var names. Easy to reference undefined variables.
- Fix approach: Create `src/vite-env.d.ts` with proper `ImportMetaEnv` interface extending types.

---

*Concerns audit: 2026-03-01*
