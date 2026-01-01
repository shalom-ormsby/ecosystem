'use client';

import { Card, Code, CollapsibleCodeBlock } from '@ecosystem/design-system';

export function OverviewSection() {
  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="border-b border-[var(--color-border)] pb-6">
        <h1 className="text-4xl font-bold mb-2 text-[var(--color-text-primary)]">
          Sage Design System
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">Version 0.1.0</p>
      </div>

      {/* Quick Orientation */}
      <section>
        <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
          A React component library with three distinct themes, built on design tokens and human-centered principles.
          Designed for AI agents and humans to easily consume, understand, and extend.
          All components respect motion preferences and follow atomic design architecture.
        </p>
      </section>

      {/* Essential Links */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Essential Documentation
        </h2>
        <Card className="p-6">
          <div className="space-y-3">
            <a
              href="https://github.com/shalom-ormsby/ecosystem/blob/main/DESIGN-PHILOSOPHY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="font-medium">Design Philosophy</span>
              <span className="text-sm text-[var(--color-text-muted)]">— Core principles and decision-making framework</span>
            </a>
            <a
              href="https://github.com/shalom-ormsby/ecosystem/tree/main/design-system"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="font-medium">GitHub Repository</span>
              <span className="text-sm text-[var(--color-text-muted)]">— Source code, issues, and contribution guide</span>
            </a>
          </div>
        </Card>
      </section>

      {/* Quick Start */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Quick Start
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">Installation</h3>
            <Code inline={false} syntax="plain">pnpm add @ecosystem/design-system</Code>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">Basic Usage</h3>
            <CollapsibleCodeBlock
              id="basic-usage"
              code={`import { Button, Card } from '@ecosystem/design-system';

export function MyComponent() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}`}
              defaultCollapsed={false}
              showCopy={true}
            />
          </Card>

          <Card className="p-6 md:col-span-2">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">Theme Switching</h3>
            <CollapsibleCodeBlock
              id="theme-switching"
              code={`import { useTheme } from '@ecosystem/design-system';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme('sage')}>
      Switch to Sage theme
    </button>
  );
}`}
              defaultCollapsed={false}
              showCopy={true}
            />
          </Card>
        </div>
      </section>

      {/* File Structure */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          File Structure Reference
        </h2>
        <Card className="p-6">
          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-text-muted)] flex-shrink-0">Design Tokens:</span>
              <code className="text-[var(--color-text-primary)]">packages/design-system/src/tokens/</code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-text-muted)] flex-shrink-0">Components:</span>
              <code className="text-[var(--color-text-primary)]">packages/design-system/src/components/</code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-text-muted)] flex-shrink-0">Hooks:</span>
              <code className="text-[var(--color-text-primary)]">packages/design-system/src/hooks/</code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-text-muted)] flex-shrink-0">Build Config:</span>
              <code className="text-[var(--color-text-primary)]">packages/design-system/tsup.config.ts</code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-text-muted)] flex-shrink-0">Studio App:</span>
              <code className="text-[var(--color-text-primary)]">apps/sage-design-studio/</code>
            </div>
          </div>
        </Card>
      </section>

      {/* Architecture Overview */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Architecture Overview
        </h2>
        <Card className="p-6">
          <p className="text-[var(--color-text-primary)] mb-4">
            This design system follows <strong>atomic design principles</strong> with a clear hierarchy:
          </p>
          <div className="space-y-3 pl-4 border-l-2 border-[var(--color-border)]">
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Tokens</span>
              <span className="text-[var(--color-text-secondary)]"> — Raw values (colors, spacing, typography, motion)</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Atoms</span>
              <span className="text-[var(--color-text-secondary)]"> — Smallest functional elements (Button, Input, Badge)</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Molecules</span>
              <span className="text-[var(--color-text-secondary)]"> — Simple combinations with single purpose (TextField, SearchBar)</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Organisms</span>
              <span className="text-[var(--color-text-secondary)]"> — Complex sections managing layout/state (Header, Footer, Modal)</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Templates</span>
              <span className="text-[var(--color-text-secondary)]"> — Page layouts and structural blueprints</span>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mt-4 italic">
            Built with React 18, TypeScript, Framer Motion, Zustand, Tailwind CSS, and bundled with tsup.
          </p>
        </Card>
      </section>

      {/* Theme System */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Theme System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-1 text-[var(--color-text-primary)]">Studio</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">Professional, balanced, modern</p>
            <p className="text-xs text-[var(--color-text-muted)]">Geist Sans, Geist Mono</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-1 text-[var(--color-text-primary)]">Sage</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">Calm, organic, thoughtful</p>
            <p className="text-xs text-[var(--color-text-muted)]">Lora, Instrument Sans</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-1 text-[var(--color-text-primary)]">Volt</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">Bold, electric, energetic</p>
            <p className="text-xs text-[var(--color-text-muted)]">Space Grotesk</p>
          </Card>
        </div>
        <Card className="p-6 mt-4">
          <p className="text-sm text-[var(--color-text-primary)]">
            All components automatically adapt to the active theme using CSS custom properties.
            Themes share the same component API but express different visual personalities through tokens.
            Switch themes at runtime with <code className="px-2 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">setTheme()</code>.
          </p>
        </Card>
      </section>

      {/* Key Principles */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Key Principles
        </h2>
        <Card className="p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[var(--color-primary)] flex-shrink-0 mt-1">→</span>
              <div>
                <strong className="text-[var(--color-text-primary)]">Accessibility first:</strong>
                <span className="text-[var(--color-text-secondary)]"> All components respect <code className="text-xs px-1.5 py-0.5 bg-[var(--color-surface)] rounded">prefers-reduced-motion</code> and follow semantic HTML patterns</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--color-primary)] flex-shrink-0 mt-1">→</span>
              <div>
                <strong className="text-[var(--color-text-primary)]">Single source of truth:</strong>
                <span className="text-[var(--color-text-secondary)]"> Design tokens cascade through all themes, ensuring consistency</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--color-primary)] flex-shrink-0 mt-1">→</span>
              <div>
                <strong className="text-[var(--color-text-primary)]">Developer experience:</strong>
                <span className="text-[var(--color-text-secondary)]"> Full TypeScript support, clear prop interfaces, and comprehensive examples</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--color-primary)] flex-shrink-0 mt-1">→</span>
              <div>
                <strong className="text-[var(--color-text-primary)]">Human-centered design:</strong>
                <span className="text-[var(--color-text-secondary)]"> Every component encodes thoughtful defaults and respects user agency</span>
              </div>
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
