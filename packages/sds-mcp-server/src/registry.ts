/**
 * Component Registry for Sage UI
 *
 * This registry contains metadata for all 89 components in @thesage/ui,
 * organized into 7 core functional categories plus specialty components.
 */

export interface ComponentMetadata {
  name: string;
  category: string;
  description: string;
  keywords: string[];
  useCases: string[];
  dependencies: string[];
  radixPrimitive?: string;
}

export const COMPONENT_CATEGORIES = {
  actions: {
    label: 'Actions',
    description: 'Interactive elements that trigger behaviors',
    count: 3,
  },
  forms: {
    label: 'Forms',
    description: 'Input controls for data collection',
    count: 11,
  },
  navigation: {
    label: 'Navigation',
    description: 'Moving through content and hierarchy',
    count: 6,
  },
  overlays: {
    label: 'Overlays',
    description: 'Contextual content that appears above the main UI',
    count: 9,
  },
  feedback: {
    label: 'Feedback',
    description: 'Communicating system state and user action results',
    count: 5,
  },
  'data-display': {
    label: 'Data Display',
    description: 'Presenting information in structured formats',
    count: 6,
  },
  layout: {
    label: 'Layout',
    description: 'Spatial organization and structural elements',
    count: 8,
  },
} as const;

export const COMPONENT_REGISTRY: Record<string, ComponentMetadata> = {
  // ============================================================================
  // ACTIONS (3)
  // ============================================================================
  button: {
    name: 'Button',
    category: 'actions',
    description: 'Primary interaction element with multiple variants for different use cases',
    keywords: ['button', 'click', 'action', 'submit', 'cta', 'interactive'],
    useCases: [
      'Form submission',
      'Navigation triggers',
      'Action confirmation',
      'Call-to-action elements',
    ],
    dependencies: ['@radix-ui/react-slot'],
    radixPrimitive: '@radix-ui/react-slot',
  },
  toggle: {
    name: 'Toggle',
    category: 'actions',
    description: 'Binary state toggle with pressed/unpressed states',
    keywords: ['toggle', 'switch', 'binary', 'on-off', 'state'],
    useCases: [
      'Toolbar buttons',
      'Feature toggles',
      'View mode switches',
      'Filter activation',
    ],
    dependencies: ['@radix-ui/react-toggle'],
    radixPrimitive: '@radix-ui/react-toggle',
  },
  'toggle-group': {
    name: 'ToggleGroup',
    category: 'actions',
    description: 'Multiple toggles with single or multi-select modes',
    keywords: ['toggle', 'group', 'selection', 'multi-select', 'options'],
    useCases: [
      'Text formatting toolbars',
      'View mode selection',
      'Filter groups',
      'Option selection',
    ],
    dependencies: ['@radix-ui/react-toggle-group'],
    radixPrimitive: '@radix-ui/react-toggle-group',
  },

  // ============================================================================
  // FORMS (11)
  // ============================================================================
  checkbox: {
    name: 'Checkbox',
    category: 'forms',
    description: 'Boolean selection control for single or grouped choices',
    keywords: ['checkbox', 'selection', 'boolean', 'multi-select', 'form'],
    useCases: [
      'Multi-select options',
      'Terms acceptance',
      'Feature preferences',
      'Bulk actions',
    ],
    dependencies: ['@radix-ui/react-checkbox'],
    radixPrimitive: '@radix-ui/react-checkbox',
  },
  combobox: {
    name: 'Combobox',
    category: 'forms',
    description: 'Searchable select component with autocomplete functionality',
    keywords: ['combobox', 'autocomplete', 'search', 'select', 'dropdown', 'filter'],
    useCases: [
      'Country/state selection',
      'Tag selection',
      'User mention',
      'Large option lists',
    ],
    dependencies: ['cmdk', '@radix-ui/react-popover'],
    radixPrimitive: '@radix-ui/react-popover',
  },
  form: {
    name: 'Form',
    category: 'forms',
    description: 'Form wrapper with react-hook-form and zod validation integration',
    keywords: ['form', 'validation', 'zod', 'react-hook-form', 'schema'],
    useCases: [
      'User registration',
      'Settings forms',
      'Data entry',
      'Multi-step forms',
    ],
    dependencies: ['react-hook-form', '@hookform/resolvers', 'zod'],
  },
  input: {
    name: 'Input',
    category: 'forms',
    description: 'Text input field supporting various types (text, email, password, number)',
    keywords: ['input', 'text', 'field', 'form', 'email', 'password'],
    useCases: [
      'Text entry',
      'Email addresses',
      'Passwords',
      'Numeric input',
    ],
    dependencies: [],
  },
  'input-otp': {
    name: 'InputOTP',
    category: 'forms',
    description: 'One-time password input with individual character slots',
    keywords: ['otp', 'verification', 'security', 'authentication', '2fa', 'code'],
    useCases: [
      'Two-factor authentication',
      'Email verification',
      'Phone verification',
      'Security codes',
    ],
    dependencies: ['input-otp'],
  },
  label: {
    name: 'Label',
    category: 'forms',
    description: 'Form field labels with proper accessibility associations',
    keywords: ['label', 'form', 'accessibility', 'field-label'],
    useCases: [
      'Form field labels',
      'Input descriptions',
      'Accessible forms',
    ],
    dependencies: ['@radix-ui/react-label'],
    radixPrimitive: '@radix-ui/react-label',
  },
  'radio-group': {
    name: 'RadioGroup',
    category: 'forms',
    description: 'Exclusive selection control for choosing one option from multiple',
    keywords: ['radio', 'selection', 'exclusive', 'single-select', 'options'],
    useCases: [
      'Single option selection',
      'Survey questions',
      'Payment methods',
      'Shipping options',
    ],
    dependencies: ['@radix-ui/react-radio-group'],
    radixPrimitive: '@radix-ui/react-radio-group',
  },
  select: {
    name: 'Select',
    category: 'forms',
    description: 'Dropdown selection component for choosing from a list of options',
    keywords: ['select', 'dropdown', 'options', 'picker', 'choice'],
    useCases: [
      'Option selection',
      'Category filtering',
      'Settings choice',
      'Data sorting',
    ],
    dependencies: ['@radix-ui/react-select'],
    radixPrimitive: '@radix-ui/react-select',
  },
  slider: {
    name: 'Slider',
    category: 'forms',
    description: 'Numeric input control via dragging for range selection',
    keywords: ['slider', 'range', 'numeric', 'volume', 'adjustment'],
    useCases: [
      'Volume control',
      'Price ranges',
      'Numeric settings',
      'Zoom level',
    ],
    dependencies: ['@radix-ui/react-slider'],
    radixPrimitive: '@radix-ui/react-slider',
  },
  switch: {
    name: 'Switch',
    category: 'forms',
    description: 'Toggle switch for binary state changes in forms',
    keywords: ['switch', 'toggle', 'boolean', 'on-off', 'settings'],
    useCases: [
      'Feature toggles',
      'Notification settings',
      'Privacy options',
      'Mode switches',
    ],
    dependencies: ['@radix-ui/react-switch'],
    radixPrimitive: '@radix-ui/react-switch',
  },
  textarea: {
    name: 'Textarea',
    category: 'forms',
    description: 'Multi-line text input for longer content',
    keywords: ['textarea', 'text', 'multiline', 'input', 'comment', 'description'],
    useCases: [
      'Comment fields',
      'Message composition',
      'Descriptions',
      'Long-form text',
    ],
    dependencies: [],
  },

  // ============================================================================
  // NAVIGATION (6)
  // ============================================================================
  breadcrumb: {
    name: 'Breadcrumb',
    category: 'navigation',
    description: 'Hierarchical location indicator showing navigation path',
    keywords: ['breadcrumb', 'navigation', 'path', 'hierarchy', 'location'],
    useCases: [
      'Page hierarchy',
      'Multi-level navigation',
      'Location context',
      'Back navigation',
    ],
    dependencies: [],
  },
  command: {
    name: 'Command',
    category: 'navigation',
    description: 'Command palette interface for searchable actions and navigation',
    keywords: ['command', 'palette', 'search', 'shortcuts', 'keyboard', 'cmdk'],
    useCases: [
      'Quick navigation',
      'Action search',
      'Keyboard shortcuts',
      'Power user features',
    ],
    dependencies: ['cmdk'],
  },
  menubar: {
    name: 'Menubar',
    category: 'navigation',
    description: 'Desktop-style horizontal menu bar with dropdown menus',
    keywords: ['menubar', 'menu', 'navigation', 'desktop', 'toolbar'],
    useCases: [
      'Application menus',
      'Desktop-style navigation',
      'Action menus',
      'Editor toolbars',
    ],
    dependencies: ['@radix-ui/react-menubar'],
    radixPrimitive: '@radix-ui/react-menubar',
  },
  'navigation-menu': {
    name: 'NavigationMenu',
    category: 'navigation',
    description: 'Complex header navigation with nested dropdown menus',
    keywords: ['navigation', 'menu', 'header', 'navbar', 'dropdown', 'mega-menu'],
    useCases: [
      'Site navigation',
      'Header menus',
      'Mega menus',
      'Multi-level navigation',
    ],
    dependencies: ['@radix-ui/react-navigation-menu'],
    radixPrimitive: '@radix-ui/react-navigation-menu',
  },
  pagination: {
    name: 'Pagination',
    category: 'navigation',
    description: 'Multi-page navigation control for paginated content',
    keywords: ['pagination', 'pages', 'navigation', 'paging', 'next', 'previous'],
    useCases: [
      'Table pagination',
      'Search results',
      'Content lists',
      'Multi-page forms',
    ],
    dependencies: [],
  },
  tabs: {
    name: 'Tabs',
    category: 'navigation',
    description: 'Tabbed interface for organizing content into switchable panels',
    keywords: ['tabs', 'tabbed', 'navigation', 'panels', 'switching'],
    useCases: [
      'Settings panels',
      'Content organization',
      'Multi-view interfaces',
      'Dashboard sections',
    ],
    dependencies: ['@radix-ui/react-tabs'],
    radixPrimitive: '@radix-ui/react-tabs',
  },

  // ============================================================================
  // OVERLAYS (9)
  // ============================================================================
  'alert-dialog': {
    name: 'AlertDialog',
    category: 'overlays',
    description: 'Modal dialog for critical confirmations with cancel/confirm actions',
    keywords: ['alert', 'dialog', 'modal', 'confirmation', 'warning', 'destructive'],
    useCases: [
      'Delete confirmations',
      'Destructive actions',
      'Critical warnings',
      'Irreversible operations',
    ],
    dependencies: ['@radix-ui/react-alert-dialog'],
    radixPrimitive: '@radix-ui/react-alert-dialog',
  },
  'context-menu': {
    name: 'ContextMenu',
    category: 'overlays',
    description: 'Right-click context menu for contextual actions',
    keywords: ['context-menu', 'right-click', 'menu', 'actions', 'contextual'],
    useCases: [
      'Right-click actions',
      'Contextual operations',
      'File operations',
      'Item actions',
    ],
    dependencies: ['@radix-ui/react-context-menu'],
    radixPrimitive: '@radix-ui/react-context-menu',
  },
  dialog: {
    name: 'Dialog',
    category: 'overlays',
    description: 'Modal dialog for focused interactions and forms',
    keywords: ['dialog', 'modal', 'popup', 'overlay', 'form'],
    useCases: [
      'Form modals',
      'Detail views',
      'Focused tasks',
      'User input',
    ],
    dependencies: ['@radix-ui/react-dialog'],
    radixPrimitive: '@radix-ui/react-dialog',
  },
  drawer: {
    name: 'Drawer',
    category: 'overlays',
    description: 'Mobile-friendly bottom drawer that slides up from screen bottom',
    keywords: ['drawer', 'bottom-sheet', 'mobile', 'slide-up', 'panel'],
    useCases: [
      'Mobile actions',
      'Mobile forms',
      'Bottom sheets',
      'Mobile menus',
    ],
    dependencies: ['vaul'],
  },
  'dropdown-menu': {
    name: 'DropdownMenu',
    category: 'overlays',
    description: 'Dropdown menu for actions and navigation options',
    keywords: ['dropdown', 'menu', 'actions', 'options', 'popover'],
    useCases: [
      'Action menus',
      'User menus',
      'Item options',
      'Overflow menus',
    ],
    dependencies: ['@radix-ui/react-dropdown-menu'],
    radixPrimitive: '@radix-ui/react-dropdown-menu',
  },
  'hover-card': {
    name: 'HoverCard',
    category: 'overlays',
    description: 'Rich preview card that appears on hover',
    keywords: ['hover-card', 'preview', 'popover', 'tooltip', 'hover'],
    useCases: [
      'User previews',
      'Link previews',
      'Rich tooltips',
      'Additional context',
    ],
    dependencies: ['@radix-ui/react-hover-card'],
    radixPrimitive: '@radix-ui/react-hover-card',
  },
  popover: {
    name: 'Popover',
    category: 'overlays',
    description: 'Floating content panel anchored to a trigger element',
    keywords: ['popover', 'floating', 'tooltip', 'overlay', 'panel'],
    useCases: [
      'Additional info',
      'Form helpers',
      'Contextual content',
      'Inline editors',
    ],
    dependencies: ['@radix-ui/react-popover'],
    radixPrimitive: '@radix-ui/react-popover',
  },
  sheet: {
    name: 'Sheet',
    category: 'overlays',
    description: 'Slide-in panel from screen edges for supplementary content',
    keywords: ['sheet', 'sidebar', 'slide-in', 'panel', 'drawer'],
    useCases: [
      'Mobile navigation',
      'Sidebar panels',
      'Settings panels',
      'Detail views',
    ],
    dependencies: ['@radix-ui/react-dialog'],
    radixPrimitive: '@radix-ui/react-dialog',
  },
  tooltip: {
    name: 'Tooltip',
    category: 'overlays',
    description: 'Contextual hints and additional information on hover',
    keywords: ['tooltip', 'hint', 'help', 'hover', 'info'],
    useCases: [
      'Icon explanations',
      'Additional context',
      'Help text',
      'Keyboard shortcuts',
    ],
    dependencies: ['@radix-ui/react-tooltip'],
    radixPrimitive: '@radix-ui/react-tooltip',
  },

  // ============================================================================
  // FEEDBACK (5)
  // ============================================================================
  alert: {
    name: 'Alert',
    category: 'feedback',
    description: 'Prominent message component for important information',
    keywords: ['alert', 'message', 'notification', 'warning', 'info', 'error', 'success'],
    useCases: [
      'Status messages',
      'Warnings',
      'Errors',
      'Success confirmations',
    ],
    dependencies: [],
  },
  progress: {
    name: 'Progress',
    category: 'feedback',
    description: 'Visual indicator for progress and completion status',
    keywords: ['progress', 'loading', 'bar', 'percentage', 'completion'],
    useCases: [
      'Upload progress',
      'Task completion',
      'Loading states',
      'Multi-step forms',
    ],
    dependencies: ['@radix-ui/react-progress'],
    radixPrimitive: '@radix-ui/react-progress',
  },
  skeleton: {
    name: 'Skeleton',
    category: 'feedback',
    description: 'Loading placeholder that mimics content structure',
    keywords: ['skeleton', 'loading', 'placeholder', 'shimmer', 'spinner'],
    useCases: [
      'Content loading',
      'Data fetching',
      'Initial load',
      'Lazy loading',
    ],
    dependencies: [],
  },
  sonner: {
    name: 'Sonner',
    category: 'feedback',
    description: 'Toast notification system with queuing and positioning',
    keywords: ['toast', 'notification', 'sonner', 'message', 'alert'],
    useCases: [
      'Success messages',
      'Error notifications',
      'Action feedback',
      'System messages',
    ],
    dependencies: ['sonner'],
  },
  toast: {
    name: 'Toast',
    category: 'feedback',
    description: 'Temporary notification messages that appear briefly',
    keywords: ['toast', 'notification', 'message', 'snackbar', 'alert'],
    useCases: [
      'Quick feedback',
      'Status updates',
      'Non-critical notifications',
      'Confirmation messages',
    ],
    dependencies: ['@radix-ui/react-toast'],
    radixPrimitive: '@radix-ui/react-toast',
  },

  // ============================================================================
  // DATA DISPLAY (6)
  // ============================================================================
  avatar: {
    name: 'Avatar',
    category: 'data-display',
    description: 'User profile image with fallback initials',
    keywords: ['avatar', 'profile', 'image', 'user', 'picture'],
    useCases: [
      'User profiles',
      'Comment authors',
      'Team members',
      'Chat participants',
    ],
    dependencies: ['@radix-ui/react-avatar'],
    radixPrimitive: '@radix-ui/react-avatar',
  },
  badge: {
    name: 'Badge',
    category: 'data-display',
    description: 'Status indicators and labels for categorization',
    keywords: ['badge', 'tag', 'label', 'status', 'chip', 'pill'],
    useCases: [
      'Status indicators',
      'Tags',
      'Categories',
      'Notification counts',
    ],
    dependencies: [],
  },
  calendar: {
    name: 'Calendar',
    category: 'data-display',
    description: 'Date selection calendar with month/year navigation',
    keywords: ['calendar', 'date', 'picker', 'month', 'day'],
    useCases: [
      'Date selection',
      'Event scheduling',
      'Booking systems',
      'Date ranges',
    ],
    dependencies: ['react-day-picker', 'date-fns'],
  },
  card: {
    name: 'Card',
    category: 'data-display',
    description: 'Container for grouping related content with optional header and footer',
    keywords: ['card', 'container', 'box', 'panel', 'content'],
    useCases: [
      'Content grouping',
      'Product cards',
      'Information panels',
      'Dashboard widgets',
    ],
    dependencies: [],
  },
  'data-table': {
    name: 'DataTable',
    category: 'data-display',
    description: 'Enhanced table with sorting, filtering, and pagination',
    keywords: ['table', 'data', 'grid', 'sorting', 'filtering', 'pagination', 'tanstack'],
    useCases: [
      'Data grids',
      'Admin tables',
      'Reports',
      'List management',
    ],
    dependencies: ['@tanstack/react-table'],
  },
  table: {
    name: 'Table',
    category: 'data-display',
    description: 'Basic table component for tabular data display',
    keywords: ['table', 'data', 'rows', 'columns', 'grid'],
    useCases: [
      'Simple tables',
      'Data display',
      'Comparison tables',
      'Pricing tables',
    ],
    dependencies: [],
  },

  // ============================================================================
  // LAYOUT (8)
  // ============================================================================
  accordion: {
    name: 'Accordion',
    category: 'layout',
    description: 'Collapsible content sections with expand/collapse functionality',
    keywords: ['accordion', 'collapsible', 'expandable', 'faq', 'sections'],
    useCases: [
      'FAQ sections',
      'Content organization',
      'Settings panels',
      'Information disclosure',
    ],
    dependencies: ['@radix-ui/react-accordion'],
    radixPrimitive: '@radix-ui/react-accordion',
  },
  'aspect-ratio': {
    name: 'AspectRatio',
    category: 'layout',
    description: 'Container that maintains specific width-to-height ratio',
    keywords: ['aspect-ratio', 'ratio', 'responsive', 'media', 'image'],
    useCases: [
      'Responsive images',
      'Video embeds',
      'Media containers',
      'Card images',
    ],
    dependencies: ['@radix-ui/react-aspect-ratio'],
    radixPrimitive: '@radix-ui/react-aspect-ratio',
  },
  carousel: {
    name: 'Carousel',
    category: 'layout',
    description: 'Scrollable content slider with navigation controls',
    keywords: ['carousel', 'slider', 'slideshow', 'gallery', 'swipe'],
    useCases: [
      'Image galleries',
      'Product showcases',
      'Content sliders',
      'Testimonials',
    ],
    dependencies: ['embla-carousel-react'],
  },
  collapsible: {
    name: 'Collapsible',
    category: 'layout',
    description: 'Simple show/hide content container',
    keywords: ['collapsible', 'expandable', 'toggle', 'show-hide', 'disclosure'],
    useCases: [
      'Sidebar sections',
      'Content reveals',
      'Advanced options',
      'Details disclosure',
    ],
    dependencies: ['@radix-ui/react-collapsible'],
    radixPrimitive: '@radix-ui/react-collapsible',
  },
  'date-picker': {
    name: 'DatePicker',
    category: 'layout',
    description: 'Calendar date picker combined with popover trigger',
    keywords: ['date-picker', 'calendar', 'date', 'popover', 'input'],
    useCases: [
      'Date selection',
      'Form dates',
      'Scheduling',
      'Filters',
    ],
    dependencies: ['react-day-picker', 'date-fns', '@radix-ui/react-popover'],
  },
  resizable: {
    name: 'Resizable',
    category: 'layout',
    description: 'User-resizable panel containers with drag handles',
    keywords: ['resizable', 'panels', 'split', 'drag', 'resize'],
    useCases: [
      'Split views',
      'IDE panels',
      'Dashboard layouts',
      'Adjustable sidebars',
    ],
    dependencies: ['react-resizable-panels'],
  },
  'scroll-area': {
    name: 'ScrollArea',
    category: 'layout',
    description: 'Custom scrollbar styling for overflow content',
    keywords: ['scroll', 'scrollbar', 'overflow', 'custom-scroll'],
    useCases: [
      'Content overflow',
      'Scrollable lists',
      'Chat windows',
      'Code displays',
    ],
    dependencies: ['@radix-ui/react-scroll-area'],
    radixPrimitive: '@radix-ui/react-scroll-area',
  },
  separator: {
    name: 'Separator',
    category: 'layout',
    description: 'Visual divider for separating content sections',
    keywords: ['separator', 'divider', 'line', 'hr', 'border'],
    useCases: [
      'Content separation',
      'Menu dividers',
      'Section breaks',
      'Visual hierarchy',
    ],
    dependencies: ['@radix-ui/react-separator'],
    radixPrimitive: '@radix-ui/react-separator',
  },
};

/**
 * Get all components by category
 */
export function getComponentsByCategory(category: string): ComponentMetadata[] {
  return Object.values(COMPONENT_REGISTRY).filter(
    (component) => component.category === category
  );
}

/**
 * Search components by keyword or description
 */
export function searchComponents(query: string): ComponentMetadata[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(COMPONENT_REGISTRY).filter((component) => {
    return (
      component.name.toLowerCase().includes(lowerQuery) ||
      component.description.toLowerCase().includes(lowerQuery) ||
      component.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery)) ||
      component.useCases.some((useCase) => useCase.toLowerCase().includes(lowerQuery))
    );
  });
}

/**
 * Get component by name (case-insensitive, accepts kebab-case or PascalCase)
 */
export function getComponent(name: string): ComponentMetadata | undefined {
  const kebabName = name.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return COMPONENT_REGISTRY[kebabName];
}

/**
 * Get all component names
 */
export function getAllComponentNames(): string[] {
  return Object.keys(COMPONENT_REGISTRY);
}

/**
 * Get component count
 */
export function getComponentCount(): number {
  return Object.keys(COMPONENT_REGISTRY).length;
}
