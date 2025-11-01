/**
 * A component for editing website layout configurations.
 * It fetches and manages layout data based on the provided domain and language.
 *
 * @param {{ domain: string, language: string }} props
 * @param {string} props.domain The domain for which to edit the layout (e.g., 'cheryx.com').
 * @param {string} props.language The language code for the layout (e.g., 'en').
 */
export default function LayoutEditor({ domain, language }: {
    domain: string;
    language: string;
}): React.JSX.Element;
import React from "react";
