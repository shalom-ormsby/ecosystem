'use client';

import { useState } from 'react';
import { Card, Code } from '@ecosystem/design-system';
import { syntaxColors } from '@ecosystem/design-system/tokens';

export function SyntaxTab() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const syntaxTokens = [
    { name: '--syntax-comment', description: 'Comments', type: 'comment', example: '// This is a comment' },
    { name: '--syntax-keyword', description: 'Keywords (const, function, etc.)', type: 'keyword', example: 'const function import' },
    { name: '--syntax-function', description: 'Function names', type: 'function', example: 'myFunction()' },
    { name: '--syntax-string', description: 'String literals', type: 'string', example: '"Hello World"' },
    { name: '--syntax-number', description: 'Numeric values', type: 'number', example: '42 3.14' },
    { name: '--syntax-boolean', description: 'Boolean values', type: 'boolean', example: 'true false' },
    { name: '--syntax-operator', description: 'Operators (=, +, -, etc.)', type: 'operator', example: '= + - * /' },
    { name: '--syntax-property', description: 'Object properties', type: 'property', example: 'backgroundColor' },
    { name: '--syntax-className', description: 'Class/type names', type: 'className', example: 'MyComponent' },
    { name: '--syntax-tag', description: 'HTML/JSX tags', type: 'tag', example: '<div>' },
    { name: '--syntax-attribute', description: 'HTML/JSX attributes', type: 'attribute', example: 'className id' },
    { name: '--syntax-variable', description: 'Variable names', type: 'variable', example: 'myVariable' },
    { name: '--syntax-punctuation', description: 'Punctuation ({}, [], ())', type: 'punctuation', example: '{ } [ ] ( )' },
    { name: '--syntax-plain', description: 'Default text color', type: 'plain', example: 'regular text' },
  ];

  const copyColor = async (tokenName: string, type: keyof typeof syntaxColors.light) => {
    const lightColor = syntaxColors.light[type];
    const darkColor = syntaxColors.dark[type];
    await navigator.clipboard.writeText(`Light: ${lightColor}\nDark: ${darkColor}`);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Overview */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
          Syntax Highlighting Colors
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-4">
          Theme-aware syntax highlighting colors based on VS Code Dark+ theme. These tokens automatically switch between light and dark modes to ensure optimal contrast and readability for code examples.
        </p>
        <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)]">
            <strong>Usage:</strong> Use these CSS custom properties in your code blocks with <Code>var(--syntax-keyword)</Code> or use the <Code>CollapsibleCodeBlock</Code> organism with SyntaxToken types.
          </p>
        </div>
      </Card>

      {/* Live Code Example */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
          Live Example
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          See the syntax colors in action. Toggle between light and dark mode to see how colors adapt.
        </p>
        <div className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
          <pre className="text-sm font-mono">
            <code>
              <span className="text-[var(--syntax-comment)]">// Example TypeScript code</span>
              {'\n'}
              <span className="text-[var(--syntax-keyword)]">import</span>
              <span className="text-[var(--syntax-plain)]"> {'{ '}</span>
              <span className="text-[var(--syntax-className)]">useState</span>
              <span className="text-[var(--syntax-plain)]"> {'} '}</span>
              <span className="text-[var(--syntax-keyword)]">from</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-string)]">'react'</span>
              <span className="text-[var(--syntax-punctuation)]">;</span>
              {'\n\n'}
              <span className="text-[var(--syntax-keyword)]">interface</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-className)]">Props</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-punctuation)]">{'{'}</span>
              {'\n  '}
              <span className="text-[var(--syntax-property)]">count</span>
              <span className="text-[var(--syntax-punctuation)]">:</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-className)]">number</span>
              <span className="text-[var(--syntax-punctuation)]">;</span>
              {'\n  '}
              <span className="text-[var(--syntax-property)]">isActive</span>
              <span className="text-[var(--syntax-punctuation)]">:</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-className)]">boolean</span>
              <span className="text-[var(--syntax-punctuation)]">;</span>
              {'\n'}
              <span className="text-[var(--syntax-punctuation)]">{'}'}</span>
              {'\n\n'}
              <span className="text-[var(--syntax-keyword)]">function</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-function)]">Example</span>
              <span className="text-[var(--syntax-punctuation)]">(</span>
              <span className="text-[var(--syntax-punctuation)]">{'{ '}</span>
              <span className="text-[var(--syntax-variable)]">count</span>
              <span className="text-[var(--syntax-punctuation)]">, </span>
              <span className="text-[var(--syntax-variable)]">isActive</span>
              <span className="text-[var(--syntax-punctuation)]">{' }'}</span>
              <span className="text-[var(--syntax-punctuation)]">:</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-className)]">Props</span>
              <span className="text-[var(--syntax-punctuation)]">)</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-punctuation)]">{'{'}</span>
              {'\n  '}
              <span className="text-[var(--syntax-keyword)]">const</span>
              <span className="text-[var(--syntax-plain)]"> [</span>
              <span className="text-[var(--syntax-variable)]">state</span>
              <span className="text-[var(--syntax-plain)]">, </span>
              <span className="text-[var(--syntax-variable)]">setState</span>
              <span className="text-[var(--syntax-plain)]">] </span>
              <span className="text-[var(--syntax-operator)]">=</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-function)]">useState</span>
              <span className="text-[var(--syntax-punctuation)]">(</span>
              <span className="text-[var(--syntax-number)]">0</span>
              <span className="text-[var(--syntax-punctuation)]">);</span>
              {'\n  '}
              <span className="text-[var(--syntax-keyword)]">return</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-boolean)]">isActive</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-operator)]">?</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-variable)]">count</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-operator)]">:</span>
              <span className="text-[var(--syntax-plain)]"> </span>
              <span className="text-[var(--syntax-number)]">0</span>
              <span className="text-[var(--syntax-punctuation)]">;</span>
              {'\n'}
              <span className="text-[var(--syntax-punctuation)]">{'}'}</span>
            </code>
          </pre>
        </div>
      </Card>

      {/* Token Reference */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Token Reference
        </h3>
        <div className="space-y-3">
          {syntaxTokens.map((token) => {
            const type = token.type as keyof typeof syntaxColors.light;
            const lightColor = syntaxColors.light[type];
            const darkColor = syntaxColors.dark[type];

            return (
              <div
                key={token.name}
                className="flex items-center gap-4 p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors group"
              >
                {/* Color Swatch - Light Mode */}
                <div className="flex gap-2">
                  <div
                    className="w-12 h-12 rounded border border-[var(--color-border)]"
                    style={{ backgroundColor: lightColor }}
                    title={`Light: ${lightColor}`}
                  />
                  <div
                    className="w-12 h-12 rounded border border-[var(--color-border)]"
                    style={{ backgroundColor: darkColor }}
                    title={`Dark: ${darkColor}`}
                  />
                </div>

                {/* Token Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Code className="text-sm">
                      {token.name}
                    </Code>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    {token.description}
                  </p>
                  <div className="font-mono text-xs text-[var(--color-text-muted)]">
                    <span className="text-[var(--syntax-{token.type})]">{token.example}</span>
                  </div>
                </div>

                {/* Color Values */}
                <div className="hidden lg:flex flex-col gap-1 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--color-text-muted)] w-12">Light:</span>
                    <Code className="text-xs">
                      {lightColor}
                    </Code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--color-text-muted)] w-12">Dark:</span>
                    <Code className="text-xs">
                      {darkColor}
                    </Code>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => copyColor(token.name, type)}
                  className="px-3 py-2 text-xs bg-[var(--color-background)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] border border-[var(--color-border)] rounded transition-all opacity-0 group-hover:opacity-100"
                  title="Copy color values"
                >
                  {copiedToken === token.name ? 'Copied!' : 'Copy'}
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Usage Example */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
          Usage Example
        </h3>
        <Code inline={false}>{`// CSS approach
<span className="text-[var(--syntax-keyword)]">const</span>
<span className="text-[var(--syntax-plain)]"> example </span>
<span className="text-[var(--syntax-operator)]">=</span>
<span className="text-[var(--syntax-string)]"> "value"</span>

// CollapsibleCodeBlock approach
import { CollapsibleCodeBlock } from '@ecosystem/design-system';

<CollapsibleCodeBlock
  id="my-code"
  code={[
    { text: 'const', type: 'keyword' },
    { text: ' example ', type: 'plain' },
    { text: '=', type: 'operator' },
    { text: ' "value"', type: 'string' },
  ]}
/>`}</Code>
      </Card>
    </div>
  );
}
