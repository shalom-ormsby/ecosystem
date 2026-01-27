'use client';

import { useState } from 'react';
import { Heading, Text, Badge, Card, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@thesage/ui';
import { COMPONENT_REGISTRY, COMPONENT_COUNTS } from '@thesage/ui';
import { Package, ChevronDown, ArrowRight, MousePointerClick, FormInput, Compass, Layers, MessageSquare, BarChart3, Layout } from 'lucide-react';

interface ComponentsDashboardProps {
  onNavigate?: (section: string, itemId?: string) => void;
}

const CATEGORY_ICONS = {
  actions: <MousePointerClick className="w-5 h-5" />,
  forms: <FormInput className="w-5 h-5" />,
  navigation: <Compass className="w-5 h-5" />,
  overlays: <Layers className="w-5 h-5" />,
  feedback: <MessageSquare className="w-5 h-5" />,
  'data-display': <BarChart3 className="w-5 h-5" />,
  layout: <Layout className="w-5 h-5" />,
} as const;

export function ComponentsDashboard({ onNavigate }: ComponentsDashboardProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryKey)
        ? prev.filter(k => k !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const expandAll = () => {
    setExpandedCategories(Object.keys(COMPONENT_REGISTRY.coreCategories));
  };

  const collapseAll = () => {
    setExpandedCategories([]);
  };

  const handleComponentClick = (categoryKey: string, componentName: string) => {
    const kebabCase = componentName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
    onNavigate?.(categoryKey, kebabCase);
  };

  const handleCategoryClick = (categoryKey: string) => {
    onNavigate?.(categoryKey);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8 text-[var(--color-primary)]" />
          <Heading level={1}>Component Library</Heading>
        </div>
        <Text variant="secondary" size="lg" className="max-w-3xl">
          Browse all {COMPONENT_COUNTS.total} components organized into {Object.keys(COMPONENT_REGISTRY.coreCategories).length} functional categories. Click a category to view its overview page, or expand to see all components.
        </Text>
      </div>

      {/* Expand/Collapse Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={expandAll}
          className="text-sm text-[var(--color-primary)] hover:underline"
        >
          Expand All
        </button>
        <span className="text-[var(--color-text-muted)]">|</span>
        <button
          onClick={collapseAll}
          className="text-sm text-[var(--color-primary)] hover:underline"
        >
          Collapse All
        </button>
      </div>

      {/* Categories Accordion */}
      <div className="space-y-3">
        {Object.entries(COMPONENT_REGISTRY.coreCategories).map(([categoryKey, categoryData]) => {
          const isExpanded = expandedCategories.includes(categoryKey);
          const icon = CATEGORY_ICONS[categoryKey as keyof typeof CATEGORY_ICONS];

          // Format category label
          const displayLabel = categoryKey
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <Card key={categoryKey} className="overflow-hidden">
              {/* Category Header - Clickable to navigate to category page */}
              <button
                onClick={() => handleCategoryClick(categoryKey)}
                className="w-full text-left p-4 hover:bg-[var(--color-hover)] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-[var(--color-primary)]">{icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Heading level={3} className="text-base group-hover:text-[var(--color-primary)] transition-colors">
                          {displayLabel}
                        </Heading>
                        <Badge variant="secondary" size="sm">
                          {categoryData.count}
                        </Badge>
                      </div>
                      <Text variant="secondary" size="sm">
                        {categoryData.description}
                      </Text>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                </div>
              </button>

              {/* Expand/Collapse Toggle */}
              <div className="border-t border-[var(--color-border)]">
                <button
                  onClick={() => toggleCategory(categoryKey)}
                  className="w-full px-4 py-2 flex items-center justify-between hover:bg-[var(--color-hover)] transition-colors text-sm"
                >
                  <Text variant="secondary" size="sm">
                    {isExpanded ? 'Hide' : 'Show'} all components
                  </Text>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Component List */}
              {isExpanded && (
                <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {categoryData.examples.map((componentName) => (
                      <button
                        key={componentName}
                        onClick={() => handleComponentClick(categoryKey, componentName)}
                        className="text-left px-3 py-2 rounded-md hover:bg-[var(--color-hover)] transition-colors group"
                      >
                        <Text
                          size="sm"
                          className="group-hover:text-[var(--color-primary)] transition-colors"
                        >
                          {componentName}
                        </Text>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Specialty Components Note */}
      <div className="text-center pt-4 border-t border-[var(--color-border)]">
        <Text variant="muted" size="sm">
          Plus <Text as="span" weight="semibold" variant="secondary">{COMPONENT_COUNTS.specialty} specialty components</Text> for backgrounds, cursor effects, and blocks
        </Text>
      </div>
    </div>
  );
}
