---
phase: 5
slug: cta-simplification
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-06
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None configured (per CLAUDE.md) |
| **Config file** | none |
| **Quick run command** | `npm run lint` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 5-01-01 | 01 | 1 | CTA-03 | build | `npm run build` | N/A | ⬜ pending |
| 5-02-01 | 02 | 2 | CTA-01 | build + manual | `npm run build` + visual review | N/A | ⬜ pending |
| 5-02-02 | 02 | 2 | CTA-02 | build + manual | `npm run build` + visual review | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.*

No test framework to install. Automated verification uses `npm run lint` and `npm run build` (TypeScript type-checking catches prop mismatches and import errors).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| All commercial CTAs read "Request Prequal Package" | CTA-01 | Text content check — no test framework | Grep source for `/contact` links; visual review each page |
| Residential CTA reads "Request a Quote" | CTA-02 | Text content check — no test framework | Navigate to ResidentialPage; verify CTA text and link |
| Contact form reads `?type=` and pre-selects path | CTA-03 | E2E browser behavior | Navigate to `/contact?type=residential` — verify heading changes; navigate to `/contact?type=commercial` — verify heading matches |
| Formspree inbox shows distinct labels | CTA-03 | External service verification | Submit form via `/contact?type=commercial` and `/contact?type=residential`; check Formspree inbox for distinct `_subject` values |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
