/**
 * @file This file contains JSDoc type definitions for the core data structures
 * used throughout the application, such as Site, Page, and BlockConfig.
 * This provides type-hinting and autocompletion in a JavaScript environment.
 */

/**
 * Represents the CSS properties for a React element.
 * @typedef {import('react').CSSProperties} CSSProperties
 */

/**
 * The core configuration object for any renderable block on a page.
 * This structure is recursive, allowing for nested layouts.
 *
 * @typedef {object} BlockConfig
 * @property {string} id - A unique identifier for the block.
 * @property {string} type - The HTML tag name to be rendered (e.g., 'div', 'h1', 'p', 'img').
 * @property {string} [content] - The inner text content of the block. Ignored if 'html' or 'blocks' are present.
 * @property {string} [html] - Raw HTML content to be dangerously set inside the block.
 * @property {string} [className] - CSS class names to apply to the element.
 * @property {CSSProperties} [style] - Inline CSS styles to apply to the element.
 * @property {string} [styleTagContent] - A string of CSS rules to be injected into a <style> tag in the document's <head>.
 * @property {string} [title] - The global 'title' attribute (tooltip).
 * @property {boolean} [hidden] - The global 'hidden' attribute.
 * @property {number} [tabIndex] - The global 'tabIndex' attribute.
 * @property {Record<string, string>} [dataAttributes] - An object of `data-*` attributes. Keys are suffixes (e.g., `{ 'id': '123' }` becomes `data-id="123"`).
 * @property {Record<string, string>} [ariaAttributes] - An object of `aria-*` attributes.
 * @property {string} [role] - The ARIA 'role' attribute.
 * @property {string} [onClickAction] - A string defining an action to execute on click (e.g., 'alert:Hello').
 * @property {string} [onMouseEnterAction] - An action to execute on mouse enter.
 * @property {string} [onMouseLeaveAction] - An action to execute on mouse leave.
 * @property {string} [showIf] - A condition for conditionally rendering the block based on context state (e.g., 'isModalOpen:true').
 * @property {string} [hideIf] - A condition for conditionally hiding the block based on context state.
 * @property {string} [contentFromState] - A key to pull dynamic content from the context state.
 * @property {BlockConfig[]} [blocks] - An array of child BlockConfig objects to be rendered inside this block.
 * @property {Record<string, any>} [customProps] - Any other props to be spread onto the element (e.g., `src`, `alt` for `<img>`).
 */

/**
 * Defines the structure for a single page within a site.
 *
 * @typedef {object} Page
 * @property {string} id - Unique identifier for the page.
 * @property {string} name - The display name of the page (e.g., 'About Us').
 * @property {string} slug - The URL path for the page (e.g., '/about-us').
 * @property {boolean} isHomepage - True if this is the site's main page.
 * @property {string} templateKey - Identifier for the template used.
 * @property {BlockConfig} config - The root BlockConfig object that defines the entire layout and content of the page.
 */

/**
 * Defines the structure for an entire site.
 *
 * @typedef {object} Site
 * @property {string} _id - The unique database ID of the site.
 * @property {string} domain - The domain name associated with the site.
 * @property {string} name - The display name of the site.
 * @property {Page[]} pages - An array of Page objects belonging to the site.
 * @property {boolean} published - The publication status of the site.
 * @property {string} createdAt - ISO date string of when the site was created.
 * @property {string} updatedAt - ISO date string of the last update.
 * @property {Record<string, any>} [settings] - A key-value store for site-wide settings.
 */

/**
 * A generic structure for API responses.
 * @template T
 * @typedef {object} ApiResponse
 * @property {boolean} success - Indicates if the API call was successful.
 * @property {T} data - The data payload of the response.
 * @property {string} [message] - An optional message from the server.
 * @property {object} [pagination] - Optional pagination details.
 * @property {number} pagination.page
 * @property {number} pagination.limit
 * @property {number} pagination.total
 * @property {number} pagination.pages
 */

// This empty export statement is a common pattern to ensure the file is treated
// as a module by JavaScript bundlers and tools, which can help prevent
// potential global scope conflicts with the JSDoc type names.
export {};