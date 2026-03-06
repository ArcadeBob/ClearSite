# Phase 4: Prevailing Wage & Service Depth - Research

**Researched:** 2026-03-05
**Domain:** React/TypeScript component authoring, Tailwind CSS layout, credentials constants extension
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| WAGE-01 | Prevailing wage badge/banner component visible on HomePage and AboutPage naming PLA, Davis-Bacon, LAUSD, and State Prevailing Wage experience | New `PrevailingWageBanner` component; insertion points identified for both pages; z-index constraint documented |
| WAGE-02 | Prevailing wage content removed from Contact page FAQ (moved to dedicated component) | Specific FAQ entry identified (`faqs[3]` — "Do you do prevailing wage work?"); removal is a single array entry deletion |
| SERV-01 | Each service card displays technical capability bullets (system types, typical applications) as expandable or inline detail | `ServiceCard` component prop extension pattern identified; existing `useState` for hover already in place; `services` data array in `HomePage.tsx` requires bullets property |
| SERV-02 | Service capability content is mock/placeholder for owner review and validation | Amber review banner pattern from `SafetySection` — established precedent in this codebase |
</phase_requirements>

---

## Summary

Phase 4 is a pure React/TypeScript authoring task within an existing Vite + React 18 + Tailwind CSS 3 codebase. No new libraries are required. There are two separable workstreams: (1) building a `PrevailingWageBanner` component and placing it selectively on `HomePage.tsx` and `AboutPage.tsx`, and (2) extending `ServiceCard` to support technical capability bullet lists with an amber review indicator.

The codebase patterns from Phase 3 are now fully established and this phase follows them exactly. The `SafetySection` amber-banner review pattern is the template for SERV-02's review flag. The credentials module at `src/data/credentials.ts` is the single source for prevailing-wage-related constants. The `FloatingCTA` z-index of `z-40` is a confirmed constraint — the `PrevailingWageBanner` must be positioned as an inline section element, NOT a fixed/sticky element.

**Primary recommendation:** Build `PrevailingWageBanner` as a self-contained section component first, wire it into both target pages, then remove the Contact FAQ entry, then extend `ServiceCard` and the services data array.

---

## Standard Stack

### Core (already installed — no new packages needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 18.x | Component rendering | Project stack |
| TypeScript | 5.x | Type safety for component props and data arrays | Project stack |
| Tailwind CSS | 3.x | Styling via utility classes | Project stack |
| lucide-react | latest | Icons (FileCheck, Shield, Award, ChevronDown, etc.) | Already used throughout |

### Supporting (already in project)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `src/data/credentials.ts` | — | Source for DIR_STATUS, PREVAILING_WAGE_STATUS constants | Use when rendering any prevailing wage credential text |
| `src/components/SectionHeader` | — | Heading block for new section components | Use per established project pattern |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline section for PrevailingWageBanner | Fixed/sticky banner | Fixed would collide with FloatingCTA at z-40; inline avoids the issue entirely |
| Expanding ServiceCard with state | New separate detail page (v2 SERV-03) | Detail pages are explicitly deferred to v2; inline/expandable bullets are the v1.1 scope |
| Always-expanded bullets in ServiceCard | Click-to-expand accordion | Always-expanded is simpler and works better on mobile; reduces implementation surface |

**Installation:** None required.

---

## Architecture Patterns

### Recommended File Structure for This Phase

```
src/
├── data/
│   └── credentials.ts        # MODIFIED — add PREVAILING_WAGE_TYPES array if needed
├── components/
│   └── PrevailingWageBanner.tsx  # NEW — prevailing wage experience section
└── pages/
    ├── HomePage.tsx           # MODIFIED — import PrevailingWageBanner, update services array
    ├── AboutPage.tsx          # MODIFIED — import PrevailingWageBanner
    └── ContactPage.tsx        # MODIFIED — remove prevailing wage FAQ entry
```

`ServiceCard.tsx` is also modified to accept and render `bullets` prop.

### Pattern 1: PrevailingWageBanner Component

**What:** A self-contained inline section component displaying CGI's named prevailing wage program types. Named export, no default export (matches project pattern).

**When to use:** Rendered as a section in `HomePage.tsx` and `AboutPage.tsx`. NOT placed in `App.tsx` or any global layout.

**Why NOT in App.tsx:** This would render on every route including Residential, Projects, and 404. The requirement explicitly excludes those pages. Inline placement in specific page components is the correct approach — consistent with how `SafetySection` is handled (AboutPage only) and how `FloatingCTA` is rendered (HomePage only).

**z-index constraint:** `FloatingCTA` uses `z-40` as a fixed bottom bar. The `PrevailingWageBanner` is a normal flow section element and needs no z-index declaration. There is no conflict.

**Structure:**
```tsx
// src/components/PrevailingWageBanner.tsx
import React from 'react';
import { FileCheck, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { DIR_STATUS } from '../data/credentials';

const prevailingWageTypes = [
  {
    label: 'Project Labor Agreement (PLA)',
    description: 'Experienced with PLA requirements including hiring hall obligations, ...',
  },
  {
    label: 'Davis-Bacon Act',
    description: 'Federal prevailing wage compliance for public works projects.',
  },
  {
    label: 'State Prevailing Wage (CA)',
    description: 'California DIR-registered with full certified payroll capability.',
  },
  {
    label: 'LAUSD & Institutional',
    description: 'Track record on LAUSD and other institutional public-owner projects.',
  },
] as const;

export function PrevailingWageBanner(): React.JSX.Element {
  return (
    <section id="prevailing-wage" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... */}
      </div>
    </section>
  );
}
```

**Layout approach:** Two-column on desktop (intro text left, badge grid right) or single-column stacked. Follows the brand story section layout pattern from `AboutPage.tsx`.

**Background:** `bg-white` or `bg-slate-50` depending on surrounding sections (see insertion point analysis below).

### Pattern 2: HomePage Insertion Point

**Current section order in HomePage.tsx:**
1. Hero
2. Value Proposition Banner (bg-white)
3. Quick Navigation Tabs (bg-slate-50)
4. StatsSection
5. ClientLogos
6. GCResourcesSection (bg-brand, dark)
7. **CertificationsBadges** (bg-white) — already has DIR_STATUS badge
8. GCPainPoints (bg-white)
9. Services Grid (bg-slate-50)
10. ProcessTimeline
11. PromiseSection
12. Featured Projects (bg-slate-50)
13. ServiceAreaMap
14. CTA Section (bg-brand, dark)
15. FloatingCTA (fixed)

**Recommended insertion:** After `CertificationsBadges` (which already surfaces DIR Registered as a badge), before `GCPainPoints`. This groups credential signals together. Background should be `bg-slate-50` to alternate from CertificationsBadges' `bg-white`.

**Alternative:** After `GCResourcesSection` (the dark-background GC info hub) — would follow naturally from credential context. Background `bg-white` to contrast with the dark brand section above.

**Decision for planner:** The planner should pick one insertion point. Research recommends after `CertificationsBadges` as it keeps credentialing information grouped.

### Pattern 3: AboutPage Insertion Point

**Current section order in AboutPage.tsx:**
1. Header (bg-brand)
2. Brand Story (bg-white)
3. Company Timeline (bg-slate-50)
4. **SafetySection** (bg-slate-50) — added in Phase 3
5. Mission/Goal/Promise (bg-white, id="vision")
6. Why Choose CGI (bg-slate-50, id="why-choose")
7. Team (bg-white, id="team")
8. CTA (bg-brand)

**Recommended insertion:** After `SafetySection` and before Mission/Goal/Promise section. This groups safety + compliance signals together (both are GC prequalification concerns). Background should be `bg-white` to alternate from SafetySection's `bg-slate-50`.

**Resulting sequence:**
```
SafetySection (bg-slate-50)
PrevailingWageBanner (bg-white)   <-- NEW
{/* Mission, Goal, Promise */}    (bg-white, id="vision")  -- may need bg change
```

**Note:** Mission/Goal/Promise is also `bg-white`. Having two consecutive `bg-white` sections is acceptable — they have different content density. Alternatively, the banner could use `bg-slate-50` and Mission could stay white; the planner can decide.

### Pattern 4: Contact Page FAQ Removal (WAGE-02)

**What:** Remove the prevailing wage FAQ entry from the `faqs` array in `ContactPage.tsx`.

**Current state:**
```tsx
// ContactPage.tsx — faqs array, index 3
{
  question: 'Do you do prevailing wage work?',
  answer:
    'Yes. CGI is DIR registered and fully set up for prevailing wage projects. We have extensive experience with PLA, Davis-Bacon, and state prevailing wage requirements, including public works, LAUSD, and other institutional projects requiring certified payroll.',
},
```

**Action:** Delete this entry. The remaining faqs are:
- "What's your typical response time?" (response time / turnaround)
- "What areas do you serve?" (geography)
- "What size projects do you handle?" (project scale / bonding)
- "How do I get a bid?" (process)

These 4 remaining FAQs are all generic and appropriate for the Contact page.

**No migration needed:** The content moves to `PrevailingWageBanner` in spirit; the FAQ answer does not need to be copied verbatim. The banner has more detail and is better placed.

### Pattern 5: ServiceCard Extension

**Current ServiceCard interface:**
```tsx
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
```

**Extended interface:**
```tsx
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bullets?: string[];  // Technical capability bullets — optional for backward compat
}
```

**Rendering approach options:**

| Option | Implementation | Tradeoff |
|--------|---------------|----------|
| Always-expanded bullets below description | Simple `{bullets && <ul>...</ul>}` | Zero state; works on mobile; simplest |
| Click-to-expand accordion | Add `isExpanded` state, toggle button | More UI code; redundant given hover state already exists |
| Tooltip on hover | CSS hover to show content | Not accessible; mobile unfriendly |

**Recommendation: Always-expanded bullets.** The existing hover animation already draws attention to the card. Bullets should be visible without interaction — GCs scanning service cards should see the technical depth immediately.

**Rendering pattern:**
```tsx
{bullets && bullets.length > 0 && (
  <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3">
    {bullets.map((bullet) => (
      <li key={bullet} className="flex items-start gap-1.5 text-xs text-slate-500">
        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
        {bullet}
      </li>
    ))}
  </ul>
)}
```

### Pattern 6: Services Data Array Extension

**Current location:** `services` array is defined inline in `HomePage.tsx` (lines 37-85). It is NOT in a shared data file.

**Extended structure:**
```tsx
const services = [
  {
    title: 'Storefronts',
    description: 'Custom aluminum storefronts and entrances...',
    icon: <LayoutGrid className="h-6 w-6" />,
    bullets: [
      'Thermally broken aluminum framing systems',
      'Narrow-stile, wide-stile, and heavy glass configurations',
      'ADA-compliant entrance assemblies',
      // [REVIEW: owner to confirm typical system types used]
    ],
  },
  // ...
];
```

**Review flag approach:** Unlike SafetySection (which uses an amber banner), service bullets require a lighter touch. Since every service card has bullets, a single section-level amber banner above the services grid is cleaner than per-card banners.

**Alternative:** Add `[REVIEW]` text inline within individual bullet strings (e.g., `'[REVIEW] Fire-rated glazing assemblies'`). This is grepable but ugly for visitors.

**Recommendation:** Use an amber review banner above the services section (in `HomePage.tsx`, the "Services Grid" section) — identical pattern to SafetySection. The banner tells visitors the detail is draft; the individual bullets need no extra markers.

### Pattern 7: credentials.ts Extension (WAGE-01)

The existing `credentials.ts` already exports:
```ts
export const DIR_STATUS = 'DIR Registered' as const;
export const PREVAILING_WAGE_STATUS = 'Prevailing Wage Certified' as const;
```

**No new constants are strictly needed.** The `PrevailingWageBanner` component can define its wage types inline as a local constant array (same pattern as `certifications` in `CertificationsBadges.tsx` and `team` in `AboutPage.tsx`). Only add to credentials.ts if a value (like the DIR registration number or specific certification number) needs to appear across multiple components.

**Decision:** Keep wage type labels inline in `PrevailingWageBanner.tsx`. Import `DIR_STATUS` and `PREVAILING_WAGE_STATUS` from credentials.ts for any heading or badge text.

### Anti-Patterns to Avoid

- **Default exports:** Project uses named exports exclusively.
- **Putting PrevailingWageBanner in App.tsx:** Would render on Residential, Projects, and 404 routes — explicitly excluded by WAGE-01 success criteria.
- **Fixed/sticky positioning for PrevailingWageBanner:** Would collide with FloatingCTA at `z-40`.
- **Adding per-card amber banners:** One section-level banner for services is cleaner than 8 per-card banners.
- **Arbitrary hex colors:** Use Tailwind brand/accent tokens (`bg-brand`, `text-accent`, etc.), not hex values.
- **Fabricated testimonials:** Content rules prohibit adding any testimonial content.
- **Pricing in service bullets:** No public pricing; bullets should cover technical system types and applications only.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Review/draft indicator | Custom UI component | Amber banner pattern from SafetySection | Established precedent; consistent visual language |
| Section heading | Custom `<h2>` block | Existing `SectionHeader` component | Consistent with all other sections |
| Bullet list item styling | New CSS classes | Tailwind inline dot + text utility classes | Matches project pattern; no abstraction needed |
| Prevailing wage page | Full new route | Inline section on existing pages | v2 SERV-03 defers full service pages; this phase is inline only |

**Key insight:** Every UI pattern needed (amber banners, section headers, bullet lists, credential badges) is already demonstrated in the codebase. Phase 4 is composition, not invention.

---

## Common Pitfalls

### Pitfall 1: PrevailingWageBanner in App.tsx Renders on Excluded Routes

**What goes wrong:** If `PrevailingWageBanner` is placed in `App.tsx` (even conditionally based on route), it appears on Residential, Projects, and 404 — violating WAGE-01 success criteria.

**Why it happens:** It feels like a "sitewide" component, so a developer might reach for the global layout.

**How to avoid:** Place the banner inline in `HomePage.tsx` and `AboutPage.tsx` JSX, exactly like `SafetySection` is inline in `AboutPage.tsx` only. No routing logic needed — absence from other page files ensures exclusion.

**Warning signs:** Banner renders on `/residential` or `/projects` during manual QA.

### Pitfall 2: Services Array is Defined in HomePage.tsx, Not a Shared Module

**What goes wrong:** Developer looks for a `src/data/services.ts` file (which does not exist) and either creates a new one or can't find where to add bullets.

**Why it happens:** Phase 3 established `src/data/credentials.ts` as a pattern; developer assumes all data is centralized.

**How to avoid:** The `services` array is defined inline in `HomePage.tsx` at line 37. Edit it there directly. Do NOT create a new `src/data/services.ts` for this phase — that level of refactoring is not in scope (SERV-03, the full service pages, is deferred to v2).

**Warning signs:** A new `src/data/services.ts` file appears where none was before.

### Pitfall 3: ServiceCard bullets Prop Breaks Existing Callers Without default

**What goes wrong:** If `bullets` is added as a required prop to `ServiceCardProps`, all existing instantiations of `ServiceCard` (currently only in `HomePage.tsx`) will get TypeScript errors until updated.

**Why it happens:** Developer makes the prop required while forgetting existing usages.

**How to avoid:** Type `bullets` as `bullets?: string[]` (optional). Components without bullets simply render nothing in that slot. This enables incremental addition.

**Warning signs:** TypeScript error `Property 'bullets' is missing in type` when linting.

### Pitfall 4: Section Background Color Collision on AboutPage

**What goes wrong:** If `PrevailingWageBanner` uses `bg-slate-50`, it will visually merge with the `SafetySection` directly above it (which is also `bg-slate-50`). The sections blend into each other without a visible boundary.

**Why it happens:** Developer copies the SafetySection background without considering the surrounding context.

**How to avoid:** `PrevailingWageBanner` on `AboutPage` should use `bg-white` — alternating from `SafetySection`'s `bg-slate-50`. The existing About page alternates: Brand Story (white) → Timeline (slate-50) → Safety (slate-50) — so inserting a white section breaks the double slate-50 run.

**Warning signs:** Two consecutive slate-50 sections with no visual separation.

### Pitfall 5: Contact FAQ Removal Must Not Leave a Gap in UX

**What goes wrong:** Removing the prevailing wage FAQ leaves 4 FAQs. If a GC arrives at Contact page looking for prevailing wage info, they find nothing there and must navigate elsewhere.

**Why it happens:** WAGE-02 removes content without considering the navigation consequence.

**How to avoid:** This is acceptable because `PrevailingWageBanner` is on HomePage and AboutPage — the two primary pages GCs visit before Contact. The Contact page's job is to convert, not to educate. The removal is correct. However, the planner should note that `GCResourcesSection.tsx` already mentions "DIR registered, prevailing wage certified" in its License & Bonding info card detail — so the information is surfaced before the visitor reaches Contact.

**Warning signs:** None — this is intentional removal.

### Pitfall 6: Inline `[REVIEW]` Markers in Service Bullets Are Visible to Real Users

**What goes wrong:** Developer adds `[REVIEW: confirm this]` text inside individual bullet strings — they appear in the live UI exactly as typed.

**Why it happens:** Phase 3 used inline `[REVIEW:]` markers, but those were in narrative paragraphs inside `SafetySection`, which also had an amber banner. Bullets inside `ServiceCard` are rendered verbatim.

**How to avoid:** Do NOT embed `[REVIEW:]` markers inside bullet strings. Use the amber section banner approach to indicate the entire bullets block is draft content. Keep the bullet text clean (readable prose describing the service capability).

**Warning signs:** The text `[REVIEW` appears visibly on the live services grid.

---

## Code Examples

### Existing SectionHeader on bg-white Background

```tsx
// From ContactPage.tsx
<SectionHeader
  subheading="Common Questions"
  title="Frequently Asked Questions"
  className="mb-12"
/>
// Default subheadingColor is text-accent (blue) — appropriate for PrevailingWageBanner too
```

### Existing CertificationsBadges — DIR Badge (reference for visual style)

```tsx
// From CertificationsBadges.tsx — the Prevailing Wage badge currently shown on HomePage
{
  icon: <FileCheck className="h-6 w-6" />,
  title: DIR_STATUS,       // 'DIR Registered'
  subtitle: 'Prevailing Wage',
  description: 'Public Works Qualified'
}
// PrevailingWageBanner expands this single badge into a full named-types section
```

### SafetySection Amber Review Banner (template for SERV-02)

```tsx
// From SafetySection.tsx — amber review banner pattern
<div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
  <p>
    <strong>Draft safety content</strong> -- pending owner review. Search for{' '}
    <code className="bg-amber-100 px-1 rounded text-xs font-mono">[REVIEW:]</code>{' '}
    markers in this section for items requiring owner confirmation.
  </p>
</div>
```

The services grid amber banner should use analogous language:

```tsx
// Amber banner for Services Grid section (above ServiceCard grid)
<div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
  <p>
    <strong>Draft service capability detail</strong> -- pending owner review and validation.
    Technical bullets are placeholder content until CGI confirms system types and applications.
  </p>
</div>
```

### Existing ServiceCard Component (base for extension)

```tsx
// Current ServiceCard.tsx — lines 6-9
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
// Extended with bullets?: string[]

// Current services array in HomePage.tsx — sample entry
{
  title: 'Storefronts',
  description: 'Custom aluminum storefronts and entrances for retail and office applications.',
  icon: <LayoutGrid className="h-6 w-6" />
}
// Extended: add bullets: string[] to each entry
```

### Credentials Import in New Component

```tsx
// PrevailingWageBanner.tsx — import pattern
import {
  DIR_STATUS,
  PREVAILING_WAGE_STATUS,
} from '../data/credentials';
```

---

## Service Capability Bullets — Placeholder Content

All bullets are **mock/placeholder** per SERV-02. They follow industry-standard commercial glazing terminology and should be clearly marked as pending owner review via the section amber banner.

| Service | Suggested Placeholder Bullets |
|---------|-------------------------------|
| Storefronts | Thermally broken aluminum framing systems; Narrow-stile, wide-stile, and heavy glass entry configurations; ADA-compliant entrance assemblies and hardware |
| Window Walls | Aluminum stick-built window wall systems; Floor-to-ceiling glazed openings; Integrated operable vent units |
| Curtain Walls | Stick-built and unitized curtain wall systems; Pressure-equalized rainscreen performance; High-rise and mid-rise commercial applications |
| Skylights | Structural overhead glazing; Thermally broken curb-mounted systems; Daylighting and energy performance compliance |
| Glass Railings | Frameless standoff-mounted systems; Post-and-channel base shoe configurations; IBC-compliant guard assemblies |
| Fire-Rated Glazing | 20-, 45-, 60-, and 90-minute fire-rated assemblies; Wired, ceramic, and intumescent glazing products; UL-listed frame and glass combinations |
| Shower Enclosures | Frameless and semi-frameless heavy glass systems; Custom radius and angle configurations; Commercial hospitality and fitness facility applications |
| Mirrors | Custom-cut float glass mirrors; Commercial gym, retail, and hospitality applications; Adhesive and clip-mounted installation options |

These are standard terminology for the commercial glazing industry. Owner should confirm system types actually used before removing the amber banner.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Prevailing wage mentioned only in Contact FAQ | `PrevailingWageBanner` section on HomePage and AboutPage | This phase | Named wage types (PLA, Davis-Bacon, LAUSD, State) surfaced where GCs evaluate subs, not buried in FAQ |
| ServiceCard shows title + one-line description | ServiceCard shows title + description + technical bullets | This phase | GCs and estimators see technical capability depth without navigating to a separate service page |
| Safety content review: SafetySection only | Pattern extends to service bullets via amber banner | This phase | Consistent review-flagging convention across all draft/placeholder content |

**Deprecated/outdated after this phase:**
- Prevailing wage FAQ entry in ContactPage — replaced by dedicated banner component with more detail
- One-line-only service descriptions as the sole technical indicator in ServiceCard

---

## Open Questions

1. **PrevailingWageBanner: section or inline banner?**
   - What we know: Success criteria says "banner or badge" — both are acceptable per WAGE-01
   - What's unclear: Whether a prominent multi-item section (with separate bullet per wage type) or a compact credential-style banner row (like CertificationsBadges) is more appropriate visually
   - Recommendation: A compact section with a heading and a 2x2 grid of wage-type cards is more scannable than a long banner. It follows the CertificationsBadges visual language. A horizontal pill-style banner would be too small to name all four wage types clearly.

2. **Should PrevailingWageBanner also appear on the About page Quick Nav tabs?**
   - What we know: About page has a Quick Nav section with tabs: About CGI, Why Choose, Team, Our Vision
   - What's unclear: Whether to add a "Prevailing Wage" tab link pointing to `id="prevailing-wage"`
   - Recommendation: Yes — add an anchor link if `PrevailingWageBanner` gets `id="prevailing-wage"`. This makes the section directly linkable. Planner decision on whether to add the nav tab.

3. **Service bullets: always expanded vs. expandable accordion**
   - What we know: Requirement says "expandable or inline detail" — either is acceptable
   - What's unclear: Which is better for the 4-column services grid layout
   - Recommendation: Always-expanded. An accordion requires a click for each of 8 cards — GCs scanning the page get more value from immediate visibility. Always-expanded bullets keep the card taller but consistent.

4. **Should `services` data move to `src/data/services.ts`?**
   - What we know: Adding bullets makes the services array larger; it's currently defined inline in HomePage.tsx
   - What's unclear: Whether the increased size warrants extraction
   - Recommendation: Keep inline in HomePage.tsx for this phase. Extraction to `src/data/services.ts` is reasonable cleanup but not required by any v1.1 requirement. Defer if not planning service pages (SERV-03 is v2).

---

## Validation Architecture

> `workflow.nyquist_validation` key is absent from `.planning/config.json` — treating as enabled per research instructions. CLAUDE.md states "No test framework is configured." Same validation approach as Phase 3: build + lint are the quality gates.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None configured |
| Config file | None |
| Quick run command | `npm run build && npm run lint` |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| WAGE-01 | `PrevailingWageBanner` renders on `/` with PLA, Davis-Bacon, LAUSD, State PW named | Manual smoke | Browser at `/` | ❌ Wave 0 (new component) |
| WAGE-01 | `PrevailingWageBanner` renders on `/about` | Manual smoke | Browser at `/about` | ❌ Wave 0 (new component) |
| WAGE-01 | `PrevailingWageBanner` does NOT render on `/residential`, `/projects`, `/*` | Manual smoke | Browser at each excluded route | N/A |
| WAGE-02 | Prevailing wage FAQ entry absent from `/contact` FAQ section | Manual smoke | Browser at `/contact` — count 4 FAQ entries, not 5 | N/A |
| WAGE-02 | `faqs` array in ContactPage.tsx has no prevailing wage entry | Grep | `grep -n "prevailing wage" src/pages/ContactPage.tsx` (expect 0 in faqs array, only in badge) | N/A |
| SERV-01 | Each of 8 ServiceCards shows bullet list below description | Manual smoke | Browser at `/` — services section | N/A |
| SERV-02 | Amber draft banner visible above services grid | Manual smoke | Browser at `/` — services section | N/A |
| All | No TypeScript errors; imports resolve | Build | `npm run build` | ✅ Exists |
| All | No ESLint violations | Lint | `npm run lint` | ✅ Exists |

### Sampling Rate

- **Per task commit:** `npm run build && npm run lint`
- **Per wave merge:** `npm run build && npm run lint` + manual visual review of `/`, `/about`, `/contact`
- **Phase gate:** Build green + lint clean + manual QA of all 4 success criteria before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/components/PrevailingWageBanner.tsx` — does not exist; must be created before HomePage/AboutPage can import it
- [ ] No test framework to install — build + lint are the quality gates for this codebase

---

## Sources

### Primary (HIGH confidence)

- Direct codebase read — `src/pages/HomePage.tsx` — services array structure, section order, FloatingCTA placement
- Direct codebase read — `src/pages/AboutPage.tsx` — section order, SafetySection insertion point reference
- Direct codebase read — `src/pages/ContactPage.tsx` — faqs array structure, specific prevailing wage FAQ entry to remove
- Direct codebase read — `src/components/ServiceCard.tsx` — current interface and hover state
- Direct codebase read — `src/components/SafetySection.tsx` — amber review banner pattern
- Direct codebase read — `src/components/FloatingCTA.tsx` — z-40 z-index constraint
- Direct codebase read — `src/components/CertificationsBadges.tsx` — DIR badge visual reference
- Direct codebase read — `src/components/GCResourcesSection.tsx` — infoCards pattern, prevailing wage mention in license card
- Direct codebase read — `src/data/credentials.ts` — existing DIR_STATUS, PREVAILING_WAGE_STATUS constants
- Direct codebase read — `src/App.tsx` — routing structure confirming which pages exist and share no conditional layout
- Direct codebase read — `.planning/REQUIREMENTS.md` — WAGE-01, WAGE-02, SERV-01, SERV-02 definitions
- Direct codebase read — `.planning/ROADMAP.md` — SERV-03 is v2 deferred (confirms inline bullets are the correct v1.1 scope)
- Direct codebase read — `.planning/STATE.md` — PrevailingWageBanner inline-only decision documented
- Direct codebase read — `CLAUDE.md` — project conventions (named exports, Tailwind tokens, no fake testimonials)
- Direct codebase read — `.claude/memory/MEMORY.md` — prevailing wage types: PLA, Davis-Bacon, State Prevailing Wage, LAUSD confirmed by owner

### Secondary (MEDIUM confidence)

- None needed — all implementation decisions are within the existing codebase with no new library evaluation required.

### Tertiary (LOW confidence)

- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; everything is existing codebase
- Architecture: HIGH — patterns are direct extensions of Phase 3 work (SafetySection, credentials.ts) already in repo
- Pitfalls: HIGH — discovered from direct code reading (services array location, ServiceCard interface, z-index, amber banner in bullet strings)
- Placeholder content: MEDIUM — service capability bullets use standard commercial glazing terminology; owner must validate before removing amber banner

**Research date:** 2026-03-05
**Valid until:** Stable — research covers codebase as-is; valid until codebase is modified
