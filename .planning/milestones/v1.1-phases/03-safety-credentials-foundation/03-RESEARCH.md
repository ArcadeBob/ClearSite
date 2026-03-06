# Phase 3: Safety Credentials Foundation - Research

**Researched:** 2026-03-05
**Domain:** React/TypeScript component authoring, data constants extraction, Tailwind CSS layout
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Safety Section Placement**
- Position: after Company Timeline section, before Mission/Goal/Promise section on About page
- Layout: stat highlights row (3 stats) at top, narrative paragraphs below
- Background: `bg-slate-50` to distinguish from white sections above and below — consistent with how timeline already uses `bg-slate-50`
- Use `SectionHeader` component for the section heading

**Safety Stat Highlights**
- 3 stats in the top row: EMR (0.87), OSHA record (Zero Incidents), Bonding ($1M)
- EMR shows industry benchmark context via inline text: "industry average: 1.0" or "13% below industry average"
- OSHA wording: "Zero OSHA Incidents" — matches existing CertificationsBadges and StatsSection language
- Static numbers only — no animated count-up. Safety section should feel serious/informational, not flashy
- Bonding included as a risk/prequalification metric

**Safety Narrative Tone & Content**
- Compliance-forward tone: lead with programs, protocols, and certifications
- Standard commercial safety program set to cover in narrative:
  - IIPP (Injury & Illness Prevention Program)
  - Toolbox talks (with bracketed frequency placeholder for owner)
  - Site-specific safety plans
  - PPE protocols
  - Fall protection
- Specific placeholders with brackets where owner needs to confirm details (e.g., `[REVIEW: confirm toolbox talk frequency]`)
- Length: 2-3 short paragraphs — scannable for GCs

**Review Flagging (SAFE-03)**
- Dual approach: visible on-page amber banner + inline `[REVIEW: description]` markers
- Banner: amber/yellow notice at top of safety section — "Draft safety content — pending owner review. Search for [REVIEW:] markers for specific items."
- Banner is visible until manually removed from JSX (no env variable / build config needed)
- Inline markers: `[REVIEW: description]` format — grepable for deployment checklist
- Banner is general notice only; brackets handle specific item-level review needs

**Credential Constants (CRED-01)**
- Extract to `src/data/credentials.ts` (already decided in STATE.md)
- Single source of truth for EMR, OSHA, bonding, CSLB, DIR, SBE across all files that reference these values

### Claude's Discretion
- Exact stat highlight card styling and spacing within the 3-stat row
- SectionHeader subheading text and section title wording
- Exact paragraph structure of the safety narrative (within 2-3 paragraph constraint)
- Which specific claims get `[REVIEW:]` markers (use judgment — mark anything the owner should verify)
- Credential constants file structure and TypeScript types
- How to refactor existing components to import from constants file

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CRED-01 | Credential data (EMR, OSHA, bonding, CSLB, DIR, certifications) consolidated into a shared constants file — single source of truth across all pages | Audit below identifies every hardcoded string and its file; constants file structure specified |
| SAFE-01 | About page displays safety program section with EMR rate, OSHA incident record, and certification details | SafetySection component spec, insertion point, stat card pattern identified |
| SAFE-02 | About page displays safety management narrative covering training practices, incident prevention protocols, and IIPP program (mock content for owner review) | Narrative content structure and placeholder pattern specified |
| SAFE-03 | Safety section content flagged for owner review before considered final | Dual-flag approach (amber banner + `[REVIEW:]` markers) documented with implementation pattern |
</phase_requirements>

---

## Summary

Phase 3 is a pure React/TypeScript authoring and refactoring task within an existing Vite + React 18 + Tailwind CSS 3 codebase. No new libraries are required. There are two separable workstreams: (1) extracting hardcoded credential strings from 8 files into a shared `src/data/credentials.ts` constants module, and (2) building a new `SafetySection` component and inserting it into `AboutPage.tsx`.

The codebase is well-understood from code review. Patterns are consistent throughout — named exports, Tailwind utility classes, no global state, data arrays defined near the top of files. The `SectionHeader`, `Card`, and `Button` primitives are reusable and already used on the About page. No animation hooks (`useOnceInView`, `useCountUp`) are needed for this phase — that is an explicit locked decision.

The main implementation risk is the credential extraction refactor: there are more usage sites than the CONTEXT.md's estimate of 9 files. The grep audit shows credential strings appear in **8 distinct files** (see Don't Hand-Roll section). Some usages are embedded in prose (hero body copy, milestone descriptions) and cannot be cleanly replaced with a constant reference — those are acceptable exceptions and should be documented in the constants file via a comment.

**Primary recommendation:** Build `src/data/credentials.ts` first, then refactor the structured credential arrays (certifications, trust badges, quick facts, stat data) to import from it, then build `SafetySection` as a standalone file, then wire it into `AboutPage.tsx`.

---

## Standard Stack

### Core (already installed — no new packages needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 18.x | Component rendering | Project stack |
| TypeScript | 5.x | Type safety for constants file and component props | Project stack |
| Tailwind CSS | 3.x | Styling via utility classes | Project stack |
| lucide-react | latest | Icons (Shield, AlertTriangle, etc.) | Already used throughout |

### Supporting (already in project)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `src/components/ui/Card` | — | Stat card container for the 3-stat row | Use for stat highlight cards |
| `src/components/SectionHeader` | — | Heading block for the safety section | Use for section title per locked decision |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Amber banner (hardcoded JSX) | env-variable dev-only indicator | env approach requires build config; JSX banner is simpler and owner-removable |
| Inline `[REVIEW:]` text in JSX | Code comments | Text markers are grepable and visible in browser; comments are invisible |

**Installation:** None required.

---

## Architecture Patterns

### Recommended File Structure for This Phase

```
src/
├── data/
│   └── credentials.ts       # NEW — single source of truth for credential constants
├── components/
│   └── SafetySection.tsx    # NEW — safety program section component
└── pages/
    └── AboutPage.tsx        # MODIFIED — import SafetySection, insert between timeline and mission sections
```

Files being refactored to import from credentials.ts:
- `src/components/CertificationsBadges.tsx`
- `src/components/StatsSection.tsx`
- `src/components/GCResourcesSection.tsx`
- `src/components/FloatingCTA.tsx` (prose reference — acceptable exception, document)
- `src/pages/AboutPage.tsx`
- `src/pages/ContactPage.tsx`
- `src/pages/HomePage.tsx` (prose references — acceptable exception, document)
- `src/pages/CaseStudyPage.tsx`

### Pattern 1: credentials.ts Constants Module

**What:** A TypeScript module exporting named constants for each credential datum, plus typed grouping objects for structured consumers.

**When to use:** Whenever a component renders an EMR number, bonding amount, license number, or OSHA record claim.

**Design principles:**
- Export atomic primitives (strings/numbers) for maximum flexibility
- Export grouped objects for structured consumers (badge arrays, stat arrays)
- Use `as const` on all literal objects to prevent mutation and enable literal type inference
- Add a top-of-file comment listing which files import from here — helps future maintainers see impact scope

```typescript
// src/data/credentials.ts
// Used by: CertificationsBadges, StatsSection, GCResourcesSection,
//           SafetySection, AboutPage, ContactPage, CaseStudyPage

// ─── Atomic constants ────────────────────────────────────────────────────────

export const CSLB_LICENSE_CLASS = 'C-17' as const;
export const CSLB_LICENSE_NUMBER = '965590' as const;
export const CSLB_LICENSE_DISPLAY = `${CSLB_LICENSE_CLASS} License #${CSLB_LICENSE_NUMBER}` as const;
export const CSLB_LOOKUP_URL =
  'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx';

export const SBE_CERT_NUMBER = '2034373' as const;
export const SBE_CERT_DISPLAY = `SBE #${SBE_CERT_NUMBER}` as const;

export const EMR_VALUE = 0.87 as const;
export const EMR_DISPLAY = '0.87' as const;
export const EMR_INDUSTRY_AVERAGE = 1.0 as const;
export const EMR_INDUSTRY_AVERAGE_DISPLAY = '1.0' as const;

export const BONDING_CAPACITY_DISPLAY = '$1M' as const;
export const BONDING_CAPACITY_FULL = '$1,000,000' as const;

export const OSHA_INCIDENTS_DISPLAY = 'Zero' as const;
export const OSHA_RECORD_DISPLAY = 'Zero OSHA Incidents' as const;

export const DIR_STATUS = 'DIR Registered' as const;
export const PREVAILING_WAGE_STATUS = 'Prevailing Wage Certified' as const;
```

### Pattern 2: SafetySection Component

**What:** A self-contained section component that renders stat highlights and narrative. Named export, no default export (matches project pattern).

**When to use:** Inserted into AboutPage between timeline section and mission/goal/promise section.

**Structure:**
```typescript
// src/components/SafetySection.tsx
import React from 'react';
import { Shield, AlertTriangle, DollarSign } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { Card } from './ui/Card';
import {
  EMR_DISPLAY,
  EMR_INDUSTRY_AVERAGE_DISPLAY,
  BONDING_CAPACITY_DISPLAY,
  OSHA_RECORD_DISPLAY,
} from '../data/credentials';

// 3-stat array defined at top of file, following project pattern
const safetyStats = [
  {
    label: 'EMR Safety Rating',
    value: EMR_DISPLAY,
    context: `Industry average: ${EMR_INDUSTRY_AVERAGE_DISPLAY}`,
    icon: <Shield className="h-6 w-6" />,
  },
  {
    label: 'OSHA Record',
    value: 'Zero',
    context: 'OSHA Recordable Incidents',
    icon: <Shield className="h-6 w-6" />,
  },
  {
    label: 'Bonding Capacity',
    value: BONDING_CAPACITY_DISPLAY,
    context: 'Single Project Maximum',
    icon: <DollarSign className="h-6 w-6" />,
  },
] as const;

export function SafetySection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Review banner — remove when owner approves content */}
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-500" />
          <p>
            <strong>Draft safety content</strong> — pending owner review.
            Search for <code>[REVIEW:]</code> markers for specific items
            requiring confirmation.
          </p>
        </div>

        <SectionHeader
          subheading="Safety Program"
          title="A Safety Culture Built Into Every Project"
          className="mb-12"
        />

        {/* 3-stat row */}
        {/* ... */}

        {/* Narrative — 2-3 paragraphs with [REVIEW:] markers */}
        {/* ... */}
      </div>
    </section>
  );
}
```

### Pattern 3: AboutPage Insertion Point

**What:** Import and render `SafetySection` between the Company Timeline section and the Mission/Goal/Promise section.

```tsx
// src/pages/AboutPage.tsx (excerpt)
import { SafetySection } from '../components/SafetySection';

// ... inside the JSX return, after the closing </section> of Company Timeline (~line 222):
      </section>

      {/* Safety Program */}
      <SafetySection />

      {/* Mission, Goal, Promise */}
      <section id="vision" className="py-20 bg-white">
```

### Pattern 4: Review Banner + Inline Markers

**What:** Amber alert banner at section top (visible always) plus `[REVIEW: description]` text inline in narrative paragraphs.

**Inline marker format:**
```tsx
<p className="mb-4 text-slate-600">
  CGI maintains a documented Injury & Illness Prevention Program (IIPP) covering
  all field and shop operations. [REVIEW: confirm whether IIPP is Cal/OSHA compliant
  or also references federal OSHA — confirm with owner] Toolbox talks are conducted
  [REVIEW: confirm frequency — weekly? daily?] and documented on every active project.
</p>
```

**Grepability check:**
```bash
grep -r "\[REVIEW:" src/
```
This command can be added to a pre-deployment checklist to confirm all markers are removed before production.

### Anti-Patterns to Avoid

- **Default exports:** Project uses named exports exclusively. `export default function SafetySection` would be wrong.
- **Importing `useOnceInView` or `useCountUp`:** Explicitly locked out — safety stats are static, not animated.
- **Hardcoding credential strings in SafetySection:** All EMR/bonding/OSHA values must come from `credentials.ts`.
- **Using arbitrary hex colors:** Use `bg-amber-50`, `border-amber-300`, `text-amber-800` — Tailwind tokens only. Exception is SVG inline attributes in `ServiceAreaMap.tsx` (not touched in this phase).
- **Putting SafetySection into App.tsx or a global layout:** It belongs only in AboutPage.tsx.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Alert/review banner | Custom styled div from scratch | Tailwind amber utility classes with AlertTriangle lucide icon | Pattern is identical to what's in the wild — consistent with project style |
| Stat highlight cards | New Card variant | Existing `Card` component (`src/components/ui/Card`) | Already handles border/shadow/overflow |
| Section heading | Custom `<h2>` block | Existing `SectionHeader` component | Required per locked decision; ensures visual consistency |

**Key insight:** This phase adds no new complexity. Every UI pattern needed (cards, section headers, amber callout) is already in the codebase or trivially composable from Tailwind utilities.

---

## Common Pitfalls

### Pitfall 1: Prose Credential References Cannot Be Cleanly Replaced

**What goes wrong:** Attempting to replace every string occurrence of "0.87 EMR" or "$1M bonding" with a constant import — including prose embedded in JSX strings like `"Stop babysitting your glazing contractor. With 13+ years of commercial experience, $1M bonding capacity, and a 0.87 EMR..."` in HomePage.tsx hero body copy. TypeScript cannot interpolate a `const` into a JSX string attribute without using a template literal or expression, which changes the surrounding JSX structure.

**Why it happens:** The grep reveals some credential values appear in flowing prose inside JSX string children (not in data arrays), making extraction awkward.

**How to avoid:** Only extract credentials from structured data arrays (certifications arrays, stat arrays, quick-facts arrays, trust-badge arrays). Mark prose occurrences with a comment: `{/* TODO: references EMR_DISPLAY from credentials.ts — kept as prose */}`. This satisfies CRED-01's spirit (single source for structured data) without forcing awkward template literal changes in copywriting.

**Warning signs:** If you find yourself writing `{`...${EMR_DISPLAY}...`}` inside a `<p>` that previously contained a pure string child, you're in prose territory — leave it or accept the template literal.

### Pitfall 2: StatsSection's animateTo Uses an Integer (87), Not 0.87

**What goes wrong:** `StatsSection.tsx` stores EMR as `animateTo: 87` (integer) with a formatter `(n) => (n / 100).toFixed(2)`. If you naively replace this with `EMR_VALUE` (which is `0.87`), the count-up animation breaks — it animates from 0 to 0.87 in integer steps, outputting `0.00` the whole time.

**Why it happens:** The animation hook works on integers. The display formatter handles the decimal.

**How to avoid:** Export a second constant `EMR_ANIMATE_TO = 87 as const` (or `Math.round(EMR_VALUE * 100)`) for the animation use case. Or leave the integer literal in StatsSection and add a comment explaining why it differs from `EMR_VALUE`.

**Warning signs:** StatsSection stat count-up shows `0.00` or doesn't animate.

### Pitfall 3: CSLB_LOOKUP_URL Is Duplicated, Not a Credential

**What goes wrong:** Both `CertificationsBadges.tsx` and `ContactPage.tsx` define `const CSLB_LOOKUP_URL = '...'` locally. This is a URL constant, not technically a "credential" — but it is duplicated and should move to `credentials.ts` as part of CRED-01.

**Why it happens:** It was defined locally when each component was written.

**How to avoid:** Include `CSLB_LOOKUP_URL` in credentials.ts and remove the local declarations from both files.

### Pitfall 4: Amber Banner in bg-slate-50 Section Needs Sufficient Contrast

**What goes wrong:** The safety section background is `bg-slate-50`. An amber banner inside it needs its own explicit background (`bg-amber-50`) to visually stand out. If only border styling is applied, the banner blends into the section.

**How to avoid:** Use `bg-amber-50 border border-amber-300 text-amber-800` on the banner wrapper — confirmed contrast against `bg-slate-50` context.

### Pitfall 5: `as const` on safetyStats Array with JSX Icons

**What goes wrong:** Using `as const` on an array that contains JSX elements (like `icon: <Shield className="h-6 w-6" />`) causes TypeScript to infer the icon type as a readonly JSX literal, which can cause issues when mapping.

**How to avoid:** Either omit `as const` from the stats array (keeping it on the credentials.ts exports only), or type the array explicitly rather than relying on inference.

---

## Code Examples

Verified patterns from existing codebase:

### Existing SectionHeader Usage (bg-slate-50 context)

```tsx
// From AboutPage.tsx — Company Timeline section (the section immediately before SafetySection)
<section className="py-20 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionHeader
      subheading="Our Journey"
      title="Company Milestones"
      description="From a one-man crew to a $1M bonding capacity — over a decade of growth built on clean work."
      subheadingColor="text-amber-600"
      className="mb-12"
    />
    {/* ... */}
  </div>
</section>
```

Safety section uses the same outer structure; the `subheadingColor` may differ (default `text-accent` is appropriate for safety).

### Existing Card Component Usage

```tsx
// From AboutPage.tsx — Team section
<Card key={member.name} className="p-6 text-center" hover>
  {/* content */}
</Card>

// Card API:
// interface CardProps { children, className?, hover? }
// hover prop adds: transition-all duration-300 hover:shadow-lg hover:-translate-y-1
// For safety stat cards: hover NOT recommended — section should feel static/serious
```

### Existing Inline Credential Data Pattern (CertificationsBadges.tsx — to be refactored)

```tsx
// BEFORE (hardcoded):
const certifications = [
  {
    title: 'C-17 Licensed',
    subtitle: 'License #965590',
    // ...
    verifyUrl: 'https://www.cslb.ca.gov/...',
  },
  {
    title: '0.87 EMR',
    // ...
    description: 'Zero OSHA Incidents',
  },
];

// AFTER (imports from credentials.ts):
import {
  CSLB_LICENSE_DISPLAY,
  CSLB_LOOKUP_URL,
  EMR_DISPLAY,
  OSHA_RECORD_DISPLAY,
} from '../data/credentials';

const certifications = [
  {
    title: `${CSLB_LICENSE_CLASS} Licensed`,
    subtitle: `License #${CSLB_LICENSE_NUMBER}`,
    verifyUrl: CSLB_LOOKUP_URL,
  },
  {
    title: `${EMR_DISPLAY} EMR`,
    description: OSHA_RECORD_DISPLAY,
  },
];
```

### Amber Warning Banner Pattern (consistent with Tailwind conventions)

```tsx
import { AlertTriangle } from 'lucide-react';

{/* Remove this banner when owner approves safety content */}
<div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
  <p>
    <strong>Draft safety content</strong> — pending owner review. Search for{' '}
    <code className="rounded bg-amber-100 px-1 font-mono text-xs">[REVIEW:]</code>{' '}
    markers in this section for items requiring owner confirmation.
  </p>
</div>
```

---

## Credential Extraction Audit

Full inventory of credential strings across the codebase — needed to plan the CRED-01 refactor task:

### Structured data (MUST extract to credentials.ts)

| File | Type | Current value | Constant to use |
|------|------|---------------|-----------------|
| `CertificationsBadges.tsx:5` | URL const | `CSLB_LOOKUP_URL` (local) | `CSLB_LOOKUP_URL` from credentials.ts |
| `CertificationsBadges.tsx:10-11` | Data array | `'C-17 Licensed'`, `'License #965590'` | `CSLB_LICENSE_CLASS`, `CSLB_LICENSE_NUMBER` |
| `CertificationsBadges.tsx:18-19` | Data array | `'SBE Certified'`, `'ID #2034373'` | `SBE_CERT_NUMBER` |
| `CertificationsBadges.tsx:30,32` | Data array | `'0.87 EMR'`, `'Zero OSHA Incidents'` | `EMR_DISPLAY`, `OSHA_RECORD_DISPLAY` |
| `ContactPage.tsx:18` | URL const | `CSLB_LOOKUP_URL` (local) | `CSLB_LOOKUP_URL` from credentials.ts |
| `ContactPage.tsx:23-24` | Badge array | `'C-17 Licensed'`, `'#965590'` | `CSLB_LICENSE_CLASS`, `CSLB_LICENSE_NUMBER` |
| `ContactPage.tsx:28-29` | Badge array | `'SBE Certified'`, `'#2034373'` | `SBE_CERT_NUMBER` |
| `ContactPage.tsx:38` | Badge array | `'0.87 EMR'` | `EMR_DISPLAY` |
| `ContactPage.tsx:162` | Business info | `'License C-17 #965590'` | `CSLB_LICENSE_DISPLAY` |
| `GCResourcesSection.tsx:39` | Info card | `'0.87 EMR'` | `EMR_DISPLAY` |
| `GCResourcesSection.tsx:49` | Info card | `'$1M Bond'` | `BONDING_CAPACITY_DISPLAY` |
| `GCResourcesSection.tsx:51` | Info card detail | `'C-17 License #965590'` | `CSLB_LICENSE_DISPLAY` |
| `GCResourcesSection.tsx:100` | Quick fact | `'$1M'` | `BONDING_CAPACITY_DISPLAY` |
| `GCResourcesSection.tsx:110` | Quick fact | `'0.87'` | `EMR_DISPLAY` |
| `StatsSection.tsx:34,38` | Stat data | `'EMR Safety Rating'`, `'Zero OSHA Incidents'` | label is UI copy; subtext uses `OSHA_RECORD_DISPLAY` |
| `StatsSection.tsx:36` | Stat data | `animateTo: 87` | Keep as integer; see Pitfall 2 |
| `CaseStudyPage.tsx:514,517,520` | CTA badges | `'$1M Bonding'`, `'0.87 EMR'`, `'DIR Registered'` | `BONDING_CAPACITY_DISPLAY`, `EMR_DISPLAY`, `DIR_STATUS` |

### Prose references (acceptable exceptions — document, do not forcibly extract)

| File | Context | Value | Action |
|------|---------|-------|--------|
| `HomePage.tsx:197` | Hero body copy | `$1M bonding capacity, and a 0.87 EMR` | Leave; add comment |
| `AboutPage.tsx:164` | Milestone description | `$1M bonding capacity` | Leave; add comment |
| `AboutPage.tsx:86` | Milestone title | `$1M Bonding` | Leave; add comment |
| `FloatingCTA.tsx:51` | Subtitle | `Get COI, EMR, and references` | "EMR" here is a generic term, not the 0.87 value — leave |

---

## Don't Hand-Roll (detailed)

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Safety narrative content | Custom research | Structured placeholder text with `[REVIEW:]` markers | Owner has final say on all safety program claims; planner writes draft, owner edits |
| Animated stat counters | `useCountUp` + `useOnceInView` | Static `<span>` rendering constants | Explicitly locked decision; animations "trivialize serious data" per REQUIREMENTS.md Out of Scope |
| Custom badge/pill components | New UI component | Tailwind utility classes inline in SafetySection | Complexity doesn't warrant abstraction for a single section |
| Environment-variable review flag | `process.env.NODE_ENV === 'development'` guard | Always-visible JSX amber banner | Owner needs to see it in production staging too; simpler to remove manually |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Credential data hardcoded per-component | `src/data/credentials.ts` constants module | This phase | Changing EMR or bonding amount requires editing 1 file instead of 8 |
| No safety narrative on About page | SafetySection with stat highlights + narrative | This phase | GC prequalification evaluators get substantive safety depth, not just a raw number |

**Deprecated/outdated after this phase:**
- Local `CSLB_LOOKUP_URL` constants in `CertificationsBadges.tsx` and `ContactPage.tsx` — replaced by import from `credentials.ts`
- Credential values as inline string literals in structured data arrays — all replaced by named imports

---

## Validation Architecture

> `workflow.nyquist_validation` is not present in `.planning/config.json` — treating as enabled per research instructions. However, CLAUDE.md states "No test framework is configured." The validation section documents this reality and specifies Wave 0 setup requirements.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None configured |
| Config file | None — Wave 0 must install and configure |
| Quick run command | N/A until Wave 0 complete |
| Full suite command | N/A until Wave 0 complete |

**Note:** CLAUDE.md explicitly states "No test framework is configured." Given this is a marketing website with no backend, a lightweight smoke-test approach is appropriate rather than a full unit test suite. Given the project context (static React marketing site, no logic under test), the practical validation approach for this phase is:

1. `npm run build` passes (TypeScript compilation, no import errors)
2. `npm run lint` passes (no ESLint errors)
3. Manual visual review of About page in browser

These are the meaningful quality gates for this codebase.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Exists? |
|--------|----------|-----------|-------------------|---------|
| CRED-01 | All credential imports resolve from credentials.ts, no duplicate literals in structured arrays | Build | `npm run build` | Build script exists, credentials.ts does not |
| CRED-01 | No lingering local CSLB_LOOKUP_URL constants | Lint/grep | `grep -rn "const CSLB_LOOKUP_URL" src/` (expect 0 results) | Grepable |
| SAFE-01 | SafetySection renders on About page with 3 stats visible | Manual smoke | Browser at /about | N/A |
| SAFE-02 | Narrative paragraphs present with IIPP, toolbox, PPE references | Manual smoke | Browser at /about | N/A |
| SAFE-03 | Amber review banner visible, `[REVIEW:]` markers grepable | Manual + grep | `grep -rn "\[REVIEW:\]" src/` | Grepable |

### Sampling Rate

- **Per task commit:** `npm run build && npm run lint`
- **Per wave merge:** `npm run build && npm run lint` + manual visual review of /about route
- **Phase gate:** Build green + lint clean + manual review of SafetySection before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/data/credentials.ts` — does not exist; must be created before any imports
- [ ] No test framework to install — build + lint are the quality gates for this codebase

---

## Open Questions

1. **StatsSection EMR animateTo integer**
   - What we know: `animateTo: 87` is an integer used by `useCountUp`, formatted as `(n/100).toFixed(2)` — correct display
   - What's unclear: Should `credentials.ts` export `EMR_ANIMATE_TO = 87` for this specific use case, or just leave the integer hardcoded in StatsSection with a comment?
   - Recommendation: Export `export const EMR_ANIMATE_INTEGER = 87 as const;` in credentials.ts with a JSDoc comment explaining the relationship to `EMR_VALUE`. This keeps StatsSection's intent clear and the value in one place.

2. **Owner review process timeline**
   - What we know: STATE.md flags "Owner review process for safety copy not yet defined (email? staged deployment?)" as a blocker
   - What's unclear: Whether Phase 3 can close without the owner having seen and approved the safety narrative
   - Recommendation: Plan must include a manual sign-off step as the final task in the phase. The amber banner + `[REVIEW:]` markers serve as the review artifact. Phase 3 is NOT complete until the owner confirms or edits the narrative content. Coordinate via email with the draft safety section shown in a local build or deployed staging URL.

3. **Should SafetySection have an `id` anchor attribute?**
   - What we know: Other About page sections use `id` for anchor links (`id="vision"`, `id="why-choose"`, `id="team"`)
   - What's unclear: Whether to add `id="safety"` to enable future linking
   - Recommendation: Add `id="safety"` to the safety section for forward compatibility. No harm in having it; omitting it requires a future edit to add it.

---

## Sources

### Primary (HIGH confidence)

- Direct codebase read — `src/components/CertificationsBadges.tsx`, `StatsSection.tsx`, `GCResourcesSection.tsx`, `FloatingCTA.tsx`, `Footer.tsx`, `GCPainPoints.tsx` — component structure and credential string inventory
- Direct codebase read — `src/pages/AboutPage.tsx`, `ContactPage.tsx`, `HomePage.tsx`, `CaseStudyPage.tsx` — page component structure and insertion points
- Direct codebase read — `src/components/ui/Card.tsx`, `Button.tsx`, `SectionHeader.tsx` — reusable component APIs
- Direct codebase read — `CLAUDE.md` — project conventions (named exports, Tailwind tokens, no state management)
- Direct codebase read — `.planning/phases/03-safety-credentials-foundation/03-CONTEXT.md` — locked decisions
- Direct codebase read — `.planning/REQUIREMENTS.md` — requirement definitions
- grep audit — `grep -rn "0\.87\|EMR\|OSHA|\$1M|965590|2034373|DIR|CSLB|SBE|C-17" src/` — complete credential string inventory

### Secondary (MEDIUM confidence)

- None needed — all implementation decisions are within the existing codebase with no new library evaluation required.

### Tertiary (LOW confidence)

- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; everything is existing codebase
- Architecture: HIGH — patterns are copied from existing components in the same repo
- Pitfalls: HIGH — discovered from direct code reading (StatsSection integer, prose references, CSLB URL duplication)
- Credential audit: HIGH — from grep across all src/ files

**Research date:** 2026-03-05
**Valid until:** Stable — this research covers the codebase as-is; valid until the codebase is modified
