'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@sds/ui';

// Landing Pages
import { PrimitivesSection } from './PrimitivesSection';
import { TextEffectsSection } from './TextEffectsSection';
import { BackgroundsSection } from './BackgroundsSection';
import { CursorsSection } from './CursorsSection';
import { MicroInteractionsSection } from './MicroInteractionsSection';

// Detail Pages
import { WarpSpeedPage } from './pages/motion/WarpSpeedPage';
import { FaultyTerminalPage } from './pages/motion/FaultyTerminalPage';
import { SplashCursorPage } from './pages/motion/SplashCursorPage';
import { TargetCursorPage } from './pages/motion/TargetCursorPage';
import { VariableWeightPage } from './pages/motion/VariableWeightPage';

type MotionTab =
  | 'primitives' | 'duration' | 'easing'
  | 'text-effects' | 'variable-weight' | 'typewriter'
  | 'backgrounds' | 'warp-speed' | 'faulty-terminal'
  | 'cursors' | 'target-cursor' | 'splash-cursor'
  | 'micro-interactions' | 'magnetic';

interface MotionSectionsProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItemLegacy[];
  onItemChange?: (itemId: string) => void;
}

export function MotionSections({ activeItemId, breadcrumbs, onItemChange }: MotionSectionsProps) {
  const [activeTab, setActiveTab] = useState<MotionTab>('primitives');

  // Update active tab when activeItemId changes
  useEffect(() => {
    if (activeItemId) {
      // We cast here assuming the navigation tree provides valid IDs that match our MotionTab type
      // in a real app you might want to validate this more strictly
      setActiveTab(activeItemId as MotionTab);
    }
  }, [activeItemId]);

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
        {/* Primitives */}
        {activeTab === 'primitives' && <PrimitivesSection />}
        {activeTab === 'duration' && <PrimitivesSection />} {/* Redirect old duration tab */}
        {activeTab === 'easing' && <PrimitivesSection />} {/* Redirect old easing tab */}

        {/* Text Effects */}
        {activeTab === 'text-effects' && <TextEffectsSection />}
        {activeTab === 'variable-weight' && <VariableWeightPage />}

        {/* Typewriter placeholder removed */}

        {/* Backgrounds */}
        {activeTab === 'backgrounds' && <BackgroundsSection />}
        {activeTab === 'warp-speed' && <WarpSpeedPage />}
        {activeTab === 'faulty-terminal' && <FaultyTerminalPage />}

        {/* Cursors */}
        {activeTab === 'cursors' && <CursorsSection />}
        {activeTab === 'target-cursor' && <TargetCursorPage />}
        {activeTab === 'splash-cursor' && <SplashCursorPage />}

        {/* Micro Interactions */}
        {activeTab === 'micro-interactions' && <MicroInteractionsSection />}
        {/* Magnetic placeholder removed */}
      </div>
    </div>
  );
}
