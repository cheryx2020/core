# Test Coverage Analysis Report

## Executive Summary

This document analyzes the current test coverage of the `@cheryx2020/core` React component library and provides actionable recommendations for improving test quality.

**Current Coverage: ~8% (6 test files covering ~71 source files)**

---

## Current Test Inventory

### Test Files (6 total)

| File | Tests | Coverage Area |
|------|-------|---------------|
| `__tests__/table.test.js` | 5 | Table component validation |
| `src/components/pattern-detail/pattern-detail.test.js` | 2 | PatternDetail rendering |
| `src/components/pattern-preview/pattern-review.test.js` | 6 | EmailSubscriptionSuccess, DownloadPatternForm |
| `src/components/post-content/postUtils.test.js` | 50+ | Extensive utility & component tests |
| `src/components/post-content/onChangeImage.test.js` | 8 | Image upload functionality |
| `src/components/post-content/uploadContentImageFiles.test.js` | 1 | Recursive file upload |

### Testing Stack
- **Framework**: Jest 29.7.0
- **Libraries**: @testing-library/react, @testing-library/jest-dom
- **Environment**: jsdom

---

## Priority Areas for Test Improvement

### Priority 1: Critical - Hooks & HOCs (No Tests)

These are foundational pieces used across the application:

#### `hooks/useAuthenticate.js`
**Risk Level**: HIGH - Handles authentication state
**Recommended Tests**:
- Should return `isAuth: false` when no token in localStorage
- Should call `verifyToken()` and set `isAuth: true` on valid token
- Should remove token and set `isAuth: false` on invalid token
- Should handle API errors gracefully

```javascript
// Example test structure
describe('useAuthenticate', () => {
  beforeEach(() => localStorage.clear());

  it('should return isAuth false when no token exists', () => {});
  it('should verify token and set isAuth true on success', async () => {});
  it('should remove invalid token and set isAuth false', async () => {});
  it('should handle verification errors', async () => {});
});
```

#### `hooks/usePageData.js`
**Risk Level**: HIGH - Manages page state and API interactions
**Recommended Tests**:
- `onDataPageChange` should update page data correctly
- `onDataPageChange` should handle CIRCLE_IMAGE special case
- `onClickSave` should submit form data via API
- `onClickSave` should handle custom save API endpoints
- Loading state management
- Error handling for API failures

#### `hooks/useIsMobile.js`
**Risk Level**: MEDIUM - UI responsiveness
**Recommended Tests**:
- Should return false initially on non-mobile
- Should update on window resize
- Should clean up event listener on unmount

#### `hocs/withAuth.js`
**Risk Level**: HIGH - Route protection
**Recommended Tests**:
- Should render null when not verified
- Should render wrapped component when verified
- Should redirect to "/" when no token
- Should redirect to "/" when token is invalid
- Should work with Router.replace and location fallback

---

### Priority 2: High - Form & Input Components

These components handle user data entry:

#### `src/components/input/index.js`
**Risk Level**: MEDIUM
**Recommended Tests**:
- Renders input with correct type
- Renders textarea when type="textarea"
- Label displays capitalized id
- No label when id is undefined
- onChange handler works correctly
- Passes through rest props

#### `src/components/paypal-checkout/paypal-checkout.js`
**Risk Level**: HIGH - Handles payments
**Recommended Tests**:
- Initial render shows PayPal button
- Click shows email input form
- Email validation works correctly
- Payment flow states (verifying, success, error)
- API verification call on approval
- Error state display

---

### Priority 3: High - Utility Functions

#### `src/utils/generic-div.js`
**Risk Level**: MEDIUM - Used for dynamic rendering
**Recommended Tests**:
- `hashCode` function produces consistent hashes
- `executeAction` handles all action types (alert, console, toggle-class, add-class, remove-class)
- GenericDiv renders with all prop combinations
- Style tag injection and cleanup
- Event handlers (onClick, onMouseEnter, onMouseLeave)
- Nested elements recursive rendering
- HTML content via dangerouslySetInnerHTML

---

### Priority 4: Medium - UI Components Without Tests

Components sorted by complexity and usage:

| Component | Complexity | Recommended Tests |
|-----------|------------|-------------------|
| `image-upload` | Medium | Upload flow, resize, drag-start |
| `image-uploadable` | Medium | File selection, preview |
| `loader` | Low | Renders spinner |
| `circular-loader` | Low | Renders with props |
| `header-cheryx` | Medium | Navigation, responsive |
| `footer` | Low | Links render correctly |
| `left-menu` | Medium | Menu items, active state |
| `admin-menu` | Medium | Admin-specific items |
| `form` | High | Validation, submission |
| `json-editor` | High | JSON parsing, editing |
| `page-manager` | High | Page CRUD operations |
| `layout-editor` | High | Layout manipulation |

---

### Priority 5: Medium - Layout Components

#### `src/layouts/`
All layout components lack tests:
- `dashboard-layout`
- `detail`
- `main`

**Recommended Tests**:
- Child components render correctly
- Props passed through appropriately
- Conditional rendering based on props

---

## Specific Test Recommendations

### 1. Fix Commented-Out Tests

In `src/components/pattern-preview/pattern-review.test.js`, there are commented-out tests that should be enabled:

```javascript
// These are currently commented out and should be fixed:
// - Error handling scenarios
// - Form validation tests
```

### 2. Add Integration Tests

Create integration tests for common user flows:

```
__tests__/
  integration/
    authentication-flow.test.js
    page-editing-flow.test.js
    payment-flow.test.js
```

### 3. Add Snapshot Tests

For visual components that should remain stable:

```javascript
// Example for simple UI components
it('matches snapshot', () => {
  const { container } = render(<Footer />);
  expect(container).toMatchSnapshot();
});
```

### 4. Add Accessibility Tests

Install and configure @axe-core/react:

```javascript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<Input id="email" type="email" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Recommended Test File Structure

```
core/
├── __tests__/
│   ├── hooks/
│   │   ├── useAuthenticate.test.js
│   │   ├── usePageData.test.js
│   │   └── useIsMobile.test.js
│   ├── hocs/
│   │   └── withAuth.test.js
│   ├── utils/
│   │   └── generic-div.test.js
│   └── integration/
│       └── ...
├── src/
│   └── components/
│       └── [component]/
│           └── [component].test.js  (co-located tests)
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Add tests for `useAuthenticate` hook
- [ ] Add tests for `withAuth` HOC
- [ ] Add tests for `usePageData` hook
- [ ] Add tests for `useIsMobile` hook
- [ ] Fix commented-out tests in pattern-review.test.js

### Phase 2: Core Components (Week 3-4)
- [ ] Add tests for `Input` component
- [ ] Add tests for `PayPalCheckout` component
- [ ] Add tests for `ImageUpload` component
- [ ] Add tests for `generic-div` utility

### Phase 3: UI Components (Week 5-6)
- [ ] Add tests for layout components
- [ ] Add tests for navigation components (header, menu, footer)
- [ ] Add tests for loader components

### Phase 4: Advanced (Week 7-8)
- [ ] Add integration tests
- [ ] Add accessibility tests
- [ ] Add E2E tests with Cypress/Playwright
- [ ] Set up coverage thresholds in CI

---

## Coverage Goals

| Timeframe | Target Coverage |
|-----------|-----------------|
| Current | ~8% |
| After Phase 1 | 25% |
| After Phase 2 | 45% |
| After Phase 3 | 65% |
| After Phase 4 | 80% |

---

## Running Tests

```bash
# Run all tests with coverage
npm test

# Run specific test file
npm test -- path/to/test.test.js

# Run tests in watch mode
npm test -- --watch
```

---

## Conclusion

The codebase has a solid testing foundation with Jest and Testing Library properly configured. The `post-content` module demonstrates excellent testing practices with 50+ comprehensive tests. However, critical infrastructure (hooks, HOCs) and many UI components lack test coverage.

**Top 5 Immediate Actions**:
1. Test `useAuthenticate` and `withAuth` - authentication is critical
2. Test `usePageData` - core data management hook
3. Test `PayPalCheckout` - payment handling requires high reliability
4. Fix commented-out tests in existing test files
5. Add tests for `Input` component - foundational form element

By following this roadmap, the codebase can achieve 80% coverage within 8 weeks, significantly improving reliability and maintainability.
