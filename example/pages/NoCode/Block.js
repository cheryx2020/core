
import React, { useEffect, useState } from 'react';
import { executeAction, hashCode } from './utils';

const Block = React.memo(({ config, context = {}, isPreview = false, onSelect, selectedBlockId }) => {
  const {
    type = 'div',
    content,
    html,
    className,
    style,
    styleTagContent,
    id,
    title,
    hidden,
    tabIndex,
    dataAttributes = {},
    ariaAttributes = {},
    role,
    onClickAction,
    onMouseEnterAction,
    onMouseLeaveAction,
    showIf,
    hideIf,
    contentFromState,
    blocks = [],
    customProps = {},
  } = config || {};

  const [elementRef, setElementRef] = useState(null);

  const shouldShow = React.useMemo(() => {
    if (showIf) {
      const [stateKey, stateValue] = showIf.split(':');
      return context.state?.[stateKey] === stateValue;
    }
    if (hideIf) {
      const [stateKey, stateValue] = hideIf.split(':');
      return context.state?.[stateKey] !== stateValue;
    }
    return true;
  }, [showIf, hideIf, context.state]);

  const dynamicContent = contentFromState ? context.state?.[contentFromState] : content;

  useEffect(() => {
    if (styleTagContent) {
      const styleId = `style-${id || hashCode(styleTagContent)}`;
      const existingTag = document.getElementById(styleId);
      if (existingTag && existingTag.textContent === styleTagContent) return;
      if (existingTag) existingTag.textContent = styleTagContent;
      
      if (!existingTag) {
        const styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.textContent = styleTagContent;
        document.head.appendChild(styleTag);
      }
    }
  }, [styleTagContent, id]);

  if (!shouldShow) return null;

  const dataProps = Object.entries(dataAttributes).reduce((acc, [key, value]) => {
    acc[`data-${key}`] = value;
    return acc;
  }, {});

  const ariaProps = Object.entries(ariaAttributes).reduce((acc, [key, value]) => {
    acc[`aria-${key}`] = value;
    return acc;
  }, {});

  let finalClassName = className;
  if (className && context.state) {
    finalClassName = className.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return context.state[key] || '';
    });
  }

  const handleClick = (e) => {
    if (isPreview && onSelect) {
      e.stopPropagation();
      onSelect(config);
    }
    if (onClickAction && !isPreview) executeAction(onClickAction, elementRef, context);
  };

  const isSelected = selectedBlockId === id;

  const props = {
    id,
    className: `${finalClassName || ''} ${isSelected ? 'builder-selected' : ''}`.trim(),
    style: {
      ...style,
      ...(isPreview ? { cursor: 'pointer', position: 'relative' } : {}),
      ...(isSelected ? { outline: '2px solid #667eea', outlineOffset: '2px' } : {})
    },
    title,
    hidden,
    tabIndex,
    role,
    ref: setElementRef,
    onClick: handleClick,
    onMouseEnter: onMouseEnterAction && !isPreview ? (e) => executeAction(onMouseEnterAction, elementRef, context) : undefined,
    onMouseLeave: onMouseLeaveAction && !isPreview ? (e) => executeAction(onMouseLeaveAction, elementRef, context) : undefined,
    ...dataProps,
    ...ariaProps,
    ...customProps,
  };

  Object.keys(props).forEach(key => {
    if (props[key] === undefined) delete props[key];
  });

  const renderContent = () => {
    if (html) return <div dangerouslySetInnerHTML={{ __html: html }} />;
    return (
      <>
        {dynamicContent}
        {blocks.length > 0 && blocks.map((block) => (
          <SafeBlock 
            key={block.id} 
            config={block} 
            context={context}
            isPreview={isPreview}
            onSelect={onSelect}
            selectedBlockId={selectedBlockId}
          />
        ))}
      </>
    );
  };

  return React.createElement(type, props, renderContent());
});

const SafeBlock = ({ config, ...props }) => {
  try {
    return <Block config={config} {...props} />;
  } catch (error) {
    return <div className="error-block">Block failed to render</div>;
  }
};


export default SafeBlock;