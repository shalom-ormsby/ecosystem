'use client';

import { useState, useEffect } from 'react';
import { Card, TertiaryNav } from '@ecosystem/design-system';
import { moleculeRegistry } from '../lib/molecule-registry';

interface MoleculesSectionProps {
  activeItemId?: string;
}

export function MoleculesSection({ activeItemId }: MoleculesSectionProps) {
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

  const molecules = moleculeKeys.map((key) => ({
    id: key,
    label: key,
  }));

  const currentMolecule = moleculeRegistry[selectedMolecule];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Molecules
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>Functional Bonding:</strong> Simple groups of atoms bonded together to perform a single, specific task. Often highly reusable and context-agnostic.
        </p>
        <p className="text-base text-[var(--color-text-muted)]">
          Self-contained units with singular purpose, like search bars and form fields.
        </p>
      </div>

      {/* Molecule Selector */}
      <TertiaryNav
        items={molecules}
        activeId={selectedMolecule}
        onItemChange={setSelectedMolecule}
      />

      {/* Molecule Display */}
      {currentMolecule && (
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
              {selectedMolecule}
            </h3>
            <Card className="p-6">
              <p className="text-[var(--color-text-primary)]">
                {currentMolecule.description}
              </p>
            </Card>
          </div>

          {/* Examples */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
              Examples
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentMolecule.examples.map((example, index) => (
                <Card key={index} className="p-6">
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      {example.label}
                    </h5>
                  </div>
                  <div className="flex items-center justify-center min-h-[60px]">
                    <currentMolecule.component {...example.props}>
                      {example.children}
                    </currentMolecule.component>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Props Documentation */}
          {Object.keys(currentMolecule.props).length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                Props
              </h4>
              <Card className="p-6">
                <div className="space-y-4">
                  {Object.entries(currentMolecule.props).map(([propName, propConfig]) => (
                    <div key={propName} className="border-b border-[var(--color-border)] last:border-0 pb-4 last:pb-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <code className="text-sm font-mono text-[var(--color-primary)]">
                          {propName}
                        </code>
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {propConfig.type}
                        </span>
                      </div>
                      {propConfig.description && (
                        <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                          {propConfig.description}
                        </p>
                      )}
                      {propConfig.options && (
                        <div className="text-xs text-[var(--color-text-muted)]">
                          Options: {propConfig.options.join(', ')}
                        </div>
                      )}
                      <div className="text-xs text-[var(--color-text-muted)]">
                        Default: <code className="text-[var(--color-primary)]">{JSON.stringify(propConfig.default)}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
