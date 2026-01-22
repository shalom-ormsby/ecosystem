'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@sage/ui';
import { PalettesTab } from './PalettesTab';
import { CustomizerTab } from './CustomizerTab';

type ThemeTab = 'palettes' | 'customizer';

interface ThemesSectionProps {
    activeItemId?: string;
    breadcrumbs?: BreadcrumbItemLegacy[];
    onItemChange?: (itemId: string) => void;
}

export function ThemesSection({ activeItemId, breadcrumbs, onItemChange }: ThemesSectionProps) {
    const [activeTab, setActiveTab] = useState<ThemeTab>('palettes');

    // Update active tab when activeItemId changes
    useEffect(() => {
        if (activeItemId && ['palettes', 'customizer'].includes(activeItemId)) {
            setActiveTab(activeItemId as ThemeTab);
        }
    }, [activeItemId]);

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
                {activeTab === 'palettes' && <PalettesTab />}
                {activeTab === 'customizer' && <CustomizerTab />}
            </div>
        </div>
    );
}
