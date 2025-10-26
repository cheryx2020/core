import React, { useState } from "react";
import GenericDiv from "../../src/utils/generic-div";

const GenericDivPage = () => {
  const [count, setCount] = useState(0);

  // Example 1: Simple styled div
  const simpleConfig = {
    id: 'simple-box',
    className: 'simple-box',
    styleTagContent: `
      .simple-box {
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
        margin-bottom: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    `,
    content: '🎨 Simple Styled Box',
  };

  // Example 2: Interactive with actions
  const interactiveConfig = {
    id: 'interactive-box',
    className: 'interactive-box',
    styleTagContent: `
      .interactive-box {
        padding: 20px;
        background: #f0f0f0;
        border: 2px solid #333;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 20px;
      }
      .interactive-box:hover {
        background: #e0e0e0;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      .interactive-box.active {
        background: #4CAF50;
        color: white;
        border-color: #45a049;
      }
    `,
    content: '👆 Click me to toggle class!',
    onClickAction: 'toggle-class:active',
    dataAttributes: {
      testid: 'interactive-element',
      value: '42',
    },
  };

  // Example 3: Complex nested structure
  const nestedConfig = {
    id: 'card-container',
    className: 'card-container',
    styleTagContent: `
      .card-container {
        padding: 24px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
      }
      .card-header {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 16px;
        color: #333;
      }
      .card-body {
        padding: 16px;
        background: #f8f9fa;
        border-radius: 8px;
        margin-bottom: 12px;
      }
      .card-item {
        padding: 12px;
        background: white;
        border-left: 4px solid #667eea;
        margin-bottom: 8px;
        border-radius: 4px;
      }
      .card-footer {
        padding: 12px;
        text-align: center;
        color: #666;
        font-size: 14px;
      }
    `,
    nestedElements: [
      {
        className: 'card-header',
        content: '📦 Nested Structure Example',
      },
      {
        className: 'card-body',
        nestedElements: [
          {
            className: 'card-item',
            content: '✓ Item 1: Supports deep nesting',
          },
          {
            className: 'card-item',
            content: '✓ Item 2: Clean component structure',
          },
          {
            className: 'card-item',
            content: '✓ Item 3: Easy to configure',
          },
        ],
      },
      {
        className: 'card-footer',
        content: 'Built with GenericDiv component',
      },
    ],
  };

  // Example 4: With React event handlers
  const reactEventConfig = {
    id: 'counter-box',
    className: 'counter-box',
    styleTagContent: `
      .counter-box {
        padding: 24px;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        border-radius: 12px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        margin-bottom: 20px;
      }
      .counter-box:active {
        transform: scale(0.98);
      }
      .counter-display {
        font-size: 48px;
        font-weight: bold;
        margin: 16px 0;
      }
    `,
    onClick: () => setCount(count + 1),
    nestedElements: [
      {
        content: '🔢 Click Counter',
        style: { fontSize: '20px', marginBottom: '8px' },
      },
      {
        className: 'counter-display',
        content: count.toString(),
      },
      {
        content: 'Click to increment',
        style: { fontSize: '14px', opacity: 0.9 },
      },
    ],
  };

  // Example 5: Accessibility features
  const accessibleConfig = {
    id: 'accessible-button',
    className: 'accessible-button',
    styleTagContent: `
      .accessible-button {
        padding: 16px 32px;
        background: #2196F3;
        color: white;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: background 0.3s ease;
        text-align: center;
      }
      .accessible-button:hover {
        background: #1976D2;
      }
      .accessible-button:focus {
        outline: 3px solid #64B5F6;
        outline-offset: 2px;
      }
    `,
    content: '♿ Accessible Button',
    role: 'button',
    tabIndex: 0,
    ariaAttributes: {
      label: 'Accessible interactive element',
      pressed: 'false',
    },
    onClickAction: 'alert:This is an accessible component!',
    onKeyPress: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        alert('Keyboard activated!');
      }
    },
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h1 style={{ 
        marginBottom: '32px', 
        color: '#333',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        🎯 GenericDiv Component Demo
      </h1>

      <GenericDiv config={simpleConfig} />
      <GenericDiv config={interactiveConfig} />
      <GenericDiv config={nestedConfig} />
      <GenericDiv config={reactEventConfig} />
      <GenericDiv config={accessibleConfig} />

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: '#f5f5f5', 
        borderRadius: '8px',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong>Features demonstrated:</strong>
        <ul style={{ marginTop: '12px', lineHeight: '1.8' }}>
          <li>✅ Style injection with deduplication</li>
          <li>✅ String-based action handlers (JSON-safe)</li>
          <li>✅ React function event handlers</li>
          <li>✅ Deep nested structures</li>
          <li>✅ Accessibility attributes (ARIA, role, tabIndex)</li>
          <li>✅ Data attributes</li>
          <li>✅ Proper cleanup on unmount</li>
        </ul>
      </div>
    </div>
  );
};

export default GenericDivPage;