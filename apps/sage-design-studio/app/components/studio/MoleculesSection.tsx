'use client';

import { useState, useEffect } from 'react';
import { TertiaryNav, Breadcrumbs, type BreadcrumbItem } from '@ecosystem/design-system';
import { moleculeRegistry } from '../lib/molecule-registry';
import { EnhancedComponentPlayground } from './ComponentsSection/EnhancedComponentPlayground';

interface MoleculesSectionProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItem[];
  onItemChange?: (itemId: string) => void;
}

export function MoleculesSection({ activeItemId, breadcrumbs, onItemChange }: MoleculesSectionProps) {
  const moleculeKeys = Object.keys(moleculeRegistry);
  const [selectedMolecule, setSelectedMolecule] = useState<string>(moleculeKeys[0]);

  // Update selected molecule when activeItemId changes
  useEffect(() => {
    if (activeItemId) {
      // Map kebab-case ids to PascalCase names (e.g., 'form-field' -> 'FormField')
      const moleculeName = activeItemId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      if (moleculeRegistry[moleculeName]) {
        setSelectedMolecule(moleculeName);
      }
    }
  }, [activeItemId]);

  // Handle molecule selection and notify parent
  const handleMoleculeChange = (moleculeName: string) => {
    setSelectedMolecule(moleculeName);
    // Convert PascalCase to kebab-case for parent state (e.g., 'FormField' -> 'form-field')
    const kebabCase = moleculeName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .slice(1);
    onItemChange?.(kebabCase);
  };

  const molecules = moleculeKeys.map((key) => ({
    id: key,
    label: key,
  }));

  const currentMolecule = moleculeRegistry[selectedMolecule];

  return (
    <div className="space-y-8 w-full min-w-0">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Molecules
        </h2>

        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>Functional Bonding:</strong> Simple groups of atoms bonded together to perform a single, specific task. Often highly reusable and context-agnostic.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mb-4">
          Self-contained units with singular purpose, like search bars and form fields.
        </p>

        {/* Breadcrumbs - positioned after title and description */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mt-6">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* Sticky Tertiary Navigation for Molecule Selector */}
      <div className="sticky top-0 z-10 bg-[var(--color-background)] pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-4">
        <TertiaryNav
          items={molecules}
          activeId={selectedMolecule}
          onItemChange={handleMoleculeChange}
          mode="standalone"
        />
      </div>

      {/* Molecule Playground with spacing for sticky nav */}
      <div className="mt-4">
        {currentMolecule && (
          <EnhancedComponentPlayground
            componentName={selectedMolecule}
            config={currentMolecule}
          />
        )}
      </div>
    </div>
  );
}
