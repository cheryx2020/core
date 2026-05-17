# @cheryx2020/core Knowledge Base

Last reviewed: 2026-05-17

## Package Summary

`@cheryx2020/core` is a React component library for Cheryx content, pattern, admin, commerce, and page-building experiences. It ships JavaScript React components, SCSS/CSS module styles, generated TypeScript declarations, and an example Next.js app.

The package is published from `dist/` only:

- Runtime entry: `dist/index.js`
- Module entry: `dist/index.js`
- Types entry: `dist/index.d.ts`
- Published files: `dist`
- Source entry: `index.js`
- Current package version in `package.json`: `1.8.0`
- License: MIT

The source is JavaScript, not TypeScript. TypeScript is used only to emit declarations from JS files.

## Tech Stack

| Area | Current Choice |
| --- | --- |
| UI framework | React, peer range `^18.0.0 || ^19.0.0` |
| Bundler | Rollup 4 |
| Transpiler | Babel 7 with `@babel/preset-env`, `@babel/preset-react`, and transform runtime |
| Styling | SCSS modules with PostCSS/autoprefixer; some components also use inline styles |
| Types | TypeScript declaration generation from JS, `strict: false` |
| Tests | Jest 29, jsdom, Testing Library |
| Release | semantic-release on pushes to `main` |
| Demo app | Next.js 12 app in `example/` |

## Repository Map

| Path | Purpose |
| --- | --- |
| `index.js` | Root barrel export for all public package APIs. |
| `src/components/` | Main component library. Most components are one folder with a `.js` component and `.module.scss` stylesheet. |
| `src/layouts/` | `MainLayout`, `DetailLayout`, and `DashboardLayout`. |
| `src/utils/` | Page rendering utilities, component definitions, and generic div rendering. |
| `hooks/` | `useAuthenticate`, `useIsMobile`, and `usePageData`. |
| `hocs/` | `withAuth` route protection HOC. |
| `__tests__/` | Top-level Jest tests for shared components/features. |
| `example/` | Next.js playground/dashboard for manually testing components. |
| `dist/` | Generated package output. Do not edit by hand. |
| `.github/workflows/github-actions.yml` | CI, package build, tests, semantic release. |

## Public Exports

All public exports are named exports from `index.js`.

### Layouts

- `MainLayout`
- `DetailLayout`
- `DashboardLayout`
- `DashboardWrapper`

### Admin and Page-Building

- `AdminMenu`
- `Page`
- `PageManager`
- `PageItem`
- `LayoutEditor`
- `ThemeEditor`
- `FileExplorer`
- `JsonEditor`
- `Block`
- `MenuAddComponentPost`
- `POST_ITEM_TYPE`
- `POST_ITEM_TYPE_SUBMENU`
- `IMAGE_SUBMENU`

### Content and Pattern Components

- `PostEditor`
- `PostContent`
- `uploadContentImageFiles`
- `noImageUrl`
- `getPostId`
- `MultiImageConfig`
- `TipArticle`
- `TipDetail`
- `PatternDetail`
- `PatternItem`
- `PatternList`
- `PatternName`
- `PatternPreview`
- `KnitPatternVisualizer`
- `ListArticle`

### UI, Media, Navigation, and Commerce

- `AdBanner`
- `BestSeller`
- `CheryxLogo`
- `CircleGroup`
- `CircularLoader`
- `Compress`
- `ContentWithTitle`
- `DashboardItem`
- `Footer`
- `Form`
- `HeaderCheryx`
- `HeaderPage`
- `HeaderWithImage`
- `ImageUpload`
- `ImageUploadable`
- `Input`
- `LeftMenu`
- `Loader`
- `Note`
- `PayPalCheckout`
- `PostVideo`
- `RelatedToMenu`
- `SubLink`
- `Table`
- `TitleCheryx`
- `TitleLink`
- `YouTubeSubscribe`
- `gtag`

### Hooks and HOCs

- `useAuthenticate`
- `useIsMobile`
- `usePageData`
- `CIRCLE_IMAGE`
- `withAuth`

## Build, Test, and Release

Use npm scripts from the package root.

```bash
npm run rollup
npm test
npm run semantic-release
```

Important details:

- There is no `build` script in the root `package.json`; the real build script is `rollup`.
- `npm run rollup` runs Rollup and then `npm run build:types`.
- `build:types` runs `tsc` with `emitDeclarationOnly`.
- Rollup outputs ES modules into `dist/` and extracts CSS.
- Global styles from `src/components/styles/*.scss` are copied into `dist/styles`.
- Jest runs through `node --experimental-vm-modules node_modules/jest/bin/jest.js --config=jest.config.mjs --coverage`.
- CI uses Node `24.10.0`, `npm ci`, `npm run rollup`, and `npm test`.
- semantic-release publishes from `main`, updates `CHANGELOG.md`, updates `package.json`, creates GitHub releases, and publishes to npm.

## Runtime Assumptions

This package is browser-first and client-side heavy.

- Many components directly access `window`, `document`, `navigator`, `localStorage`, `location`, `File`, `FormData`, and DOM APIs.
- Consumers using Next.js should render most interactive components as client components.
- The package does not provide server components, server actions, SSR data loaders, or a global state store.
- Routing is injected by consumers through props such as `router`, `useRouter`, `Link`, `Image`, `Head`, and `NextSeo`.
- Some components have default mock wrappers so they can render outside Next.js, but production use generally expects Next.js-like primitives.

## Styling Conventions

- Component folders are usually kebab-case, for example `pattern-list/`.
- Component files are usually kebab-case, for example `pattern-list.js`.
- SCSS module files are often PascalCase, for example `PatternList.module.scss`.
- Generated style declaration files are checked in as `.module.scss.d.ts`.
- Rollup uses `rollup-plugin-postcss-modules` with extracted/minimized CSS and generated definitions.
- Consumers normally need to import the package CSS from the built package.

Expected consumer import:

```js
import "@cheryx2020/core/dist/index.css";
```

## Data and API Model

API access is centralized through `APIService` from `@cheryx2020/api-service`. The library does not define a backend client interface of its own, so endpoint strings are embedded in components.

Common endpoint families found in source:

| Feature | Endpoints |
| --- | --- |
| Pages | `page`, `page/domains`, `page/languages`, `page/pages`, `page/page-content`, `page/page`, `page/publish-status` |
| Layouts | `layout`, `layout/ids` |
| Theme | `theme` |
| Patterns | `add-pattern`, `edit-pattern`, `remove-pattern`, caller-supplied pattern list API |
| Posts | `list-post`, `post`, `create-post`, `edit-post`, `delete-post`, `posts/:id` |
| Files | `v2/file/files`, `v2/file/files/details`, `v2/image/upload` |
| Commerce | `verify-order` |
| Banner | `banner` |
| Email | `email-subscriptions/subscribe` |

Several components accept API route props, so consumers can override parts of this behavior:

- `PatternItem`: `apiDelete`, `apiEdit`, `apiAdd`
- `PatternList`: `api`
- `Table`: `listApi`, `addApi`, `editApi`, `deleteApi`, `listDataPath`
- `AdminMenu` plus `usePageData`: `saveAPI`, `saveBodyDataKey`

## Authentication

Auth is token-based and localStorage-backed.

- Token key: `accessToken`
- Verification utility: `verifyToken` from `@cheryx2020/utils`
- `useAuthenticate` returns `{ isAuth }`; it initializes as false and flips true only after verification.
- `withAuth` renders nothing until verified and redirects to `/` on missing or invalid tokens.
- `DashboardLayout` checks the token and only renders children once verified.

Maintenance note: auth code directly reads `localStorage`, so it must run in the browser.

## Page Builder Model

The page system renders persisted page content arrays through `Page` and `PageItem`.

`Page` responsibilities:

- Determines mobile state with `useIsMobile`.
- Determines admin access with `useAuthenticate`.
- Wires save/edit behavior through `usePageData`.
- Renders page items inside `MainLayout`.

`PageItem` maps `data.id` values to components:

- `ADMIN_MENU`
- `BEST_SELLER`
- `paterns-circle-images` via `CIRCLE_IMAGE`
- `NOTE`
- `PATTERN_LIST`
- `TITLE`
- `DIV`
- `ContentWithTitle`
- `LIST_ARTICLE`

`src/utils/component-definition.js` contains the editor-facing defaults for these page item types.

`usePageData` saves page content to `page` as multipart form data. It tracks image URL replacements in `urlChanges`, sends `removedImages`, `content`, `language`, and `domain`, then calls `router.reload()`.

## Major Components

### `Compress`

`Compress` is a browser FFmpeg UI. The consumer provides:

- `FFmpeg`
- `fetchFile`
- `coreURL`
- `wasmURL`

Current modes:

- `Compress.CompressType.COMPRESS`
- `Compress.CompressType.GIF`
- `Compress.CompressType.CONVERT`
- `Compress.CompressType.AUDIO`
- `Compress.CompressType.CUSTOM`

Current capabilities:

- Video compression and conversion.
- GIF generation with two-pass palette workflow.
- Audio extraction/conversion.
- Output presets and advanced options through `OptionsPanel`.
- Generated command previews through `onCommandPreview`.
- Progress, elapsed time, estimated remaining time, error panel, FFmpeg log details, download, share, recompress, and reset.

Related files:

- `src/components/compress/compress.js`
- `src/components/compress/ffmpeg-options.js`
- `src/components/compress/command-builder.js`
- `src/components/compress/options-panel.js`
- `src/components/compress/README.md`
- `PLAN_FFMPEG_FULL_OPTIONS.md`

### `Block`

`Block` is a config-driven renderer for nested HTML-like blocks. It supports:

- Dynamic element type via `config.type`.
- Nested `blocks`.
- `html` with `dangerouslySetInnerHTML`.
- State-based visibility through `showIf` and `hideIf`.
- State interpolation in class names.
- Action execution through `executeAction`.
- Preview selection with `onSelect` and `selectedBlockId`.
- `SafeBlock` wrapper to prevent a bad block from taking down the whole render.

### `PostContent`

`PostContent` and helpers in `postUtils.js` implement the article/content editor. It uses content item types such as title, headers, paragraph, related topic, subscribe CTA, image groups, video, ads, pattern preview, pattern detail, and group content.

Important traits:

- Heavy use of `contentEditable`.
- Drag/drop ordering helpers.
- Direct selection and DOM access.
- Upload integration via `uploadFile` from `@cheryx2020/utils`.
- Image upload paths rely on `NEXT_PUBLIC_publicImagesPath`.

### `PageManager`, `LayoutEditor`, and `ThemeEditor`

These are admin/editor tools that manage page content, layout records, images, publish status, and theme values against the backend API. They expect domain/language inputs and rely on `APIService`.

### `FileExplorer`

`FileExplorer` browses backend files through `v2/file/files`, stores view preferences in localStorage, supports detail loading and deletion, and builds public URLs with `NEXT_PUBLIC_apiBaseUrl`.

### `Table`

`Table` is a generic CRUD table. It fetches data from `listApi`, extracts it with `getValueObjectByPath`, renders visible `formFields`, and submits multipart `FormData` for add/edit.

## Environment Variables and Browser Storage

Environment variables referenced by components:

- `NEXT_PUBLIC_pageUrl`
- `NEXT_PUBLIC_publicImagesPath`
- `NEXT_PUBLIC_language`
- `NEXT_PUBLIC_PRE_TIP`
- `NEXT_PUBLIC_apiBaseUrl`

Browser storage keys:

- `accessToken`
- `orderedPattern`
- `closedBannerAt`
- `fileExplorerSortOrder`
- `fileExplorerViewMode`
- Dynamic keys from `saveBodyDataKey`, for example `menuData`

Analytics:

- `gtag.js` hardcodes GA tracking ID `G-E1RDMRRT6L`.
- `Compress` logs events directly to `window.gtag` when available.

## Example App

The `example/` app is a Next.js 12 playground with routes for many components:

- `AdminMenu`
- `BestSeller`
- `ImageUploadable`
- `PatternItem`
- `PayPalCheckout`
- `KnitPatternVisualizer`
- `MenuAddComponentPost`
- `PageManager`
- `PostEditor`
- `LayoutEditor`
- `FileExplorer`
- `GenericDivPage`
- `BlockBuilder`

Run it from `example/`:

```bash
npm install
npm run dev
```

The example package currently declares `@cheryx2020/core` as a dependency, but many example pages import from the local repository root. Check individual pages before assuming the published package is what the demo is exercising.

## Tests

Test files currently cover:

- `Compress` rendering, modes, FFmpeg processing paths, errors, download/share/recompress/reset, and details.
- `Table` missing props, valid fields, and add form behavior.
- `PatternPreview` email subscription UI.
- `PatternDetail` basic rendering for admin/non-admin.
- `PostContent` item factories, rendering, editing, drag/drop, image changes, captions, resize, pattern changes, and group changes.
- `onChangeImage`.
- `uploadContentImageFiles`.

Run all tests:

```bash
npm test
```

Potential test maintenance issue: several tests mock browser-only behavior. When changing DOM-heavy components, expect to update jsdom mocks for APIs like `window.confirm`, `navigator.share`, `URL.createObjectURL`, file APIs, and FFmpeg stubs.

## Known Maintenance Risks

| Risk | Why It Matters |
| --- | --- |
| Browser globals are used widely | Components can fail during SSR or in tests unless guarded or rendered client-side. |
| Source is JS with loose generated declarations | Type declarations can exist even when source contracts are ambiguous. |
| API routes are embedded in components | Backend route changes require source edits unless routes are already configurable by prop. |
| Styling is mixed | CSS modules, global copied SCSS, inline styles, and Bootstrap-like class names coexist. |
| `contentEditable` is common | Editor behavior can be fragile across browsers and test environments. |
| Package has both `package-lock.json` and `yarn.lock` | Prefer npm for CI consistency unless the project standard changes. |
| `dist/` exists in the repo | Treat it as generated output; source changes require rebuilding. |
| README build command is stale | README mentions `yarn build`, but the root package script is `npm run rollup`. |

## Safe Change Checklist

When modifying this package:

1. Update source files under `src/`, `hooks/`, `hocs/`, or `index.js`.
2. If adding public APIs, export them from `index.js`.
3. Add or update focused Jest tests for changed behavior.
4. Run `npm test`.
5. Run `npm run rollup` before publishing or validating generated output.
6. Verify `dist/index.d.ts` if public props or exports changed.
7. For browser-only code, guard `window`, `document`, `navigator`, and `localStorage` access when feasible.
8. For API changes, document the endpoint and request/response assumptions near the component or in this KB.

## Quick Prompts for Future Work

Use these prompts to quickly reorient a future agent or developer:

```text
Refer to KNOWLEDGE_BASE.md for package structure, exports, runtime assumptions, API endpoints, and maintenance risks before changing @cheryx2020/core.
```

```text
When changing a public component, check index.js exports, update tests, and run npm test plus npm run rollup.
```
