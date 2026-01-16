'use client';

import { useState } from 'react';
import { Card, Code, CollapsibleCodeBlock } from '@sds/ui';
import { syntaxColors } from '@sds/ui/tokens';

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
    <div className="space-y-8 w-full min-w-0">
      {/* Syntax Parser Overview */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
          Automatic Syntax Parser
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-4">
          The design system includes a lightweight, automatic syntax parser that tokenizes TypeScript/JavaScript/JSX code for multi-color syntax highlighting. Just pass plain code strings - no manual tokenization required!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Automatic</h4>
            <p className="text-sm text-[var(--color-text-muted)]">Pass plain strings - parsing happens automatically with zero configuration</p>
          </div>
          <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Lightweight</h4>
            <p className="text-sm text-[var(--color-text-muted)]">~2KB regex-based implementation with O(n) performance</p>
          </div>
          <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">14 Token Types</h4>
            <p className="text-sm text-[var(--color-text-muted)]">Comprehensive support for TS/JS/JSX syntax elements</p>
          </div>
        </div>
      </Card>

      {/* Overview */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
          Syntax Highlighting Colors
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-4">
          Theme-aware syntax highlighting colors based on VS Code Dark+ theme. These tokens automatically switch between light and dark modes to ensure optimal contrast and readability (WCAG AA 4.5:1).
        </p>
        <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)]">
            <strong>Note:</strong> The syntax parser automatically applies these colors when you use <Code>CollapsibleCodeBlock</Code>. For manual styling, use CSS custom properties like <Code>var(--syntax-keyword)</Code>.
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
          Usage Examples
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
              Auto-Parsing (Recommended)
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Simply pass a plain code string - the parser automatically tokenizes it!
            </p>
            <CollapsibleCodeBlock
              id="syntax-usage-1"
              code={`import { CollapsibleCodeBlock, parseCode } from '@sds/ui';

// Automatic tokenization - just pass the code string!
<CollapsibleCodeBlock
  id="my-code"
  code='const greeting = "Hello World";'
/>

// Or use parseCode utility directly
const tokens = parseCode(\`
  import { useState } from 'react';

  function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  }
\`);`}
              defaultCollapsed={false}
              showCopy={true}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
              Manual Tokenization (Advanced)
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              For fine-grained control, you can manually specify token types.
            </p>
            <CollapsibleCodeBlock
              id="syntax-usage-2"
              code={`// Manual tokenization for custom control
<CollapsibleCodeBlock
  id="my-code"
  code={[
    { text: 'const', type: 'keyword' },
    { text: ' example ', type: 'plain' },
    { text: '=', type: 'operator' },
    { text: ' "value"', type: 'string' },
  ]}
/>`}
              defaultCollapsed={false}
              showCopy={true}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
              CSS Variables (Low-Level)
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Use CSS custom properties for manual styling.
            </p>
            <CollapsibleCodeBlock
              id="syntax-usage-3"
              code={`// CSS approach with manual spans
<span className="text-[var(--syntax-keyword)]">const</span>
<span className="text-[var(--syntax-plain)]"> example </span>
<span className="text-[var(--syntax-operator)]">=</span>
<span className="text-[var(--syntax-string)]"> "value"</span>`}
              defaultCollapsed={false}
              showCopy={true}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
