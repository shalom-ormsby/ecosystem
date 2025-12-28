'use client';

import { Button } from '@ecosystem/design-system';

export function StudioHero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center">
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            Sage Design Studio
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-[var(--color-text-secondary)] mb-8 max-w-3xl mx-auto">
            The heart of the ecosystem
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://github.com/shalomormsby/ecosystem"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg">
                View on GitHub
              </Button>
            </a>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto">
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
