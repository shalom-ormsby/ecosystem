'use client';

import { useState } from 'react';
import { TertiaryNav } from '@ecosystem/design-system';
import { ColorsTab } from './ColorsTab';
import { TypographyTab } from './TypographyTab';
import { SpacingTab } from './SpacingTab';

type TokenTab = 'colors' | 'typography' | 'spacing' | 'motion';

export function TokensSection() {
  const [activeTab, setActiveTab] = useState<TokenTab>('colors');

  // Available tabs for TertiaryNav
  const availableTabs = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
  ];

  // Coming soon tabs (shown separately)
  const comingSoonTabs = [
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
        {activeTab === 'motion' && <div>Coming Soon</div>}
      </div>
    </div>
  );
}
