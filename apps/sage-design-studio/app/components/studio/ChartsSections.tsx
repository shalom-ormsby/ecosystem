'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@sage/ui';
import { Card } from '@sage/ui';

type ChartsTab = 'overview' | 'area-chart' | 'bar-chart' | 'line-chart' | 'pie-chart';

interface ChartsSectionsProps {
    activeItemId?: string;
    breadcrumbs?: BreadcrumbItemLegacy[];
    onItemChange?: (itemId: string) => void;
}

export function ChartsSections({ activeItemId, breadcrumbs, onItemChange }: ChartsSectionsProps) {
    const [activeTab, setActiveTab] = useState<ChartsTab>('overview');

    useEffect(() => {
        if (activeItemId) {
            setActiveTab(activeItemId as ChartsTab);
        }
    }, [activeItemId]);

    return (
        <div>
            <div className="mb-8">
                {breadcrumbs && breadcrumbs.length > 1 && (
                    <div className="mb-4">
                        <Breadcrumbs variant="subtle" items={breadcrumbs} />
                    </div>
                )}
            </div>

            <div className="mt-4">
                {activeTab === 'overview' && (
                    <section className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">Charts</h1>
                            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                                Beautiful, responsive, and composable charts built with Recharts and styled with Tailwind CSS.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Area Chart</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">Stacked, gradient, and percent area charts.</p>
                                </Card>
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Bar Chart</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">Vertical, horizontal, stacked, and grouped bar charts.</p>
                                </Card>
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Line Chart</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">Multi-axis, step, and smooth line charts.</p>
                                </Card>
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Pie Chart</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">Pie and donut charts with center content.</p>
                                </Card>
                            </div>
                        </div>
                    </section>
                )}

                {['area-chart', 'bar-chart', 'line-chart', 'pie-chart'].includes(activeTab) && (
                    <section className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
                                {activeTab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </h1>
                            <Card className="p-12 flex items-center justify-center border-dashed">
                                <p className="text-[var(--color-text-tertiary)]">Component coming soon in @sage/charts</p>
                            </Card>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
