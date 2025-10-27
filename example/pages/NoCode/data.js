import { generateId } from "./utils";

export const MASTER_BLOCK_TEMPLATES = {
  section: { name: 'Section', icon: '📦', template: { id: generateId(), type: 'section', className: 'section', style: { padding: '60px 20px' }, blocks: [] } },
  container: { name: 'Container', icon: '🎁', template: { id: generateId(), type: 'div', className: 'container', styleTagContent: '.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }', blocks: [] } },
  hero: { name: 'Hero Section', icon: '🎯', template: { id: generateId(), type: 'div', className: 'hero-section', styleTagContent: `.hero-section { padding: 80px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; }`, blocks: [ { id: generateId(), type: 'h1', content: 'Hero Headline', style: { fontSize: '48px', marginBottom: '16px', fontWeight: 'bold' } }, { id: generateId(), type: 'p', content: 'Subheadline text goes here', style: { fontSize: '20px', opacity: 0.9 } } ] } },
  card: { name: 'Card', icon: '🎴', template: { id: generateId(), type: 'div', className: 'card', styleTagContent: `.card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); } .card:hover { transform: translateY(-4px); box-shadow: 0 8px 12px rgba(0,0,0,0.15); }`, style: { transition: 'all 0.3s ease' }, blocks: [ { id: generateId(), type: 'h3', content: 'Card Title', style: { fontSize: '24px', marginBottom: '12px', color: '#333' } }, { id: generateId(), type: 'p', content: 'Card content goes here', style: { color: '#666', lineHeight: '1.6' } } ] } },
  button: { name: 'Button', icon: '🔘', template: { id: generateId(), type: 'button', className: 'btn-primary', content: 'Click Me', onClickAction: 'alert:Button clicked!', styleTagContent: `.btn-primary { padding: 12px 32px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; background: #667eea; color: white; transition: all 0.3s ease; } .btn-primary:hover { background: #5568d3; transform: translateY(-2px); }` } },
  heading: { name: 'Heading', icon: '📝', template: { id: generateId(), type: 'h2', content: 'Heading Text', style: { fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '16px' } } },
  text: { name: 'Paragraph', icon: '📄', template: { id: generateId(), type: 'p', content: 'Paragraph text goes here', style: { color: '#666', lineHeight: '1.6', marginBottom: '16px' } } },
  image: { name: 'Image', icon: '🖼️', template: { id: generateId(), type: 'img', customProps: { src: 'https://via.placeholder.com/400x300', alt: 'Placeholder image' }, style: { maxWidth: '100%', borderRadius: '8px' } } },
  row: { name: 'Row (Flex)', icon: '↔️', template: { id: generateId(), type: 'div', className: 'flex-row', styleTagContent: '.flex-row { display: flex; gap: 20px; flex-wrap: wrap; }', blocks: [ { id: generateId(), type: 'div', style: { flex: '1', minWidth: '250px', background: '#f0f0f0', padding: '20px', borderRadius: '8px' }, content: 'Column 1' }, { id: generateId(), type: 'div', style: { flex: '1', minWidth: '250px', background: '#f0f0f0', padding: '20px', borderRadius: '8px' }, content: 'Column 2' } ] } },
  spacer: { name: 'Spacer', icon: '⬜', template: { id: generateId(), type: 'div', style: { height: '40px' } } }
};

// ============================================
// PAGE TEMPLATES
// ============================================

export const LANDING_PAGE_BLOCK_TEMPLATES = {
  // --- Navigation Components ---
  navBar: {
    name: 'Nav Bar',
    icon: '🧭',
    template: {
      id: generateId(),
      type: 'nav',
      className: 'nav-bar',
      styleTagContent: `
        .nav-bar { position: sticky; top: 0; z-index: 1000; background: rgba(0, 0, 0, 0.8); backdrop-filter: saturate(180%) blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .nav-content { max-width: 980px; margin: 0 auto; padding: 0 22px; display: flex; justify-content: space-between; align-items: center; height: 44px; }
        .nav-logo { font-size: 21px; font-weight: 600; color: #f5f5f7; text-decoration: none; }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-link { color: #f5f5f7; text-decoration: none; font-size: 12px; opacity: 0.8; transition: opacity 0.3s; }
        .nav-link:hover { opacity: 1; }
        @media (max-width: 768px) { .nav-links { display: none; } }
      `,
      blocks: [
        {
          id: generateId(),
          type: 'div',
          className: 'nav-content',
          blocks: [
            { id: generateId(), type: 'div', className: 'nav-logo', content: '⚡ Brand' },
            {
              id: generateId(),
              type: 'div',
              className: 'nav-links',
              blocks: [
                { id: generateId(), type: 'a', className: 'nav-link', content: 'Features', customProps: { href: '#features' } },
                { id: generateId(), type: 'a', className: 'nav-link', content: 'Pricing', customProps: { href: '#pricing' } },
              ]
            }
          ]
        }
      ]
    }
  },

  // --- Hero Section Components ---
  appleHero: {
    name: 'Apple Hero',
    icon: '🎯',
    template: {
      id: generateId(),
      type: 'section',
      className: 'hero-section',
      styleTagContent: `
        .hero-section { padding: 80px 20px 120px; text-align: center; background: linear-gradient(180deg, #000 0%, #1a1a1a 100%); position: relative; overflow: hidden; }
        .hero-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 1400px; height: 1400px; background: radial-gradient(circle, rgba(0, 113, 227, 0.15) 0%, transparent 70%); pointer-events: none; }
        .hero-eyebrow { font-size: 17px; font-weight: 600; color: #0071e3; margin-bottom: 8px; letter-spacing: 0.5px; }
        .hero-title { font-size: clamp(48px, 8vw, 96px); font-weight: 700; line-height: 1.05; letter-spacing: -0.015em; margin-bottom: 16px; background: linear-gradient(180deg, #fff 0%, #a0a0a0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-subtitle { font-size: clamp(21px, 3vw, 28px); color: #a1a1a6; margin-bottom: 32px; line-height: 1.4; font-weight: 400; }
        .hero-cta { display: inline-flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
      `,
      blocks: [
        { id: generateId(), type: 'div', className: 'hero-eyebrow', content: 'Introducing the future' },
        { id: generateId(), type: 'h1', className: 'hero-title', content: 'Innovation at its finest.' },
        { id: generateId(), type: 'p', className: 'hero-subtitle', content: 'Experience the next generation of technology.' },
        {
          id: generateId(),
          type: 'div',
          className: 'hero-cta',
          blocks: [
            { ...MASTER_BLOCK_TEMPLATES.button.template, id: generateId(), className: 'btn-primary', content: 'Get Started', customProps: { href: '#' } },
            { ...MASTER_BLOCK_TEMPLATES.button.template, id: generateId(), className: 'btn-secondary', content: 'Learn More', customProps: { href: '#' } }
          ]
        }
      ]
    }
  },

  // --- Feature Section Components ---
  featureSection: {
    name: 'Feature Section',
    icon: '✨',
    template: {
      id: generateId(),
      type: 'section',
      className: 'feature-section',
      styleTagContent: `
        .feature-section { padding: 100px 20px; background: #000; }
        .container { max-width: 1200px; margin: 0 auto; }
        .section-title { font-size: clamp(40px, 6vw, 64px); font-weight: 700; text-align: center; margin-bottom: 80px; letter-spacing: -0.015em; }
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
        @media (max-width: 768px) { .feature-grid { grid-template-columns: 1fr; } }
      `,
      blocks: [
        {
          id: generateId(),
          type: 'div',
          className: 'container',
          blocks: [
            { id: generateId(), type: 'h2', className: 'section-title', content: 'Powerful Features' },
            {
              id: generateId(),
              type: 'div',
              className: 'feature-grid',
              blocks: [
                // Placeholder for Glass Cards
              ]
            }
          ]
        }
      ]
    }
  },
  glassCard: {
    name: 'Glass Card',
    icon: '🧊',
    template: {
      id: generateId(),
      type: 'div',
      className: 'glass-card',
      styleTagContent: `
        .glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 48px 32px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
        .glass-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent); opacity: 0; transition: opacity 0.4s; }
        .glass-card:hover { transform: translateY(-8px); background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); }
        .glass-card:hover::before { opacity: 1; }
        .feature-icon { font-size: 56px; margin-bottom: 24px; display: inline-block; filter: drop-shadow(0 4px 12px rgba(41, 151, 255, 0.3)); }
        .feature-title { font-size: 28px; font-weight: 600; margin-bottom: 16px; letter-spacing: -0.01em; }
        .feature-description { font-size: 17px; color: #a1a1a6; line-height: 1.5; }
      `,
      blocks: [
        { id: generateId(), type: 'div', className: 'feature-icon', content: '⚡' },
        { id: generateId(), type: 'h3', className: 'feature-title', content: 'Feature Title' },
        { id: generateId(), type: 'p', className: 'feature-description', content: 'Describe the amazing feature in a few sentences.' }
      ]
    }
  },

  // --- CTA and Footer Components ---
  ctaSection: {
    name: 'CTA Section',
    icon: '📣',
    template: {
      id: generateId(),
      type: 'section',
      className: 'cta-section',
      styleTagContent: `
        .cta-section { padding: 120px 20px; text-align: center; background: linear-gradient(180deg, #000 0%, #0a0a0a 100%); position: relative; }
        .cta-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent); }
        .cta-title { font-size: clamp(40px, 6vw, 72px); font-weight: 700; margin-bottom: 24px; letter-spacing: -0.015em; }
        .cta-subtitle { font-size: 24px; color: #a1a1a6; margin-bottom: 40px; }
      `,
      blocks: [
        { id: generateId(), type: 'h2', className: 'cta-title', content: 'Ready to get started?' },
        { id: generateId(), type: 'p', className: 'cta-subtitle', content: 'Join thousands of satisfied customers today.' },
        {
          id: generateId(),
          type: 'div',
          className: 'hero-cta',
          blocks: [
            { ...MASTER_BLOCK_TEMPLATES.button.template, id: generateId(), className: 'btn-primary', content: 'Start Free Trial', customProps: { href: '#' } }
          ]
        }
      ]
    }
  },
  footer: {
    name: 'Footer',
    icon: '⚓',
    template: {
      id: generateId(),
      type: 'footer',
      className: 'footer',
      styleTagContent: `
        .footer { background: #000; padding: 40px 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
        .footer-content { max-width: 980px; margin: 0 auto; text-align: center; color: #6e6e73; font-size: 12px; }
        .footer-links { display: flex; justify-content: center; gap: 24px; margin-bottom: 16px; flex-wrap: wrap; }
        .footer-link { color: #6e6e73; text-decoration: none; transition: color 0.3s; }
        .footer-link:hover { color: #f5f5f7; }
      `,
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
                { id: generateId(), type: 'a', className: 'footer-link', content: 'Support', customProps: { href: '#' } }
              ]
            },
            { id: generateId(), type: 'p', content: '© 2025 Brand Inc. All rights reserved.' }
          ]
        }
      ]
    }
  },

  // --- Atomic Components (Buttons, Text Styles) ---
  primaryButton: {
    name: 'Primary Button',
    icon: '🔵',
    template: {
      id: generateId(),
      type: 'a',
      className: 'btn-primary',
      content: 'Get Started',
      customProps: { href: '#' },
      styleTagContent: `
        .btn-primary, .btn-secondary { padding: 14px 28px; border-radius: 980px; font-size: 17px; font-weight: 400; text-decoration: none; transition: all 0.3s; border: none; cursor: pointer; display: inline-block; }
        .btn-primary { background: #0071e3; color: #fff; }
        .btn-primary:hover { background: #0077ed; transform: scale(1.02); }
      `
    }
  },
  secondaryButton: {
    name: 'Secondary Button',
    icon: '⚪',
    template: {
      id: generateId(),
      type: 'a',
      className: 'btn-secondary',
      content: 'Learn More',
      customProps: { href: '#' },
      styleTagContent: `
        .btn-primary, .btn-secondary { padding: 14px 28px; border-radius: 980px; font-size: 17px; font-weight: 400; text-decoration: none; transition: all 0.3s; border: none; cursor: pointer; display: inline-block; }
        .btn-secondary { background: transparent; color: #2997ff; border: 1px solid #2997ff; }
        .btn-secondary:hover { background: rgba(41, 151, 255, 0.1); transform: scale(1.02); }
      `
    }
  },
  sectionTitle: {
    name: 'Section Title',
    icon: '📜',
    template: {
      id: generateId(),
      type: 'h2',
      className: 'section-title',
      content: 'Section Title',
      styleTagContent: `
        .section-title { font-size: clamp(40px, 6vw, 64px); font-weight: 700; text-align: center; margin-bottom: 80px; letter-spacing: -0.015em; }
      `
    }
  }
};

export const PAGE_TEMPLATES = {
  blank: {
    name: 'Blank Page',
    blockTemplates: MASTER_BLOCK_TEMPLATES, // A blank page can use any block
    config: {
      type: 'div',
      style: { minHeight: '100vh', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' },
      blocks: []
    }
  },
  landing: {
    name: 'Apple-Style Landing',
    // This template has a curated, theme-specific set of blocks.
    blockTemplates: LANDING_PAGE_BLOCK_TEMPLATES,
    config: {
      type: 'div',
      className: 'apple-landing',
      style: { minHeight: '100vh', background: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', color: '#f5f5f7', lineHeight: '1.47059' },
      styleTagContent: `* { margin: 0; padding: 0; box-sizing: border-box; } .apple-landing { overflow-x: hidden; } .nav-bar { position: sticky; top: 0; z-index: 1000; background: rgba(0, 0, 0, 0.8); backdrop-filter: saturate(180%) blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); } .nav-content { max-width: 980px; margin: 0 auto; padding: 0 22px; display: flex; justify-content: space-between; align-items: center; height: 44px; } .nav-logo { font-size: 21px; font-weight: 600; color: #f5f5f7; text-decoration: none; } .nav-links { display: flex; gap: 32px; list-style: none; } .nav-link { color: #f5f5f7; text-decoration: none; font-size: 12px; opacity: 0.8; transition: opacity 0.3s; } .nav-link:hover { opacity: 1; } .hero-section { padding: 80px 20px 120px; text-align: center; background: linear-gradient(180deg, #000 0%, #1a1a1a 100%); position: relative; overflow: hidden; } .hero-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 1400px; height: 1400px; background: radial-gradient(circle, rgba(0, 113, 227, 0.15) 0%, transparent 70%); pointer-events: none; } .hero-eyebrow { font-size: 17px; font-weight: 600; color: #0071e3; margin-bottom: 8px; letter-spacing: 0.5px; } .hero-title { font-size: clamp(48px, 8vw, 96px); font-weight: 700; line-height: 1.05; letter-spacing: -0.015em; margin-bottom: 16px; background: linear-gradient(180deg, #fff 0%, #a0a0a0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; } .hero-subtitle { font-size: clamp(21px, 3vw, 28px); color: #a1a1a6; margin-bottom: 32px; line-height: 1.4; font-weight: 400; } .hero-cta { display: inline-flex; gap: 16px; flex-wrap: wrap; justify-content: center; } .btn-primary, .btn-secondary { padding: 14px 28px; border-radius: 980px; font-size: 17px; font-weight: 400; text-decoration: none; transition: all 0.3s; border: none; cursor: pointer; display: inline-block; } .btn-primary { background: #0071e3; color: #fff; } .btn-primary:hover { background: #0077ed; transform: scale(1.02); } .btn-secondary { background: transparent; color: #2997ff; border: 1px solid #2997ff; } .btn-secondary:hover { background: rgba(41, 151, 255, 0.1); transform: scale(1.02); } .feature-section { padding: 100px 20px; background: #000; } .container { max-width: 1200px; margin: 0 auto; } .section-title { font-size: clamp(40px, 6vw, 64px); font-weight: 700; text-align: center; margin-bottom: 80px; letter-spacing: -0.015em; } .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; } .glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 48px 32px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; } .glass-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent); opacity: 0; transition: opacity 0.4s; } .glass-card:hover { transform: translateY(-8px); background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); } .glass-card:hover::before { opacity: 1; } .feature-icon { font-size: 56px; margin-bottom: 24px; display: inline-block; filter: drop-shadow(0 4px 12px rgba(41, 151, 255, 0.3)); } .feature-title { font-size: 28px; font-weight: 600; margin-bottom: 16px; letter-spacing: -0.01em; } .feature-description { font-size: 17px; color: #a1a1a6; line-height: 1.5; } .cta-section { padding: 120px 20px; text-align: center; background: linear-gradient(180deg, #000 0%, #0a0a0a 100%); position: relative; } .cta-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent); } .cta-title { font-size: clamp(40px, 6vw, 72px); font-weight: 700; margin-bottom: 24px; letter-spacing: -0.015em; } .cta-subtitle { font-size: 24px; color: #a1a1a6; margin-bottom: 40px; } .footer { background: #000; padding: 40px 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); } .footer-content { max-width: 980px; margin: 0 auto; text-align: center; color: #6e6e73; font-size: 12px; } .footer-links { display: flex; justify-content: center; gap: 24px; margin-bottom: 16px; flex-wrap: wrap; } .footer-link { color: #6e6e73; text-decoration: none; transition: color 0.3s; } .footer-link:hover { color: #f5f5f7; } @media (max-width: 768px) { .nav-links { display: none; } .feature-grid { grid-template-columns: 1fr; } }`,
      blocks: [ { id: generateId(), type: 'nav', className: 'nav-bar', blocks: [ { id: generateId(), type: 'div', className: 'nav-content', blocks: [ { id: generateId(), type: 'div', className: 'nav-logo', content: '⚡ Brand' }, { id: generateId(), type: 'div', className: 'nav-links', blocks: [ { id: generateId(), type: 'a', className: 'nav-link', content: 'Features', customProps: { href: '#features' } }, { id: generateId(), type: 'a', className: 'nav-link', content: 'Pricing', customProps: { href: '#pricing' } }, { id: generateId(), type: 'a', className: 'nav-link', content: 'About', customProps: { href: '#about' } }, { id: generateId(), type: 'a', className: 'nav-link', content: 'Contact', customProps: { href: '#contact' } } ] } ] } ] }, { id: generateId(), type: 'section', className: 'hero-section', blocks: [ { id: generateId(), type: 'div', className: 'hero-eyebrow', content: 'Introducing the future' }, { id: generateId(), type: 'h1', className: 'hero-title', content: 'Innovation at its finest.' }, { id: generateId(), type: 'p', className: 'hero-subtitle', content: 'Experience the next generation of technology designed to elevate your everyday life.' }, { id: generateId(), type: 'div', className: 'hero-cta', blocks: [ { id: generateId(), type: 'a', className: 'btn-primary', content: 'Get Started', customProps: { href: '#' } }, { id: generateId(), type: 'a', className: 'btn-secondary', content: 'Learn More', customProps: { href: '#' } } ] } ] }, { id: generateId(), type: 'section', className: 'feature-section', customProps: { id: 'features' }, blocks: [ { id: generateId(), type: 'div', className: 'container', blocks: [ { id: generateId(), type: 'h2', className: 'section-title', content: 'Powerful Features' }, { id: generateId(), type: 'div', className: 'feature-grid', blocks: [ { id: generateId(), type: 'div', className: 'glass-card', blocks: [ { id: generateId(), type: 'div', className: 'feature-icon', content: '⚡' }, { id: generateId(), type: 'h3', className: 'feature-title', content: 'Lightning Fast' }, { id: generateId(), type: 'p', className: 'feature-description', content: 'Built for speed and performance. Experience instant responses and seamless interactions.' } ] }, { id: generateId(), type: 'div', className: 'glass-card', blocks: [ { id: generateId(), type: 'div', className: 'feature-icon', content: '🔒' }, { id: generateId(), type: 'h3', className: 'feature-title', content: 'Secure by Default' }, { id: generateId(), type: 'p', className: 'feature-description', content: 'Enterprise-grade security with end-to-end encryption and privacy protection.' } ] }, { id: generateId(), type: 'div', className: 'glass-card', blocks: [ { id: generateId(), type: 'div', className: 'feature-icon', content: '🎨' }, { id: generateId(), type: 'h3', className: 'feature-title', content: 'Beautiful Design' }, { id: generateId(), type: 'p', className: 'feature-description', content: 'Meticulously crafted interface that delights users and enhances productivity.' } ] } ] } ] } ] }, { id: generateId(), type: 'section', className: 'cta-section', blocks: [ { id: generateId(), type: 'h2', className: 'cta-title', content: 'Ready to get started?' }, { id: generateId(), type: 'p', className: 'cta-subtitle', content: 'Join thousands of satisfied customers today.' }, { id: generateId(), type: 'div', className: 'hero-cta', blocks: [ { id: generateId(), type: 'a', className: 'btn-primary', content: 'Start Free Trial', customProps: { href: '#' } } ] } ] }, { id: generateId(), type: 'footer', className: 'footer', blocks: [ { id: generateId(), type: 'div', className: 'footer-content', blocks: [ { id: generateId(), type: 'div', className: 'footer-links', blocks: [ { id: generateId(), type: 'a', className: 'footer-link', content: 'Privacy', customProps: { href: '#' } }, { id: generateId(), type: 'a', className: 'footer-link', content: 'Terms', customProps: { href: '#' } }, { id: generateId(), type: 'a', className: 'footer-link', content: 'Support', customProps: { href: '#' } }, { id: generateId(), type: 'a', className: 'footer-link', content: 'Careers', customProps: { href: '#' } } ] }, { id: generateId(), type: 'p', content: '© 2025 Brand Inc. All rights reserved.' } ] } ] } ]
    }
  }
};

// ============================================
// MOCK DATA & APP EXPORT
// ============================================

export function getMockSiteData() {
    return {
        _id: "site_123",
        domain: "test.com",
        name: "My Test Site",
        pages: [
            { id: "page_home_1", name: "Home", slug: "/", isHomepage: true, templateKey: 'landing', config: PAGE_TEMPLATES.landing.config },
            { id: "page_blank_2", name: "About Us", slug: "/about", isHomepage: false, templateKey: 'blank', config: PAGE_TEMPLATES.blank.config }
        ]
    };
}
