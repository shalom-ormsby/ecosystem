'use client';

import { Card, Code, CollapsibleCodeBlock } from '@ecosystem/design-system';

export function AddingComponentsSection() {
  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="border-b border-[var(--color-border)] pb-6">
        <h1 className="text-4xl font-bold mb-2 text-[var(--color-text-primary)]">
          Adding Components
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Step-by-step workflows for extending the design system
        </p>
      </div>

      {/* Adding a New Atom */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Adding a New Atom
        </h2>
        <Card className="p-6">
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">1</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Create component file</h3>
                <CollapsibleCodeBlock id="add-comp-1" code="packages/design-system/src/components/atoms/ComponentName.tsx" defaultCollapsed={false} showCopy={true} />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">2</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Define interface with required props</h3>
                <CollapsibleCodeBlock id="add-comp-2" code={`interface ComponentNameProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}`} defaultCollapsed={false} showCopy={true} />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">3</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Implement with design tokens</h3>
                <CollapsibleCodeBlock id="add-comp-3" code={`export function ComponentName({
  variant = 'primary',
  size = 'md',
  children,
  className
}: ComponentNameProps) {
  return (
    <div
      className={\`
        \${variant === 'primary'
          ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
          : 'bg-[var(--color-secondary)]'}
        \${className}
      \`}
    >
      {children}
    </div>
  );
}`} defaultCollapsed={false} showCopy={true} />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">4</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Add to exports</h3>
                <CollapsibleCodeBlock id="add-comp-4" code={`// packages/design-system/src/components/index.ts
export { ComponentName } from './atoms/ComponentName';`} defaultCollapsed={false} showCopy={true} />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">5</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Build the package</h3>
                <CollapsibleCodeBlock id="add-comp-5" code="pnpm --filter @ecosystem/design-system build" defaultCollapsed={false} showCopy={true} />
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

      {/* Adding a New Molecule */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Adding a New Molecule
        </h2>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Follow the same steps as adding an Atom, but place the file in:
          </p>
          <CollapsibleCodeBlock id="add-comp-6" code="packages/design-system/src/components/molecules/ComponentName.tsx" defaultCollapsed={false} showCopy={true} />
          <div className="bg-[var(--color-surface)] p-4 rounded-md border border-[var(--color-border)] mt-4">
            <p className="text-sm text-[var(--color-text-primary)] mb-2">
              <strong>Key difference:</strong> Molecules compose atoms together
            </p>
            <CollapsibleCodeBlock id="add-comp-7" code={`import { Input, Button } from '../atoms';

export function SearchBar() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Search..." />
      <Button variant="primary">Search</Button>
    </div>
  );
}`} defaultCollapsed={false} showCopy={true} />
          </div>
        </Card>
      </section>

      {/* Modifying an Existing Component */}
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
                <CollapsibleCodeBlock id="add-comp-8" code="pnpm --filter @ecosystem/design-system build" defaultCollapsed={false} showCopy={true} />
              </div>
            </li>
          </ol>
        </Card>
      </section>

      {/* Adding a New Design Token */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Adding a New Design Token
        </h2>
        <Card className="p-6">
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">1</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Locate token file</h3>
                <CollapsibleCodeBlock id="add-comp-9" code="packages/design-system/src/tokens/[theme]/[category].ts" defaultCollapsed={false} showCopy={true} />
                <p className="text-xs text-[var(--color-text-muted)] mt-2">
                  Example: <Code syntax="plain">tokens/studio/colors.ts</Code>, <Code syntax="plain">tokens/sage/typography.ts</Code>
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">2</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Add token to interface</h3>
                <CollapsibleCodeBlock id="add-comp-10" code={`export interface ColorTokens {
  // ... existing tokens
  newColor: string;
}`} defaultCollapsed={false} showCopy={true} />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">3</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Implement in all three themes</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  Add the token value to Studio, Sage, and Volt theme files
                </p>
                <CollapsibleCodeBlock id="add-comp-11" code={`// tokens/studio/colors.ts
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
                <CollapsibleCodeBlock id="add-comp-12" code="pnpm --filter @ecosystem/design-system build" defaultCollapsed={false} showCopy={true} />
              </div>
            </li>
          </ol>
        </Card>
      </section>
    </div>
  );
}
