'use client';

import { useState } from 'react';
import { Card } from '@ecosystem/design-system';
import type { ComponentConfig } from '../../lib/component-registry';
import { CodeSnippet } from './CodeSnippet';
import { JsonLdMetadata } from '../../JsonLdMetadata';
import { generateComponentMetadata } from '../../../lib/metadata-generator';
import { Accessibility } from 'lucide-react';

interface ComponentPlaygroundProps {
  componentName: string;
  config: ComponentConfig;
}

export function ComponentPlayground({ componentName, config }: ComponentPlaygroundProps) {
  // Generate JSON-LD metadata for this component
  const metadata = generateComponentMetadata(config, componentName);
  const [props, setProps] = useState<Record<string, any>>(
    Object.fromEntries(
      Object.entries(config.props).map(([key, propConfig]) => [key, propConfig.default])
    )
  );

  const Component = config.component;

  // Generate code snippet
  const generateCodeSnippet = () => {
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        // Skip props not in config or with default values
        if (!config.props[key]) return false;
        return value !== config.props[key].default;
      })
      .map(([key, value]) => {
        if (typeof value === 'boolean') return `${key}={${value}}`;
        if (typeof value === 'string') return `${key}="${value}"`;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `<${componentName}${propsStr ? ' ' + propsStr : ''}>
  Click me
</${componentName}>`;
  };

  const updateProp = (key: string, value: any) => {
    setProps((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* JSON-LD Metadata for LLM optimization */}
      <JsonLdMetadata data={metadata} />

      {/* Description */}
      <Card className="p-6">
        <p className="text-[var(--color-text-primary)]">{config.description}</p>
      </Card>

      {/* Live Preview */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Live Preview
        </h3>
        <Card className="p-8 flex items-center justify-center min-h-[200px] bg-[var(--color-surface)]">
          <Component {...props}>
            {componentName === 'Button' ? 'Click me' : props.children || config.examples[0]?.children}
          </Component>
        </Card>
      </div>

      {/* Props Controls */}
      {Object.keys(config.props).length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Props
          </h3>
          <Card className="p-6 space-y-4">
            {Object.entries(config.props).map(([propName, propConfig]) => (
              <div key={propName}>
                <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                  {propName}
                  {propConfig.required && (
                    <span className="text-xs text-red-500 ml-1">*required</span>
                  )}
                  {(propConfig.type === 'array' || propConfig.type === 'object' ||
                    propConfig.type === 'interface' || propConfig.type === 'custom') && (
                      <span className="text-xs font-mono text-[var(--color-text-muted)] ml-2">
                        {propConfig.typeDefinition || propConfig.type}
                      </span>
                    )}
                  {propConfig.description && (
                    <span className="text-xs text-[var(--color-text-muted)] ml-2">
                      ({propConfig.description})
                    </span>
                  )}
                </label>

                {propConfig.type === 'select' && propConfig.options && (
                  <div className="flex gap-2 flex-wrap">
                    {propConfig.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => updateProp(propName, option)}
                        className={`
                          px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                          ${props[propName] === option
                            ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-md hover:opacity-90'
                            : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)]'
                          }
                        `}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {propConfig.type === 'boolean' && (
                  <button
                    onClick={() => updateProp(propName, !props[propName])}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${props[propName]
                        ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-md hover:opacity-90'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)]'
                      }
                    `}
                  >
                    {props[propName] ? 'true' : 'false'}
                  </button>
                )}

                {propConfig.type === 'text' && (
                  <input
                    type="text"
                    value={props[propName]}
                    onChange={(e) => updateProp(propName, e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
                  />
                )}
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Accessibility Notes Section */}
      {config.accessibilityNotes && config.accessibilityNotes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)] flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-[var(--color-primary)]" />
            Accessibility
          </h3>
          <Card className="p-6 bg-[var(--color-surface)] border-l-4 border-[var(--color-primary)]">
            <ul className="space-y-2">
              {config.accessibilityNotes.map((note, index) => (
                <li key={index} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {/* Code Snippet */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Code
        </h3>
        <CodeSnippet code={generateCodeSnippet()} language="tsx" />
      </div>

      {/* Examples */}
      {config.examples.length > 1 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.examples.map((example, index) => (
              <Card key={index} className="p-4">
                <p className="text-sm font-medium mb-3 text-[var(--color-text-secondary)]">
                  {example.label}
                </p>
                <div className="flex items-center justify-center p-4 bg-[var(--color-background)] rounded">
                  <Component {...example.props}>{example.children}</Component>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
