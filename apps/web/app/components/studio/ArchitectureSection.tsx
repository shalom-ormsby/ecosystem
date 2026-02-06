'use client';

import { Card, Code, CollapsibleCodeBlock, Breadcrumbs, type BreadcrumbItemLegacy } from '@thesage/ui';
import { ArrowRight } from 'lucide-react';

interface ArchitectureSectionProps {
  breadcrumbs?: BreadcrumbItemLegacy[];
}

export function ArchitectureSection({ breadcrumbs }: ArchitectureSectionProps) {
  return (
    <div className="space-y-12 w-full min-w-0">
      {/* Title */}
      {/* Title */}
      <div className="border-b border-[var(--color-border)] pb-6">
        {/* Breadcrumbs - positioned above title */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-4">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-2 text-[var(--color-text-primary)]">
          Architecture Overview
        </h1>

        <p className="text-sm text-[var(--color-text-muted)]">
          Understanding the structure and decision-making framework
        </p>
      </div>

      {/* Component Organization */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Functional Organization
        </h2>
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-[var(--color-text-primary)]">Components Organized by Purpose, Not Hierarchy</h3>
              <p className="text-[var(--color-text-secondary)]">
                This system organizes components by what they <em>do</em>, not by abstract hierarchy. This eliminates classification ambiguity and improves developer discoverability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Actions (3)</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Interactive elements that trigger behaviors
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  Button, Toggle, ToggleGroup
                </div>
              </Card>

              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Forms (11)</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Input controls for data collection with validation
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  Input, Select, Checkbox, Switch, Slider, Label...
                </div>
              </Card>

              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Navigation (6)</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Moving through content hierarchy and app structure
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  Breadcrumb, Tabs, Pagination, Command...
                </div>
              </Card>

              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Overlays (9)</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Contextual content that appears above main UI
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  Dialog, Sheet, Popover, Tooltip, Drawer...
                </div>
              </Card>

              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Feedback (5)</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Communicating system state and user action results
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  Alert, Toast, Progress, Skeleton, Sonner
                </div>
              </Card>

              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Data Display (6)</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Presenting information in structured formats
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  Table, DataTable, Card, Avatar, Badge, Calendar
                </div>
              </Card>

              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Layout (8)</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Spatial organization and structural elements
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  Accordion, Carousel, ScrollArea, Separator...
                </div>
              </Card>
            </div>

            <div className="mt-4 p-4 bg-[var(--color-primary)] bg-opacity-10 rounded-md border border-[var(--color-primary)]">
              <p className="text-sm text-[var(--color-text-primary)]">
                <strong>Why functional organization?</strong> Modern design systems (shadcn/ui, Material UI, Radix, Chakra)
                have moved away from atomic design. Developers think "I need a form input" not "I need an atom."
                This approach eliminates classification ambiguity and maps to real development workflows.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Category Selection Guide */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Choosing the Right Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">Actions, Forms & Navigation</h3>
            <div className="space-y-4 text-sm">
              <div>
                <strong className="text-[var(--color-text-primary)]">Actions:</strong>
                <p className="text-[var(--color-text-secondary)] mt-1">
                  Use when the component's primary purpose is to trigger a behavior or state change.
                  Examples: Button (triggers action), Toggle (binary state), ToggleGroup (multiple toggles).
                </p>
              </div>
              <div>
                <strong className="text-[var(--color-text-primary)]">Forms:</strong>
                <p className="text-[var(--color-text-secondary)] mt-1">
                  Use for any data input or collection component. Includes validation and form integration.
                  Examples: Input, Select, Checkbox, RadioGroup, Slider, Form wrapper.
                </p>
              </div>
              <div>
                <strong className="text-[var(--color-text-primary)]">Navigation:</strong>
                <p className="text-[var(--color-text-secondary)] mt-1">
                  Use when helping users understand location or move through content hierarchy.
                  Examples: Breadcrumb, Tabs, Pagination, Command palette.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">Overlays, Feedback & Display</h3>
            <div className="space-y-4 text-sm">
              <div>
                <strong className="text-[var(--color-text-primary)]">Overlays:</strong>
                <p className="text-[var(--color-text-secondary)] mt-1">
                  Use for contextual content that appears above the main UI without interrupting flow.
                  Examples: Dialog, Popover, Tooltip, Sheet, Drawer.
                </p>
              </div>
              <div>
                <strong className="text-[var(--color-text-primary)]">Feedback:</strong>
                <p className="text-[var(--color-text-secondary)] mt-1">
                  Use to communicate system state or results of user actions.
                  Examples: Alert, Toast, Progress, Skeleton loaders.
                </p>
              </div>
              <div>
                <strong className="text-[var(--color-text-primary)]">Data Display & Layout:</strong>
                <p className="text-[var(--color-text-secondary)] mt-1">
                  Data Display: presenting information (Table, Card, Avatar).
                  Layout: organizing content spatially (Accordion, Carousel, ScrollArea).
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-4 p-4 bg-[var(--color-surface)] rounded-md border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-primary)]">
            <strong>Gray areas?</strong> Some components could fit multiple categories.
            Use the <em>primary purpose</em> rule: SearchBar is in <strong>Forms</strong>
            (primary purpose: collect input) not Navigation, even though it aids navigation.
          </p>
        </div>
      </section>

      {/* Naming Conventions */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Naming Conventions
        </h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Component Names</h3>
                <ul className="text-sm space-y-2 text-[var(--color-text-secondary)]">
                  <li><Code syntax="plain">PascalCase</Code> for component names</li>
                  <li><Code syntax="plain">kebab-case</Code> for file names</li>
                  <li>Descriptive, action-oriented names</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">File Organization</h3>
                <ul className="text-sm space-y-2 text-[var(--color-text-secondary)]">
                  <li>One component per file</li>
                  <li>Co-locate types with components</li>
                  <li>Group related components in folders</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">Core Framework</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[var(--color-primary)]">React 19</span>
                <span className="text-[var(--color-text-secondary)]">— UI library with hooks and concurrent features</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[var(--color-primary)]">TypeScript</span>
                <span className="text-[var(--color-text-secondary)]">— Type safety and developer experience</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">Styling & Animation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[var(--color-primary)]">Tailwind CSS</span>
                <span className="text-[var(--color-text-secondary)]">— Utility-first styling</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[var(--color-primary)]">Framer Motion</span>
                <span className="text-[var(--color-text-secondary)]">— Declarative animations with accessibility</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">State Management</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[var(--color-primary)]">Zustand</span>
                <span className="text-[var(--color-text-secondary)]">— Lightweight global state management</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">Build & Bundle</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[var(--color-primary)]">tsup</span>
                <span className="text-[var(--color-text-secondary)]">— Fast TypeScript bundler</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[var(--color-primary)]">Turborepo</span>
                <span className="text-[var(--color-text-secondary)]">— Monorepo build system</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Design Token System */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Design Token System
        </h2>
        <Card className="p-6">
          <p className="text-[var(--color-text-primary)] mb-4">
            Design tokens are the single source of truth for all visual values. They cascade through themes to ensure consistency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Token Categories</h3>
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                  <div>
                    <strong>Colors:</strong> Brand, semantic, surface, and text colors
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                  <div>
                    <strong>Typography:</strong> Font families, sizes, weights, line heights
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                  <div>
                    <strong>Spacing:</strong> Margin, padding, and gap scales
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                  <div>
                    <strong>Motion:</strong> Animation durations and easing functions
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">How Tokens Cascade</h3>
              <CollapsibleCodeBlock id="arch-1" code={`1. Define in TypeScript
   tokens/studio/colors.ts

2. Export as CSS variables
   themes/studio.css

3. Consume in components
   var(--color-primary)

4. Switch themes at runtime
   setTheme('terra')`} defaultCollapsed={false} showCopy={true} />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
