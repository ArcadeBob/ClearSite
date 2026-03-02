# Coding Conventions

**Analysis Date:** 2026-03-01

## Naming Patterns

**Files:**
- PascalCase for React components: `ServiceCard.tsx`, `ProcessTimeline.tsx`, `ErrorBoundary.tsx`
- camelCase for utility/non-component files: `index.tsx` (entry point only)
- Page components: PascalCase ending in `Page`: `HomePage.tsx`, `CaseStudyPage.tsx`, `NotFoundPage.tsx`
- UI primitives: Located in `src/components/ui/` directory with PascalCase: `Button.tsx`, `Input.tsx`, `Select.tsx`, `TextArea.tsx`, `Card.tsx`

**Functions:**
- PascalCase for React component functions: `export function HomePage() { ... }`
- camelCase for helper/event handlers: `handleSubmit()`, `handleFileChange()`, `resetTimeout()`, `handleDismiss()`
- Constants extracted from components use camelCase: `CAROUSEL_INTERVAL_MS`, `MAX_FILE_SIZE_MB`, `SCROLL_SHOW_THRESHOLD`

**Variables:**
- camelCase for state variables: `currentIndex`, `isVisible`, `isDismissed`, `isSubmitting`, `fileName`
- camelCase for props and destructured parameters: `title`, `description`, `icon`, `isActive`, `numberDelay`
- UPPER_SNAKE_CASE for constants: `PARALLAX_FACTOR`, `HERO_BADGE_FADE_PX`, `CAROUSEL_INTERVAL_MS`, `MAX_FILE_SIZE_BYTES`, `ACCEPTED_FILE_TYPES`, `SCROLL_RESET_THRESHOLD`, `LINE_PROGRESS_INCREMENT`, `INTERSECTION_THRESHOLD`

**Types/Interfaces:**
- PascalCase for interfaces: `SectionHeaderProps`, `ButtonProps`, `ErrorBoundaryState`, `CaseStudy`, `Testimonial`
- Suffix with `Props` for component prop interfaces
- Suffix with `State` for component state interfaces where needed

## Code Style

**Formatting:**
- No explicit Prettier config detected (no `.prettierrc` file)
- ESLint is the primary linting tool
- Default 2-space indentation inferred from source files
- Multiline JSX: Opening tags and closing tags on separate lines when needed, inlined for short content

**Linting:**
- ESLint configuration in `.eslintrc.cjs`
- Extends `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:react-hooks/recommended`
- `react-refresh` plugin with warning for non-component exports
- `allowConstantExport: true` enables exporting constants from component files
- TypeScript strict mode enabled: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`

**Key Rules Observed:**
- Named exports only (no default exports): `export function ComponentName() { ... }`
- Closing JSX tags on separate line from content: See `src/components/ui/Button.tsx` line 35-39
- Template literals for dynamic className strings: See `src/components/SectionHeader.tsx` line 20-23

## Import Organization

**Order:**
1. React and third-party framework imports: `import React from 'react'`
2. React Router imports: `import { Link, useLocation } from 'react-router-dom'`
3. Icon library imports: `import { Menu, X, Phone } from 'lucide-react'`
4. Internal component imports: `import { Button } from '../components/ui/Button'`
5. Interface/type imports grouped with component imports if same file

**Examples:**

From `src/pages/HomePage.tsx`:
```typescript
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { StatsSection } from '../components/StatsSection';
import { CertificationsBadges } from '../components/CertificationsBadges';
// ... more component imports
import {
  Building2,
  Maximize,
  Sun,
  // ... more icon imports
} from 'lucide-react';
```

From `src/components/Button.tsx`:
```typescript
import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  // ...
}
export function Button({ ... }) {
  // ...
}
```

**Path Aliases:**
- No path aliases configured (no `paths` in `tsconfig.json`)
- Relative imports used throughout: `../components/`, `../pages/`
- Relative imports are consistent: parent page imports from `../components/`

## Error Handling

**Patterns:**
- Form errors: Display inline after form submission in error state variables: See `src/components/ContactForm.tsx` lines 220-224
- File validation errors: Inline under file input field with specific message: See `src/components/ContactForm.tsx` lines 205-207
- Network errors: Catch blocks set error state for display to user: See `src/components/ContactForm.tsx` lines 78-79
- Error Boundary: Class component catches all child errors and displays fallback UI: See `src/components/ErrorBoundary.tsx`
- Logging: `console.error()` in error boundary to log caught errors: See `src/components/ErrorBoundary.tsx` line 23

**Try-Catch Pattern:**
```typescript
try {
  // Async operation
  const response = await fetch(FORMSPREE_URL, { ... });
  if (response.ok) {
    setIsSuccess(true);
  } else {
    setError('Specific error message');
  }
} catch {
  setError('Unable to perform action. Please try again.');
} finally {
  setIsSubmitting(false);
}
```

## Logging

**Framework:** `console` (native browser console)

**Patterns:**
- Only one console statement found: `console.error()` in ErrorBoundary for error debugging
- No structured logging library (no winston, pino, etc.)
- Error logging used for developer debugging, not production monitoring
- Errors displayed to users via state-based UI messages, not console

## Comments

**When to Comment:**
- Inline comments used for complex conditional rendering logic
- Comments mark sections: `{/* Text */}`, `{/* Desktop menu */}`, `{/* Mobile menu button */}`
- Comments precede logical sections of JSX: `{/* Icon Container */}`, `{/* File Upload */}`
- No JSDoc comments found in codebase

**JSDoc/TSDoc:**
- Not used in this codebase
- Interfaces/types are self-documenting through TypeScript prop types
- No multi-parameter functions requiring documentation

## Function Design

**Size:**
- Small, focused components: Most components 100-250 lines
- Larger components exist for pages: `CaseStudyPage.tsx` (548 lines), `HomePage.tsx` (469 lines)
- Page components compose smaller section components rather than containing all logic

**Parameters:**
- Destructured props at function signature: See `src/components/SectionHeader.tsx` lines 12-19
- Default values inline in destructuring: `subheadingColor = 'text-accent'`, `titleSize = 'lg'`
- Spread operator `{...props}` for HTML element passthrough: See `src/components/ui/Button.tsx` line 14

**Return Values:**
- Single JSX element per component (not arrays)
- Closing tags on new line: Prevents accidentally returning multiple elements
- Explicit null return for non-rendering components: `return null` in `ScrollToHash.tsx` line 29
- Conditional rendering with ternary operators: `isActive ? 'text-accent' : 'text-slate-600'`

## Module Design

**Exports:**
- Named exports only: `export function ComponentName() { ... }`
- No default exports anywhere in codebase
- Single export per file (one component per file)
- Constants defined in same file as component they're used in

**Organization:**
- Pages in `src/pages/`: Full page route components
- Components in `src/components/`: Reusable section components
- UI in `src/components/ui/`: Primitive form controls (Button, Input, TextArea, Select, Card)
- No barrel files (index.tsx with re-exports) found

**Data Management:**
- Inline data arrays within component files: See `HomePage.tsx` (services array), `CaseStudyPage.tsx` (caseStudies array), `ContactForm.tsx` (projectTypeOptions, scopeValueOptions)
- No external data layer or API integration for static content
- Contact form integrates with Formspree API only

## Tailwind & Styling

**Brand Colors:**
Use theme tokens defined in `tailwind.config.js` instead of arbitrary hex values:
- `bg-brand` / `text-brand` → `#1e3a5f` (primary navy)
- `bg-brand-dark` / `text-brand-dark` → `#162c47` (darker navy)
- `bg-accent` / `text-accent` → `#2563eb` (accent blue)
- `bg-accent-dark` / `text-accent-dark` → `#1d4ed8` (darker accent)

**Pattern:**
```typescript
// Good: Use theme tokens
className="bg-brand text-white hover:bg-brand-dark"

// Not used: Arbitrary hex values
className="bg-[#1e3a5f]"
```

**Spacing & Responsive:**
- Container max-width: `max-w-7xl` for full-width sections
- Consistent padding: `px-4 sm:px-6 lg:px-8`
- Section padding: `py-24` standard for major sections, `py-16` for subsections
- Responsive typography: `text-sm`, `md:text-base`, `lg:text-lg`

**Icons:**
- From `lucide-react` package
- Inline in JSX: `<Download className="h-4 w-4" />`
- Size conventions: `h-4 w-4`, `h-5 w-5`, `h-6 w-6`, `h-16 w-16` (always square)
- Color from Tailwind: `text-brand`, `text-accent`, `text-white`, `text-slate-400`

---

*Convention analysis: 2026-03-01*
