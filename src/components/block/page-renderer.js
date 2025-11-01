import React from 'react';
import Block from './block';
import './types.js';

/**
 * Renders a full page configuration using the Block component.
 * @param {{
 *  config: import('./types.js').BlockConfig;
 * }} props
 * @returns {React.ReactElement}
 */
const PageRenderer = ({ config }) => {
    if (!config) {
        return <div>Error: No page configuration provided.</div>;
    }
    
    // The root of the config is passed to the Block component,
    // which will then recursively render all its children ('blocks').
    return <Block config={config} />;
};

export default PageRenderer;