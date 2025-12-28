'use client';

import { Card } from '@ecosystem/design-system';
import { useTheme } from '@ecosystem/design-system/hooks';

export function TypographyTab() {
  const { theme } = useTheme();

  const fontFamilies = {
    studio: { sans: 'Geist Sans', mono: 'Geist Mono', serif: null },
    sage: { sans: 'Instrument Sans', mono: 'Geist Mono', serif: 'Lora' },
    volt: { sans: 'Space Grotesk', mono: 'Geist Mono', serif: null },
  };

  const sizes = [
    { name: 'xs', px: '12px', usage: 'Fine print, labels' },
    { name: 'sm', px: '14px', usage: 'Secondary text' },
    { name: 'base', px: '16px', usage: 'Body text' },
    { name: 'lg', px: '18px', usage: 'Lead paragraphs' },
    { name: 'xl', px: '20px', usage: 'Section headers' },
    { name: '2xl', px: '24px', usage: 'Page headers' },
    { name: '3xl', px: '30px', usage: 'Hero text' },
  ];

  const weights = [
    { name: 'normal', value: '400' },
    { name: 'medium', value: '500' },
    { name: 'semibold', value: '600' },
    { name: 'bold', value: '700' },
  ];

  const currentFonts = fontFamilies[theme];

  return (
    <div className="space-y-8">
      {/* Font Families */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Font Families ({theme} theme)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">Sans Serif (UI)</p>
            <p className="text-2xl font-sans text-[var(--color-text-primary)]">
              {currentFonts.sans}
            </p>
            <p className="text-sm font-mono text-[var(--color-text-muted)] mt-2">
              --font-heading, --font-body
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">Monospace (Code)</p>
            <p className="text-2xl font-mono text-[var(--color-text-primary)]">
              {currentFonts.mono}
            </p>
            <p className="text-sm font-mono text-[var(--color-text-muted)] mt-2">
              --font-mono
            </p>
          </Card>

          {currentFonts.serif && (
            <Card className="p-6">
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">Serif (Reading)</p>
              <p className="text-2xl font-serif text-[var(--color-text-primary)]">
                {currentFonts.serif}
              </p>
              <p className="text-sm font-mono text-[var(--color-text-muted)] mt-2">
                --font-heading (Sage only)
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Type Scale */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Type Scale
        </h3>
        <Card className="p-6 space-y-4">
          {sizes.map((size) => (
            <div key={size.name} className="border-b border-[var(--color-border)] pb-4 last:border-0">
              <div className="flex items-baseline justify-between mb-2">
                <p
                  className="text-[var(--color-text-primary)]"
                  style={{ fontSize: size.px }}
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-mono text-[var(--color-text-muted)]">
                  {size.name}
                </span>
                <span className="text-[var(--color-text-secondary)]">
                  {size.px}
                </span>
                <span className="text-[var(--color-text-muted)]">
                  · {size.usage}
                </span>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Font Weights */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Font Weights
        </h3>
        <Card className="p-6 space-y-3">
          {weights.map((weight) => (
            <div key={weight.name} className="flex items-center justify-between">
              <p
                className="text-lg text-[var(--color-text-primary)]"
                style={{ fontWeight: weight.value }}
              >
                {weight.name.charAt(0).toUpperCase() + weight.name.slice(1)} ({weight.value})
              </p>
              <span className="text-sm font-mono text-[var(--color-text-muted)]">
                font-{weight.name}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
