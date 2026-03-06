# Feature Research

**Domain:** Commercial glazing subcontractor marketing site — v1.1 Credibility & Conversion milestone
**Researched:** 2026-03-05
**Confidence:** HIGH (existing codebase fully read; domain patterns verified via multiple sources)

---

## Context: What Already Exists

This is a subsequent milestone on an existing 4,841-LOC React/TypeScript site. Before cataloguing new features, the inventory of what is already built matters — new features must integrate with, not duplicate, existing components.

**Already built and working:**
- `CertificationsBadges` — 4-badge grid: C-17 Licensed, SBE Certified, DIR Registered, 0.87 EMR (with CSLB verify link). Lives on HomePage.
- `GCResourcesSection` — Dark "Instant Information Center" with quick-facts bar (Bonding, Project Max, EMR, OSHA Incidents, Crew Size) + 3 info cards (COI, Safety Record, License & Bonding). Lives on HomePage.
- `FloatingCTA` — Scroll-triggered sticky bar, single CTA: "Download Prequal Package" → /contact.
- `ContactForm` — Real Formspree backend, file upload, project type dropdown already includes "Public Works / Prevailing Wage" option.
- `AboutPage` — Has "Why Choose CGI" checklist (includes "Continuing Education" safety training mention), Company Timeline, Team section, Mission/Goal/Promise cards. No dedicated safety program section.
- Hero on HomePage — Already mentions "0.87 EMR", "Prevailing Wage Certified", "$1M Bonding" as inline trust signals.
- `ServiceCard` — 1-2 sentence descriptions, hover animation. No technical depth, no capability specs.

**What's missing for v1.1:**
1. Expanded safety program section (training programs, incident prevention, OSHA record detail) — on About page
2. Prevailing wage public works banner/badge — distinct callout beyond checkbox in hero
3. Service technical depth — capability specs beyond 1-2 sentence ServiceCard descriptions
4. Dual-path CTA — one form, two entry points clearly labeled Commercial vs Residential

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that GC visitors assume exist on a credible subcontractor site. Missing these signals amateurism or raises risk flags.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| EMR displayed prominently with context | GCs use EMR as primary safety filter; industry standard is 1.0, anything below 0.9 is excellent; GCs often auto-disqualify above 1.25 | LOW | Already in `GCResourcesSection` and `CertificationsBadges` — needs context explaining what 0.87 means relative to industry average, not just the number |
| Safety record substantiation | "Zero OSHA incidents" is a claim GCs need to believe, not just read. Training practices, IIPP program reference, and toolbox talks are expected indicators | MEDIUM | Currently a 3-bullet list in GCResourcesSection. Needs expansion to dedicated About section |
| License number with verify link | CSLB verification is table stakes in California commercial construction — any legitimate sub shows this prominently | LOW | Already exists in `CertificationsBadges` with verify link. Do not duplicate; ensure it's discoverable |
| DIR registration clearly stated | Required for any public works bid in CA. GCs will not short-list a sub for prevailing wage work without this confirmed | LOW | Currently buried as a subtitle on CertificationsBadges and a bullet in GCResourcesSection. Needs a dedicated callout that reads as "we are set up for your public works project" |
| Contact path that matches intent | A GC requesting a prequal package has different needs than a homeowner requesting a quote. Sending both to the same form with no differentiation creates friction and suggests the firm doesn't understand B2B vs B2C contexts | MEDIUM | Form itself can be single — differentiation happens at the entry point (CTA label, hero copy, page context) |
| Service list with enough detail to spec | A GC scoping glazing trade work needs to confirm capability before adding a sub to a bid list. 1-sentence descriptions don't confirm curtain wall vs storefront expertise | MEDIUM | Existing ServiceCards need expanded descriptions or a separate capability list per service |

### Differentiators (Competitive Advantage)

Features that set CGI apart from commodity glazing subs who have a phone number and a license — not requirements, but meaningful to GC decision-making.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Prevailing wage experience callout with named program types | Most glazing subs claim "prevailing wage certified" — few name PLA, Davis-Bacon, LAUSD, State Prevailing Wage, and certified payroll by name. Specificity signals experience rather than just compliance | LOW | CGI has this experience (confirmed by owner). A dedicated banner or section naming these programs is a strong differentiator for public works GCs |
| Safety program narrative (not just stats) | Highwire research confirms GCs evaluate safety management systems (30% of assessment weight) above EMR alone (10%). A narrative of toolbox talks, IIPP program, and foreman-led protocols tells a story EMR numbers alone cannot | MEDIUM | New section needed on AboutPage. Mock content appropriate since owner review is intended |
| Service capability matrix or expanded cards | Egan Company (competitor) differentiates with NACC certification and specific system types (stick-built, unitized, stick wall). CGI naming "stick-built vs unitized curtain wall", "fire-rated assembly types", and "aluminum system types" signals technical depth to estimators | MEDIUM | Best as expanded description per service, not a full matrix — keeps maintenance overhead low |
| Dual-path CTA with explicit audience labeling | Labeling CTAs by audience type ("For GCs: Request Prequal Package" / "For Homeowners: Request a Quote") reduces cognitive friction. Commercial visitors are in procurement mode; residential visitors are in exploration mode — different needs, different language | LOW | This is primarily a copy and routing change. The ContactForm already accepts both. FloatingCTA also needs updating. |
| Prevailing wage sitewide indicator | A persistent but non-intrusive indicator (e.g., a banner row or a badge that appears in the hero trust signals and the About page) that signals public works capability without requiring a GC to dig for it | LOW | Implemented as a styled badge/callout. Not a full new section — a reusable element added in key locations |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Separate contact forms for commercial vs residential | Clean separation of paths seems logical | Two forms = two Formspree endpoints, two success states, two maintenance points, doubled QA surface. Current form already has project type dropdown including "Public Works / Prevailing Wage" | Use a single form with an optional hidden `_source` field (or a visible radio/dropdown for "I am a: General Contractor / Homeowner") to auto-tag the submission. Route both to same Formspree endpoint |
| Downloadable PDF prequal package | GCs asking for a PDF doc to download seems convenient | PDF goes stale the moment any credential updates (EMR changes annually, COI renews, bonding limits change). A stale PDF is worse than no PDF — it can disqualify a sub if COI expired dates are visible | Keep the "request prequal packet" flow as it is: GC requests via form, CGI sends current docs within 24 hours. This is how professional subs operate |
| Animated safety stat counters ("Zero incidents" counting up) | Visually engaging, shows safety data with emphasis | Trivializes a serious topic. GCs evaluating safety records are in professional procurement mode. Animated counters read as marketing-y rather than credible. Industry leaders (DPR, Swinerton) present safety data in prose and tables, not animations | Static, factual display with contextual benchmarking (e.g., "0.87 vs. industry average of 1.0") |
| Testimonials as safety proof | Social proof for safety feels compelling | Owner explicitly prohibits fake testimonials. Real GC testimonials would require client permission and expose GC contact info on a public site — a content rule violation | Use project references ("Ask our GC references") as the social proof mechanism — already present in site copy |
| Full OSHA 300 log display | Seems like radical transparency for credibility | OSHA 300 logs include incident descriptions that can be taken out of context; public display is not industry standard practice and may create legal exposure | "Zero recordable incidents" + "EMR 0.87" with context is the correct public-facing signal. OSHA 300 documents go in the prequal packet, not the public website |

---

## Feature Dependencies

```
[Dual-path CTA (new entry points)]
    └──depends on──> [Single ContactForm (existing)]
                         └──enhancement──> [Hidden _source field or audience selector (new)]

[Prevailing wage sitewide badge]
    └──component can be──> [Reusable badge element used in:]
                               ├──> [HomePage hero (existing, inline text today)]
                               ├──> [AboutPage safety section (new)]
                               └──> [CertificationsBadges enhancement (existing)]

[AboutPage safety program section (new)]
    └──sits after──> [Brand Story section (existing)]
    └──sits before──> [Company Timeline section (existing)]
    └──reuses──> [SectionHeader component (existing)]
    └──reuses──> [Card component (existing)]

[Expanded service technical details]
    └──extends──> [ServiceCard component (existing)]
    └──option A──> [Longer description prop (low complexity, backward compatible)]
    └──option B──> [New ServiceDetailPage route (high complexity, out of scope)]

[FloatingCTA dual-path update]
    └──depends on──> [FloatingCTA component (existing)]
    └──modification──> [Add second CTA button for residential path]
```

### Dependency Notes

- **Dual-path CTA depends on ContactForm:** The form already works. The change is upstream: CTA labels, hero copy, and page routing. No form changes required except an optional audience-tag field.
- **Prevailing wage badge is a new primitive, not a new section:** It can be a shared constant or small component — a styled `<span>` or `<div>` with consistent styling — inserted into existing sections. Not a new page or major component.
- **AboutPage safety section is additive:** It inserts between existing sections. Does not require restructuring the page. Uses existing `SectionHeader` and `Card` primitives.
- **Expanded service details extend, not replace, ServiceCard:** Option A (longer `description` prop with technical bullets) is backward-compatible and requires no routing changes. Option B (individual service pages) is a v1.2 scope item.

---

## MVP Definition

### Launch With (v1.1)

Minimum changes that meaningfully improve credibility and conversion for the GC audience.

- [ ] **AboutPage safety program section** — New section with 3-4 safety practice cards (IIPP reference, weekly toolbox talks, foreman-led protocols, OSHA incident record context). Mock content with owner review note. Uses existing Card + SectionHeader.
- [ ] **Prevailing wage callout element** — A visually distinct badge or banner that names PLA, Davis-Bacon, LAUSD, and State Prevailing Wage by name. Placed on HomePage (near GCResourcesSection or in CertificationsBadges) and About page safety section.
- [ ] **Expanded ServiceCard descriptions** — Replace 1-sentence descriptions with 3-4 bullet technical capability notes per service (e.g., "Stick-built and unitized systems", "NFRC-rated assemblies", "Kawneer/Vitro system experience"). No new component needed — extend `description` prop or add a `capabilities?: string[]` prop.
- [ ] **Dual-path CTA copy and routing** — Rename primary CTA explicitly to "Request Prequal Package (Commercial GCs)" and add or rename secondary CTA to "Request a Quote (Residential)". Update FloatingCTA to show both paths or update copy to be explicitly commercial. Update ContactForm to include an audience indicator field.

### Add After Validation (v1.x)

- [ ] **AboutPage safety section with real owner input** — Replace mock safety content with owner-confirmed training practices, certifications held by crew, and any named programs (OSHA 10/30 counts, Hazcom, Fall Protection). Trigger: owner review of v1.1 mock content.
- [ ] **GCResourcesSection EMR context** — Add "vs. 1.0 industry average" annotation to the 0.87 EMR stat. One line of copy, high GC credibility impact. Trigger: owner approval of framing.

### Future Consideration (v2+)

- [ ] **Individual service detail pages** — `/services/curtain-walls`, `/services/storefronts`, etc. with technical specs, system types, and project photos per service. High complexity, requires real photos. Defer: waiting for owner to provide photos.
- [ ] **NACC certification pursuit** — Egan Company differentiates with NACC certification. If CGI pursues this, a dedicated credential badge and verification link would be a strong differentiator. Out of scope for v1.1.
- [ ] **Prequal packet as live document portal** — Authenticated page where GCs download current COI, EMR letter, and references without needing to contact CGI. Requires backend. Defer until owner confirms interest.

---

## Feature Prioritization Matrix

| Feature | GC Audience Value | Implementation Cost | Priority |
|---------|-------------------|---------------------|----------|
| AboutPage safety program section | HIGH — addresses 30% of prequal evaluation weight | LOW — new section, existing components | P1 |
| Prevailing wage named-programs callout | HIGH — differentiator for public works GCs | LOW — copy + badge element reuse | P1 |
| Dual-path CTA copy update | HIGH — reduces bounce from wrong-audience friction | LOW — copy + routing, no new component | P1 |
| Expanded ServiceCard technical details | MEDIUM — confirms capability for bid qualification | LOW — prop extension, no new component | P1 |
| ContactForm audience indicator field | MEDIUM — tags submissions for better follow-up | LOW — one Select field addition | P2 |
| FloatingCTA dual-path update | MEDIUM — matches sitewide CTA clarity goal | LOW — text + button change in existing component | P2 |
| EMR context annotation in GCResourcesSection | MEDIUM — GCs understand EMR but context adds weight | LOW — one line of copy | P2 |

**Priority key:**
- P1: Must have for v1.1 launch
- P2: Should have, high ROI for low cost
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

Based on Egan Company (InterClad division) and industry GC prequalification patterns (Highwire, Procore, DPR):

| Feature | Egan Company (InterClad) | Industry Standard GC Sub Sites | CGI Current State | CGI v1.1 Plan |
|---------|--------------------------|--------------------------------|-------------------|---------------|
| Safety credentials display | Separate Safety nav link; safety page not publicly indexed | EMR + OSHA record as trust signals | EMR in hero + GCResourcesSection | Expand with safety program narrative on About |
| Prevailing wage callout | Not prominently featured | DIR registration listed in credentials | Checkbox in hero, badge on certifications | Named-program banner (PLA, Davis-Bacon, LAUSD) |
| Service technical depth | Stick-built, unitized, metal panel systems named; NACC cert | System types named; application types specified | 1-2 sentence ServiceCards | 3-4 capability bullets per service |
| Dual-path CTAs | VP contact + 24/7 hotline + Bid Request portal | Commercial prequal vs residential quote split rare for subs | Single path: "Request Prequal Package" | Explicit commercial/residential CTA labeling |
| Prequal package | Not public-facing | Usually PDF or BuildingConnected | Form-based request, 24-hour delivery | No change — form-based is correct approach |

---

## Implementation Notes (for Roadmap Phasing)

**Safety section on About (P1):** Content is mock — owner review required before going live. Phase should include a review gate or label content as "pending owner review" in planning docs.

**Prevailing wage badge/banner:** The most common industry pattern for this is a horizontal banner strip (similar to the existing value proposition banner below the hero) or a standalone badge row. A "Public Works Ready" strip with named programs reads as credible without being oversized. Avoid full-page sections — this is a trust signal, not a feature.

**Expanded ServiceCard:** The safest implementation is adding an optional `capabilities?: string[]` prop to `ServiceCard`. If null, the card renders as today. If populated, a compact bullet list renders below the description. This preserves the existing 4-column grid without layout changes.

**CTA simplification:** The current ContactPage hero says "Request Prequalification Packet" — this is already correct for GC visitors. The gap is that residential visitors (who arrive from the Residential page CTA "Request a Quote") land on a page titled "Request Prequalification Packet" which is off-brand for them. The fix: either (a) add a path parameter that swaps hero copy, or (b) create a minimal residential variant of the contact section. Option (a) is lower cost and preferred.

---

## Sources

- Highwire — [Experience Modification Rating Guide](https://www.highwire.com/blog/experience-modification-rating-guide): EMR benchmarks, what GCs evaluate beyond EMR (safety management systems = 30% weight)
- Highwire — [The Complete Guide to Subcontractor Prequalification](https://www.highwire.com/blog/the-complete-guide-to-subcontractor-prequalification): Prequal dimensions, reducing friction
- Egan Company / InterClad — [Curtainwall Glazing Services](https://www.eganco.com/specialties/curtainwall-glass-metal-panels/): Competitor pattern for service presentation, NACC certification display
- OSHA — [Construction Safety & Health Program](https://www.osha.gov/etools/construction/safety-health-program): Safety program elements GCs reference
- California DIR — [Public Works / Prevailing Wage](https://www.dir.ca.gov/public-works/prevailing-wage.html): DIR registration requirements, what subcontractors must demonstrate
- Thomas Industrial Coatings — [EMR Explained](https://thomasindcoatings.com/incident-and-experience-modifier-rates-explained/): Industry average 1.0 benchmark context
- Existing codebase (fully read): `CertificationsBadges.tsx`, `GCResourcesSection.tsx`, `FloatingCTA.tsx`, `ContactForm.tsx`, `AboutPage.tsx`, `HomePage.tsx`, `ServiceCard.tsx`, `ResidentialPage.tsx`, `ContactPage.tsx`

---

*Feature research for: ClearSite v1.1 — Credibility & Conversion*
*Researched: 2026-03-05*
