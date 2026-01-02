import { Dropdown, Tooltip, ThemeToggle, FormField, SearchBar, RadioGroup, CheckboxGroup, Button, Breadcrumbs } from '@ecosystem/design-system';
import type { ComponentConfig } from './component-registry';

export const moleculeRegistry: Record<string, ComponentConfig> = {
  Breadcrumbs: {
    component: Breadcrumbs,
    description: 'Navigation component showing page hierarchy with clickable links and customizable separators.',
    props: {
      items: {
        type: 'array',
        typeDefinition: 'BreadcrumbItem[]',
        required: true,
        default: [],
        description: 'Array of breadcrumb items from root to current page. Last item should omit href to indicate current page.',
      },
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
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Breadcrumbs } from '@ecosystem/design-system';

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptop' }, // Current page (no href)
  ]}
/>`,
        description: 'Simple breadcrumb navigation showing the page hierarchy',
      },
      {
        title: 'With Custom Variant and Separator',
        code: `<Breadcrumbs
  variant="bold"
  separator="›"
  items={[
    { label: 'Docs', href: '/docs' },
    { label: 'Components', href: '/docs/components' },
    { label: 'Breadcrumbs' },
  ]}
/>`,
        description: 'Using bold variant with arrow separator',
      },
      {
        title: 'TypeScript Interface',
        code: `interface BreadcrumbItem {
  label: string;
  href?: string;  // Omit for current page
  icon?: React.ReactNode;
}

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Products' },
];`,
        description: 'TypeScript definition for breadcrumb items',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/molecules/Breadcrumbs/Breadcrumbs.tsx',
  },

  Dropdown: {
    component: Dropdown,
    description: 'A menu that appears when clicking a trigger element. Features keyboard navigation, click-outside-to-close, optional icons, and theme-aware styling.',
    props: {
      trigger: {
        type: 'custom',
        typeDefinition: 'React.ReactNode',
        required: true,
        default: null,
        description: 'Trigger element (button, link, etc.) that opens the dropdown menu',
      },
      items: {
        type: 'array',
        typeDefinition: 'DropdownItem[]',
        required: true,
        default: [],
        description: 'Array of menu items with label, value, optional icon, and divider support',
      },
      onSelect: {
        type: 'custom',
        typeDefinition: '(value: string) => void',
        default: undefined,
        description: 'Callback function called when a menu item is selected',
      },
      align: {
        type: 'select',
        options: ['left', 'right', 'center'] as const,
        default: 'left',
        description: 'Dropdown menu alignment relative to the trigger element',
      },
    },
    examples: [
      {
        label: 'User Menu',
        props: {
          trigger: <Button variant="secondary" size="sm">My Account</Button>,
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
        label: 'Actions Menu',
        props: {
          trigger: <Button variant="ghost" size="sm">Actions ⋮</Button>,
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
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Dropdown, Button } from '@ecosystem/design-system';

<Dropdown
  trigger={<Button variant="secondary">Options</Button>}
  items={[
    { label: 'Edit', value: 'edit' },
    { label: 'Delete', value: 'delete' },
  ]}
  onSelect={(value) => console.log('Selected:', value)}
/>`,
        description: 'Simple dropdown menu with button trigger',
      },
      {
        title: 'With Icons and Dividers',
        code: `<Dropdown
  trigger={<Button variant="ghost">Menu</Button>}
  items={[
    { label: 'Edit', value: 'edit', icon: <EditIcon /> },
    { label: 'Duplicate', value: 'duplicate', icon: <CopyIcon /> },
    { label: '', value: 'div1', divider: true },
    { label: 'Delete', value: 'delete', icon: <TrashIcon /> },
  ]}
  onSelect={handleAction}
/>`,
        description: 'Dropdown with icons and visual dividers between sections',
      },
      {
        title: 'TypeScript Interface',
        code: `interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  divider?: boolean;  // Shows separator line
}

const menuItems: DropdownItem[] = [
  { label: 'Profile', value: 'profile', icon: <UserIcon /> },
  { label: 'Settings', value: 'settings', disabled: true },
];`,
        description: 'TypeScript type definition for dropdown items',
      },
      {
        title: 'With State Management',
        code: `const [selectedAction, setSelectedAction] = useState<string>('');

<Dropdown
  trigger={<Button>Actions</Button>}
  items={[
    { label: 'Export PDF', value: 'pdf' },
    { label: 'Export CSV', value: 'csv' },
  ]}
  onSelect={(value) => {
    setSelectedAction(value);
    handleExport(value);
  }}
  align="center"
/>`,
        description: 'Managing dropdown state and handling selections',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/molecules/Dropdown/Dropdown.tsx',
  },

  Tooltip: {
    component: Tooltip,
    description: 'A small popup that displays additional information on hover or focus. Features keyboard accessibility, configurable delay, and respects motion preferences.',
    props: {
      content: {
        type: 'text',
        required: true,
        default: '',
        description: 'Tooltip content text to display',
      },
      children: {
        type: 'custom',
        typeDefinition: 'React.ReactNode',
        required: true,
        default: null,
        description: 'Element that triggers the tooltip (shows on hover/focus)',
      },
      position: {
        type: 'select',
        options: ['top', 'bottom', 'left', 'right'] as const,
        default: 'top',
        description: 'Tooltip position relative to the trigger element',
      },
      delay: {
        type: 'custom',
        typeDefinition: 'number',
        default: 200,
        description: 'Delay in milliseconds before showing tooltip (default: 200ms)',
      },
    },
    examples: [
      {
        label: 'Top',
        props: {
          content: 'This is a helpful tooltip',
          position: 'top',
        },
        children: <Button variant="secondary" size="sm">Hover (Top)</Button>,
      },
      {
        label: 'Bottom',
        props: {
          content: 'Tooltip appears below',
          position: 'bottom',
        },
        children: <Button variant="secondary" size="sm">Hover (Bottom)</Button>,
      },
      {
        label: 'Left',
        props: {
          content: 'Appears on the left',
          position: 'left',
        },
        children: <Button variant="secondary" size="sm">Hover (Left)</Button>,
      },
      {
        label: 'Right',
        props: {
          content: 'Appears on the right',
          position: 'right',
        },
        children: <Button variant="secondary" size="sm">Hover (Right)</Button>,
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Tooltip, Button } from '@ecosystem/design-system';

<Tooltip content="Click to save your changes" position="top">
  <Button variant="primary">Save</Button>
</Tooltip>`,
        description: 'Simple tooltip on a button',
      },
      {
        title: 'On Icons or Text',
        code: `<Tooltip content="Settings">
  <button aria-label="Settings">
    <SettingsIcon />
  </button>
</Tooltip>

<Tooltip content="This feature is experimental">
  <span className="text-sm">🧪 Beta Feature</span>
</Tooltip>`,
        description: 'Tooltips on icons and inline elements',
      },
      {
        title: 'With Custom Delay',
        code: `<Tooltip
  content="This tooltip appears after 500ms"
  position="bottom"
  delay={500}
>
  <Button variant="ghost">Slow Tooltip</Button>
</Tooltip>`,
        description: 'Adjust delay for better UX in specific contexts',
      },
      {
        title: 'All Positions',
        code: `<div className="flex gap-4">
  <Tooltip content="Top tooltip" position="top">
    <Button size="sm">Top</Button>
  </Tooltip>
  <Tooltip content="Right tooltip" position="right">
    <Button size="sm">Right</Button>
  </Tooltip>
  <Tooltip content="Bottom tooltip" position="bottom">
    <Button size="sm">Bottom</Button>
  </Tooltip>
  <Tooltip content="Left tooltip" position="left">
    <Button size="sm">Left</Button>
  </Tooltip>
</div>`,
        description: 'Showcase of all four positioning options',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/molecules/Tooltip/Tooltip.tsx',
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
