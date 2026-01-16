'use client';

import { Button } from '@sds/ui';
import { GitHubIcon } from '@sds/ui';

/**
 * StudioHero Component
 *
 * Uses Swiss grid system principles:
 * - 8px base unit spacing system
 * - Clear typographic hierarchy
 * - Generous whitespace for breathing room
 * - Centered alignment for hero content
 * - Consistent vertical rhythm
 *
 * Typography Note: Uses documentation font hierarchy (loaded in layout.tsx):
 * - Nunito Sans: Headings (h1, h2, etc.) - Professional, clean, less rounded
 * - Nunito: Body text - Warm, friendly, highly readable
 *
 * This follows design system documentation best practices by using separate
 * fonts for documentation UI vs. component examples, creating clear visual
 * separation. These fonts are NOT part of the design system itself and are
 * NOT controlled by the theme customizer.
 */
export function StudioHero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      {/* Swiss Grid: 8px base unit - reduced bottom padding to raise content below */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title: Primary hierarchy level */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-12 text-[var(--color-text-primary)] tracking-tight">
            Sage Design Studio
          </h1>

          {/* CTA: Centered with generous spacing (mb-16 = 64px = 8 units) */}
          <div className="mb-16">
            <a
              href="https://github.com/shalom-ormsby/ecosystem"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" size="lg">
                <GitHubIcon size={20} className="mr-2" />
                View on GitHub
              </Button>
            </a>
          </div>

          {/* Introduction: Tertiary hierarchy - matches section width below */}
          <div className="max-w-7xl mx-auto">
            <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
              These tokens and atomic design elements power this entire digital ecosystem.
              Explore, apply, and fork them as you wish—everything is offered under the MIT license.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
