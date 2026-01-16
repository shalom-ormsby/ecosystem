'use client';

import { Card } from '@sds/ui';

export function CursorEffectsSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Cursor Effects
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
          Custom cursor animations and effects that follow user movement. Create immersive experiences with gradient pointers, magnetic effects, and custom cursors.
        </p>
      </div>

      {/* Overview Card */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Overview
        </h2>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <p>
            Cursor effects add personality and visual interest to desktop experiences. These components create engaging
            feedback that follows the user's mouse movement, enhancing the sense of interactivity.
          </p>
          <p>
            Cursor effects are desktop-only and automatically disable on touch devices. They're optimized for 60fps performance
            using requestAnimationFrame and CSS transforms.
          </p>
        </div>
      </Card>

      {/* Gradient Pointer - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Gradient Pointer
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Radial gradient that follows the cursor with smooth easing. Perfect for hero sections, cards, and interactive backgrounds.
          </p>
        </div>
      </Card>

      {/* Custom Cursor - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Custom Cursor
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Replace the default cursor with custom designs. Includes context-aware cursors that change based on hover state and interaction type.
          </p>
        </div>
      </Card>

      {/* Magnetic Filings - Coming Soon */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Magnetic Filings
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Particles or elements that follow the cursor like iron filings to a magnet. Creates playful, physics-based interactions with configurable particle count and behavior.
          </p>
        </div>
      </Card>
    </div>
  );
}
