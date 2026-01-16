'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@sds/ui';
import { OverviewTab } from './OverviewTab';
import { InstallationTab } from './InstallationTab';
import { ToolsTab } from './ToolsTab';
import { UsageTab } from './UsageTab';
import { TroubleshootingTab } from './TroubleshootingTab';

type McpTab = 'overview' | 'installation' | 'tools' | 'usage' | 'troubleshooting';

interface McpSectionProps {
    activeItemId?: string;
    breadcrumbs?: BreadcrumbItemLegacy[];
    onItemChange?: (itemId: string) => void;
}

export function McpSection({ activeItemId, breadcrumbs, onItemChange }: McpSectionProps) {
    const [activeTab, setActiveTab] = useState<McpTab>('overview');

    // Update active tab when activeItemId changes
    useEffect(() => {
        const validTabs: McpTab[] = ['overview', 'installation', 'tools', 'usage', 'troubleshooting'];
        if (activeItemId && validTabs.includes(activeItemId as McpTab)) {
            setActiveTab(activeItemId as McpTab);
        } else {
            setActiveTab('overview');
        }
    }, [activeItemId]);

    return (
        <div className="w-full min-w-0">
            <div className="mb-0">
                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 1 && (
                    <div className="mb-6">
                        <Breadcrumbs variant="subtle" items={breadcrumbs} />
                    </div>
                )}
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'installation' && <InstallationTab />}
                {activeTab === 'tools' && <ToolsTab />}
                {activeTab === 'usage' && <UsageTab />}
                {activeTab === 'troubleshooting' && <TroubleshootingTab />}
            </div>
        </div>
    );
}
