/**
 * Generates a unique ID with a given prefix.
 * @param {string} [prefix='block'] - A string to prepend to the ID.
 * @returns {string} A unique string identifier.
 */
export const generateId = (prefix = 'block') => 
  `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Creates a simple hash code from a string.
 * @param {string} str - The input string.
 * @returns {string} A hash of the string.
 */
export const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
};

/**
 * Converts a React CSSProperties object into a CSS string.
 * @param {Properties} [style] - A CSS style object.
 * @returns {string} A semicolon-separated CSS string.
 */
export const styleObjectToString = (style) => {
  if (!style) return '';
  return Object.entries(style)
    .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${value}`)
    .join(';');
};

/**
 * Executes a pre-defined action string.
 * @param {string} action - The action string to execute.
 * @param {HTMLElement | null} element - The HTML element that triggered the action.
 * @param {object} [context={}] - An object containing state and state setters.
 */
export const executeAction = (
  action, 
  element, 
  context = {}
) => {
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
      // State-related actions will not work without a context provider, but are harmless.
      case 'set-state':
        context.setState?.(param.split(':')[0], param.split(':').slice(1).join(':'));
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