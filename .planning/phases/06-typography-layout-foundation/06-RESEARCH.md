# Phase 6: Typography & Layout Foundation - Research

**Researched:** 2026-03-07
**Domain:** Web typography (Google Fonts) + Tailwind CSS component variant patterns
**Confidence:** HIGH

## Summary

This phase replaces the uniform centered SectionHeader pattern with three distinct layout variants and adds an industrial heading font across the site. The technical scope is well-defined: one Google Fonts embed, one Tailwind config extension, one component refactor (SectionHeader variant prop), and a sweep of ~15 consumer call sites plus ~50 standalone heading elements for font class application.

The main risk is not technical but visual: ensuring the three new layouts create genuine variety without feeling random. The implementation itself is straightforward Tailwind CSS work with no new dependencies beyond a Google Font.

**Primary recommendation:** Use Bebas Neue (400 weight, ~15KB) loaded via Google Fonts in index.html with preconnect, extended into Tailwind as `font-heading`, applied to all h1-h6 and stat elements with `uppercase tracking-wide`.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Wide & heavy industrial font (e.g. Bebas Neue, Anton) -- bold, blocky, statement-making
- All headings forced to uppercase via CSS (`uppercase` class)
- Heading text color changed from `text-slate-900` to `text-brand` (brand navy #1e3a5f)
- Single font weight only -- minimal load (~15KB)
- Loaded from Google Fonts
- Three new visual layouts for section headers:
  1. Left-aligned with accent bar -- vertical orange accent bar (#f97316) on the left edge, text left-aligned
  2. Full-width dark banner -- spans full width with dark navy background, white text
  3. Overlapping/offset heading -- large heading text that overlaps or offsets from its section boundary
- No centered layout carried forward -- all sections get one of the three new layouts
- Applied site-wide (all pages)
- Extend existing SectionHeader with `variant` prop (`'left-bar'` | `'banner'` | `'overlapping'`)
- All ~10 existing consumers updated to specify their variant
- Single component maintained -- no separate files per layout
- Font scope: all headings (h1-h6), navbar brand name, stat numbers/badges
- Body text remains on Tailwind default system font stack

### Claude's Discretion
- Specific font choice (Bebas Neue vs Anton vs similar)
- Default variant when no variant prop specified
- Subheading label usage per variant (keep vs drop)
- Letter-spacing / tracking for industrial headings
- Which specific sections get which layout variant (visual rhythm decisions)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DSGN-01 | Section headers use varied visual layouts (left-aligned, full-width banners, overlapping) instead of uniform centered SectionHeader pattern | SectionHeader variant prop architecture; 15 consumer call sites identified; three variant implementations documented |
| DSGN-02 | Industrial/bold heading font applied to headings site-wide | Bebas Neue font selection; Tailwind fontFamily extension; ~50 standalone heading elements identified for font class sweep |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Bebas Neue | Regular 400 | Industrial heading font | Uppercase-only display font, ~15KB, wide/heavy/condensed -- matches "billboard" aesthetic. Most popular condensed display font on Google Fonts. |
| Tailwind CSS | 3.4.17 (existing) | Utility styling + font config | Already in project, fontFamily extension is the standard pattern |
| Google Fonts CDN | N/A | Font delivery | Standard for web fonts, no npm package needed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Bebas Neue | Anton | Anton has lowercase glyphs (unnecessary since all-caps enforced), slightly wider letterforms, less condensed feel. Bebas Neue is more "billboard" |
| Bebas Neue | Oswald | Oswald is condensed but lighter/thinner -- less industrial impact at heading sizes |
| Bebas Neue | Barlow Condensed | More geometric/modern, less raw industrial feel |

**Font Choice Recommendation:** Bebas Neue. It is uppercase-only by design (aligns with the locked all-caps decision), has the widest/heaviest condensed feel among the options, and loads only one weight (~15KB). It is the most "billboard" of the candidates.

## Architecture Patterns

### SectionHeader Variant Architecture

The existing SectionHeader has 6 props: `subheading`, `title`, `description`, `subheadingColor`, `titleSize`, `className`. It will gain a `variant` prop.

**Variant type:**
```typescript
type SectionHeaderVariant = 'left-bar' | 'banner' | 'overlapping';
```

**Default variant:** `'left-bar'` -- it is the most versatile and closest to a "normal" section header, making it the safest fallback if a consumer forgets to specify.

**Subheading handling per variant:**
- `left-bar`: Keep subheading above title, left-aligned, accent color
- `banner`: Keep subheading as small label above or below title, white text
- `overlapping`: Drop subheading -- the oversized title IS the visual statement; subheading would compete

### Variant 1: Left-Aligned with Accent Bar
```tsx
// Left-aligned, vertical orange bar on left edge
<div className={`border-l-4 border-accent pl-6 ${className}`}>
  <p className={`text-sm font-semibold ${subheadingColor} uppercase tracking-wider mb-2`}>
    {subheading}
  </p>
  <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand uppercase tracking-wide mb-4">
    {title}
  </h2>
  {description && (
    <p className="text-lg text-slate-600 max-w-2xl">{description}</p>
  )}
</div>
```

### Variant 2: Full-Width Dark Banner
```tsx
// Full-width dark navy background, white text, centered
<div className={`bg-brand py-10 px-6 -mx-4 sm:-mx-6 lg:-mx-8 ${className}`}>
  <div className="max-w-7xl mx-auto text-center">
    <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
      {subheading}
    </p>
    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
      {title}
    </h2>
    {description && (
      <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">{description}</p>
    )}
  </div>
</div>
```

**Key detail:** The `-mx` negative margins let the banner break out of the parent container's padding to achieve true full-width. Exact values depend on parent padding context. May need a simpler approach using `w-screen` or wrapping differently if parent structure varies.

### Variant 3: Overlapping/Offset Heading
```tsx
// Large heading that visually overlaps/offsets from section boundary
<div className={`relative ${className}`}>
  <h2 className="font-heading text-5xl md:text-7xl font-bold text-brand/10 uppercase tracking-wide absolute -top-8 left-0 select-none pointer-events-none"
      aria-hidden="true">
    {title}
  </h2>
  <div className="relative pt-6">
    <p className={`text-sm font-semibold ${subheadingColor} uppercase tracking-wider mb-2`}>
      {subheading}
    </p>
    <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand uppercase tracking-wide mb-4">
      {title}
    </h2>
    {description && (
      <p className="text-lg text-slate-600 max-w-2xl">{description}</p>
    )}
  </div>
</div>
```

**Key detail:** The "overlap" effect uses a large, semi-transparent ghost title behind the real title. The ghost is `aria-hidden` and `pointer-events-none` for accessibility. The `select-none` prevents accidental text selection. Opacity via `text-brand/10` keeps it subtle.

### Variant Assignment Strategy

Recommended section-to-variant mapping for visual rhythm (no two adjacent sections should share the same variant):

| Page | Section | Recommended Variant | Rationale |
|------|---------|-------------------|-----------|
| HomePage | Services (via SectionHeader) | `left-bar` | Content-heavy section, left-align reads naturally |
| HomePage | "Ready to Start" CTA | `banner` | Full-width dark treatment for CTA emphasis |
| HomePage | "Your Project" bottom CTA | `overlapping` | Big statement to close the page |
| AboutPage | Story section | `left-bar` | Narrative content, left-aligned |
| AboutPage | Milestones | `banner` | Visual break between narrative sections |
| AboutPage | Team section | `overlapping` | Eye-catching for people section |
| AboutPage | CTA section | `left-bar` | Variety from previous |
| ResidentialPage | Services | `left-bar` | Content listing |
| ResidentialPage | Process | `banner` | Visual break |
| ContactPage | Contact section | `banner` | Formal/authoritative feel |
| CaseStudyPage | Multiple sections | Alternate `left-bar`/`banner`/`overlapping` | Rhythm through the case study |
| ProcessTimeline | Process header | `left-bar` | Linear content |
| GCPainPoints | Pain points header | `overlapping` | Dramatic problem statement |
| CertificationsBadges | Certs header | `banner` | Authoritative credentials |
| SafetySection | Safety header | `left-bar` | Informational |
| PrevailingWageBanner | Wage header | `banner` | Authoritative/official feel |
| TestimonialCarousel | Testimonials header | `left-bar` | Content-focused |

This gives roughly: 7 left-bar, 5 banner, 3 overlapping -- good distribution with no variant appearing more than twice consecutively.

### Font Application Scope

Beyond SectionHeader, standalone headings need the `font-heading uppercase tracking-wide text-brand` treatment:

1. **Page hero h1 elements** (~6): HomePage, AboutPage, ProjectsPage, ResidentialPage, ContactPage, CaseStudyPage
2. **Standalone h2 section titles** (~8): PromiseSection, ServiceAreaMap, GCResourcesSection, HomePage inline sections, ResidentialPage inline sections, bottom CTA sections
3. **Stat numbers and badges**: StatsSection counters, SafetySection numbers, CertificationsBadges -- apply `font-heading` but NOT `text-brand` (keep contextual colors)
4. **Navbar brand name**: Currently just a logo image -- CONTEXT says to apply industrial font to "Clean Glass Installation" text, but the Navbar uses an image logo only. This may be a no-op unless brand text is added.
5. **Footer h3 elements** (3): These are small utility headings ("Quick Links", "Services", "Contact") -- apply `font-heading uppercase` but keep `text-white`
6. **Card-level h3/h4 elements** (~15): ServiceCard, ProjectCard, process steps, pain point cards -- apply `font-heading` but keep smaller sizing

**Elements to NOT change:**
- Body paragraph text
- Button text
- Navigation link text
- Form labels/inputs
- Small metadata text (dates, categories, badges)

### Anti-Patterns to Avoid
- **Mixing font classes inconsistently:** Every heading element should get `font-heading` -- partial application creates jarring inconsistency
- **Forgetting `uppercase` on headings:** Since Bebas Neue is uppercase-only, lowercase text will render as small-caps or fallback -- always pair with `uppercase` class
- **Breaking responsive layouts with banner variant:** The negative margin trick for full-width banners can cause horizontal scrollbars -- test at all breakpoints

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading | Self-hosting or npm font packages | Google Fonts CDN link in index.html | CDN is cached across sites, preconnect handles perf |
| Font fallback chain | Custom @font-face with manual fallbacks | Tailwind fontFamily config with system fallback | `['Bebas Neue', 'sans-serif']` in config handles it |
| Section break-out layouts | Complex CSS grid or absolute positioning | Tailwind negative margins or dedicated wrapper | Keep it simple with utility classes |

## Common Pitfalls

### Pitfall 1: Layout Shift from Web Font Loading
**What goes wrong:** Text renders in system font then jumps when Bebas Neue loads, causing visible content shift
**Why it happens:** Google Fonts with `display=swap` shows fallback first
**How to avoid:** Use `font-display: swap` (default in Google Fonts URL) AND add `preconnect` links. The shift is acceptable for display fonts since headings don't reflow surrounding content much. Do NOT use `font-display: block` as it causes invisible text.
**Warning signs:** LCP shifts reported in Lighthouse

### Pitfall 2: Banner Variant Horizontal Overflow
**What goes wrong:** The full-width banner using negative margins creates horizontal scrollbar
**Why it happens:** Negative margins push content beyond viewport without `overflow-x: hidden` on parent
**How to avoid:** Either add `overflow-x-hidden` on the page wrapper, or use a different approach (e.g., the banner section wraps OUTSIDE the max-width container rather than breaking out of it)
**Warning signs:** Horizontal scrollbar visible on any viewport width

### Pitfall 3: Overlapping Variant Z-Index Conflicts
**What goes wrong:** The ghost title text appears above interactive elements or clips incorrectly
**Why it happens:** `absolute` positioning and `relative` parent create new stacking context
**How to avoid:** Ghost title must have `pointer-events-none`, `select-none`, `aria-hidden="true"`, and low z-index. Verify it doesn't obscure any interactive elements.
**Warning signs:** Ghost text is selectable or blocks clicks

### Pitfall 4: Missing Uppercase on Bebas Neue
**What goes wrong:** Lowercase text in Bebas Neue renders as small-caps-like glyphs (uppercase shapes at lowercase size)
**Why it happens:** Bebas Neue only has uppercase letterforms; the "lowercase" glyphs are just smaller uppercase
**How to avoid:** Always pair `font-heading` with `uppercase` Tailwind class
**Warning signs:** Text looks oddly small or inconsistently sized

### Pitfall 5: Incomplete Heading Sweep
**What goes wrong:** Some headings still show system font while others show Bebas Neue, creating inconsistency
**Why it happens:** ~50 heading elements spread across ~15 files; easy to miss some
**How to avoid:** Use grep to find ALL `<h[1-6]` elements and verify each has `font-heading`; verify with full-site visual review
**Warning signs:** Heading font looks different between pages or sections

## Code Examples

### Google Fonts Link (index.html)
```html
<!-- Add to <head> before any stylesheet links -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
```

### Tailwind Config Extension (tailwind.config.js)
```javascript
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1e3a5f',
          dark: '#162c47',
        },
        accent: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
      },
    },
  },
}
```
This makes `font-heading` available as a Tailwind utility class.

### Standard Heading Pattern
```tsx
// Before (current)
<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Title</h2>

// After (industrial)
<h2 className="font-heading text-3xl md:text-4xl font-bold text-brand uppercase tracking-wide mb-4">Title</h2>
```

Changes: `+font-heading +uppercase +tracking-wide`, `text-slate-900` -> `text-brand`

### SectionHeader Variant Prop Interface
```typescript
type SectionHeaderVariant = 'left-bar' | 'banner' | 'overlapping';

interface SectionHeaderProps {
  subheading: string;
  title: string;
  description?: React.ReactNode;
  subheadingColor?: string;
  titleSize?: 'sm' | 'lg';
  className?: string;
  variant?: SectionHeaderVariant; // NEW -- defaults to 'left-bar'
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| @import fonts in CSS | preconnect + link in HTML head | 2020+ | Better load performance, earlier connection |
| Manual @font-face declarations | Google Fonts CDN with display=swap | Standard practice | Simpler, cached across sites |
| font-display: auto | font-display: swap | 2019+ | Prevents invisible text, better UX |

## Open Questions

1. **Navbar brand text**
   - What we know: Navbar currently uses only an image logo (`/logo.png`), no text reading "Clean Glass Installation"
   - What's unclear: Whether to add brand text next to the logo for the industrial font treatment
   - Recommendation: Skip this -- the logo already contains the brand name. Adding redundant text would clutter the navbar. Mark as N/A for this phase.

2. **Banner variant container break-out approach**
   - What we know: Multiple approaches exist (negative margins, `w-screen`, restructuring parent)
   - What's unclear: Which parent containers the SectionHeader sits inside across all pages
   - Recommendation: Start with negative margin approach; if it causes overflow issues, fall back to requiring banner-variant sections to be placed outside the max-width container

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None configured |
| Config file | None |
| Quick run command | `npm run build` (type-check + build) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DSGN-01 | Section headers render in 3 variant layouts | manual-only | Visual inspection across all pages | N/A |
| DSGN-02 | Industrial heading font renders site-wide | manual-only | Visual inspection + `npm run build` for type safety | N/A |

**Justification for manual-only:** These are purely visual/typographic changes. Type-checking via `npm run build` catches prop type errors (variant prop), but the actual rendering is only verifiable visually. No test framework is configured and adding one for CSS class assertions would be low-value.

### Sampling Rate
- **Per task commit:** `npm run build` (catches TypeScript errors from SectionHeader prop changes)
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Build passes + visual review of all 6 routes

### Wave 0 Gaps
None -- no test infrastructure needed. Build + lint provide sufficient automated validation for CSS/typography changes.

## Sources

### Primary (HIGH confidence)
- Existing codebase: SectionHeader.tsx, tailwind.config.js, index.html, Navbar.tsx -- direct code inspection
- [Tailwind CSS fontFamily docs](https://tailwindcss.com/docs/font-family) -- font extension pattern
- [Bebas Neue on Google Fonts](https://fonts.google.com/specimen/Bebas+Neue) -- font characteristics

### Secondary (MEDIUM confidence)
- [GeeksforGeeks: Google Fonts in Tailwind CSS](https://www.geeksforgeeks.org/css/how-to-use-google-fonts-in-tailwind-css/) -- preconnect + Tailwind integration pattern
- [Hatchet: Google Fonts in Tailwind CSS](https://hatchet.com.au/blog/how-to-use-google-fonts-in-tailwind-css/) -- loading best practices
- [Hook Agency: Best Google Fonts for Headings](https://hookagency.com/blog/best-google-fonts-for-headings/) -- font comparison context

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- well-known Google Fonts + Tailwind pattern, verified against codebase
- Architecture: HIGH -- SectionHeader component is small and well-understood, variant pattern is standard React
- Pitfalls: HIGH -- font loading and layout overflow are well-documented web development concerns

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (stable domain, no fast-moving dependencies)
