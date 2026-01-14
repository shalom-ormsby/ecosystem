'use client';

import { useState, useEffect } from 'react';
import { TertiaryNav, Breadcrumbs, type BreadcrumbItem } from '@ecosystem/design-system';
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
  breadcrumbs?: BreadcrumbItem[];
  onItemChange?: (itemId: string) => void;
}

export function MotionSections({ activeItemId, breadcrumbs, onItemChange }: MotionSectionsProps) {
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

  // Handle tab selection and notify parent
  const handleTabChange = (id: string) => {
    setActiveTab(id as MotionTab);
    onItemChange?.(id);
  };

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
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-4">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
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
