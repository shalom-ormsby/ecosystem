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
    description: 'Introduction to the Sage Design System',
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
    id: 'tokens-motion',
    title: 'Motion',
    description: 'Animation timing and easing functions',
    type: 'token',
    category: 'Design Tokens',
    path: 'tokens-motion',
    keywords: ['animation', 'transition', 'duration', 'easing', 'motion'],
  },

  // Atoms
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'A vertically stacked set of interactive headings that each reveal a section of content',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-accordion',
    keywords: ['collapse', 'expand', 'panel', 'content', 'faq'],
  },
  {
    id: 'alert',
    title: 'Alert',
    description: 'Displays a callout for user attention',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-alert',
    keywords: ['warning', 'error', 'info', 'success', 'notification', 'callout'],
  },
  {
    id: 'alert-dialog',
    title: 'AlertDialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-alert-dialog',
    keywords: ['modal', 'confirm', 'alert', 'dialog'],
  },
  {
    id: 'aspect-ratio',
    title: 'AspectRatio',
    description: 'Displays content within a desired ratio',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-aspect-ratio',
    keywords: ['image', 'video', 'ratio', 'scale'],
  },
  {
    id: 'avatar',
    title: 'Avatar',
    description: 'User profile picture or fallback with status indicator',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-avatar',
    keywords: ['profile', 'user', 'image', 'photo', 'status'],
  },
  {
    id: 'badge',
    title: 'Badge',
    description: 'A small label for status, counts, or categorization',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-badge',
    keywords: ['label', 'tag', 'status', 'count', 'pill'],
  },
  {
    id: 'breadcrumb',
    title: 'Breadcrumb',
    description: 'Displays the path to the current resource',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-breadcrumb',
    keywords: ['navigation', 'path', 'location', 'crumbs'],
  },
  {
    id: 'button',
    title: 'Button',
    description: 'A clickable element for user actions',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-button',
    keywords: ['click', 'action', 'primary', 'secondary', 'cta'],
  },
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'A date field component that allows users to enter and edit date',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-calendar',
    keywords: ['date', 'picker', 'time', 'schedule'],
  },
  {
    id: 'card',
    title: 'Card',
    description: 'A container for grouping related content',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-card',
    keywords: ['container', 'box', 'content', 'surface'],
  },
  {
    id: 'carousel',
    title: 'Carousel',
    description: 'A carousel with motion and swipe support',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-carousel',
    keywords: ['slider', 'gallery', 'swipe', 'images'],
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'A control that allows the user to toggle between checked and not checked',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-checkbox',
    keywords: ['check', 'select', 'toggle', 'option', 'input'],
  },
  {
    id: 'collapsible',
    title: 'Collapsible',
    description: 'An interactive component which expands/collapses a panel',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-collapsible',
    keywords: ['expand', 'collapse', 'panel', 'accordion', 'reveal'],
  },
  {
    id: 'combobox',
    title: 'Combobox',
    description: 'Autocomplete input and command palette',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-combobox',
    keywords: ['autocomplete', 'select', 'search', 'input'],
  },
  {
    id: 'command',
    title: 'Command',
    description: 'Fast, composable, unstyled command menu',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-command',
    keywords: ['menu', 'shortcut', 'palette', 'search'],
  },
  {
    id: 'context-menu',
    title: 'ContextMenu',
    description: 'Displays a menu to the user — such as a set of actions or functions — triggered by a button',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-context-menu',
    keywords: ['menu', 'right-click', 'popup'],
  },
  {
    id: 'date-picker',
    title: 'DatePicker',
    description: 'A date picker component with range and presets',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-date-picker',
    keywords: ['calendar', 'date', 'select', 'time'],
  },
  {
    id: 'dialog',
    title: 'Dialog',
    description: 'A window overlaid on either the primary window or another dialog window',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-dialog',
    keywords: ['modal', 'popup', 'alert', 'window'],
  },
  {
    id: 'drawer',
    title: 'Drawer',
    description: 'A drawer component for mobile devices',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-drawer',
    keywords: ['sidebar', 'mobile', 'sheet', 'panel'],
  },
  {
    id: 'hover-card',
    title: 'HoverCard',
    description: 'For sighted users to preview content available behind a link',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-hover-card',
    keywords: ['preview', 'tooltip', 'popover', 'hover'],
  },
  {
    id: 'input',
    title: 'Input',
    description: 'Displays a form input field or a component that looks like an input field.',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-input',
    keywords: ['form', 'text', 'field', 'entry'],
  },
  {
    id: 'input-otp',
    title: 'InputOTP',
    description: 'Accessible one-time password input',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-input-otp',
    keywords: ['otp', 'password', 'code', 'authentication', 'verification'],
  },
  {
    id: 'label',
    title: 'Label',
    description: 'Renders an accessible label associated with controls',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-label',
    keywords: ['form', 'text', 'tag', 'name'],
  },
  {
    id: 'link',
    title: 'Link',
    description: 'A navigational element for internal and external links',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-link',
    keywords: ['anchor', 'navigation', 'href', 'url'],
  },
  {
    id: 'menubar',
    title: 'Menubar',
    description: 'A visually persistent menu common in desktop applications',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-menubar',
    keywords: ['menu', 'navigation', 'desktop', 'commands'],
  },
  {
    id: 'navigation-menu',
    title: 'NavigationMenu',
    description: 'A collection of links for navigating websites',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-navigation-menu',
    keywords: ['nav', 'header', 'links', 'menu'],
  },
  {
    id: 'pagination',
    title: 'Pagination',
    description: 'Pagination with page navigation, next and previous links',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-pagination',
    keywords: ['nav', 'pages', 'next', 'previous'],
  },
  {
    id: 'popover',
    title: 'Popover',
    description: 'Displays rich content in a portal, triggered by a button',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-popover',
    keywords: ['tooltip', 'menu', 'dialog', 'overlay'],
  },
  {
    id: 'progress',
    title: 'Progress',
    description: 'Displays an indicator showing the completion progress of a task',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-progress',
    keywords: ['loading', 'status', 'bar', 'loader'],
  },
  {
    id: 'progress-bar',
    title: 'ProgressBar',
    description: 'Visual indicator of task completion',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-progress-bar',
    keywords: ['progress', 'loading', 'completion', 'percentage'],
  },
  {
    id: 'resizable',
    title: 'Resizable',
    description: 'Accessible resizable panel groups and layouts',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-resizable',
    keywords: ['layout', 'panel', 'split', 'resize'],
  },
  {
    id: 'scroll-area',
    title: 'ScrollArea',
    description: 'Augments native scroll functionality for custom, cross-browser styling',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-scroll-area',
    keywords: ['container', 'scroll', 'box'],
  },
  {
    id: 'select',
    title: 'Select',
    description: 'Displays a list of options for the user to pick from',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-select',
    keywords: ['dropdown', 'menu', 'option', 'picker'],
  },
  {
    id: 'separator',
    title: 'Separator',
    description: 'Visually or semantically separates content',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-separator',
    keywords: ['divider', 'hr', 'line'],
  },
  {
    id: 'sheet',
    title: 'Sheet',
    description: 'Extends the Dialog component to display content that complements the main screen',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-sheet',
    keywords: ['drawer', 'sidebar', 'modal', 'panel'],
  },
  {
    id: 'skeleton',
    title: 'Skeleton',
    description: 'Use to show a placeholder while content is loading',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-skeleton',
    keywords: ['loading', 'placeholder', 'shim'],
  },
  {
    id: 'slider',
    title: 'Slider',
    description: 'An input where the user selects a value from within a given range',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-slider',
    keywords: ['input', 'range', 'volume', 'control'],
  },
  {
    id: 'spinner',
    title: 'Spinner',
    description: 'Loading indicator for async operations',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-spinner',
    keywords: ['loading', 'loader', 'progress', 'wait', 'async'],
  },
  {
    id: 'switch',
    title: 'Switch',
    description: 'A control that allows the user to toggle between checked and not checked',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-switch',
    keywords: ['toggle', 'checkbox', 'input', 'binary'],
  },
  {
    id: 'table',
    title: 'Table',
    description: 'A responsive table component',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-table',
    keywords: ['data', 'grid', 'rows', 'columns', 'list'],
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-tabs',
    keywords: ['navigation', 'panels', 'sections', 'switch'],
  },
  {
    id: 'textarea',
    title: 'Textarea',
    description: 'Displays a form textarea or a component that looks like a textarea',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-textarea',
    keywords: ['input', 'form', 'text', 'field', 'area'],
  },
  {
    id: 'toast',
    title: 'Toast',
    description: 'A succinct message that is displayed temporarily',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-toast',
    keywords: ['notification', 'alert', 'message', 'snackbar'],
  },
  {
    id: 'toaster',
    title: 'Toaster',
    description: 'The provider and viewport for toast notifications',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-toaster',
    keywords: ['notification', 'provider', 'container'],
  },
  {
    id: 'toggle',
    title: 'Toggle',
    description: 'A two-state button that can be either on or off',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-toggle',
    keywords: ['button', 'switch', 'state'],
  },
  {
    id: 'toggle-group',
    title: 'ToggleGroup',
    description: 'A set of two-state buttons that can be toggled on or off',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-toggle-group',
    keywords: ['buttons', 'select', 'options'],
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-tooltip',
    keywords: ['popup', 'info', 'help', 'hover'],
  },

  // Molecules
  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    description: 'Navigation showing page hierarchy with clickable links',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-breadcrumbs',
    keywords: ['navigation', 'breadcrumb', 'path', 'hierarchy', 'location', 'trail'],
  },
  {
    id: 'dropdown',
    title: 'Dropdown',
    description: 'A menu that appears when clicking a trigger element',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-dropdown',
    keywords: ['menu', 'select', 'options', 'popover'],
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    description: 'Contextual information on hover or focus',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-tooltip',
    keywords: ['hint', 'help', 'info', 'popover'],
  },
  {
    id: 'theme-toggle',
    title: 'ThemeToggle',
    description: 'Switch between light and dark modes',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-theme-toggle',
    keywords: ['theme', 'dark mode', 'light mode', 'switch'],
  },
  {
    id: 'theme-switcher',
    title: 'ThemeSwitcher',
    description: 'Enhanced theme control panel with expandable options',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-theme-switcher',
    keywords: ['theme', 'dark mode', 'light mode', 'settings', 'system', 'auto'],
  },
  {
    id: 'form-field',
    title: 'FormField',
    description: 'Complete form field with label, input, and error handling',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-form-field',
    keywords: ['input', 'form', 'label', 'error', 'validation'],
  },
  {
    id: 'search-bar',
    title: 'SearchBar',
    description: 'Debounced search input with clear functionality',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-search-bar',
    keywords: ['search', 'input', 'filter', 'find', 'query'],
  },
  {
    id: 'radio-group',
    title: 'RadioGroup',
    description: 'Group of mutually exclusive radio buttons',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-radio-group',
    keywords: ['radio', 'select', 'choice', 'option', 'form'],
  },
  {
    id: 'checkbox-group',
    title: 'CheckboxGroup',
    description: 'Group of selectable checkboxes',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-checkbox-group',
    keywords: ['checkbox', 'select', 'multi-select', 'form'],
  },

  // Organisms
  {
    id: 'primary-nav',
    title: 'PrimaryNav',
    description: 'Main horizontal navigation component',
    type: 'component',
    category: 'Organisms',
    path: 'organisms-primarynav',
    keywords: ['navigation', 'header', 'menu', 'nav'],
  },
  {
    id: 'secondary-nav',
    title: 'SecondaryNav',
    description: 'Secondary navigation with tabs',
    type: 'component',
    category: 'Organisms',
    path: 'organisms-secondarynav',
    keywords: ['navigation', 'tabs', 'menu', 'secondary'],
  },
  {
    id: 'tertiary-nav',
    title: 'TertiaryNav',
    description: 'Tertiary navigation for sub-sections',
    type: 'component',
    category: 'Organisms',
    path: 'organisms-tertiarynav',
    keywords: ['navigation', 'tabs', 'menu', 'tertiary'],
  },
  {
    id: 'first-stack',
    title: 'FirstStack',
    description: 'Primary content stacking layout',
    type: 'component',
    category: 'Organisms',
    path: 'organisms-firststack',
    keywords: ['layout', 'stack', 'container'],
  },
  {
    id: 'second-stack',
    title: 'SecondStack',
    description: 'Secondary content stacking layout',
    type: 'component',
    category: 'Organisms',
    path: 'organisms-secondstack',
    keywords: ['layout', 'stack', 'container'],
  },
  {
    id: 'toast',
    title: 'Toast',
    description: 'Temporary notification messages',
    type: 'component',
    category: 'Organisms',
    path: 'organisms-toast',
    keywords: ['notification', 'alert', 'message', 'feedback', 'snackbar'],
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Dialog overlay for focused content',
    type: 'component',
    category: 'Organisms',
    path: 'organisms-modal',
    keywords: ['dialog', 'popup', 'overlay', 'lightbox'],
  },
  {
    id: 'footer',
    title: 'Footer',
    description: 'Site footer with links and information',
    type: 'component',
    category: 'Organisms',
    path: 'organisms-footer',
    keywords: ['footer', 'links', 'navigation', 'copyright'],
  },

  // Hooks
  {
    id: 'use-form',
    title: 'useForm',
    description: 'Form state management with validation',
    type: 'hook',
    category: 'Hooks',
    path: 'hooks-useform',
    keywords: ['form', 'validation', 'state', 'input', 'submit'],
  },
  {
    id: 'use-theme',
    title: 'useTheme',
    description: 'Access and control theme settings',
    type: 'hook',
    category: 'Hooks',
    path: 'hooks-usetheme',
    keywords: ['theme', 'dark mode', 'light mode', 'color scheme'],
  },
  {
    id: 'use-toast',
    title: 'useToast',
    description: 'Display toast notifications',
    type: 'hook',
    category: 'Hooks',
    path: 'hooks-usetoast',
    keywords: ['toast', 'notification', 'alert', 'message'],
  },
  {
    id: 'use-motion-preference',
    title: 'useMotionPreference',
    description: 'Detect user motion preferences for accessibility',
    type: 'hook',
    category: 'Hooks',
    path: 'hooks-usemotionpreference',
    keywords: ['motion', 'animation', 'accessibility', 'prefers-reduced-motion'],
  },

  // Utilities - Validation
  {
    id: 'validation-utils',
    title: 'Validation Utilities',
    description: 'Form field and data validation helpers',
    type: 'utility',
    category: 'Utilities',
    path: 'utilities-validation',
    keywords: ['validation', 'form', 'validate', 'pattern', 'email', 'required'],
  },
  {
    id: 'color-utils',
    title: 'Color Utilities',
    description: 'Color manipulation and accessibility checking',
    type: 'utility',
    category: 'Utilities',
    path: 'utilities-colors',
    keywords: ['color', 'contrast', 'accessibility', 'wcag', 'hex', 'rgb'],
  },
  {
    id: 'animation-utils',
    title: 'Animation Utilities',
    description: 'Framer Motion animation presets and variants',
    type: 'utility',
    category: 'Utilities',
    path: 'utilities-animations',
    keywords: ['animation', 'motion', 'variants', 'transition', 'framer'],
  },

  // Templates
  {
    id: 'templates',
    title: 'Templates',
    description: 'Page templates and composition patterns',
    type: 'page',
    category: 'Templates',
    path: 'templates',
    keywords: ['template', 'pattern', 'layout', 'page', 'composition'],
  },
  {
    id: 'page-template',
    title: 'Page Template',
    description: 'Swiss Grid-based page layout template with header, title, breadcrumbs, and content',
    type: 'component',
    category: 'Templates',
    path: 'templates-page-template',
    keywords: ['template', 'page', 'layout', 'swiss grid', 'header', 'breadcrumbs', 'title', 'subtitle', 'structure', 'composition'],
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
