---
phase: quick-2
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/GCPainPoints.tsx
  - src/pages/HomePage.tsx
  - src/components/SafetySection.tsx
  - src/components/SectionHeader.tsx
  - src/components/ContactForm.tsx
autonomous: true
requirements: [SITE-REVIEW-FIXES]
must_haves:
  truths:
    - "GC Pain Points card says 'Minimal Punch-List' not 'Zero Punch-List'"
    - "No draft banners appear in production build"
    - "Safety section text uses proper em-dashes not double hyphens"
    - "GCPainPoints heading has no ghost/watermark text behind it"
    - "Privacy policy text in contact form does not link to a nonexistent page"
  artifacts:
    - path: "src/components/GCPainPoints.tsx"
      provides: "Corrected punch-list wording and no overlapping variant"
    - path: "src/components/SafetySection.tsx"
      provides: "Em-dashes replacing double hyphens"
    - path: "src/components/ContactForm.tsx"
      provides: "Privacy text without dead link"
  key_links: []
---

<objective>
Fix five issues found during site review: wrong punch-list wording, draft banners visible in prod, double hyphens instead of em-dashes, ghost text behind heading, and a privacy policy link to nowhere.

Purpose: Clean up content and display issues before the site goes live.
Output: Five fixes across five files.
</objective>

<execution_context>
@C:/Users/relmq/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/relmq/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/components/GCPainPoints.tsx
@src/pages/HomePage.tsx
@src/components/SafetySection.tsx
@src/components/SectionHeader.tsx
@src/components/ContactForm.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix punch-list wording and ghost text</name>
  <files>src/components/GCPainPoints.tsx, src/components/SectionHeader.tsx</files>
  <action>
  In GCPainPoints.tsx, update the pain point at index 4 (the ClipboardCheck one):
  - Line 49: Change `solution` from `'Zero Punch-List Goal'` to `'Minimal Punch-List Goal'`
  - Line 51: Change `description` from `'Our QA process catches issues before you do. We aim for zero punch items at turnover.'` to `'Our QA process catches issues before you do. We aim for minimal punch items at turnover.'`
  - Line 52: Change `metric` from `'Near-zero punch lists'` to `'Minimal punch lists'`

  For the ghost/watermark text issue: The `SectionHeader` component's `variant="overlapping"` renders a large faded duplicate title (text-brand/10, text-5xl/7xl) behind the real heading. This is used on GCPainPoints (line 69), AboutPage (line 331), and CaseStudyPage (line 401).

  In SectionHeader.tsx, remove the overlapping variant entirely. Replace the `if (variant === 'overlapping')` block (lines 49-70) so it falls through to the default left-bar variant instead. Specifically:
  - Delete the entire `if (variant === 'overlapping') { ... }` block (lines 49-70)
  - Keep the type definition as-is (removing it would cause TS errors at call sites), or better: remove `'overlapping'` from the `SectionHeaderVariant` type union on line 3
  - Update the 3 call sites to remove `variant="overlapping"`:
    - GCPainPoints.tsx line 69
    - But do NOT touch AboutPage.tsx or CaseStudyPage.tsx in this task -- those are separate files

  Actually, simpler approach: just modify the overlapping variant in SectionHeader.tsx to NOT render the ghost text. Keep the variant name so call sites don't break. Change lines 49-70 to render identically to the left-bar variant (just delegate). Replace the overlapping block body with:
  ```
  if (variant === 'overlapping') {
    return (
      <div className={`border-l-4 border-accent pl-6 ${className}`}>
        <p className={`text-sm font-semibold ${subheadingColor} uppercase tracking-wider mb-2`}>
          {subheading}
        </p>
        <h2 className={`font-heading text-brand uppercase tracking-wide ${sizeClasses}`}>
          {title}
        </h2>
        {description && (
          <p className="text-lg text-slate-600 max-w-2xl mt-4">
            {description}
          </p>
        )}
      </div>
    );
  }
  ```
  This removes the ghost text from all 3 call sites without touching them.
  </action>
  <verify>
    <automated>npm run build 2>&1 | tail -5</automated>
  </verify>
  <done>
  - Pain point card says "Minimal Punch-List Goal" with matching description and metric
  - No ghost/watermark text rendered behind any heading using the overlapping variant
  - Build succeeds with no errors
  </done>
</task>

<task type="auto">
  <name>Task 2: Remove draft banners, fix em-dashes, fix privacy text</name>
  <files>src/pages/HomePage.tsx, src/components/SafetySection.tsx, src/components/ContactForm.tsx</files>
  <action>
  **Draft banners:** These are already gated behind `import.meta.env.DEV` so they only show in dev mode, NOT in production builds. However, the user says they are visible on the live site, which suggests either the site is being served via `npm run dev` or something else is wrong. Regardless, the banners are draft markers that should be removed now.

  In HomePage.tsx: Remove the entire DEV-gated banner block (lines 404-412). This is the `{import.meta.env.DEV && ( ... )}` wrapping the amber draft warning div. Also remove the `AlertTriangle` import if it becomes unused (check other usages in the file first).

  In SafetySection.tsx: Remove the entire DEV-gated banner block (lines 38-48). This is the `{import.meta.env.DEV && ( ... )}` wrapping the amber draft warning div. The `AlertTriangle` import on line 2 can be removed since it is only used in the banner.

  **Em-dashes in SafetySection.tsx:** Replace all double hyphens ` -- ` with proper em-dashes ` \u2014 ` (the character, not the escape) in the safety narrative text:
  - Line 84: `"corrective action -- ensuring"` -> `"corrective action \u2014 ensuring"`
  - Line 98: `"of 0.87 -- 13%"` -> `"of 0.87 \u2014 13%"`
  - Line 98: `"industry average -- and"` -> `"industry average \u2014 and"`

  **Privacy policy in ContactForm.tsx:** Line 240 says "you agree to our privacy policy" as plain text (no link). There is no privacy policy page in the app routes. Since it is already plain text (not a link), just rephrase to remove the implied promise of a policy page. Change line 240 to:
  `By submitting this form, you consent to CGI contacting you about your inquiry. We typically`
  This removes the reference to a nonexistent privacy policy while keeping the consent language.
  </action>
  <verify>
    <automated>npm run build 2>&1 | tail -5</automated>
  </verify>
  <done>
  - No draft/review banners in HomePage or SafetySection (neither dev nor prod)
  - SafetySection uses proper em-dash characters, no double hyphens remain
  - ContactForm consent text does not reference a privacy policy
  - Build succeeds
  </done>
</task>

</tasks>

<verification>
- `npm run build` succeeds
- `grep -r "Zero Punch" src/` returns no matches
- `grep -r "Draft.*pending" src/` returns no matches
- `grep -r " -- " src/components/SafetySection.tsx` returns no matches
- `grep -r "privacy policy" src/` returns no matches
- No ghost text div with `text-brand/10` and `aria-hidden` in SectionHeader.tsx overlapping variant
</verification>

<success_criteria>
All five site review issues resolved: punch-list wording corrected per content rules, draft banners removed, double hyphens replaced with em-dashes, ghost watermark text eliminated, privacy policy reference removed from contact form.
</success_criteria>

<output>
After completion, create `.planning/quick/2-site-review-fixes-zero-punch-list-wordin/2-SUMMARY.md`
</output>
