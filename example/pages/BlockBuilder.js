import React, { useState } from 'react';

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

const executeAction = (action, element, context = {}) => {
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
    case 'scroll-to':
      document.getElementById(param)?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'custom':
      context.onCustomAction?.(param, element);
      break;
    default:
      console.warn(`Unknown action: ${type}`);
  }
};

const Block = ({ config, context = {} }) => {
  const {
    type = 'div',
    content,
    children,
    html,
    className,
    style,
    styleTagContent,
    id,
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
    onClickAction,
    onMouseEnterAction,
    onMouseLeaveAction,
    blocks = [],
    customProps = {},
  } = config || {};

  const [elementRef, setElementRef] = React.useState(null);

  React.useEffect(() => {
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
    if (onClickAction) executeAction(onClickAction, elementRef, context);
  };

  const handleMouseEnter = (e) => {
    onMouseEnter?.(e);
    if (onMouseEnterAction) executeAction(onMouseEnterAction, elementRef, context);
  };

  const handleMouseLeave = (e) => {
    onMouseLeave?.(e);
    if (onMouseLeaveAction) executeAction(onMouseLeaveAction, elementRef, context);
  };

  const props = {
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
        {content}
        {children}
        {blocks.length > 0 && blocks.map((block, index) => (
          <Block key={block.id || block.key || index} config={block} context={context} />
        ))}
      </>
    );
  };

  return React.createElement(type, props, renderContent());
};

const BlockLibrary = {
  container: (props = {}) => ({
    type: 'div',
    className: 'container',
    styleTagContent: `
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }
    `,
    ...props,
  }),

  row: (props = {}) => ({
    type: 'div',
    className: 'row',
    styleTagContent: `
      .row {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      }
    `,
    ...props,
  }),

  column: (width = '1', props = {}) => ({
    type: 'div',
    className: `col col-${width}`,
    styleTagContent: `
      .col { flex: 1; min-width: 0; }
      .col-1 { flex: 1; }
      .col-2 { flex: 2; }
      .col-3 { flex: 3; }
      .col-4 { flex: 4; }
    `,
    ...props,
  }),

  // Content Blocks
  hero: (props = {}) => ({
    type: 'section',
    className: 'hero',
    styleTagContent: `
      .hero {
        padding: 80px 20px;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
        margin-bottom: 40px;
      }
      .hero h1 { font-size: 48px; margin-bottom: 16px; font-weight: bold; }
      .hero p { font-size: 20px; opacity: 0.9; }
    `,
    ...props,
  }),

  card: (props = {}) => ({
    type: 'div',
    className: 'card',
    styleTagContent: `
      .card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
      }
      .card-header { font-size: 24px; font-weight: bold; margin-bottom: 12px; color: #333; }
      .card-body { color: #666; line-height: 1.6; }
    `,
    ...props,
  }),

  button: (variant = 'primary', props = {}) => ({
    type: 'button',
    className: `btn btn-${variant}`,
    styleTagContent: `
      .btn {
        padding: 12px 32px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-block;
      }
      .btn-primary {
        background: #667eea;
        color: white;
      }
      .btn-primary:hover {
        background: #5568d3;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(102, 126, 234, 0.4);
      }
      .btn-secondary {
        background: #f0f0f0;
        color: #333;
      }
      .btn-secondary:hover {
        background: #e0e0e0;
      }
      .btn-success {
        background: #4CAF50;
        color: white;
      }
      .btn-success:hover {
        background: #45a049;
      }
    `,
    ...props,
  }),

  heading: (level = 1, props = {}) => ({
    type: `h${level}`,
    className: `heading heading-${level}`,
    styleTagContent: `
      .heading { color: #333; margin-bottom: 16px; }
      .heading-1 { font-size: 48px; font-weight: bold; }
      .heading-2 { font-size: 36px; font-weight: bold; }
      .heading-3 { font-size: 28px; font-weight: 600; }
      .heading-4 { font-size: 24px; font-weight: 600; }
      .heading-5 { font-size: 20px; font-weight: 600; }
      .heading-6 { font-size: 18px; font-weight: 600; }
    `,
    ...props,
  }),

  text: (props = {}) => ({
    type: 'p',
    className: 'text',
    styleTagContent: `
      .text {
        color: #666;
        line-height: 1.6;
        margin-bottom: 16px;
      }
    `,
    ...props,
  }),

  image: (src, alt = '', props = {}) => ({
    type: 'img',
    className: 'image',
    customProps: { src, alt },
    styleTagContent: `
      .image {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }
    `,
    ...props,
  }),

  // Interactive Blocks
  modal: (props = {}) => ({
    type: 'div',
    className: 'modal',
    styleTagContent: `
      .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        max-width: 500px;
        width: 90%;
      }
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }
    `,
    ...props,
  }),

  accordion: (props = {}) => ({
    type: 'div',
    className: 'accordion',
    styleTagContent: `
      .accordion {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
      }
      .accordion-item {
        border-bottom: 1px solid #e0e0e0;
      }
      .accordion-item:last-child {
        border-bottom: none;
      }
      .accordion-header {
        padding: 16px;
        background: #f8f9fa;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.3s ease;
      }
      .accordion-header:hover {
        background: #e9ecef;
      }
      .accordion-content {
        padding: 16px;
        display: none;
      }
      .accordion-item.active .accordion-content {
        display: block;
      }
    `,
    ...props,
  }),

  tabs: (props = {}) => ({
    type: 'div',
    className: 'tabs',
    styleTagContent: `
      .tabs {
        border-radius: 8px;
        overflow: hidden;
      }
      .tabs-header {
        display: flex;
        background: #f8f9fa;
        border-bottom: 2px solid #e0e0e0;
      }
      .tab-button {
        padding: 16px 24px;
        background: none;
        border: none;
        cursor: pointer;
        font-weight: 600;
        color: #666;
        transition: all 0.3s ease;
      }
      .tab-button:hover {
        background: #e9ecef;
      }
      .tab-button.active {
        color: #667eea;
        border-bottom: 2px solid #667eea;
      }
      .tab-content {
        padding: 24px;
      }
    `,
    ...props,
  }),
};

// Page Builder Component
const PageBuilder = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Example: Build a complete landing page with blocks
  const landingPage = {
    type: 'div',
    style: { 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#f8f9fa',
      minHeight: '100vh',
      padding: '40px 0'
    },
    blocks: [
      // Hero Section
      BlockLibrary.container({
        blocks: [
          BlockLibrary.hero({
            blocks: [
              BlockLibrary.heading(1, { content: '🚀 Build Anything with Blocks' }),
              BlockLibrary.text({ 
                content: 'Create beautiful pages using composable, reusable blocks',
                style: { fontSize: '20px', color: 'white' }
              }),
              BlockLibrary.button('primary', {
                content: 'Get Started',
                onClickAction: 'scroll-to:features',
                style: { marginTop: '24px' }
              }),
            ],
          }),
        ],
      }),

      // Features Section
      BlockLibrary.container({
        id: 'features',
        blocks: [
          BlockLibrary.heading(2, { 
            content: '✨ Features',
            style: { textAlign: 'center', marginBottom: '40px' }
          }),
          BlockLibrary.row({
            blocks: [
              BlockLibrary.column('1', {
                blocks: [
                  BlockLibrary.card({
                    blocks: [
                      { type: 'div', className: 'card-header', content: '🎨 Customizable' },
                      { type: 'div', className: 'card-body', content: 'Style every block exactly how you want with CSS and inline styles.' },
                    ],
                  }),
                ],
              }),
              BlockLibrary.column('1', {
                blocks: [
                  BlockLibrary.card({
                    blocks: [
                      { type: 'div', className: 'card-header', content: '🔧 Composable' },
                      { type: 'div', className: 'card-body', content: 'Nest blocks infinitely to create complex layouts.' },
                    ],
                  }),
                ],
              }),
              BlockLibrary.column('1', {
                blocks: [
                  BlockLibrary.card({
                    blocks: [
                      { type: 'div', className: 'card-header', content: '⚡ Fast' },
                      { type: 'div', className: 'card-body', content: 'Optimized rendering with style deduplication.' },
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),

      // Interactive Demo
      BlockLibrary.container({
        style: { marginTop: '60px' },
        blocks: [
          BlockLibrary.heading(2, { 
            content: '🎮 Interactive Demo',
            style: { textAlign: 'center', marginBottom: '40px' }
          }),
          
          // Tabs
          {
            type: 'div',
            className: 'tabs',
            styleTagContent: `
              .tabs { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
              .tabs-header { display: flex; background: #f8f9fa; border-bottom: 2px solid #e0e0e0; }
              .tab-btn { padding: 16px 32px; background: none; border: none; cursor: pointer; font-weight: 600; color: #666; transition: all 0.3s; flex: 1; }
              .tab-btn:hover { background: #e9ecef; }
              .tab-btn.active { color: #667eea; background: white; border-bottom: 3px solid #667eea; }
              .tab-content { padding: 32px; min-height: 200px; }
            `,
            blocks: [
              {
                type: 'div',
                className: 'tabs-header',
                blocks: [
                  {
                    type: 'button',
                    className: activeTab === 'home' ? 'tab-btn active' : 'tab-btn',
                    content: '🏠 Home',
                    onClick: () => setActiveTab('home'),
                  },
                  {
                    type: 'button',
                    className: activeTab === 'about' ? 'tab-btn active' : 'tab-btn',
                    content: '📖 About',
                    onClick: () => setActiveTab('about'),
                  },
                  {
                    type: 'button',
                    className: activeTab === 'contact' ? 'tab-btn active' : 'tab-btn',
                    content: '📧 Contact',
                    onClick: () => setActiveTab('contact'),
                  },
                ],
              },
              {
                type: 'div',
                className: 'tab-content',
                blocks: [
                  activeTab === 'home' && BlockLibrary.text({
                    content: '👋 Welcome! This entire page is built using composable blocks. Each section is a reusable component that can be configured with JSON.',
                  }),
                  activeTab === 'about' && BlockLibrary.text({
                    content: '🎯 This block system allows you to build complex UIs by composing simple, reusable blocks. Think of it like LEGO for web pages!',
                  }),
                  activeTab === 'contact' && BlockLibrary.text({
                    content: '📬 You can add forms, modals, or any interactive element as blocks. The possibilities are endless!',
                  }),
                ].filter(Boolean),
              },
            ],
          },
        ],
      }),

      // Footer
      BlockLibrary.container({
        style: { marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #e0e0e0' },
        blocks: [
          BlockLibrary.text({
            content: '🎨 Built with Block System • 2025',
            style: { textAlign: 'center', color: '#999', marginBottom: 0 }
          }),
        ],
      }),
    ],
  };

  return <Block config={landingPage} />;
};

export default PageBuilder;