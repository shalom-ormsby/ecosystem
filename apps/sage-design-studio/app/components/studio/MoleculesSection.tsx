'use client';

import { useState, useEffect } from 'react';
import { Card, Code, TertiaryNav, CollapsibleCodeBlock } from '@ecosystem/design-system';
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

      {/* Sticky Tertiary Navigation for Molecule Selector */}
      <div className="sticky top-0 z-10 bg-[var(--color-background)] pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-4">
        <TertiaryNav
          items={molecules}
          activeId={selectedMolecule}
          onItemChange={setSelectedMolecule}
        />
      </div>

      {/* Molecule Display with spacing for sticky nav */}
      <div className="mt-4">
        {currentMolecule && (
          <section className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {selectedMolecule}
              </h3>
              {currentMolecule.sourceUrl && (
                <a
                  href={currentMolecule.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-3 py-1.5 rounded-lg
                    text-sm font-medium
                    text-[var(--color-text-secondary)]
                    bg-[var(--color-surface)]
                    border border-[var(--color-border)]
                    hover:bg-[var(--color-primary)]
                    hover:text-[var(--color-primary-foreground)]
                    hover:border-[var(--color-primary)]
                    transition-all duration-200
                    flex items-center gap-2
                  "
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  View Source
                </a>
              )}
            </div>
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
                        <Code syntax="property">
                          {propName}
                        </Code>
                        {propConfig.required && (
                          <span className="text-xs text-red-500">*required</span>
                        )}
                        {propConfig.type === 'array' || propConfig.type === 'object' ||
                         propConfig.type === 'interface' || propConfig.type === 'custom' ? (
                          <span className="text-xs font-mono text-[var(--color-text-muted)]">
                            {propConfig.typeDefinition || propConfig.type}
                          </span>
                        ) : (
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {propConfig.type}
                          </span>
                        )}
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
                        Default: <Code syntax="plain">{JSON.stringify(propConfig.default)}</Code>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Code Examples Section */}
          {currentMolecule.codeExamples && currentMolecule.codeExamples.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                Code Examples
              </h4>
              {currentMolecule.codeExamples.map((example, index) => (
                <div key={index} className="mb-4">
                  <CollapsibleCodeBlock
                    id={`${selectedMolecule}-code-${index}`}
                    title={example.title}
                    code={example.code}
                    defaultCollapsed={index > 0}
                    showCopy={true}
                  />
                  {example.description && (
                    <p className="text-sm text-[var(--color-text-secondary)] mt-2 ml-4">
                      {example.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
        )}
      </div>
    </div>
  );
}
