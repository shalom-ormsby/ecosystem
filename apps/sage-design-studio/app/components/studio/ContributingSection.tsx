'use client';

import { Card } from '@sds/ui';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@sds/ui';
import { ArrowRight } from 'lucide-react';

interface ContributingSectionProps {
  breadcrumbs?: BreadcrumbItemLegacy[];
}

export function ContributingSection({ breadcrumbs }: ContributingSectionProps) {
  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="border-b border-[var(--color-border)] pb-6">
        <h1 className="text-4xl font-bold mb-2 text-[var(--color-text-primary)]">
          Contributing Guide
        </h1>

        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Checklist-driven guide for making pull requests
        </p>

        {/* Breadcrumbs - positioned after title and description */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mt-6">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* Before You Start */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Before You Start
        </h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Clone the repository</h3>
              <pre className="bg-[var(--color-surface)] p-4 rounded-md text-sm overflow-x-auto border border-[var(--color-border)]">
                <code className="text-[var(--color-text-primary)]">git clone https://github.com/shalom-ormsby/ecosystem.git
                  cd ecosystem</code>
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Enable Corepack and install dependencies</h3>
              <pre className="bg-[var(--color-surface)] p-4 rounded-md text-sm overflow-x-auto border border-[var(--color-border)]">
                <code className="text-[var(--color-text-primary)]">corepack enable
                  pnpm install</code>
              </pre>
              <p className="text-sm text-[var(--color-text-muted)] mt-2">
                This project uses pnpm as the package manager. Corepack ensures you're using the correct version.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Verify setup</h3>
              <pre className="bg-[var(--color-surface)] p-4 rounded-md text-sm overflow-x-auto border border-[var(--color-border)]">
                <code className="text-[var(--color-text-primary)]">pnpm --filter @sds/ui build
                  pnpm --filter sage-design-studio dev</code>
              </pre>
              <p className="text-sm text-[var(--color-text-muted)] mt-2">
                This builds the design system and starts the studio app at localhost:3001
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Making Changes */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Making Changes
        </h2>
        <Card className="p-6">
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">1</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Create a new branch</h3>
                <pre className="bg-[var(--color-surface)] p-4 rounded-md text-sm overflow-x-auto border border-[var(--color-border)]">
                  <code className="text-[var(--color-text-primary)]">git checkout -b feature/component-name</code>
                </pre>
                <p className="text-sm text-[var(--color-text-muted)] mt-2">
                  Use descriptive branch names: <code className="px-1.5 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">feature/</code>, <code className="px-1.5 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">fix/</code>, or <code className="px-1.5 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">docs/</code>
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">2</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Make your changes</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Follow the patterns in the "Adding Components" guide inside packages/ui.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-sm font-semibold">3</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Test locally in studio app</h3>
                <pre className="bg-[var(--color-surface)] p-4 rounded-md text-sm overflow-x-auto border border-[var(--color-border)]">
                  <code className="text-[var(--color-text-primary)]">pnpm --filter @sds/ui build
                    pnpm --filter sage-design-studio dev</code>
                </pre>
                <p className="text-sm text-[var(--color-text-muted)] mt-2">
                  Verify your changes work across all three themes (Studio, Sage, Volt)
                </p>
              </div>
            </li>
          </ol>
        </Card>
      </section>

      {/* Pre-PR Checklist */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Pre-PR Checklist
        </h2>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Before submitting your pull request, ensure all of these items are complete:
          </p>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1" disabled />
              <div>
                <span className="font-medium text-[var(--color-text-primary)]">Build succeeds</span>
                <pre className="bg-[var(--color-surface)] p-2 rounded-md text-xs mt-1 border border-[var(--color-border)]">
                  <code className="text-[var(--color-text-primary)]">pnpm --filter @sds/ui build</code>
                </pre>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1" disabled />
              <div>
                <span className="font-medium text-[var(--color-text-primary)]">No TypeScript errors</span>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Check for type errors in your IDE or run the build command
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1" disabled />
              <div>
                <span className="font-medium text-[var(--color-text-primary)]">Component works in all three themes</span>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Test Studio, Sage, and Volt themes in the studio app
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1" disabled />
              <div>
                <span className="font-medium text-[var(--color-text-primary)]">Motion respects prefers-reduced-motion</span>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  If you added animations, ensure they're disabled when motion is reduced
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1" disabled />
              <div>
                <span className="font-medium text-[var(--color-text-primary)]">Component added to studio showcase</span>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Add your component to ComponentsSection under the appropriate functional category
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1" disabled />
              <div>
                <span className="font-medium text-[var(--color-text-primary)]">Exports updated in index.ts</span>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Ensure your component is exported from <code className="px-1.5 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">packages/design-system/src/components/index.ts</code>
                </p>
              </div>
            </label>
          </div>
        </Card>
      </section>

      {/* Submitting a PR */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Submitting a Pull Request
        </h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Commit your changes</h3>
              <pre className="bg-[var(--color-surface)] p-4 rounded-md text-sm overflow-x-auto border border-[var(--color-border)]">
                <code className="text-[var(--color-text-primary)]">git add .
                  git commit -m "feat: add NewComponent to design system"</code>
              </pre>
              <p className="text-sm text-[var(--color-text-muted)] mt-2">
                Use conventional commit format: <code className="px-1.5 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">feat:</code>, <code className="px-1.5 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">fix:</code>, <code className="px-1.5 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">docs:</code>, etc.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Push to your fork</h3>
              <pre className="bg-[var(--color-surface)] p-4 rounded-md text-sm overflow-x-auto border border-[var(--color-border)]">
                <code className="text-[var(--color-text-primary)]">git push origin feature/component-name</code>
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Create PR on GitHub</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                Go to the repository and click "Create Pull Request". Use this template:
              </p>
              <pre className="bg-[var(--color-surface)] p-4 rounded-md text-sm overflow-x-auto border border-[var(--color-border)]">
                <code className="text-[var(--color-text-primary)]">{`## Summary
- Added NewComponent to the design system
- Organized functionally by primary purpose
- Supports all three themes

## Changes
- Created NewComponent.tsx in components/[category]/
- Added exports to category index and main barrel
- Updated ComponentsSection to showcase component
- Built and tested in studio app

## Design Philosophy
This component embodies [principle from DESIGN-PHILOSOPHY.md]

## Screenshots
[Add screenshots showing the component in Studio, Sage, and Volt themes]

## Checklist
- [x] Build succeeds
- [x] No TypeScript errors
- [x] Works in all three themes
- [x] Motion respects prefers-reduced-motion
- [x] Added to studio showcase
- [x] Exports updated`}</code>
              </pre>
            </div>

            <div className="p-4 bg-[var(--color-surface)] rounded-md border border-[var(--color-border)]">
              <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Link to Design Philosophy</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Reference specific principles from <a href="https://github.com/shalom-ormsby/ecosystem/blob/main/DESIGN-PHILOSOPHY.md" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">DESIGN-PHILOSOPHY.md</a> that your contribution addresses.
                This helps reviewers understand your design decisions.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Code Review Process */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Code Review Process
        </h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">What to expect</h3>
              <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-primary)]">→</span>
                  <span>Maintainers will review your code for quality, consistency, and adherence to design principles</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                  <span>Feedback may include requests for changes or improvements</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                  <span>Be responsive to feedback and iterate on your changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                  <span>Once approved, your PR will be merged into the main branch</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-[var(--color-surface)] rounded-md border border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-text-primary)]">
                <strong>Thank you for contributing!</strong> Your work helps make this design system better for everyone.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
