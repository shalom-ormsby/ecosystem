'use client';

import { useState, useEffect } from 'react';
import { Card, Badge, Code, Button, useTheme } from '@sage/ui';
import { useCustomizer } from '@sage/ui';
import { colorTokens, semanticColors, getContrastRatio } from '@sage/ui/utils';
import { Palette, ArrowRight, Copy, Check } from 'lucide-react';

export function ColorsTab() {
  const { theme, mode } = useTheme();
  // Safe access to the custom palette. 
  // Note: We use the hook selector properly to avoid hydration mismatches if possible, 
  // but straight property access is fine given this is a client component.
  const activePalette = useCustomizer(state => state.customColors?.[theme]?.[mode]);

  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const copyColor = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopiedColor(id);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const copyVarValue = async (varName: string) => {
    if (typeof window === 'undefined') return;
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName);
    await copyColor(val, varName);
  };

  const allColorTokens = [
    // Brand colors
    { name: '--color-primary', description: 'Primary brand color', category: 'Brand' },
    { name: '--color-secondary', description: 'Secondary brand color', category: 'Brand' },
    { name: '--color-accent', description: 'Accent color', category: 'Brand' },

    // Text colors
    { name: '--color-foreground', description: 'Primary foreground', category: 'Text' },
    { name: '--color-base', description: 'Base text color', category: 'Text' },
    { name: '--color-text-primary', description: 'Main text color', category: 'Text' },
    { name: '--color-text-secondary', description: 'Supporting text', category: 'Text' },
    { name: '--color-text-muted', description: 'De-emphasized text', category: 'Text' },

    // UI Colors (Border & Interactive)
    { name: '--color-border', description: 'Border color', category: 'UI' },
    { name: '--color-border-subtle', description: 'Subtle border', category: 'UI' },
    { name: '--color-hover', description: 'Hover state', category: 'UI' },
    { name: '--color-active', description: 'Active state', category: 'UI' },
    { name: '--color-focus', description: 'Focus ring color', category: 'UI' },

    // Links
    { name: '--color-link', description: 'Link color', category: 'Links' },
    { name: '--color-link-hover', description: 'Link hover background', category: 'Links' },
    { name: '--color-link-hover-foreground', description: 'Link hover text', category: 'Links' },

    // Status colors
    { name: '--color-success', description: 'Success state', category: 'Status' },
    { name: '--color-warning', description: 'Warning state', category: 'Status' },
    { name: '--color-error', description: 'Error state', category: 'Status' },
    { name: '--color-info', description: 'Info state', category: 'Status' },

    // Background colors (The "Rest")
    { name: '--color-background', description: 'Page background', category: 'Background' },
    { name: '--color-background-secondary', description: 'Secondary background', category: 'Background' },
    { name: '--color-background-tertiary', description: 'Tertiary background', category: 'Background' },
    { name: '--color-surface', description: 'Card/container background', category: 'Background' },
  ];

  const categorizedTokens = allColorTokens.reduce((acc, token) => {
    if (!acc[token.category]) {
      acc[token.category] = [];
    }
    acc[token.category].push(token);
    return acc;
  }, {} as Record<string, typeof allColorTokens>);

  // Generated Scale (only relevant if activePalette is present)
  // We can read these from CSS vars --color-primary-50, etc.
  const scaleSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div className="space-y-8">
      {/* Active Palette Context Header */}
      <Card className="p-6 border-l-4 border-l-[var(--color-primary)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
                Current Context
              </span>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs uppercase">
                  {theme}
                </Badge>
                <Badge variant="outline" className="text-xs uppercase">
                  {mode}
                </Badge>
              </div>
            </div>

            <h2 className="text-2xl font-bold flex items-center gap-3">
              {activePalette ? (
                <>
                  {activePalette.name}
                  <Badge variant="secondary" className="text-sm font-normal">Custom</Badge>
                </>
              ) : (
                <>
                  Default {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
                  <Badge variant="outline" className="text-sm font-normal">System</Badge>
                </>
              )}
            </h2>

            <p className="text-[var(--color-text-secondary)] mt-1">
              {activePalette
                ? activePalette.description || 'Custom color configuration'
                : 'Using the standard base tokens for this theme.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <a href="#themes/palettes" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Change Palette
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </Card>

      {/* Generated Color Scale - Only show if custom palette is active */}
      {activePalette && (
        <section>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Generated Color Scale</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              The Sage Color Engine automatically generates a complete tonal palette from your primary color.
            </p>
          </div>

          <Card className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
              {scaleSteps.map((step) => {
                const varName = `--color-primary-${step}`;
                const isBase = step === 500;

                // Get value for display
                const value = isMounted
                  ? getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
                  : '';

                return (
                  <div key={step} className="group relative">
                    <div
                      className={`
                          h-16 rounded-lg mb-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-sm border border-[var(--color-border)]
                          ${isBase ? 'ring-2 ring-[var(--color-primary)] ring-offset-2' : ''}
                        `}
                      style={{ backgroundColor: `var(${varName})` }}
                      onClick={() => copyVarValue(varName)}
                    >
                      {/* Hover Copy Overlay similar to standard cards */}
                      <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/20 backdrop-blur-sm p-2 rounded-full text-white">
                          <Copy className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                        {step}
                      </div>

                      {/* Updated font sizing and styling to match Token Cards */}
                      <div className="text-xs font-mono text-[var(--color-text-tertiary)] h-5 flex items-center justify-center">
                        {copiedColor === varName ? (
                          <span className="text-green-600 font-medium flex items-center gap-1 scale-90">
                            <Check className="w-3 h-3" /> Copied
                          </span>
                        ) : (
                          <span>
                            {value || '...'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex gap-4 text-xs text-[var(--color-text-tertiary)]">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full border border-[var(--color-border)] bg-[var(--color-primary-50)]"></div>
                <span>50-400: Tints (Lightness+)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full border border-[var(--color-border)] ring-1 ring-[var(--color-border)] bg-[var(--color-primary)]"></div>
                <span>500: Base Color</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full border border-[var(--color-border)] bg-[var(--color-primary-900)]"></div>
                <span>600-900: Shades (Lightness-)</span>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Color Tokens by Category */}
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
                    onClick={() => copyVarValue(token.name)}
                    className="group text-left transition-all hover:scale-[1.02]"
                  >
                    <Card className="p-4 cursor-pointer h-full border border-[var(--color-border)] hover:border-[var(--color-primary)]">
                      {/* Color Swatch */}
                      <div
                        className="w-full h-20 rounded-lg mb-3 border border-[var(--color-border)] shadow-sm"
                        style={{ backgroundColor: `var(${token.name})` }}
                      >
                        <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/20 backdrop-blur-sm p-2 rounded-full text-white">
                            <Copy className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Variable Name */}
                      <div className="mb-1">
                        <Code className="text-xs font-semibold">
                          {token.name}
                        </Code>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2 line-clamp-1">
                        {token.description}
                      </p>

                      {/* Value */}
                      <div className="text-xs font-mono text-[var(--color-text-tertiary)] flex items-center justify-between">
                        {copiedColor === token.name ? (
                          <span className="text-green-600 font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" /> Copied
                          </span>
                        ) : (
                          <span>{colorValue || '...'}</span>
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
              <Card key={type} className="p-6 transition-all hover:shadow-md">
                <div
                  className="px-4 py-3 rounded-lg mb-3 text-center font-medium shadow-sm"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.fg,
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
                <div className="text-xs space-y-1 font-mono">
                  <div className="text-[var(--color-text-secondary)] flex justify-between">
                    <span>bg:</span> <span className="opacity-70">var(--color-{type})</span>
                  </div>
                  <div className="text-[var(--color-text-secondary)] flex justify-between">
                    <span>fg:</span> <span className="opacity-70">var(--color-{type}-foreground)</span>
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
                    className="px-4 py-3 rounded-lg flex items-center justify-between shadow-sm"
                    style={{ backgroundColor: pair.bg, color: pair.fg }}
                  >
                    <span className="font-medium">{pair.label}</span>
                    <Badge variant={meetsAA ? 'success' : 'destructive'} size="sm" className="bg-white/20 text-inherit border-white/20">
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
              Import from <Code>@sage/tokens</Code> or <Code>@sage/ui/utils</Code>
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Code className="text-xs mt-0.5">getCSSVariable(name)</Code>
                <p className="text-xs text-[var(--color-text-secondary)]">Get computed CSS variable value</p>
              </div>
              <div className="flex items-start gap-2">
                <Code className="text-xs mt-0.5">getContrastRatio(hex1, hex2)</Code>
                <p className="text-xs text-[var(--color-text-secondary)]">Calculate WCAG contrast ratio</p>
              </div>
              <div className="flex items-start gap-2">
                <Code className="text-xs mt-0.5">meetsContrastRequirements(fg, bg)</Code>
                <p className="text-xs text-[var(--color-text-secondary)]">Check AA/AAA compliance</p>
              </div>
              <div className="flex items-start gap-2">
                <Code className="text-xs mt-0.5">hexToRgb(hex)</Code>
                <p className="text-xs text-[var(--color-text-secondary)]">Convert hex to RGB values</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
