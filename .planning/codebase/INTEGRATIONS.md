# External Integrations

**Analysis Date:** 2026-03-01

## APIs & External Services

**Email & Form Submission:**
- Formspree - Contact form backend
  - SDK/Client: Browser `fetch()` API
  - Endpoint: `https://formspree.io/f/mreayoqq`
  - File: `src/components/ContactForm.tsx` (line 8)
  - Authentication: Form ID embedded in URL (public endpoint)

**Logo/Client Imagery:**
- Clearbit Logo API - Dynamic client company logos
  - SDK/Client: `<img>` tags with Clearbit URLs
  - Pattern: `https://logo.clearbit.com/{domain}`
  - File: `src/components/ClientLogos.tsx`
  - Domains used: `7-eleven.com`, `lausd.net`, `planetfitness.com`, `buffalowildwings.com`, `deltaco.com`, `rossstores.com`, `tacobell.com`, `tjmaxx.tjx.com`, `starbucks.com`, `familydollar.com`
  - Authentication: None (public API)

**External Reference Links:**
- CSLB License Lookup - California State License Board verification
  - Link: `https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx`
  - Files: `src/components/CertificationsBadges.tsx`, `src/pages/ContactPage.tsx`
  - Purpose: User can verify company license #965590
  - Authentication: None (external link only)

**Image CDN:**
- Unsplash - Stock photography (placeholder images)
  - Pattern: `https://images.unsplash.com/...?ixlib=rb-4.0.3&auto=format&fit=crop&w=...&q=80`
  - Files: `src/pages/HomePage.tsx`, `src/pages/AboutPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/ResidentialPage.tsx`, `src/components/ProjectCard.tsx`
  - Status: Placeholder until owner provides real project photos (per CLAUDE.md)
  - Authentication: None (public URLs)

**Texture Patterns:**
- Transparent Textures - Decorative CSS backgrounds
  - Pattern: `https://www.transparenttextures.com/patterns/cubes.png`
  - Files: `src/components/GCResourcesSection.tsx`, `src/components/PromiseSection.tsx`, `src/pages/CaseStudyPage.tsx`, `src/pages/HomePage.tsx`
  - Usage: Opacity-reduced background pattern layers
  - Authentication: None (public asset)

## Data Storage

**Databases:**
- None - No backend database integration

**File Storage:**
- Local filesystem only - No cloud storage integration
- Contact form supports file upload (handled by Formspree):
  - Accepted types: `.pdf`, `.dwg`, `.dxf`, `.zip`, `.png`, `.jpg`, `.jpeg`
  - Max size: 10MB
  - Files: `src/components/ContactForm.tsx`

**Caching:**
- Browser caching only - No server-side cache layer
- Static asset caching handled by CDN/hosting provider

## Authentication & Identity

**Auth Provider:**
- None - No user authentication system

**Authorization:**
- None - Site is fully public, no access control

## Monitoring & Observability

**Error Tracking:**
- None detected - No error monitoring service integrated

**Logs:**
- Console logging only - No centralized logging system
- ErrorBoundary in `src/components/ErrorBoundary.tsx` handles unhandled React errors

## CI/CD & Deployment

**Hosting:**
- Not specified in codebase - Assumed static hosting (Netlify, Vercel, S3, etc.)
- Build output: `dist/` directory from Vite

**CI Pipeline:**
- None configured - No GitHub Actions, Jenkins, or other CI detected

**Build Commands:**
```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Environment Configuration

**Required env vars:**
- None - All external URLs hardcoded in source code

**Configuration approach:**
- Formspree form ID hardcoded: `https://formspree.io/f/mreayoqq`
- No runtime environment variables needed for production deployment

**Secrets location:**
- No secrets - Formspree endpoint is public; no API keys or credentials in codebase

## Webhooks & Callbacks

**Incoming:**
- None - Site is receive-only (contact form)

**Outgoing:**
- Contact form → Formspree - Form data submitted via POST to `https://formspree.io/f/mreayoqq`
  - Method: `POST`
  - Body: `FormData` (multipart form with file upload support)
  - Headers: `Accept: application/json`
  - File: `src/components/ContactForm.tsx` (lines 68-72)

## Third-Party Libraries with External Calls

**lucide-react 0.522.0:**
- Icon library (CDN-independent, icons bundled in package)
- No external API calls
- Used throughout for UI icons

**react-router-dom 6.26.2:**
- Client-side routing only (no external APIs)
- No network calls

**Vite 5.2.0:**
- Build tool (offline operation)
- No external calls during build or runtime

---

*Integration audit: 2026-03-01*
