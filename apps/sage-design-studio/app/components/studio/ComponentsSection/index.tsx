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

export function ComponentsSection({ activeItemId, breadcrumbs, onItemChange }: ComponentsSectionProps) {
  const [selectedComponent, setSelectedComponent] = useState<string>('Button');

  // Update selected component when activeItemId changes
  useEffect(() => {
    if (activeItemId) {
      // Convert lowercase id to PascalCase component name (e.g., 'button' -> 'Button')
      const componentName = activeItemId.charAt(0).toUpperCase() + activeItemId.slice(1);
      if (componentRegistry[componentName]) {
        setSelectedComponent(componentName);
      }
    }
  }, [activeItemId]);

  // Handle component selection and notify parent
  const handleComponentChange = (componentName: string) => {
    setSelectedComponent(componentName);
    // Convert PascalCase to lowercase for parent state (e.g., 'Button' -> 'button')
    const lowercase = componentName.toLowerCase();
    onItemChange?.(lowercase);
  };

  const components = Object.keys(componentRegistry);
  const componentItems = components.map(name => ({ id: name, label: name }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Atoms
        </h2>

        {/* Breadcrumbs - positioned after title, before description */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-4">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}

        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>Elemental Independence:</strong> Elements that cannot be broken down further without losing their core identity or function.
        </p>
        <p className="text-base text-[var(--color-text-muted)]">
          Interactive component playground. Adjust props and see live changes.
        </p>
      </div>

      {/* Sticky Tertiary Navigation for Component Selector */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 mb-4">
        <TertiaryNav
          items={componentItems}
          activeId={selectedComponent}
          onItemChange={handleComponentChange}
          mode="standalone"
        />
      </div>

      {/* Component Playground with spacing for sticky nav */}
      <div className="mt-4">
        {selectedComponent && (
          <EnhancedComponentPlayground
            componentName={selectedComponent}
            config={componentRegistry[selectedComponent]}
          />
        )}
      </div>
    </div>
  );
}
