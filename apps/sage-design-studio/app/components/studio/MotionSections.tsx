'use client';

import { useState, useEffect } from 'react';
import { TertiaryNav } from '@ecosystem/design-system';
import { MotionFoundationsSection } from './MotionFoundationsSection';
import { TextEffectsSection } from './TextEffectsSection';
import { ScrollSection } from './ScrollSection';
import { LoadingSection } from './LoadingSection';
import { InteractiveSection } from './InteractiveSection';
import { TransitionsSection } from './TransitionsSection';
import { CursorEffectsSection } from './CursorEffectsSection';

type MotionTab = 'motion-foundations' | 'text-effects' | 'scroll' | 'loading' | 'interactive' | 'transitions' | 'cursor-effects';

interface MotionSectionsProps {
  activeItemId?: string;
}

export function MotionSections({ activeItemId }: MotionSectionsProps) {
  const [activeTab, setActiveTab] = useState<MotionTab>('motion-foundations');

  // Update active tab when activeItemId changes
  useEffect(() => {
    if (activeItemId && [
      'motion-foundations',
      'text-effects',
      'scroll',
      'loading',
      'interactive',
      'transitions',
      'cursor-effects'
    ].includes(activeItemId)) {
      setActiveTab(activeItemId as MotionTab);
    }
  }, [activeItemId]);

  // Available tabs for TertiaryNav
  const availableTabs = [
    { id: 'motion-foundations', label: 'Foundations' },
    { id: 'text-effects', label: 'Text Effects' },
    { id: 'scroll', label: 'Scroll' },
    { id: 'loading', label: 'Loading' },
    { id: 'interactive', label: 'Interactive' },
    { id: 'transitions', label: 'Transitions' },
    { id: 'cursor-effects', label: 'Cursor Effects' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Motion
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Bring your interfaces to life with purposeful animations and transitions.
        </p>
      </div>

      {/* Sticky Tertiary Navigation for Motion Tabs */}
      <div className="sticky top-0 z-10 bg-[var(--color-background)] pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-4">
        <TertiaryNav
          items={availableTabs}
          activeId={activeTab}
          onItemChange={(id) => setActiveTab(id as MotionTab)}
        />
      </div>

      {/* Tab Content with spacing for sticky nav */}
      <div className="mt-4">
        {activeTab === 'motion-foundations' && <MotionFoundationsSection />}
        {activeTab === 'text-effects' && <TextEffectsSection />}
        {activeTab === 'scroll' && <ScrollSection />}
        {activeTab === 'loading' && <LoadingSection />}
        {activeTab === 'interactive' && <InteractiveSection />}
        {activeTab === 'transitions' && <TransitionsSection />}
        {activeTab === 'cursor-effects' && <CursorEffectsSection />}
      </div>
    </div>
  );
}
