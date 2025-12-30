export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  children?: NavigationItem[];
  section?: string; // Maps to Section type for navigation
}

export const navigationTree: NavigationItem[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: '📖',
    children: [
      {
        id: 'overview',
        label: 'Overview',
        section: 'overview',
      },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    icon: '🎨',
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
        id: 'motion',
        label: 'Motion',
        section: 'tokens',
      },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    icon: '🧩',
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
        ],
      },
    ],
  },
  {
    id: 'hooks',
    label: 'Hooks',
    icon: '🪝',
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
    id: 'utilities',
    label: 'Utilities',
    icon: '🛠️',
    children: [
      {
        id: 'validation',
        label: 'Validation',
        children: [
          {
            id: 'field-validation',
            label: 'Field Validation',
            section: 'hooks',
          },
          {
            id: 'form-validation',
            label: 'Form Validation',
            section: 'hooks',
          },
          {
            id: 'patterns',
            label: 'Built-in Patterns',
            section: 'hooks',
          },
        ],
      },
      {
        id: 'colors-utils',
        label: 'Colors',
        children: [
          {
            id: 'color-tokens',
            label: 'Color Tokens',
            section: 'tokens',
          },
          {
            id: 'semantic-colors',
            label: 'Semantic Colors',
            section: 'tokens',
          },
          {
            id: 'contrast-checker',
            label: 'Contrast Checker',
            section: 'tokens',
          },
        ],
      },
      {
        id: 'animations',
        label: 'Animations',
        children: [
          {
            id: 'variants',
            label: 'Variants',
            section: 'tokens',
          },
          {
            id: 'presets',
            label: 'Presets',
            section: 'tokens',
          },
          {
            id: 'custom-helpers',
            label: 'Custom Helpers',
            section: 'tokens',
          },
        ],
      },
    ],
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: '📐',
    children: [
      {
        id: 'templates-overview',
        label: 'Coming Soon',
        section: 'templates',
      },
    ],
  },
];
