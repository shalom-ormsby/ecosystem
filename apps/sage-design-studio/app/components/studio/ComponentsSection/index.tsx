'use client';

import { useState, useEffect } from 'react';
import { TertiaryNav, Breadcrumbs, type BreadcrumbItem } from '@ecosystem/design-system';
import { EnhancedComponentPlayground } from './EnhancedComponentPlayground';
import { componentRegistry } from '../../lib/component-registry';

interface ComponentsSectionProps {
  activeItemId?: string;
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

export function ComponentsSection({ activeItemId, breadcrumbs, onItemChange }: ComponentsSectionProps) {
  const [selectedComponent, setSelectedComponent] = useState<string>('Button');
  const [selectedCategory, setSelectedCategory] = useState<string>('actions');

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
        // Find which category this component belongs to
        for (const [categoryKey, category] of Object.entries(COMPONENT_CATEGORIES)) {
          if (category.components.includes(componentName)) {
            setSelectedCategory(categoryKey);
            break;
          }
        }
      }
    }
  }, [activeItemId]);

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
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Components
        </h2>

        {/* Breadcrumbs - positioned after title, before description */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-4">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}

        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>Functional Organization:</strong> Components organized by their primary purpose and use case.
        </p>
        <p className="text-base text-[var(--color-text-muted)]">
          Interactive component playground. Adjust props and see live changes. Components are grouped by function for better discoverability.
        </p>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 mb-2 bg-[var(--color-background)] pb-2 border-b border-[var(--color-border-subtle)]">
        <div className="px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2">Category</h3>
          <TertiaryNav
            items={categoryItems}
            activeId={selectedCategory}
            onItemChange={setSelectedCategory}
            mode="standalone"
          />
        </div>
      </div>

      {/* Category Description */}
      {COMPONENT_CATEGORIES[selectedCategory as keyof typeof COMPONENT_CATEGORIES] && (
        <div className="px-2">
          <p className="text-base text-[var(--color-text-muted)] italic">
            {COMPONENT_CATEGORIES[selectedCategory as keyof typeof COMPONENT_CATEGORIES].description}
          </p>
        </div>
      )}

      {/* Component Selector within Category */}
      <div className="sticky top-20 z-10 -mx-4 sm:-mx-6 lg:-mx-8 mb-4">
        <TertiaryNav
          items={componentItems}
          activeId={selectedComponent}
          onItemChange={handleComponentChange}
          mode="standalone"
        />
      </div>

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
