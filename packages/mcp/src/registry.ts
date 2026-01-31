/**
 * Component Registry for Sage UI
 *
 * This registry contains metadata for all 92 components in @thesage/ui,
 * organized into 7 core functional categories plus 4 specialty categories.
 *
 * Core Categories (7):
 * - actions: Interactive elements that trigger behaviors
 * - forms: Input controls for data collection
 * - navigation: Moving through content and hierarchy
 * - overlays: Contextual content above main UI
 * - feedback: Communicating system state
 * - data-display: Presenting information in structured formats
 * - layout: Spatial organization and structural elements
 *
 * Specialty Categories (4):
 * - backgrounds: Animated background effects
 * - cursor: Custom cursor effects
 * - motion: Animation components
 * - blocks: Composed page sections
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
    count: 5,
  },
  forms: {
    label: 'Forms',
    description: 'Input controls for data collection',
    count: 18,
  },
  navigation: {
    label: 'Navigation',
    description: 'Moving through content and hierarchy',
    count: 10,
  },
  overlays: {
    label: 'Overlays',
    description: 'Contextual content that appears above the main UI',
    count: 11,
  },
  feedback: {
    label: 'Feedback',
    description: 'Communicating system state and user action results',
    count: 7,
  },
  'data-display': {
    label: 'Data Display',
    description: 'Presenting information in structured formats',
    count: 16,
  },
  layout: {
    label: 'Layout',
    description: 'Spatial organization and structural elements',
    count: 17,
  },
  backgrounds: {
    label: 'Backgrounds',
    description: 'Animated background effects and decorative elements',
    count: 3,
  },
  cursor: {
    label: 'Cursor',
    description: 'Custom cursor effects and interactions',
    count: 2,
  },
  motion: {
    label: 'Motion',
    description: 'Animation components and motion effects',
    count: 1,
  },
  blocks: {
    label: 'Blocks',
    description: 'Composed page sections and layouts',
    count: 2,
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
  heading: {
    name: 'Heading',
    category: 'data-display',
    description: 'Semantic heading with automatic token-based styling and responsive sizes',
    keywords: ['heading', 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'typography'],
    useCases: [
      'Page titles',
      'Section headings',
      'Content hierarchy',
      'Semantic HTML structure',
    ],
    dependencies: [],
  },
  text: {
    name: 'Text',
    category: 'data-display',
    description: 'Semantic text component with variants for primary, secondary, and muted styles',
    keywords: ['text', 'paragraph', 'body', 'typography', 'content', 'p', 'span'],
    useCases: [
      'Body text',
      'Descriptions',
      'Helper text',
      'Labels and captions',
    ],
    dependencies: [],
  },
  code: {
    name: 'Code',
    category: 'data-display',
    description: 'Code display with syntax highlighting for inline and block code',
    keywords: ['code', 'syntax', 'highlighting', 'programming', 'snippet', 'pre'],
    useCases: [
      'Code snippets',
      'API documentation',
      'Technical content',
      'Inline code references',
    ],
    dependencies: [],
  },
  'collapsible-code-block': {
    name: 'CollapsibleCodeBlock',
    category: 'data-display',
    description: 'Expandable code block with syntax highlighting, preview mode, and copy functionality',
    keywords: ['code', 'collapsible', 'expandable', 'syntax', 'copy', 'preview'],
    useCases: [
      'Long code examples',
      'Documentation code blocks',
      'Tutorial code snippets',
      'API examples',
    ],
    dependencies: ['@thesage/tokens'],
  },
  'description-list': {
    name: 'DescriptionList',
    category: 'data-display',
    description: 'Key-value pair list for displaying labeled data in row or column layout',
    keywords: ['description', 'list', 'key-value', 'definition', 'dl', 'dt', 'dd'],
    useCases: [
      'Product specifications',
      'User profile details',
      'Metadata display',
      'Settings summaries',
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
  grid: {
    name: 'Grid',
    category: 'layout',
    description: 'Responsive CSS grid with column and gap configuration',
    keywords: ['grid', 'layout', 'columns', 'responsive', 'css-grid'],
    useCases: [
      'Card grids',
      'Gallery layouts',
      'Dashboard layouts',
      'Responsive content grids',
    ],
    dependencies: [],
  },
  container: {
    name: 'Container',
    category: 'layout',
    description: 'Content wrapper with consistent max-width and padding variants',
    keywords: ['container', 'wrapper', 'max-width', 'centered', 'layout'],
    useCases: [
      'Page content wrapper',
      'Centered layouts',
      'Responsive widths',
      'Content alignment',
    ],
    dependencies: [],
  },
  stack: {
    name: 'Stack',
    category: 'layout',
    description: 'Flexbox layout for vertical or horizontal stacking with gap control',
    keywords: ['stack', 'flex', 'vertical', 'horizontal', 'spacing', 'layout'],
    useCases: [
      'Vertical layouts',
      'Horizontal layouts',
      'Form layouts',
      'Button groups',
    ],
    dependencies: [],
  },
  sidebar: {
    name: 'Sidebar',
    category: 'layout',
    description: 'Navigation sidebar with header, content, footer sections and mobile overlay',
    keywords: ['sidebar', 'navigation', 'panel', 'drawer', 'menu'],
    useCases: [
      'App navigation',
      'Dashboard sidebars',
      'Settings panels',
      'Mobile menus',
    ],
    dependencies: ['@radix-ui/react-slot'],
    radixPrimitive: '@radix-ui/react-slot',
  },
  header: {
    name: 'Header',
    category: 'layout',
    description: 'Page header with sticky positioning, glass morphism, and mobile menu',
    keywords: ['header', 'navbar', 'navigation', 'sticky', 'mobile-menu'],
    useCases: [
      'Site headers',
      'App navigation bars',
      'Sticky headers',
      'Mobile-friendly navigation',
    ],
    dependencies: ['lucide-react'],
  },
  footer: {
    name: 'Footer',
    category: 'layout',
    description: 'Page footer with multi-column layout, social links, and copyright',
    keywords: ['footer', 'navigation', 'links', 'copyright', 'social'],
    useCases: [
      'Site footers',
      'Navigation sections',
      'Contact information',
      'Copyright notices',
    ],
    dependencies: [],
  },
  'customizer-panel': {
    name: 'CustomizerPanel',
    category: 'layout',
    description: 'Floating panel for theme, mode, and motion customization',
    keywords: ['customizer', 'theme', 'settings', 'preferences', 'dark-mode'],
    useCases: [
      'Theme selection',
      'Dark mode toggle',
      'Motion preferences',
      'User experience customization',
    ],
    dependencies: ['lucide-react', '@thesage/tokens'],
  },
  'page-layout': {
    name: 'PageLayout',
    category: 'layout',
    description: 'Flexible page layout with header, nav stacks, breadcrumbs, and footer',
    keywords: ['layout', 'page', 'template', 'structure', 'swiss-grid'],
    useCases: [
      'Page structure',
      'Content layouts',
      'Documentation pages',
      'Dashboard layouts',
    ],
    dependencies: [],
  },
  'page-template': {
    name: 'PageTemplate',
    category: 'layout',
    description: 'Opinionated page template with Swiss Grid design and customizer',
    keywords: ['template', 'page', 'swiss-grid', 'layout', 'documentation'],
    useCases: [
      'Blog pages',
      'Documentation pages',
      'Standard app pages',
      'Content-focused layouts',
    ],
    dependencies: [],
  },

  // ============================================================================
  // ACTIONS - Additional (2 more)
  // ============================================================================
  link: {
    name: 'Link',
    category: 'actions',
    description: 'Styled anchor element with theme-aware colors and hover states',
    keywords: ['link', 'anchor', 'href', 'navigation', 'a', 'url'],
    useCases: [
      'Text links',
      'Navigation links',
      'External references',
      'Inline actions',
    ],
    dependencies: [],
  },
  magnetic: {
    name: 'Magnetic',
    category: 'actions',
    description: 'Magnetic hover effect that attracts elements toward cursor',
    keywords: ['magnetic', 'hover', 'effect', 'cursor', 'animation', 'interactive'],
    useCases: [
      'Interactive buttons',
      'Hover effects',
      'Playful interactions',
      'Cursor attraction',
    ],
    dependencies: ['framer-motion'],
  },

  // ============================================================================
  // FORMS - Additional (7 more)
  // ============================================================================
  'search-bar': {
    name: 'SearchBar',
    category: 'forms',
    description: 'Search input with icon, clear button, and keyboard shortcuts',
    keywords: ['search', 'input', 'find', 'query', 'filter', 'bar'],
    useCases: [
      'Site search',
      'Content filtering',
      'Command palette trigger',
      'Data filtering',
    ],
    dependencies: ['lucide-react'],
  },
  'filter-button': {
    name: 'FilterButton',
    category: 'forms',
    description: 'Button for filtering content with active/inactive states',
    keywords: ['filter', 'button', 'toggle', 'category', 'selection'],
    useCases: [
      'Category filters',
      'Tag selection',
      'Content filtering',
      'Quick filters',
    ],
    dependencies: [],
  },
  'theme-switcher': {
    name: 'ThemeSwitcher',
    category: 'forms',
    description: 'Multi-theme selector for switching between Studio, Terra, and Volt',
    keywords: ['theme', 'switcher', 'selector', 'studio', 'terra', 'volt'],
    useCases: [
      'Theme selection',
      'Brand customization',
      'User preferences',
      'Design switching',
    ],
    dependencies: [],
  },
  'theme-toggle': {
    name: 'ThemeToggle',
    category: 'forms',
    description: 'Light/dark mode toggle with smooth transitions',
    keywords: ['theme', 'toggle', 'dark-mode', 'light-mode', 'mode'],
    useCases: [
      'Dark mode switch',
      'Light mode switch',
      'Theme mode control',
      'Accessibility preference',
    ],
    dependencies: ['lucide-react'],
  },
  'color-picker': {
    name: 'ColorPicker',
    category: 'forms',
    description: 'Color selection input with preset swatches and custom color support',
    keywords: ['color', 'picker', 'palette', 'swatch', 'hex', 'customization'],
    useCases: [
      'Brand color selection',
      'Theme customization',
      'Design tools',
      'User preferences',
    ],
    dependencies: [],
  },
  'drag-drop': {
    name: 'DragDrop',
    category: 'forms',
    description: 'Drag and drop file upload zone with preview support',
    keywords: ['drag', 'drop', 'upload', 'file', 'dropzone', 'input'],
    useCases: [
      'File uploads',
      'Image uploads',
      'Document uploads',
      'Bulk imports',
    ],
    dependencies: [],
  },
  'text-field': {
    name: 'TextField',
    category: 'forms',
    description: 'Complete text input with label, helper text, and error states',
    keywords: ['text', 'field', 'input', 'label', 'form', 'validation'],
    useCases: [
      'Form fields',
      'Labeled inputs',
      'Validated inputs',
      'Complete form controls',
    ],
    dependencies: [],
  },

  // ============================================================================
  // NAVIGATION - Additional (4 more)
  // ============================================================================
  'nav-link': {
    name: 'NavLink',
    category: 'navigation',
    description: 'Navigation link with active state indicators and variants',
    keywords: ['nav', 'link', 'navigation', 'active', 'menu', 'item'],
    useCases: [
      'Navigation menus',
      'Sidebar links',
      'Header navigation',
      'Active page indicators',
    ],
    dependencies: [],
  },
  'secondary-nav': {
    name: 'SecondaryNav',
    category: 'navigation',
    description: 'Horizontal secondary navigation bar for section switching',
    keywords: ['secondary', 'navigation', 'tabs', 'sections', 'subnav'],
    useCases: [
      'Section navigation',
      'Page subsections',
      'Tab-like navigation',
      'Category switching',
    ],
    dependencies: [],
  },
  'tertiary-nav': {
    name: 'TertiaryNav',
    category: 'navigation',
    description: 'Third-level navigation for deep content hierarchies',
    keywords: ['tertiary', 'navigation', 'deep', 'hierarchy', 'subnav'],
    useCases: [
      'Deep navigation',
      'Documentation sections',
      'Multi-level content',
      'Nested categories',
    ],
    dependencies: [],
  },
  breadcrumbs: {
    name: 'Breadcrumbs',
    category: 'navigation',
    description: 'Breadcrumb navigation with home icon and variants',
    keywords: ['breadcrumbs', 'navigation', 'path', 'trail', 'hierarchy'],
    useCases: [
      'Page location',
      'Navigation trail',
      'Hierarchical navigation',
      'Back navigation',
    ],
    dependencies: ['lucide-react'],
  },

  // ============================================================================
  // OVERLAYS - Additional (2 more)
  // ============================================================================
  modal: {
    name: 'Modal',
    category: 'overlays',
    description: 'Simple modal wrapper around Dialog with common patterns',
    keywords: ['modal', 'dialog', 'popup', 'overlay', 'window'],
    useCases: [
      'Simple modals',
      'Confirmation dialogs',
      'Form modals',
      'Content overlays',
    ],
    dependencies: ['@radix-ui/react-dialog'],
    radixPrimitive: '@radix-ui/react-dialog',
  },
  dropdown: {
    name: 'Dropdown',
    category: 'overlays',
    description: 'Simple dropdown wrapper for common dropdown patterns',
    keywords: ['dropdown', 'menu', 'select', 'options', 'popover'],
    useCases: [
      'Action menus',
      'User menus',
      'Quick selections',
      'Option lists',
    ],
    dependencies: ['@radix-ui/react-dropdown-menu'],
    radixPrimitive: '@radix-ui/react-dropdown-menu',
  },

  // ============================================================================
  // FEEDBACK - Additional (2 more)
  // ============================================================================
  spinner: {
    name: 'Spinner',
    category: 'feedback',
    description: 'Animated loading spinner with size variants',
    keywords: ['spinner', 'loading', 'loader', 'progress', 'waiting'],
    useCases: [
      'Loading states',
      'Button loading',
      'Data fetching',
      'Async operations',
    ],
    dependencies: [],
  },
  'progress-bar': {
    name: 'ProgressBar',
    category: 'feedback',
    description: 'Horizontal progress bar with percentage display',
    keywords: ['progress', 'bar', 'loading', 'percentage', 'completion'],
    useCases: [
      'File uploads',
      'Task progress',
      'Loading indicators',
      'Step completion',
    ],
    dependencies: [],
  },

  // ============================================================================
  // DATA DISPLAY - Additional (5 more)
  // ============================================================================
  brand: {
    name: 'Brand',
    category: 'data-display',
    description: 'Theme-aware brand/logo component with size variants and link support',
    keywords: ['brand', 'logo', 'identity', 'header', 'company'],
    useCases: [
      'Site logos',
      'Header branding',
      'Footer branding',
      'App identity',
    ],
    dependencies: [],
  },
  'aspect-image': {
    name: 'AspectImage',
    category: 'data-display',
    description: 'Image with configurable aspect ratio, rounded corners, and captions',
    keywords: ['image', 'aspect', 'ratio', 'figure', 'caption', 'media'],
    useCases: [
      'Gallery images',
      'Article images',
      'Product images',
      'Thumbnails with captions',
    ],
    dependencies: [],
  },
  'variable-weight-text': {
    name: 'VariableWeightText',
    category: 'data-display',
    description: 'Animated text with breathing font-weight effect using variable fonts',
    keywords: ['variable', 'font', 'weight', 'animation', 'breathing', 'motion'],
    useCases: [
      'Hero text',
      'Emphasis text',
      'Attention grabbing',
      'Variable font showcase',
    ],
    dependencies: ['framer-motion'],
  },
  typewriter: {
    name: 'Typewriter',
    category: 'data-display',
    description: 'Typewriter text animation with cursor and loop support',
    keywords: ['typewriter', 'typing', 'animation', 'cursor', 'text', 'effect'],
    useCases: [
      'Hero taglines',
      'Terminal effects',
      'Dynamic headings',
      'Attention text',
    ],
    dependencies: ['framer-motion'],
  },
  'github-icon': {
    name: 'GitHubIcon',
    category: 'data-display',
    description: 'GitHub logo icon that inherits text color for theme support',
    keywords: ['github', 'icon', 'social', 'logo', 'svg'],
    useCases: [
      'Social links',
      'Footer icons',
      'Repository links',
      'Open source badges',
    ],
    dependencies: [],
  },

  // ============================================================================
  // SPECIALTY - Backgrounds (3)
  // ============================================================================
  'warp-background': {
    name: 'WarpBackground',
    category: 'backgrounds',
    description: 'Animated warp speed star field background effect',
    keywords: ['warp', 'stars', 'background', 'animation', 'space', 'effect'],
    useCases: [
      'Hero backgrounds',
      'Landing pages',
      'Loading screens',
      'Sci-fi themes',
    ],
    dependencies: ['framer-motion'],
  },
  'faulty-terminal': {
    name: 'FaultyTerminal',
    category: 'backgrounds',
    description: 'Glitchy terminal background with flickering and scan lines',
    keywords: ['terminal', 'glitch', 'background', 'retro', 'crt', 'effect'],
    useCases: [
      'Retro themes',
      'Hacker aesthetics',
      'Error pages',
      'Terminal UIs',
    ],
    dependencies: [],
  },
  'orb-background': {
    name: 'OrbBackground',
    category: 'backgrounds',
    description: 'Animated floating orb with gradient blur effect',
    keywords: ['orb', 'gradient', 'background', 'animation', 'blur', 'ambient'],
    useCases: [
      'Landing pages',
      'Hero sections',
      'Ambient backgrounds',
      'Modern aesthetics',
    ],
    dependencies: ['framer-motion'],
  },

  // ============================================================================
  // SPECIALTY - Cursor (2)
  // ============================================================================
  'splash-cursor': {
    name: 'SplashCursor',
    category: 'cursor',
    description: 'Custom cursor with splash/ripple effect on click',
    keywords: ['cursor', 'splash', 'ripple', 'click', 'effect', 'interactive'],
    useCases: [
      'Interactive experiences',
      'Creative portfolios',
      'Playful interfaces',
      'Click feedback',
    ],
    dependencies: [],
  },
  'target-cursor': {
    name: 'TargetCursor',
    category: 'cursor',
    description: 'Custom cursor with target/crosshair appearance',
    keywords: ['cursor', 'target', 'crosshair', 'pointer', 'custom'],
    useCases: [
      'Gaming interfaces',
      'Precision tools',
      'Interactive elements',
      'Custom pointers',
    ],
    dependencies: [],
  },

  // ============================================================================
  // SPECIALTY - Motion (1)
  // ============================================================================
  'animated-beam': {
    name: 'AnimatedBeam',
    category: 'motion',
    description: 'Animated beam/line connecting two elements',
    keywords: ['beam', 'animation', 'connection', 'line', 'flow', 'motion'],
    useCases: [
      'Connecting elements',
      'Data flow visualization',
      'Architecture diagrams',
      'Interactive connections',
    ],
    dependencies: ['framer-motion'],
  },

  // ============================================================================
  // SPECIALTY - Blocks (2)
  // ============================================================================
  hero: {
    name: 'Hero',
    category: 'blocks',
    description: 'Full-width hero section with title, subtitle, and CTA',
    keywords: ['hero', 'banner', 'header', 'landing', 'cta', 'section'],
    useCases: [
      'Landing pages',
      'Page headers',
      'Marketing sections',
      'Feature highlights',
    ],
    dependencies: [],
  },
  'open-graph-card': {
    name: 'OpenGraphCard',
    category: 'blocks',
    description: 'Social media preview card for Open Graph metadata',
    keywords: ['open-graph', 'social', 'preview', 'card', 'meta', 'share'],
    useCases: [
      'Social sharing previews',
      'Link previews',
      'Meta card generation',
      'Marketing previews',
    ],
    dependencies: [],
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
