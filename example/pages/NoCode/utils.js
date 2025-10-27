export const generateId = (prefix = 'block') => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
export const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};
export const regenerateIds = (block) => {
  if (!block) return block;
  
  const newBlock = { ...block, id: generateId() };

  if (newBlock.blocks && Array.isArray(newBlock.blocks)) {
    newBlock.blocks = newBlock.blocks.map(child => regenerateIds(child));
  }

  return newBlock;
};
export const escapeHTML = (str) => {
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

export const styleObjectToString = (style) => {
  if (!style) return '';
  return Object.entries(style)
    .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${value}`)
    .join(';');
};

export const generateBlockHTML = (block, indentLevel = 0) => {
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

export const generateFullHTML = (config) => {
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

export const executeAction = (action, element, context = {}) => {
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
