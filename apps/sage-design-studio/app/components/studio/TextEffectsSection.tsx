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
        <p className="text-lg text-[var(--color-text-secondary)] ">
          Dynamic text animations that bring typography to life. From subtle weight transitions to eye-catching gradient effects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Variable Weight Text Card */}
        <Card
          className="p-6 cursor-pointer group"
          hoverEffect={true}
          onClick={() => {
            window.location.hash = '#motion/variable-weight';
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors">Variable Weight</h2>
            <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Variable Font</span>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">Breathing font weight animation using font-variation-settings.</p>
          <div className="aspect-video bg-[var(--color-background)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
            <VariableWeightText
              minWeight={300}
              maxWeight={600}
              duration={2}
              className="text-3xl text-[var(--color-text-primary)]"
              fontFamily="Clash Display"
            >
              Aa
            </VariableWeightText>
          </div>
        </Card>

        {/* Typewriter Effect Card */}
        <Card
          className="p-6 cursor-pointer group"
          hoverEffect={true}
          onClick={() => {
            window.location.hash = '#motion/typewriter';
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors">Typewriter</h2>
            <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Coming Soon</span>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">Classic character-reveal animation.</p>
          <div className="aspect-video bg-[var(--color-background)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
            <span className="text-[var(--color-text-muted)] text-sm">Preview Coming Soon</span>
          </div>
        </Card>

        {/* Scroll Highlight Card */}
        <Card
          className="p-6 cursor-pointer group opacity-60"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-[var(--color-text-muted)]">Scroll Highlight</h2>
            <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Planned</span>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">Text highlights triggered by scroll position.</p>
          <div className="aspect-video bg-[var(--color-surface)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
            <span className="text-[var(--color-text-muted)] text-sm">Coming Soon</span>
          </div>
        </Card>

        {/* Gradient Text Card */}
        <Card
          className="p-6 cursor-pointer group opacity-60"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-[var(--color-text-muted)]">Gradient Text</h2>
            <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Planned</span>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">Animated gradient overlays for text.</p>
          <div className="aspect-video bg-[var(--color-surface)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
            <span className="text-[var(--color-text-muted)] text-sm">Coming Soon</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
