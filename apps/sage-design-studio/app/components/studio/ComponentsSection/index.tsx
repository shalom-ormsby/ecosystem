'use client';

import { useState } from 'react';
import { ComponentPlayground } from './ComponentPlayground';
import { componentRegistry } from '../../lib/component-registry';

export function ComponentsSection() {
  const [selectedComponent, setSelectedComponent] = useState<string>('Button');

  const components = Object.keys(componentRegistry);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Atoms
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Interactive component playground. Adjust props and see live changes.
        </p>
      </div>

      {/* Component Selector */}
      <div className="flex flex-wrap gap-2">
        {components.map((name) => (
          <button
            key={name}
            onClick={() => setSelectedComponent(name)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                selectedComponent === name
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]'
              }
            `}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Component Playground */}
      {selectedComponent && (
        <ComponentPlayground
          componentName={selectedComponent}
          config={componentRegistry[selectedComponent]}
        />
      )}
    </div>
  );
}
