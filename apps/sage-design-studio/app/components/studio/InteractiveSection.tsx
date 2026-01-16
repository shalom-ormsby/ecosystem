'use client';

import { Card } from '@sds/ui';

export function InteractiveSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Interactive Effects
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
          Responsive animations that react to user input. From magnetic buttons to 3D tilt effects that create delightful micro-interactions.
        </p>
      </div>

      {/* Overview Card */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Overview
        </h2>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <p>
            Interactive effects add playfulness and responsiveness to user interfaces. These components create engaging
            feedback loops that make interfaces feel alive and responsive to user input.
          </p>
          <p>
            All interactive effects are touch-friendly, performant, and degrade gracefully on devices with limited capabilities.
          </p>
        </div>
      </Card>

      {/* Tilt Card - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Tilt Card
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            3D tilt effect that follows mouse/touch position. Configurable tilt intensity, perspective, and glare effects.
          </p>
        </div>
      </Card>

      {/* Magnetic Button - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Magnetic Button
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Buttons that subtly move toward the cursor when nearby. Creates a playful, interactive feel with configurable magnetic strength and range.
          </p>
        </div>
      </Card>

      {/* Hover Effects - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Hover Effects
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Collection of sophisticated hover animations including spotlight effects, border animations, background shifts, and scale transforms.
          </p>
        </div>
      </Card>

      {/* Drag & Drop - Coming Soon */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Drag & Drop
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Smooth drag and drop with visual feedback, snap points, and reordering animations. Accessible with keyboard support.
          </p>
        </div>
      </Card>
    </div>
  );
}
