export type SearchResultType = 'component' | 'hook' | 'utility' | 'token' | 'page';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: SearchResultType;
  category: string;
  path: string;
  keywords?: string[];
}

export const searchIndex: SearchResult[] = [
  // Overview
  {
    id: 'overview',
    title: 'Overview',
    description: 'Introduction to the Sage Design Engine',
    type: 'page',
    category: 'Getting Started',
    path: 'overview',
  },

  // Tokens - Colors
  {
    id: 'tokens-colors',
    title: 'Colors',
    description: 'Color tokens and semantic color utilities',
    type: 'token',
    category: 'Design Tokens',
    path: 'tokens-colors',
    keywords: ['color', 'palette', 'theme', 'background', 'text', 'brand', 'status'],
  },
  {
    id: 'themes-palettes',
    title: 'Palettes',
    description: '21 curated color palettes across Professional, Creative, Natural, Vibrant, Minimal, Tech, and Warm categories with WCAG compliance',
    type: 'token',
    category: 'Themes',
    path: '#themes/palettes',
    keywords: ['color', 'palette', 'curated', 'professional', 'creative', 'natural', 'vibrant', 'minimal', 'tech', 'warm', 'wcag', 'accessibility', 'theme', 'preset', 'customization'],
  },
  {
    id: 'tokens-typography',
    title: 'Typography',
    description: 'Font families, sizes, and text styles',
    type: 'token',
    category: 'Design Tokens',
    path: 'tokens-typography',
    keywords: ['font', 'text', 'heading', 'body', 'size'],
  },
  {
    id: 'tokens-spacing',
    title: 'Spacing',
    description: 'Spacing scale and layout tokens',
    type: 'token',
    category: 'Design Tokens',
    path: 'tokens-spacing',
    keywords: ['margin', 'padding', 'gap', 'space', 'layout'],
  },
  {
    id: 'tokens-interactions',
    title: 'Interactions',
    description: 'Systematic hover, active, and focus state layers (Interaction Tokens) for consistent UI feedback',
    type: 'token',
    category: 'Design Tokens',
    path: 'tokens-interactions',
    keywords: ['hover', 'active', 'focus', 'state', 'layer', 'overlay', 'interactive', 'feedback', 'opacity'],
  },
  {
    id: 'tokens-motion',
    title: 'Motion',
    description: 'Animation timing and easing functions',
    type: 'token',
    category: 'Design Tokens',
    path: 'tokens-motion',
    keywords: ['animation', 'transition', 'duration', 'easing', 'motion'],
  },
  {
    id: 'warp-speed',
    title: 'Warp Speed',
    description: 'Immersive 3D starfield warp effect using WebGL',
    type: 'component',
    category: 'Motion',
    path: '#motion/warp-speed',
    keywords: ['motion', 'background', 'starfield', 'galaxy', 'webgl', 'immersive', 'space'],
  },
  {
    id: 'faulty-terminal',
    title: 'Faulty Terminal',
    description: 'Retro CRT monitor effect with glitch, scanlines and mouse interaction',
    type: 'component',
    category: 'Motion',
    path: '#motion/faulty-terminal',
    keywords: ['motion', 'background', 'crt', 'retro', 'glitch', 'terminal', 'scanline', 'cyberpunk'],
  },
  {
    id: 'open-graph-card',
    title: 'Open Graph Card',
    description: 'A specialized component for generating social preview images',
    type: 'component',
    category: 'Blocks',
    path: '#blocks/social/open-graph-card',
    keywords: ['og', 'opengraph', 'social', 'preview', 'card', 'meta'],
  },

  // Functional Categories - Actions
  {
    id: 'button',
    title: 'Button',
    description: 'A clickable element for user actions',
    type: 'component',
    category: 'Actions',
    path: '#actions/button',
    keywords: ['click', 'action', 'primary', 'secondary', 'cta'],
  },
  {
    id: 'toggle',
    title: 'Toggle',
    description: 'A two-state button that can be either on or off',
    type: 'component',
    category: 'Actions',
    path: '#actions/toggle',
    keywords: ['button', 'switch', 'state'],
  },
  {
    id: 'toggle-group',
    title: 'ToggleGroup',
    description: 'A set of two-state buttons that can be toggled on or off',
    type: 'component',
    category: 'Actions',
    path: '#actions/toggle-group',
    keywords: ['buttons', 'select', 'options'],
  },
  {
    id: 'link',
    title: 'Link',
    description: 'A navigational element for internal and external links',
    type: 'component',
    category: 'Actions',
    path: '#actions/link',
    keywords: ['anchor', 'navigation', 'href', 'url'],
  },

  // Functional Categories - Forms
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'A control that allows the user to toggle between checked and not checked',
    type: 'component',
    category: 'Forms',
    path: '#forms/checkbox',
    keywords: ['check', 'select', 'toggle', 'option', 'input'],
  },
  {
    id: 'combobox',
    title: 'Combobox',
    description: 'Autocomplete input and command palette',
    type: 'component',
    category: 'Forms',
    path: '#forms/combobox',
    keywords: ['autocomplete', 'select', 'search', 'input'],
  },
  {
    id: 'drag-drop',
    title: 'Drag & Drop',
    description: 'Sortable lists and tables with drag-and-drop reordering functionality',
    type: 'component',
    category: 'Forms',
    path: '#forms/drag-drop',
    keywords: ['drag', 'drop', 'sortable', 'reorder', 'dnd', 'draggable', 'sort', 'list', 'table'],
  },
  {
    id: 'form',
    title: 'Form',
    description: 'Form wrapper validation and error handling',
    type: 'component',
    category: 'Forms',
    path: '#forms/form',
    keywords: ['input', 'form', 'label', 'error', 'validation', 'field'],
  },
  {
    id: 'input',
    title: 'Input',
    description: 'Displays a form input field or a component that looks like an input field.',
    type: 'component',
    category: 'Forms',
    path: '#forms/input',
    keywords: ['form', 'text', 'field', 'entry'],
  },
  {
    id: 'input-otp',
    title: 'InputOTP',
    description: 'Accessible one-time password input',
    type: 'component',
    category: 'Forms',
    path: '#forms/input-otp',
    keywords: ['otp', 'password', 'code', 'authentication', 'verification'],
  },
  {
    id: 'label',
    title: 'Label',
    description: 'Renders an accessible label associated with controls',
    type: 'component',
    category: 'Forms',
    path: '#forms/label',
    keywords: ['form', 'text', 'tag', 'name'],
  },
  {
    id: 'radio-group',
    title: 'RadioGroup',
    description: 'Group of mutually exclusive radio buttons',
    type: 'component',
    category: 'Forms',
    path: '#forms/radio-group',
    keywords: ['radio', 'select', 'choice', 'option', 'form'],
  },
  {
    id: 'select',
    title: 'Select',
    description: 'Displays a list of options for the user to pick from',
    type: 'component',
    category: 'Forms',
    path: '#forms/select',
    keywords: ['dropdown', 'menu', 'option', 'picker'],
  },
  {
    id: 'slider',
    title: 'Slider',
    description: 'An input where the user selects a value from within a given range',
    type: 'component',
    category: 'Forms',
    path: '#forms/slider',
    keywords: ['input', 'range', 'volume', 'control'],
  },
  {
    id: 'switch',
    title: 'Switch',
    description: 'A control that allows the user to toggle between checked and not checked',
    type: 'component',
    category: 'Forms',
    path: '#forms/switch',
    keywords: ['toggle', 'checkbox', 'input', 'binary'],
  },
  {
    id: 'textarea',
    title: 'Textarea',
    description: 'Displays a form textarea or a component that looks like a textarea',
    type: 'component',
    category: 'Forms',
    path: '#forms/textarea',
    keywords: ['input', 'form', 'text', 'field', 'area'],
  },
  {
    id: 'theme-toggle',
    title: 'ThemeToggle',
    description: 'Switch between light and dark modes',
    type: 'component',
    category: 'Forms',
    path: '#forms/theme-toggle',
    keywords: ['theme', 'dark mode', 'light mode', 'switch'],
  },

  // Functional Categories - Navigation
  {
    id: 'breadcrumb',
    title: 'Breadcrumb',
    description: 'Displays the path to the current resource',
    type: 'component',
    category: 'Navigation',
    path: '#navigation/breadcrumb',
    keywords: ['navigation', 'path', 'location', 'crumbs', 'hierarchy'],
  },
  {
    id: 'command',
    title: 'Command',
    description: 'Fast, composable, unstyled command menu',
    type: 'component',
    category: 'Navigation',
    path: '#navigation/command',
    keywords: ['menu', 'shortcut', 'palette', 'search'],
  },
  {
    id: 'menubar',
    title: 'Menubar',
    description: 'A visually persistent menu common in desktop applications',
    type: 'component',
    category: 'Navigation',
    path: '#navigation/menubar',
    keywords: ['menu', 'navigation', 'desktop', 'commands'],
  },
  {
    id: 'navigation-menu',
    title: 'NavigationMenu',
    description: 'A collection of links for navigating websites',
    type: 'component',
    category: 'Navigation',
    path: '#navigation/navigation-menu',
    keywords: ['nav', 'header', 'links', 'menu'],
  },
  {
    id: 'pagination',
    title: 'Pagination',
    description: 'Pagination with page navigation, next and previous links',
    type: 'component',
    category: 'Navigation',
    path: '#navigation/pagination',
    keywords: ['nav', 'pages', 'next', 'previous'],
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'A set of layered sections of content-known as tab panels-that are displayed one at a time',
    type: 'component',
    category: 'Navigation',
    path: '#navigation/tabs',
    keywords: ['navigation', 'panels', 'sections', 'switch'],
  },

  // Functional Categories - Overlays
  {
    id: 'alert-dialog',
    title: 'AlertDialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response',
    type: 'component',
    category: 'Overlays',
    path: '#overlays/alert-dialog',
    keywords: ['modal', 'confirm', 'alert', 'dialog'],
  },
  {
    id: 'context-menu',
    title: 'ContextMenu',
    description: 'Displays a menu to the user — such as a set of actions or functions — triggered by a button',
    type: 'component',
    category: 'Overlays',
    path: '#overlays/context-menu',
    keywords: ['menu', 'right-click', 'popup'],
  },
  {
    id: 'dialog',
    title: 'Dialog',
    description: 'A window overlaid on either the primary window or another dialog window',
    type: 'component',
    category: 'Overlays',
    path: '#overlays/dialog',
    keywords: ['modal', 'popup', 'alert', 'window'],
  },
  {
    id: 'drawer',
    title: 'Drawer',
    description: 'A drawer component for mobile devices',
    type: 'component',
    category: 'Overlays',
    path: '#overlays/drawer',
    keywords: ['sidebar', 'mobile', 'sheet', 'panel'],
  },
  {
    id: 'dropdown-menu',
    title: 'Dropdown Menu',
    description: 'A menu that appears when clicking a trigger element',
    type: 'component',
    category: 'Overlays',
    path: '#overlays/dropdown-menu',
    keywords: ['menu', 'select', 'options', 'popover', 'dropdown'],
  },
  {
    id: 'hover-card',
    title: 'HoverCard',
    description: 'For sighted users to preview content available behind a link',
    type: 'component',
    category: 'Overlays',
    path: '#overlays/hover-card',
    keywords: ['preview', 'tooltip', 'popover', 'hover'],
  },
  {
    id: 'popover',
    title: 'Popover',
    description: 'Displays rich content in a portal, triggered by a button',
    type: 'component',
    category: 'Overlays',
    path: '#overlays/popover',
    keywords: ['tooltip', 'menu', 'dialog', 'overlay'],
  },
  {
    id: 'sheet',
    title: 'Sheet',
    description: 'Extends the Dialog component to display content that complements the main screen',
    type: 'component',
    category: 'Overlays',
    path: '#overlays/sheet',
    keywords: ['drawer', 'sidebar', 'modal', 'panel'],
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it',
    type: 'component',
    category: 'Overlays',
    path: '#overlays/tooltip',
    keywords: ['popup', 'info', 'help', 'hover'],
  },

  // Functional Categories - Feedback
  {
    id: 'alert',
    title: 'Alert',
    description: 'Displays a callout for user attention',
    type: 'component',
    category: 'Feedback',
    path: '#feedback/alert',
    keywords: ['warning', 'error', 'info', 'success', 'notification', 'callout'],
  },
  {
    id: 'progress',
    title: 'Progress',
    description: 'Displays an indicator showing the completion progress of a task',
    type: 'component',
    category: 'Feedback',
    path: '#feedback/progress',
    keywords: ['loading', 'status', 'bar', 'loader'],
  },
  {
    id: 'skeleton',
    title: 'Skeleton',
    description: 'Use to show a placeholder while content is loading',
    type: 'component',
    category: 'Feedback',
    path: '#feedback/skeleton',
    keywords: ['loading', 'placeholder', 'shim'],
  },
  {
    id: 'sonner',
    title: 'Sonner',
    description: 'An opinionated toast component for React',
    type: 'component',
    category: 'Feedback',
    path: '#feedback/sonner',
    keywords: ['toast', 'notification', 'alert'],
  },
  {
    id: 'toaster',
    title: 'Toaster',
    description: 'The provider and viewport for toast notifications',
    type: 'component',
    category: 'Feedback',
    path: '#feedback/toaster',
    keywords: ['notification', 'provider', 'container'],
  },

  // Functional Categories - Data Display
  {
    id: 'avatar',
    title: 'Avatar',
    description: 'User profile picture or fallback with status indicator',
    type: 'component',
    category: 'Data Display',
    path: '#data-display/avatar',
    keywords: ['profile', 'user', 'image', 'photo', 'status'],
  },
  {
    id: 'badge',
    title: 'Badge',
    description: 'A small label for status, counts, or categorization',
    type: 'component',
    category: 'Data Display',
    path: '#data-display/badge',
    keywords: ['label', 'tag', 'status', 'count', 'pill'],
  },
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'A date field component that allows users to enter and edit date',
    type: 'component',
    category: 'Data Display',
    path: '#data-display/calendar',
    keywords: ['date', 'picker', 'time', 'schedule'],
  },
  {
    id: 'card',
    title: 'Card',
    description: 'A container for grouping related content',
    type: 'component',
    category: 'Data Display',
    path: '#data-display/card',
    keywords: ['container', 'box', 'content', 'surface'],
  },
  {
    id: 'data-table',
    title: 'Data Table',
    description: 'Powerful table with sorting, filtering, and pagination',
    type: 'component',
    category: 'Data Display',
    path: '#data-display/data-table',
    keywords: ['table', 'grid', 'data', 'sort', 'filter'],
  },
  {
    id: 'table',
    title: 'Table',
    description: 'A responsive table component',
    type: 'component',
    category: 'Data Display',
    path: '#data-display/table',
    keywords: ['data', 'grid', 'rows', 'columns', 'list'],
  },

  // Functional Categories - Layout
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'A vertically stacked set of interactive headings that each reveal a section of content',
    type: 'component',
    category: 'Layout',
    path: '#layout/accordion',
    keywords: ['collapse', 'expand', 'panel', 'content', 'faq'],
  },
  {
    id: 'aspect-ratio',
    title: 'AspectRatio',
    description: 'Displays content within a desired ratio',
    type: 'component',
    category: 'Layout',
    path: '#layout/aspect-ratio',
    keywords: ['image', 'video', 'ratio', 'scale'],
  },
  {
    id: 'carousel',
    title: 'Carousel',
    description: 'A carousel with motion and swipe support',
    type: 'component',
    category: 'Layout',
    path: '#layout/carousel',
    keywords: ['slider', 'gallery', 'swipe', 'images'],
  },
  {
    id: 'collapsible',
    title: 'Collapsible',
    description: 'An interactive component which expands/collapses a panel',
    type: 'component',
    category: 'Layout',
    path: '#layout/collapsible',
    keywords: ['expand', 'collapse', 'panel', 'accordion', 'reveal'],
  },
  {
    id: 'date-picker',
    title: 'DatePicker',
    description: 'A date picker component with range and presets',
    type: 'component',
    category: 'Layout',
    path: '#layout/date-picker',
    keywords: ['calendar', 'date', 'select', 'time'],
  },
  {
    id: 'resizable',
    title: 'Resizable',
    description: 'Accessible resizable panel groups and layouts',
    type: 'component',
    category: 'Layout',
    path: '#layout/resizable',
    keywords: ['layout', 'panel', 'split', 'resize'],
  },
  {
    id: 'scroll-area',
    title: 'ScrollArea',
    description: 'Augments native scroll functionality for custom, cross-browser styling',
    type: 'component',
    category: 'Layout',
    path: '#layout/scroll-area',
    keywords: ['container', 'scroll', 'box'],
  },
  {
    id: 'separator',
    title: 'Separator',
    description: 'Visually or semantically separates content',
    type: 'component',
    category: 'Layout',
    path: '#layout/separator',
    keywords: ['divider', 'hr', 'line'],
  },

  // Hooks
  {
    id: 'use-form',
    title: 'useForm',
    description: 'Form state management with validation',
    type: 'hook',
    category: 'Hooks',
    path: '#hooks/use-form',
    keywords: ['form', 'validation', 'state', 'input', 'submit'],
  },
  {
    id: 'use-theme',
    title: 'useTheme',
    description: 'Access and control theme settings',
    type: 'hook',
    category: 'Hooks',
    path: '#hooks/use-theme',
    keywords: ['theme', 'dark mode', 'light mode', 'color scheme'],
  },
  {
    id: 'use-toast',
    title: 'useToast',
    description: 'Display toast notifications',
    type: 'hook',
    category: 'Hooks',
    path: '#hooks/use-toast',
    keywords: ['toast', 'notification', 'alert', 'message'],
  },
  {
    id: 'use-motion-preference',
    title: 'useMotionPreference',
    description: 'Detect user motion preferences for accessibility',
    type: 'hook',
    category: 'Hooks',
    path: '#hooks/use-motion-preference',
    keywords: ['motion', 'animation', 'accessibility', 'prefers-reduced-motion'],
  },

  // Utilities
  {
    id: 'validation-utils',
    title: 'Validation Utilities',
    description: 'Form field and data validation helpers',
    type: 'utility',
    category: 'Utilities',
    path: '#utilities/validation',
    keywords: ['validation', 'form', 'validate', 'pattern', 'email', 'required'],
  },
  {
    id: 'color-utils',
    title: 'Color Utilities',
    description: 'Color manipulation and accessibility checking',
    type: 'utility',
    category: 'Utilities',
    path: '#utilities/colors',
    keywords: ['color', 'contrast', 'accessibility', 'wcag', 'hex', 'rgb'],
  },
  {
    id: 'animation-utils',
    title: 'Animation Utilities',
    description: 'Framer Motion animation presets and variants',
    type: 'utility',
    category: 'Utilities',
    path: '#utilities/animations',
    keywords: ['animation', 'motion', 'variants', 'transition', 'framer'],
  },

  // Templates
  {
    id: 'templates',
    title: 'Templates',
    description: 'Page templates and composition patterns',
    type: 'page',
    category: 'Templates',
    path: '#templates',
    keywords: ['template', 'pattern', 'layout', 'page', 'composition'],
  },
  {
    id: 'page-template',
    title: 'Page Template',
    description: 'Swiss Grid-based page layout template with header, title, breadcrumbs, and content',
    type: 'component',
    category: 'Templates',
    path: '#templates/page-template',
    keywords: ['template', 'page', 'layout', 'swiss grid', 'header', 'breadcrumbs', 'title', 'subtitle', 'structure', 'composition'],
  },

  // Blocks & Patterns
  {
    id: 'primary-nav',
    title: 'PrimaryNav',
    description: 'Main horizontal navigation component',
    type: 'component',
    category: 'Blocks',
    path: '#blocks/primary-nav',
    keywords: ['navigation', 'header', 'menu', 'nav'],
  },
  {
    id: 'secondary-nav',
    title: 'SecondaryNav',
    description: 'Secondary navigation with tabs',
    type: 'component',
    category: 'Blocks',
    path: '#blocks/secondary-nav',
    keywords: ['navigation', 'tabs', 'menu', 'secondary'],
  },
  {
    id: 'footer',
    title: 'Footer',
    description: 'Site footer with links and information',
    type: 'component',
    category: 'Blocks',
    path: '#blocks/footer',
    keywords: ['footer', 'links', 'navigation', 'copyright'],
  },
  {
    id: 'customizer',
    title: 'Customizer',
    description: 'A floating panel for real-time theme and preference customization with motion controls',
    type: 'component',
    category: 'Blocks',
    path: '#blocks/customizer',
    keywords: ['customizer', 'theme', 'preferences', 'floating panel', 'real-time', 'motion', 'settings', 'blocks', 'patterns'],
  },
];

// Fuzzy search function
export function searchContent(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();

  return searchIndex
    .map((item) => {
      let score = 0;
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
      const categoryMatch = item.category.toLowerCase().includes(searchTerm);
      const keywordMatch = item.keywords?.some(k => k.toLowerCase().includes(searchTerm)) || false;

      // Scoring system
      if (item.title.toLowerCase() === searchTerm) score += 100; // Exact match
      if (item.title.toLowerCase().startsWith(searchTerm)) score += 50; // Starts with
      if (titleMatch) score += 30;
      if (categoryMatch) score += 20;
      if (keywordMatch) score += 15;
      if (descriptionMatch) score += 10;

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Return top 10 results
}

// Get icon for result type
export function getResultTypeIcon(type: SearchResultType): string {
  switch (type) {
    case 'component':
      return '🧩';
    case 'hook':
      return '🪝';
    case 'utility':
      return '🛠️';
    case 'token':
      return '🎨';
    case 'page':
      return '📖';
    default:
      return '📄';
  }
}
