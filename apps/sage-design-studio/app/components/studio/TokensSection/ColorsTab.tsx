'use client';

import { useState } from 'react';
import { Card } from '@ecosystem/design-system';
import { useTheme } from '@ecosystem/design-system/hooks';

export function ColorsTab() {
  const { theme, mode, setTheme, setMode } = useTheme();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colorTokens = [
    { name: '--color-background', description: 'Page background' },
    { name: '--color-surface', description: 'Card/container background' },
    { name: '--color-text-primary', description: 'Main text color' },
    { name: '--color-text-secondary', description: 'Supporting text' },
    { name: '--color-text-muted', description: 'De-emphasized text' },
    { name: '--color-border', description: 'Border color' },
    { name: '--color-focus', description: 'Focus ring color' },
    { name: '--color-primary', description: 'Primary brand color' },
    { name: '--color-accent', description: 'Accent color' },
  ];

  const copyColor = async (colorVar: string) => {
    const computedColor = getComputedStyle(document.documentElement).getPropertyValue(colorVar);
    await navigator.clipboard.writeText(computedColor.trim());
    setCopiedColor(colorVar);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Theme Controls */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Theme Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">
              Theme
            </label>
            <div className="flex gap-2">
              {(['studio', 'sage', 'volt'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
                    ${
                      theme === t
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }
                  `}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">
              Mode
            </label>
            <div className="flex gap-2">
              {(['light', 'dark'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
                    ${
                      mode === m
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }
                  `}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Color Palette */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Semantic Colors
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Click any color to copy its CSS variable
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorTokens.map((token) => {
            const colorValue = getComputedStyle(document.documentElement)
              .getPropertyValue(token.name)
              .trim();

            return (
              <button
                key={token.name}
                onClick={() => copyColor(token.name)}
                className="group text-left transition-all hover:scale-105"
              >
                <Card className="p-4 cursor-pointer">
                  {/* Color Swatch */}
                  <div
                    className="w-full h-20 rounded-lg mb-3 border border-[var(--color-border)]"
                    style={{ backgroundColor: `var(${token.name})` }}
                  />

                  {/* Variable Name */}
                  <p className="font-mono text-sm font-medium mb-1 text-[var(--color-text-primary)]">
                    {token.name}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                    {token.description}
                  </p>

                  {/* Value */}
                  <p className="text-xs font-mono text-[var(--color-text-muted)]">
                    {copiedColor === token.name ? '✓ Copied!' : colorValue || 'N/A'}
                  </p>
                </Card>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
