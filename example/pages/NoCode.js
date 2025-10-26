import React, { useState, useEffect } from 'react';
import { Plus, Eye, Code, Save, Download, Upload, Trash2, Copy, Settings, Layers, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import Editor from '@monaco-editor/react';

// ============================================
// UTILITIES
// ============================================

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

const generateId = () => `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;


const regenerateIds = (block) => {
  if (!block) return block;
  
  const newBlock = { ...block, id: generateId() };

  if (newBlock.blocks && Array.isArray(newBlock.blocks)) {
    newBlock.blocks = newBlock.blocks.map(child => regenerateIds(child));
  }

  return newBlock;
};

// --- HTML Generation Utilities ---

const escapeHTML = (str) => {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, (match) => {
    switch (match) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return match;
    }
  });
};

const styleObjectToString = (style) => {
  if (!style) return '';
  return Object.entries(style)
    .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${value}`)
    .join(';');
};

const generateBlockHTML = (block, indentLevel = 0) => {
  if (!block) return '';
  const {
    type = 'div',
    content,
    html,
    className,
    style,
    id,
    title,
    customProps = {},
    dataAttributes = {},
    ariaAttributes = {},
    blocks = [],
  } = block;

  const indent = '  '.repeat(indentLevel);
  const attrs = [];

  if (id) attrs.push(`id="${id}"`);
  if (className) attrs.push(`class="${className}"`);
  if (title) attrs.push(`title="${title}"`);
  if (style && Object.keys(style).length > 0) {
    attrs.push(`style="${styleObjectToString(style)}"`);
  }
  Object.entries(customProps).forEach(([key, value]) => attrs.push(`${key}="${escapeHTML(value)}"`));
  Object.entries(dataAttributes).forEach(([key, value]) => attrs.push(`data-${key}="${escapeHTML(value)}"`));
  Object.entries(ariaAttributes).forEach(([key, value]) => attrs.push(`aria-${key}="${escapeHTML(value)}"`));
  
  const attrString = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
  const selfClosingTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];

  if (selfClosingTags.includes(type)) {
    return `${indent}<${type}${attrString}>`;
  }

  const childrenHTML = html 
    ? `\n${indent}  ${html}\n${indent}` 
    : (content ? `\n${indent}  ${escapeHTML(content)}\n${indent}` : '') + 
      (blocks.length > 0 ? '\n' + blocks.map(child => generateBlockHTML(child, indentLevel + 1)).join('\n') + `\n${indent}` : '');

  return `${indent}<${type}${attrString}>${childrenHTML}</${type}>`;
};

const collectStyleTags = (config) => {
  let styles = [];
  const traverse = (block) => {
    if (!block) return;
    if (block.styleTagContent) {
      styles.push(block.styleTagContent);
    }
    if (block.blocks) {
      block.blocks.forEach(traverse);
    }
  };
  traverse(config);
  return [...new Set(styles)].join('\n\n');
};

const generateFullHTML = (config) => {
  const bodyContent = config.blocks.map(block => generateBlockHTML(block, 2)).join('\n');
  const styleContent = collectStyleTags(config);
  
  const bodyAttrs = [];
  if (config.style) bodyAttrs.push(`style="${styleObjectToString(config.style)}"`);
  if (config.className) bodyAttrs.push(`class="${config.className}"`);
  const bodyTag = `<body ${bodyAttrs.join(' ')}>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Page</title>
  <style>
    ${styleContent}
  </style>
</head>
${bodyTag}
  <div id="root">
${bodyContent}
  </div>
</body>
</html>`;
};


// ============================================
// ACTION SYSTEM
// ============================================

const executeAction = (action, element, context = {}) => {
  if (!action) return;
  
  const actions = action.split(';');
  actions.forEach(act => {
    const [type, ...params] = act.trim().split(':');
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
      case 'scroll-to':
        document.getElementById(param)?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'set-state':
        const [stateName, ...valueArr] = param.split(':');
        context.setState?.(stateName, valueArr.join(':'));
        break;
      case 'toggle-state':
        context.toggleState?.(param);
        break;
      case 'navigate':
        window.location.href = param;
        break;
      default:
        console.warn(`Unknown action: ${type}`);
    }
  });
};

// ============================================
// STATE MANAGER
// ============================================

const usePageState = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const setStateValue = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const toggleStateValue = (key) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return {
    state,
    setState: setStateValue,
    toggleState: toggleStateValue,
  };
};

// ============================================
// CORE BLOCK COMPONENT
// ============================================

const Block = ({ config, context = {}, isPreview = false, onSelect, isSelected }) => {
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
      if (document.getElementById(styleId)) return;
      
      const styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.textContent = styleTagContent;
      document.head.appendChild(styleTag);
      
      return () => {
        const tag = document.getElementById(styleId);
        if (tag && document.head.contains(tag)) {
          document.head.removeChild(tag);
        }
      };
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
        {blocks.length > 0 && blocks.map((block, index) => (
          <Block 
            key={block.id || index} 
            config={block} 
            context={context}
            isPreview={isPreview}
            onSelect={onSelect}
            isSelected={isSelected && context.selectedBlockId === block.id}
          />
        ))}
      </>
    );
  };

  return React.createElement(type, props, renderContent());
};

// ============================================
// BLOCK TEMPLATES LIBRARY
// ============================================

const BLOCK_TEMPLATES = {
  section: {
    name: 'Section',
    icon: '📦',
    template: {
      id: generateId(),
      type: 'section',
      className: 'section',
      style: { padding: '60px 20px' },
      blocks: []
    }
  },
  container: {
    name: 'Container',
    icon: '🎁',
    template: {
      id: generateId(),
      type: 'div',
      className: 'container',
      styleTagContent: '.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }',
      blocks: []
    }
  },
  hero: {
    name: 'Hero Section',
    icon: '🎯',
    template: {
      id: generateId(),
      type: 'div',
      className: 'hero-section',
      styleTagContent: `
        .hero-section {
          padding: 80px 20px;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
        }
      `,
      blocks: [
        {
          id: generateId(),
          type: 'h1',
          content: 'Hero Headline',
          style: { fontSize: '48px', marginBottom: '16px', fontWeight: 'bold' }
        },
        {
          id: generateId(),
          type: 'p',
          content: 'Subheadline text goes here',
          style: { fontSize: '20px', opacity: 0.9 }
        }
      ]
    }
  },
  card: {
    name: 'Card',
    icon: '🎴',
    template: {
      id: generateId(),
      type: 'div',
      className: 'card',
      styleTagContent: `
        .card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 12px rgba(0,0,0,0.15);
        }
      `,
      style: { transition: 'all 0.3s ease' },
      blocks: [
        {
          id: generateId(),
          type: 'h3',
          content: 'Card Title',
          style: { fontSize: '24px', marginBottom: '12px', color: '#333' }
        },
        {
          id: generateId(),
          type: 'p',
          content: 'Card content goes here',
          style: { color: '#666', lineHeight: '1.6' }
        }
      ]
    }
  },
  button: {
    name: 'Button',
    icon: '🔘',
    template: {
      id: generateId(),
      type: 'button',
      className: 'btn-primary',
      content: 'Click Me',
      onClickAction: 'alert:Button clicked!',
      styleTagContent: `
        .btn-primary {
          padding: 12px 32px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          background: #667eea;
          color: white;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background: #5568d3;
          transform: translateY(-2px);
        }
      `
    }
  },
  heading: {
    name: 'Heading',
    icon: '📝',
    template: {
      id: generateId(),
      type: 'h2',
      content: 'Heading Text',
      style: { fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '16px' }
    }
  },
  text: {
    name: 'Paragraph',
    icon: '📄',
    template: {
      id: generateId(),
      type: 'p',
      content: 'Paragraph text goes here',
      style: { color: '#666', lineHeight: '1.6', marginBottom: '16px' }
    }
  },
  image: {
    name: 'Image',
    icon: '🖼️',
    template: {
      id: generateId(),
      type: 'img',
      customProps: { 
        src: 'https://via.placeholder.com/400x300',
        alt: 'Placeholder image'
      },
      style: { maxWidth: '100%', borderRadius: '8px' }
    }
  },
  row: {
    name: 'Row (Flex)',
    icon: '↔️',
    template: {
      id: generateId(),
      type: 'div',
      className: 'flex-row',
      styleTagContent: '.flex-row { display: flex; gap: 20px; flex-wrap: wrap; }',
      blocks: [
        {
          id: generateId(),
          type: 'div',
          style: { flex: '1', minWidth: '250px', background: '#f0f0f0', padding: '20px', borderRadius: '8px' },
          content: 'Column 1'
        },
        {
          id: generateId(),
          type: 'div',
          style: { flex: '1', minWidth: '250px', background: '#f0f0f0', padding: '20px', borderRadius: '8px' },
          content: 'Column 2'
        }
      ]
    }
  },
  spacer: {
    name: 'Spacer',
    icon: '⬜',
    template: {
      id: generateId(),
      type: 'div',
      style: { height: '40px' }
    }
  }
};

// ============================================
// PAGE TEMPLATES
// ============================================

const PAGE_TEMPLATES = {
  blank: {
    name: 'Blank Page',
    config: {
      type: 'div',
      style: { minHeight: '100vh', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' },
      blocks: []
    }
  },
  landing: {
    name: 'Apple-Style Landing',
    config: {
      type: 'div',
      className: 'apple-landing',
      style: { 
        minHeight: '100vh', 
        background: '#000',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        color: '#f5f5f7',
        lineHeight: '1.47059'
      },
      styleTagContent: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .apple-landing { overflow-x: hidden; }
        
        /* Navigation */
        .nav-bar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-content {
          max-width: 980px;
          margin: 0 auto;
          padding: 0 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 44px;
        }
        
        .nav-logo {
          font-size: 21px;
          font-weight: 600;
          color: #f5f5f7;
          text-decoration: none;
        }
        
        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
        }
        
        .nav-link {
          color: #f5f5f7;
          text-decoration: none;
          font-size: 12px;
          opacity: 0.8;
          transition: opacity 0.3s;
        }
        
        .nav-link:hover { opacity: 1; }
        
        /* Hero Section */
        .hero-section {
          padding: 80px 20px 120px;
          text-align: center;
          background: linear-gradient(180deg, #000 0%, #1a1a1a 100%);
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1400px;
          height: 1400px;
          background: radial-gradient(circle, rgba(0, 113, 227, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .hero-eyebrow {
          font-size: 17px;
          font-weight: 600;
          color: #0071e3;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        
        .hero-title {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.015em;
          margin-bottom: 16px;
          background: linear-gradient(180deg, #fff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          font-size: clamp(21px, 3vw, 28px);
          color: #a1a1a6;
          margin-bottom: 32px;
          line-height: 1.4;
          font-weight: 400;
        }
        
        .hero-cta {
          display: inline-flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        /* Buttons */
        .btn-primary, .btn-secondary {
          padding: 14px 28px;
          border-radius: 980px;
          font-size: 17px;
          font-weight: 400;
          text-decoration: none;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          display: inline-block;
        }
        
        .btn-primary {
          background: #0071e3;
          color: #fff;
        }
        
        .btn-primary:hover {
          background: #0077ed;
          transform: scale(1.02);
        }
        
        .btn-secondary {
          background: transparent;
          color: #2997ff;
          border: 1px solid #2997ff;
        }
        
        .btn-secondary:hover {
          background: rgba(41, 151, 255, 0.1);
          transform: scale(1.02);
        }
        
        /* Feature Section */
        .feature-section {
          padding: 100px 20px;
          background: #000;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 700;
          text-align: center;
          margin-bottom: 80px;
          letter-spacing: -0.015em;
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }
        
        /* Glass Card */
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 48px 32px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        
        .glass-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        
        .glass-card:hover::before {
          opacity: 1;
        }
        
        .feature-icon {
          font-size: 56px;
          margin-bottom: 24px;
          display: inline-block;
          filter: drop-shadow(0 4px 12px rgba(41, 151, 255, 0.3));
        }
        
        .feature-title {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        
        .feature-description {
          font-size: 17px;
          color: #a1a1a6;
          line-height: 1.5;
        }
        
        /* CTA Section */
        .cta-section {
          padding: 120px 20px;
          text-align: center;
          background: linear-gradient(180deg, #000 0%, #0a0a0a 100%);
          position: relative;
        }
        
        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        }
        
        .cta-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 700;
          margin-bottom: 24px;
          letter-spacing: -0.015em;
        }
        
        .cta-subtitle {
          font-size: 24px;
          color: #a1a1a6;
          margin-bottom: 40px;
        }
        
        /* Footer */
        .footer {
          background: #000;
          padding: 40px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-content {
          max-width: 980px;
          margin: 0 auto;
          text-align: center;
          color: #6e6e73;
          font-size: 12px;
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        
        .footer-link {
          color: #6e6e73;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-link:hover {
          color: #f5f5f7;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .feature-grid { grid-template-columns: 1fr; }
        }
      `,
      blocks: [
        // Navigation
        {
          id: generateId(),
          type: 'nav',
          className: 'nav-bar',
          blocks: [
            {
              id: generateId(),
              type: 'div',
              className: 'nav-content',
              blocks: [
                {
                  id: generateId(),
                  type: 'div',
                  className: 'nav-logo',
                  content: '⚡ Brand'
                },
                {
                  id: generateId(),
                  type: 'div',
                  className: 'nav-links',
                  blocks: [
                    { id: generateId(), type: 'a', className: 'nav-link', content: 'Features', customProps: { href: '#features' } },
                    { id: generateId(), type: 'a', className: 'nav-link', content: 'Pricing', customProps: { href: '#pricing' } },
                    { id: generateId(), type: 'a', className: 'nav-link', content: 'About', customProps: { href: '#about' } },
                    { id: generateId(), type: 'a', className: 'nav-link', content: 'Contact', customProps: { href: '#contact' } }
                  ]
                }
              ]
            }
          ]
        },
        
        // Hero Section
        {
          id: generateId(),
          type: 'section',
          className: 'hero-section',
          blocks: [
            {
              id: generateId(),
              type: 'div',
              className: 'hero-eyebrow',
              content: 'Introducing the future'
            },
            {
              id: generateId(),
              type: 'h1',
              className: 'hero-title',
              content: 'Innovation at its finest.'
            },
            {
              id: generateId(),
              type: 'p',
              className: 'hero-subtitle',
              content: 'Experience the next generation of technology designed to elevate your everyday life.'
            },
            {
              id: generateId(),
              type: 'div',
              className: 'hero-cta',
              blocks: [
                {
                  id: generateId(),
                  type: 'a',
                  className: 'btn-primary',
                  content: 'Get Started',
                  customProps: { href: '#' }
                },
                {
                  id: generateId(),
                  type: 'a',
                  className: 'btn-secondary',
                  content: 'Learn More',
                  customProps: { href: '#' }
                }
              ]
            }
          ]
        },
        
        // Features Section
        {
          id: generateId(),
          type: 'section',
          className: 'feature-section',
          customProps: { id: 'features' },
          blocks: [
            {
              id: generateId(),
              type: 'div',
              className: 'container',
              blocks: [
                {
                  id: generateId(),
                  type: 'h2',
                  className: 'section-title',
                  content: 'Powerful Features'
                },
                {
                  id: generateId(),
                  type: 'div',
                  className: 'feature-grid',
                  blocks: [
                    {
                      id: generateId(),
                      type: 'div',
                      className: 'glass-card',
                      blocks: [
                        { id: generateId(), type: 'div', className: 'feature-icon', content: '⚡' },
                        { id: generateId(), type: 'h3', className: 'feature-title', content: 'Lightning Fast' },
                        { id: generateId(), type: 'p', className: 'feature-description', content: 'Built for speed and performance. Experience instant responses and seamless interactions.' }
                      ]
                    },
                    {
                      id: generateId(),
                      type: 'div',
                      className: 'glass-card',
                      blocks: [
                        { id: generateId(), type: 'div', className: 'feature-icon', content: '🔒' },
                        { id: generateId(), type: 'h3', className: 'feature-title', content: 'Secure by Default' },
                        { id: generateId(), type: 'p', className: 'feature-description', content: 'Enterprise-grade security with end-to-end encryption and privacy protection.' }
                      ]
                    },
                    {
                      id: generateId(),
                      type: 'div',
                      className: 'glass-card',
                      blocks: [
                        { id: generateId(), type: 'div', className: 'feature-icon', content: '🎨' },
                        { id: generateId(), type: 'h3', className: 'feature-title', content: 'Beautiful Design' },
                        { id: generateId(), type: 'p', className: 'feature-description', content: 'Meticulously crafted interface that delights users and enhances productivity.' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        
        // CTA Section
        {
          id: generateId(),
          type: 'section',
          className: 'cta-section',
          blocks: [
            {
              id: generateId(),
              type: 'h2',
              className: 'cta-title',
              content: 'Ready to get started?'
            },
            {
              id: generateId(),
              type: 'p',
              className: 'cta-subtitle',
              content: 'Join thousands of satisfied customers today.'
            },
            {
              id: generateId(),
              type: 'div',
              className: 'hero-cta',
              blocks: [
                {
                  id: generateId(),
                  type: 'a',
                  className: 'btn-primary',
                  content: 'Start Free Trial',
                  customProps: { href: '#' }
                }
              ]
            }
          ]
        },
        
        // Footer
        {
          id: generateId(),
          type: 'footer',
          className: 'footer',
          blocks: [
            {
              id: generateId(),
              type: 'div',
              className: 'footer-content',
              blocks: [
                {
                  id: generateId(),
                  type: 'div',
                  className: 'footer-links',
                  blocks: [
                    { id: generateId(), type: 'a', className: 'footer-link', content: 'Privacy', customProps: { href: '#' } },
                    { id: generateId(), type: 'a', className: 'footer-link', content: 'Terms', customProps: { href: '#' } },
                    { id: generateId(), type: 'a', className: 'footer-link', content: 'Support', customProps: { href: '#' } },
                    { id: generateId(), type: 'a', className: 'footer-link', content: 'Careers', customProps: { href: '#' } }
                  ]
                },
                {
                  id: generateId(),
                  type: 'p',
                  content: '© 2025 Brand Inc. All rights reserved.'
                }
              ]
            }
          ]
        }
      ]
    }
  }
};
// ============================================
// BUILDER COMPONENTS
// ============================================

const BlockTreeItem = ({ block, level = 0, onSelect, selectedId, onDelete, onDuplicate, onMoveUp, onMoveDown, index, totalItems, expandedIds, onToggleExpand }) => {
  const expanded = expandedIds.has(block.id);
  const hasChildren = block.blocks && block.blocks.length > 0;
  const isRoot = block.id === 'page-root';

  return (
    <div style={{ marginLeft: level * 16 }}>
      <div
        onClick={() => onSelect(block)}
        style={{
          padding: '8px 12px',
          cursor: 'pointer',
          background: selectedId === block.id ? '#e8eeff' : 'transparent',
          borderRadius: '6px',
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = selectedId === block.id ? '#e8eeff' : '#f5f5f5'}
        onMouseLeave={(e) => e.currentTarget.style.background = selectedId === block.id ? '#e8eeff' : 'transparent'}
      >
        {hasChildren && (
          <span onClick={(e) => { e.stopPropagation(); onToggleExpand(block.id); }} style={{ cursor: 'pointer' }}>
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        {!hasChildren && <span style={{ width: 16 }} />}
        <span style={{ flex: 1, fontWeight: selectedId === block.id ? 600 : 400 }}>
          {block.type} {block.className && !isRoot ? `(.${block.className})` : ''}
        </span>
        {!isRoot && (
            <>
                <button onClick={(e) => { e.stopPropagation(); onDuplicate(block); }} style={{ padding: '4px', border: 'none', background: 'none', cursor: 'pointer' }} title="Duplicate">
                    <Copy size={14} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onMoveUp(block.id); }} style={{ padding: '4px', border: 'none', background: 'none', cursor: index === 0 ? 'not-allowed' : 'pointer', color: index === 0 ? '#ccc' : 'inherit' }} title="Move Up" disabled={index === 0}>
                    <ChevronUp size={14} />
                </button>
                 <button onClick={(e) => { e.stopPropagation(); onMoveDown(block.id); }} style={{ padding: '4px', border: 'none', background: 'none', cursor: index === totalItems - 1 ? 'not-allowed' : 'pointer', color: index === totalItems - 1 ? '#ccc' : 'inherit' }} title="Move Down" disabled={index === totalItems - 1}>
                    <ChevronDown size={14} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(block.id); }} style={{ padding: '4px', border: 'none', background: 'none', cursor: 'pointer', color: '#e74c3c' }} title="Delete">
                    <Trash2 size={14} />
                </button>
            </>
        )}
      </div>
      {expanded && hasChildren && block.blocks.map((child, idx) => (
        <BlockTreeItem 
          key={child.id || idx} 
          block={child} 
          level={level + 1}
          onSelect={onSelect}
          selectedId={selectedId}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          index={idx}
          totalItems={block.blocks.length}
          expandedIds={expandedIds}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </div>
  );
};

const PropertyEditor = ({ block, onChange }) => {
  if (!block) return <div style={{ padding: '20px', color: '#999' }}>Select an item to edit</div>;
  
  const isPageRoot = block.id === 'page-root';

  const updateProperty = (path, value) => {
    const newBlock = JSON.parse(JSON.stringify(block));
    const keys = path.split('.');
    let current = newBlock;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onChange(newBlock);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 600 }}>
        {isPageRoot ? 'Page Properties' : 'Block Properties'}
      </h3>
      
      {!isPageRoot && (
        <>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>Type</label>
            <input
              type="text"
              value={block.type || 'div'}
              onChange={(e) => updateProperty('type', e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>Content</label>
            <textarea
              value={block.content || ''}
              onChange={(e) => updateProperty('content', e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', fontFamily: 'inherit' }}
            />
          </div>
        </>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>
          {isPageRoot ? 'Body Class Name' : 'Class Name'}
        </label>
        <input
          type="text"
          value={block.className || ''}
          onChange={(e) => updateProperty('className', e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
        />
      </div>

      {!isPageRoot && (
        <>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>ID</label>
                <input
                type="text"
                value={block.id || ''}
                onChange={(e) => updateProperty('id', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                />
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>On Click Action</label>
                <input
                type="text"
                value={block.onClickAction || ''}
                onChange={(e) => updateProperty('onClickAction', e.target.value)}
                placeholder="e.g., alert:Hello or scroll-to:section"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                />
            </div>
        </>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>
            {isPageRoot ? 'Body Inline Styles (JSON)' : 'Inline Styles (JSON)'}
        </label>
        <Editor
          height="150px"
          language="json"
          theme="vs-dark"
          value={JSON.stringify(block.style || {}, null, 2) || ''}
          onChange={(value) => {
            try {
              if (!value || value.trim() === '') {
                 updateProperty('style', {});
                 return;
              }
              const parsedStyle = JSON.parse(value);
              updateProperty('style', parsedStyle);
            } catch (error) {
              // Invalid JSON, do nothing to prevent crashing
            }
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </div>

      {isPageRoot && (
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>Global CSS (Style Tag)</label>
            <Editor
              height="150px"
              language="css"
              theme="vs-dark"
              value={block.styleTagContent || ''}
              onChange={(value) => updateProperty('styleTagContent', value)}
              options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
              }}
            />
        </div>
      )}

      {!isPageRoot && (
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>CSS (Style Tag)</label>
            <Editor
            height="150px"
            language="css"
            theme="vs-dark"
            value={block.styleTagContent || ''}
            onChange={(value) => updateProperty('styleTagContent', value)}
            options={{
                minimap: { enabled: false },
                fontSize: 12,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
            }}
            />
        </div>
      )}
    </div>
  );
};

// ============================================
// MAIN BUILDER
// ============================================

const NoCodeBuilder = () => {
  const [pageConfig, setPageConfig] = useState(PAGE_TEMPLATES.landing.config);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [mode, setMode] = useState('edit'); // edit, preview, code
  const [codeView, setCodeView] = useState('json'); // json, html
  const [showTemplates, setShowTemplates] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedBlockIds, setExpandedBlockIds] = useState(new Set(['page-root']));

  const findAncestors = (blockId, config) => {
    const path = [];
    const search = (blocks, currentPath) => {
      for (const block of blocks) {
        if (block.id === blockId) {
          path.push(...currentPath);
          return true;
        }
        if (block.blocks && search(block.blocks, [...currentPath, block.id])) {
          return true;
        }
      }
      return false;
    };
    search(config.blocks, []);
    return path;
  };

  const handleSelectBlockFromPreview = (block) => {
    setSelectedBlock(block);
    if (block && block.id !== 'page-root') {
      const ancestors = findAncestors(block.id, pageConfig);
      setExpandedBlockIds(prev => new Set([...prev, 'page-root', ...ancestors, block.id]));
    }
  };

  const handleSelectBlockFromTree = (block) => {
    if (block.id === 'page-root') {
      setSelectedBlock({ ...pageConfig, id: 'page-root', type: 'Page' });
    } else {
      setSelectedBlock(block);
    }
  };

  const handleToggleExpand = (blockId) => {
    setExpandedBlockIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(blockId)) {
        newSet.delete(blockId);
      } else {
        newSet.add(blockId);
      }
      return newSet;
    });
  };

  const findAndUpdateBlock = (blocks, blockId, updatedBlock) => {
    return blocks.map(block => {
      if (block.id === blockId) return updatedBlock;
      if (block.blocks) {
        return { ...block, blocks: findAndUpdateBlock(block.blocks, blockId, updatedBlock) };
      }
      return block;
    });
  };

  const findAndDeleteBlock = (blocks, blockId) => {
    return blocks.filter(block => {
      if (block.id === blockId) return false;
      if (block.blocks) {
        block.blocks = findAndDeleteBlock(block.blocks, blockId);
      }
      return true;
    });
  };
  
  const moveBlock = (blockId, direction) => {
    const newPageConfig = JSON.parse(JSON.stringify(pageConfig));

    const traverseAndMove = (blocks) => {
      const index = blocks.findIndex(b => b.id === blockId);

      if (index !== -1) {
        if (direction === 'up' && index > 0) {
          [blocks[index - 1], blocks[index]] = [blocks[index], blocks[index - 1]];
          return true;
        }
        if (direction === 'down' && index < blocks.length - 1) {
          [blocks[index + 1], blocks[index]] = [blocks[index], blocks[index + 1]];
          return true;
        }
        return false;
      }

      for (const block of blocks) {
        if (block.blocks && traverseAndMove(block.blocks)) {
          return true;
        }
      }
      return false;
    };

    if (traverseAndMove(newPageConfig.blocks)) {
      setPageConfig(newPageConfig);
    }
  };

  const addBlock = (template) => {
    const newBlock = regenerateIds(JSON.parse(JSON.stringify(template)));
    
    if (selectedBlock && selectedBlock.id !== 'page-root' && selectedBlock.blocks !== undefined) {
      const updated = findAndUpdateBlock(
        pageConfig.blocks,
        selectedBlock.id,
        { ...selectedBlock, blocks: [...(selectedBlock.blocks || []), newBlock] }
      );
      setPageConfig({ ...pageConfig, blocks: updated });
    } else {
      setPageConfig({ ...pageConfig, blocks: [...pageConfig.blocks, newBlock] });
    }
  };

  const updateBlock = (updatedBlock) => {
    const updated = findAndUpdateBlock(pageConfig.blocks, updatedBlock.id, updatedBlock);
    setPageConfig({ ...pageConfig, blocks: updated });
    setSelectedBlock(updatedBlock);
  };
  
  const updatePageConfigProperties = (newConfig) => {
    const { id, type, ...configData } = newConfig; // Remove temporary props
    setPageConfig(configData);
    setSelectedBlock(newConfig); // Keep selection in sync
  };

  const deleteBlock = (blockId) => {
    const updated = findAndDeleteBlock(pageConfig.blocks, blockId);
    setPageConfig({ ...pageConfig, blocks: updated });
    if (selectedBlock?.id === blockId) setSelectedBlock(null);
  };

  const duplicateBlock = (blockToDuplicate) => {
    const newPageConfig = JSON.parse(JSON.stringify(pageConfig));

    const traverseAndDuplicate = (blocks) => {
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        if (block.id === blockToDuplicate.id) {
          const newBlock = regenerateIds(JSON.parse(JSON.stringify(block)));
          blocks.splice(i + 1, 0, newBlock);
          return true;
        }

        if (block.blocks && traverseAndDuplicate(block.blocks)) {
          return true;
        }
      }
      return false;
    };

    if (traverseAndDuplicate(newPageConfig.blocks)) {
      setPageConfig(newPageConfig);
    }
  };

  const exportJSON = () => {
    const json = JSON.stringify(pageConfig, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-config.json';
    a.click();
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          setPageConfig(config);
        } catch (err) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };
  
  const handleCopyCode = () => {
    const codeToCopy = codeView === 'json'
        ? JSON.stringify(pageConfig, null, 2)
        : generateFullHTML(pageConfig);
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Left Sidebar - Blocks & Layers */}
      <div style={{ width: '280px', background: '#f8f9fa', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', background: 'white' }}>
          <button
            onClick={() => setShowTemplates(false)}
            style={{
              flex: 1, padding: '12px', border: 'none',
              background: !showTemplates ? '#667eea' : 'transparent',
              color: !showTemplates ? 'white' : '#666',
              cursor: 'pointer', fontWeight: 600, fontSize: '13px'
            }}
          >
            <Layers size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Layers
          </button>
          <button
            onClick={() => setShowTemplates(true)}
            style={{
              flex: 1, padding: '12px', border: 'none',
              background: showTemplates ? '#667eea' : 'transparent',
              color: showTemplates ? 'white' : '#666',
              cursor: 'pointer', fontWeight: 600, fontSize: '13px'
            }}
          >
            <Plus size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Add
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
          {showTemplates ? (
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#666', textTransform: 'uppercase' }}>Blocks</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {Object.entries(BLOCK_TEMPLATES).map(([key, { name, icon, template }]) => (
                  <button
                    key={key}
                    onClick={() => addBlock(template)}
                    style={{
                      padding: '16px 8px', border: '1px solid #e0e0e0', borderRadius: '8px',
                      background: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: 500,
                      transition: 'all 0.2s', textAlign: 'center'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.borderColor = '#667eea'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e0e0e0'; }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{icon}</div>
                    {name}
                  </button>
                ))}
              </div>

              <h3 style={{ fontSize: '13px', fontWeight: 600, margin: '20px 0 12px', color: '#666', textTransform: 'uppercase' }}>Templates</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(PAGE_TEMPLATES).map(([key, { name, config }]) => (
                  <button
                    key={key}
                    onClick={() => setPageConfig(config)}
                    style={{
                      padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px',
                      background: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                      transition: 'all 0.2s', textAlign: 'left'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.borderColor = '#667eea'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e0e0e0'; }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#666', textTransform: 'uppercase' }}>Page Structure</h3>
              {(() => {
                const pageRootNode = {
                    id: 'page-root',
                    type: 'Page',
                    blocks: pageConfig.blocks
                };
                return (
                    <BlockTreeItem
                      key={pageRootNode.id}
                      block={pageRootNode}
                      onSelect={handleSelectBlockFromTree}
                      selectedId={selectedBlock?.id}
                      onDelete={deleteBlock}
                      onDuplicate={duplicateBlock}
                      onMoveUp={(blockId) => moveBlock(blockId, 'up')}
                      onMoveDown={(blockId) => moveBlock(blockId, 'down')}
                      expandedIds={expandedBlockIds}
                      onToggleExpand={handleToggleExpand}
                    />
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
        {/* Toolbar */}
        <div style={{ height: '60px', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '12px', background: 'white' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 600, marginRight: 'auto' }}>🎨 No-Code Page Builder</h1>
          
          <button onClick={() => setMode('edit')} style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', background: mode === 'edit' ? '#667eea' : 'white', color: mode === 'edit' ? 'white' : '#666', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }} >
            <Settings size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Edit
          </button>

          <button onClick={() => setMode('preview')} style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', background: mode === 'preview' ? '#667eea' : 'white', color: mode === 'preview' ? 'white' : '#666', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }} >
            <Eye size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Preview
          </button>

          <button onClick={() => setMode('code')} style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', background: mode === 'code' ? '#667eea' : 'white', color: mode === 'code' ? 'white' : '#666', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }} >
            <Code size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Code
          </button>

          <div style={{ width: '1px', height: '30px', background: '#e0e0e0' }} />

          <button onClick={exportJSON} title="Export JSON" style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', background: 'white', color: '#666', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }} >
            <Download size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Export
          </button>

          <label style={{ cursor: 'pointer' }}>
            <input type="file" accept=".json" onChange={importJSON} style={{ display: 'none' }} />
            <div style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', background: 'white', color: '#666', fontSize: '13px', fontWeight: 500 }} >
              <Upload size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Import
            </div>
          </label>
        </div>

        {/* Canvas Content */}
        <div style={{ flex: 1, overflow: 'auto', background: '#f0f0f0', padding: '20px' }}>
          {mode === 'code' ? (
            <div style={{ background: '#1e1e1e', color: '#d4d4d4', borderRadius: '8px', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Monaco, monospace', fontSize: '13px', position: 'relative' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid #444', flexShrink: 0 }}>
                <button onClick={() => setCodeView('json')} style={{ background: codeView === 'json' ? '#252526' : 'transparent', border: 'none', color: codeView === 'json' ? '#fff' : '#aaa', padding: '10px 16px', cursor: 'pointer', borderRight: '1px solid #444', fontSize: '13px' }} >
                  JSON
                </button>
                <button onClick={() => setCodeView('html')} style={{ background: codeView === 'html' ? '#252526' : 'transparent', border: 'none', color: codeView === 'html' ? '#fff' : '#aaa', padding: '10px 16px', cursor: 'pointer', fontSize: '13px' }} >
                  HTML
                </button>
              </div>
              <button
                  onClick={handleCopyCode}
                  style={{
                      position: 'absolute', top: '52px', right: '20px',
                      background: '#333', border: '1px solid #555', color: '#d4d4d4',
                      padding: '4px 8px', borderRadius: '4px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10
                  }}
              >
                  <Copy size={14} />
                  {copied ? 'Copied!' : 'Copy'}
              </button>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                {codeView === 'json' ? (
                  <Editor
                    height="100%"
                    language="json"
                    theme="vs-dark"
                    value={JSON.stringify(pageConfig, null, 2)}
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 13,
                        scrollBeyondLastLine: false,
                        wordWrap: 'on',
                        padding: { top: 16 }
                    }}
                  />
                ) : (
                  <Editor
                    height="100%"
                    language="html"
                    theme="vs-dark"
                    value={generateFullHTML(pageConfig)}
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 13,
                        scrollBeyondLastLine: false,
                        wordWrap: 'on',
                        padding: { top: 16 }
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            <div style={{ background: 'white', minHeight: '100%', boxShadow: '0 0 20px rgba(0,0,0,0.1)', margin: '0 auto', maxWidth: mode === 'preview' ? '100%' : '1400px' }}>
              <Block 
                config={pageConfig} 
                context={{ state: {}, setState: () => {}, toggleState: () => {} }}
                isPreview={mode === 'edit'}
                onSelect={handleSelectBlockFromPreview}
                isSelected={selectedBlock?.id === pageConfig.id}
              />
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Properties */}
      {mode === 'edit' && (
        <div style={{ width: '320px', background: 'white', borderLeft: '1px solid #e0e0e0', overflow: 'auto' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0', background: '#f8f9fa' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
              {selectedBlock ? (selectedBlock.id === 'page-root' ? 'Edit Page' : 'Edit Block') : 'Properties'}
            </h2>
          </div>
          <PropertyEditor
            block={selectedBlock}
            onChange={selectedBlock?.id === 'page-root' ? updatePageConfigProperties : updateBlock}
          />
        </div>
      )}
    </div>
  );
};

export default NoCodeBuilder;