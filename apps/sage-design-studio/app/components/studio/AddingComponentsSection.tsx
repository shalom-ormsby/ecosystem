'use client';

import { useState } from 'react';
import { Card, Code, CollapsibleCodeBlock, SecondaryNav, Breadcrumbs, type BreadcrumbItem } from '@ecosystem/design-system';
import { CheckCircle, XCircle } from 'lucide-react';

interface AddingComponentsSectionProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function AddingComponentsSection({ breadcrumbs }: AddingComponentsSectionProps) {
  const [activeSection, setActiveSection] = useState('atoms');

  const sections = [
    { id: 'atoms', label: 'Adding Atoms' },
    { id: 'molecules', label: 'Adding Molecules' },
    { id: 'modifying', label: 'Modifying Components' },
    { id: 'tokens', label: 'Adding Tokens' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ];

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

        {/* Breadcrumbs - positioned after title and description */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mt-6">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* Secondary Navigation - Sticky below header */}
      <SecondaryNav
        items={sections}
        activeId={activeSection}
        onItemChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="space-y-12">

        {/* Adding a New Atom */}
        {activeSection === 'atoms' && (
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
                      <CollapsibleCodeBlock id="add-comp-1" code="packages/design-system/src/components/atoms/ComponentName.tsx" defaultCollapsed={false} showCopy={true} />
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">2</span>
                  <div className="flex-1 min-w-0">
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
                  <div className="flex-1 min-w-0">
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
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Add to exports</h3>
                    <CollapsibleCodeBlock id="add-comp-4" code={`// packages/design-system/src/components/index.ts
export { ComponentName } from './atoms/ComponentName';`} defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">5</span>
                  <div className="flex-1 min-w-0">
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
        )}

        {/* Adding a New Molecule */}
        {activeSection === 'molecules' && (
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
        )}

        {/* Modifying an Existing Component */}
        {activeSection === 'modifying' && (
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
        )}

        {/* Adding a New Design Token */}
        {activeSection === 'tokens' && (
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
                    <CollapsibleCodeBlock id="add-comp-9" code="packages/design-system/src/tokens/[theme]/[category].ts" defaultCollapsed={false} showCopy={true} />
                    <p className="text-xs text-[var(--color-text-muted)] mt-2">
                      Example: <Code syntax="plain">tokens/studio/colors.ts</Code>, <Code syntax="plain">tokens/sage/typography.ts</Code>
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
}`} defaultCollapsed={false} showCopy={true} />
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">3</span>
                  <div className="flex-1 min-w-0">
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
        )}

        {/* Troubleshooting */}
        {activeSection === 'troubleshooting' && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
              Troubleshooting
            </h2>

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
          </section>
        )}

        {/* Component Changes Not Showing on Deployed Site */}
        {activeSection === 'troubleshooting' && (
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
      </div>
    </div>
  );
}
