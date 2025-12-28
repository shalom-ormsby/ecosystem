'use client';

import { useState } from 'react';
import { ColorsTab } from './ColorsTab';
import { TypographyTab } from './TypographyTab';

type TokenTab = 'colors' | 'typography' | 'spacing' | 'motion';

export function TokensSection() {
  const [activeTab, setActiveTab] = useState<TokenTab>('colors');

  const tabs: { id: TokenTab; label: string; available: boolean }[] = [
    { id: 'colors', label: 'Colors', available: true },
    { id: 'typography', label: 'Typography', available: true },
    { id: 'spacing', label: 'Spacing', available: false },
    { id: 'motion', label: 'Motion', available: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Design Tokens
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)]">
          The foundation of the design system. All visual properties reference these tokens.
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => tab.available && setActiveTab(tab.id)}
            disabled={!tab.available}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
              ${
                activeTab === tab.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : tab.available
                  ? 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                  : 'text-[var(--color-text-muted)] opacity-50 cursor-not-allowed'
              }
            `}
          >
            {tab.label}
            {!tab.available && ' (Coming Soon)'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'colors' && <ColorsTab />}
        {activeTab === 'typography' && <TypographyTab />}
        {activeTab === 'spacing' && <div>Coming Soon</div>}
        {activeTab === 'motion' && <div>Coming Soon</div>}
      </div>
    </div>
  );
}
