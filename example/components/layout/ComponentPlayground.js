import React from 'react';

/**
 * A reusable layout for showcasing a component and its properties.
 *
 * @param {object} props
 * @param {React.ReactNode} props.preview - The component to display in the preview panel.
 * @param {React.ReactNode} props.controls - The controls/properties for the component.
 * @param {string} [props.title] - An optional title to display at the top of the page.
 * @param {'Column'} [props.layout] - Optional. If set to 'Column', the layout will always be a vertical stack. 
 *                                     Otherwise, it defaults to a responsive row on large screens.
 */
const ComponentPlayground = ({ preview, controls, title, layout }) => {
  // Determine if the forced column layout should be used
  const isColumnLayout = layout === 'Column';

  return (
    // Main container for the entire page
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {title && (
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          {title}
        </h1>
      )}

      {/* 
        Flex container for the two columns.
        The classes for flex-direction and alignment are now conditional.
      */}
      <div 
        className={`
          flex justify-center gap-8
          ${isColumnLayout 
            ? 'flex-col items-center' 
            : 'flex-col lg:flex-row items-center lg:items-start'
          }
        `}
      >
        
        {/* Preview Panel */}
        {/* 
          When in column layout, we can allow the preview to be wider.
          We'll use max-w-4xl for Column layout, and max-w-md for the default.
        */}
        <div 
          className={`
            w-full bg-white p-6 rounded-lg shadow-lg
            ${isColumnLayout ? '' : 'max-w-md'}
          `}
        >
          {preview}
        </div>

        {/* Controls Panel */}
        <div 
          className={`
            w-full bg-white p-6 rounded-lg shadow-lg
            ${isColumnLayout ? 'max-w-4xl' : 'max-w-md'}
          `}
        >
          {controls}
        </div>
        
      </div>
    </div>
  );
};

export default ComponentPlayground;