import { Dropdown, Tooltip, ThemeToggle, FormField, SearchBar, RadioGroup, CheckboxGroup, Button, Breadcrumbs } from '@ecosystem/design-system';
import type { ComponentConfig } from './component-registry';

export const moleculeRegistry: Record<string, ComponentConfig> = {
  Breadcrumbs: {
    component: Breadcrumbs,
    description: 'Navigation component showing page hierarchy with clickable links and customizable separators.',
    props: {
      variant: {
        type: 'select',
        options: ['subtle', 'bold', 'underline'] as const,
        default: 'subtle',
        description: 'Visual style of breadcrumb links',
      },
      separator: {
        type: 'text',
        default: '/',
        description: 'Custom separator between items (e.g., /, ›, →)',
      },
    },
    examples: [
      {
        label: 'Subtle Variant',
        props: {
          variant: 'subtle',
          items: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Electronics', href: '#' },
            { label: 'Laptop' },
          ],
        },
        children: null,
      },
      {
        label: 'Bold Variant',
        props: {
          variant: 'bold',
          items: [
            { label: 'Docs', href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Molecules', href: '#' },
            { label: 'Breadcrumbs' },
          ],
        },
        children: null,
      },
      {
        label: 'Underline Variant',
        props: {
          variant: 'underline',
          items: [
            { label: 'Dashboard', href: '#' },
            { label: 'Projects', href: '#' },
            { label: 'Ecosystem' },
          ],
        },
        children: null,
      },
      {
        label: 'Custom Separator',
        props: {
          variant: 'subtle',
          separator: '›',
          items: [
            { label: 'Home', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Article Title' },
          ],
        },
        children: null,
      },
      {
        label: 'Long Path',
        props: {
          variant: 'subtle',
          items: [
            { label: 'Root', href: '#' },
            { label: 'Workspace', href: '#' },
            { label: 'Documents', href: '#' },
            { label: '2024', href: '#' },
            { label: 'Q4', href: '#' },
            { label: 'Reports', href: '#' },
            { label: 'Financial Analysis.pdf' },
          ],
        },
        children: null,
      },
    ],
  },

  Dropdown: {
    component: Dropdown,
    description: 'A menu that appears when clicking a trigger element with keyboard navigation support.',
    props: {
      align: {
        type: 'select',
        options: ['left', 'right', 'center'] as const,
        default: 'left',
        description: 'Alignment relative to trigger',
      },
    },
    examples: [
      {
        label: 'Left Aligned',
        props: {
          trigger: <Button variant="secondary" size="sm">Open Menu</Button>,
          items: [
            { label: 'Profile', value: 'profile' },
            { label: 'Settings', value: 'settings' },
            { label: 'Sign Out', value: 'signout' },
          ],
          align: 'left',
        },
        children: null,
      },
      {
        label: 'Right Aligned',
        props: {
          trigger: <Button variant="ghost" size="sm">Actions</Button>,
          items: [
            { label: 'Edit', value: 'edit' },
            { label: 'Duplicate', value: 'duplicate' },
            { label: 'Delete', value: 'delete' },
          ],
          align: 'right',
        },
        children: null,
      },
    ],
  },

  Tooltip: {
    component: Tooltip,
    description: 'A small popup that displays additional information on hover or focus.',
    props: {
      position: {
        type: 'select',
        options: ['top', 'bottom', 'left', 'right'] as const,
        default: 'top',
        description: 'Position relative to trigger',
      },
    },
    examples: [
      {
        label: 'Top Position',
        props: {
          content: 'This is a helpful tooltip',
          position: 'top',
        },
        children: <Button variant="secondary" size="sm">Hover me (top)</Button>,
      },
      {
        label: 'Bottom Position',
        props: {
          content: 'Tooltip appears below',
          position: 'bottom',
        },
        children: <Button variant="secondary" size="sm">Hover me (bottom)</Button>,
      },
      {
        label: 'Left Position',
        props: {
          content: 'Appears on the left',
          position: 'left',
        },
        children: <Button variant="secondary" size="sm">Hover me (left)</Button>,
      },
      {
        label: 'Right Position',
        props: {
          content: 'Appears on the right',
          position: 'right',
        },
        children: <Button variant="secondary" size="sm">Hover me (right)</Button>,
      },
    ],
  },

  ThemeToggle: {
    component: ThemeToggle,
    description: 'A button that toggles between light and dark modes with smooth icon transitions.',
    props: {
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size of the toggle button',
      },
      showLabel: {
        type: 'boolean',
        default: false,
        description: 'Show mode label next to icon',
      },
    },
    examples: [
      { label: 'Icon Only', props: { size: 'md', showLabel: false }, children: null },
      { label: 'With Label', props: { size: 'md', showLabel: true }, children: null },
      { label: 'Small', props: { size: 'sm', showLabel: false }, children: null },
      { label: 'Large with Label', props: { size: 'lg', showLabel: true }, children: null },
    ],
  },

  FormField: {
    component: FormField,
    description: 'A wrapper component that provides label, error message, and help text for form inputs.',
    props: {},
    examples: [
      {
        label: 'Basic Field',
        props: {
          label: 'Email Address',
          htmlFor: 'email',
        },
        children: <input type="email" id="email" className="w-full px-3 py-2 border border-[var(--color-border)] rounded bg-[var(--color-background)] text-[var(--color-text-primary)]" placeholder="you@example.com" />,
      },
      {
        label: 'With Help Text',
        props: {
          label: 'Password',
          htmlFor: 'password',
          helpText: 'Must be at least 8 characters',
        },
        children: <input type="password" id="password" className="w-full px-3 py-2 border border-[var(--color-border)] rounded bg-[var(--color-background)] text-[var(--color-text-primary)]" />,
      },
      {
        label: 'With Error',
        props: {
          label: 'Username',
          htmlFor: 'username',
          error: 'Username is already taken',
        },
        children: <input type="text" id="username" className="w-full px-3 py-2 border border-[var(--color-error)] rounded bg-[var(--color-background)] text-[var(--color-text-primary)]" />,
      },
    ],
  },

  SearchBar: {
    component: SearchBar,
    description: 'A text input with search icon and debounced search functionality.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {
          placeholder: 'Search...',
          onSearch: () => {},
        },
        children: null,
      },
      {
        label: 'With Clear Button',
        props: {
          placeholder: 'Search products...',
          onSearch: () => {},
          showClearButton: true,
        },
        children: null,
      },
    ],
  },

  RadioGroup: {
    component: RadioGroup,
    description: 'A group of radio buttons for selecting a single option.',
    props: {},
    examples: [
      {
        label: 'Vertical Layout',
        props: {
          name: 'plan',
          options: [
            { value: 'free', label: 'Free Plan' },
            { value: 'pro', label: 'Pro Plan' },
            { value: 'enterprise', label: 'Enterprise Plan' },
          ],
          value: 'pro',
          onChange: () => {},
        },
        children: null,
      },
      {
        label: 'Horizontal Layout',
        props: {
          name: 'size',
          options: [
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
          ],
          value: 'md',
          onChange: () => {},
          orientation: 'horizontal',
        },
        children: null,
      },
    ],
  },

  CheckboxGroup: {
    component: CheckboxGroup,
    description: 'A group of checkboxes for selecting multiple options.',
    props: {},
    examples: [
      {
        label: 'Multiple Selection',
        props: {
          name: 'features',
          options: [
            { value: 'analytics', label: 'Analytics' },
            { value: 'notifications', label: 'Email Notifications' },
            { value: 'api', label: 'API Access' },
          ],
          value: ['analytics', 'api'],
          onChange: () => {},
        },
        children: null,
      },
    ],
  },
};
