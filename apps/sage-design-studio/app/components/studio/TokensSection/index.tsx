'use client';

import { useState, useEffect } from 'react';
import { TertiaryNav, Breadcrumbs, type BreadcrumbItemLegacy } from '@sds/ui';
import { ColorsTab } from './ColorsTab';
import { TypographyTab } from './TypographyTab';
import { SpacingTab } from './SpacingTab';
import { MotionTab } from './MotionTab';
import { SyntaxTab } from './SyntaxTab';

type TokenTab = 'colors' | 'typography' | 'spacing' | 'syntax' | 'motion';

interface TokensSectionProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItemLegacy[];
  onItemChange?: (itemId: string) => void;
}

export function TokensSection({ activeItemId, breadcrumbs, onItemChange }: TokensSectionProps) {
  const [activeTab, setActiveTab] = useState<TokenTab>('colors');

  // Update active tab when activeItemId changes
  useEffect(() => {
    if (activeItemId && ['colors', 'typography', 'spacing', 'syntax', 'motion'].includes(activeItemId)) {
      setActiveTab(activeItemId as TokenTab);
    }
  }, [activeItemId]);

  // Handle tab selection and notify parent
  const handleTabChange = (id: string) => {
    setActiveTab(id as TokenTab);
    onItemChange?.(id);
  };

  // Available tabs for TertiaryNav
  const availableTabs = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'syntax', label: 'Syntax' },
    { id: 'motion', label: 'Motion' },
  ];

  return (
    <div className="w-full min-w-0">
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
        {activeTab === 'colors' && <ColorsTab />}
        {activeTab === 'typography' && <TypographyTab />}
        {activeTab === 'spacing' && <SpacingTab />}
        {activeTab === 'syntax' && <SyntaxTab />}
        {activeTab === 'motion' && <MotionTab />}
      </div>
    </div>
  );
}
