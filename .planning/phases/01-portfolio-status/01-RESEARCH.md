# Phase 1: Portfolio Status - Research

**Researched:** 2026-03-02
**Domain:** Static data mutation in a React/TypeScript page component
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PORT-01 | All projects with "Current" status changed to "Completed" status | Exact projects identified: Citrus Commons, 9900 Venice, 4750 Santa Monica, Jordan Downs S4 — all have `status: 'Current' as const` in the `projects` array in `ProjectsPage.tsx`. |
| PORT-02 | All projects with "Future" status changed to "Current" status | Exact projects identified: Via Avanti, Wilshire Lofts, 1st Street North — all have `status: 'Future' as const` in the same array. |
</phase_requirements>

---

## Summary

Phase 1 is a pure data-change task with no new libraries, no architectural decisions, and no ambiguity about where the data lives. All 17 projects are defined as a single inline array called `projects` at the top of `src/pages/ProjectsPage.tsx` (lines 11–164). Status values are TypeScript `as const` string literals typed as `'Completed' | 'Current' | 'Future'`.

PORT-01 requires changing 4 project entries from `'Current'` to `'Completed'`. PORT-02 requires changing 3 project entries from `'Future'` to `'Current'`. After both changes, the projects array will contain only `'Completed'` and `'Current'` entries — no `'Future'` entries remain.

The filter UI (`ProjectsPage.tsx` lines 167–198) is driven entirely by the `status` field of each project object: it filters with `projects.filter((p) => p.status === filter)`. No separate filter configuration or data source exists. Updating the status strings automatically corrects filter behavior — the filter tabs themselves do not need to change.

**Primary recommendation:** Edit `src/pages/ProjectsPage.tsx` — change 7 status values (4 `'Current'` → `'Completed'`, 3 `'Future'` → `'Current'`). Nothing else needs to change.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React 18 | 18.x | Component rendering | Already in use |
| TypeScript | (Vite default) | Type safety on status union | Already in use |

No additional libraries are needed. This is a plain string-value edit.

### Supporting
None required.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline edit of `as const` strings | Extracting to a separate data file | Out of scope — data layer is intentionally hardcoded per CLAUDE.md; do not refactor |

**Installation:** None required.

---

## Architecture Patterns

### Recommended Project Structure

No structural change. All work is inside one existing file:

```
src/
└── pages/
    └── ProjectsPage.tsx   ← only file that changes
```

### Pattern 1: Inline Data Mutation

**What:** The `projects` array is a module-level constant defined directly in `ProjectsPage.tsx`. Each entry has a `status` field typed via a TypeScript union. Changing the string literal value and keeping `as const` is the correct, idiomatic edit.

**When to use:** Always — this is the only pattern in the codebase for project data.

**Example — before (Current → Completed):**
```typescript
// ProjectsPage.tsx line 18 (Citrus Commons)
status: 'Current' as const,
```
**After:**
```typescript
status: 'Completed' as const,
```

**Example — before (Future → Current):**
```typescript
// ProjectsPage.tsx line 36 (Via Avanti)
status: 'Future' as const,
```
**After:**
```typescript
status: 'Current' as const,
```

### Pattern 2: Filter Tab Behavior

The filter state and tab rendering in `ProjectsPage.tsx` (lines 167–198) use the literal strings `'All' | 'Completed' | 'Current' | 'Future'` both as the filter union type and as the button labels. After the data changes, the `'Future'` filter tab will still render but will return zero results (triggering the "No projects found" empty state). This is acceptable behavior — the tab is wired to the status field and will simply show nothing.

If the `'Future'` filter tab should be removed entirely, that is a separate, out-of-scope decision not covered by PORT-01 or PORT-02. The success criteria only require that no project *displays* "Current" or "Future" status — they do not require removing the filter tab.

### Anti-Patterns to Avoid

- **Changing the TypeScript union type in `ProjectCard.tsx`:** The `status` prop type `'Completed' | 'Current' | 'Future'` should remain untouched. The union still accurately describes legal values regardless of which values appear in the current dataset.
- **Moving data to a separate file:** CLAUDE.md explicitly states data is hardcoded inline — do not introduce a data layer.
- **Using a find-and-replace across the whole repo:** Only `ProjectsPage.tsx` contains project status data. Do not search-replace across components.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Status mapping | A transform function or enum | Direct string literal edit | Zero complexity — 7 values, one file |

**Key insight:** There is no problem to solve beyond editing 7 string values. No utility function, no migration script, no data file is needed.

---

## Common Pitfalls

### Pitfall 1: Incomplete Audit — Missing Projects

**What goes wrong:** Developer changes only the first visible `'Current'` project and misses others.
**Why it happens:** The array is long (17 entries); status values are scattered across lines 11–164.
**How to avoid:** Work from the verified list below. Cross-check by grepping `status: 'Current'` and `status: 'Future'` after edits — both should return 0 matches.
**Warning signs:** Grep still returns hits for `'Current' as const` or `'Future' as const` after editing.

### Pitfall 2: Breaking the TypeScript Type

**What goes wrong:** Accidentally writing `'Complete'` (typo) instead of `'Completed'`.
**Why it happens:** String literal typos with `as const`.
**How to avoid:** TypeScript will immediately flag the type error since `ProjectCard.tsx` accepts only `'Completed' | 'Current' | 'Future'`. Run `npm run lint` or the dev server to catch instantly.
**Warning signs:** TypeScript error on `status` prop in `ProjectCard`.

### Pitfall 3: Editing the Wrong File

**What goes wrong:** Editing `ProjectCard.tsx` (the component) instead of `ProjectsPage.tsx` (the data).
**Why it happens:** Confusion about where data vs. rendering lives.
**How to avoid:** Data is in `ProjectsPage.tsx`. `ProjectCard.tsx` is the display component — it must not change for this phase.
**Warning signs:** `ProjectCard.tsx` shows up in a diff.

---

## Code Examples

### Verified Current State — Projects Needing Changes

**PORT-01: Change these 4 from `'Current'` → `'Completed'`**

| Project | Line in ProjectsPage.tsx |
|---------|--------------------------|
| Citrus Commons | 18 |
| 9900 Venice | 27 |
| 4750 Santa Monica | 135 |
| Jordan Downs S4 | 144 |

**PORT-02: Change these 3 from `'Future'` → `'Current'`**

| Project | Line in ProjectsPage.tsx |
|---------|--------------------------|
| Via Avanti | 36 |
| Wilshire Lofts | 153 |
| 1st Street North | 162 |

### Post-Edit Verification Commands

```bash
# Both of these should return 0 matches after edits
grep "status: 'Current' as const" src/pages/ProjectsPage.tsx
grep "status: 'Future' as const" src/pages/ProjectsPage.tsx
```

### Filter Tab Side-Effect (no action needed)

After edits, `'Future' Projects` filter tab will return 0 results. That is correct behavior given no `Future` projects remain. No code change needed for the filter.

---

## State of the Art

This phase involves no library or framework evolution — it is a data-only edit. No state-of-the-art considerations apply.

---

## Open Questions

1. **Should the `'Future'` filter tab be hidden when no Future projects exist?**
   - What we know: PORT-01 and PORT-02 success criteria only require projects to *display* the correct status. They do not mention the filter tab.
   - What's unclear: Owner's preference on the orphaned filter tab.
   - Recommendation: Leave the filter tab as-is. An empty filter state already has a graceful "No projects found" UI. Removing the tab is out of scope per the requirements.

---

## Validation Architecture

> `workflow.nyquist_validation` is not present in `.planning/config.json` — skipping this section.

---

## Sources

### Primary (HIGH confidence)

- Direct read of `src/pages/ProjectsPage.tsx` — full projects array (lines 11–164) and filter logic (lines 167–198). All project names, current status values, and line numbers verified by file read.
- Direct read of `src/components/ProjectCard.tsx` — TypeScript prop type `status?: 'Completed' | 'Current' | 'Future'`, `statusColors` map, and badge rendering logic confirmed.
- Direct read of `.planning/REQUIREMENTS.md` — PORT-01 and PORT-02 requirements confirmed.
- Direct read of `.planning/config.json` — `nyquist_validation` key absent; validation section skipped.

### Secondary (MEDIUM confidence)

- None required — all findings come from direct source inspection.

### Tertiary (LOW confidence)

- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; existing codebase read directly
- Architecture: HIGH — single file, single data array, no indirection
- Pitfalls: HIGH — derived from direct code inspection, not speculation

**Research date:** 2026-03-02
**Valid until:** Stable indefinitely — data only changes if `ProjectsPage.tsx` is edited
