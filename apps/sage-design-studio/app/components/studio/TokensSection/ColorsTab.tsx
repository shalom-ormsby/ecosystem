'use client';

import { useState, useEffect } from 'react';
import { Card, Badge, Code } from '@sds/ui';
import { useTheme } from '@sds/ui/hooks';
import { colorTokens, semanticColors, getContrastRatio, meetsContrastRequirements } from '@sds/ui/utils';

export function ColorsTab() {
  const { theme, mode, setTheme, setMode } = useTheme();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const allColorTokens = [
    // Background colors
    { name: '--color-background', description: 'Page background', category: 'Background' },
    { name: '--color-background-secondary', description: 'Secondary background', category: 'Background' },
    { name: '--color-background-tertiary', description: 'Tertiary background', category: 'Background' },
    { name: '--color-surface', description: 'Card/container background', category: 'Background' },

    // Text colors
    { name: '--color-foreground', description: 'Primary foreground', category: 'Text' },
    { name: '--color-foreground-secondary', description: 'Secondary foreground', category: 'Text' },
    { name: '--color-text-primary', description: 'Main text color', category: 'Text' },
    { name: '--color-text-secondary', description: 'Supporting text', category: 'Text' },
    { name: '--color-text-muted', description: 'De-emphasized text', category: 'Text' },

    // Brand colors
    { name: '--color-primary', description: 'Primary brand color', category: 'Brand' },
    { name: '--color-primary-foreground', description: 'Primary text/icon color', category: 'Brand' },
    { name: '--color-secondary', description: 'Secondary brand color', category: 'Brand' },
    { name: '--color-secondary-foreground', description: 'Secondary text/icon color', category: 'Brand' },
    { name: '--color-accent', description: 'Accent color', category: 'Brand' },
    { name: '--color-accent-foreground', description: 'Accent text/icon color', category: 'Brand' },

    // Status colors
    { name: '--color-success', description: 'Success state', category: 'Status' },
    { name: '--color-success-foreground', description: 'Success text/icon', category: 'Status' },
    { name: '--color-warning', description: 'Warning state', category: 'Status' },
    { name: '--color-warning-foreground', description: 'Warning text/icon', category: 'Status' },
    { name: '--color-error', description: 'Error state', category: 'Status' },
    { name: '--color-error-foreground', description: 'Error text/icon', category: 'Status' },
    { name: '--color-info', description: 'Info state', category: 'Status' },
    { name: '--color-info-foreground', description: 'Info text/icon', category: 'Status' },

    // Border & Interactive
    { name: '--color-border', description: 'Border color', category: 'UI' },
    { name: '--color-border-subtle', description: 'Subtle border', category: 'UI' },
    { name: '--color-hover', description: 'Hover state', category: 'UI' },
    { name: '--color-active', description: 'Active state', category: 'UI' },
    { name: '--color-focus', description: 'Focus ring color', category: 'UI' },

    // Links
    { name: '--color-link', description: 'Link color', category: 'Links' },
    { name: '--color-link-hover', description: 'Link hover background', category: 'Links' },
    { name: '--color-link-hover-foreground', description: 'Link hover text', category: 'Links' },
  ];

  const categorizedTokens = allColorTokens.reduce((acc, token) => {
    if (!acc[token.category]) {
      acc[token.category] = [];
    }
    acc[token.category].push(token);
    return acc;
  }, {} as Record<string, typeof allColorTokens>);

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
                        ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
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
                        ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
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

      {/* Color Palette by Category */}
      <div className="space-y-8">
        {Object.entries(categorizedTokens).map(([category, tokens]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
              {category} Colors
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Click any color to copy its CSS variable value
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tokens.map((token) => {
                const colorValue = isMounted
                  ? getComputedStyle(document.documentElement)
                      .getPropertyValue(token.name)
                      .trim()
                  : '';

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
                      <div className="mb-1">
                        <Code className="text-sm font-medium">
                          {token.name}
                        </Code>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                        {token.description}
                      </p>

                      {/* Value */}
                      <div className="text-xs">
                        {copiedColor === token.name ? (
                          <span className="text-[var(--color-text-muted)]">✓ Copied!</span>
                        ) : (
                          <Code className="text-xs">{colorValue || '...'}</Code>
                        )}
                      </div>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Semantic Color Pairs */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Semantic Color Pairs
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Pre-configured background and foreground color pairs that ensure proper contrast
        </p>

        {/* Status Colors */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-[var(--color-text-primary)]">Status Colors</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(semanticColors.status).map(([type, colors]) => (
              <Card key={type} className="p-6">
                <div
                  className="px-4 py-3 rounded-lg mb-3 text-center font-medium"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.fg,
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
                <div className="text-xs space-y-1">
                  <div className="text-[var(--color-text-secondary)]">
                    bg: <Code className="text-xs">var(--color-{type})</Code>
                  </div>
                  <div className="text-[var(--color-text-secondary)]">
                    fg: <Code className="text-xs">var(--color-{type}-foreground)</Code>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Brand Colors */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-[var(--color-text-primary)]">Brand Colors</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(semanticColors.brand).map(([type, colors]) => (
              <Card key={type} className="p-6">
                <div
                  className="px-4 py-3 rounded-lg mb-3 text-center font-medium"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.fg,
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
                <div className="text-xs space-y-1">
                  <div className="text-[var(--color-text-secondary)]">
                    bg: <Code className="text-xs">var(--color-{type})</Code>
                  </div>
                  <div className="text-[var(--color-text-secondary)]">
                    fg: <Code className="text-xs">var(--color-{type}-foreground)</Code>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility Tools */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Accessibility & Utilities
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Built-in utilities for checking color contrast and ensuring WCAG compliance
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contrast Examples */}
          <Card className="p-6">
            <h4 className="text-lg font-medium mb-4 text-[var(--color-text-primary)]">
              Contrast Checker Example
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              All semantic color pairs are designed to meet WCAG AA standards
            </p>
            <div className="space-y-3">
              {[
                { bg: colorTokens.primary, fg: colorTokens.primaryForeground, label: 'Primary' },
                { bg: colorTokens.success, fg: colorTokens.successForeground, label: 'Success' },
                { bg: colorTokens.error, fg: colorTokens.errorForeground, label: 'Error' },
              ].map((pair, idx) => {
                const ratio = isMounted
                  ? getContrastRatio(
                      getComputedStyle(document.documentElement).getPropertyValue(pair.bg.replace('var(', '').replace(')', '')),
                      getComputedStyle(document.documentElement).getPropertyValue(pair.fg.replace('var(', '').replace(')', ''))
                    )
                  : 0;
                const meetsAA = ratio >= 4.5;

                return (
                  <div
                    key={idx}
                    className="px-4 py-3 rounded-lg flex items-center justify-between"
                    style={{ backgroundColor: pair.bg, color: pair.fg }}
                  >
                    <span className="font-medium">{pair.label}</span>
                    <Badge variant={meetsAA ? 'success' : 'error'} size="sm">
                      {ratio ? `${ratio.toFixed(2)}:1` : '...'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Available Utilities */}
          <Card className="p-6">
            <h4 className="text-lg font-medium mb-4 text-[var(--color-text-primary)]">
              Available Utilities
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Import from <Code>@ecosystem/design-system/utils</Code>
            </p>
            <div className="space-y-3 text-sm">
              <div>
                <Code className="text-xs">getCSSVariable(name)</Code>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">Get computed CSS variable value</p>
              </div>
              <div>
                <Code className="text-xs">getContrastRatio(hex1, hex2)</Code>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">Calculate WCAG contrast ratio</p>
              </div>
              <div>
                <Code className="text-xs">meetsContrastRequirements(fg, bg)</Code>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">Check AA/AAA compliance</p>
              </div>
              <div>
                <Code className="text-xs">getSemanticColorPair(type)</Code>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">Get matching bg/fg colors</p>
              </div>
              <div>
                <Code className="text-xs">hexToRgb(hex)</Code>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">Convert hex to RGB values</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
