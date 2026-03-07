---
phase: 6
slug: typography-layout-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-07
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None configured |
| **Config file** | None |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | DSGN-02 | automated | `npm run build` | N/A | pending |
| 06-01-02 | 01 | 1 | DSGN-02 | automated | `npm run build` | N/A | pending |
| 06-02-01 | 02 | 1 | DSGN-01 | automated | `npm run build` | N/A | pending |
| 06-02-02 | 02 | 1 | DSGN-01 | manual-only | Visual inspection | N/A | pending |
| 06-03-01 | 03 | 2 | DSGN-02 | automated | `npm run build` | N/A | pending |
| 06-03-02 | 03 | 2 | DSGN-01, DSGN-02 | manual-only | Visual review all 6 routes | N/A | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.*

No test framework needed. `npm run build` provides TypeScript type-checking for SectionHeader prop changes. `npm run lint` catches code quality issues. Visual requirements are verified manually.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Section headers render in 3 distinct variant layouts (left-bar, banner, overlapping) | DSGN-01 | Purely visual layout changes — CSS class assertions are low-value | Navigate all 6 routes, verify each section uses one of the three variants, no two adjacent sections share the same variant |
| Industrial heading font (Bebas Neue) renders on all headings site-wide | DSGN-02 | Font rendering is visual — build catches type errors but not visual correctness | Navigate all 6 routes, verify all h1-h6 elements render in Bebas Neue uppercase, body text remains system font |
| No horizontal scrollbar from banner variant | DSGN-01 | Layout overflow is viewport-dependent | Test banner sections at 320px, 768px, 1024px, 1440px widths — no horizontal scrollbar |
| Overlapping variant ghost text is non-interactive | DSGN-01 | Accessibility/interaction behavior | Tab through page, verify ghost text is not focusable, not selectable, has aria-hidden |

*All phase behaviors are visual/typographic. Build + lint provide automated type safety; visual correctness requires manual review.*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
