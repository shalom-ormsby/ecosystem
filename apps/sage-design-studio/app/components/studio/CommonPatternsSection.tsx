'use client';

import { Card, Code } from '@ecosystem/design-system';

export function CommonPatternsSection() {
  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="border-b border-[var(--color-border)] pb-6">
        <h1 className="text-4xl font-bold mb-2 text-[var(--color-text-primary)]">
          Common Patterns
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Code examples library for typical tasks
        </p>
      </div>

      {/* Using Design Tokens */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Using Design Tokens
        </h2>
        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">
            Accessing design tokens via CSS variables
          </h3>
          <Code inline={false} syntax="plain">{`export function MyComponent() {
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
}`}</Code>
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
          <Code inline={false} syntax="plain">{`import { useTheme } from '@ecosystem/design-system';

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
}`}</Code>
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
          <Code inline={false} syntax="plain">{`import { motion } from 'framer-motion';
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
}`}</Code>
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
          <Code inline={false} syntax="plain">{`export function ResponsiveGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4">Item 1</Card>
      <Card className="p-4">Item 2</Card>
      <Card className="p-4">Item 3</Card>
    </div>
  );
}`}</Code>
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
          <Code inline={false} syntax="plain">{`import { Input, Button } from '@ecosystem/design-system';

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
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
}`}</Code>
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
          <Code inline={false} syntax="plain">{`import { useForm, TextField, Button } from '@ecosystem/design-system';

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
      <Button type="submit" variant="primary">
        Log In
      </Button>
    </form>
  );
}`}</Code>
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
          <Code inline={false} syntax="plain">{`import { useToast, Button, ToastProvider } from '@ecosystem/design-system';

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
}`}</Code>
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
          <Code inline={false} syntax="plain">{`import { useState } from 'react';
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
            <Button variant="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>
  );
}`}</Code>
        </Card>
      </section>
    </div>
  );
}
