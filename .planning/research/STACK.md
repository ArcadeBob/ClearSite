# Stack Research

**Domain:** React marketing site — credibility and conversion feature additions
**Researched:** 2026-03-05
**Confidence:** HIGH

## Context

This is a SUBSEQUENT MILESTONE research document. The existing stack (React 18 + TypeScript + Vite + Tailwind CSS 3 + react-router-dom v6 + lucide-react 0.522.0) is validated and in production. This document covers only what is NEW or CHANGED for v1.1.

Existing `package.json` dependencies:
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-router-dom`: ^6.26.2
- `lucide-react`: 0.522.0
- `tailwindcss`: 3.4.17

---

## Recommended Stack

### Core Technologies

No new core framework additions needed. All four v1.1 features are implementable with the existing stack.

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React 18 (existing) | 18.3.1 | Component composition | All new sections are standard React components — no new primitives needed |
| Tailwind CSS 3 (existing) | 3.4.17 | Styling | Brand tokens (`brand`, `accent`) already defined; banner/badge patterns are pure utility classes |
| lucide-react (existing) | 0.522.0 | Icons | `HardHat`, `ShieldCheck`, `ShieldAlert`, `Medal`, `BadgeCheck`, `Gavel`, `Landmark`, `ListChecks`, `ClipboardCheck`, `UserCheck` all confirmed present in 0.522.0 — no upgrade needed |

### Supporting Libraries

No new runtime dependencies are required. The table below confirms decisions verified against the codebase:

| Library | Version | Purpose | Decision |
|---------|---------|---------|----------|
| lucide-react (existing) | 0.522.0 | Safety/credential icons | STAY — `HardHat`, `ShieldCheck`, `BadgeCheck`, `Medal`, `Gavel`, `Landmark` are all confirmed available at this version |
| Formspree (existing, via fetch) | N/A | Form submission | STAY — CTA auto-tagging is a hidden `<input type="hidden" name="source" />` field, no library needed |

### Development Tools

No changes to dev toolchain. Vite 5.2, TypeScript 5.5, ESLint 8.50 remain as-is.

---

## What Changes Per Feature

### Feature 1: Safety Program Expansion (About page)

**What:** New section on AboutPage with EMR stat, OSHA record, training programs, incident prevention protocols.

**Stack impact:** None. Pure JSX + Tailwind. Uses existing `SectionHeader`, `Card`, lucide icons (`HardHat`, `ShieldCheck`, `ListChecks`).

**Pattern to follow:** The existing "Why Choose CGI" grid (9 items, `CheckCircle` icon + title + description) is the right template for a safety practices checklist. The existing `CertificationsBadges` component (icon circle + title + subtitle + description) is the right template for stats (0.87 EMR, Zero OSHA Incidents).

**No new imports needed.**

---

### Feature 2: Prevailing Wage Badge/Banner (sitewide)

**What:** A compact badge or banner communicating DIR registration, PLA, Davis-Bacon, LAUSD, state prevailing wage experience. Appears on HomePage and About page.

**Stack impact:** None. Two implementation options, both using existing stack:

**Option A — Inline banner component (recommended):** A new `PrevailingWageBanner.tsx` component placed within page sections (e.g., after `CertificationsBadges` on HomePage, after the safety section on About). Styled as a navy strip with icon + text + badge chips. Reuses `SectionHeader` pattern.

**Option B — Extend CertificationsBadges:** Add a fifth badge card for "Prevailing Wage Certified" with `Gavel` or `Landmark` icon. Simpler, but less expressive — can't show PLA/Davis-Bacon/LAUSD specificity.

**Recommendation:** Option A. A standalone `PrevailingWageBanner` component gives more room to enumerate all four wage contexts (PLA, Davis-Bacon, LAUSD, State Prevailing Wage) clearly. GCs checking prevailing wage eligibility need to see specifics, not just a badge title.

**Icons confirmed in 0.522.0:** `Gavel` (legal authority), `Landmark` (government/public works), `BadgeCheck` (certification), `HardHat` (trades/field work).

**No new imports needed.**

---

### Feature 3: Expanded Service Sections

**What:** Service cards or sections expanded with technical capability details per service type (storefronts, curtain walls, skylights, etc.).

**Stack impact:** None. The existing `ServiceCard` component in `src/components/ServiceCard.tsx` already renders title + description + icon. Expansion means either:

- Adding a `details?: string[]` prop to `ServiceCard` for a bullet list of technical specs, or
- Creating a new `ServiceDetail` section component on a dedicated expanded view.

**Pattern to follow:** The existing services array in `HomePage.tsx` (8 items with title + description + icon) can be extended with a `capabilities: string[]` field rendered as a `<ul>` inside the card. This matches the "all data hardcoded inline" constraint — no new data layer.

**No new imports needed.** `ChevronDown` or `ArrowRight` (both confirmed present) can be used for any expand/collapse behavior if desired.

---

### Feature 4: CTA Simplification — Two-Path Auto-Tagging

**What:** Two distinct CTA paths — "Request Prequal Package" (commercial) and "Request a Quote" (residential) — using the same Formspree form, differentiated via a hidden field.

**Stack impact:** None. The existing `ContactForm.tsx` already submits via `fetch` to `https://formspree.io/f/mreayoqq` using `new FormData(e.currentTarget)`. Auto-tagging is done by adding:

```tsx
<input type="hidden" name="source" value="commercial" />
// or
<input type="hidden" name="source" value="residential" />
```

This hidden field is included in the `FormData` automatically and appears as a column in Formspree submissions.

**Implementation pattern:** Accept a `source: 'commercial' | 'residential'` prop on `ContactForm`. The prop drives:
1. The hidden `source` field value
2. The submit button label ("Request Prequal Package" vs "Request a Quote")
3. Optionally, which fields are shown (commercial: project type, scope, bid date, file upload; residential: simpler subset)

**Routing consideration:** The Contact page is currently a single route `/contact`. Two-path CTAs can be implemented as:
- URL parameter: `/contact?type=commercial` — ContactPage reads `useSearchParams()` to pass `source` prop to `ContactForm`
- Or two separate entry points that both render the same form with different `source` values

**Recommendation:** URL parameter approach (`useSearchParams`). Already available from `react-router-dom` v6 (no new import — `useSearchParams` is re-exported from the already-installed package). Keeps a single route, single Formspree endpoint, single form component. CTAs across the site link to `/contact?type=commercial` or `/contact?type=residential`.

**No new packages needed.** `useSearchParams` is part of `react-router-dom` v6, already installed.

---

## Installation

No new packages to install. All v1.1 features are achievable with the current dependency set.

```bash
# No npm install needed for v1.1
```

---

## Alternatives Considered

| Feature | Recommended | Alternative | Why Not |
|---------|-------------|-------------|---------|
| Two-path CTA routing | `useSearchParams` on existing `/contact` route | Two separate routes `/contact/commercial` and `/contact/residential` | Adds route complexity, splits Formspree traffic across two endpoints, duplicates ContactPage boilerplate |
| Prevailing wage display | New `PrevailingWageBanner` component | Fifth card in `CertificationsBadges` | Card format too compact to enumerate all four wage frameworks (PLA, Davis-Bacon, LAUSD, State) with context |
| Service expansion | Extend `ServiceCard` with `capabilities` prop | New dedicated service detail page per service | Service detail pages are out of scope for v1.1; expanding the card keeps single-page flow for GCs scanning services |
| Auto-tagging implementation | Hidden `<input name="source">` in FormData | Separate Formspree endpoints per path | Two endpoints = two notification configs = operational complexity with no benefit at this scale |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| New icon libraries (react-icons, heroicons) | Would add a dependency when lucide-react 0.522.0 already has all needed icons (`HardHat`, `Gavel`, `Landmark`, `BadgeCheck`, `Medal`) | lucide-react (existing) |
| Form state management library (react-hook-form, formik) | ContactForm is simple enough — already works with controlled `useState` + FormData; adding a library for one form is overengineering | Native `FormData` + `useState` (existing pattern) |
| Animation library (framer-motion) | Credibility content doesn't need motion choreography; Tailwind transitions already handle hover states | Tailwind `transition-*` utilities (existing pattern) |
| CMS or data layer | All content is owner-approved copy hardcoded inline; no dynamic content fetching is required for v1.1 | Inline data arrays in page components (existing pattern) |
| lucide-react upgrade | 0.522.0 has all icons needed; upgrading risks icon name changes that break existing components | Pin at 0.522.0 |

---

## Stack Patterns by Variant

**For safety stats (EMR, OSHA, zero incidents):**
- Use the `CertificationsBadges` visual pattern: icon circle (bg-brand) + large number + label
- Place within a dedicated "Safety Program" section on AboutPage
- Because: stats need visual weight; the badge card pattern already proven in codebase

**For prevailing wage enumeration (PLA, Davis-Bacon, LAUSD, state):**
- Use a horizontal pill/chip row: `inline-flex items-center gap-2 px-3 py-1 bg-brand/10 rounded-full text-sm font-medium text-brand`
- One chip per wage framework, inside a `PrevailingWageBanner` section
- Because: GCs scan for keywords; chips are scannable, badges are not

**For two-path CTAs on contact page:**
- Read `useSearchParams()` in `ContactPage`, pass `source` to `ContactForm`
- If no param present, default to `'commercial'` (primary audience is GCs)
- Because: the site's primary audience is GCs; commercial should be the default experience

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| lucide-react@0.522.0 | React@18.3.1 | Confirmed working in production |
| react-router-dom@6.26.2 | React@18.3.1 | `useSearchParams` hook available since v6.0 |
| tailwindcss@3.4.17 | Vite@5.2.0 | No changes to config needed for v1.1 |

---

## Sources

- Direct codebase audit (`package.json`, `ContactForm.tsx`, `CertificationsBadges.tsx`, `AboutPage.tsx`, `FloatingCTA.tsx`, `Button.tsx`, `Select.tsx`) — HIGH confidence
- lucide-react 0.522.0 icon inventory verified via `node -e` against installed `node_modules` — HIGH confidence, icons confirmed: `HardHat`, `ShieldCheck`, `ShieldAlert`, `Medal`, `BadgeCheck`, `Gavel`, `Landmark`, `ListChecks`, `ClipboardCheck`, `UserCheck`, `AlertTriangle`, `ChevronDown`, `ChevronRight`
- Formspree hidden field auto-tagging — standard FormData behavior, no library verification needed — HIGH confidence
- react-router-dom v6 `useSearchParams` API — part of v6.0 public API, available in the installed ^6.26.2 — HIGH confidence

---
*Stack research for: ClearSite v1.1 Credibility & Conversion*
*Researched: 2026-03-05*
