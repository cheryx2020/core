/**
 * Represents the CSS properties for a React element.
 */
export type CSSProperties = import("react").CSSProperties;
/**
 * The core configuration object for any renderable block on a page.
 * This structure is recursive, allowing for nested layouts.
 */
export type BlockConfig = {
    /**
     * - A unique identifier for the block.
     */
    id: string;
    /**
     * - The HTML tag name to be rendered (e.g., 'div', 'h1', 'p', 'img').
     */
    type: string;
    /**
     * - The inner text content of the block. Ignored if 'html' or 'blocks' are present.
     */
    content?: string | undefined;
    /**
     * - Raw HTML content to be dangerously set inside the block.
     */
    html?: string | undefined;
    /**
     * - CSS class names to apply to the element.
     */
    className?: string | undefined;
    /**
     * - Inline CSS styles to apply to the element.
     */
    style?: import("react").CSSProperties | undefined;
    /**
     * - A string of CSS rules to be injected into a <style> tag in the document's <head>.
     */
    styleTagContent?: string | undefined;
    /**
     * - The global 'title' attribute (tooltip).
     */
    title?: string | undefined;
    /**
     * - The global 'hidden' attribute.
     */
    hidden?: boolean | undefined;
    /**
     * - The global 'tabIndex' attribute.
     */
    tabIndex?: number | undefined;
    /**
     * - An object of `data-*` attributes. Keys are suffixes (e.g., `{ 'id': '123' }` becomes `data-id="123"`).
     */
    dataAttributes?: Record<string, string> | undefined;
    /**
     * - An object of `aria-*` attributes.
     */
    ariaAttributes?: Record<string, string> | undefined;
    /**
     * - The ARIA 'role' attribute.
     */
    role?: string | undefined;
    /**
     * - A string defining an action to execute on click (e.g., 'alert:Hello').
     */
    onClickAction?: string | undefined;
    /**
     * - An action to execute on mouse enter.
     */
    onMouseEnterAction?: string | undefined;
    /**
     * - An action to execute on mouse leave.
     */
    onMouseLeaveAction?: string | undefined;
    /**
     * - A condition for conditionally rendering the block based on context state (e.g., 'isModalOpen:true').
     */
    showIf?: string | undefined;
    /**
     * - A condition for conditionally hiding the block based on context state.
     */
    hideIf?: string | undefined;
    /**
     * - A key to pull dynamic content from the context state.
     */
    contentFromState?: string | undefined;
    /**
     * - An array of child BlockConfig objects to be rendered inside this block.
     */
    blocks?: BlockConfig[] | undefined;
    /**
     * - Any other props to be spread onto the element (e.g., `src`, `alt` for `<img>`).
     */
    customProps?: Record<string, any> | undefined;
};
/**
 * Defines the structure for a single page within a site.
 */
export type Page = {
    /**
     * - Unique identifier for the page.
     */
    id: string;
    /**
     * - The display name of the page (e.g., 'About Us').
     */
    name: string;
    /**
     * - The URL path for the page (e.g., '/about-us').
     */
    slug: string;
    /**
     * - True if this is the site's main page.
     */
    isHomepage: boolean;
    /**
     * - Identifier for the template used.
     */
    templateKey: string;
    /**
     * - The root BlockConfig object that defines the entire layout and content of the page.
     */
    config: BlockConfig;
};
/**
 * Defines the structure for an entire site.
 */
export type Site = {
    /**
     * - The unique database ID of the site.
     */
    _id: string;
    /**
     * - The domain name associated with the site.
     */
    domain: string;
    /**
     * - The display name of the site.
     */
    name: string;
    /**
     * - An array of Page objects belonging to the site.
     */
    pages: Page[];
    /**
     * - The publication status of the site.
     */
    published: boolean;
    /**
     * - ISO date string of when the site was created.
     */
    createdAt: string;
    /**
     * - ISO date string of the last update.
     */
    updatedAt: string;
    /**
     * - A key-value store for site-wide settings.
     */
    settings?: Record<string, any> | undefined;
};
/**
 * A generic structure for API responses.
 */
export type ApiResponse<T> = {
    /**
     * - Indicates if the API call was successful.
     */
    success: boolean;
    /**
     * - The data payload of the response.
     */
    data: T;
    /**
     * - An optional message from the server.
     */
    message?: string | undefined;
    /**
     * - Optional pagination details.
     */
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    } | undefined;
};
