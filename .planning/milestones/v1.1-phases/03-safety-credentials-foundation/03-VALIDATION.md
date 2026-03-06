---
phase: 3
slug: safety-credentials-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-05
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None configured (CLAUDE.md states no test framework) |
| **Config file** | None — build + lint serve as quality gates |
| **Quick run command** | `npm run build && npm run lint` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build && npm run lint`
- **After every plan wave:** Run `npm run build && npm run lint` + manual visual review of /about route
- **Before `/gsd:verify-work`:** Build + lint green + manual review of SafetySection
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | CRED-01 | build | `npm run build` | ✅ | ⬜ pending |
| 03-01-02 | 01 | 1 | CRED-01 | grep | `grep -rn "const CSLB_LOOKUP_URL" src/` (expect 0) | ✅ | ⬜ pending |
| 03-01-03 | 01 | 1 | SAFE-01 | manual | Browser at /about — 3 stat cards visible | N/A | ⬜ pending |
| 03-01-04 | 01 | 1 | SAFE-02 | manual | Browser at /about — narrative paragraphs present | N/A | ⬜ pending |
| 03-01-05 | 01 | 1 | SAFE-03 | grep | `grep -rn "\[REVIEW:" src/` (expect matches) | ✅ | ⬜ pending |
| 03-01-06 | 01 | 1 | SAFE-03 | manual | Browser at /about — amber banner visible | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/data/credentials.ts` — must be created before any imports (part of plan task, not infra)

*Existing infrastructure (build + lint) covers all automated phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| SafetySection renders on About page with 3 stat cards | SAFE-01 | Visual layout — no DOM test framework | Navigate to /about, scroll to safety section, verify 3 stat cards |
| Safety narrative paragraphs present with IIPP, toolbox, PPE content | SAFE-02 | Content review — no snapshot tests | Navigate to /about, read narrative, check for IIPP/toolbox/PPE |
| Amber review banner visible at top of safety section | SAFE-03 | Visual indicator — needs browser | Navigate to /about, verify amber banner above safety content |
| Owner review markers grepable | SAFE-03 | Process verification | Run `grep -rn "\[REVIEW:" src/` — expect matches in SafetySection |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
