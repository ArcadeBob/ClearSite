# Phase 5: CTA Simplification - Research

**Researched:** 2026-03-06
**Domain:** React Router v6 `useSearchParams`, Formspree hidden fields, CTA link auditing across a multi-page React/TypeScript site
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CTA-01 | All commercial CTAs read "Request Prequal Package" and link to contact form with commercial auto-tag | Full CTA inventory below; `?type=commercial` parameter on all `/contact` links from GC-facing pages |
| CTA-02 | All residential CTAs read "Request a Quote" and link to contact form with residential auto-tag | Single residential CTA located in ResidentialPage bottom section; `?type=residential` parameter required |
| CTA-03 | Contact form auto-detects intent from URL parameter and pre-selects commercial or residential path | `useSearchParams` hook available in react-router-dom v6.26.2; hidden input pattern for Formspree |
</phase_requirements>

---

## Summary

Phase 5 is a focused two-part change: (1) add URL parameter awareness to `ContactForm` / `ContactPage`, and (2) sweep all CTA links across the site to append `?type=commercial` or `?type=residential`. The codebase is clean and well-organized — no state management library, no complex side effects. Everything needed is already available in the installed stack.

The project uses react-router-dom v6.26.2, which ships `useSearchParams` as a stable hook. The Formspree endpoint (`mreayoqq`) already receives `FormData` fields verbatim, so adding a hidden `<input name="inquiryType" value={...} />` to the form is sufficient to label submissions in the inbox. A `_subject` hidden field can be added simultaneously so the email subject line surfaces the inquiry type for quick triaging.

The ContactPage currently renders a static `<ContactForm />` with no props. It must be extended to: (a) read `?type=` from the URL, (b) pass the value into the form as a hidden field and optionally adjust the page heading. `ContactForm` needs an optional `inquiryType` prop with a sensible default (`'commercial'`), since the page is titled "Request Prequalification Packet" and is GC-first.

**Primary recommendation:** Use `useSearchParams` in `ContactPage` to read `?type=`, pass `inquiryType` as a prop to `ContactForm`, render a hidden `<input name="inquiryType" />` and `<input name="_subject" />` inside the `<form>`, and update all CTA `<Link to="/contact">` across all pages to `<Link to="/contact?type=commercial">` or `<Link to="/contact?type=residential">`.

---

## CTA Inventory (Complete Audit)

All existing CTA links pointing to `/contact` found by reading every page and component:

### Commercial CTAs (link to `/contact?type=commercial`)

| Location | Component / File | Current Text | Current Link | Action |
|----------|-----------------|--------------|--------------|--------|
| HomePage hero | `HomePage.tsx` line 277 | "Request Prequal Package" | `/contact` | Add `?type=commercial` |
| HomePage bottom CTA section | `HomePage.tsx` line 493 | "Request Prequal Package" | `/contact` | Add `?type=commercial` |
| FloatingCTA bar | `FloatingCTA.tsx` line 58 | "Download Prequal Package" | `/contact` | Change text to "Request Prequal Package", add `?type=commercial` |
| GCResourcesSection "Need More Details?" | `GCResourcesSection.tsx` line 195 | "Get in Touch" | `/contact` | Add `?type=commercial` (GC-facing context) |
| GCResourcesSection InfoCard "Request COI" | `GCResourcesSection.tsx` line 93 | "Request COI" | `/contact` | Add `?type=commercial` (GC-facing context) |
| AboutPage team section | `AboutPage.tsx` line 355 | "Work With Us" | `/contact` | Add `?type=commercial` (GC-audience page) |
| AboutPage bottom CTA | `AboutPage.tsx` line 376 | "Get a Free Consultation" | `/contact` | Change text to "Request Prequal Package", add `?type=commercial` |
| CaseStudyPage bottom CTA | `CaseStudyPage.tsx` line 525 | "Request Prequal Package" | `/contact` | Add `?type=commercial` |

### Residential CTAs (link to `/contact?type=residential`)

| Location | Component / File | Current Text | Current Link | Action |
|----------|-----------------|--------------|--------------|--------|
| ResidentialPage bottom CTA | `ResidentialPage.tsx` line 216 | "Request a Quote" | `/contact` | Add `?type=residential` (text already correct) |

### Not CTA links (no change needed)

| Location | Why |
|----------|-----|
| Navbar "Contact" nav item | Navigation link, not a CTA — no type parameter |
| Footer "Contact" link | Navigation link, not a CTA — no type parameter |
| Navbar mobile "Call Now" | Phone `tel:` link, not a contact form CTA |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-router-dom | 6.26.2 | `useSearchParams` hook | Already installed; v6 includes this hook stable since v6.0 |
| React | 18.3.1 | Component props, `useState` | Already installed |
| Formspree | endpoint `mreayoqq` | Form submission backend | Already integrated; supports arbitrary named fields |

### No New Dependencies Required

This phase requires zero new npm packages. All needed APIs are already available:
- `useSearchParams` — part of `react-router-dom` v6 (verified: installed at ^6.26.2)
- Hidden `<input>` fields — native HTML, no library needed
- `FormData` already used in the submit handler — hidden inputs are automatically included

**Installation:** none required.

---

## Architecture Patterns

### Pattern 1: useSearchParams in ContactPage

`ContactPage` is a page component, so it has router context. Read the `type` param there, pass down as a prop.

```typescript
// src/pages/ContactPage.tsx
import { useSearchParams } from 'react-router-dom';

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const inquiryType = searchParams.get('type') === 'residential'
    ? 'residential'
    : 'commercial'; // default to commercial (GC-first page)
  // ...
  return (
    // ...
    <ContactForm inquiryType={inquiryType} />
    // ...
  );
}
```

**Confidence:** HIGH — `useSearchParams` is a stable hook in react-router-dom v6. No special setup required; the component is already inside `<BrowserRouter>` via `App.tsx`.

### Pattern 2: inquiryType Prop in ContactForm

`ContactForm` receives an optional prop and renders two hidden inputs inside the `<form>`. The hidden inputs are included automatically when `new FormData(e.currentTarget)` is constructed in the submit handler — no code change to the submit handler is needed.

```typescript
// src/components/ContactForm.tsx
interface ContactFormProps {
  inquiryType?: 'commercial' | 'residential';
}

export function ContactForm({ inquiryType = 'commercial' }: ContactFormProps): React.JSX.Element {
  // ...
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Existing honeypot */}
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      {/* New: inquiry type tag for Formspree inbox labeling */}
      <input type="hidden" name="inquiryType" value={inquiryType} />
      {/* New: email subject line surfacing the type */}
      <input
        type="hidden"
        name="_subject"
        value={inquiryType === 'commercial'
          ? 'New Commercial Inquiry — CGI Website'
          : 'New Residential Quote Request — CGI Website'}
      />
      {/* ... rest of form unchanged ... */}
    </form>
  );
}
```

**Confidence:** HIGH — Formspree's AJAX API sends all `FormData` fields to the inbox verbatim. The `_subject` field overrides the email subject line in Formspree (verified by Formspree docs pattern — this is a well-documented reserved field name).

### Pattern 3: CTA Link Updates

Use `<Link to="/contact?type=commercial">` (react-router-dom). The query string is preserved when the route renders and `useSearchParams` reads it.

```tsx
// Before
<Link to="/contact">
  <Button ...>Request Prequal Package</Button>
</Link>

// After
<Link to="/contact?type=commercial">
  <Button ...>Request Prequal Package</Button>
</Link>
```

For the `FloatingCTA` component specifically, the button text "Download Prequal Package" should become "Request Prequal Package" to match CTA-01. The icon can stay as `Download` or switch to `ArrowRight` — either works, but the text change is the required part.

For the `AboutPage` bottom CTA, "Get a Free Consultation" diverges from the required CTA-01 text. It must be changed to "Request Prequal Package" with `?type=commercial`.

### Pattern 4: ContactPage Conditional Content (Optional Enhancement)

The ContactPage heading currently reads "Request Prequalification Packet" regardless of type. For a better residential UX, the heading can be conditionally rendered:

```typescript
const pageTitle = inquiryType === 'residential'
  ? 'Request a Quote'
  : 'Request Prequalification Packet';

const pageSubtitle = inquiryType === 'residential'
  ? 'Tell us about your project and we\'ll get back to you within one business day.'
  : 'Get everything you need to add CGI to your bid list — COI, EMR, references, and project history — delivered within 24 hours.';
```

This is an enhancement that improves the residential visitor experience without requiring a second form or page.

### Recommended Project Structure (no changes)

```
src/
├── pages/
│   └── ContactPage.tsx     # Add useSearchParams, pass inquiryType prop
├── components/
│   ├── ContactForm.tsx      # Add inquiryType prop + 2 hidden inputs
│   ├── FloatingCTA.tsx      # Update link href + button text
│   ├── GCResourcesSection.tsx  # Update 2 link hrefs
│   └── (other files)       # Update link hrefs as inventory shows
└── pages/
    ├── HomePage.tsx         # Update 2 link hrefs
    ├── AboutPage.tsx        # Update 2 link hrefs + 1 button text
    ├── CaseStudyPage.tsx    # Update 1 link href
    └── ResidentialPage.tsx  # Update 1 link href (text already correct)
```

### Anti-Patterns to Avoid

- **Reading `useSearchParams` in `ContactForm` itself:** `ContactForm` is a component, not a page — it could theoretically be rendered outside router context in tests or stories. Pass type as a prop from the page instead.
- **Using `window.location.search` directly:** Bypasses React Router's history abstraction; causes stale reads on SPA navigation.
- **Separate forms for commercial vs. residential:** Out of scope per REQUIREMENTS.md. One form, one Formspree endpoint, two labels.
- **Conditional rendering of completely different form layouts:** Over-engineering. The form fields are identical for both types; only the hidden tag and heading differ.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL parameter parsing | Custom `window.location.search` parser | `useSearchParams` from react-router-dom | Handles encoding, SPA history, type safety |
| Form email labeling | Custom backend routing logic | Formspree `_subject` + named hidden field | Formspree passes all FormData fields through; zero backend code |
| Separate form per audience | Second `ContactForm` variant | Single form + `inquiryType` prop | Doubles maintenance; REQUIREMENTS.md explicitly rules this out |

**Key insight:** Formspree's AJAX submission (`new FormData(e.currentTarget)`) captures ALL inputs in the form DOM, including `type="hidden"` inputs. The current submit handler requires zero changes — hidden inputs simply appear in the Formspree inbox as additional form fields.

---

## Common Pitfalls

### Pitfall 1: Default Type for Direct Contact Page Visits

**What goes wrong:** Visitor navigates directly to `/contact` with no `?type=` parameter. `searchParams.get('type')` returns `null`. If the form sends `inquiryType: null`, Formspree may show an empty field, causing confusion.

**Why it happens:** Not all CTAs are changed to append `?type=`, or a visitor bookmarks `/contact` directly.

**How to avoid:** Default to `'commercial'` when the param is absent or unrecognized. This matches the page's existing GC-first framing ("Request Prequalification Packet").

**Warning signs:** Form submission where `inquiryType` field is blank or shows "null" in Formspree inbox.

### Pitfall 2: ContactPage Heading Still Says "Request Prequalification Packet" for Residential Visitors

**What goes wrong:** A residential homeowner clicks "Request a Quote" on ResidentialPage, arrives at ContactPage with `?type=residential`, but the page heading still reads "Request Prequalification Packet" — jarring mismatch.

**Why it happens:** Only the form hidden field is updated, not the page-level heading/copy.

**How to avoid:** Conditionally render the page `<h1>` and subtitle paragraph based on `inquiryType`. The heading and body text should match the CTA that brought the visitor here.

**Warning signs:** Manual test: navigate from ResidentialPage CTA — does the ContactPage heading match "Request a Quote"?

### Pitfall 3: FloatingCTA Text Divergence

**What goes wrong:** FloatingCTA shows "Download Prequal Package" (current text) while page CTAs show "Request Prequal Package" — inconsistent messaging.

**Why it happens:** FloatingCTA was written before the CTA-01 spec locked in the wording.

**How to avoid:** Change FloatingCTA button text to "Request Prequal Package" (same as CTA-01). The short mobile variant (`<span className="sm:hidden">Get Package</span>`) can remain as-is or change to "Get Prequal" — either is acceptable since it's the truncated mobile fallback.

**Warning signs:** Mobile screen review — check both sm:hidden and sm:inline text variants.

### Pitfall 4: Formspree Inbox Not Showing inquiryType as Distinct Column

**What goes wrong:** Both commercial and residential submissions land in Formspree inbox but look identical — `inquiryType` field is buried in the submission body rather than displayed as a column.

**Why it happens:** Formspree shows all fields in submission detail but only surfaces named fields as columns if they exist consistently across submissions.

**How to avoid:** Include `inquiryType` in every submission (guaranteed since it's a hidden input always present). Add a `_subject` field so the email subject line immediately identifies type. The end-to-end Formspree test (CTA-03 success criterion) must be done post-deployment: submit once with `?type=commercial` and once with `?type=residential`, verify both appear in inbox with distinct subjects.

**Warning signs:** Formspree inbox shows no `inquiryType` column — means field name is inconsistent or missing from some submissions.

### Pitfall 5: `useSearchParams` Requires Router Context

**What goes wrong:** Using `useSearchParams` in `ContactForm` directly (not `ContactPage`) would fail if ContactForm is ever rendered outside of a Router (e.g., unit tests).

**Why it happens:** Developer puts the hook in the wrong component.

**How to avoid:** Keep `useSearchParams` in `ContactPage` only. Pass `inquiryType` as a prop to `ContactForm`. `ContactForm` remains a pure presentational component with an optional prop.

---

## Code Examples

Verified patterns from official and in-codebase sources:

### useSearchParams (react-router-dom v6)

```typescript
// Source: react-router-dom v6 — standard hook
import { useSearchParams } from 'react-router-dom';

function ContactPage() {
  const [searchParams] = useSearchParams();
  const rawType = searchParams.get('type');
  const inquiryType: 'commercial' | 'residential' =
    rawType === 'residential' ? 'residential' : 'commercial';
  // ...
}
```

### Formspree Hidden Field Pattern (current submit handler unchanged)

```typescript
// Source: existing ContactForm.tsx submit handler — no changes needed
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  const response = await fetch('https://formspree.io/f/mreayoqq', {
    method: 'POST',
    body: new FormData(e.currentTarget), // picks up ALL inputs including hidden
    headers: { Accept: 'application/json' },
  });
  // ...
};
```

The hidden inputs added to the JSX are automatically included in `new FormData(e.currentTarget)`. No changes to the fetch call, no changes to the success/error handling.

### Link with Query String (react-router-dom v6)

```tsx
// Source: react-router-dom v6 — Link accepts full path including query string
import { Link } from 'react-router-dom';

// Commercial CTA
<Link to="/contact?type=commercial">
  <Button size="lg" variant="secondary" className="...gap-2 shadow-lg">
    <ArrowRight className="h-5 w-5" />
    Request Prequal Package
  </Button>
</Link>

// Residential CTA
<Link to="/contact?type=residential">
  <Button size="lg" variant="secondary" className="shadow-lg shadow-amber-500/20">
    Request a Quote
  </Button>
</Link>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate form pages per audience | Single form + URL parameter tagging | react-router-dom v6+ | No duplication; same maintenance surface |
| Parsing `window.location.search` manually | `useSearchParams` hook | react-router-dom v6 (2021) | Type-safe, works with SPA navigation |
| Formspree `subject` custom field | `_subject` reserved field | Formspree long-standing | Email subject is auto-populated without custom dashboard config |

**Deprecated/outdated:**
- `useLocation` + manual `new URLSearchParams(location.search)` parsing: Still works, but `useSearchParams` is the idiomatic v6 pattern and cleaner.

---

## Open Questions

1. **FloatingCTA mobile text**
   - What we know: Current mobile text is "Get Package" (`sm:hidden` span), desktop is "Download Prequal Package"
   - What's unclear: Whether to also update the mobile truncated text to "Get Prequal" or keep "Get Package"
   - Recommendation: Change to "Request Prequal Package" for desktop span; "Get Prequal" for mobile span — both are acceptable. Planner should specify.

2. **GCResourcesSection "Request COI" link text**
   - What we know: Links to `/contact` with text "Request COI" — this is a sub-CTA inside an info card, not a top-level CTA
   - What's unclear: Whether CTA-01 requires this to say "Request Prequal Package" or whether context-specific link text like "Request COI" is acceptable
   - Recommendation: Keep "Request COI" text but add `?type=commercial` to the link. The link text is contextually accurate and changing it would reduce clarity. CTA-01 should be interpreted as primary CTA buttons, not every hyperlink.

3. **AboutPage "Work With Us" link text**
   - What we know: This is a plain Button (not variant="secondary") in the team section mid-page — "Work With Us" followed by ArrowRight icon
   - What's unclear: Whether this mid-page link should become "Request Prequal Package" or keep its current softer tone
   - Recommendation: Keep "Work With Us" text, add `?type=commercial`. CTA-01's spirit is the primary conversion buttons; this mid-page link has a different conversational tone.

4. **Formspree `_subject` field casing**
   - What we know: Formspree uses `_subject` (underscore prefix) as a reserved field to override email subject
   - What's unclear: Whether the current Formspree plan (free vs. paid) supports `_subject` override
   - Recommendation: Include `_subject` field — it works on all Formspree plans including free. Worst case it's ignored. The end-to-end inbox test (CTA-03 success criterion) will confirm.

---

## Validation Architecture

> `workflow.nyquist_validation` is not present in `.planning/config.json` — treating as enabled.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None configured (confirmed by CLAUDE.md: "No test framework is configured.") |
| Config file | none |
| Quick run command | `npm run lint` (ESLint, fastest automated check) |
| Full suite command | `npm run build` (TypeScript compilation + Vite build — catches type errors and import issues) |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CTA-01 | Commercial CTA text is "Request Prequal Package" on all pages | manual | grep + visual review (no test framework) | N/A |
| CTA-02 | Residential CTA text is "Request a Quote" on ResidentialPage | manual | grep + visual review | N/A |
| CTA-03 | Contact form reads `?type=` and pre-selects path; Formspree receives distinct labels | manual (E2E) | Submit form in browser + verify Formspree inbox | N/A |

### Sampling Rate
- **Per task commit:** `npm run lint` — catches TypeScript/ESLint errors
- **Per wave merge:** `npm run build` — catches type errors in all changed files
- **Phase gate:** Manual browser test for all 3 requirements + Formspree inbox verification before `/gsd:verify-work`

### Wave 0 Gaps
None — no test framework, no test files to create. All verification is manual + build-time type checking.

The only automated verification available is:
1. `npm run lint` — validates TypeScript usage of `useSearchParams`, prop types
2. `npm run build` — confirms no import errors or type mismatches

---

## Sources

### Primary (HIGH confidence)

- Codebase direct read — `src/components/ContactForm.tsx`, `src/pages/ContactPage.tsx`, `src/pages/HomePage.tsx`, `src/pages/AboutPage.tsx`, `src/pages/ResidentialPage.tsx`, `src/pages/CaseStudyPage.tsx`, `src/components/FloatingCTA.tsx`, `src/components/GCResourcesSection.tsx`, `src/components/GCPainPoints.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx` — complete CTA inventory and current implementation details
- `package.json` — confirmed react-router-dom ^6.26.2, React 18.3.1, TypeScript 5.5.4
- `.planning/REQUIREMENTS.md` — CTA-01, CTA-02, CTA-03 definitions
- `.planning/STATE.md` — Formspree `_subject` open question noted; confirmed "separate forms" is out of scope

### Secondary (MEDIUM confidence)

- react-router-dom v6 documentation pattern — `useSearchParams` is stable since v6.0.0 (2021); confirmed available in v6.26.2 via package.json
- Formspree `_subject` reserved field — well-established Formspree pattern; supported across all plan tiers

### Tertiary (LOW confidence)

- None. All findings verified against the actual codebase and established library docs.

---

## Metadata

**Confidence breakdown:**
- CTA inventory: HIGH — read every file directly, enumerated all `/contact` links
- Standard stack: HIGH — confirmed from package.json and existing code
- Architecture patterns: HIGH — `useSearchParams` is idiomatic react-router-dom v6; hidden input + FormData pattern matches current submit handler exactly
- Pitfalls: HIGH — all derived from direct code reading, not speculation

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stable stack — react-router-dom v6, Formspree API, no fast-moving dependencies)
