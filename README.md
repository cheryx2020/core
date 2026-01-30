# Cheryx Core

A comprehensive React component library featuring 55+ production-ready UI components, layouts, hooks, and utilities for building content-rich web applications. Designed for seamless integration with Next.js projects.

[![npm version](https://img.shields.io/npm/v/@cheryx2020/core.svg)](https://www.npmjs.com/package/@cheryx2020/core)
[![React](https://img.shields.io/badge/React-18.x%20%7C%2019.x-blue.svg)](https://reactjs.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Component Categories](#component-categories)
- [Hooks & HOCs](#hooks--hocs)
- [Development](#development)
- [Architecture Overview](#architecture-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **55+ React Components** — Admin tools, content editors, media handlers, commerce integrations, and more
- **3 Layout Components** — MainLayout, DetailLayout, and DashboardLayout for consistent page structures
- **Custom Hooks** — `useAuthenticate`, `usePageData`, `useIsMobile` for common patterns
- **Higher-Order Components** — `withAuth` for route protection
- **CSS Modules + SCSS** — Scoped styling with SCSS support
- **TypeScript Declarations** — Generated `.d.ts` files for IDE autocompletion
- **React 18 & 19 Support** — Compatible with latest React versions
- **Next.js Optimized** — Works seamlessly with Next.js routing and App Router

---

## Installation

### Using npm

```bash
npm install @cheryx2020/core
```

### Using Yarn

```bash
yarn add @cheryx2020/core
```

### Peer Dependencies

Ensure your project has these peer dependencies installed:

```bash
npm install react react-dom
```

### Required CSS Import

Add the library's stylesheet to your application entry point (`_app.js`, `layout.js`, or equivalent):

```js
import "@cheryx2020/core/dist/index.css";
```

### Optional Dependencies

Some components integrate with external packages. Install as needed:

```bash
# For routing features
npm install next

# For social sharing components
npm install react-share

# For API integration
npm install @cheryx2020/api-service @cheryx2020/utils
```

---

## Quick Start

### Basic Component Usage

```jsx
import { AdminMenu, PatternList, Footer } from "@cheryx2020/core";

function MyPage() {
  return (
    <div>
      <AdminMenu
        text="Page Options"
        onSaveClick={() => console.log("Saved!")}
        onEditClick={() => console.log("Editing...")}
        onCancelClick={() => console.log("Cancelled")}
        onPreviewClick={() => console.log("Preview")}
      />

      <PatternList
        data={patterns}
        isEdit={false}
      />

      <Footer />
    </div>
  );
}
```

### Using Hooks

```jsx
import { useAuthenticate, useIsMobile } from "@cheryx2020/core";

function ProtectedContent() {
  const { isAuth, isLoading } = useAuthenticate();
  const isMobile = useIsMobile();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuth) return <div>Please log in</div>;

  return (
    <div style={{ padding: isMobile ? "10px" : "40px" }}>
      <h1>Welcome!</h1>
    </div>
  );
}
```

### Using HOCs

```jsx
import { withAuth } from "@cheryx2020/core";

function AdminDashboard() {
  return <div>Admin Content</div>;
}

export default withAuth(AdminDashboard);
```

---

## Component Categories

| Category | Components | Description |
|----------|------------|-------------|
| **Layouts** | `MainLayout`, `DetailLayout`, `DashboardLayout` | Page structure templates |
| **Admin** | `AdminMenu`, `PageManager`, `LayoutEditor`, `ThemeEditor`, `FileExplorer` | Content management tools |
| **Content** | `PostEditor`, `TipDetail`, `PatternDetail`, `PatternList`, `PatternPreview` | Article and pattern display |
| **UI** | `Loader`, `CircularLoader`, `Table`, `Form`, `Input`, `Note`, `Block` | Core interface elements |
| **Media** | `ImageUpload`, `ImageUploadable`, `PostVideo` | File and media handling |
| **Commerce** | `PayPalCheckout`, `BestSeller` | Payment and product features |
| **Navigation** | `LeftMenu`, `HeaderCheryx`, `SubLink`, `TitleLink`, `Footer` | Site navigation elements |

### Full Component List

<details>
<summary>View all 55+ components</summary>

**Layouts:** MainLayout, DetailLayout, DashboardLayout

**Admin Tools:** AdminMenu, PageManager, LayoutEditor, ThemeEditor, FileExplorer, JsonEditor

**Content:** PostEditor, PostContent, TipDetail, TipArticle, PatternDetail, PatternList, PatternPreview, PatternItem, PatternName, Block, Note

**Forms & Inputs:** Form, Input, Table, ImageUpload, ImageUploadable

**Navigation:** LeftMenu, LeftSideMenu, HeaderCheryx, HeaderPage, HeaderWithImage, SubLink, TitleLink, RelatedToMenu, LinksIcon, MySocialLink

**UI Elements:** Loader, CircularLoader, DashboardItem, DashboardWrapper, ContentWithTitle, TagWithText, CircleGroup, CherryxLogo, TitleCheryx2, Title

**Media:** PostVideo, Compress

**Commerce:** PayPalCheckout, BestSeller, SubcribeButton

**Utilities:** PageItem, GenericDiv

</details>

---

## Hooks & HOCs

### Hooks

| Hook | Purpose |
|------|---------|
| `useAuthenticate` | Manages authentication state via localStorage token |
| `usePageData` | Handles page data fetching and form submission |
| `useIsMobile` | Detects mobile viewport for responsive layouts |

### Higher-Order Components

| HOC | Purpose |
|-----|---------|
| `withAuth` | Wraps components requiring authentication; redirects if unauthorized |

---

## Development

### Running the Example Application

The library includes a Next.js demo app showcasing all components:

```bash
# Clone the repository
git clone https://github.com/cheryx2020/core.git
cd core

# Install dependencies
yarn install

# Start the example app
cd example
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to explore components.

### Building the Library

```bash
# Build ES modules + CSS + TypeScript declarations
yarn build
```

Output files:
- `dist/index.js` — ES module bundle
- `dist/index.css` — Compiled styles
- `dist/index.d.ts` — TypeScript declarations

### Running Tests

```bash
# Run tests with coverage
yarn test

# Run tests in watch mode
yarn test --watch
```

---

## Architecture Overview

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x / 19.x | UI framework |
| Rollup | 4.x | Module bundler |
| Babel | 7.x | Transpilation |
| SCSS | 1.66+ | Styling |
| TypeScript | 5.x | Type declarations |
| Jest | 29.x | Testing |

### Project Structure

```
core/
├── src/
│   ├── components/     # 55+ React components
│   ├── layouts/        # Layout components
│   └── utils/          # Utility functions
├── hooks/              # Custom React hooks
├── hocs/               # Higher-order components
├── example/            # Next.js demo app
├── dist/               # Build output
└── __tests__/          # Test files
```

### Key Conventions

- **Styling:** CSS Modules with SCSS (`.module.scss`)
- **Naming:** kebab-case directories, PascalCase components
- **Exports:** Named exports via barrel file (`index.js`)
- **Rendering:** Client-side only; no SSR within library

For detailed architecture documentation, see [KNOWLEDGE_BASE.md](./KNOWLEDGE_BASE.md).

---

## Contributing

We welcome contributions to improve Cheryx Core.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with clear commit messages
4. Ensure tests pass (`yarn test`)
5. Submit a pull request

### Development Guidelines

- Follow existing naming conventions (kebab-case directories, PascalCase components)
- Co-locate test files with components (`component.test.js`)
- Use CSS Modules for styling (`.module.scss`)
- Add examples to the demo app for new components

---

## License

Cheryx Core is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

## Support

- **Issues:** [GitHub Issues](https://github.com/cheryx2020/core/issues)
- **Documentation:** See the example app and [KNOWLEDGE_BASE.md](./KNOWLEDGE_BASE.md)

---

## Related Packages

- [@cheryx2020/api-service](https://www.npmjs.com/package/@cheryx2020/api-service) — API client utilities
- [@cheryx2020/utils](https://www.npmjs.com/package/@cheryx2020/utils) — Shared utility functions
