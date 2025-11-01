/**
 * A component for editing a website's theme.
 * The theme is a single string (often CSS or a JSON object of styles)
 * associated with a domain.
 *
 * @param {{ domain: string }} props
 * @param {string} props.domain The domain for which to edit the theme (e.g., 'cheryx.com').
 */
export default function ThemeEditor({ domain }: {
    domain: string;
}): React.JSX.Element;
import React from "react";
