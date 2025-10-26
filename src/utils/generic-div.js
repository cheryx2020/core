import React, { useEffect, useState } from 'react';

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

const executeAction = (action, element) => {
  if (!action) return;

  const [type, ...params] = action.split(':');
  const param = params.join(':');

  switch (type) {
    case 'alert':
      alert(param);
      break;
    case 'console':
      console.log(param);
      break;
    case 'toggle-class':
      element?.classList.toggle(param);
      break;
    case 'add-class':
      element?.classList.add(param);
      break;
    case 'remove-class':
      element?.classList.remove(param);
      break;
    default:
      console.warn(`Unknown action type: ${type}`);
  }
};

const GenericDiv = ({ config }) => {
  const {
    content,
    children,
    html,
    
    className,
    style,
    styleTagContent,
    
    id,
    key,
    
    title,
    lang,
    dir,
    hidden,
    tabIndex,
    draggable,
    
    dataAttributes = {},
    
    ariaAttributes = {},
    role,
    
    onClick,
    onDoubleClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    
    onClickAction,
    onMouseEnterAction,
    onMouseLeaveAction,
    
    nestedElements = [],
    
    customProps = {},
  } = config || {};

  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    if (styleTagContent) {
      const styleId = `style-${id || hashCode(styleTagContent)}`;
      
      if (document.getElementById(styleId)) return;
      
      const styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.textContent = styleTagContent;
      document.head.appendChild(styleTag);
      
      return () => {
        const existingTag = document.getElementById(styleId);
        if (existingTag && document.head.contains(existingTag)) {
          document.head.removeChild(existingTag);
        }
      };
    }
  }, [styleTagContent, id]);

  const dataProps = Object.entries(dataAttributes).reduce((acc, [key, value]) => {
    acc[`data-${key}`] = value;
    return acc;
  }, {});

  const ariaProps = Object.entries(ariaAttributes).reduce((acc, [key, value]) => {
    acc[`aria-${key}`] = value;
    return acc;
  }, {});

  const handleClick = (e) => {
    onClick?.(e);
    if (onClickAction) executeAction(onClickAction, elementRef);
  };

  const handleMouseEnter = (e) => {
    onMouseEnter?.(e);
    if (onMouseEnterAction) executeAction(onMouseEnterAction, elementRef);
  };

  const handleMouseLeave = (e) => {
    onMouseLeave?.(e);
    if (onMouseLeaveAction) executeAction(onMouseLeaveAction, elementRef);
  };

  const renderNestedElements = (elements) => {
    return elements.map((element, index) => (
      <GenericDiv 
        key={element.id || element.key || index} 
        config={element} 
      />
    ));
  };

  const divProps = {
    id,
    className,
    style,
    title,
    lang,
    dir,
    hidden,
    tabIndex,
    draggable,
    role,
    ref: setElementRef,
    onClick: handleClick,
    onDoubleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    ...dataProps,
    ...ariaProps,
    ...customProps,
  };

  Object.keys(divProps).forEach(key => {
    if (divProps[key] === undefined) {
      delete divProps[key];
    }
  });

  return (
    <div {...divProps}>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <>
          {content}
          {children}
          {nestedElements.length > 0 && renderNestedElements(nestedElements)}
        </>
      )}
    </div>
  );
};

export default GenericDiv;