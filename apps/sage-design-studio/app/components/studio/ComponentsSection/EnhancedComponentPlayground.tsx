'use client';

import { useState } from 'react';
import { Card } from '@sds/ui';
import type { ComponentConfig } from '../../lib/component-registry';
import { CodeSnippet } from './CodeSnippet';
import { JsonLdMetadata } from '../../JsonLdMetadata';
import { generateComponentMetadata } from '../../../lib/metadata-generator';
import { Copy, Check, Package, Code as CodeIcon, Settings, Accessibility, Eye } from 'lucide-react';

interface ComponentPlaygroundProps {
  componentName: string;
  config: ComponentConfig;
}

export function EnhancedComponentPlayground({ componentName, config }: ComponentPlaygroundProps) {
  const metadata = generateComponentMetadata(config, componentName);
  const [props, setProps] = useState<Record<string, any>>(
    Object.fromEntries(
      Object.entries(config.props).map(([key, propConfig]) => [key, propConfig.default])
    )
  );
  const [copied, setCopied] = useState(false);

  const Component = config.component;

  // Generate installation command (component-specific)
  const installCommand = `# Install @sds/ui to use ${componentName}
pnpm add @sds/ui`;

  // Generate import statement
  const generateImportStatement = () => {
    // Get all related exports (e.g., SelectTrigger, SelectContent for Select)
    const relatedExports = componentName === 'Select'
      ? ['Select', 'SelectTrigger', 'SelectContent', 'SelectItem', 'SelectValue']
      : componentName === 'Card'
      ? ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter']
      : [componentName];

    return `import { ${relatedExports.join(', ')} } from '@sds/ui';`;
  };

  // Generate usage code
  const generateUsageCode = () => {
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
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
  ${componentName === 'Button' ? 'Click me' : 'Content'}
</${componentName}>`;
  };

  const updateProp = (key: string, value: any) => {
    setProps((prev) => ({ ...prev, [key]: value }));
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* JSON-LD Metadata */}
      <JsonLdMetadata data={metadata} />

      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2">
            {componentName}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
            {config.description}
          </p>
        </div>

        {/* Installation */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)]">
            <Package className="w-4 h-4" />
            <span>Installation</span>
          </div>
          <div className="relative group">
            <pre className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono text-[var(--color-text-primary)]">{installCommand}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(installCommand)}
              className="absolute top-3 right-3 p-2 rounded-md bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Copy installation command"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-[var(--color-text-primary)]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview - PROMINENT */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)]">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </div>
          {componentName === 'Button' && (
            <span className="text-xs text-[var(--color-text-muted)]">Hover to see effects</span>
          )}
        </div>

        <Card hoverEffect={false} className="p-16 flex items-center justify-center min-h-[300px] bg-white dark:bg-black">
          {componentName === 'Card' ? (
            <Component {...props} className="w-[350px]">
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">Create Project</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Deploy your new project in one-click.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <input className="w-full px-3 py-2 text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-background)]" placeholder="Name of your project" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Framework</label>
                  <select className="w-full px-3 py-2 text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-background)]">
                    <option>Next.js</option>
                    <option>SvelteKit</option>
                    <option>Astro</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 px-4 py-2 text-sm bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-md">Deploy</button>
                  <button className="px-4 py-2 text-sm border border-[var(--color-border)] rounded-md">Cancel</button>
                </div>
              </div>
            </Component>
          ) : componentName === 'Code' ? (
            <div className="w-full max-w-2xl space-y-2">
              <Component {...props} syntax="plain">
{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(result); // 55`}
              </Component>
            </div>
          ) : componentName === 'Dropdown' ? (
            <Component
              {...props}
              trigger={<button className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-md text-sm">Open Menu</button>}
              items={[
                { label: 'Profile', value: 'profile' },
                { label: 'Settings', value: 'settings' },
                { label: 'Sign Out', value: 'signout' },
              ]}
              onSelect={(value: string) => console.log('Selected:', value)}
            />
          ) : (
            <Component {...props}>
              {componentName === 'Button' ? 'Click me' : props.children || config.examples[0]?.children}
            </Component>
          )}
        </Card>
      </div>

      {/* Interactive Controls - UNIQUE FEATURE */}
      {Object.keys(config.props).length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)]">
            <Settings className="w-4 h-4" />
            <span>Customize</span>
          </div>

          <Card hoverEffect={false} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(config.props).map(([propName, propConfig]) => (
                <div key={propName} className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <label className="text-sm font-medium text-[var(--color-text-primary)]">
                      {propName}
                    </label>
                    {propConfig.required && (
                      <span className="text-xs text-red-500">*</span>
                    )}
                    {propConfig.description && (
                      <span className="text-xs text-[var(--color-text-muted)]">
                        — {propConfig.description}
                      </span>
                    )}
                  </div>

                  {propConfig.type === 'select' && propConfig.options && (
                    <div className="flex gap-2 flex-wrap">
                      {componentName === 'Code' && propName === 'syntax' && (
                        <button
                          onClick={() => updateProp(propName, 'all')}
                          className={`
                            px-3 py-1.5 rounded-md text-xs font-medium transition-all
                            ${props[propName] === 'all'
                              ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm'
                              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]'
                            }
                          `}
                        >
                          All
                        </button>
                      )}
                      {propConfig.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => updateProp(propName, option)}
                          className={`
                            px-3 py-1.5 rounded-md text-xs font-medium transition-all
                            ${props[propName] === option
                              ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm'
                              : componentName === 'Code' && propName === 'syntax' && props[propName] === 'all'
                              ? 'bg-[var(--color-surface)] text-[var(--color-text-muted)] opacity-50 border border-[var(--color-border)]'
                              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]'
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
                        px-4 py-2 rounded-md text-sm font-medium transition-all
                        ${props[propName]
                          ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                          : 'bg-[var(--color-surface)] border border-[var(--color-border)]'
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
                      className="w-full px-3 py-2 text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Code Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)]">
          <CodeIcon className="w-4 h-4" />
          <span>Usage</span>
        </div>

        <div className="space-y-3">
          <div className="relative group">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden">
              <div className="px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-background)]">
                <span className="text-xs font-mono text-[var(--color-text-muted)]">Import</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-[var(--color-text-primary)]">
                  {generateImportStatement()}
                </code>
              </pre>
            </div>
            <button
              onClick={() => copyToClipboard(generateImportStatement())}
              className="absolute top-3 right-3 p-2 rounded-md bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors opacity-0 group-hover:opacity-100"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-[var(--color-text-primary)]" />}
            </button>
          </div>

          <div className="relative group">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden">
              <div className="px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-background)]">
                <span className="text-xs font-mono text-[var(--color-text-muted)]">Example</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-[var(--color-text-primary)]">
                  {generateUsageCode()}
                </code>
              </pre>
            </div>
            <button
              onClick={() => copyToClipboard(generateUsageCode())}
              className="absolute top-3 right-3 p-2 rounded-md bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors opacity-0 group-hover:opacity-100"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-[var(--color-text-primary)]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Props API Table */}
      {Object.keys(config.props).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">API Reference</h2>

          <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--color-surface)]">
                <tr className="border-b border-[var(--color-border)]">
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--color-text-primary)]">Prop</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--color-text-primary)]">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--color-text-primary)]">Default</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--color-text-primary)]">Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(config.props).map(([propName, propConfig], index) => (
                  <tr
                    key={propName}
                    className={index % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-surface)]'}
                  >
                    <td className="px-4 py-3 text-sm font-mono text-[var(--color-text-primary)]">
                      {propName}
                      {propConfig.required && <span className="text-red-500 ml-1">*</span>}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-[var(--color-text-muted)]">
                      {propConfig.type === 'select' && propConfig.options
                        ? propConfig.options.join(' | ')
                        : propConfig.typeDefinition || propConfig.type}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-[var(--color-text-muted)]">
                      {JSON.stringify(propConfig.default)}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                      {propConfig.description || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Accessibility */}
      {config.accessibilityNotes && config.accessibilityNotes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-[var(--color-primary)]" />
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Accessibility</h2>
          </div>

          <Card className="p-6 border-l-4 border-[var(--color-primary)]">
            <ul className="space-y-3">
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

      {/* Additional Examples */}
      {config.examples.length > 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Examples</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.examples.map((example, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    {example.label}
                  </span>
                </div>
                <div className="p-8 flex items-center justify-center bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)]">
                  <Component {...example.props}>{example.children}</Component>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Code Examples */}
      {config.codeExamples && config.codeExamples.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Code Examples</h2>

          <div className="space-y-6">
            {config.codeExamples.map((example, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-medium text-[var(--color-text-primary)]">{example.title}</h3>
                {example.description && (
                  <p className="text-sm text-[var(--color-text-secondary)]">{example.description}</p>
                )}
                <CodeSnippet code={example.code} language="tsx" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
