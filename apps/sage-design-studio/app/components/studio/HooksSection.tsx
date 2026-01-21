'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Badge, Code, CollapsibleCodeBlock } from '@sage/ui';
import { TextField, Breadcrumbs, type BreadcrumbItemLegacy } from '@sage/ui';
import { useForm, useTheme, useToast } from '@sage/ui';
// import { useClipboard } from '@sage/hooks'; // Uncomment when package export works perfectly

// Mocking useClipboard for now until the package linking is fully propagated
const useClipboard = () => {
  return {
    copy: (text: string) => {
      navigator.clipboard.writeText(text);
      return true;
    }
  };
};

interface HooksSectionProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItemLegacy[];
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

      setActiveHook(hookName);
    }
  }, [activeItemId]);

  return (
    <div className="space-y-8 w-full min-w-0">
      <div className="mb-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-8">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* Hook Display with spacing for sticky nav */}
      <div className="mt-4">
        {activeHook === 'useForm' && <UseFormSection />}
        {activeHook === 'useTheme' && <UseThemeSection />}
        {activeHook === 'useToast' && <UseToastSection />}
        {activeHook === 'useMotionPreference' && <UseMotionPreferenceSection />}
        {activeHook === 'useClipboard' && <UseClipboardSection />}
      </div>
    </div>
  );
}

// --- SECTIONS ---

function UseClipboardSection() {
  const { copy } = useClipboard();
  const { toast } = useToast();

  const handleCopy = () => {
    copy('Hello from Sage UI!');
    toast('Copied to clipboard!', 'success');
  }

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">useClipboard</h3>
        <Card className="p-6">
          <p className="text-[var(--color-text-primary)] mb-4">
            Copy text to the clipboard with ease. This is the first utility from the new <Code syntax="plain">@sage/hooks</Code> package.
          </p>

          <div className="flex flex-col gap-4">
            <div className="text-sm text-[var(--color-text-secondary)]">
              <strong>Import:</strong>
              <Code syntax="plain" className="mt-2">import {'{ useClipboard }'} from '@sage/hooks';</Code>
            </div>

            <div>
              <h5 className="font-medium text-[var(--color-text-primary)] mb-2">Live Demo</h5>
              <Button onClick={handleCopy}>Copy "Hello from Sage UI!"</Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

function UseFormSection() {
  const form = useForm({
    initialValues: { email: '', name: '' },
    onSubmit: async (values) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(JSON.stringify(values));
    }
  });

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
          useForm
        </h3>
        <Card className="p-6">
          <p className="text-[var(--color-text-primary)] mb-4">
            A lightweight form state management hook with built-in validation, dirty state tracking, and submit handling.
          </p>
        </Card>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Live Demo
        </h4>
        <Card className="p-6">
          <form onSubmit={form.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--color-text-primary)]">Email</label>
              <TextField {...form.getFieldProps('email')} placeholder="you@example.com" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--color-text-primary)]">Name</label>
              <TextField {...form.getFieldProps('name')} placeholder="John Doe" className="w-full" />
            </div>
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={form.isSubmitting}>
                {form.isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <Card className="p-6">
        <CollapsibleCodeBlock
          id="use-form-demo"
          title="useForm Example"
          language="typescript"
          code={`import { useForm } from '@sage/ui';

function LoginForm() {
  const form = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      await login(values);
    }
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input {...form.getFieldProps('email')} />
      <button type="submit">Submit</button>
    </form>
  );
}`}
          defaultCollapsed={false}
          showCopy={true}
        />
      </Card>
    </section>
  );
}

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
                Current Theme: <Badge variant="default" size="sm" className="" dot={false}>{theme}</Badge>
              </p>
              <p className="text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Current Mode: <Badge variant="default" size="sm" className="" dot={false}>{mode}</Badge>
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
          <CollapsibleCodeBlock
            id="hook-4"
            title="useTheme Example"
            language="typescript"
            code={`import { useTheme } from '@sage/ui';
 
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
    </section>
  );
}

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
        </Card>
      </div>

      {/* Code Example */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Code Example
        </h4>
        <Card className="p-6">
          <CollapsibleCodeBlock
            id="hook-6"
            title="Motion Preference Example"
            language="typescript"
            code={`import { useMotionPreference } from '@sage/ui';
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
    </section>
  );
}
