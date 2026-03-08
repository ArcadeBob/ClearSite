---
phase: quick-3
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/ProjectCard.tsx
  - src/pages/ProjectsPage.tsx
autonomous: true
requirements: [QUICK-3]

must_haves:
  truths:
    - "Clicking a project card flips it to reveal a detailed back panel"
    - "Clicking the back panel (or a close/flip-back button) flips the card back to front"
    - "The back panel shows GC-relevant details: scope description, glazing systems, value, GC partner, and project highlights"
    - "The flip animation is smooth 3D CSS transform (not a page navigation)"
    - "Cards that have a case study link still show that link below the card"
    - "The card grid layout and filter functionality remain intact"
  artifacts:
    - path: "src/components/ProjectCard.tsx"
      provides: "Flippable project card with front/back panels"
      min_lines: 80
    - path: "src/pages/ProjectsPage.tsx"
      provides: "Extended project data with GC-relevant detail fields"
  key_links:
    - from: "src/pages/ProjectsPage.tsx"
      to: "src/components/ProjectCard.tsx"
      via: "props with extended project data"
      pattern: "ProjectCard.*description|systems|highlights"
---

<objective>
Add a card flip interaction to the ProjectsPage project cards. Clicking a card flips it with a 3D CSS transform to reveal a back panel with GC-relevant project details (scope description, glazing systems installed, project value, GC partner, key highlights). Replaces the current "View Details" hover overlay with a click-to-flip interaction.

Purpose: Give general contractors quick access to project details without navigating to a separate page, making the portfolio more interactive and informative.
Output: Updated ProjectCard component with flip behavior, extended project data in ProjectsPage.
</objective>

<execution_context>
@C:/Users/relmq/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/relmq/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/components/ProjectCard.tsx
@src/pages/ProjectsPage.tsx

<interfaces>
<!-- Current ProjectCard props interface -->
From src/components/ProjectCard.tsx:
```typescript
interface ProjectCardProps {
  title: string;
  location: string;
  client: string;
  value: string;
  scope: string;
  imageUrl?: string;
}
```

<!-- Current project data shape in ProjectsPage.tsx (inline array, lines 11-164) -->
Each project object has: title, location, client, value, scope, status, imageUrl

<!-- Case study slug mapping (line 7-9) — only Cabrillo Business Park has a case study -->
const caseStudySlugs: Record<string, string> = {
  'Cabrillo Business Park': 'cabrillo-business-park',
};

<!-- The card is rendered in a grid (line 203-216), with optional case study link below -->
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Extend project data model and add GC-relevant detail fields</name>
  <files>src/pages/ProjectsPage.tsx</files>
  <action>
Extend the project data objects in ProjectsPage.tsx with new fields for the card back panel. Add these fields to every project in the `projects` array:

1. Add a `description` field (1-2 sentences describing the project for a GC audience — what was built, building type, notable aspects)
2. Add a `systems` field (string array of specific glazing systems, e.g. ["Kawneer CW System", "Oldcastle Storefront"] — use plausible manufacturer-specific system names based on the scope)
3. Add a `highlights` field (string array of 2-3 GC-relevant bullet points per project, e.g. "Coordinated with 12 trades", "Coastal wind-load engineering", "Zero safety incidents")
4. Add a `duration` field (string like "8 months" — estimate plausibly based on project value: under $200K = "3-4 months", $200K-$500K = "5-7 months", $500K-$1M = "6-9 months", over $1M = "8-12 months")
5. Add a `sqft` field (string like "45,000 SF" — estimate plausibly based on value and scope)

Update the ProjectCardProps-compatible type by adding an `extended` optional prop or by adding the new fields directly. Since ProjectCard is only used in ProjectsPage and CaseStudyPage's relatedProjects, keep backward compat by making new fields optional.

IMPORTANT: Do NOT include GC contact info (emails/phones). The `client` field already exists and is fine (it's the building owner, not the GC's contact info). Do NOT add any testimonial/quote content.
  </action>
  <verify>
    <automated>cd C:/Users/relmq/projects/clearsite && npx tsc --noEmit 2>&1 | head -20</automated>
  </verify>
  <done>All 16 projects have description, systems, highlights, duration, and sqft fields with plausible GC-audience data. TypeScript compiles without errors.</done>
</task>

<task type="auto">
  <name>Task 2: Implement 3D card flip interaction with detailed back panel</name>
  <files>src/components/ProjectCard.tsx</files>
  <action>
Rewrite ProjectCard.tsx to support a click-to-flip 3D card interaction. The component structure:

**Props:** Extend ProjectCardProps to accept the new optional fields: `description?: string`, `systems?: string[]`, `highlights?: string[]`, `duration?: string`, `sqft?: string`. Keep `status` as an optional prop too (it's passed from ProjectsPage but not currently in the interface).

**State:** Replace `isHovered` with `isFlipped` (boolean, toggled on click). Keep hover styling but remove the "View Details" overlay text — the click-to-flip replaces that interaction.

**CSS 3D flip technique (pure Tailwind + inline styles):**
- Outer wrapper: `perspective: 1000px` (already exists), fixed height (e.g. `h-[420px]`), `cursor-pointer`
- Inner container: `transform-style: preserve-3d`, `transition: transform 0.6s`, rotates `rotateY(180deg)` when flipped
- Front face: `backface-visibility: hidden`, contains the current card front (image + content)
- Back face: `backface-visibility: hidden`, `rotateY(180deg)` base transform, contains detail panel

**Front face (keep existing design mostly intact):**
- Keep image, title, location, client/value/scope rows, status badge, bottom accent line
- Remove the hover overlay with "View Details" text (replaced by flip)
- Keep the subtle hover lift/shadow effect
- Add a small visual hint that the card is clickable (e.g. a subtle "Tap for details" or a flip icon in the corner on hover)

**Back face (new — navy/brand themed):**
- Background: `bg-brand` with white text for contrast (matches site brand)
- Header: Project title + location (smaller, top of card)
- Content grid with icons (use lucide-react icons already imported + add any needed):
  - Value (DollarSign icon) — show the `value`
  - Duration (Clock icon) — show `duration`
  - Area (Maximize2 or Square icon) — show `sqft`
  - GC Partner (Building2 icon) — show `client` (this is the GC)
- Description paragraph (2-3 lines, `text-sm text-white/80`)
- Glazing Systems section: render `systems` array as small pills/tags (`bg-white/10 text-white/90 text-xs px-2 py-1 rounded`)
- Highlights section: render `highlights` as a compact list with CheckCircle icons
- Bottom: a "Flip Back" link/button (RotateCcw icon from lucide-react) so user can return to front

**Accessibility:**
- Add `role="button"` and `tabIndex={0}` to the outer wrapper
- Handle `onKeyDown` for Enter/Space to toggle flip
- Add `aria-label` like "View details for {title}"

**Edge cases:**
- If no extended data provided (e.g. relatedProjects in CaseStudyPage), back face shows just title/location/value/scope/client (the original fields) — gracefully degrade
- Prevent the card click from bubbling to the case study Link below it (use `e.stopPropagation()` is NOT needed since the Link is outside the card div in ProjectsPage)

Do NOT use any external animation libraries — pure CSS transitions only.
  </action>
  <verify>
    <automated>cd C:/Users/relmq/projects/clearsite && npx tsc --noEmit && npm run build 2>&1 | tail -5</automated>
  </verify>
  <done>Clicking any project card triggers a smooth 3D flip animation revealing a back panel with project details. Clicking "Flip Back" or the back panel returns to front. Cards without extended data show basic info on back. Build succeeds with no errors.</done>
</task>

</tasks>

<verification>
1. `npm run build` completes without errors
2. `npm run dev` — visit /projects page, click a card, see it flip to back panel with details, click flip-back to return
3. Filter buttons still work correctly
4. Case study link for Cabrillo Business Park still appears below its card
5. Cards are keyboard accessible (Tab to card, Enter to flip)
6. Back panel shows: value, duration, sqft, GC partner, description, glazing systems, highlights
</verification>

<success_criteria>
- All 16 project cards flip on click with smooth 3D CSS animation
- Back panel displays GC-relevant project details (description, systems, highlights, duration, sqft)
- Cards flip back via back-panel button
- No navigation changes — case study links remain functional below cards
- Build passes, no TypeScript errors
</success_criteria>

<output>
After completion, create `.planning/quick/3-project-card-flip-interaction-with-detai/3-SUMMARY.md`
</output>
