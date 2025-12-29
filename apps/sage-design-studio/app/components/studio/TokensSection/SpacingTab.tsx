'use client';

import { Card } from '@ecosystem/design-system';

/**
 * SpacingTab Component
 *
 * Defines spacing tokens based on Swiss grid system principles:
 * - 8px base unit system (divisible by 2 and 4)
 * - Consistent scale for predictable layouts
 * - Generous whitespace for breathing room
 * - Clear semantic naming
 */

interface SpacingToken {
  name: string;
  value: string;
  pixels: number;
  units: number;
  description: string;
  usage: string[];
}

const spacingTokens: SpacingToken[] = [
  {
    name: 'xs',
    value: '0.25rem',
    pixels: 4,
    units: 0.5,
    description: 'Extra small spacing',
    usage: ['Icon padding', 'Tight inline elements', 'Minor adjustments'],
  },
  {
    name: 'sm',
    value: '0.5rem',
    pixels: 8,
    units: 1,
    description: 'Small spacing (1 base unit)',
    usage: ['Compact element spacing', 'List item gaps', 'Form element spacing'],
  },
  {
    name: 'md',
    value: '1rem',
    pixels: 16,
    units: 2,
    description: 'Medium spacing (2 base units)',
    usage: ['Default element spacing', 'Card padding', 'Section gaps'],
  },
  {
    name: 'lg',
    value: '1.5rem',
    pixels: 24,
    units: 3,
    description: 'Large spacing (3 base units)',
    usage: ['Generous padding', 'Component separation', 'Subsection gaps'],
  },
  {
    name: 'xl',
    value: '2rem',
    pixels: 32,
    units: 4,
    description: 'Extra large spacing (4 base units)',
    usage: ['Major component spacing', 'Section padding', 'Layout gaps'],
  },
  {
    name: '2xl',
    value: '3rem',
    pixels: 48,
    units: 6,
    description: 'Double extra large (6 base units)',
    usage: ['Large section spacing', 'Hero section padding', 'Major layout gaps'],
  },
  {
    name: '3xl',
    value: '4rem',
    pixels: 64,
    units: 8,
    description: 'Triple extra large (8 base units)',
    usage: ['Spacious section padding', 'Major layout divisions', 'Hero sections'],
  },
  {
    name: '4xl',
    value: '6rem',
    pixels: 96,
    units: 12,
    description: 'Quadruple extra large (12 base units)',
    usage: ['Extra spacious sections', 'Landing page hero', 'Maximum whitespace'],
  },
  {
    name: '5xl',
    value: '8rem',
    pixels: 128,
    units: 16,
    description: 'Quintuple extra large (16 base units)',
    usage: ['Maximum section spacing', 'Full-page layouts', 'Exceptional whitespace'],
  },
];

export function SpacingTab() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="p-6 bg-[var(--color-surface)]">
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Swiss Grid System Spacing
        </h3>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <p>
            Our spacing system is based on an <strong className="text-[var(--color-text-primary)]">8px base unit</strong>,
            following Swiss grid system principles. This provides:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Consistent, predictable spacing across all components</li>
            <li>Mathematical harmony (all values divisible by 4 and 8)</li>
            <li>Generous negative space for clarity and focus</li>
            <li>Scalable spacing that maintains proportions</li>
          </ul>
          <div className="mt-4 p-4 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-muted)]">
              <strong className="text-[var(--color-text-primary)]">Formula:</strong>{' '}
              Each spacing value = base unit (8px) × multiplier. For example, <code className="px-1 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">lg</code> = 8px × 3 = 24px.
            </p>
          </div>
        </div>
      </Card>

      {/* Spacing Scale Visualization */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 text-[var(--color-text-primary)]">
          Spacing Scale
        </h3>
        <div className="space-y-6">
          {spacingTokens.map((token) => (
            <div key={token.name} className="space-y-3">
              {/* Token Header */}
              <div className="flex items-baseline gap-4">
                <code className="text-sm font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-primary)] min-w-[4rem]">
                  {token.name}
                </code>
                <div className="flex gap-4 text-sm">
                  <span className="text-[var(--color-text-secondary)]">
                    {token.value}
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    {token.pixels}px
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    ({token.units} {token.units === 1 ? 'unit' : 'units'})
                  </span>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="flex items-center gap-4">
                <div
                  className="bg-[var(--color-primary)]/20 border-l-4 border-[var(--color-primary)] h-8 transition-all"
                  style={{ width: `${token.pixels}px` }}
                />
                <span className="text-xs text-[var(--color-text-muted)]">
                  {token.description}
                </span>
              </div>

              {/* Usage Examples */}
              <div className="ml-20 space-y-1">
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  Common Usage:
                </p>
                <ul className="text-xs text-[var(--color-text-muted)] space-y-1">
                  {token.usage.map((use, i) => (
                    <li key={i}>• {use}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tailwind Mapping */}
      <Card className="p-6 bg-[var(--color-surface)]">
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Tailwind CSS Mapping
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-4">
          Our spacing tokens align with Tailwind's spacing scale for seamless integration:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-2 px-4 text-[var(--color-text-primary)]">Token</th>
                <th className="text-left py-2 px-4 text-[var(--color-text-primary)]">Tailwind Class</th>
                <th className="text-left py-2 px-4 text-[var(--color-text-primary)]">Value</th>
                <th className="text-left py-2 px-4 text-[var(--color-text-primary)]">Example</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-text-secondary)]">
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-2 px-4"><code className="text-[var(--color-primary)]">xs</code></td>
                <td className="py-2 px-4"><code>p-1, m-1, gap-1</code></td>
                <td className="py-2 px-4">4px</td>
                <td className="py-2 px-4"><code className="text-xs">className="p-1"</code></td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-2 px-4"><code className="text-[var(--color-primary)]">sm</code></td>
                <td className="py-2 px-4"><code>p-2, m-2, gap-2</code></td>
                <td className="py-2 px-4">8px</td>
                <td className="py-2 px-4"><code className="text-xs">className="gap-2"</code></td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-2 px-4"><code className="text-[var(--color-primary)]">md</code></td>
                <td className="py-2 px-4"><code>p-4, m-4, gap-4</code></td>
                <td className="py-2 px-4">16px</td>
                <td className="py-2 px-4"><code className="text-xs">className="p-4"</code></td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-2 px-4"><code className="text-[var(--color-primary)]">lg</code></td>
                <td className="py-2 px-4"><code>p-6, m-6, gap-6</code></td>
                <td className="py-2 px-4">24px</td>
                <td className="py-2 px-4"><code className="text-xs">className="p-6"</code></td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-2 px-4"><code className="text-[var(--color-primary)]">xl</code></td>
                <td className="py-2 px-4"><code>p-8, m-8, gap-8</code></td>
                <td className="py-2 px-4">32px</td>
                <td className="py-2 px-4"><code className="text-xs">className="gap-8"</code></td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-2 px-4"><code className="text-[var(--color-primary)]">2xl</code></td>
                <td className="py-2 px-4"><code>p-12, m-12, gap-12</code></td>
                <td className="py-2 px-4">48px</td>
                <td className="py-2 px-4"><code className="text-xs">className="py-12"</code></td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-2 px-4"><code className="text-[var(--color-primary)]">3xl</code></td>
                <td className="py-2 px-4"><code>p-16, m-16, gap-16</code></td>
                <td className="py-2 px-4">64px</td>
                <td className="py-2 px-4"><code className="text-xs">className="mb-16"</code></td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-2 px-4"><code className="text-[var(--color-primary)]">4xl</code></td>
                <td className="py-2 px-4"><code>p-24, m-24, gap-24</code></td>
                <td className="py-2 px-4">96px</td>
                <td className="py-2 px-4"><code className="text-xs">className="py-24"</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4"><code className="text-[var(--color-primary)]">5xl</code></td>
                <td className="py-2 px-4"><code>p-32, m-32, gap-32</code></td>
                <td className="py-2 px-4">128px</td>
                <td className="py-2 px-4"><code className="text-xs">className="py-32"</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6 bg-[var(--color-surface)]">
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Best Practices
        </h3>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
              1. Embrace Negative Space
            </h4>
            <p className="text-sm">
              Swiss design emphasizes generous whitespace. Use larger spacing values (xl, 2xl, 3xl) liberally
              for major sections. Whitespace is not wasted space—it creates clarity and focus.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
              2. Consistent Vertical Rhythm
            </h4>
            <p className="text-sm">
              Maintain consistent spacing between elements on the same hierarchy level. For example, if one
              section uses <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">mb-8</code>,
              all peer sections should use the same spacing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
              3. Scale Appropriately
            </h4>
            <p className="text-sm">
              Larger elements warrant larger spacing. Hero sections should use 3xl or 4xl padding, while
              compact UI elements like buttons should use sm or md spacing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
              4. Avoid Arbitrary Values
            </h4>
            <p className="text-sm">
              Stick to the defined spacing scale. Avoid arbitrary pixel values like <code className="px-1 py-0.5 bg-[var(--color-background)] rounded line-through">p-[13px]</code>.
              If a spacing value doesn't exist in the scale, choose the closest one or consider if it's truly needed.
            </p>
          </div>
        </div>
      </Card>

      {/* Live Examples */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 text-[var(--color-text-primary)]">
          Live Examples
        </h3>
        <div className="space-y-8">
          {/* Example 1: Compact Layout */}
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
              Compact Layout (sm spacing)
            </p>
            <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
              <div className="flex gap-2">
                <div className="p-2 bg-[var(--color-primary)]/20 rounded text-xs">Item 1</div>
                <div className="p-2 bg-[var(--color-primary)]/20 rounded text-xs">Item 2</div>
                <div className="p-2 bg-[var(--color-primary)]/20 rounded text-xs">Item 3</div>
              </div>
            </div>
          </div>

          {/* Example 2: Default Layout */}
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
              Default Layout (md spacing)
            </p>
            <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
              <div className="flex gap-4">
                <div className="p-4 bg-[var(--color-primary)]/20 rounded text-xs">Item 1</div>
                <div className="p-4 bg-[var(--color-primary)]/20 rounded text-xs">Item 2</div>
                <div className="p-4 bg-[var(--color-primary)]/20 rounded text-xs">Item 3</div>
              </div>
            </div>
          </div>

          {/* Example 3: Spacious Layout */}
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
              Spacious Layout (xl spacing)
            </p>
            <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
              <div className="flex gap-8">
                <div className="p-8 bg-[var(--color-primary)]/20 rounded text-xs">Item 1</div>
                <div className="p-8 bg-[var(--color-primary)]/20 rounded text-xs">Item 2</div>
                <div className="p-8 bg-[var(--color-primary)]/20 rounded text-xs">Item 3</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
