---
status: testing
phase: 08-client-presentation-ux
source: 08-01-SUMMARY.md
started: 2026-03-07T23:00:00Z
updated: 2026-03-07T23:00:00Z
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

number: 1
name: Client Logos Static Grid Layout
expected: |
  On the HomePage, the client logos section displays logos in a clean grid layout (not a scrolling marquee). Logos appear in grayscale by default. On desktop, logos arrange in rows (up to 5 columns). Each logo has a client name label below it.
awaiting: user response

## Tests

### 1. Client Logos Static Grid Layout
expected: On the HomePage, the client logos section displays logos in a clean grid layout (not a scrolling marquee). Logos appear in grayscale by default. On desktop, logos arrange in rows (up to 5 columns). Each logo has a client name label below it.
result: [pending]

### 2. Client Logos Grayscale Hover Effect
expected: Hovering over a logo card transitions it from grayscale to full color. The effect should be smooth (CSS transition) and revert when you move the cursor away.
result: [pending]

### 3. FloatingCTA Appears on All Pages
expected: A sticky floating CTA bar appears at the bottom of the screen after scrolling down on every page (HomePage, About, Projects, Residential, Contact). It is not limited to just the HomePage.
result: [pending]

### 4. FloatingCTA Commercial Copy
expected: On non-residential pages (e.g. HomePage, About, Projects, Contact), the FloatingCTA displays "Request Prequal Package" (or similar commercial-focused copy) and links to the contact page.
result: [pending]

### 5. FloatingCTA Residential Copy
expected: On the /residential page, the FloatingCTA displays "Request a Quote" (or similar residential-focused copy) instead of the commercial prequal language.
result: [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0

## Gaps

[none yet]
