# HeaderCherxy Component - Complete Technical Documentation

## File Structure
```
header-cheryx/
├── HeaderCherxy.module.scss       # Styles
├── HeaderCherxy.module.scss.d.ts  # TypeScript definitions
├── header-cheryx.js               # Main component
└── social-media-links.js          # Social links subcomponent
```

## Component Architecture

### HeaderCherxy (Main Component)

**Purpose**: Full responsive header with logo, navigation, social links, and mobile menu.

**Dependencies**: 
- `LeftSideMenu` component (mobile hamburger menu)
- `SocialMediaLinks` component
- Next.js `Link` component (passed as prop)

#### Props Interface
```javascript
{
  isAdmin: boolean,              // Controls login vs dashboard link
  isEdit: boolean,               // Enables contentEditable on nav items
  url: string,                   // Current page URL for active state
  showNavigator: boolean,        // Default: true, toggles bottom nav
  Link: Component,               // Next.js Link component
  mainImageUrl: string,          // Default: "", overrides logo background
  MenuData: Array<{              // Navigation items
    text: string,
    url: string
  }>,
  onMenuDataChange: Function,    // Callback when menu edited
  styles: Object,                // Custom styles for nav wrapper
  socialLinks: Array,            // Passed to SocialMediaLinks
  socialLinksStyles: Object      // Passed to SocialMediaLinks
}
```

#### Default MenuData
```javascript
[
  { text: 'Trang chủ', url: '/' },
  { text: 'Lớp đan thú', url: '/lop-dan-len' },
  { text: 'Mẫu đan miễn phí', url: '/mau-dan-len-mien-phi' },
  { text: 'Tự học đan len cơ bản', url: '/tu-hoc-dan-co-ban' },
  { text: 'Mẹo đan móc lượm lặt', url: `/${process?.env?.NEXT_PUBLIC_PRE_TIP}` }
]
```

#### Component Logic Flow
1. **Style Override**: Merges `wrapperStyle` prop with defaults
2. **Logo Image**: If `mainImageUrl` provided, overrides background-image
3. **Edit Mode**: When `isEdit=true`, nav items become contentEditable
4. **Menu Change Handler**: `handleMenuTextChange` updates MenuData on blur
5. **Active Link**: Compares `url` prop with menu item URLs, applies `selectedLink` class

#### Render Structure
```jsx
<header>
  <div className="header">
    <SocialMediaLinks />           // Left: Social icons (desktop only)
    <LeftSideMenu />               // Mobile hamburger menu
    <div className="rightSide">    // Right: User/admin link
      <Link href={isAdmin ? '/dashboard' : '/login'}>
        <img src="user.png" />
      </Link>
    </div>
  </div>
  
  <div className="logo">           // Center: Cheryx logo
    <Link href="/">
      <div className="cheryx" />
    </Link>
  </div>
  
  {showNavigator && (              // Bottom: Navigation bar
    <nav className="nav">
      {MenuData.map(item => 
        isEdit 
          ? <a contentEditable onBlur={handleMenuTextChange}>{item.text}</a>
          : <Link href={item.url}><a>{item.text}</a></Link>
      )}
    </nav>
  )}
</header>
```

---

### SocialMediaLinks Component

**Purpose**: Reusable social media icon links with configurable platforms.

#### Props Interface
```javascript
{
  socialLinks: Array<{
    name: string,      // Platform name (alt text)
    url: string,       // Profile URL
    icon: string,      // Icon image URL
    width: number,     // Icon width in px
    height: number     // Icon height in px
  }>,
  style: Object        // Custom wrapper styles
}
```

#### Default socialLinks
```javascript
[
  { name: 'Facebook', url: 'https://www.facebook.com/Cheryx.KnitADream', 
    icon: 'https://cheryx.com/images/fb.svg', width: 11, height: 18 },
  { name: 'Ravelry', url: 'https://www.ravelry.com/stores/cheryx', 
    icon: 'https://cheryx.com/images/rv.svg', width: 20, height: 20 },
  { name: 'Instagram', url: 'https://www.instagram.com/cheryx.knitadream', 
    icon: 'https://cheryx.com/images/in.svg', width: 20, height: 20 },
  { name: 'Youtube', url: 'https://www.youtube.com/channel/UCf0jCxiSGh_pBExFN3k1CIA', 
    icon: 'https://cheryx.com/images/yo.svg', width: 26, height: 20 },
  { name: 'Pinterest', url: 'https://www.pinterest.com/Cheryx_knit_a_dream', 
    icon: 'https://cheryx.com/images/pi.svg', width: 20, height: 20 }
]
```

#### Render Logic
```jsx
<div className="leftSide">
  {socialLinks.map(link => (
    <a key={link.name} href={link.url} target="_blank" rel="noreferrer">
      <img alt={link.name} src={link.icon} style={{width, height}} />
    </a>
  ))}
</div>
```

---

## CSS Module Structure (SCSS)

### Layout Hierarchy
```
.header                    // Top bar (height: 47px, border-bottom)
├── .leftSide             // Social icons (hidden on mobile)
├── .hamburger            // Mobile menu trigger (hidden on desktop)
│   └── .overlay          // Full-screen overlay (mobile)
│       └── .menu         // Slide-in drawer (78.5vw wide)
│           ├── .searchInput   // Search bar placeholder
│           ├── .links         // Social links in mobile menu
│           └── .items         // Nav items in mobile menu
└── .rightSide            // User login link

.logo                      // Logo section (centered)
└── .cheryx               // Logo image (394x98px desktop, 295.5x66.75px mobile)

.nav                       // Bottom navigation bar (hidden on mobile)
└── a                     // Nav links
    └── .selectedLink     // Active link state
```

### Responsive Breakpoints
- **Mobile**: `max-width: $mobile-breakpoint`
  - Hide: `.leftSide`, `.nav`, `.search`
  - Show: `.hamburger`
  - Logo: Smaller dimensions
- **Desktop**: `min-width: $mobile-breakpoint`
  - Hide: `.hamburger`
  - Show: All desktop elements

### Key Style Features

#### Header (.header)
- `display: flex`, `justify-content: space-between`
- `height: 47px`, `padding-bottom: 6px`
- `border-bottom: 0.5px solid rgba(0,0,0,0.4)`
- Responsive padding at `max-width: $body-max-width`

#### Mobile Menu (.hamburger .overlay .menu)
- Fixed positioning: `top: 0, left: 0`
- Width: `78.5vw`
- Animation: `slideInLeft` (0.3s duration)
- Background: `white`
- Contains:
  - Search input (hidden by default)
  - Social links (flex row, space-between)
  - Nav items (flex column, 24px font, 30px margin-bottom)

#### Logo (.logo .cheryx)
- Background image: `https://cheryx.com/images/cheryx-slogan.webp`
- Desktop: `394x98px`, padding `39px 0`
- Mobile: `295.5x66.75px`, padding `20px 0 12px`
- `background-size: contain`, `background-repeat: no-repeat`

#### Navigation Bar (.nav)
- `background-color: #F08C5F`
- `color: white`
- `font-family: "Big Shoulders Text"`
- `padding: 8px 100px 5px 100px`
- Links: `font-size: 20px`
- Hover/Active (`.selectedLink`): `color: #565555`
- Dividers: `width: 0.1px`, `height: 16px`, `background: white`

### TypeScript Definitions
All class names exported as strings for type-safe CSS Module imports.

---

## Usage Examples

### Basic Usage
```jsx
import HeaderCherxy from './header-cheryx';
import Link from 'next/link';

<HeaderCherxy 
  isAdmin={false}
  url="/current-page"
  Link={Link}
/>
```

### Custom Menu & Social Links
```jsx
<HeaderCherxy 
  isAdmin={true}
  url="/lop-dan-len"
  Link={Link}
  MenuData={[
    { text: 'Home', url: '/' },
    { text: 'About', url: '/about' }
  ]}
  socialLinks={[
    { name: 'Twitter', url: 'https://twitter.com/example', 
      icon: '/twitter.svg', width: 20, height: 20 }
  ]}
  showNavigator={true}
/>
```

### Editable Mode
```jsx
<HeaderCherxy 
  isEdit={true}
  MenuData={menuState}
  onMenuDataChange={(updatedMenu) => setMenuState(updatedMenu)}
  Link={Link}
/>
```

### Custom Logo
```jsx
<HeaderCherxy 
  mainImageUrl="https://example.com/custom-logo.png"
  Link={Link}
/>
```

### Custom Nav Styles
```jsx
<HeaderCherxy 
  styles={{ backgroundColor: '#FF5733', padding: '10px 50px' }}
  socialLinksStyles={{ gap: '20px' }}
  Link={Link}
/>
```

---

## Integration Notes

### Required External Components
1. **LeftSideMenu**: Mobile hamburger menu (not included in files)
   - Props: `Link`, `links`, `menuData`
   - `links` array format:
     ```javascript
     [{ url: string, iconStyle: { width, height, backgroundPosition } }]
     ```

2. **Next.js Link**: Must be passed as prop for routing

### Environment Variables
- `process.env.NEXT_PUBLIC_PRE_TIP`: Used in MenuData[4].url

### External Assets
- User icon: `https://cheryx.com/images/user.png` (12x16px)
- Logo: `https://cheryx.com/images/cheryx-slogan.webp`
- Social icons: `https://cheryx.com/images/{fb,rv,in,yo,pi}.svg`

### SCSS Variables Required
- `$body-max-width`: Desktop layout breakpoint
- `$mobile-breakpoint`: Mobile/desktop transition point
- Imported from: `../styles/variables.scss`

---

## Behavior Details

### Active Link Detection
- Compares `url` prop with each `MenuData[].url`
- Applies `.selectedLink` class (color: `#565555`)
- Works in both normal and edit modes

### Edit Mode Mechanics
1. Nav links rendered as `<a>` with `contentEditable={true}`
2. `suppressContentEditableWarning={true}` prevents React warnings
3. `onBlur` triggers `handleMenuTextChange(e, index)`
4. Handler extracts `e.target.innerText`, updates MenuData immutably
5. Calls `onMenuDataChange` with new array

### Mobile Menu Animation
- CSS animation: `slideInLeft`
- Duration: `0.3s`
- Fill mode: `both` (preserves start/end states)
- Overlay: `background-color: #80808040` (semi-transparent gray)
- Z-index: Menu `9999`, ensures top layer

### Search Input (Currently Hidden)
- Exists in mobile menu (`.searchInput`)
- Both input and icon have `display: none`
- Placeholder for future feature
- Styled: Border-radius `50px`, height `30px`, gray background

---

## Component Responsibilities

### HeaderCherxy
- ✅ Layout structure and responsive behavior
- ✅ Logo rendering with custom image support
- ✅ Navigation menu rendering (desktop bar)
- ✅ Active link highlighting
- ✅ Edit mode for menu text
- ✅ User/admin link routing
- ✅ Integration with LeftSideMenu (mobile)
- ✅ Integration with SocialMediaLinks

### SocialMediaLinks
- ✅ Render social media icons
- ✅ Open links in new tabs (`target="_blank"`)
- ✅ Configurable platforms via props
- ✅ Responsive sizing per icon

### SCSS Module
- ✅ Responsive layout (desktop/mobile)
- ✅ Mobile hamburger menu styling
- ✅ Slide-in animation
- ✅ Navigation bar theming
- ✅ Logo sizing and positioning

---

## Data Flow Diagram
```
Parent Component
    ↓ (props)
HeaderCherxy
    ├→ SocialMediaLinks (socialLinks, style)
    ├→ LeftSideMenu (Link, links, menuData)
    └→ Navigation
        ├→ (isEdit) contentEditable links
        │    ↓ (onBlur)
        │   handleMenuTextChange
        │    ↓
        │   onMenuDataChange callback
        │    ↓
        │   Parent updates MenuData
        └→ (normal) Next.js Link navigation
```