# Technology Stack

**Analysis Date:** 2026-03-01

## Languages

**Primary:**
- TypeScript 5.5.4 - Used throughout source code in `src/`
- JavaScript (JSX/TSX) - React component syntax

**Secondary:**
- CSS - Tailwind utility classes, limited custom CSS in `src/index.css`
- GLSL/SVG - Inline SVG in `ServiceAreaMap.tsx` for region map rendering

## Runtime

**Environment:**
- Node.js (no specific version pinned, uses npm for package management)

**Package Manager:**
- npm - Version management in `package.json` and `package-lock.json`
- Lockfile: Present at `package-lock.json`

## Frameworks

**Core:**
- React 18.3.1 - UI library with React 18 `createRoot` API
- react-router-dom 6.26.2 - Client-side routing for SPAs

**Build/Dev:**
- Vite 5.2.0 - Build tool and dev server (config: `vite.config.ts`)
- @vitejs/plugin-react 4.2.1 - React Fast Refresh support for Vite

**Styling:**
- Tailwind CSS 3.4.17 - Utility-first CSS framework (config: `tailwind.config.js`)
- PostCSS - CSS processing pipeline (config: `postcss.config.js`)
- autoprefixer (latest) - Browser vendor prefix support

**Linting:**
- ESLint 8.50.0 - Code quality (config: `.eslintrc.cjs`)
- @typescript-eslint/eslint-plugin 5.54.0 - TypeScript rule support
- @typescript-eslint/parser 5.54.0 - TypeScript parsing for ESLint
- eslint-plugin-react-hooks 4.6.0 - React hooks best practices
- eslint-plugin-react-refresh 0.4.1 - React Fast Refresh validation

**Icons:**
- lucide-react 0.522.0 - Icon library used in components (ServiceCard, CertificationsBadges, FloatingCTA, etc.)

## Key Dependencies

**Critical:**
- react 18.3.1 - Core UI framework
- react-router-dom 6.26.2 - Required for routing between pages
- lucide-react 0.522.0 - Icon rendering (UI components throughout)

**Infrastructure:**
- typescript 5.5.4 - Type checking and compilation
- vite 5.2.0 - Build and dev server
- tailwindcss 3.4.17 - Styling system

## Configuration

**Environment:**
- No `.env` file or environment variable configuration detected
- All configuration is hardcoded in component files (e.g., `FORMSPREE_URL`, `CSLB_LOOKUP_URL` in `ContactForm.tsx`)
- External URLs hardcoded: Formspree, Clearbit logo API, Unsplash images, CSLB lookup

**Build:**
- TypeScript: `tsconfig.json` - Strict mode enabled, target ES2020
- Vite: `vite.config.ts` - Minimal config with React plugin
- Tailwind: `tailwind.config.js` - Custom brand and accent colors
- PostCSS: `postcss.config.js` - Tailwind + autoprefixer pipeline
- ESLint: `.eslintrc.cjs` - TypeScript + React Hooks rules

## Platform Requirements

**Development:**
- Node.js runtime (npm included)
- Modern browser with ES2020 support
- No database or backend required for local development

**Production:**
- Static hosting (Vite builds to `dist/` directory)
- CDN capable (all assets are static files)
- No server-side rendering or API server required
- Formspree endpoint accessible for contact form submissions

---

*Stack analysis: 2026-03-01*
