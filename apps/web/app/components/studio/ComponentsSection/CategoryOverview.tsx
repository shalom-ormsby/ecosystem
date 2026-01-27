'use client';

import { Heading, Text, Card, Badge } from '@thesage/ui';
import { COMPONENT_REGISTRY } from '@thesage/ui';
import { ArrowRight, MousePointerClick, FormInput, Compass, Layers, MessageSquare, BarChart3, Layout } from 'lucide-react';

interface CategoryOverviewProps {
  category: string;
  components: string[]; // Full list of component names in this category
  onComponentSelect: (componentName: string) => void;
}

const CATEGORY_METADATA = {
  actions: {
    label: 'Actions',
    description: 'Interactive elements that trigger behaviors',
    icon: <MousePointerClick className="w-12 h-12" />,
  },
  forms: {
    label: 'Forms',
    description: 'Input controls for data collection',
    icon: <FormInput className="w-12 h-12" />,
  },
  navigation: {
    label: 'Navigation',
    description: 'Components for moving through content',
    icon: <Compass className="w-12 h-12" />,
  },
  overlays: {
    label: 'Overlays',
    description: 'Contextual content layers',
    icon: <Layers className="w-12 h-12" />,
  },
  feedback: {
    label: 'Feedback',
    description: 'Status and system communication',
    icon: <MessageSquare className="w-12 h-12" />,
  },
  'data-display': {
    label: 'Data Display',
    description: 'Presenting information visually',
    icon: <BarChart3 className="w-12 h-12" />,
  },
  layout: {
    label: 'Layout',
    description: 'Structural and spacing components',
    icon: <Layout className="w-12 h-12" />,
  },
} as const;

export function CategoryOverview({ category, components, onComponentSelect }: CategoryOverviewProps) {
  const categoryKey = category as keyof typeof COMPONENT_REGISTRY.coreCategories;
  const categoryData = COMPONENT_REGISTRY.coreCategories[categoryKey];
  const metadata = CATEGORY_METADATA[categoryKey];

  if (!categoryData || !metadata) {
    return (
      <div className="text-center py-12">
        <Text variant="secondary">Category not found</Text>
      </div>
    );
  }

  // Use the provided components list (all components in this category)
  const allComponents = components;

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="text-[var(--color-primary)]">{metadata.icon}</div>
          <div>
            <Heading level={1} className="mb-2">
              {metadata.label}
            </Heading>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {categoryData.count} components
              </Badge>
            </div>
          </div>
        </div>
        <Text variant="secondary" size="lg" className="max-w-3xl">
          {categoryData.description}
        </Text>
      </div>

      {/* Components Grid */}
      <div>
        <Heading level={2} className="mb-4">
          Available Components
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allComponents.map((componentName) => {
            // Convert component name to kebab-case for navigation
            const kebabCase = componentName
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .toLowerCase();

            return (
              <button
                key={componentName}
                onClick={() => onComponentSelect(kebabCase)}
                className="text-left group"
              >
                <Card className="p-4 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <Heading
                      level={3}
                      className="text-base group-hover:text-[var(--color-primary)] transition-colors"
                    >
                      {componentName}
                    </Heading>
                    <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                  </div>
                  <Text variant="secondary" size="sm" className="line-clamp-2">
                    View documentation, examples, and API reference
                  </Text>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      {/* Usage Pattern Section */}
      <div className="border-t border-[var(--color-border)] pt-8">
        <Heading level={2} className="mb-4">
          When to Use {metadata.label}
        </Heading>
        <Text variant="secondary" className="max-w-3xl">
          {getCategoryUsageGuidance(categoryKey)}
        </Text>
      </div>
    </div>
  );
}

function getCategoryUsageGuidance(category: keyof typeof CATEGORY_METADATA): string {
  const guidance = {
    actions: 'Use action components when you need users to trigger an operation, submit data, or initiate a state change. These components are typically focusable and respond to user interaction.',
    forms: 'Form components are essential for collecting user input. They provide validation, accessibility features, and consistent styling across your application. Always use form components within a Form wrapper for optimal validation and error handling.',
    navigation: 'Navigation components help users move through your application structure. Use them to provide clear wayfinding, indicate current location, and enable efficient movement between pages or sections.',
    overlays: 'Overlay components display contextual information or actions without leaving the current page. They\'re ideal for confirmations, additional details, or temporary UI that shouldn\'t persist in the main layout.',
    feedback: 'Feedback components communicate system status, validation results, or process completion to users. They ensure users understand what\'s happening and whether actions succeeded or failed.',
    'data-display': 'Data display components present information in structured, scannable formats. Use them to organize content, highlight key information, and make data easy to understand and act upon.',
    layout: 'Layout components provide structure and spacing to your UI. They help create consistent, responsive layouts and manage how content flows and adapts across screen sizes.',
  };

  return guidance[category] || 'Select a component to view its documentation and examples.';
}
