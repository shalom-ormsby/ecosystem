'use client';

import { useState, useEffect } from 'react';
import { TertiaryNav } from '@ecosystem/design-system';
import { ColorsTab } from './ColorsTab';
import { TypographyTab } from './TypographyTab';
import { SpacingTab } from './SpacingTab';
import { MotionTab } from './MotionTab';

type TokenTab = 'colors' | 'typography' | 'spacing' | 'motion';

interface TokensSectionProps {
  activeItemId?: string;
}

export function TokensSection({ activeItemId }: TokensSectionProps) {
  const [activeTab, setActiveTab] = useState<TokenTab>('colors');

  // Update active tab when activeItemId changes
  useEffect(() => {
    if (activeItemId && ['colors', 'typography', 'spacing', 'motion'].includes(activeItemId)) {
      setActiveTab(activeItemId as TokenTab);
    }
  }, [activeItemId]);

  // Available tabs for TertiaryNav
  const availableTabs = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'motion', label: 'Motion' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Design Tokens
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)]">
          The foundation of the design system. All visual properties reference these tokens.
        </p>
      </div>

      {/* Sticky Tertiary Navigation for Token Tabs */}
      <TertiaryNav
        items={availableTabs}
        activeId={activeTab}
        onItemChange={(id) => setActiveTab(id as TokenTab)}
      />

      {/* Tab Content with spacing for sticky nav */}
      <div className="mt-8">
        {activeTab === 'colors' && <ColorsTab />}
        {activeTab === 'typography' && <TypographyTab />}
        {activeTab === 'spacing' && <SpacingTab />}
        {activeTab === 'motion' && <MotionTab />}
      </div>
    </div>
  );
}
