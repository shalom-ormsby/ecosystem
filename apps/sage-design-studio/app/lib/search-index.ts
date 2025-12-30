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
    id: 'button',
    title: 'Button',
    description: 'A clickable element for user actions',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-button',
    keywords: ['click', 'action', 'primary', 'secondary', 'cta'],
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
    id: 'link',
    title: 'Link',
    description: 'A navigational element for internal and external links',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-link',
    keywords: ['anchor', 'navigation', 'href', 'url'],
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
    id: 'avatar',
    title: 'Avatar',
    description: 'User profile picture or fallback with status indicator',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-avatar',
    keywords: ['profile', 'user', 'image', 'photo', 'status'],
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
    id: 'progress-bar',
    title: 'ProgressBar',
    description: 'Visual indicator of task completion',
    type: 'component',
    category: 'Atoms',
    path: 'atoms-progressbar',
    keywords: ['progress', 'loading', 'completion', 'percentage'],
  },

  // Molecules
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
    path: 'molecules-themetoggle',
    keywords: ['theme', 'dark mode', 'light mode', 'switch'],
  },
  {
    id: 'form-field',
    title: 'FormField',
    description: 'Complete form field with label, input, and error handling',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-formfield',
    keywords: ['input', 'form', 'label', 'error', 'validation'],
  },
  {
    id: 'search-bar',
    title: 'SearchBar',
    description: 'Debounced search input with clear functionality',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-searchbar',
    keywords: ['search', 'input', 'filter', 'find', 'query'],
  },
  {
    id: 'radio-group',
    title: 'RadioGroup',
    description: 'Group of mutually exclusive radio buttons',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-radiogroup',
    keywords: ['radio', 'select', 'choice', 'option', 'form'],
  },
  {
    id: 'checkbox-group',
    title: 'CheckboxGroup',
    description: 'Group of selectable checkboxes',
    type: 'component',
    category: 'Molecules',
    path: 'molecules-checkboxgroup',
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
