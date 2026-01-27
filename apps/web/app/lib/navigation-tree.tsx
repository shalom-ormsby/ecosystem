import { BookOpen, Palette, Component, Webhook, LayoutTemplate, Layers, Bot, Sparkles } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  section?: string; // Maps to Section type for navigation
}

export const navigationTree: NavigationItem[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: <BookOpen className="w-4 h-4" />,
    children: [
      {
        id: 'overview',
        label: 'Overview',
        section: 'overview',
      },
      {
        id: 'architecture',
        label: 'Architecture',
        section: 'architecture',
      },
      {
        id: 'adding-components',
        label: 'Adding Components',
        children: [
          {
            id: 'methodology',
            label: 'Methodology',
            section: 'adding-components',
          },
          {
            id: 'modifying',
            label: 'Modifying',
            section: 'adding-components',
          },
          {
            id: 'troubleshooting',
            label: 'Troubleshooting',
            section: 'adding-components',
          },
        ],
      },
      {
        id: 'common-patterns',
        label: 'Common Patterns',
        section: 'common-patterns',
      },
      {
        id: 'contributing',
        label: 'Contributing',
        section: 'contributing',
      },
    ],
  },
  {
    id: 'foundations',
    label: 'Design Tokens',
    icon: <Palette className="w-4 h-4" />,
    children: [
      {
        id: 'colors',
        label: 'Colors',
        section: 'tokens',
      },
      {
        id: 'typography',
        label: 'Typography',
        section: 'tokens',
      },
      {
        id: 'spacing',
        label: 'Spacing',
        section: 'tokens',
      },
      {
        id: 'interactions',
        label: 'Interactions',
        section: 'tokens',
      },
      {
        id: 'syntax',
        label: 'Syntax',
        section: 'tokens',
      },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    icon: <Component className="w-4 h-4" />,
    section: 'components',
    children: [
      {
        id: 'actions',
        label: 'Actions',
        section: 'actions',
        children: [
          { id: 'button', label: 'Button', section: 'actions' },
          { id: 'toggle', label: 'Toggle', section: 'actions' },
          { id: 'toggle-group', label: 'Toggle Group', section: 'actions' },
        ],
      },
      {
        id: 'forms',
        label: 'Forms',
        section: 'forms',
        children: [
          { id: 'checkbox', label: 'Checkbox', section: 'forms' },
          { id: 'combobox', label: 'Combobox', section: 'forms' },
          { id: 'drag-drop', label: 'Drag & Drop', section: 'forms' },
          { id: 'form', label: 'Form', section: 'forms' },
          { id: 'input', label: 'Input', section: 'forms' },
          { id: 'input-otp', label: 'Input OTP', section: 'forms' },
          { id: 'label', label: 'Label', section: 'forms' },
          { id: 'radio-group', label: 'Radio Group', section: 'forms' },
          { id: 'select', label: 'Select', section: 'forms' },
          { id: 'slider', label: 'Slider', section: 'forms' },
          { id: 'switch', label: 'Switch', section: 'forms' },
          { id: 'textarea', label: 'Textarea', section: 'forms' },
        ],
      },
      {
        id: 'navigation',
        label: 'Navigation',
        section: 'navigation',
        children: [
          { id: 'breadcrumb', label: 'Breadcrumb', section: 'navigation' },
          { id: 'command', label: 'Command', section: 'navigation' },
          { id: 'menubar', label: 'Menubar', section: 'navigation' },
          { id: 'navigation-menu', label: 'Navigation Menu', section: 'navigation' },
          { id: 'pagination', label: 'Pagination', section: 'navigation' },
          { id: 'tabs', label: 'Tabs', section: 'navigation' },
        ],
      },
      {
        id: 'overlays',
        label: 'Overlays',
        section: 'overlays',
        children: [
          { id: 'alert-dialog', label: 'Alert Dialog', section: 'overlays' },
          { id: 'context-menu', label: 'Context Menu', section: 'overlays' },
          { id: 'dialog', label: 'Dialog', section: 'overlays' },
          { id: 'drawer', label: 'Drawer', section: 'overlays' },
          { id: 'dropdown-menu', label: 'Dropdown Menu', section: 'overlays' },
          { id: 'hover-card', label: 'Hover Card', section: 'overlays' },
          { id: 'popover', label: 'Popover', section: 'overlays' },
          { id: 'sheet', label: 'Sheet', section: 'overlays' },
          { id: 'tooltip', label: 'Tooltip', section: 'overlays' },
        ],
      },
      {
        id: 'feedback',
        label: 'Feedback',
        section: 'feedback',
        children: [
          { id: 'alert', label: 'Alert', section: 'feedback' },
          { id: 'progress', label: 'Progress', section: 'feedback' },
          { id: 'skeleton', label: 'Skeleton', section: 'feedback' },
          { id: 'sonner', label: 'Sonner', section: 'feedback' },
          { id: 'toaster', label: 'Toaster', section: 'feedback' },
        ],
      },
      {
        id: 'data-display',
        label: 'Data Display',
        section: 'data-display',
        children: [
          { id: 'avatar', label: 'Avatar', section: 'data-display' },
          { id: 'badge', label: 'Badge', section: 'data-display' },
          { id: 'calendar', label: 'Calendar', section: 'data-display' },
          { id: 'card', label: 'Card', section: 'data-display' },
          { id: 'data-table', label: 'Data Table', section: 'data-display' },
          { id: 'table', label: 'Table', section: 'data-display' },
          { id: 'table', label: 'Table', section: 'data-display' },
        ],
      },
      {
        id: 'layout',
        label: 'Layout',
        section: 'layout',
        children: [
          { id: 'accordion', label: 'Accordion', section: 'layout' },
          { id: 'aspect-ratio', label: 'Aspect Ratio', section: 'layout' },
          { id: 'carousel', label: 'Carousel', section: 'layout' },
          { id: 'collapsible', label: 'Collapsible', section: 'layout' },
          { id: 'date-picker', label: 'Date Picker', section: 'layout' },
          { id: 'resizable', label: 'Resizable', section: 'layout' },
          { id: 'scroll-area', label: 'Scroll Area', section: 'layout' },
          { id: 'separator', label: 'Separator', section: 'layout' },
          { id: 'sidebar', label: 'Sidebar', section: 'layout' },
        ],
      },
    ],
  },
  {
    id: 'blocks',
    label: 'Blocks',
    icon: <Layers className="w-4 h-4" />,
    children: [
      {
        id: 'app-shell',
        label: 'App Shell',
        children: [
          { id: 'page-layout', label: 'Page Layout', section: 'blocks' },
          { id: 'primary-nav', label: 'Primary Nav', section: 'blocks' },
          { id: 'secondary-nav', label: 'Secondary Nav', section: 'blocks' },
          { id: 'footer', label: 'Footer', section: 'blocks' },
        ],
      },
      {
        id: 'customization',
        label: 'Customization',
        children: [
          { id: 'theme-toggle', label: 'Theme Toggle', section: 'forms' },
        ],
      },
      {
        id: 'code',
        label: 'Code',
        children: [
          { id: 'collapsible-code-block', label: 'Code Block', section: 'blocks' },
        ],
      },
      {
        id: 'social',
        label: 'Social',
        children: [
          { id: 'open-graph-card', label: 'Open Graph Card', section: 'blocks' },
        ],
      },
    ],
  },
  {
    id: 'themes',
    label: 'Themes',
    icon: <Sparkles className="w-4 h-4" />, // Using Sparkles temporarily or another icon
    children: [
      {
        id: 'palettes',
        label: 'Color Palettes',
        section: 'themes',
      },
      {
        id: 'typography',
        label: 'Typography',
        section: 'themes',
      },
      {
        id: 'typography-playground',
        label: 'Typography Playground',
        section: 'themes',
      },
      {
        id: 'customizer',
        label: 'Customizer',
        section: 'themes',
      },
    ],
  },
  {
    id: 'motion',
    label: 'Motion',
    icon: <div className="w-4 h-4 flex items-center justify-center font-bold text-xs" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>ƒ</div>,
    children: [
      {
        id: 'primitives',
        label: 'Primitives',
        section: 'motion',
      },
      {
        id: 'text-effects',
        label: 'Text Effects',
        section: 'motion',
        children: [
          { id: 'variable-weight', label: 'Variable Weight', section: 'motion' },
          { id: 'typewriter', label: 'Typewriter', section: 'motion' },
        ],
      },
      {
        id: 'backgrounds',
        label: 'Backgrounds',
        section: 'motion',
        children: [
          { id: 'warp-speed', label: 'Warp Speed', section: 'motion' },
          { id: 'faulty-terminal', label: 'Faulty Terminal', section: 'motion' },
        ],
      },
      {
        id: 'cursors',
        label: 'Cursors',
        section: 'motion',
        children: [
          { id: 'target-cursor', label: 'Target', section: 'motion' },
          { id: 'splash-cursor', label: 'Splash', section: 'motion' },
        ],
      },
      {
        id: 'micro-interactions',
        label: 'Micro-Interactions',
        section: 'motion',
        children: [
          { id: 'magnetic', label: 'Magnetic', section: 'motion' },
        ],
      },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    icon: <div className="w-4 h-4 flex items-center justify-center font-bold text-xs">📊</div>,
    children: [
      {
        id: 'overview',
        label: 'Overview',
        section: 'charts',
      },
      {
        id: 'area-chart',
        label: 'Area Chart',
        section: 'charts',
      },
      {
        id: 'bar-chart',
        label: 'Bar Chart',
        section: 'charts',
      },
      {
        id: 'line-chart',
        label: 'Line Chart',
        section: 'charts',
      },
      {
        id: 'pie-chart',
        label: 'Pie Chart',
        section: 'charts',
      },
    ],
  },
  {
    id: 'hooks',
    label: 'Hooks',
    icon: <Webhook className="w-4 h-4" />,
    children: [
      {
        id: 'core',
        label: 'Core',
        children: [
          { id: 'use-form', label: 'useForm', section: 'hooks' },
          { id: 'use-theme', label: 'useTheme', section: 'hooks' },
          { id: 'use-toast', label: 'useToast', section: 'hooks' },
          { id: 'use-motion-preference', label: 'useMotionPreference', section: 'hooks' },
        ]
      },
      {
        id: 'utilities',
        label: 'Utilities',
        children: [
          { id: 'use-clipboard', label: 'useClipboard', section: 'hooks' },
        ]
      }
    ],
  },
  {
    id: 'mcp-server',
    label: 'MCP Server',
    icon: <Bot className="w-4 h-4" />,
    children: [
      {
        id: 'overview',
        label: 'Overview',
        section: 'mcp-server',
      },
      {
        id: 'installation',
        label: 'Installation',
        section: 'mcp-server',
      },
      {
        id: 'tools',
        label: 'Available Tools',
        section: 'mcp-server',
      },
      {
        id: 'usage',
        label: 'Usage Guide',
        section: 'mcp-server',
      },
      {
        id: 'troubleshooting',
        label: 'Troubleshooting',
        section: 'mcp-server',
      },
    ],
  },
];
