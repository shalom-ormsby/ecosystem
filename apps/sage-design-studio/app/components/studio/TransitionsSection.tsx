'use client';

import { Card } from '@sds/ui';

export function TransitionsSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Transitions
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
          Smooth state changes and content transitions. From tab switching to modal animations that create seamless user experiences.
        </p>
      </div>

      {/* Overview Card */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Overview
        </h2>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <p>
            Transitions connect interface states and guide users through changes. Well-designed transitions make interfaces
            feel cohesive and help users understand spatial and hierarchical relationships between elements.
          </p>
          <p>
            All transitions use hardware-accelerated CSS properties and respect system motion preferences for accessibility.
          </p>
        </div>
      </Card>

      {/* Smooth Tabs - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Smooth Tabs
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Tab switching with smooth content transitions and animated indicators. Includes horizontal and vertical layouts with optional lazy loading.
          </p>
        </div>
      </Card>

      {/* Stagger List - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Stagger List
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            List items that animate in with staggered delays. Perfect for search results, feeds, and any dynamic list content.
          </p>
        </div>
      </Card>

      {/* Modal & Drawer - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Modal & Drawer Animations
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Entrance and exit animations for modals and drawers. Includes fade, slide, scale, and custom transition options with backdrop blur.
          </p>
        </div>
      </Card>

      {/* Accordion - Coming Soon */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Accordion
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Smooth expand/collapse animations for accordion components. Height animations with proper overflow handling and accessible keyboard navigation.
          </p>
        </div>
      </Card>
    </div>
  );
}
