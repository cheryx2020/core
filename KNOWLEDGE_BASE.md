# @cheryx2020/core Knowledge Base

## 1. Tech Stack

- **Framework:** React 18+ (peer dependency supports 18.x and 19.x)
- **Routing:** None (library package); consumers use Next.js routing
- **Rendering model:** Client-side only; no SSR/SSG within library
- **State management:** Local component state via `useState`; no Redux/Zustand
- **Styling:** CSS Modules (`.module.scss`) with SCSS; some legacy styled-jsx
- **Build / tooling:**
  - Bundler: Rollup 4.x (ES module output)
  - Transpiler: Babel 7.x with `@babel/preset-react`, `@babel/preset-env`
  - CSS: PostCSS + Autoprefixer + SCSS (sass 1.66)
  - Types: TypeScript 5.x (declaration generation only, `strict: false`)
  - Testing: Jest 29.x + Testing Library
  - Minification: Terser

## 2. Project Structure

### High-level folder responsibilities

- `/src/components/` — 55+ React components (main library content)
- `/src/layouts/` — 3 layout components: MainLayout, DetailLayout, DashboardLayout
- `/src/utils/` — Utility modules: `page.js`, `component-definition.js`, `generic-div.js`
- `/hooks/` — Custom hooks: `useAuthenticate`, `useIsMobile`, `usePageData`
- `/hocs/` — Higher-order components: `withAuth`
- `/dist/` — Build output (ES modules + CSS + type definitions)
- `/example/` — Next.js 12.x demo application
- `/__tests__/` — Jest test files

### Entry points

- `/index.js` — Barrel export file; exports 60+ components, hooks, utilities
- Build output: `/dist/index.js` (ESM), `/dist/index.css`, `/dist/index.d.ts`

### Shared vs feature-specific code

- Shared: `/src/components/styles/` (globals.scss, variables.scss, mixin.scss)
- Feature-specific: Each component has its own directory with `.js` and `.module.scss`
- External shared packages: `@cheryx2020/api-service`, `@cheryx2020/utils`

## 3. Architectural Patterns

### Data fetching strategy

- All data fetching is client-side via `APIService` from `@cheryx2020/api-service`
- Fetch triggered in `useEffect` hooks on component mount or state change
- No server-side data fetching; no React Query/SWR
- API calls: `APIService.get()`, `APIService.post()`, `APIService.put()`, `APIService.delete()`
- File uploads use `FormData` with `multipart/form-data` headers

### Component patterns

- Functional components only; no class components
- `React.memo()` for expensive components (e.g., Block)
- Props destructuring with defaults in function signature
- Default export per component file
- Inline helper components for forms (e.g., `FormField` in post-editor)
- Conditional rendering via `isEdit`, `isAdmin`, `isPreview` props

### Separation of concerns

- Components: UI rendering and local state
- Hooks: Reusable stateful logic (`usePageData`, `useAuthenticate`, `useIsMobile`)
- HOCs: Cross-cutting concerns (`withAuth` for authentication)
- Utils: Data structures and constants (`COMPONENT_DEFINITIONS`, `PageItem`)

### Client vs server responsibilities

- Library is client-only
- Server interactions via REST API calls to external backend
- Authentication via `localStorage` token + `verifyToken()` utility
- No server components or server actions

## 4. Conventions & Rules

### Naming conventions

- Component directories: kebab-case (`pattern-list/`)
- Component files: kebab-case (`pattern-list.js`)
- SCSS modules: PascalCase (`PatternList.module.scss`)
- Hooks: camelCase with `use` prefix (`usePageData.js`)
- HOCs: camelCase with `with` prefix (`withAuth.js`)
- Constants: SCREAMING_SNAKE_CASE (`CIRCLE_IMAGE`, `POST_ITEM_TYPE`)

### File organization rules

- One component per directory
- Component `.js` file adjacent to its `.module.scss` file
- Test files co-located: `component.test.js` next to `component.js`
- Index exports in `/index.js` at root; no nested barrel files
- Layouts separate from components in `/src/layouts/`

### Coding constraints

- No TypeScript source (`.ts/.tsx`); JavaScript with JSDoc and generated `.d.ts`
- `strict: false` in tsconfig; no strict type checking
- No prop-types validation
- No default exports in barrel file; all named exports
- `"use client"` directive in Block component (Next.js App Router compatibility marker)

## 5. Runtime Behavior

### Rendering behavior

- All components render on client
- Loading states managed locally per component (`loading`, `isLoading` state)
- Edit mode toggled via `isEdit` prop; enables contentEditable, save buttons
- Preview mode via `isPreview` prop in Block component

### Caching strategy

- No built-in caching layer
- localStorage used for:
  - Auth tokens (`accessToken`)
  - UI preferences (`fileExplorerSortOrder`, `fileExplorerViewMode`)
  - Temporary form data (keyed by `saveBodyDataKey`)
  - Banner dismissal timestamps (`closedBannerAt`)

### Feature flags / environment config

- No feature flag system
- Domain-aware via `getDomain()` utility
- Language-aware via `language` prop (default: `"en"`)
- Google Analytics ID hardcoded: `G-E1RDMRRT6L`

## 6. Known Trade-offs & Constraints

### Explicit limitations

- No SSR support; library assumes client-side rendering only
- No global state; complex state must be lifted to consumer app
- No built-in error boundaries except `SafeBlock` wrapper
- TypeScript declarations generated but source is JavaScript
- `strict: false` allows implicit any types

### Performance trade-offs

- No memoization by default except Block component
- No virtualization for lists
- All CSS extracted to single `index.css` file (~116KB)
- No code splitting within library; consumer must handle

### DX trade-offs

- Mixed styling approaches (CSS Modules + inline styles + legacy styled-jsx)
- No Storybook or component documentation
- Tests sparse; only a few `.test.js` files exist
- Example app serves as primary documentation

---

## API Endpoints Reference (from codebase)

- Pattern: `add-pattern`, `edit-pattern`, `remove-pattern`
- Post: `list-post`, `post`, `edit-post`, `create-post`, `delete-post`
- Page: `page`, `page/domains`, `page/languages`, `page/pages`, `page/page-content`
- Layout: `layout`, `layout/ids`
- Theme: `theme`
- File: `v2/file/files`, `v2/image/upload`
- PayPal: `verify-order`
- Banner: `banner`
- Email: `email-subscriptions/subscribe`

---

## Key Component Categories

| Category | Components |
|----------|------------|
| Layouts | MainLayout, DetailLayout, DashboardLayout |
| Admin | AdminMenu, PageManager, LayoutEditor, ThemeEditor, FileExplorer |
| Content | PostEditor, TipDetail, PatternDetail, PatternList, PatternPreview |
| UI | Loader, CircularLoader, Table, Form, Input, Note, Block |
| Media | ImageUpload, ImageUploadable, PostVideo |
| Commerce | PayPalCheckout, BestSeller |
| Navigation | LeftMenu, HeaderCheryx, SubLink, TitleLink |

---

## How to reference this KB in future prompts

> "Refer to the @cheryx2020/core Knowledge Base in KNOWLEDGE_BASE.md for architecture, conventions, and patterns. Do not re-read the codebase unless investigating specific implementation details not covered in the KB."
