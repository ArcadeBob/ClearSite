# Phase 2: Visual Polish - Research

**Researched:** 2026-03-03
**Domain:** React/TSX markup editing — hero section pattern matching and Unsplash image replacement
**Confidence:** HIGH

## Summary

Phase 2 has two completely independent tasks. Both are small, surgical markup edits with no new dependencies, no new components, and no state changes required.

**CONT-01** (Contact hero restyle) is a pure JSX diff. The About and Projects pages share an identical raw `<h1>` + `<p>` hero pattern. The Contact page hero uses `SectionHeader` instead, which renders the wrong element (`<h2>` not `<h1>`), applies `text-slate-900` to the title (invisible on a dark background), defaults to `text-center`, and uses a subheading element that the other heroes do not have. The fix is to replace the `SectionHeader` call in the Contact hero with the same raw markup pattern used by About and Projects.

**ABUT-01** (About page image) is a one-line `src` attribute change. The current image `photo-1581094794329-c8112a89af12` is a generic stock photo. The image container is fixed at `h-[450px]` with `object-cover w-full`, so any replacement needs to be landscape-oriented. The decorative `absolute` element behind the image (amber-50 rotated card) is unaffected. The planner should specify a known good Unsplash photo ID for a commercial construction or glazing crew scene.

**Primary recommendation:** Edit ContactPage.tsx hero block and AboutPage.tsx image src — no new packages, no new components, no new files.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Contact page header section restyled to visually match the hero pattern used on About and Projects pages | Hero markup pattern fully documented below; exact diff specified |
| ABUT-01 | About page brand story image replaced with a team/crew Unsplash photo relevant to commercial glazing | Container constraints documented; known Unsplash IDs provided |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React + TSX | 18 (already installed) | JSX markup | Project stack |
| Tailwind CSS 3 | Already installed | Utility classes | Project stack |

### Supporting

No additional packages needed. Both tasks are pure markup edits within existing files.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Raw `<h1>` + `<p>` in hero | `SectionHeader` with overrides | `SectionHeader` is designed for body sections — its title class hardcodes `text-slate-900`, making it wrong for white-on-dark heroes without deep prop additions. Raw markup is the correct choice here. |
| `source.unsplash.com` query URL | Direct `images.unsplash.com/photo-ID` URL | Query URLs are non-deterministic (change over time). The codebase uses direct photo ID URLs throughout — use the same pattern. |

**Installation:**
No new packages needed.

## Architecture Patterns

### Current Hero Pattern — About and Projects Pages

Both AboutPage.tsx and ProjectsPage.tsx use an identical hero structure. This is the target pattern:

```tsx
// Source: src/pages/AboutPage.tsx lines 96–107
// Source: src/pages/ProjectsPage.tsx lines 175–184
<div className="bg-brand text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-bold mb-4">
      {/* page title */}
    </h1>
    <p className="text-xl text-slate-300 max-w-3xl">
      {/* subtitle */}
    </p>
  </div>
</div>
```

Key properties:
- Outer wrapper: `bg-brand text-white py-16`
- Inner container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Title: `<h1>` with `text-4xl font-bold mb-4`
- Subtitle: `<p>` with `text-xl text-slate-300 max-w-3xl`
- No subheading element (no uppercase tracking label)
- No decorative overlay elements

### Current Contact Hero — What Needs Replacing

```tsx
// Source: src/pages/ContactPage.tsx lines 74–84 (CURRENT — needs replacing)
<div className="bg-brand text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionHeader
      subheading="For General Contractors"
      title="Request Prequalification Packet"
      description="Get everything you need to add CGI to your bid list — COI, EMR, references, and project history — delivered within 24 hours."
      subheadingColor="text-amber-300"
      className="text-left"
    />
  </div>
</div>
```

**Why SectionHeader is wrong here:**
- `SectionHeader` renders `<h2>` not `<h1>` (semantic mismatch)
- Its title class hardcodes `text-slate-900` — invisible on `bg-brand` dark background
- It adds an uppercase label (`<p>` subheading) not present on About/Projects heroes
- It is designed for body sections, not page-level hero headers

### Contact Hero — Target State

```tsx
// Target: matching About/Projects pattern, preserving Contact's content
<div className="bg-brand text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-bold mb-4">
      Request Prequalification Packet
    </h1>
    <p className="text-xl text-slate-300 max-w-3xl">
      Get everything you need to add CGI to your bid list — COI, EMR,
      references, and project history — delivered within 24 hours.
    </p>
  </div>
</div>
```

The `SectionHeader` import in ContactPage.tsx must remain — it is still used in the FAQ section further down the page (line 245).

### About Image Container — Constraints

```tsx
// Source: src/pages/AboutPage.tsx lines 146–154
<div className="relative">
  <div className="absolute -inset-4 bg-amber-50 rounded-2xl transform -rotate-2"></div>
  <img
    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    alt="Professional glazing work"
    className="relative rounded-xl shadow-xl w-full object-cover h-[450px]"
  />
</div>
```

Constraints on the replacement image:
- Fixed height: `h-[450px]` with `object-cover` — landscape orientation preferred (16:9 or wider)
- Width: `w-full` — fills the right column of a 2-col grid (approx 600px rendered)
- The decorative `absolute` div behind it is unchanged
- `alt` text should be updated to reflect the new image subject

### Unsplash URL Pattern

All existing Unsplash images in this codebase use the `images.unsplash.com/photo-{ID}` format with query parameters:

```
https://images.unsplash.com/photo-{PHOTO_ID}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80
```

Use this same pattern for the replacement image.

### Candidate Unsplash Photo IDs for ABUT-01

These are well-known Unsplash IDs for commercial construction/crew scenes relevant to glazing or facade work. Confidence is MEDIUM (training data knowledge, not live-verified):

| Photo ID | Description | Confidence |
|----------|-------------|------------|
| `photo-1504307651254-35680f356dfd` | Construction workers on a building exterior | MEDIUM |
| `photo-1541888946425-d81bb19240f5` | Construction crew at work site | MEDIUM |
| `photo-1565008447742-97f6f38c985c` | Workers installing glass panels / facade work | MEDIUM |
| `photo-1599707367072-cd6ada2bc375` | Commercial glazing / window installation crew | MEDIUM |

**Important:** The implementer must verify the photo ID visually before committing. The `images.unsplash.com` URL with `?w=200&q=80` can be pasted into a browser to preview. The best choice is a photo showing workers handling glass panels, storefront framing, or curtain wall installation — not just generic hard hats.

### Anti-Patterns to Avoid

- **Removing `SectionHeader` import:** Do NOT remove the `SectionHeader` import from ContactPage.tsx — it is still used in the FAQ section.
- **Changing Contact page copy:** CONT-01 is style-only. The title text and description text must remain unchanged.
- **Changing the image container markup:** The `relative` wrapper, the decorative `absolute` rotated div, and all CSS classes on the `<img>` tag stay the same — only the `src` and `alt` attributes change.
- **Using `source.unsplash.com` query URLs:** These are non-deterministic. Use direct `photo-ID` URLs to match the existing codebase pattern.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Hero pattern consistency | Custom hero component | Copy the existing `<h1>` + `<p>` markup from About/Projects | No abstraction needed for 3 pages; direct duplication is correct here |
| Image preview | Build an image picker | Paste URL in browser tab to verify visually | Zero overhead, immediate feedback |

**Key insight:** Both tasks are single-file edits with exact search/replace targets. No abstraction or new component is warranted.

## Common Pitfalls

### Pitfall 1: Accidentally Breaking the Contact Page Title Visibility

**What goes wrong:** The `SectionHeader` component hardcodes `text-slate-900` on the title element. If a developer tries to keep `SectionHeader` and only remove the className prop, the title becomes invisible on the dark `bg-brand` background.
**Why it happens:** `SectionHeader` was designed for white-background body sections.
**How to avoid:** Replace the entire `SectionHeader` block with raw `<h1>` + `<p>` markup matching the About/Projects pattern.
**Warning signs:** Title text invisible or dark on dark background in browser preview.

### Pitfall 2: Removing the SectionHeader Import

**What goes wrong:** Removing the `SectionHeader` import after editing the hero causes a TypeScript compile error because `SectionHeader` is used again on line 245 in the FAQ section.
**Why it happens:** Import cleanup reflex without checking other usages.
**How to avoid:** Grep for `SectionHeader` in ContactPage.tsx before touching the import. It appears twice.
**Warning signs:** `npm run build` fails with "SectionHeader is not defined".

### Pitfall 3: Wrong Unsplash Image for About Page

**What goes wrong:** Replacing with a photo that is portrait-oriented or shows a scene unrelated to glazing (e.g., generic hard hats, office workers, abstract architecture).
**Why it happens:** Using a photo ID from memory without visual verification.
**How to avoid:** Preview the image URL in a browser tab before committing. The photo should clearly show workers handling glass, aluminum framing, or curtain wall/storefront installation.
**Warning signs:** Portrait image shows heavy letterboxing (blank bands top/bottom); off-topic image undermines credibility.

### Pitfall 4: Aspect Ratio Shift

**What goes wrong:** The `h-[450px]` fixed height with `object-cover` handles any source aspect ratio, BUT a very narrow portrait image may show a dramatically cropped subject.
**Why it happens:** `object-cover` crops to fill — bad for portrait sources.
**How to avoid:** Prefer landscape photos (wider than tall). Standard Unsplash landscape photos at `w=800` are safe.

## Code Examples

Verified patterns from official sources (direct codebase read):

### CONT-01: Complete Hero Block Replacement

```tsx
// BEFORE (ContactPage.tsx lines 74–84):
<div className="bg-brand text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionHeader
      subheading="For General Contractors"
      title="Request Prequalification Packet"
      description="Get everything you need to add CGI to your bid list — COI, EMR, references, and project history — delivered within 24 hours."
      subheadingColor="text-amber-300"
      className="text-left"
    />
  </div>
</div>

// AFTER (matching About/Projects pattern):
<div className="bg-brand text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-bold mb-4">
      Request Prequalification Packet
    </h1>
    <p className="text-xl text-slate-300 max-w-3xl">
      Get everything you need to add CGI to your bid list — COI, EMR,
      references, and project history — delivered within 24 hours.
    </p>
  </div>
</div>
```

### ABUT-01: Image src Replacement (template)

```tsx
// BEFORE (AboutPage.tsx line 149):
src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
alt="Professional glazing work"

// AFTER (replace with verified landscape glazing/crew photo):
src="https://images.unsplash.com/photo-{VERIFIED_ID}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
alt="CGI crew installing commercial glazing"
```

The `{VERIFIED_ID}` must be chosen by the implementer after visual inspection. Candidate IDs listed in Architecture Patterns section above.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Generic `SectionHeader` in all hero blocks | Raw `<h1>` + `<p>` for page-level heroes | Established at project genesis (this is a correction) | Contact hero is the only hero not using the raw pattern |

**Deprecated/outdated:**
- Using `SectionHeader` in dark-background heroes: the component's hardcoded `text-slate-900` makes the title invisible without additional overrides. The About and Projects pages demonstrate the correct alternative.

## Open Questions

1. **Which specific Unsplash photo ID for ABUT-01?**
   - What we know: The container is `h-[450px] object-cover w-full`; the codebase uses direct `photo-ID` URLs; the subject should be a glazing/construction crew
   - What's unclear: Cannot verify photo IDs visually from this research context
   - Recommendation: Implementer previews candidate IDs (`photo-1504307651254-35680f356dfd`, `photo-1541888946425-d81bb19240f5`, `photo-1565008447742-97f6f38c985c`, `photo-1599707367072-cd6ada2bc375`) in a browser tab and selects the most domain-appropriate one. The `npm run dev` preview should be used to confirm no layout shift.

## Sources

### Primary (HIGH confidence)
- `src/pages/ContactPage.tsx` — full source read; hero block lines 74–84 confirmed
- `src/pages/AboutPage.tsx` — full source read; hero pattern lines 96–107, image container lines 146–154 confirmed
- `src/pages/ProjectsPage.tsx` — full source read; hero pattern lines 175–184 confirmed
- `src/components/SectionHeader.tsx` — full source read; confirms `text-slate-900` hardcoded on title, `<h2>` element used
- `.planning/REQUIREMENTS.md` — CONT-01 and ABUT-01 requirement text confirmed
- `.planning/STATE.md` — Accumulated decisions: "Use Unsplash crew photo for About page", "Match Contact hero to About/Projects style (style only, no copy changes)"

### Secondary (MEDIUM confidence)
- Unsplash candidate photo IDs: from training knowledge, not live-verified. Implementer must confirm visually.

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages; existing React/Tailwind/TSX stack only
- Architecture: HIGH — exact before/after markup derived directly from source file reads
- Pitfalls: HIGH — each pitfall identified from direct inspection of the code (SectionHeader internals, import usage, container constraints)
- Unsplash photo ID candidates: MEDIUM — training knowledge, not live-verified

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (stable — no external library dependencies)
