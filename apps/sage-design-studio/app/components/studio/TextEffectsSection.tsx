'use client';

import { Card, CollapsibleCodeBlock } from '@sds/ui';
import { VariableWeightText } from '@sds/ui';
import { Check } from 'lucide-react';

export function TextEffectsSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Text Effects
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
          Dynamic text animations that bring typography to life. From subtle weight transitions to eye-catching gradient effects.
        </p>
      </div>

      {/* Overview Card */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Overview
        </h2>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <p>
            Text effects add visual interest and guide user attention through dynamic typography. Our text effect components
            provide smooth, performant animations that enhance readability and create engaging user experiences.
          </p>
          <p>
            All text effects respect accessibility preferences and degrade gracefully when reduced motion is enabled.
          </p>
        </div>
      </Card>

      {/* Variable Weight Text */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Variable Weight Text
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          For variable fonts (like <strong>Clash Display</strong>), use the <code className="px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">VariableWeightText</code> component to create a silky-smooth "breathing" effect that animates font weight.
          This animation uses <code className="px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">font-variation-settings</code> for true variable font interpolation.
        </p>
        <div className="mb-6 p-4 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)] mb-2">
            <strong>Performance Optimizations:</strong>
          </p>
          <ul className="text-xs text-[var(--color-text-muted)] space-y-1">
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[var(--color-primary)]" /> Uses true variable font (continuous weight axis from 200-700)</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[var(--color-primary)]" /> GPU-accelerated with <code className="px-1 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">will-change</code></li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[var(--color-primary)]" /> Custom easing curve <code className="px-1 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">[0.45, 0, 0.55, 1]</code> for ultra-smooth motion</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[var(--color-primary)]" /> Font smoothing (antialiased) for crisp rendering</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[var(--color-primary)]" /> Centered to prevent layout shifts during weight changes</li>
          </ul>
        </div>

        {/* Live Demo */}
        <div className="mb-6 p-8 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
          <VariableWeightText
            minWeight={200}
            maxWeight={700}
            duration={2}
            className="text-4xl text-[var(--color-text-primary)]"
          >
            Clash Display
          </VariableWeightText>
        </div>

        {/* Code Example */}
        <CollapsibleCodeBlock
          id="variable-weight-text-code"
          code={`import { VariableWeightText } from '@sds/ui';

<VariableWeightText minWeight={200} maxWeight={700}>
  Clash Display
</VariableWeightText>`}
          defaultCollapsed={false}
          showCopy={true}
        />

        <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)]">
            <strong>Note:</strong> The VariableWeightText component defaults to using Clash Display, but you can override with the <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">fontFamily</code> prop to use any variable font.
          </p>
        </div>
      </Card>

      {/* Typewriter Effect - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Typewriter Effect
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Classic typewriter animation that reveals text character by character. Configurable speed, cursor style, and loop behavior.
          </p>
        </div>
      </Card>

      {/* Scroll Highlight - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Scroll Highlight
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Progressive text highlighting as user scrolls. Great for long-form content and storytelling experiences.
          </p>
        </div>
      </Card>

      {/* Letter Stagger - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Letter Stagger
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Staggered animations where each letter animates with a slight delay. Perfect for headings and attention-grabbing text.
          </p>
        </div>
      </Card>

      {/* Gradient Text - Coming Soon */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Gradient Text
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Animated gradient overlays on text with customizable colors, directions, and animation speed. Theme-aware with automatic color adaptation.
          </p>
        </div>
      </Card>
    </div>
  );
}
