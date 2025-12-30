'use client';

import { useState } from 'react';
import { Card, Button, TextField, TertiaryNav, Badge } from '@ecosystem/design-system';
import { useForm, useTheme, useToast } from '@ecosystem/design-system';

export function HooksSection() {
  const [activeHook, setActiveHook] = useState<string>('useForm');

  const hooks = [
    { id: 'useForm', label: 'useForm' },
    { id: 'useTheme', label: 'useTheme' },
    { id: 'useToast', label: 'useToast' },
    { id: 'useMotionPreference', label: 'useMotionPreference' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Hooks
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>React Hooks:</strong> Reusable stateful logic for forms, theming, notifications, and animations.
        </p>
        <p className="text-base text-[var(--color-text-muted)]">
          Import from @ecosystem/design-system or @ecosystem/design-system/hooks
        </p>
      </div>

      {/* Hook Selector */}
      <TertiaryNav
        items={hooks}
        activeId={activeHook}
        onItemChange={setActiveHook}
      />

      {/* useForm Hook */}
      {activeHook === 'useForm' && (
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
              useForm
            </h3>
            <Card className="p-6">
              <p className="text-[var(--color-text-primary)] mb-4">
                A lightweight form state management hook with built-in validation, dirty state tracking, and submit handling.
              </p>
              <div className="space-y-4">
                <div className="text-sm text-[var(--color-text-secondary)]">
                  <strong>Key Features:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Field-level validation with configurable timing (onChange, onBlur, onSubmit)</li>
                    <li>Built-in validation patterns (email, URL, phone, etc.)</li>
                    <li>TypeScript generics for type-safe form values</li>
                    <li>Dirty state tracking</li>
                    <li>Submit loading state</li>
                    <li>Helper function getFieldProps for spreading to inputs</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Live Demo */}
          <UseFormDemo />

          {/* API Documentation */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
              API Reference
            </h4>
            <Card className="p-6">
              <div className="space-y-6">
                {/* Options */}
                <div>
                  <h5 className="font-medium text-[var(--color-text-primary)] mb-3">Options</h5>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-2 border-[var(--color-primary)] pl-3">
                      <code className="text-[var(--color-primary)] font-mono">initialValues: T</code>
                      <p className="text-[var(--color-text-secondary)] mt-1">Initial form values (required)</p>
                    </div>
                    <div className="border-l-2 border-[var(--color-border)] pl-3">
                      <code className="text-[var(--color-text-primary)] font-mono">validations?: Partial&lt;Record&lt;keyof T, FieldValidation&gt;&gt;</code>
                      <p className="text-[var(--color-text-secondary)] mt-1">Validation rules for each field</p>
                    </div>
                    <div className="border-l-2 border-[var(--color-border)] pl-3">
                      <code className="text-[var(--color-text-primary)] font-mono">onSubmit?: (values: T) =&gt; void | Promise&lt;void&gt;</code>
                      <p className="text-[var(--color-text-secondary)] mt-1">Callback fired when form is submitted and valid</p>
                    </div>
                    <div className="border-l-2 border-[var(--color-border)] pl-3">
                      <code className="text-[var(--color-text-primary)] font-mono">validateOn?: 'onChange' | 'onBlur' | 'onSubmit'</code>
                      <p className="text-[var(--color-text-secondary)] mt-1">When to validate fields (default: 'onBlur')</p>
                    </div>
                  </div>
                </div>

                {/* Return Value */}
                <div>
                  <h5 className="font-medium text-[var(--color-text-primary)] mb-3">Return Value</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <code className="text-[var(--color-primary)] font-mono">values</code>
                      <span className="text-[var(--color-text-secondary)]">Current form values</span>
                    </div>
                    <div className="flex gap-2">
                      <code className="text-[var(--color-primary)] font-mono">errors</code>
                      <span className="text-[var(--color-text-secondary)]">Current form errors</span>
                    </div>
                    <div className="flex gap-2">
                      <code className="text-[var(--color-primary)] font-mono">isSubmitting</code>
                      <span className="text-[var(--color-text-secondary)]">Whether form is submitting</span>
                    </div>
                    <div className="flex gap-2">
                      <code className="text-[var(--color-primary)] font-mono">isDirty</code>
                      <span className="text-[var(--color-text-secondary)]">Whether form has been modified</span>
                    </div>
                    <div className="flex gap-2">
                      <code className="text-[var(--color-primary)] font-mono">handleSubmit()</code>
                      <span className="text-[var(--color-text-secondary)]">Form submit handler</span>
                    </div>
                    <div className="flex gap-2">
                      <code className="text-[var(--color-primary)] font-mono">getFieldProps(name)</code>
                      <span className="text-[var(--color-text-secondary)]">Get props for a field</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Validation Utilities */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
              Validation Utilities
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Built-in Patterns */}
              <Card className="p-6">
                <h5 className="font-medium text-[var(--color-text-primary)] mb-3">Built-in Patterns</h5>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  Import from <code className="px-1 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">@ecosystem/design-system/utils</code>
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <code className="text-[var(--color-primary)] font-mono">patterns.email</code>
                    <Badge variant="default" size="sm">Regex</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="text-[var(--color-primary)] font-mono">patterns.url</code>
                    <Badge variant="default" size="sm">Regex</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="text-[var(--color-primary)] font-mono">patterns.phone</code>
                    <Badge variant="default" size="sm">Regex</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="text-[var(--color-primary)] font-mono">patterns.number</code>
                    <Badge variant="default" size="sm">Regex</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="text-[var(--color-primary)] font-mono">patterns.alphanumeric</code>
                    <Badge variant="default" size="sm">Regex</Badge>
                  </div>
                </div>
              </Card>

              {/* Validation Rules */}
              <Card className="p-6">
                <h5 className="font-medium text-[var(--color-text-primary)] mb-3">Validation Rules</h5>
                <div className="space-y-3 text-sm">
                  <div>
                    <code className="text-[var(--color-primary)] font-mono">required</code>
                    <p className="text-[var(--color-text-secondary)] mt-1">Field must have a value</p>
                  </div>
                  <div>
                    <code className="text-[var(--color-primary)] font-mono">minLength / maxLength</code>
                    <p className="text-[var(--color-text-secondary)] mt-1">String length constraints</p>
                  </div>
                  <div>
                    <code className="text-[var(--color-primary)] font-mono">pattern</code>
                    <p className="text-[var(--color-text-secondary)] mt-1">Regex validation</p>
                  </div>
                  <div>
                    <code className="text-[var(--color-primary)] font-mono">custom</code>
                    <p className="text-[var(--color-text-secondary)] mt-1">Custom validation function</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Code Example */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
              Code Example
            </h4>
            <Card className="p-6 bg-[var(--color-surface)]">
              <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
                <code>{`import { useForm, patterns } from '@ecosystem/design-system';

function LoginForm() {
  const form = useForm({
    initialValues: { email: '', password: '' },
    validations: {
      email: {
        required: true,
        pattern: patterns.email
      },
      password: {
        required: true,
        minLength: { value: 8, message: 'Min 8 characters' }
      }
    },
    onSubmit: async (values) => {
      await login(values);
    }
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input {...form.getFieldProps('email')} />
      {form.errors.email && <span>{form.errors.email}</span>}

      <input {...form.getFieldProps('password')} type="password" />
      {form.errors.password && <span>{form.errors.password}</span>}

      <button type="submit" disabled={form.isSubmitting}>
        Submit
      </button>
    </form>
  );
}`}</code>
              </pre>
            </Card>
          </div>
        </section>
      )}

      {/* useTheme Hook */}
      {activeHook === 'useTheme' && (
        <UseThemeSection />
      )}

      {/* useToast Hook */}
      {activeHook === 'useToast' && (
        <UseToastSection />
      )}

      {/* useMotionPreference Hook */}
      {activeHook === 'useMotionPreference' && (
        <UseMotionPreferenceSection />
      )}
    </div>
  );
}

// Live Demo Component
function UseFormDemo() {
  const form = useForm({
    initialValues: { email: '', name: '' },
    validations: {
      email: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address'
        }
      },
      name: {
        required: 'Name is required',
        minLength: { value: 2, message: 'Name must be at least 2 characters' }
      }
    },
    onSubmit: async (values) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Form submitted! Check console for values.');
      console.log('Form values:', values);
    }
  });

  return (
    <div>
      <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
        Live Demo
      </h4>
      <Card className="p-6">
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--color-text-primary)]">
              Email
            </label>
            <TextField
              {...form.getFieldProps('email')}
              placeholder="you@example.com"
              className="w-full"
            />
            {form.errors.email && (
              <p className="text-sm text-[var(--color-error)] mt-1">{form.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--color-text-primary)]">
              Name
            </label>
            <TextField
              {...form.getFieldProps('name')}
              placeholder="John Doe"
              className="w-full"
            />
            {form.errors.name && (
              <p className="text-sm text-[var(--color-error)] mt-1">{form.errors.name}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={form.isSubmitting}>
              {form.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            {form.isDirty && (
              <Badge variant="warning" size="sm">Unsaved changes</Badge>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

// useTheme Section
function UseThemeSection() {
  const { theme, mode, setTheme, setMode } = useTheme();

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
          useTheme
        </h3>
        <Card className="p-6">
          <p className="text-[var(--color-text-primary)] mb-4">
            Access and control the current theme and color mode (light/dark) throughout your application.
          </p>
          <div className="space-y-4">
            <div className="text-sm text-[var(--color-text-secondary)]">
              <strong>Return Value:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code className="text-[var(--color-primary)]">theme</code> - Current theme ('studio' | 'sage' | 'volt')</li>
                <li><code className="text-[var(--color-primary)]">mode</code> - Current mode ('light' | 'dark')</li>
                <li><code className="text-[var(--color-primary)]">setTheme(theme)</code> - Change the theme</li>
                <li><code className="text-[var(--color-primary)]">setMode(mode)</code> - Change the mode</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Demo */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Live Demo
        </h4>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Current Theme: <Badge variant="primary" size="sm">{theme}</Badge>
              </p>
              <p className="text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Current Mode: <Badge variant="primary" size="sm">{mode}</Badge>
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setTheme('studio')}>
                Studio
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setTheme('sage')}>
                Sage
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setTheme('volt')}>
                Volt
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setMode('light')}>
                Light Mode
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setMode('dark')}>
                Dark Mode
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Code Example */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Code Example
        </h4>
        <Card className="p-6 bg-[var(--color-surface)]">
          <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
            <code>{`import { useTheme } from '@ecosystem/design-system';

function ThemeControls() {
  const { theme, mode, setTheme, setMode } = useTheme();

  return (
    <div>
      <p>Current: {theme} ({mode})</p>
      <button onClick={() => setTheme('sage')}>Sage Theme</button>
      <button onClick={() => setMode('dark')}>Dark Mode</button>
    </div>
  );
}`}</code>
          </pre>
        </Card>
      </div>
    </section>
  );
}

// useToast Section
function UseToastSection() {
  const { toast } = useToast();

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
          useToast
        </h3>
        <Card className="p-6">
          <p className="text-[var(--color-text-primary)] mb-4">
            Display temporary notification messages. Must be used within a ToastProvider.
          </p>
          <div className="space-y-4">
            <div className="text-sm text-[var(--color-text-secondary)]">
              <strong>Return Value:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code className="text-[var(--color-primary)]">toast(message, type, duration)</code> - Show a toast notification</li>
                <li><code className="text-[var(--color-primary)]">removeToast(id)</code> - Remove a specific toast</li>
                <li><code className="text-[var(--color-primary)]">toasts</code> - Array of active toasts</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Demo */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Live Demo
        </h4>
        <Card className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="primary" size="sm" onClick={() => toast('Success!', 'success')}>
              Success
            </Button>
            <Button variant="secondary" size="sm" onClick={() => toast('Error occurred', 'error')}>
              Error
            </Button>
            <Button variant="ghost" size="sm" onClick={() => toast('Warning!', 'warning')}>
              Warning
            </Button>
            <Button variant="secondary" size="sm" onClick={() => toast('Info message', 'info')}>
              Info
            </Button>
          </div>
        </Card>
      </div>

      {/* Code Example */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Code Example
        </h4>
        <Card className="p-6 bg-[var(--color-surface)]">
          <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
            <code>{`import { useToast } from '@ecosystem/design-system';

function MyComponent() {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast('Saved successfully!', 'success');
    } catch (error) {
      toast('Failed to save', 'error');
    }
  };

  return <button onClick={handleSave}>Save</button>;
}`}</code>
          </pre>
        </Card>
      </div>
    </section>
  );
}

// useMotionPreference Section
function UseMotionPreferenceSection() {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
          useMotionPreference
        </h3>
        <Card className="p-6">
          <p className="text-[var(--color-text-primary)] mb-4">
            Detect and respect user motion preferences (prefers-reduced-motion) for accessible animations.
          </p>
          <div className="space-y-4">
            <div className="text-sm text-[var(--color-text-secondary)]">
              <strong>Return Value:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code className="text-[var(--color-primary)]">shouldAnimate</code> - Boolean indicating if animations should play</li>
                <li><code className="text-[var(--color-primary)]">prefersReducedMotion</code> - Boolean from user's system preference</li>
                <li><code className="text-[var(--color-primary)]">scale</code> - Animation scale factor (0-10, where 10 is normal speed)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Code Example */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Code Example
        </h4>
        <Card className="p-6 bg-[var(--color-surface)]">
          <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
            <code>{`import { useMotionPreference } from '@ecosystem/design-system';
import { motion } from 'framer-motion';

function AnimatedComponent() {
  const { shouldAnimate, scale } = useMotionPreference();

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 * (scale / 10) }}
    >
      Content
    </motion.div>
  );
}`}</code>
          </pre>
        </Card>
      </div>

      {/* Usage with Animation Presets */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Usage with Animation Presets
        </h4>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Combine with animation utilities from <code className="px-1 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">@ecosystem/design-system/utils</code> for motion-aware animations:
          </p>
          <Card className="p-4 bg-[var(--color-surface)]">
            <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
              <code>{`import { useMotionPreference } from '@ecosystem/design-system';
import { presets, scaleDuration } from '@ecosystem/design-system/utils';
import { motion } from 'framer-motion';

function Card() {
  const { shouldAnimate, scale } = useMotionPreference();
  const duration = scaleDuration(0.3, scale);

  return (
    <motion.div
      {...(shouldAnimate ? presets.fade : {})}
      transition={{ duration }}
    >
      Card content
    </motion.div>
  );
}`}</code>
            </pre>
          </Card>
        </Card>
      </div>
    </section>
  );
}
