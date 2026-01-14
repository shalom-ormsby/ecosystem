'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItem } from '@ecosystem/design-system';
import { EnhancedComponentPlayground } from './EnhancedComponentPlayground';
import { componentRegistry } from '../../lib/component-registry';

interface ComponentsSectionProps {
  activeItemId?: string;
  category?: string;
  breadcrumbs?: BreadcrumbItem[];
  onItemChange?: (itemId: string) => void;
}

// Functional category organization
const COMPONENT_CATEGORIES = {
  actions: {
    label: 'Actions',
    description: 'Interactive elements that trigger behaviors',
    components: ['Button', 'Toggle', 'ToggleGroup'],
  },
  forms: {
    label: 'Forms',
    description: 'Input controls for data collection',
    components: ['Checkbox', 'Combobox', 'Form', 'Input', 'InputOTP', 'Label', 'RadioGroup', 'Select', 'Slider', 'Switch', 'Textarea'],
  },
  navigation: {
    label: 'Navigation',
    description: 'Components for moving through content',
    components: ['Breadcrumb', 'Command', 'Menubar', 'NavigationMenu', 'Pagination', 'Tabs'],
  },
  overlays: {
    label: 'Overlays',
    description: 'Contextual content layers',
    components: ['AlertDialog', 'ContextMenu', 'Dialog', 'Drawer', 'DropdownMenu', 'HoverCard', 'Popover', 'Sheet', 'Tooltip'],
  },
  feedback: {
    label: 'Feedback',
    description: 'Status and system communication',
    components: ['Alert', 'Progress', 'Skeleton', 'Toaster'],
  },
  'data-display': {
    label: 'Data Display',
    description: 'Presenting information visually',
    components: ['Avatar', 'Badge', 'Calendar', 'Card', 'DataTable', 'Table'],
  },
  layout: {
    label: 'Layout',
    description: 'Structural and spacing components',
    components: ['Accordion', 'AspectRatio', 'Carousel', 'Collapsible', 'DatePicker', 'ResizablePanelGroup', 'ScrollArea', 'Separator'],
  },
  // Legacy components (not yet migrated to functional categories)
  legacy: {
    label: 'Legacy',
    description: 'Components from @ecosystem/design-system',
    components: ['Code', 'Link', 'ProgressBar', 'Spinner', 'Switch'],
  },
};

export function ComponentsSection({ activeItemId, category, breadcrumbs, onItemChange }: ComponentsSectionProps) {
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'actions');

  // Update selected category when prop changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  // Update selected component when activeItemId changes
  useEffect(() => {
    if (activeItemId) {
      // Convert kebab-case to PascalCase (e.g., 'progress-bar' -> 'ProgressBar', 'switch' -> 'Switch')
      const componentName = activeItemId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      if (componentRegistry[componentName]) {
        setSelectedComponent(componentName);

        // If no category provided, infer it (fallback)
        if (!category) {
          for (const [categoryKey, cat] of Object.entries(COMPONENT_CATEGORIES)) {
            if (cat.components.includes(componentName)) {
              setSelectedCategory(categoryKey);
              break;
            }
          }
        }
      }
    }
  }, [activeItemId, category]);

  // Handle component selection and notify parent
  const handleComponentChange = (componentName: string) => {
    setSelectedComponent(componentName);
    // Convert PascalCase to kebab-case (e.g., 'ProgressBar' -> 'progress-bar', 'Button' -> 'button')
    const kebabCase = componentName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
    onItemChange?.(kebabCase);
  };

  // Get components for the selected category
  const categoryComponents = COMPONENT_CATEGORIES[selectedCategory as keyof typeof COMPONENT_CATEGORIES]?.components || [];
  const availableComponents = categoryComponents.filter(name => componentRegistry[name]);
  const componentItems = availableComponents.map(name => ({ id: name, label: name }));

  // Category navigation items
  const categoryItems = Object.entries(COMPONENT_CATEGORIES).map(([key, category]) => ({
    id: key,
    label: category.label,
  }));

  return (
    <div className="space-y-8">
      <div>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-4">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* Component Playground */}

      {/* Component Playground */}
      <div className="mt-4">
        {selectedComponent && componentRegistry[selectedComponent] && (
          <EnhancedComponentPlayground
            componentName={selectedComponent}
            config={componentRegistry[selectedComponent]}
          />
        )}
      </div>
    </div>
  );
}
