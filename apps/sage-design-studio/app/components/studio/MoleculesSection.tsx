'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@sds/ui';
import { moleculeRegistry } from '../lib/molecule-registry';
import { EnhancedComponentPlayground } from './ComponentsSection/EnhancedComponentPlayground';

interface MoleculesSectionProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItemLegacy[];
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
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-8">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
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
