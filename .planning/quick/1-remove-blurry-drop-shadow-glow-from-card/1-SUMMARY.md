---
task: 1
description: Remove blurry drop-shadow glow from card header text site-wide
completed: 2026-03-07
commit: df3530b
files_modified: 3
---

# Quick Task 1: Remove blurry drop-shadow glow from card header text

**Removed CSS effects causing blurry/glowy text rendering across card headers and hero section**

## Changes Made

### HomePage hero (4 removals)
- Removed `drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]` from h1 headline
- Removed `drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]` white glow from "Won't Hold Up" span
- Removed `drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]` from tagline paragraph
- Removed `drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]` from body paragraph

### GCResourcesSection (2 removals)
- Removed `backdrop-blur-sm` from InfoCard containers (Certificate, Safety, License cards)
- Removed `backdrop-blur-sm` from Quick Facts stat cards

### PromiseSection (1 removal)
- Removed `backdrop-blur-sm` from promise cards (Committed Crew, Scheduling, Punch List)

## Files Modified
- `src/pages/HomePage.tsx` — drop-shadow removed from 4 hero text elements
- `src/components/GCResourcesSection.tsx` — backdrop-blur-sm removed from 2 card types
- `src/components/PromiseSection.tsx` — backdrop-blur-sm removed from promise cards

## Build
- Build: PASSES (1.77s, zero errors)
