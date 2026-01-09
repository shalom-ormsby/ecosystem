'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@sds/ui';
import { TextField, TertiaryNav, Code, CollapsibleCodeBlock, Breadcrumbs, type BreadcrumbItem } from '@ecosystem/design-system';
import { useForm, useTheme, useToast } from '@ecosystem/design-system';

interface HooksSectionProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItem[];
  onItemChange?: (itemId: string) => void;
}

export function HooksSection({ activeItemId, breadcrumbs, onItemChange }: HooksSectionProps) {
  const [activeHook, setActiveHook] = useState<string>('useForm');

  // Update active hook when activeItemId changes
  useEffect(() => {
    if (activeItemId) {
      // Map kebab-case ids to camelCase names
      // e.g., 'use-form' -> 'useForm', 'use-motion-preference' -> 'useMotionPreference'
      const hookName = activeItemId
        .split('-')
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('');

      if (['useForm', 'useTheme', 'useToast', 'useMotionPreference'].includes(hookName)) {
        setActiveHook(hookName);
      }
    }
  }, [activeItemId]);

  // Handle hook selection and notify parent
  const handleHookChange = (id: string) => {
    setActiveHook(id);
    // Convert camelCase to kebab-case for parent state (e.g., 'useForm' -> 'use-form')
    const kebabCase = id.replace(/([A-Z])/g, '-$1').toLowerCase();
    onItemChange?.(kebabCase);
  };

  const hooks = [
    { id: 'useForm', label: 'useForm' },
    { id: 'useTheme', label: 'useTheme' },
    { id: 'useToast', label: 'useToast' },
    { id: 'useMotionPreference', label: 'useMotionPreference' },
  ];

  return (
    <div className="space-y-8 w-full min-w-0">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Hooks
        </h2>

        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>React Hooks:</strong> Reusable stateful logic for forms, theming, notifications, and animations.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mb-4">
          Import from @ecosystem/design-system or @ecosystem/design-system/hooks
        </p>

        {/* Breadcrumbs - positioned after title and description */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mt-6">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* Sticky Tertiary Navigation for Hook Selector */}
      <div className="sticky top-0 z-10 bg-[var(--color-background)] pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-4">
        <TertiaryNav
          items={hooks}
          activeId={activeHook}
          onItemChange={handleHookChange}
        />
      </div>

      {/* Hook Display with spacing for sticky nav */}
      <div className="mt-4">
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
                        <Code syntax="plain">initialValues: T</Code>
                        <p className="text-[var(--color-text-secondary)] mt-1">Initial form values (required)</p>
                      </div>
                      <div className="border-l-2 border-[var(--color-border)] pl-3">
                        <Code syntax="plain">validations?: Partial&lt;Record&lt;keyof T, FieldValidation&gt;&gt;</Code>
                        <p className="text-[var(--color-text-secondary)] mt-1">Validation rules for each field</p>
                      </div>
                      <div className="border-l-2 border-[var(--color-border)] pl-3">
                        <Code syntax="plain">onSubmit?: (values: T) =&gt; void | Promise&lt;void&gt;</Code>
                        <p className="text-[var(--color-text-secondary)] mt-1">Callback fired when form is submitted and valid</p>
                      </div>
                      <div className="border-l-2 border-[var(--color-border)] pl-3">
                        <Code syntax="plain">validateOn?: 'onChange' | 'onBlur' | 'onSubmit'</Code>
                        <p className="text-[var(--color-text-secondary)] mt-1">When to validate fields (default: 'onBlur')</p>
                      </div>
                    </div>
                  </div>

                  {/* Return Value */}
                  <div>
                    <h5 className="font-medium text-[var(--color-text-primary)] mb-3">Return Value</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <Code syntax="plain">values</Code>
                        <span className="text-[var(--color-text-secondary)]">Current form values</span>
                      </div>
                      <div className="flex gap-2">
                        <Code syntax="plain">errors</Code>
                        <span className="text-[var(--color-text-secondary)]">Current form errors</span>
                      </div>
                      <div className="flex gap-2">
                        <Code syntax="plain">isSubmitting</Code>
                        <span className="text-[var(--color-text-secondary)]">Whether form is submitting</span>
                      </div>
                      <div className="flex gap-2">
                        <Code syntax="plain">isDirty</Code>
                        <span className="text-[var(--color-text-secondary)]">Whether form has been modified</span>
                      </div>
                      <div className="flex gap-2">
                        <Code syntax="plain">handleSubmit()</Code>
                        <span className="text-[var(--color-text-secondary)]">Form submit handler</span>
                      </div>
                      <div className="flex gap-2">
                        <Code syntax="plain">getFieldProps(name)</Code>
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
                    Import from <Code syntax="plain">@ecosystem/design-system/utils</Code>
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <Code syntax="plain">patterns.email</Code>
                      <Badge variant="default" size="sm">Regex</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <Code syntax="plain">patterns.url</Code>
                      <Badge variant="default" size="sm">Regex</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <Code syntax="plain">patterns.phone</Code>
                      <Badge variant="default" size="sm">Regex</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <Code syntax="plain">patterns.number</Code>
                      <Badge variant="default" size="sm">Regex</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <Code syntax="plain">patterns.alphanumeric</Code>
                      <Badge variant="default" size="sm">Regex</Badge>
                    </div>
                  </div>
                </Card>

                {/* Validation Rules */}
                <Card className="p-6">
                  <h5 className="font-medium text-[var(--color-text-primary)] mb-3">Validation Rules</h5>
                  <div className="space-y-3 text-sm">
                    <div>
                      <Code syntax="plain">required</Code>
                      <p className="text-[var(--color-text-secondary)] mt-1">Field must have a value</p>
                    </div>
                    <div>
                      <Code syntax="plain">minLength / maxLength</Code>
                      <p className="text-[var(--color-text-secondary)] mt-1">String length constraints</p>
                    </div>
                    <div>
                      <Code syntax="plain">pattern</Code>
                      <p className="text-[var(--color-text-secondary)] mt-1">Regex validation</p>
                    </div>
                    <div>
                      <Code syntax="plain">custom</Code>
                      <p className="text-[var(--color-text-secondary)] mt-1">Custom validation function</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Standalone Validation Functions */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                Standalone Validation Functions
              </h4>
              <div className="space-y-4">
                <Card className="p-6">
                  <h5 className="font-medium text-[var(--color-text-primary)] mb-3">validateField()</h5>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    Validate a single field value against a set of validation rules. Returns an error message string or null if valid.
                  </p>
                  <CollapsibleCodeBlock id="hook-1" code={`import { validateField, patterns } from '@ecosystem/design-system/utils';

const emailError = validateField('invalid-email', {
  required: true,
  pattern: {
    value: patterns.email,
    message: 'Invalid email format'
  }
});
// Returns: 'Invalid email format'

const passwordError = validateField('abc', {
  required: true,
  minLength: { value: 8, message: 'Min 8 characters' }
});
// Returns: 'Min 8 characters'`} defaultCollapsed={false} showCopy={true} />
                </Card>

                <Card className="p-6">
                  <h5 className="font-medium text-[var(--color-text-primary)] mb-3">validateForm()</h5>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    Validate an entire form object against validation rules. Returns an object with field names as keys and error messages as values.
                  </p>
                  <CollapsibleCodeBlock id="hook-2" code={`import { validateForm, patterns } from '@ecosystem/design-system/utils';

const values = {
  email: 'invalid-email',
  password: 'abc',
  age: '25'
};

const validations = {
  email: {
    required: true,
    pattern: patterns.email
  },
  password: {
    required: true,
    minLength: { value: 8, message: 'Min 8 characters' }
  },
  age: {
    pattern: patterns.number
  }
};

const errors = validateForm(values, validations);
// Returns: {
//   email: 'Invalid email format',
//   password: 'Min 8 characters'
// }`} defaultCollapsed={false} showCopy={true} />
                </Card>
              </div>
            </div>

            {/* Code Example */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                Code Example
              </h4>
              <Card className="p-6">
                <CollapsibleCodeBlock id="hook-3" code={`import { useForm, patterns } from '@ecosystem/design-system';

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
}`} defaultCollapsed={false} showCopy={true} />
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
                <li><Code syntax="plain">theme</Code> - Current theme ('studio' | 'sage' | 'volt')</li>
                <li><Code syntax="plain">mode</Code> - Current mode ('light' | 'dark')</li>
                <li><Code syntax="plain">setTheme(theme)</Code> - Change the theme</li>
                <li><Code syntax="plain">setMode(mode)</Code> - Change the mode</li>
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
                Current Theme: <Badge variant="default" size="sm">{theme}</Badge>
              </p>
              <p className="text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Current Mode: <Badge variant="default" size="sm">{mode}</Badge>
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
        <Card className="p-6">
          <CollapsibleCodeBlock id="hook-4" code={`import { useTheme } from '@ecosystem/design-system';

function ThemeControls() {
  const { theme, mode, setTheme, setMode } = useTheme();

  return (
    <div>
      <p>Current: {theme} ({mode})</p>
      <button onClick={() => setTheme('sage')}>Sage Theme</button>
      <button onClick={() => setMode('dark')}>Dark Mode</button>
    </div>
  );
}`} defaultCollapsed={false} showCopy={true} />
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
                <li><Code syntax="plain">toast(message, type, duration)</Code> - Show a toast notification</li>
                <li><Code syntax="plain">removeToast(id)</Code> - Remove a specific toast</li>
                <li><Code syntax="plain">toasts</Code> - Array of active toasts</li>
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
            <Button variant="default" size="sm" onClick={() => toast('Success!', 'success')}>
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
        <Card className="p-6">
          <CollapsibleCodeBlock id="hook-5" code={`import { useToast } from '@ecosystem/design-system';

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
}`} defaultCollapsed={false} showCopy={true} />
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
                <li><Code syntax="plain">shouldAnimate</Code> - Boolean indicating if animations should play</li>
                <li><Code syntax="plain">prefersReducedMotion</Code> - Boolean from user's system preference</li>
                <li><Code syntax="plain">scale</Code> - Animation scale factor (0-10, where 10 is normal speed)</li>
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
        <Card className="p-6">
          <CollapsibleCodeBlock id="hook-6" code={`import { useMotionPreference } from '@ecosystem/design-system';
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
}`} defaultCollapsed={false} showCopy={true} />
        </Card>
      </div>

      {/* Usage with Animation Presets */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Usage with Animation Presets
        </h4>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Combine with animation utilities from <Code syntax="plain">@ecosystem/design-system/utils</Code> for motion-aware animations:
          </p>
          <CollapsibleCodeBlock id="hook-7" code={`import { useMotionPreference } from '@ecosystem/design-system';
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
}`} defaultCollapsed={false} showCopy={true} />
        </Card>
      </div>
    </section>
  );
}
