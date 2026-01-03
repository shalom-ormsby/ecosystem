import { Button, Card, Code, Link, Badge, Avatar, Spinner, ProgressBar } from '@ecosystem/design-system';

export interface PropConfig {
  type: 'select' | 'boolean' | 'text' | 'array' | 'object' | 'interface' | 'custom';
  options?: readonly string[];
  default: any;
  description?: string;
  // For displaying complex TypeScript types
  typeDefinition?: string; // e.g., "BreadcrumbItem[]", "{ id: string; label: string }[]"
  required?: boolean; // Mark required props with visual indicator
}

export interface ComponentConfig {
  component: React.ComponentType<any>;
  description: string;
  props: Record<string, PropConfig>;
  examples: Array<{
    label: string;
    props: Record<string, any>;
    children?: React.ReactNode;
  }>;
  // Code examples with CollapsibleCodeBlock
  codeExamples?: Array<{
    title: string;
    code: string;
    description?: string;
  }>;
  // GitHub source link for LLM navigation
  sourceUrl?: string;
  // Accessibility notes for documenting a11y features
  accessibilityNotes?: string[];
}

export const componentRegistry: Record<string, ComponentConfig> = {
  Button: {
    component: Button,
    description: 'Interactive button component with multiple variants, sizes, and states. Supports icons, loading states, keyboard navigation, and respects motion preferences.',
    props: {
      variant: {
        type: 'select',
        options: ['primary', 'secondary', 'ghost'] as const,
        default: 'primary',
        description: 'Visual style variant - primary for main actions, secondary for alternative actions, ghost for subtle actions',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size variant - sm for compact spaces, md for standard use, lg for prominent actions',
      },
      loading: {
        type: 'boolean',
        default: false,
        description: 'Show loading spinner and disable button interaction',
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disable button interaction and show disabled state',
      },
    },
    examples: [
      { label: 'Primary', props: { variant: 'primary', size: 'md' }, children: 'Primary Action' },
      { label: 'Secondary', props: { variant: 'secondary', size: 'md' }, children: 'Secondary Action' },
      { label: 'Ghost', props: { variant: 'ghost', size: 'md' }, children: 'Ghost Action' },
      { label: 'Small', props: { variant: 'primary', size: 'sm' }, children: 'Small' },
      { label: 'Large', props: { variant: 'primary', size: 'lg' }, children: 'Large Action' },
      { label: 'Loading', props: { variant: 'primary', size: 'md', loading: true }, children: 'Loading...' },
      { label: 'Disabled', props: { variant: 'primary', size: 'md', disabled: true }, children: 'Disabled' },
      {
        label: 'With Icon', props: { variant: 'primary', size: 'md' }, children: (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z" />
              <path d="M11.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
            </svg>
            With Icon
          </>
        )
      },
      {
        label: 'Icon Right', props: { variant: 'secondary', size: 'md' }, children: (
          <>
            Icon Right
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
          </>
        )
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Button } from '@ecosystem/design-system';

<Button variant="primary" onClick={() => console.log('Clicked!')}>
  Click Me
</Button>`,
        description: 'Simple button with click handler',
      },
      {
        title: 'All Variants',
        code: `<div className="flex gap-3">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
</div>`,
        description: 'Showcase of all three visual variants',
      },
      {
        title: 'With Icons',
        code: `import { Button } from '@ecosystem/design-system';
import { CheckIcon, ArrowRightIcon } from 'your-icon-library';

{/* Icon on the left */}
<Button variant="primary">
  <CheckIcon />
  Save Changes
</Button>

{/* Icon on the right */}
<Button variant="secondary">
  Continue
  <ArrowRightIcon />
</Button>

{/* Icon only */}
<Button variant="ghost" aria-label="Settings">
  <SettingsIcon />
</Button>`,
        description: 'Buttons with icons in different positions',
      },
      {
        title: 'Loading State',
        code: `const [isLoading, setIsLoading] = useState(false);

<Button
  variant="primary"
  loading={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await saveData();
    setIsLoading(false);
  }}
>
  {isLoading ? 'Saving...' : 'Save'}
</Button>`,
        description: 'Button with loading spinner during async operations',
      },
      {
        title: 'Sizes',
        code: `<div className="flex items-center gap-3">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`,
        description: 'All available button sizes',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Button/Button.tsx',
    accessibilityNotes: [
      'Uses semantic <button> element for proper keyboard and screen reader support',
      'focus-visible outline ensures visible focus ring only for keyboard navigation',
      'Loading spinner has aria-hidden="true" to prevent screen reader announcement',
      'disabled state properly conveyed to assistive technologies',
      'Extends native HTMLButtonElement, inheriting all standard ARIA attributes',
      'Supports focus management with React.forwardRef',
    ],
  },

  Card: {
    component: Card,
    description: 'Container component with glass-morphism styling and optional hover effects. Uses theme-aware borders and shadows. Perfect for grouping related content.',
    props: {
      hoverEffect: {
        type: 'boolean',
        default: true,
        description: 'Enable hover lift and shadow effect for interactive cards',
      },
    },
    examples: [
      {
        label: 'With Hover',
        props: { hoverEffect: true },
        children: 'Hover over me to see the lift effect',
      },
      {
        label: 'Without Hover',
        props: { hoverEffect: false },
        children: 'Static card without hover effects',
      },
      {
        label: 'With Content',
        props: { hoverEffect: true },
        children: (
          <div>
            <h3 style={{ marginBottom: '8px', fontWeight: '600' }}>Card Title</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Card description with multiple lines of text content.</p>
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Card } from '@ecosystem/design-system';

<Card>
  <p>Your content goes here</p>
</Card>`,
        description: 'Simple card container with default hover effects',
      },
      {
        title: 'Content Card',
        code: `<Card className="p-6">
  <h3 className="text-lg font-semibold mb-2">Feature Title</h3>
  <p className="text-[var(--color-text-secondary)]">
    Description of your feature or content that explains what this card represents.
  </p>
</Card>`,
        description: 'Card with structured content and custom padding',
      },
      {
        title: 'Interactive Card Grid',
        code: `<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {features.map((feature) => (
    <Card
      key={feature.id}
      hoverEffect={true}
      className="p-6 cursor-pointer"
      onClick={() => handleFeatureClick(feature.id)}
    >
      <h3 className="font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm text-[var(--color-text-secondary)]">
        {feature.description}
      </p>
    </Card>
  ))}
</div>`,
        description: 'Grid of interactive cards with click handlers',
      },
      {
        title: 'Static Information Card',
        code: `<Card hoverEffect={false} className="p-6 bg-[var(--color-surface)]">
  <div className="flex items-start gap-4">
    <InfoIcon className="text-[var(--color-primary)]" />
    <div>
      <h4 className="font-medium mb-1">Important Notice</h4>
      <p className="text-sm text-[var(--color-text-secondary)]">
        This is a static card for displaying information without interaction.
      </p>
    </div>
  </div>
</Card>`,
        description: 'Static card without hover effects for non-interactive content',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Card/Card.tsx',
  },

  Code: {
    component: Code,
    description: 'A semantic code wrapper with enhanced visual styling and automatic syntax highlighting. Features distinct treatments for inline (pale amber background) vs block code (cool gray background with copy-on-hover). Accessible contrast ratios (WCAG AA 4.5:1).',
    props: {
      syntax: {
        type: 'select',
        options: ['plain', 'comment', 'keyword', 'function', 'string', 'number', 'boolean', 'operator', 'property', 'className', 'tag', 'attribute', 'variable', 'punctuation'] as const,
        default: 'plain',
        description: 'Syntax highlighting type for the code',
      },
      inline: {
        type: 'boolean',
        default: true,
        description: 'Render as inline code (true) or block code (false)',
      },
      showCopy: {
        type: 'boolean',
        default: true,
        description: 'Show copy button for block code (appears on hover)',
      },
    },
    examples: [
      { label: 'Plain Text', props: { syntax: 'plain', inline: true }, children: 'example' },
      { label: 'Keyword', props: { syntax: 'keyword', inline: true }, children: 'const' },
      { label: 'Function', props: { syntax: 'function', inline: true }, children: 'useState()' },
      { label: 'String', props: { syntax: 'string', inline: true }, children: '"Hello World"' },
      { label: 'Number', props: { syntax: 'number', inline: true }, children: '42' },
      { label: 'Boolean', props: { syntax: 'boolean', inline: true }, children: 'true' },
      { label: 'Property', props: { syntax: 'property', inline: true }, children: 'backgroundColor' },
      { label: 'Class Name', props: { syntax: 'className', inline: true }, children: 'MyComponent' },
      { label: 'Comment', props: { syntax: 'comment', inline: true }, children: '// This is a comment' },
      { label: 'Block Code', props: { syntax: 'plain', inline: false }, children: 'const greeting = "Hello World";\nconsole.log(greeting);' },
      { label: 'Block with Copy', props: { syntax: 'keyword', inline: false, showCopy: true }, children: 'import { useState } from "react";' },
      { label: 'Block No Copy', props: { syntax: 'string', inline: false, showCopy: false }, children: '"No copy button on this block"' },
    ],
    codeExamples: [
      {
        title: 'Inline Code',
        code: `import { Code } from '@ecosystem/design-system';

<p>
  Use the <Code syntax="keyword">useState</Code> hook to manage component state.
</p>`,
        description: 'Inline code for variables, functions, or keywords within text',
      },
      {
        title: 'Syntax Highlighting',
        code: `<p>
  The <Code syntax="function">map()</Code> method creates a new array with results
  of calling <Code syntax="keyword">function</Code> for every element.
</p>`,
        description: 'Different syntax highlighting for different code types',
      },
      {
        title: 'Block Code',
        code: `<Code inline={false} showCopy={true}>
  {(\`const greeting = "Hello World";
console.log(greeting);\`)}
</Code>`,
        description: 'Block code with copy button for multi-line snippets',
      },
      {
        title: 'Code in Documentation',
        code: `<div className="space-y-2">
  <p>Import the component:</p>
  <Code inline={false} syntax="keyword">
    import {{ Button }} from '@ecosystem/design-system';
  </Code>

  <p>Then use it with <Code syntax="property">variant</Code> prop.</p>
</div>`,
        description: 'Combining inline and block code in documentation',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Code/Code.tsx',
  },

  Link: {
    component: Link,
    description: 'Theme-aware link component with multiple style variants. Supports standalone and inline text link styles with accessible focus states.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'inline'] as const,
        default: 'default',
        description: 'Visual style variant: default for standalone links with background hover, inline for underlined text links',
      },
      hoverEffect: {
        type: 'boolean',
        default: true,
        description: 'Enable hover effect (only applies to default variant)',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default', href: '#' },
        children: 'Default Link',
      },
      {
        label: 'Default No Hover',
        props: { variant: 'default', hoverEffect: false, href: '#' },
        children: 'No Hover Effect',
      },
      {
        label: 'Inline',
        props: { variant: 'inline', href: '#' },
        children: 'Inline Link',
      },
      {
        label: 'Inline in Text',
        props: { variant: 'inline', href: '#' },
        children: (
          <span className="text-[var(--color-text-secondary)]">
            This is some text with an <Link variant="inline" href="#">inline link</Link> embedded in it.
          </span>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Link } from '@ecosystem/design-system';

<Link href="/about">Learn More</Link>`,
        description: 'Simple link with default styling',
      },
      {
        title: 'Inline Text Links',
        code: `<p className="text-[var(--color-text-secondary)]">
  Check out our{' '}
  <Link variant="inline" href="/docs">
    documentation
  </Link>{' '}
  to learn more about the features.
</p>`,
        description: 'Links embedded within text paragraphs',
      },
      {
        title: 'External Links',
        code: `<Link
  href="https://github.com/your-repo"
  target="_blank"
  rel="noopener noreferrer"
>
  View on GitHub
</Link>`,
        description: 'Opening links in a new tab with security attributes',
      },
      {
        title: 'Navigation Menu',
        code: `<nav className="flex gap-4">
  {['Home', 'About', 'Services', 'Contact'].map((item) => (
    <Link
      key={item}
      href={\`/\${item.toLowerCase()}\`}
      variant="default"
    >
      {item}
    </Link>
  ))}
</nav>`,
        description: 'Using links in navigation menus',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Link/Link.tsx',
  },

  Badge: {
    component: Badge,
    description: 'A small label for displaying status, counts, or categorization with semantic color variants.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'primary', 'success', 'warning', 'error', 'info'] as const,
        default: 'default',
        description: 'Visual variant of the badge',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size of the badge',
      },
      dot: {
        type: 'boolean',
        default: false,
        description: 'Show animated dot indicator',
      },
    },
    examples: [
      { label: 'Default', props: { variant: 'default', size: 'md' }, children: 'Default' },
      { label: 'Primary', props: { variant: 'primary', size: 'md' }, children: 'Primary' },
      { label: 'Success', props: { variant: 'success', size: 'md' }, children: 'Active' },
      { label: 'Warning', props: { variant: 'warning', size: 'md' }, children: 'Pending' },
      { label: 'Error', props: { variant: 'error', size: 'md' }, children: 'Failed' },
      { label: 'With Dot', props: { variant: 'success', size: 'md', dot: true }, children: 'Live' },
      { label: 'Small Count', props: { variant: 'primary', size: 'sm' }, children: '99+' },
    ],
    codeExamples: [
      {
        title: 'Status Badges',
        code: `import { Badge } from '@ecosystem/design-system';

<div className="flex gap-2">
  <Badge variant="success">Active</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="error">Failed</Badge>
  <Badge variant="info">Info</Badge>
</div>`,
        description: 'Different status indicators using semantic color variants',
      },
      {
        title: 'Notification Counts',
        code: `<div className="flex items-center gap-2">
  <span>Inbox</span>
  <Badge variant="primary" size="sm">99+</Badge>
</div>

<div className="flex items-center gap-2">
  <span>Notifications</span>
  <Badge variant="error" size="sm">3</Badge>
</div>`,
        description: 'Badge for displaying notification or message counts',
      },
      {
        title: 'Live Indicator',
        code: `<Badge variant="success" dot={true}>
  Live Stream
</Badge>`,
        description: 'Animated dot indicator for live or active states',
      },
      {
        title: 'Category Tags',
        code: `<div className="flex flex-wrap gap-2">
  {['React', 'TypeScript', 'TailwindCSS'].map((tag) => (
    <Badge key={tag} variant="default">
      {tag}
    </Badge>
  ))}
</div>`,
        description: 'Using badges as category or technology tags',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Badge/Badge.tsx',
  },

  Avatar: {
    component: Avatar,
    description: 'A visual representation of a user or entity with image support, fallback initials, and status indicators.',
    props: {
      size: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
        default: 'md',
        description: 'Size of the avatar',
      },
      shape: {
        type: 'select',
        options: ['circle', 'square'] as const,
        default: 'circle',
        description: 'Shape of the avatar',
      },
      status: {
        type: 'select',
        options: ['online', 'offline', 'away', 'busy'] as const,
        default: 'online',
        description: 'Status indicator (optional)',
      },
    },
    examples: [
      { label: 'With Initials', props: { fallback: 'JD', size: 'md', shape: 'circle' }, children: null },
      { label: 'Online Status', props: { fallback: 'AB', size: 'md', status: 'online' }, children: null },
      { label: 'Busy Status', props: { fallback: 'CD', size: 'md', status: 'busy' }, children: null },
      { label: 'Square Shape', props: { fallback: 'EF', size: 'md', shape: 'square' }, children: null },
      { label: 'Large', props: { fallback: 'GH', size: 'lg', shape: 'circle' }, children: null },
      { label: 'Small', props: { fallback: 'IJ', size: 'sm', shape: 'circle' }, children: null },
    ],
    codeExamples: [
      {
        title: 'With Image',
        code: `import { Avatar } from '@ecosystem/design-system';

<Avatar
  src="/path/to/avatar.jpg"
  alt="John Doe"
  fallback="JD"
/>`,
        description: 'Avatar with image source and fallback initials',
      },
      {
        title: 'Status Indicators',
        code: `<div className="flex gap-4">
  <Avatar fallback="JD" status="online" />
  <Avatar fallback="AB" status="away" />
  <Avatar fallback="CD" status="busy" />
  <Avatar fallback="EF" status="offline" />
</div>`,
        description: 'Avatars with different status indicators for presence',
      },
      {
        title: 'Different Sizes',
        code: `<div className="flex items-center gap-4">
  <Avatar size="xs" fallback="XS" />
  <Avatar size="sm" fallback="SM" />
  <Avatar size="md" fallback="MD" />
  <Avatar size="lg" fallback="LG" />
  <Avatar size="xl" fallback="XL" />
</div>`,
        description: 'Avatar sizes from extra small to extra large',
      },
      {
        title: 'User Profile Header',
        code: `<div className="flex items-center gap-3">
  <Avatar
    size="lg"
    src="/user-avatar.jpg"
    fallback="JD"
    status="online"
  />
  <div>
    <h3 className="font-semibold">John Doe</h3>
    <p className="text-sm text-[var(--color-text-secondary)]">
      Active now
    </p>
  </div>
</div>`,
        description: 'Avatar used in a user profile header with status',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Avatar/Avatar.tsx',
  },

  Spinner: {
    component: Spinner,
    description: 'A loading indicator with smooth animation that respects motion preferences.',
    props: {
      size: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
        default: 'md',
        description: 'Size of the spinner',
      },
      variant: {
        type: 'select',
        options: ['primary', 'secondary', 'inherit'] as const,
        default: 'primary',
        description: 'Color variant',
      },
    },
    examples: [
      { label: 'Default', props: { size: 'md', variant: 'primary' }, children: null },
      { label: 'Secondary', props: { size: 'md', variant: 'secondary' }, children: null },
      { label: 'Small', props: { size: 'sm', variant: 'primary' }, children: null },
      { label: 'Large', props: { size: 'lg', variant: 'primary' }, children: null },
    ],
    codeExamples: [
      {
        title: 'Basic Loading State',
        code: `import { Spinner } from '@ecosystem/design-system';

<div className="flex justify-center p-8">
  <Spinner />
</div>`,
        description: 'Simple centered loading spinner',
      },
      {
        title: 'Inline with Text',
        code: `<button disabled className="flex items-center gap-2">
  <Spinner size="sm" variant="inherit" />
  Loading...
</button>`,
        description: 'Small spinner inline with button text',
      },
      {
        title: 'Different Sizes',
        code: `<div className="flex items-center gap-4">
  <Spinner size="xs" />
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</div>`,
        description: 'Spinner in all available sizes',
      },
      {
        title: 'Loading Overlay',
        code: `<div className="relative min-h-[200px]">
  {isLoading && (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]/80 backdrop-blur-sm">
      <Spinner size="lg" />
    </div>
  )}
  <YourContent />
</div>`,
        description: 'Spinner as loading overlay for content area',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Spinner/Spinner.tsx',
  },

  ProgressBar: {
    component: ProgressBar,
    description: 'A visual indicator of progress or completion with determinate and indeterminate modes.',
    props: {
      variant: {
        type: 'select',
        options: ['primary', 'success', 'warning', 'error', 'info'] as const,
        default: 'primary',
        description: 'Color variant',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size of the progress bar',
      },
      showLabel: {
        type: 'boolean',
        default: false,
        description: 'Show percentage label',
      },
    },
    examples: [
      { label: '25% Progress', props: { value: 25, variant: 'primary', size: 'md' }, children: null },
      { label: '50% with Label', props: { value: 50, variant: 'primary', size: 'md', showLabel: true }, children: null },
      { label: '75% Success', props: { value: 75, variant: 'success', size: 'md' }, children: null },
      { label: '100% Complete', props: { value: 100, variant: 'success', size: 'md', showLabel: true }, children: null },
      { label: 'Warning', props: { value: 40, variant: 'warning', size: 'md' }, children: null },
    ],
    codeExamples: [
      {
        title: 'Upload Progress',
        code: `import { ProgressBar } from '@ecosystem/design-system';

const [uploadProgress, setUploadProgress] = useState(0);

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Uploading file.pdf</span>
    <span>{uploadProgress}%</span>
  </div>
  <ProgressBar value={uploadProgress} variant="primary" showLabel={false} />
</div>`,
        description: 'Progress bar for file upload with custom label',
      },
      {
        title: 'Task Completion',
        code: `<div className="space-y-4">
  <div>
    <p className="text-sm mb-1">Profile Complete</p>
    <ProgressBar value={75} variant="success" showLabel={true} />
  </div>

  <div>
    <p className="text-sm mb-1">Storage Used</p>
    <ProgressBar value={85} variant="warning" showLabel={true} />
  </div>
</div>`,
        description: 'Multiple progress indicators with labels',
      },
      {
        title: 'Status Variants',
        code: `<div className="space-y-3">
  <ProgressBar value={100} variant="success" showLabel />
  <ProgressBar value={75} variant="info" showLabel />
  <ProgressBar value={50} variant="warning" showLabel />
  <ProgressBar value={25} variant="error" showLabel />
</div>`,
        description: 'Progress bars with semantic color variants',
      },
      {
        title: 'Dynamic Progress',
        code: `const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
  }, 500);
  return () => clearInterval(timer);
}, []);

<ProgressBar value={progress} variant="primary" showLabel />`,
        description: 'Animated progress bar that updates over time',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/ProgressBar/ProgressBar.tsx',
  },
};
