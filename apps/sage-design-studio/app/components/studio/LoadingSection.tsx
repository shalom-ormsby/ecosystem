'use client';

import { Card } from '@sds/ui';

export function LoadingSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Loading States
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
          Communicate progress and maintain user engagement during loading states with skeleton screens, progress indicators, and spinners.
        </p>
      </div>

      {/* Overview Card */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Overview
        </h2>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <p>
            Loading states reduce perceived wait time and provide feedback during asynchronous operations. Well-designed
            loading indicators help users understand that the system is working and set appropriate expectations.
          </p>
          <p>
            Our loading components are optimized for performance, accessible, and automatically respect motion preferences.
          </p>
        </div>
      </Card>

      {/* Skeleton Screens - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Skeleton Screens
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Content placeholders that match the shape of incoming content. Includes prebuilt skeletons for common patterns and a flexible skeleton builder.
          </p>
        </div>
      </Card>

      {/* Progress Bar - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Progress Bar
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Linear and circular progress indicators for determinate and indeterminate loading. Includes variants for file uploads, page loads, and multi-step processes.
          </p>
        </div>
      </Card>

      {/* Spinner - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Spinner
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Animated loading spinners for quick operations. Multiple styles including dots, rings, and custom branded animations.
          </p>
        </div>
      </Card>

      {/* Fill Animation - Coming Soon */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Fill Animation
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Creative loading animations using fills, waves, and liquid effects. Perfect for splash screens and branded loading experiences.
          </p>
        </div>
      </Card>
    </div>
  );
}
