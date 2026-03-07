# Phase 6: Typography & Layout Foundation - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Industrial heading font and varied section header layouts site-wide. The site's visual language should feel industrial and intentional, breaking the template-generated sameness. Requirements: DSGN-01 (varied header layouts) and DSGN-02 (industrial heading font).

</domain>

<decisions>
## Implementation Decisions

### Heading font style
- Wide & heavy industrial font (e.g. Bebas Neue, Anton) — bold, blocky, statement-making
- All headings forced to uppercase via CSS (`uppercase` class)
- Heading text color changed from `text-slate-900` to `text-brand` (brand navy #1e3a5f)
- Single font weight only — minimal load (~15KB)
- Loaded from Google Fonts

### Header layout variety
- Three new visual layouts for section headers:
  1. **Left-aligned with accent bar** — vertical orange accent bar (#f97316) on the left edge, text left-aligned
  2. **Full-width dark banner** — spans full width with dark navy background, white text
  3. **Overlapping/offset heading** — large heading text that overlaps or offsets from its section boundary
- No centered layout carried forward — all sections get one of the three new layouts
- Applied site-wide (all pages: HomePage, About, Projects, Residential, Contact, CaseStudy)
- Claude decides which sections get which layout based on content and visual rhythm

### Transition approach
- Extend existing `SectionHeader` component with a `variant` prop
- Variants: `'left-bar'` | `'banner'` | `'overlapping'` (and possibly `'centered'` for backward compat)
- All ~10 existing consumers updated to specify their variant
- Single component maintained — no separate files per layout

### Font scope
- Industrial font applied to: all headings (h1-h6), navbar brand name ("Clean Glass Installation"), stat numbers/badges
- Body text remains on Tailwind default system font stack (no additional font load)

### Claude's Discretion
- Specific font choice (Bebas Neue vs Anton vs similar wide/heavy industrial font)
- Default variant when no `variant` prop specified
- Subheading label usage per variant (keep vs drop)
- Letter-spacing / tracking for industrial headings
- Which specific sections get which layout variant (visual rhythm decisions)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SectionHeader` component (`src/components/SectionHeader.tsx`): Current centered-only header with `subheading`, `title`, `description`, `subheadingColor`, `titleSize`, `className` props — will be extended with `variant` prop
- `StepIcon` sub-component in `ProcessTimeline.tsx`: Uses its own heading styles that may need font update

### Established Patterns
- Tailwind utility classes directly in JSX — font will be added to `tailwind.config.js` `fontFamily` extension
- Brand colors already tokenized: `brand` (#1e3a5f), `accent` (#f97316) — heading color and accent bar will use these tokens
- No custom fonts currently loaded — `index.html` has no Google Fonts link, no `fontFamily` in Tailwind config
- Named exports only, single component per file

### Integration Points
- `SectionHeader` consumed by ~10 components across 6 files (HomePage, AboutPage, ResidentialPage, ContactPage, CaseStudyPage, ProcessTimeline, GCPainPoints, CertificationsBadges, TestimonialCarousel)
- `index.html` — Google Fonts link tag will be added here
- `tailwind.config.js` — `fontFamily` extension for the heading font
- Navbar brand text (`src/components/Navbar.tsx`) — needs industrial font class
- Stat numbers in StatsSection, SafetySection, CertificationsBadges — need industrial font class

</code_context>

<specifics>
## Specific Ideas

- Font style preference is "billboards" — wide, heavy, dominant letterforms
- All-caps is non-negotiable for heading feel
- Orange accent bar (#f97316) specifically chosen for left-aligned variant — matches CTA accent color
- Full-width banner uses dark navy background — consistent with brand navy

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-typography-layout-foundation*
*Context gathered: 2026-03-07*
