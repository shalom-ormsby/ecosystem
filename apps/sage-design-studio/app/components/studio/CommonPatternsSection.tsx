'use client';

import { Card } from '@sds/ui';
import { Code, CollapsibleCodeBlock, Breadcrumbs, type BreadcrumbItem } from '@ecosystem/design-system';
import { CheckCircle, XCircle } from 'lucide-react';

interface CommonPatternsSectionProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function CommonPatternsSection({ breadcrumbs }: CommonPatternsSectionProps) {
  return (
    <div className="space-y-12 w-full min-w-0">
      {/* Title */}
      <div className="border-b border-[var(--color-border)] pb-6">
        <h1 className="text-4xl font-bold mb-2 text-[var(--color-text-primary)]">
          Common Patterns
        </h1>

        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Code examples library for typical tasks
        </p>

        {/* Breadcrumbs - positioned after title and description */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mt-6">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* Displaying Code Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Displaying Code Examples
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">
            Quick Decision Guide
          </h3>
          <div className="mb-6 p-4 bg-[var(--color-surface)] rounded-md border border-[var(--color-border)] font-mono text-sm">
            <div className="text-[var(--color-text-primary)]">
              Need to show code?<br />
              ├─ Inline snippet? → <Code>&lt;Code&gt;</Code><br />
              └─ Multi-line block?<br />
              &nbsp;&nbsp;&nbsp;├─ No syntax colors needed? → <Code>&lt;Code inline=&#123;false&#125;&gt;</Code><br />
              &nbsp;&nbsp;&nbsp;└─ With syntax highlighting? → <Code>&lt;CollapsibleCodeBlock&gt;</Code> ✨
            </div>
          </div>

          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)] mt-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />
            Correct - Multi-Color Syntax Highlighting
          </h3>
          <CollapsibleCodeBlock
            id="pattern-code-correct"
            code={`import { CollapsibleCodeBlock } from '@ecosystem/design-system';

// [Recommended]: Automatic syntax highlighting
<CollapsibleCodeBlock
  id="unique-id"
  code={\`const greeting = "Hello World";
console.log(greeting);\`}
  defaultCollapsed={false}
  showCopy={true}
/>`}
            defaultCollapsed={false}
            showCopy={true}
          />

          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)] mt-6 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            Avoid - Single Color, No Highlighting
          </h3>
          <CollapsibleCodeBlock
            id="pattern-code-wrong"
            code={`import { Code } from '@ecosystem/design-system';

// [Avoid]: Single-color text, no syntax highlighting
<Code inline={false}>{\`const greeting = "Hello World";
console.log(greeting);\`}</Code>`}
            defaultCollapsed={false}
            showCopy={true}
          />

          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)] mt-6">
            When to Use Each
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
              <div className="flex items-start gap-2">
                <Code>&lt;Code&gt;</Code>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  - Inline code snippets like <Code>useState</Code> or single-line commands like <Code>pnpm install</Code>
                </span>
              </div>
            </div>
            <div className="p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
              <div className="flex items-start gap-2">
                <Code>&lt;Code inline=&#123;false&#125;&gt;</Code>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  - Plain text blocks where syntax highlighting isn't needed (configs, plain text output)
                </span>
              </div>
            </div>
            <div className="p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
              <div className="flex items-start gap-2">
                <Code>&lt;CollapsibleCodeBlock&gt;</Code>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  - Multi-line code examples that benefit from syntax highlighting, copy button, and collapsible UI
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[var(--color-primary)] bg-opacity-10 rounded-md border border-[var(--color-primary)]">
            <p className="text-sm text-[var(--color-text-primary)]">
              <strong>Pro tip:</strong> <Code>CollapsibleCodeBlock</Code> automatically tokenizes string code for syntax highlighting.
              Just pass your code as a string - no manual tokenization needed! Each block needs a unique <Code>id</Code> prop.
            </p>
          </div>
        </Card>
      </section>

      {/* Using Design Tokens */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Using Design Tokens
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">
            Accessing design tokens via CSS variables
          </h3>
          <CollapsibleCodeBlock id="pattern-1" code={`export function MyComponent() {
  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <h1 className="text-[var(--font-size-heading-1)]">
        Hello World
      </h1>
      <p className="text-[var(--color-text-secondary)]">
        This component uses design tokens for theming
      </p>
    </div>
  );
}`} defaultCollapsed={false} showCopy={true} />
          <div className="mt-4 p-4 bg-[var(--color-surface)] rounded-md border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-primary)]">
              <strong>Pro tip:</strong> Always use CSS variables (var(--token-name)) instead of hardcoded values.
              This ensures your component automatically adapts to theme changes.
            </p>
          </div>
        </Card>
      </section>

      {/* Creating Theme-Aware Components */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Creating Theme-Aware Components
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">
            Components that adapt to the current theme
          </h3>
          <CollapsibleCodeBlock id="pattern-2" code={`import { useTheme } from '@ecosystem/design-system';

export function ThemedCard() {
  const { theme } = useTheme();

  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <p className="text-[var(--color-text-primary)]">
        Current theme: {theme}
      </p>
    </div>
  );
}`} defaultCollapsed={false} showCopy={true} />
        </Card>
      </section>

      {/* Adding Motion with Preference Detection */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Adding Motion with Preference Detection
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">
            Using useMotionPreference hook with Framer Motion
          </h3>
          <CollapsibleCodeBlock id="pattern-3" code={`import { motion } from 'framer-motion';
import { useMotionPreference } from '@ecosystem/design-system';

export function AnimatedCard() {
  const shouldReduceMotion = useMotionPreference();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: 'easeOut',
      }}
      className="p-6 bg-[var(--color-surface)] rounded-lg"
    >
      <p>This card respects motion preferences</p>
    </motion.div>
  );
}`} defaultCollapsed={false} showCopy={true} />
          <div className="mt-4 p-4 bg-[var(--color-surface)] rounded-md border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-primary)]">
              <strong>Accessibility first:</strong> When <Code syntax="plain">shouldReduceMotion</Code> is true,
              set duration to 0 and disable position/scale animations. This respects user preferences and system settings.
            </p>
          </div>
        </Card>
      </section>

      {/* Responsive Design Pattern */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Responsive Design Pattern
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">
            Mobile-first responsive component
          </h3>
          <CollapsibleCodeBlock id="pattern-4" code={`export function ResponsiveGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4">Item 1</Card>
      <Card className="p-4">Item 2</Card>
      <Card className="p-4">Item 3</Card>
    </div>
  );
}`} defaultCollapsed={false} showCopy={true} />
          <div className="mt-4 space-y-2">
            <p className="text-sm text-[var(--color-text-primary)]">
              <strong>Breakpoints:</strong>
            </p>
            <ul className="text-sm text-[var(--color-text-secondary)] space-y-1 ml-4">
              <li>• <Code syntax="plain">sm:</Code> 640px (phones in landscape)</li>
              <li>• <Code syntax="plain">md:</Code> 768px (tablets)</li>
              <li>• <Code syntax="plain">lg:</Code> 1024px (desktops)</li>
              <li>• <Code syntax="plain">xl:</Code> 1280px (large desktops)</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Composing Molecules from Atoms */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Composing Molecules from Atoms
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">
            Building a SearchBar molecule from Input and Button atoms
          </h3>
          <CollapsibleCodeBlock id="pattern-5" code={`import { Input, Button } from '@ecosystem/design-system';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="flex-1"
      />
      <Button type="submit" variant="default">
        Search
      </Button>
    </form>
  );
}`} defaultCollapsed={false} showCopy={true} />
        </Card>
      </section>

      {/* Form Handling Pattern */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Form Handling Pattern
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">
            Using the useForm hook for form validation
          </h3>
          <CollapsibleCodeBlock id="pattern-6" code={`import { useForm, TextField, Button } from '@ecosystem/design-system';

export function LoginForm() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.email) errors.email = 'Email is required';
      if (!values.password) errors.password = 'Password is required';
      return errors;
    },
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Button type="submit" variant="default">
        Log In
      </Button>
    </form>
  );
}`} defaultCollapsed={false} showCopy={true} />
        </Card>
      </section>

      {/* Toast Notifications Pattern */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Toast Notifications Pattern
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">
            Using the useToast hook for notifications
          </h3>
          <CollapsibleCodeBlock id="pattern-7" code={`import { useToast, Button, ToastProvider } from '@ecosystem/design-system';

function MyComponent() {
  const { toast } = useToast();

  const showSuccess = () => {
    toast('Success!', 'success');
  };

  const showError = () => {
    toast('Something went wrong', 'error');
  };

  return (
    <div>
      <Button onClick={showSuccess}>Show Success</Button>
      <Button onClick={showError}>Show Error</Button>
    </div>
  );
}

// Wrap your app with ToastProvider
export function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}`} defaultCollapsed={false} showCopy={true} />
        </Card>
      </section>

      {/* Modal Pattern */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Modal Pattern
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">
            Using the Modal component with state management
          </h3>
          <CollapsibleCodeBlock id="pattern-8" code={`import { useState } from 'react';
import { Modal, Button } from '@ecosystem/design-system';

export function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Confirmed!');
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>
  );
}`} defaultCollapsed={false} showCopy={true} />
        </Card>
      </section>
    </div>
  );
}
