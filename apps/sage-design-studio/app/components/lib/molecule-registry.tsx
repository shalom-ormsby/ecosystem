import { Button } from '@sds/ui';
import { Dropdown, Tooltip, ThemeToggle, FormField, SearchBar, RadioGroup, CheckboxGroup, Breadcrumbs } from '@ecosystem/design-system';
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
    accessibilityNotes: [
      'Uses semantic <nav> element with configurable aria-label (default: "Breadcrumb")',
      'Ordered list <ol> with <li> items for screen reader navigation',
      'Current/last item uses aria-current="page" for proper page indication',
      'All clickable links are focusable and keyboard navigable (Tab/Enter)',
      'Visible focus rings on interactive elements for keyboard users',
      'Separators are purely decorative (aria-hidden implied by CSS content)',
    ],
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
    codeExamples: [
      {
        title: 'Basic Theme Toggle',
        code: `import { ThemeToggle } from '@ecosystem/design-system';

<ThemeToggle />`,
        description: 'Simple icon-only theme switcher',
      },
      {
        title: 'With Label',
        code: `<ThemeToggle showLabel={true} />`,
        description: 'Theme toggle with text label showing current mode',
      },
      {
        title: 'In Navigation Bar',
        code: `<header className="flex items-center justify-between p-4">
  <div className="flex items-center gap-4">
    <Logo />
    <Navigation />
  </div>
  <ThemeToggle size="md" />
</header>`,
        description: 'Theme toggle positioned in header navigation',
      },
      {
        title: 'Settings Page',
        code: `<div className="flex items-center justify-between p-4 border-b">
  <div>
    <h3 className="font-medium">Appearance</h3>
    <p className="text-sm text-[var(--color-text-secondary)]">
      Toggle between light and dark mode
    </p>
  </div>
  <ThemeToggle size="lg" showLabel />
</div>`,
        description: 'Theme toggle in settings with description',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/molecules/ThemeToggle/ThemeToggle.tsx',
  },

  FormField: {
    component: FormField,
    description: 'A wrapper component that provides label, error message, and help text for form inputs.',
    props: {
      label: {
        type: 'text',
        required: true,
        default: '',
        description: 'Label text for the form field',
      },
      htmlFor: {
        type: 'text',
        required: true,
        default: '',
        description: 'ID of the input element this label is for',
      },
      error: {
        type: 'text',
        default: '',
        description: 'Error message to display below the input',
      },
      helpText: {
        type: 'text',
        default: '',
        description: 'Helper text to display below the input',
      },
    },
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
    codeExamples: [
      {
        title: 'Basic Form Field',
        code: `import { FormField } from '@ecosystem/design-system';

<FormField label="Email Address" htmlFor="email">
  <input
    id="email"
    type="email"
    placeholder="you@example.com"
    className="w-full px-3 py-2 border rounded"
  />
</FormField>`,
        description: 'Simple form field with label and input',
      },
      {
        title: 'With Validation Error',
        code: `<FormField
  label="Username"
  htmlFor="username"
  error="Username is already taken"
>
  <input id="username" type="text" className="w-full px-3 py-2 border border-error rounded" />
</FormField>`,
        description: 'Form field displaying validation error',
      },
      {
        title: 'With Help Text',
        code: `<FormField
  label="Password"
  htmlFor="password"
  helpText="Must be at least 8 characters with numbers and symbols"
>
  <input id="password" type="password" className="w-full px-3 py-2 border rounded" />
</FormField>`,
        description: 'Form field with helper text for user guidance',
      },
      {
        title: 'Complete Form Example',
        code: `<form className="space-y-4">
  <FormField label="Full Name" htmlFor="name">
    <input id="name" type="text" className="w-full px-3 py-2 border rounded" />
  </FormField>

  <FormField
    label="Email"
    htmlFor="email"
    error={emailError}
  >
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-3 py-2 border rounded"
    />
  </FormField>

  <button type="submit">Submit</button>
</form>`,
        description: 'Multiple form fields in a complete form',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/molecules/Form/FormField.tsx',
  },

  SearchBar: {
    component: SearchBar,
    description: 'A text input with search icon and debounced search functionality.',
    props: {
      placeholder: {
        type: 'text',
        default: 'Search...',
        description: 'Placeholder text for the search input',
      },
      onSearch: {
        type: 'custom',
        typeDefinition: '(query: string) => void',
        required: true,
        default: () => { },
        description: 'Callback fired when search query changes (debounced)',
      },
      showClearButton: {
        type: 'boolean',
        default: true,
        description: 'Show clear button when input has value',
      },
      debounceMs: {
        type: 'text',
        default: '300',
        description: 'Debounce delay in milliseconds',
      },
    },
    examples: [
      {
        label: 'Default',
        props: {
          placeholder: 'Search...',
          onSearch: () => { },
        },
        children: null,
      },
      {
        label: 'With Clear Button',
        props: {
          placeholder: 'Search products...',
          onSearch: () => { },
          showClearButton: true,
        },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Basic Search',
        code: `import { SearchBar } from '@ecosystem/design-system';

const [results, setResults] = useState([]);

<SearchBar
  placeholder="Search products..."
  onSearch={(query) => {
    // Search logic here
    fetchProducts(query).then(setResults);
  }}
/>`,
        description: 'Simple search bar with callback',
      },
      {
        title: 'With Debouncing',
        code: `<SearchBar
  placeholder="Search users..."
  debounceMs={500}
  onSearch={async (query) => {
    if (query.length >= 3) {
      const users = await searchUsers(query);
      setSearchResults(users);
    }
  }}
/>`,
        description: 'Search with custom debounce delay',
      },
      {
        title: 'Search with Results',
        code: `const [query, setQuery] = useState('');
const [results, setResults] = useState([]);

<div className="relative">
  <SearchBar
    placeholder="Search documentation..."
    onSearch={(q) => {
      setQuery(q);
      setResults(searchDocs(q));
    }}
  />

  {results.length > 0 && (
    <div className="absolute w-full mt-2 bg-white shadow-lg rounded">
      {results.map((result) => (
        <div key={result.id} className="p-2 hover:bg-gray-100">
          {result.title}
        </div>
      ))}
    </div>
  )}
</div>`,
        description: 'Search bar with dropdown results',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/molecules/Form/SearchBar.tsx',
  },

  RadioGroup: {
    component: RadioGroup,
    description: 'A group of radio buttons for selecting a single option.',
    props: {
      name: {
        type: 'text',
        required: true,
        default: '',
        description: 'Name attribute for all radio inputs in the group',
      },
      options: {
        type: 'array',
        typeDefinition: 'Array<{ value: string; label: string; disabled?: boolean }>',
        required: true,
        default: [],
        description: 'Array of options to render as radio buttons',
      },
      value: {
        type: 'text',
        default: '',
        description: 'Currently selected value',
      },
      onChange: {
        type: 'custom',
        typeDefinition: '(value: string) => void',
        required: true,
        default: () => { },
        description: 'Callback when selection changes',
      },
      orientation: {
        type: 'select',
        options: ['vertical', 'horizontal'] as const,
        default: 'vertical',
        description: 'Layout orientation of radio buttons',
      },
    },
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
          onChange: () => { },
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
          onChange: () => { },
          orientation: 'horizontal',
        },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Subscription Plan Selector',
        code: `import { RadioGroup } from '@ecosystem/design-system';

const [plan, setPlan] = useState('pro');

<RadioGroup
  name="subscription"
  value={plan}
  onChange={setPlan}
  options={[
    { value: 'free', label: 'Free - $0/month' },
    { value: 'pro', label: 'Pro - $15/month' },
    { value: 'enterprise', label: 'Enterprise - Custom pricing' },
  ]}
/>`,
        description: 'Vertical radio group for plan selection',
      },
      {
        title: 'Horizontal Size Selector',
        code: `<RadioGroup
  name="size"
  value={selectedSize}
  onChange={setSelectedSize}
  orientation="horizontal"
  options={[
    { value: 'sm', label: 'S' },
    { value: 'md', label: 'M' },
    { value: 'lg', label: 'L' },
    { value: 'xl', label: 'XL' },
  ]}
/>`,
        description: 'Horizontal layout for size selection',
      },
      {
        title: 'With Disabled Option',
        code: `<RadioGroup
  name="delivery"
  value={delivery}
  onChange={setDelivery}
  options={[
    { value: 'standard', label: 'Standard (3-5 days)' },
    { value: 'express', label: 'Express (1-2 days)' },
    { value: 'overnight', label: 'Overnight', disabled: true },
  ]}
/>`,
        description: 'Radio group with disabled option',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/molecules/Form/RadioGroup.tsx',
  },

  CheckboxGroup: {
    component: CheckboxGroup,
    description: 'A group of checkboxes for selecting multiple options.',
    props: {
      name: {
        type: 'text',
        required: true,
        default: '',
        description: 'Name attribute for all checkbox inputs in the group',
      },
      options: {
        type: 'array',
        typeDefinition: 'Array<{ value: string; label: string; disabled?: boolean }>',
        required: true,
        default: [],
        description: 'Array of options to render as checkboxes',
      },
      value: {
        type: 'array',
        typeDefinition: 'string[]',
        default: [],
        description: 'Array of currently selected values',
      },
      onChange: {
        type: 'custom',
        typeDefinition: '(values: string[]) => void',
        required: true,
        default: () => { },
        description: 'Callback when selection changes',
      },
      orientation: {
        type: 'select',
        options: ['vertical', 'horizontal'] as const,
        default: 'vertical',
        description: 'Layout orientation of checkboxes',
      },
    },
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
          onChange: () => { },
        },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Feature Selection',
        code: `import { CheckboxGroup } from '@ecosystem/design-system';

const [features, setFeatures] = useState(['analytics', 'api']);

<CheckboxGroup
  name="features"
  value={features}
  onChange={setFeatures}
  options={[
    { value: 'analytics', label: 'Analytics Dashboard' },
    { value: 'notifications', label: 'Email Notifications' },
    { value: 'api', label: 'API Access' },
    { value: 'export', label: 'Data Export' },
  ]}
/>`,
        description: 'Multiple feature selection with checkboxes',
      },
      {
        title: 'Interests Selection',
        code: `const [interests, setInterests] = useState([]);

<div className="space-y-2">
  <label className="font-medium">Select your interests:</label>
  <CheckboxGroup
    name="interests"
    value={interests}
    onChange={setInterests}
    options={[
      { value: 'tech', label: 'Technology' },
      { value: 'design', label: 'Design' },
      { value: 'business', label: 'Business' },
      { value: 'science', label: 'Science' },
    ]}
  />
  <p className="text-sm text-muted">
    {interests.length} interests selected
  </p>
</div>`,
        description: 'Checkbox group with selection count',
      },
      {
        title: 'Permissions Manager',
        code: `<CheckboxGroup
  name="permissions"
  value={userPermissions}
  onChange={setUserPermissions}
  options={[
    { value: 'read', label: 'Read Access' },
    { value: 'write', label: 'Write Access' },
    { value: 'delete', label: 'Delete Access' },
    { value: 'admin', label: 'Admin Rights', disabled: !isOwner },
  ]}
/>`,
        description: 'Permission checkboxes with conditional disabling',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/molecules/Form/CheckboxGroup.tsx',
  },
};
