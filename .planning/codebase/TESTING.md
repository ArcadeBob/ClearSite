# Testing Patterns

**Analysis Date:** 2026-03-01

## Test Framework

**Status:** Not configured

**Runner:**
- None detected
- No `jest.config.js`, `vitest.config.ts`, `cypress.config.ts`, or similar test runner configuration found
- No test files in source directory (`.test.ts`, `.spec.ts` patterns not present in `src/`)

**Test Scripts:**
- Not available in `package.json`
- No `npm run test`, `npm run test:watch`, or `npm run test:coverage` commands

**Assertion Library:**
- None detected

**Package Status:**
- No testing dependencies in `package.json`:
  - No `jest`, `vitest`, `mocha`
  - No `@testing-library/*` packages
  - No `chai`, `expect`, or assertion libraries
  - No `@types/jest` or test type definitions

## Test File Organization

**Location:**
- No test files exist in codebase
- No `__tests__/` directories
- No `tests/` directory

**Naming:**
- Not applicable (no test files)

**Structure:**
- Not applicable (no test files)

## Notes on Testing Approach

**Current Strategy:**
This codebase has **no test coverage**. Testing is not implemented.

**Manual Testing Approach (Inferred from Code):**
The application appears to rely on:
1. Manual testing during development (`npm run dev`)
2. Visual/UI testing via browser preview
3. ESLint validation for code quality
4. TypeScript strict mode for type safety

**Why Testing Is Missing:**
- This is a marketing website generated from a Magic Patterns template
- Small team/solo developer project (implied by structure)
- Content-focused site with limited business logic
- Form submission is simulated (Formspree integration, not backend)
- Components are presentational with minimal state complexity

## Components That Would Benefit From Tests

If testing were to be implemented, prioritize these areas:

**High Value:**
- `ContactForm.tsx` (`src/components/ContactForm.tsx`)
  - File validation logic: `MAX_FILE_SIZE_BYTES` check, MIME type validation
  - Form state management: submission, errors, success states
  - Async behavior: Formspree submission
  - Error handling: network errors, validation messages

- `ProcessTimeline.tsx` (`src/components/ProcessTimeline.tsx`)
  - Intersection Observer behavior: detecting when section enters viewport
  - Animation state: line progress calculation, stagger delays
  - Responsive layout switching: desktop vs mobile rendering

- `FloatingCTA.tsx` (`src/components/FloatingCTA.tsx`)
  - Scroll event listener: visibility threshold logic
  - Dismiss persistence: state after scroll reset
  - Button interaction: proper cleanup on unmount

- `ErrorBoundary.tsx` (`src/components/ErrorBoundary.tsx`)
  - Error catching: static method `getDerivedStateFromError`
  - Error logging: `componentDidCatch` calls
  - Fallback UI rendering: error state display

**Medium Value:**
- `CaseStudyPage.tsx` (`src/pages/CaseStudyPage.tsx`)
  - Dynamic route matching: slug-based case study lookup
  - Not found handling: 404 when slug doesn't exist
  - Related projects filtering: "See More" projects section

- `Navbar.tsx` (`src/components/Navbar.tsx`)
  - Active route detection: `isActive()` helper logic
  - Mobile menu toggle: state management
  - Responsive layout: desktop vs mobile menu rendering

**Lower Value (Mostly Presentational):**
- `SectionHeader.tsx`: Props-based rendering with minimal logic
- `ServiceCard.tsx`: Hover state management, straightforward
- UI primitives (`Button.tsx`, `Input.tsx`, etc.): Props passthrough, minimal logic

## What Testing Would Look Like

### Example: ContactForm Unit Tests (if implemented)

```typescript
describe('ContactForm', () => {
  describe('File Upload Validation', () => {
    it('should reject files larger than MAX_FILE_SIZE_MB', () => {
      // Simulate file > 10MB
      // Expect: setFileError() called with size message
      // Expect: file input cleared
    });

    it('should accept valid file extensions', () => {
      // Upload .pdf file
      // Expect: setFileName() called with filename
      // Expect: no error message
    });

    it('should clear file when X button clicked', () => {
      // Upload file, then click clear button
      // Expect: fileName state reset to null
      // Expect: file input cleared
    });
  });

  describe('Form Submission', () => {
    it('should submit to FORMSPREE_URL on valid form', async () => {
      // Fill form, submit
      // Expect: fetch() called with correct URL and FormData
      // Expect: setIsSubmitting(true) during request
      // Expect: setIsSuccess(true) on 200 response
    });

    it('should display error on network failure', async () => {
      // Mock fetch() to throw error
      // Submit form
      // Expect: setError() called with fallback message
      // Expect: error displayed in UI
    });

    it('should handle non-OK response', async () => {
      // Mock fetch() to return 500 status
      // Expect: setError() called with specific error message
      // Expect: form does not show success state
    });
  });

  describe('Error Recovery', () => {
    it('should allow retrying after error', () => {
      // Trigger error state
      // Click "Send Another Message" button
      // Expect: isSuccess reset to false
      // Expect: form fields still populated or cleared
    });
  });
});
```

### Example: ProcessTimeline Integration Tests (if implemented)

```typescript
describe('ProcessTimeline', () => {
  describe('Intersection Observer', () => {
    it('should start animations when section enters viewport', () => {
      // Render component
      // Simulate IntersectionObserver callback with isIntersecting=true
      // Expect: setIsVisible(true)
      // Expect: setInterval started for line animation
    });

    it('should clean up observers on unmount', () => {
      // Render component
      // Unmount
      // Expect: observer.disconnect() called
      // Expect: clearInterval() called
    });
  });

  describe('Animation Progress', () => {
    it('should increment line progress over time', () => {
      // Simulate IntersectionObserver entry
      // Wait for interval ticks
      // Expect: lineProgress increases by LINE_PROGRESS_INCREMENT each tick
      // Expect: stops at 100%
    });

    it('should apply stagger delays to step items', () => {
      // Render with isVisible=true
      // Check rendered elements
      // Expect: each step has transitionDelay = index * DESKTOP_STAGGER_MS + DESKTOP_STAGGER_BASE_MS
    });
  });

  describe('Responsive Rendering', () => {
    it('should render desktop layout on large screens', () => {
      // Render with viewport width > 1024px
      // Expect: desktop container visible
      // Expect: mobile container hidden
    });

    it('should render mobile layout on small screens', () => {
      // Render with viewport width < 1024px
      // Expect: mobile container visible
      // Expect: desktop container hidden
    });
  });
});
```

## Mocking Strategy (if testing were implemented)

**What to Mock:**
- `window.scrollY` for scroll position tests
- `IntersectionObserver` API for intersection detection
- `fetch()` for API calls (Formspree, Clearbit)
- `window.location.reload()` in ErrorBoundary
- Timer functions: `setTimeout()`, `setInterval()`
- File input events for file upload tests
- `react-router-dom` hooks: `useParams()`, `useLocation()`

**What NOT to Mock:**
- Component rendering (use actual render from `@testing-library/react`)
- Tailwind CSS classes (don't mock className)
- Lucide React icons (render as-is)
- React Router context (wrap in test Router if needed)
- React hooks: `useState()`, `useEffect()`, `useRef()` (test behavior instead)

## Code Quality Tools Currently In Use

**ESLint:**
- Configuration: `.eslintrc.cjs`
- Enforces code quality and consistency
- Plugin: `react-hooks` ensures Hook rules compliance
- Rule: `react-refresh/only-export-components` prevents accidental default exports

**TypeScript:**
- Strict mode enabled: `"strict": true`
- Enforces `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- Provides type safety without runtime tests

**Browser DevTools:**
- Console for error checking
- Network tab for API inspection
- Performance profiling for animations

## Recommended Testing Setup (If Implemented)

If tests were to be added, recommended stack:

```json
{
  "devDependencies": {
    "vitest": "latest",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jsdom": "latest",
    "@vitest/ui": "latest"
  }
}
```

**Commands to add:**
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

**Files to create:**
- `vitest.config.ts`: Test runner configuration
- `src/**/*.test.tsx`: Component tests (co-located with components)
- `tests/`: Optional shared test utilities, mocks, fixtures

---

*Testing analysis: 2026-03-01*
