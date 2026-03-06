# Architecture Research

**Domain:** React marketing site — static, hardcoded, no data layer
**Researched:** 2026-03-05
**Confidence:** HIGH — all conclusions drawn directly from reading the live source tree

---

## Existing System Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        App.tsx (Router Shell)                 │
│   ErrorBoundary > BrowserRouter > Navbar > <main> > Footer   │
├──────────────────────────────────────────────────────────────┤
│                         Pages Layer                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ HomePage │ │AboutPage │ │ContactPage│ │Residential│        │
│  │          │ │          │ │          │ │ Page      │        │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘        │
│       │             │            │             │              │
├───────┴─────────────┴────────────┴─────────────┴─────────────┤
│                     Section Components                        │
│  CertificationsBadges  GCPainPoints  ProcessTimeline         │
│  StatsSection  ClientLogos  GCResourcesSection               │
│  PromiseSection  ServiceAreaMap  FloatingCTA                 │
│  ServiceCard  ProjectCard  ContactForm                       │
├──────────────────────────────────────────────────────────────┤
│                      Shared Primitives                        │
│        SectionHeader  StepIcon                               │
├──────────────────────────────────────────────────────────────┤
│                       UI Atoms                                │
│         Button  Card  Input  TextArea  Select                │
└──────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | State |
|-----------|----------------|-------|
| `App.tsx` | Router, global layout shell | none |
| `Navbar.tsx` | Navigation, sticky top bar, mobile menu | `isOpen` (mobile toggle) |
| `Footer.tsx` | Links, contact info, certification pills | none |
| `FloatingCTA.tsx` | Scroll-triggered sticky bar | `isVisible`, `isDismissed` |
| `CertificationsBadges.tsx` | 4-credential grid (CSLB, SBE, DIR, EMR) | none |
| `ContactForm.tsx` | Formspree POST, file upload, success/error | `isSubmitting`, `isSuccess`, `error`, file state |
| `SectionHeader.tsx` | Reusable centered heading block | none |
| `ServiceCard.tsx` | Animated hover service tile | `isHovered` |
| `GCPainPoints.tsx` | 6-panel problem/solution grid | none |
| `HomePage` (page) | Full landing page, scroll-parallax hero | `scrollY` |
| `AboutPage` (page) | About content, team, milestones | none |
| `ContactPage` (page) | Form + sidebar + FAQ inline | none |

---

## Current Project Structure

```
src/
├── pages/                    # Full-page components, one per route
│   ├── HomePage.tsx          # Main landing page (heavy — 465 LOC)
│   ├── AboutPage.tsx         # About/team/milestones (380 LOC)
│   ├── ContactPage.tsx       # Form + sidebar + FAQ (271 LOC)
│   ├── ResidentialPage.tsx   # Residential services (230 LOC)
│   ├── ProjectsPage.tsx      # Portfolio with filter tabs
│   ├── CaseStudyPage.tsx     # Individual project detail
│   └── NotFoundPage.tsx      # 404
├── components/               # Section-level reusable components
│   ├── CertificationsBadges.tsx
│   ├── ClientLogos.tsx
│   ├── ContactForm.tsx       # Formspree integration + file upload
│   ├── FloatingCTA.tsx       # Scroll-triggered sticky bar
│   ├── GCPainPoints.tsx
│   ├── GCResourcesSection.tsx
│   ├── ProcessTimeline.tsx
│   ├── PromiseSection.tsx
│   ├── ProjectCard.tsx
│   ├── SectionHeader.tsx     # Shared heading primitive
│   ├── ServiceAreaMap.tsx
│   ├── ServiceCard.tsx
│   ├── StatsSection.tsx
│   └── ui/                   # Atomic UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── TextArea.tsx
└── App.tsx                   # Router shell
```

---

## v1.1 Feature Integration Map

This section is the primary output for the downstream roadmap. For each v1.1 feature, it identifies the integration point, whether a new component is required or an existing one is modified, and what the component boundary looks like.

### Feature 1: Safety Credentials Section (About Page)

**What's being added:** An expanded safety program section on `AboutPage` — EMR, OSHA record, toolbox talks, training practices, incident prevention protocols.

**Integration point:** `src/pages/AboutPage.tsx` — new `<section>` block inserted between the "Company Milestones" section (line ~158) and the "Mission, Goal, Promise" section (line ~225).

**New component required:** `SafetySection` in `src/components/SafetySection.tsx`

Rationale: The existing `AboutPage` already has 380 LOC of inline sections. Adding another 80-100 LOC inline follows the page's existing pattern for smaller sections (values, milestones), but safety is a distinct credential category with enough data (EMR number, OSHA stats, training programs, protocols) to justify extraction. Extracting also allows HomePage to potentially reuse a compact `SafetyHighlightBanner` variant in the future.

**Props interface:**
```typescript
// No props needed — data hardcoded inline per existing pattern
export function SafetySection(): React.JSX.Element
```

**Data shape (hardcoded inline, matches existing pattern):**
```typescript
const safetyStats = [
  { label: 'EMR Rating', value: '0.87', note: 'Industry avg: 1.0' },
  { label: 'OSHA Recordables', value: 'Zero', note: 'Since founding' },
  { label: 'Training Hours', value: 'Annual', note: 'Per crew member' },
];

const safetyPrograms = [
  { title: 'Toolbox Talks', description: '...' },
  { title: 'Fall Protection', description: '...' },
  // ...
];
```

**Visual pattern:** Use brand-navy stat callouts (matching `StatsSection` visual language) + icon-and-text list (matching `GCPainPoints` list pattern). No new UI primitives needed.

---

### Feature 2: Prevailing Wage Badge / Banner (Sitewide)

**What's being added:** A persistent visual signal that CGI is DIR-registered, prevailing wage certified, with specific experience (PLA, Davis-Bacon, LAUSD, state prevailing wage). Required on: homepage + About page. May be appropriate on ContactPage trust bar.

**Key constraint:** "Sitewide" here means strategic placement, not a global layout component. The Navbar and Footer already contain certification references. A new layout-level banner between Navbar and page content would affect ALL pages (including Residential, Projects) where it is off-topic. Avoid this approach.

**Correct integration:** Place a `PrevailingWageBanner` component as a targeted section inclusion, not a global layout element.

**New component required:** `PrevailingWageBanner` in `src/components/PrevailingWageBanner.tsx`

**Placement map:**
| Page | Where to insert | How |
|------|-----------------|-----|
| `HomePage.tsx` | After `<CertificationsBadges />` (line ~339) | `<PrevailingWageBanner />` |
| `AboutPage.tsx` | After milestones section, before or after `<SafetySection />` | `<PrevailingWageBanner />` |
| `ContactPage.tsx` | Optional: extend existing `trustBadges` array with prevailing wage entries | Modify inline data array, not new component |

**Props interface:**
```typescript
interface PrevailingWageBannerProps {
  variant?: 'full' | 'compact';  // full = section-level, compact = strip
}
export function PrevailingWageBanner({ variant = 'full' }: PrevailingWageBannerProps)
```

**Visual pattern:** Horizontal banner or section block with DIR badge icon, "Prevailing Wage Certified" headline, and a row of badge pills: PLA | Davis-Bacon | State Prevailing Wage | LAUSD. Use `ShieldCheck` or `FileCheck` from lucide-react (already imported in `CertificationsBadges.tsx` and `ContactPage.tsx`). Background: `bg-slate-50` with `border-y border-slate-200` to sit naturally between sections.

**Anti-pattern to avoid:** Do NOT insert this into `App.tsx` as a layout-level child — it would render on every page including Residential and Projects where it is irrelevant and visually disruptive.

---

### Feature 3: Expanded Service Sections

**What's being added:** Technical capability details for each service type — not just one-liner descriptions but spec-level content (system types, performance specs, applications, code considerations).

**Integration decision:** This is a pure data expansion, not a structural change. The `ServiceCard` component currently accepts `{ title, description, icon }`. Two paths exist:

**Path A — Extend ServiceCard props (recommended):**
Add an optional `details?: string[]` prop. When present, ServiceCard renders an expandable bullet list on hover or a "Learn more" micro-section. This preserves the card grid layout.

```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string[];          // NEW — optional technical specs
  applications?: string[];     // NEW — optional application contexts
}
```

**Path B — New ServiceDetailSection component:**
A separate full-width section below the card grid with tabbed or accordion layout. Use this if the content volume per service is large (5+ bullet points per service, or if linking to dedicated service sub-pages is a future consideration).

**Recommendation:** Start with Path A (extend `ServiceCard`). The content is brief per service. If content grows beyond 4 bullets per service, extract to Path B in a future phase.

**Affected files:**
- `src/components/ServiceCard.tsx` — add optional `details` prop + conditional render
- `src/pages/HomePage.tsx` — update `services` array entries with detail data
- No new files required unless going Path B

---

### Feature 4: CTA Simplification — Two-Path Form with Auto-Tagging

**What's being added:** A clear commercial vs. residential CTA fork. Currently all CTAs point to `/contact` (single destination). The requirement is "same form, auto-tagged" — meaning the ContactForm receives a signal about which path the user came from and pre-populates or auto-tags the submission.

**Integration point:** This is a URL parameter + form state problem. The existing `ContactForm` submits to Formspree. The cleanest solution uses React Router's `useLocation` or `useSearchParams` to read a query param.

**Approach:**
1. Commercial CTAs link to `/contact?type=commercial`
2. Residential CTAs link to `/contact?type=residential`
3. `ContactPage.tsx` reads `?type` param and passes it to `ContactForm` as a prop
4. `ContactForm` includes a hidden `<input name="inquiryType" />` field that auto-fills the value — Formspree captures it in submission metadata

**Changes required:**

`src/pages/ContactPage.tsx` — add `useSearchParams` hook:
```typescript
import { useSearchParams } from 'react-router-dom';

const [searchParams] = useSearchParams();
const inquiryType = searchParams.get('type') ?? 'commercial'; // default to commercial
```

Pass to `ContactForm`:
```typescript
<ContactForm inquiryType={inquiryType} />
```

Optionally: update the ContactPage hero heading to reflect the path:
```typescript
const heroTitle = inquiryType === 'residential'
  ? 'Request a Residential Quote'
  : 'Request Prequalification Packet';
```

`src/components/ContactForm.tsx` — add `inquiryType` prop + hidden field:
```typescript
interface ContactFormProps {
  inquiryType?: 'commercial' | 'residential';
}

export function ContactForm({ inquiryType = 'commercial' }: ContactFormProps)

// Inside the form JSX, before the _gotcha field:
<input type="hidden" name="inquiryType" value={inquiryType} />
```

**CTA link updates (all sitewide):**

| Location | Current | New |
|----------|---------|-----|
| `HomePage.tsx` hero primary button | `/contact` | `/contact?type=commercial` |
| `HomePage.tsx` CTA section button | `/contact` | `/contact?type=commercial` |
| `FloatingCTA.tsx` button | `/contact` | `/contact?type=commercial` |
| `AboutPage.tsx` CTA button | `/contact` | `/contact?type=commercial` |
| `ResidentialPage.tsx` CTA button | `/contact` | `/contact?type=residential` |
| `ProjectsPage.tsx` any CTAs | `/contact` | `/contact?type=commercial` |

**No new files required** — this is a prop addition + link update sweep.

---

## Component Inventory: New vs Modified

| Component | Status | File | Notes |
|-----------|--------|------|-------|
| `SafetySection` | **NEW** | `src/components/SafetySection.tsx` | Extracted from AboutPage, standalone section |
| `PrevailingWageBanner` | **NEW** | `src/components/PrevailingWageBanner.tsx` | Targeted inclusion, not global layout |
| `ServiceCard` | **MODIFY** | `src/components/ServiceCard.tsx` | Add optional `details` prop |
| `ContactForm` | **MODIFY** | `src/components/ContactForm.tsx` | Add `inquiryType` prop + hidden field |
| `ContactPage` | **MODIFY** | `src/pages/ContactPage.tsx` | Add `useSearchParams`, pass to form, conditional heading |
| `AboutPage` | **MODIFY** | `src/pages/AboutPage.tsx` | Import + render `SafetySection`, `PrevailingWageBanner` |
| `HomePage` | **MODIFY** | `src/pages/HomePage.tsx` | Add `PrevailingWageBanner`, update service data, update CTA links |
| `ResidentialPage` | **MODIFY** | `src/pages/ResidentialPage.tsx` | Update CTA link to `?type=residential` |
| `FloatingCTA` | **MODIFY** | `src/components/FloatingCTA.tsx` | Update link to `?type=commercial` |
| `AboutPage` (CTA) | **MODIFY** | `src/pages/AboutPage.tsx` | Update CTA link to `?type=commercial` |

---

## Data Flow

### Current (static)
```
Hardcoded array in page/component
    ↓
Rendered directly as JSX
    ↓
No state, no API
```

### ContactForm (existing + v1.1 change)
```
User fills form
    ↓
handleSubmit reads FormData from DOM
    ↓
Hidden field "inquiryType" auto-included (NEW)
    ↓
FormData POST → Formspree API
    ↓
Response: ok → isSuccess = true | error → error state
```

### Two-Path CTA routing (new)
```
User clicks commercial CTA: Link to="/contact?type=commercial"
    OR
User clicks residential CTA: Link to="/contact?type=residential"
    ↓
ContactPage renders, useSearchParams reads ?type
    ↓
inquiryType prop passed to ContactForm
    ↓
ContactForm renders <input type="hidden" name="inquiryType" value={inquiryType} />
    ↓
On submit: Formspree receives inquiryType field alongside other form data
    ↓
Optional: ContactPage hero heading reflects path context
```

---

## Suggested Build Order

Dependencies determine this order. Build what other tasks depend on first.

**Step 1 — ContactForm auto-tagging (no dependencies, touches single component)**
- Modify `ContactForm.tsx` to accept and embed `inquiryType` prop
- Modify `ContactPage.tsx` to read `useSearchParams` and pass prop
- Verify Formspree receives the hidden field in test submission
- No visual changes needed at this step

**Step 2 — CTA link sweep (depends on Step 1 being testable)**
- Update all commercial CTAs: `HomePage`, `AboutPage`, `FloatingCTA`, `ProjectsPage`
- Update residential CTA: `ResidentialPage`
- No component changes — link string updates only

**Step 3 — Prevailing wage banner (self-contained new component)**
- Create `PrevailingWageBanner.tsx` with full/compact variants
- Insert into `HomePage` (after `CertificationsBadges`) and `AboutPage`
- No dependencies on Steps 1-2

**Step 4 — Safety section (depends only on About page positioning)**
- Create `SafetySection.tsx` with mock content for owner review
- Insert into `AboutPage` between milestones and values sections
- No dependencies on Steps 1-3

**Step 5 — Service card expansion (depends on knowing final content)**
- Extend `ServiceCard` props
- Update `services` array in `HomePage` with technical detail data
- Owner review of content before this step is advisable — don't build the UI expansion before the copy is confirmed

**Rationale for this order:** Steps 1-2 are pure logic/data changes with no visual risk. Steps 3-4 are additive new components with no modification risk to existing components. Step 5 modifies an existing component and touches the largest data block — doing it last reduces rework if copy changes.

---

## Architectural Patterns to Follow

### Pattern 1: Named export, data-above-component

All existing components use named exports (`export function Foo()`). All inline data arrays live at the top of the file, above the function. v1.1 additions must match this exactly.

```typescript
// CORRECT
const safetyStats = [...]; // data at top

export function SafetySection(): React.JSX.Element {
  return (...);
}

// WRONG
export default function SafetySection() {...}  // no default exports in this codebase
```

### Pattern 2: Optional props for progressive enhancement

The `ServiceCard` extension illustrates this pattern. Add new props as optional (`details?: string[]`) so existing usages that don't pass the prop continue to render without changes.

```typescript
// New prop is optional — existing callers need zero changes
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string[];  // only renders if provided
}
```

### Pattern 3: Brand color tokens, not arbitrary hex

Use `brand`, `brand-dark`, `accent`, `accent-dark` Tailwind tokens. Do not introduce arbitrary hex colors in new components. The existing `CertificationsBadges.tsx` is the canonical reference for credential/badge visual styling.

### Pattern 4: SectionHeader for all section headings

Every section that has a subheading + title uses `<SectionHeader>`. New components should use it rather than writing equivalent markup inline.

```typescript
import { SectionHeader } from './SectionHeader';

<SectionHeader
  subheading="Safety Program"
  title="Committed to a Safe Jobsite"
  subheadingColor="text-accent"
  className="mb-12"
/>
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Global layout insertion for sitewide badges

**What people do:** Insert `<PrevailingWageBanner />` into `App.tsx` so it "automatically" appears everywhere.

**Why it's wrong:** It will render on Residential, Projects, CaseStudy, and 404 pages where prevailing wage is off-topic or actively confusing. The Residential audience doesn't need DIR certification messaging.

**Do this instead:** Import and render `PrevailingWageBanner` only in `HomePage` and `AboutPage` — the two pages where public-works GCs are the primary audience.

### Anti-Pattern 2: Modifying ContactForm layout to create two separate forms

**What people do:** Build separate `CommercialForm` and `ResidentialForm` components with different fields, duplicating all the Formspree wiring and validation state.

**Why it's wrong:** Doubles maintenance burden. The existing form already captures all the information both paths need. The only difference is the tagging signal.

**Do this instead:** Single form with `inquiryType` hidden field. The query-param-to-prop flow already described handles the differentiation cleanly.

### Anti-Pattern 3: Hardcoding hex colors in new SVG or illustration elements

**What people do:** Add inline SVG shields or badge icons with `fill="#1e3a5f"` instead of referencing tokens.

**Why it's wrong:** `tailwind.config.js` defines brand colors as tokens. Hardcoded hex creates drift when colors change. `ServiceAreaMap.tsx` already violates this (deliberately, because SVG attributes can't use Tailwind classes) and the `CLAUDE.md` explicitly calls it out as needing manual sync.

**Do this instead:** Use lucide-react icons with Tailwind color classes (`text-brand`, `text-accent`) for all new components. Avoid inline SVG unless there is no lucide-react alternative.

### Anti-Pattern 4: Adding global state for CTA type tracking

**What people do:** Introduce a React context or Zustand store to share `inquiryType` across components, avoiding prop drilling.

**Why it's wrong:** There is no prop drilling — the flow is one level deep: `ContactPage` reads URL param, passes to `ContactForm` as single prop. Context would add indirection with zero benefit in this shallow hierarchy.

**Do this instead:** `useSearchParams` in `ContactPage`, prop to `ContactForm`. Two files changed, zero new infrastructure.

---

## Integration Points Summary

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `ContactPage` → `ContactForm` | Direct prop: `inquiryType` | New in v1.1 |
| `HomePage` → `PrevailingWageBanner` | No props, self-contained | New in v1.1 |
| `AboutPage` → `SafetySection` | No props, self-contained | New in v1.1 |
| `AboutPage` → `PrevailingWageBanner` | No props, self-contained | New in v1.1 |
| CTA links → ContactPage | React Router Link with `?type=` param | URL convention, not a JS boundary |

### External Services

| Service | Used By | Notes |
|---------|---------|-------|
| Formspree (`formspree.io/f/mreayoqq`) | `ContactForm.tsx` | Hidden field `inquiryType` will appear in Formspree dashboard as a standard form field — no Formspree config change needed |
| Unsplash CDN | All pages | Stock images — unchanged in v1.1 |
| CSLB lookup URL | `CertificationsBadges`, `ContactPage` | External verify link — unchanged |

---

## Scaling Considerations

This is a static marketing site with no data layer. Scaling is irrelevant at the technical level. The only "scaling" concern is **codebase maintainability** as page files grow.

| File size concern | Current | Action |
|------------------|---------|--------|
| `HomePage.tsx` (465 LOC) | Borderline — acceptable | Do not add more inline sections; extract new sections to components |
| `AboutPage.tsx` (380 LOC) | Acceptable | `SafetySection` extraction keeps it under ~420 LOC |
| `ContactPage.tsx` (271 LOC) | Healthy | Inline changes keep it under ~310 LOC |

---

## Sources

- Direct source read: `src/` tree (all files listed above), 2026-03-05
- `.planning/PROJECT.md` — v1.1 feature requirements
- `CLAUDE.md` — architecture constraints, naming conventions, color token rules
- `MEMORY.md` — owner-confirmed business facts (EMR, OSHA, prevailing wage scope)
- React Router v6 docs: `useSearchParams` is stable API (available since v6.0.0, 2021)

---

*Architecture research for: ClearSite v1.1 Credibility & Conversion*
*Researched: 2026-03-05*
