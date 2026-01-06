import { BookOpen, Palette, Component, Webhook, LayoutTemplate } from 'lucide-react';

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
        section: 'adding-components',
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
        id: 'syntax',
        label: 'Syntax',
        section: 'tokens',
      },
      {
        id: 'motion',
        label: 'Motion',
        children: [
          {
            id: 'motion-foundations',
            label: 'Foundations',
            section: 'motion',
          },
          {
            id: 'text-effects',
            label: 'Text Effects',
            section: 'motion',
          },
          {
            id: 'scroll',
            label: 'Scroll',
            section: 'motion',
          },
          {
            id: 'loading',
            label: 'Loading',
            section: 'motion',
          },
          {
            id: 'interactive',
            label: 'Interactive',
            section: 'motion',
          },
          {
            id: 'transitions',
            label: 'Transitions',
            section: 'motion',
          },
          {
            id: 'cursor-effects',
            label: 'Cursor Effects',
            section: 'motion',
          },
        ],
      },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    icon: <Component className="w-4 h-4" />,
    children: [
      {
        id: 'atoms',
        label: 'Atoms',
        children: [
          {
            id: 'button',
            label: 'Button',
            section: 'atoms',
          },
          {
            id: 'card',
            label: 'Card',
            section: 'atoms',
          },
          {
            id: 'code',
            label: 'Code',
            section: 'atoms',
          },
          {
            id: 'link',
            label: 'Link',
            section: 'atoms',
          },
          {
            id: 'badge',
            label: 'Badge',
            section: 'atoms',
          },
          {
            id: 'avatar',
            label: 'Avatar',
            section: 'atoms',
          },
          {
            id: 'spinner',
            label: 'Spinner',
            section: 'atoms',
          },
          {
            id: 'progressbar',
            label: 'ProgressBar',
            section: 'atoms',
          },
        ],
      },
      {
        id: 'molecules',
        label: 'Molecules',
        children: [
          {
            id: 'navigation-molecules',
            label: 'Navigation',
            children: [
              {
                id: 'breadcrumbs',
                label: 'Breadcrumbs',
                section: 'molecules',
              },
            ],
          },
          {
            id: 'forms',
            label: 'Forms',
            children: [
              {
                id: 'form-field',
                label: 'FormField',
                section: 'molecules',
              },
              {
                id: 'search-bar',
                label: 'SearchBar',
                section: 'molecules',
              },
              {
                id: 'radio-group',
                label: 'RadioGroup',
                section: 'molecules',
              },
              {
                id: 'checkbox-group',
                label: 'CheckboxGroup',
                section: 'molecules',
              },
            ],
          },
          {
            id: 'feedback',
            label: 'Feedback',
            children: [
              {
                id: 'tooltip',
                label: 'Tooltip',
                section: 'molecules',
              },
              {
                id: 'dropdown',
                label: 'Dropdown',
                section: 'molecules',
              },
            ],
          },
          {
            id: 'controls',
            label: 'Controls',
            children: [
              {
                id: 'theme-toggle',
                label: 'ThemeToggle',
                section: 'molecules',
              },
            ],
          },
        ],
      },
      {
        id: 'organisms',
        label: 'Organisms',
        children: [
          {
            id: 'navigation',
            label: 'Navigation',
            children: [
              {
                id: 'primary-nav',
                label: 'PrimaryNav',
                section: 'organisms',
              },
              {
                id: 'secondary-nav',
                label: 'SecondaryNav',
                section: 'organisms',
              },
              {
                id: 'tertiary-nav',
                label: 'TertiaryNav',
                section: 'organisms',
              },
            ],
          },
          {
            id: 'layout',
            label: 'Layout',
            children: [
              {
                id: 'first-stack',
                label: 'FirstStack',
                section: 'organisms',
              },
              {
                id: 'second-stack',
                label: 'SecondStack',
                section: 'organisms',
              },
            ],
          },
          {
            id: 'feedback-organisms',
            label: 'Feedback',
            children: [
              {
                id: 'toast',
                label: 'Toast',
                section: 'organisms',
              },
              {
                id: 'modal',
                label: 'Modal',
                section: 'organisms',
              },
            ],
          },
          {
            id: 'sections',
            label: 'Sections',
            children: [
              {
                id: 'footer',
                label: 'Footer',
                section: 'organisms',
              },
            ],
          },
          {
            id: 'code',
            label: 'Code',
            children: [
              {
                id: 'collapsible-code-block',
                label: 'CollapsibleCodeBlock',
                section: 'organisms',
              },
            ],
          },
          {
            id: 'customization',
            label: 'Customization',
            children: [
              {
                id: 'customizer',
                label: 'Customizer',
                section: 'organisms',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'hooks',
    label: 'Hooks',
    icon: <Webhook className="w-4 h-4" />,
    children: [
      {
        id: 'use-form',
        label: 'useForm',
        section: 'hooks',
      },
      {
        id: 'use-theme',
        label: 'useTheme',
        section: 'hooks',
      },
      {
        id: 'use-toast',
        label: 'useToast',
        section: 'hooks',
      },
      {
        id: 'use-motion-preference',
        label: 'useMotionPreference',
        section: 'hooks',
      },
    ],
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: <LayoutTemplate className="w-4 h-4" />,
    children: [
      {
        id: 'templates-overview',
        label: 'Overview',
        section: 'templates',
      },
      {
        id: 'page-template',
        label: 'Page Template',
        section: 'templates',
      },
    ],
  },
];
