'use client';

import { Card, Code, CollapsibleCodeBlock, Breadcrumbs, type BreadcrumbItem } from '@ecosystem/design-system';
import { CheckCircle, XCircle, AlertOctagon, AlertTriangle } from 'lucide-react';

interface AddingComponentsSectionProps {
  breadcrumbs?: BreadcrumbItem[];
  activeItemId?: string;
}

export function AddingComponentsSection({ breadcrumbs, activeItemId }: AddingComponentsSectionProps) {
  // Determine active view based on activeItemId (default to methodology)
  const currentView = (!activeItemId || activeItemId === 'adding-components') ? 'methodology' : activeItemId;

  return (
    <div className="w-full min-w-0">
      {/* Title */}
      <div className="border-b border-[var(--color-border)] pb-6 mb-12">
        <h1 className="text-4xl font-bold mb-2 text-[var(--color-text-primary)]">
          Adding Components
        </h1>

        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Step-by-step workflows for extending the design system
        </p>

      </div>

      {/* Secondary Navigation - Sticky below header */}
      <div className="sticky top-0 z-30 bg-[var(--color-background)]/95 backdrop-blur-sm pt-4 pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 mb-8 border-b border-[var(--color-border)]">
        <div className="flex overflow-x-auto no-scrollbar gap-1 custom-scrollbar">
          {[
            { id: 'methodology', label: 'Methodology' },
            { id: 'atoms', label: 'Adding Atoms' },
            { id: 'molecules', label: 'Adding Molecules' },
            { id: 'modifying', label: 'Modifying' },
            { id: 'tokens', label: 'Adding Tokens' },
            { id: 'troubleshooting', label: 'Troubleshooting' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#adding-components/${item.id}`}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors
                ${currentView === item.id
                  ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                }
              `}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-12">

        {/* Methodology (New Section) */}
        {currentView === 'methodology' && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
              Core Methodology
            </h2>
            <Card className="p-6">
              <div className="mb-6 bg-[var(--color-surface)] p-4 rounded-md border border-[var(--color-border)]">
                <div className="flex items-start gap-3">
                  <AlertOctagon className="w-5 h-5 text-[var(--color-primary)] mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Do Not Skip Steps</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Creating a <Code syntax="plain">.tsx</Code> file is only 20% of the work. A component is not "done" until it is fully documented, exported, and showcased in the Studio. Incomplete components cause build failures and confusion.
                    </p>
                  </div>
                </div>
              </div>

              <ol className="space-y-8">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center font-bold">1</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Create the Component</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                      Build the component in <Code syntax="plain">packages/ui/src/components/</Code>. Ensure it uses <Code syntax="plain">React.forwardRef</Code> and properly types its props.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center font-bold">2</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Export the Component</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                      Add an export statement to <Code syntax="plain">packages/ui/src/index.ts</Code>.
                    </p>
                    <CollapsibleCodeBlock id="meth-2" code="export * from './components/NewComponent';" defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center font-bold">3</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Build the Design System</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                      You MUST rebuild the package for the Studio app to see the new component. The Studio consumes the <i>built</i> version of the library, not the raw source.
                    </p>
                    <CollapsibleCodeBlock id="meth-3" code="pnpm --filter @ecosystem/design-system build" defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center font-bold">4</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Update Navigation & Routing</h3>
                    <div className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                      <p>Ensure the component is accessible via the sidebar and has correct breadcrumbs:</p>
                      <div className="space-y-2">
                        <p><strong className="text-[var(--color-text-primary)]">A. Add to Sidebar:</strong> Update <Code syntax="plain">apps/sage-design-studio/app/lib/navigation-tree.tsx</Code>.</p>
                        <CollapsibleCodeBlock id="meth-4a" code={`{
  id: 'new-component',
  label: 'New Component',
  section: 'atoms', // or 'molecules'
}`} defaultCollapsed={true} showCopy={true} />
                      </div>
                      <div className="space-y-2">
                        <p><strong className="text-[var(--color-text-primary)]">B. Add to Routes:</strong> Update <Code syntax="plain">apps/sage-design-studio/app/page.tsx</Code> config.</p>
                        <CollapsibleCodeBlock id="meth-4b" code={`// In routeConfig
atoms: {
  children: {
    // ...
    'new-component': { label: 'New Component' },
  }
}`} defaultCollapsed={true} showCopy={true} />
                      </div>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center font-bold">5</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Register in Studio</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                      Add the component configuration to <Code syntax="plain">apps/sage-design-studio/app/components/lib/component-registry.tsx</Code>. This powers the documentation page.
                    </p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-secondary)] ml-2 mb-2">
                      <li>Define props controls (select, boolean, text)</li>
                      <li>Add usage examples</li>
                      <li>Add "Preview" and "Customize" sections via the registry config</li>
                    </ul>
                  </div>
                </li>
              </ol>
            </Card>
          </section>
        )}

        {/* Adding a New Atom */}
        {currentView === 'atoms' && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
              Adding a New Atom
            </h2>
            <Card className="p-6">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">1</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Create component file</h3>
                    <div className="w-full min-w-0 max-w-full">
                      <CollapsibleCodeBlock id="add-comp-1" code="packages/ui/src/components/ComponentName.tsx" defaultCollapsed={false} showCopy={true} />
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">2</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Define interface with required props</h3>
                    <CollapsibleCodeBlock id="add-comp-2" code={`interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}`} defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">3</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Implement with Radix + Tailwind</h3>
                    <CollapsibleCodeBlock id="add-comp-3" code={`import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

export function ComponentName({
  className,
  variant,
  asChild = false,
  ...props
}: ComponentNameProps) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      className={cn(componentVariants({ variant }), className)}
      {...props}
    />
  );
}`} defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">4</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Add to exports</h3>
                    <CollapsibleCodeBlock id="add-comp-4" code={`// packages/ui/src/index.ts
export { ComponentName } from './components/ComponentName';`} defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">5</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Build the package</h3>
                    <CollapsibleCodeBlock id="add-comp-5" code="pnpm --filter @sds/ui build" defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">6</span>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Add to studio showcase</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Add the component to <Code syntax="plain">ComponentsSection.tsx</Code> to showcase it in this studio app
                    </p>
                  </div>
                </li>
              </ol>
            </Card>
          </section>
        )}

        {/* Adding a New Molecule */}
        {currentView === 'molecules' && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
              Adding a New Molecule
            </h2>
            <Card className="p-6">
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Follow the same steps as adding an Atom, but place the file in:
              </p>
              <CollapsibleCodeBlock id="add-comp-6" code="packages/ui/src/components/ComponentName.tsx" defaultCollapsed={false} showCopy={true} />
              <div className="bg-[var(--color-surface)] p-4 rounded-md border border-[var(--color-border)] mt-4">
                <p className="text-sm text-[var(--color-text-primary)] mb-2">
                  <strong>Key difference:</strong> Molecules compose atoms together
                </p>
                <CollapsibleCodeBlock id="add-comp-7" code={`import { Input, Button } from '@sds/ui';

export function SearchBar() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Search..." />
      <Button variant="default">Search</Button>
    </div>
  );
}`} defaultCollapsed={false} showCopy={true} />
              </div>
            </Card>
          </section>
        )}

        {/* Modifying an Existing Component */}
        {currentView === 'modifying' && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
              Modifying an Existing Component
            </h2>
            <Card className="p-6">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">1</span>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Read current implementation</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Use AI tools or IDE to understand the current component structure and props
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">2</span>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Update component code</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Make your changes while preserving existing functionality
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">3</span>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Update TypeScript interfaces</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Add or modify type definitions as needed
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">4</span>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Test in studio</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Run the studio app to visually test your changes across all themes
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">5</span>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Rebuild package</h3>
                    <CollapsibleCodeBlock id="add-comp-8" code="pnpm --filter @sds/ui build" defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>
              </ol>
            </Card>
          </section>
        )}

        {/* Adding a New Design Token */}
        {currentView === 'tokens' && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
              Adding a New Design Token
            </h2>
            <Card className="p-6">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">1</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Locate token file</h3>
                    <CollapsibleCodeBlock id="add-comp-9" code="packages/tokens/src/sage/colors.ts" defaultCollapsed={false} showCopy={true} />
                    <p className="text-xs text-[var(--color-text-muted)] mt-2">
                      Example: <Code syntax="plain">tokens/src/studio/colors.ts</Code>
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">2</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Add token to interface</h3>
                    <CollapsibleCodeBlock id="add-comp-10" code={`export interface ColorTokens {
  // ... existing tokens
  newColor: string;
}
`} defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">3</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Implement in all three themes</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                      Add the token value to Studio, Sage, and Volt theme files
                    </p>
                    <CollapsibleCodeBlock id="add-comp-11" code={`// tokens/src/studio/colors.ts
export const colors: ColorTokens = {
  // ... existing colors
  newColor: '#FF5733',
};`} defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">4</span>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Update CSS variables</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Token values are automatically converted to CSS variables and available as <Code syntax="plain">var(--color-new-color)</Code>
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">5</span>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Rebuild package</h3>
                    <CollapsibleCodeBlock id="add-comp-12" code="pnpm --filter @sds/tokens build" defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>
              </ol>
            </Card>
          </section>
        )}

        {/* Troubleshooting */}
        {currentView === 'troubleshooting' && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
              Troubleshooting
            </h2>

            {/* Switch Component Failure */}
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">
                Error: Cannot read properties of undefined (reading 'track')
              </h3>

              <div className="space-y-6 w-full min-w-0">
                {/* Problem */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Problem</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    The component breaks the entire page with a runtime error when rendering styles based on a prop (e.g., <Code syntax="plain">size</Code>).
                  </p>
                  <CollapsibleCodeBlock
                    id="troubleshoot-switch-1"
                    code={`// Error encountered in Switch.tsx
const { track } = sizes[size]; // size is undefined or invalid -> CRASH`}
                    defaultCollapsed={false}
                    showCopy={false}
                  />
                </div>

                {/* Root Cause */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Root Cause</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    This usually happens when a prop is passed as <Code syntax="plain">undefined</Code> (despite TypeScript types) or an invalid string value, and used directly as a key to access an object without validation. In compiled JS, this results in trying to access a property on <Code syntax="plain">undefined</Code>.
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Solution</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    Always validate keys before using them to access style objects. Implement a "safeguard" or fallback mechanism.
                  </p>
                  <div className="bg-[var(--color-success)]/10 p-4 rounded-md border border-[var(--color-success)]/30">
                    <p className="text-xs text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--color-success)]" />
                      Robust Implementation:
                    </p>
                    <CollapsibleCodeBlock
                      id="troubleshoot-switch-2"
                      code={`// Design pattern for safe property access
const safeSize = (size && sizes[size]) ? size : 'md';
const { track } = sizes[safeSize]; // Safe access guaranteed`}
                      defaultCollapsed={false}
                      showCopy={true}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Complex Build Failures (CSS, Types, Dependencies) */}
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">
                Complex Build Failures (CSS, Types, Dependencies)
              </h3>

              <div className="space-y-6 w-full min-w-0">
                {/* Problem */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Symptoms</h4>
                  <ul className="list-disc list-inside text-sm text-[var(--color-text-secondary)] space-y-1">
                    <li>Build passes locally but fails on Vercel with generic "Webpack errors".</li>
                    <li>Errors pointing to <Code syntax="plain">globals.css</Code> or <Code syntax="plain">css-loader</Code>.</li>
                    <li>TypeScript errors like <Code syntax="plain">TS2742: The inferred type cannot be named</Code>.</li>
                  </ul>
                </div>

                {/* Solutions */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Solutions</h4>

                  <div className="space-y-4">
                    {/* 1. Phantom Deps */}
                    <div className="bg-[var(--color-surface)] p-4 rounded-md border border-[var(--color-border)]">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">1. Fix Phantom Dependencies</p>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                        If a config file (e.g., <Code syntax="plain">tailwind.config.ts</Code>) imports a workspace package, it MUST be listed in <Code syntax="plain">devDependencies</Code>.
                      </p>
                      <CollapsibleCodeBlock
                        id="troubleshoot-phantom"
                        code={`// package.json in the app
"devDependencies": {
  "@sds/config": "workspace:*", // Required for tailwind config
}`}
                        defaultCollapsed={true}
                        showCopy={true}
                      />
                    </div>

                    {/* 2. CSS Parsing */}
                    <div className="bg-[var(--color-surface)] p-4 rounded-md border border-[var(--color-border)]">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">2. Simplify CSS</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        Strict build environments may fail on experimental CSS (like <Code syntax="plain">font-named-instance</Code>) or complex variable font ranges (<Code syntax="plain">200 700</Code>). Use standard syntax.
                      </p>
                    </div>

                    {/* 3. Explicit Types */}
                    <div className="bg-[var(--color-surface)] p-4 rounded-md border border-[var(--color-border)]">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">3. Explicit Type Annotations</p>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                        For library re-exports, explicit types prevent portability issues.
                      </p>
                      <CollapsibleCodeBlock
                        id="troubleshoot-types"
                        code={`// Instead of: const Form = FormProvider;
// Use:
const Form: typeof FormProvider = FormProvider;`}
                        defaultCollapsed={true}
                        showCopy={true}
                      />
                    </div>

                    {/* 4. Build Scripts */}
                    <div className="bg-[var(--color-surface)] p-4 rounded-md border border-[var(--color-border)]">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">4. Allow Build Scripts</p>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                        Ensure binaries like <Code syntax="plain">esbuild</Code> are allowed to run.
                      </p>
                      <CollapsibleCodeBlock
                        id="troubleshoot-scripts"
                        code={`// Root package.json
"pnpm": {
  "onlyBuiltDependencies": ["esbuild", "sharp"]
}`}
                        defaultCollapsed={true}
                        showCopy={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Vercel Build Failures in Monorepo */}
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">
                Vercel Build Failures in Monorepo
              </h3>

              <div className="space-y-6 w-full min-w-0">
                {/* Problem */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Problem</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    Vercel build fails with error: <Code syntax="plain">error: unknown option '--filter=...'</Code>
                  </p>
                  <CollapsibleCodeBlock
                    id="troubleshoot-1"
                    code={`> @ecosystem/sage-design-studio@0.1.0 build
> next build --filter=@ecosystem/sage-design-studio
error: unknown option '--filter=@ecosystem/sage-design-studio'
ELIFECYCLE Command failed with exit code 1.`}
                    defaultCollapsed={false}
                    showCopy={false}
                  />
                </div>

                {/* Root Cause */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Root Cause</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    When using <Code syntax="plain">pnpm build --filter=...</Code> in vercel.json, Vercel runs the <Code syntax="plain">build</Code> script
                    from package.json and appends the filter flag. This results in <Code syntax="plain">next build --filter=...</Code>,
                    but Next.js doesn't recognize the <Code syntax="plain">--filter</Code> flag (it's a Turborepo flag).
                  </p>
                  <div className="bg-[var(--color-surface)] p-4 rounded-md border border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-red-500" />
                      Incorrect (runs through package.json):
                    </p>
                    <CollapsibleCodeBlock
                      id="troubleshoot-2"
                      code={`{
  "buildCommand": "pnpm build --filter=@ecosystem/sage-design-studio"
}`}
                      defaultCollapsed={false}
                      showCopy={false}
                    />
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Solution</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    Use <Code syntax="plain">turbo build</Code> directly instead of <Code syntax="plain">pnpm build</Code>.
                    This invokes Turborepo's build orchestration, which will build the design-system package first, then the app.
                  </p>
                  <div className="bg-[var(--color-success)]/10 p-4 rounded-md border border-[var(--color-success)]/30">
                    <p className="text-xs text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--color-success)]" />
                      Correct (runs turbo directly):
                    </p>
                    <CollapsibleCodeBlock
                      id="troubleshoot-3"
                      code={`{
  "buildCommand": "turbo build --filter=@ecosystem/sage-design-studio",
  "installCommand": "pnpm install --frozen-lockfile"
}`}
                      defaultCollapsed={false}
                      showCopy={true}
                    />
                  </div>
                </div>

                {/* How It Works */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">How It Works</h4>
                  <ol className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold">1.</span>
                      <span>Turbo reads the dependency graph from <Code syntax="plain">turbo.json</Code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold">2.</span>
                      <span>Sees that sage-design-studio depends on design-system (via <Code syntax="plain">dependsOn: ["^build"]</Code>)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold">3.</span>
                      <span>Builds <Code syntax="plain">@ecosystem/design-system</Code> first (runs tsup to generate dist files)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold">4.</span>
                      <span>Then builds <Code syntax="plain">@ecosystem/sage-design-studio</Code> (runs next build)</span>
                    </li>
                  </ol>
                </div>

                {/* Prevention */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Preventing This Issue</h4>
                  <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)]">•</span>
                      <span>Always use <Code syntax="plain">turbo</Code> directly for monorepo builds in Vercel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)]">•</span>
                      <span>Test the vercel.json buildCommand locally before deploying</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)]">•</span>
                      <span>Remember: <Code syntax="plain">pnpm [script]</Code> looks for package.json scripts, <Code syntax="plain">turbo [task]</Code> uses Turborepo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Workspace Module Resolution Failures */}
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">
                Workspace Module Resolution Failures
              </h3>

              <div className="space-y-6 w-full min-w-0">
                {/* Problem */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Problem</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    Build fails with <Code syntax="plain">Module not found: Can't resolve '@sds/tokens'</Code> or similar errors pointing to workspace packages.
                  </p>
                </div>

                {/* Root Cause */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Root Cause</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    Workspace packages (like <Code syntax="plain">@ecosystem/design-system</Code>) are symlinked in <Code syntax="plain">node_modules</Code>.
                    If these packages export raw TypeScript files (e.g., <Code syntax="plain">src/index.ts</Code>), Next.js will not compile them by default, leading to resolution errors in the server-side build.
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Solution</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    Explicitly tell Next.js to transpile these packages in <Code syntax="plain">next.config.js</Code>.
                  </p>
                  <div className="bg-[var(--color-success)]/10 p-4 rounded-md border border-[var(--color-success)]/30">
                    <p className="text-xs text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--color-success)]" />
                      Add transpilePackages:
                    </p>
                    <CollapsibleCodeBlock
                      id="troubleshoot-transpile"
                      code={`const nextConfig = {
  transpilePackages: ['@ecosystem/design-system', '@sds/tokens'],
};`}
                      defaultCollapsed={false}
                      showCopy={true}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Component Changes Not Showing on Deployed Site */}
            {activeItemId === 'troubleshooting' && (
              <Card className="p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">
                  Component Changes Not Appearing on Deployed Site
                </h3>

                <div className="space-y-6">
                  {/* Problem */}
                  <div>
                    <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Problem</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                      You've updated a component in the design-system package (e.g., Breadcrumbs hover states), but the changes don't appear on the deployed site, even after committing and pushing.
                    </p>
                  </div>

                  {/* Root Cause */}
                  <div>
                    <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Root Cause</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                      The examples in the studio app DO pull from the actual component code via imports. The issue is that Vercel isn't rebuilding the design-system package properly, so it's using stale dist files from a previous build.
                    </p>
                    <div className="bg-[var(--color-surface)] p-4 rounded-md border border-[var(--color-border)]">
                      <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">Understanding the Build Chain:</p>
                      <ol className="text-xs text-[var(--color-text-secondary)] space-y-1 list-decimal list-inside">
                        <li>Component source: <Code syntax="plain">design-system/molecules/Component/Component.tsx</Code></li>
                        <li>Built to: <Code syntax="plain">design-system/dist/index.mjs</Code> (via tsup)</li>
                        <li>Exported by: <Code syntax="plain">design-system/package.json</Code> exports field</li>
                        <li>Imported by: <Code syntax="plain">molecule-registry.tsx</Code> from '@ecosystem/design-system'</li>
                        <li>Rendered in: Studio app examples</li>
                      </ol>
                    </div>
                  </div>

                  {/* Diagnosis Steps */}
                  <div>
                    <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">How to Diagnose</h4>
                    <ol className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] font-bold">1.</span>
                        <span>Verify source code has your changes: Check the actual .tsx component file</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] font-bold">2.</span>
                        <span>Check local dist build has changes: <Code syntax="plain">grep "your-change" design-system/dist/index.mjs</Code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] font-bold">3.</span>
                        <span>Verify examples import correctly: Check molecule-registry.tsx imports from '@ecosystem/design-system'</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] font-bold">4.</span>
                        <span>If all above check out → It's a deployment build issue, not a code issue</span>
                      </li>
                    </ol>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Solution</h4>
                    <ol className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] font-bold">1.</span>
                        <div className="flex-1">
                          <p className="mb-2">Ensure vercel.json uses turbo build:</p>
                          <CollapsibleCodeBlock
                            id="troubleshoot-vercel-config"
                            code={`{
  "buildCommand": "turbo build --filter=@ecosystem/sage-design-studio",
  "installCommand": "pnpm install --frozen-lockfile"
}`}
                            defaultCollapsed={false}
                            showCopy={true}
                          />
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] font-bold">2.</span>
                        <div className="flex-1">
                          <p className="mb-2">Ensure package.json exports dist files:</p>
                          <CollapsibleCodeBlock
                            id="troubleshoot-exports"
                            code={`"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.mjs",
    "require": "./dist/index.js",
    "default": "./dist/index.js"
  }
}`}
                            defaultCollapsed={false}
                            showCopy={true}
                          />
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] font-bold">3.</span>
                        <span>Build locally to verify: <Code syntax="plain">pnpm build --filter=@ecosystem/design-system</Code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] font-bold">4.</span>
                        <span>Push changes: <Code syntax="plain">git push</Code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] font-bold">5.</span>
                        <span>Clear Vercel build cache: Project Settings → Clear Cache</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] font-bold">6.</span>
                        <span>Redeploy in Vercel</span>
                      </li>
                    </ol>
                  </div>

                  {/* Prevention */}
                  <div>
                    <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Preventing This Issue</h4>
                    <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)]">•</span>
                        <span>Always rebuild design-system locally after component changes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)]">•</span>
                        <span>Verify dist files contain your changes before pushing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)]">•</span>
                        <span>Remember: Examples use real components, not hardcoded props</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)]">•</span>
                        <span>If source is correct but deployed site is wrong → It's always a build/deployment issue</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
