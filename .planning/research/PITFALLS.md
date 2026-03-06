# Pitfalls Research

**Domain:** Adding safety credentials, prevailing wage callouts, expanded service sections, and CTA simplification to an existing React marketing site for a commercial glazing subcontractor
**Researched:** 2026-03-05
**Confidence:** HIGH — based on direct codebase inspection of all relevant files

---

## Critical Pitfalls

### Pitfall 1: Credential Data Scattered Across 7+ Files With No Single Source of Truth

**What goes wrong:**
Safety credentials (EMR 0.87, OSHA Zero, DIR Registered, $1M Bonding) already appear in at minimum seven places: `StatsSection.tsx`, `CertificationsBadges.tsx`, `GCResourcesSection.tsx`, `ContactPage.tsx` (trustBadges array), `HomePage.tsx` (hero copy + CTA section pill chips), `GCPainPoints.tsx` is adjacent, and `AboutPage.tsx` (hero copy). Adding a new safety program section to AboutPage creates an eighth location. When credential data changes (e.g., EMR updates, new certification year, bonding limit increase), changes must be made in 7+ places. One stale instance left behind becomes a credibility risk for a business where GCs verify these numbers.

**Why it happens:**
The architecture is intentional — all data is hardcoded inline per CLAUDE.md. When a credential badge was added to ContactPage it was easier to copy the `trustBadges` array than to extract a shared module. Each addition followed the same pattern. The new safety section will be tempted to follow the same pattern.

**How to avoid:**
Before adding the safety section to AboutPage, extract credential data into a single shared constants file (`src/data/credentials.ts`). Export typed objects for: EMR value, OSHA record, bonding capacity, license number, SBE cert number, DIR status. Import into all existing components. Then the new safety section references the same source. This is a prerequisite step, not a "nice to have."

**Warning signs:**
- You find yourself writing `0.87` or `Zero OSHA` as a string literal in a new component
- The new safety section has a different EMR value than `StatsSection.tsx`
- PR review catches a number that exists in 3 different component files

**Phase to address:**
Phase 1 (Safety Credentials Section on About) — must be the first task in that phase, before any new markup is written.

---

### Pitfall 2: CTA Simplification That Breaks the Formspree Integration

**What goes wrong:**
The current `ContactForm.tsx` submits to a real Formspree endpoint (`https://formspree.io/f/mreayoqq`). The v1.1 goal is to add two distinct CTA paths — "Request Prequal Package" (commercial) and "Request a Quote" (residential) — that tag the submission automatically. The pitfall is adding a `requestType` hidden field to the form to auto-tag submissions, but the Formspree dashboard wasn't configured to route on that field. Submissions come in without differentiation, defeating the purpose. Alternatively, the two-path UI gets built as two separate routes/forms, which creates a routing change, two Formspree endpoints, and double the maintenance surface.

**Why it happens:**
The path of least resistance is "add a hidden field." But a hidden field that Formspree ignores for routing is invisible in the inbox and looks identical to all other submissions. Developers test the happy path (form submits successfully) without checking whether the tagging actually works.

**How to avoid:**
Keep one form, one endpoint. Add a visible or hidden `requestType` field (pre-set based on which CTA the user clicked, passed via URL param `?type=commercial` or `?type=residential`, or via a React state prop). Confirm Formspree's subject line templating or custom data field (`_subject` field) is used to surface the type in email notifications. Test both paths end-to-end by submitting and checking the Formspree inbox, not just checking for the green success state in the UI.

**Warning signs:**
- The form success state shows but there's no plan to verify the Formspree inbox differentiation
- Two separate `<form>` elements are being planned for the same page
- The `requestType` field value is hardcoded to one value regardless of which button was clicked

**Phase to address:**
Phase 3 (CTA Simplification) — include a verification step that confirms both submission types appear correctly labeled in the Formspree dashboard before marking done.

---

### Pitfall 3: Mock Safety Content Left in Production Without Owner Review Gate

**What goes wrong:**
PROJECT.md explicitly marks the safety section as "mock content for owner review." The pitfall is shipping mock/placeholder safety content — fabricated OSHA training protocols, made-up incident prevention language, invented safety program details — live to production without the owner's sign-off. For a commercial glazing contractor, safety program claims are material representations used by GCs in their prequalification decisions. Inaccurate mock content published even briefly creates legal and credibility exposure.

**Why it happens:**
The development workflow treats "deployed to production" as "done," without a distinct owner-review gate between "implemented" and "shipped." Because the rest of the site is also placeholder content (Unsplash photos, etc.), mock safety copy feels equivalent to a placeholder image. It is not equivalent — a placeholder image is visually obvious, but placeholder safety copy reads as factual claim.

**How to avoid:**
The safety section on AboutPage should be built with a deliberate visual review-state: either (a) a `[MOCK — NEEDS OWNER REVIEW]` banner visible only in dev (controlled by `import.meta.env.DEV`), or (b) clearly labeled with bracketed placeholder text that is obviously not real (e.g., `[INSERT: EMR history context from owner]`). The phase completion criteria must include "owner has reviewed and approved safety section copy" as a gating condition before the page ships to production.

**Warning signs:**
- Safety section copy is written as confident factual prose with no review gate in the phase plan
- A phase is marked "done" when the component renders without checking owner sign-off
- The safety section uses the same Unsplash image workflow assumption as photos (owner will fix it later)

**Phase to address:**
Phase 1 (Safety Credentials Section on About) — verification criteria must include owner sign-off on copy, not just visual QA.

---

### Pitfall 4: Sitewide Prevailing Wage Banner Interfering With FloatingCTA Z-Index Stack

**What goes wrong:**
The site already has `FloatingCTA.tsx` at `z-40` in the stacking context — a fixed bottom bar that appears after 500px scroll. If the prevailing wage badge/banner is implemented as a fixed or sticky element (e.g., a sticky top banner below the navbar, or a fixed side badge), it will collide with the existing z-index stack. The most likely conflict: a sticky top banner gets `z-50` (above `Navbar` which is also fixed), causing the navbar to appear underneath the banner on scroll, or the banner disappears under the navbar.

**Why it happens:**
The existing z-index values are not documented anywhere in the codebase. New elements get arbitrary z-index values. Tailwind's z-index scale (`z-10`, `z-20`, `z-30`, `z-40`, `z-50`) looks clean but there are only 5 increments for the whole app. Adding a fixed/sticky element without auditing the existing stack causes collisions.

**How to avoid:**
Implement the prevailing wage callout as an inline section element (not fixed/sticky), rendering within the normal document flow on homepage and About page. This avoids the z-index problem entirely. If a fixed/sticky approach is required, audit first: Navbar appears to be fixed (check `Navbar.tsx`), FloatingCTA is `z-40`. Any new fixed element needs to fit into the documented stack. Add a comment in the new component documenting the z-index value chosen and why.

**Warning signs:**
- Reaching for `position: fixed` or `position: sticky` for the prevailing wage badge
- The badge "disappears" under the navbar when scrolling
- FloatingCTA appears behind the new element on mobile

**Phase to address:**
Phase 2 (Prevailing Wage Badge/Banner) — check Navbar z-index before choosing placement strategy.

---

### Pitfall 5: Expanded Service Cards Breaking the 4-Column Grid Layout

**What goes wrong:**
`HomePage.tsx` renders 8 services in a `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` grid via `ServiceCard`. Expanding service cards to include technical detail (bullet specs, sub-features, capability callouts) will create cards with varying heights. The current `ServiceCard` uses `h-full flex flex-col` which handles equal-height columns correctly — but only when card content lengths are comparable. If one card (e.g., Curtain Walls with 4 technical specs) is twice as tall as another (e.g., Mirrors with 1 spec), the grid looks broken on tablet breakpoints where 2 columns are used.

**Why it happens:**
Technical content is not uniform across services. Curtain walls and storefronts have much more to say than mirrors and shower enclosures. When mock content is added uniformly ("each card gets 3 bullet points") during development, the grid looks fine. When real content is edited to reflect actual technical depth, cards diverge in length.

**How to avoid:**
Define a strict content schema per service card before writing content: exactly one description paragraph (max 2 sentences), exactly 3 capability bullets (no more, no less), one optional "best for" tag. Enforce this in the data array structure in `HomePage.tsx` using TypeScript: `bullets: readonly [string, string, string]`. This bounds card height variance at authoring time rather than trying to fix layout after content is written.

**Warning signs:**
- Some service cards have 2 bullets, others have 5
- The "Available" hover indicator on `ServiceCard` gets pushed down unevenly
- Grid looks good at 1440px but broken at iPad (768px) viewport

**Phase to address:**
Phase 2 or Phase 3 (Service Section Expansion) — define the data schema with TypeScript constraints before writing any content.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Duplicate credential values in each new component | Faster to write | Owner must find and update 8+ locations when EMR changes | Never — extract to `src/data/credentials.ts` first |
| Use `prose` class on safety copy block | Inherits sensible paragraph spacing instantly | `prose` overrides Tailwind color utilities, breaking `text-brand` inline | Only with reset: `prose prose-slate` and test all inline colors |
| Add `requestType` as a hidden form field without testing routing | Two-path UX works visually | Formspree doesn't differentiate submissions; GC vs residential signals lost | Never — test the full inbox round-trip before shipping |
| Wrap prevailing wage badge in `position: sticky` | Badge follows user down the page | Collides with existing z-index stack (Navbar, FloatingCTA) | Only after full z-index audit and documentation |
| Write safety copy as confident final prose during development | Saves a revision pass | Mock safety claims go live if review gate isn't enforced | Never without owner sign-off gate in phase criteria |
| Add safety section to `AboutPage.tsx` inline without a new component | Fewer files | AboutPage already imports 6+ components; another 50-line inline block adds cognitive load | Acceptable only if the section is 10 lines or fewer |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Formspree (existing, live) | Adding a hidden `requestType` field without confirming the field name appears in Formspree email templates | Use Formspree's `_subject` field (or custom data) and verify by submitting a test from both CTA paths and reading the actual inbox email |
| Formspree (existing, live) | Adding a second `<form>` element targeting a second endpoint for the residential path | One form, one endpoint, one `requestType` field — simpler and avoids managing two submission configs |
| CSLB verify link (existing in CertificationsBadges, ContactPage) | Adding a new link to safety section without reusing the existing `CSLB_LOOKUP_URL` constant | The constant is defined per-file (duplicate in two files already); extract to `src/data/credentials.ts` |
| Unsplash placeholder images | Picking a new Unsplash image for the safety section that is obviously generic (stock photo of hard hat) | Flag in code comment that owner should supply real safety program photo; use the most contextually relevant available Unsplash image as temporary placeholder |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Adding heavy CSS animations to safety credential badges (keyframe pulse, shimmer) | Fine on desktop; janky on mobile/low-end devices | Use Tailwind's `animate-ping` sparingly (already used in StatsSection); avoid additional keyframe animations on credential badges | Any mid-range Android device visiting the page |
| Adding `useEffect` scroll listeners to a prevailing wage sticky banner | Works fine; adds a third scroll listener to the app (alongside HomePage parallax and FloatingCTA) | If scroll-based behavior is needed, use CSS `position: sticky` instead of JS scroll tracking | Not a hard break, but compounds scroll jank on mobile |
| Expanding service data array in `HomePage.tsx` with deeply nested objects | TypeScript compiles fine; renders fine | Increases bundle size and time-to-interactive for a static marketing page | Negligible at current scale, but avoid unnecessary nesting |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing Formspree endpoint ID (`mreayoqq`) in client-side code | Already exposed (current state); spam bots can POST directly to the endpoint | Formspree's honeypot field (`_gotcha`, already implemented in `ContactForm.tsx`) is sufficient mitigation for this site's scale |
| Adding a `requestType` URL param (`?type=commercial`) that gets read and injected into form state without sanitization | XSS if the param value is written as raw HTML | Read the param with `URLSearchParams`, use it only to set a controlled enum value (`'commercial' | 'residential'`), never inject raw param string into DOM |
| Linking to external credential verification sites (CSLB, DIR) without `rel="noopener noreferrer"` | Opener access from linked page | All external links must have `target="_blank" rel="noopener noreferrer"` — already correctly done in existing CSLB link; replicate this pattern in any new credential verification links |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Two-path CTA that sends residential users to the commercial-focused contact form without adjusting form context | Residential visitors see "Request Prequalification Packet" heading and GC-focused fields (project type, bid date) — feels wrong and reduces conversions | Detect `requestType` and conditionally update the form heading, description, and field defaults. The page heading "Request Prequalification Packet" should become "Request a Quote" for residential path |
| Safety credential section that lists raw numbers (EMR: 0.87, OSHA: 0) without explaining what those numbers mean to a GC | GCs who don't know EMR benchmarks miss the signal. Industry average is ~1.0; 0.87 is notably good | Add brief explanatory context: "0.87 EMR (industry average: 1.0)" |
| Prevailing wage badge that only says "DIR Registered" without naming specific experience types | GC vetting a LAUSD bid can't tell if CGI has LAUSD-specific prevailing wage history | Badge or callout should name the categories: PLA, Davis-Bacon, LAUSD, State Prevailing Wage — all confirmed owner facts |
| Sitewide prevailing wage banner on every page including Residential | Residential visitors see commercial compliance language that doesn't apply to their context | Limit prevailing wage callout to commercial-facing pages: HomePage, AboutPage. Not ResidentialPage |
| Expanding service card descriptions with technical jargon ("stick-built vs unitized curtain wall") without any plain-language anchor | General contractors know these terms; the GC's client (building owner) or a residential visitor doesn't | Lead with plain-language benefit, follow with technical term in parentheses: "Floor-to-ceiling glass systems (stick-built and unitized curtain wall)" |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Safety credential section:** Renders correctly in browser — verify owner has reviewed and approved the copy before considering the phase done
- [ ] **Prevailing wage banner:** Appears on homepage — verify it does NOT appear on ResidentialPage; verify it does not obscure the Navbar on scroll
- [ ] **Two-path CTA:** Both buttons route to `/contact` — verify the `requestType` value is correctly pre-set in the form on arrival, and verify Formspree inbox shows the differentiation
- [ ] **Expanded service cards:** All 8 cards render in the grid — verify grid is not broken at 768px (iPad) breakpoint with the new content lengths
- [ ] **New credential data:** The new safety section shows correct EMR/OSHA values — verify the same values in `StatsSection.tsx`, `CertificationsBadges.tsx`, `GCResourcesSection.tsx`, and `ContactPage.tsx` trustBadges array all match
- [ ] **Contact form heading:** Still reads correctly after CTA simplification — verify the heading changes contextually for residential vs commercial path (not just the button label)
- [ ] **FloatingCTA:** Still appears correctly on homepage — verify a new fixed/sticky prevailing wage element hasn't shifted or hidden the FloatingCTA at bottom of viewport

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Credential data duplicated across 8 files with stale value shipped | MEDIUM | Grep for all literal instances of the stale value (`0.87`, `Zero OSHA`, etc.); update each; extract to constants file to prevent recurrence |
| Mock safety copy shipped to production | HIGH | Revert the safety section content to a clearly non-published state (remove the section or replace with "Coming Soon" placeholder); do not attempt to fix in-place while live; restore after owner review |
| Formspree not differentiating commercial/residential submissions | LOW | Add `_subject` field override to form using Formspree's templating; test both paths; no structural change required |
| Prevailing wage banner breaking z-index stack | LOW-MEDIUM | Change from `position: fixed/sticky` to inline section element; z-index conflicts resolve immediately |
| Service card grid broken at tablet breakpoint | LOW | Audit content lengths in the data array; trim bullet count to uniform 3 per card; re-test at 768px |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Credential data scatter (no single source of truth) | Phase 1 — extract `credentials.ts` before adding any new credential UI | `grep -r "0.87" src/` returns only the constants file import, not literal strings |
| Mock safety content shipped without owner review | Phase 1 — gating criterion: owner sign-off required before phase closes | Phase completion checklist includes owner approval checkbox |
| Prevailing wage banner z-index collision | Phase 2 — audit Navbar z-index before choosing banner implementation | Scroll to top of homepage; navbar is visible above banner; scroll down; FloatingCTA appears above banner |
| Service card grid breaking at tablet | Phase 2 or 3 — enforce uniform content schema via TypeScript type | `npm run build` passes with typed service data; manual review at 768px breakpoint |
| CTA form not differentiating submissions | Phase 3 — end-to-end Formspree test is required verification step | Submit from commercial path, submit from residential path; check Formspree inbox shows two distinctly labeled entries |
| Two-path CTA not updating form context for residential | Phase 3 — form heading and field defaults adapt to `requestType` | Load `/contact?type=residential`; form heading reads "Request a Quote" not "Request Prequalification Packet" |

---

## Sources

- Direct codebase inspection: `src/pages/AboutPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/HomePage.tsx`, `src/components/ContactForm.tsx`, `src/components/CertificationsBadges.tsx`, `src/components/GCResourcesSection.tsx`, `src/components/StatsSection.tsx`, `src/components/FloatingCTA.tsx`, `src/components/ServiceCard.tsx`
- Project context: `.planning/PROJECT.md` (v1.1 milestone requirements)
- Project memory: `MEMORY.md` (owner-confirmed facts, content rules)
- Project instructions: `CLAUDE.md` (architecture constraints, data inline pattern)
- Formspree documentation (honeypot field `_gotcha`, `_subject` templating): https://help.formspree.io/hc/en-us/articles/360013580813
- Tailwind CSS z-index scale: https://tailwindcss.com/docs/z-index

---

*Pitfalls research for: Adding safety credentials, prevailing wage callouts, expanded service sections, and CTA simplification to ClearSite (Clean Glass Installation marketing site)*
*Researched: 2026-03-05*
