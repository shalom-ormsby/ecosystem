'use client';

import { Card, Code, CollapsibleCodeBlock, Breadcrumbs, type BreadcrumbItemLegacy } from '@sds/ui';
import { ArrowRight } from 'lucide-react';

interface ArchitectureSectionProps {
  breadcrumbs?: BreadcrumbItemLegacy[];
}

export function ArchitectureSection({ breadcrumbs }: ArchitectureSectionProps) {
  return (
    <div className="space-y-12 w-full min-w-0">
      {/* Title */}
      <div className="border-b border-[var(--color-border)] pb-6">
        <h1 className="text-4xl font-bold mb-2 text-[var(--color-text-primary)]">
          Architecture Overview
        </h1>

        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Understanding the structure and decision-making framework
        </p>

        {/* Breadcrumbs - positioned after title and description */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mt-6">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* Component Hierarchy */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Component Hierarchy
        </h2>
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-[var(--color-text-primary)]">Tokens → Atoms → Molecules → Organisms → Templates</h3>
              <p className="text-[var(--color-text-secondary)]">
                This system follows atomic design principles with a clear hierarchy from smallest to largest building blocks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Tokens</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Raw values that define the visual language. Not functional on their own.
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  packages/design-system/src/tokens/
                </div>
              </Card>

              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Atoms</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Smallest functional elements. Cannot be broken down further without losing core function.
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  Button, Input, Badge, Label
                </div>
              </Card>

              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Molecules</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Simple groups bonded together for a single task. Highly reusable and context-agnostic.
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  TextField, SearchBar, FormField
                </div>
              </Card>

              <Card className="p-4 bg-[var(--color-surface)]">
                <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Organisms</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Complex compositions forming discrete sections. Often manage state or layout for children.
                </p>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  Header, Footer, Modal, Navigation
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </section>

      {/* Decision Framework */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Decision Framework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">When to create an Atom vs Molecule</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-[var(--color-text-primary)]">Create an Atom if:</strong>
                <ul className="list-disc list-inside text-[var(--color-text-secondary)] mt-1 space-y-1 ml-2">
                  <li>It's a single, indivisible UI element</li>
                  <li>It has no child components</li>
                  <li>It consumes design tokens directly</li>
                  <li>Example: Button, Input, Badge</li>
                </ul>
              </div>
              <div>
                <strong className="text-[var(--color-text-primary)]">Create a Molecule if:</strong>
                <ul className="list-disc list-inside text-[var(--color-text-secondary)] mt-1 space-y-1 ml-2">
                  <li>It combines 2-3 atoms together</li>
                  <li>It serves a single, specific purpose</li>
                  <li>It's reusable across contexts</li>
                  <li>Example: TextField (Label + Input), SearchBar (Input + Button)</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">When to create a Molecule vs Organism</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-[var(--color-text-primary)]">Create a Molecule if:</strong>
                <ul className="list-disc list-inside text-[var(--color-text-secondary)] mt-1 space-y-1 ml-2">
                  <li>It's a self-contained unit</li>
                  <li>It doesn't manage complex layout</li>
                  <li>It has a singular purpose</li>
                  <li>Example: SearchBar, FormField</li>
                </ul>
              </div>
              <div>
                <strong className="text-[var(--color-text-primary)]">Create an Organism if:</strong>
                <ul className="list-disc list-inside text-[var(--color-text-secondary)] mt-1 space-y-1 ml-2">
                  <li>Its primary job is to arrange other components</li>
                  <li>It manages state or layout for children</li>
                  <li>It forms a distinct section of the interface</li>
                  <li>Example: Header (arranges logo, nav, actions), Footer (arranges links, info)</li>
                </ul>
              </div>
            </div>
          </Card>
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
                <span className="font-mono text-[var(--color-primary)]">React 18</span>
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
   setTheme('sage')`} defaultCollapsed={false} showCopy={true} />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
