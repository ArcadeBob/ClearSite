---
phase: 4
slug: prevailing-wage-service-depth
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-05
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None configured (no test framework) |
| **Config file** | None |
| **Quick run command** | `npm run build && npm run lint` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build && npm run lint`
- **After every plan wave:** Run `npm run build && npm run lint` + manual visual review of `/`, `/about`, `/contact`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | WAGE-01 | Build + Lint | `npm run build && npm run lint` | ✅ | ⬜ pending |
| 04-01-02 | 01 | 1 | WAGE-01 | Manual smoke | Browser at `/` and `/about` | N/A | ⬜ pending |
| 04-01-03 | 01 | 1 | WAGE-02 | Grep | `grep -n "prevailing wage" src/pages/ContactPage.tsx` | N/A | ⬜ pending |
| 04-02-01 | 02 | 1 | SERV-01 | Build + Lint | `npm run build && npm run lint` | ✅ | ⬜ pending |
| 04-02-02 | 02 | 1 | SERV-01 | Manual smoke | Browser at `/` — services section | N/A | ⬜ pending |
| 04-02-03 | 02 | 1 | SERV-02 | Manual smoke | Browser at `/` — amber banner visible | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/PrevailingWageBanner.tsx` — new component file (does not exist yet)
- [ ] No test framework to install — build + lint are the quality gates

*Existing infrastructure covers automated verification needs.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| PrevailingWageBanner visible on `/` and `/about` with PLA, Davis-Bacon, LAUSD, State PW named | WAGE-01 | Visual layout and content check | Navigate to `/` and `/about`, confirm banner renders with all 4 wage types named |
| PrevailingWageBanner NOT on `/residential`, `/projects`, `/*` | WAGE-01 | Negative visual check | Navigate to `/residential`, `/projects`, `/nonexistent` — confirm banner absent |
| Prevailing wage FAQ absent from `/contact` | WAGE-02 | Visual check | Navigate to `/contact`, count 4 FAQs (not 5), confirm no prevailing wage question |
| Each ServiceCard shows technical capability bullets | SERV-01 | Visual layout check | Navigate to `/` services section, confirm all 8 cards have bullet lists below descriptions |
| Amber draft banner visible above services grid | SERV-02 | Visual check | Navigate to `/` services section, confirm amber banner mentioning "draft" or "placeholder" is visible |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
