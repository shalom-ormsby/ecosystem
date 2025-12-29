'use client';

import { Button } from '@ecosystem/design-system';

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
 * Font Note: Uses Nunito as the documentation font (loaded in layout.tsx).
 * This follows design system documentation best practices by using a separate
 * font for documentation UI vs. component examples, creating clear visual
 * separation and improved readability. This font is NOT part of the design
 * system itself and is NOT controlled by the theme customizer.
 */
export function StudioHero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      {/* Swiss Grid: 8px base unit (py-24 = 96px = 12 units, py-32 = 128px = 16 units) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title: Primary hierarchy level */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-[var(--color-text-primary)] tracking-tight">
            Sage Design Studio
          </h1>

          {/* Subtitle: Secondary hierarchy - generous spacing (mb-12 = 48px = 6 units) */}
          <p className="text-xl sm:text-2xl text-[var(--color-text-secondary)] mb-12 font-light">
            The heart of the ecosystem
          </p>

          {/* CTA: Centered with generous spacing (mb-16 = 64px = 8 units) */}
          <div className="mb-16">
            <a
              href="https://github.com/shalom-ormsby/ecosystem"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg">
                View on GitHub
              </Button>
            </a>
          </div>

          {/* Introduction: Tertiary hierarchy - max-width for optimal reading */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
              Explore the design system, components, and design tokens that power the entire ecosystem.
              This is <strong>Transparent by Design</strong>—not just documentation, but a living,
              interactive showcase of design decisions made tangible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
