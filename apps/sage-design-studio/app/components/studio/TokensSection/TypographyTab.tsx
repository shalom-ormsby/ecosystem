'use client';

import { useState } from 'react';
import { Card, Code } from '@sds/ui';
import { typographySystem } from '@sds/ui';
import { Building2, Leaf, Zap } from 'lucide-react';

// Font CSS variable mapping for each theme
const themeFontVars = {
  studio: {
    heading: 'var(--font-studio-heading)',
    body: 'var(--font-studio-body)',
    mono: 'var(--font-mono)',
  },
  sage: {
    heading: 'var(--font-sage-heading)',
    body: 'var(--font-sage-body)',
    mono: 'var(--font-mono)',
  },
  volt: {
    heading: 'var(--font-volt-heading)',
    body: 'var(--font-volt-heading)', // Volt uses same font for both
    mono: 'var(--font-mono)',
  },
};

export function TypographyTab() {
  const [selectedTheme, setSelectedTheme] = useState<'studio' | 'sage' | 'volt'>('studio');

  const themes = [
    { id: 'studio' as const, label: 'Studio', icon: <Building2 className="w-5 h-5" /> },
    { id: 'sage' as const, label: 'Sage', icon: <Leaf className="w-5 h-5" /> },
    { id: 'volt' as const, label: 'Volt', icon: <Zap className="w-5 h-5" /> },
  ];

  const currentThemeFonts = typographySystem.families[selectedTheme];
  const currentFontVars = themeFontVars[selectedTheme];

  return (
    <div className="space-y-8">
      {/* Typography System Overview */}
      <Card className="p-6 bg-[var(--color-surface)]">
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Typography System
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Our typography system provides a complete set of font families, sizes, weights, and presets.
          Each theme has its own carefully chosen font pairing that reflects its unique personality.
        </p>

        {/* All Themes at a Glance */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
            All Themes at a Glance
          </h4>
          <div className="p-6 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-3 px-4 text-[var(--color-text-primary)]">Theme</th>
                    <th className="text-left py-3 px-4 text-[var(--color-text-primary)]">Heading</th>
                    <th className="text-left py-3 px-4 text-[var(--color-text-primary)]">Body</th>
                    <th className="text-left py-3 px-4 text-[var(--color-text-primary)]">Personality</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-text-secondary)]">
                  {themes.map((theme) => {
                    const fonts = typographySystem.families[theme.id];
                    return (
                      <tr key={theme.id} className="border-b border-[var(--color-border)] last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span>{theme.icon}</span>
                            <strong className="text-[var(--color-text-primary)]">{theme.label}</strong>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-semibold">{fonts.heading}</td>
                        <td className="py-3 px-4">{fonts.body}</td>
                        <td className="py-3 px-4 text-xs">{fonts.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>

      {/* Theme Selector */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Explore Theme Fonts
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          Select a theme to see its actual fonts in action. All examples below will display using the theme's real typography.
        </p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`
                px-4 py-3 rounded-lg text-sm font-medium transition-all flex flex-col items-center gap-2 border
                ${selectedTheme === theme.id
                  ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-md border-[var(--color-primary)]'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-[var(--color-border)]'
                }
              `}
            >
              <span className="text-xl flex items-center justify-center">{theme.icon}</span>
              <span>{theme.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Theme Font Details */}
        <Card className="p-6 bg-[var(--color-surface)]">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              {themes.find(t => t.id === selectedTheme)?.label} Theme
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {currentThemeFonts.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Heading Font */}
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Heading Font</p>
                <p
                  className="text-3xl font-bold text-[var(--color-text-primary)]"
                  style={{ fontFamily: currentFontVars.heading }}
                >
                  {currentThemeFonts.heading}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text-primary)]">Usage:</strong>{' '}
                  {currentThemeFonts.usage.heading}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  CSS Variable: <Code className="text-xs">
                    --font-{selectedTheme}-heading
                  </Code>
                </p>
              </div>
            </Card>

            {/* Body Font */}
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Body Font</p>
                <p
                  className="text-3xl font-medium text-[var(--color-text-primary)]"
                  style={{ fontFamily: currentFontVars.body }}
                >
                  {currentThemeFonts.body}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text-primary)]">Usage:</strong>{' '}
                  {currentThemeFonts.usage.body}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  CSS Variable: <Code className="text-xs">
                    --font-{selectedTheme}-body
                  </Code>
                </p>
              </div>
            </Card>

            {/* Monospace Font */}
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Monospace Font</p>
                <p
                  className="text-3xl text-[var(--color-text-primary)]"
                  style={{ fontFamily: currentFontVars.mono }}
                >
                  {currentThemeFonts.mono}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text-primary)]">Usage:</strong>{' '}
                  {currentThemeFonts.usage.mono}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  CSS Variable: <Code className="text-xs">
                    --font-mono
                  </Code>
                </p>
              </div>
            </Card>
          </div>
        </Card>
      </div>

      {/* Type Scale - USING ACTUAL THEME FONTS */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Type Scale ({themes.find(t => t.id === selectedTheme)?.label} Theme)
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Universal scale shown with <strong>{currentThemeFonts.body}</strong> (this theme's body font).
            Includes responsive sizing for mobile and desktop.
          </p>
          <div className="space-y-4">
            {Object.entries(typographySystem.sizes).slice(0, 7).map(([name, size]) => (
              <div key={name} className="border-b border-[var(--color-border)] pb-4 last:border-0">
                <div className="mb-2">
                  <p
                    className="text-[var(--color-text-primary)]"
                    style={{
                      fontSize: size.base,
                      fontFamily: currentFontVars.body,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <Code className="text-sm">
                    {name}
                  </Code>
                  <span className="text-[var(--color-text-secondary)]">
                    Base: {size.base}
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    Mobile: {size.mobile}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Font Weights - USING ACTUAL THEME FONTS */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Font Weights ({themes.find(t => t.id === selectedTheme)?.label} Theme)
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Standard weight scale shown with <strong>{currentThemeFonts.heading}</strong> (this theme's heading font).
            Not all fonts support all weights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(typographySystem.weights).map(([name, value]) => (
              <div key={name} className="flex items-center justify-between p-3 bg-[var(--color-background)] rounded">
                <p
                  className="text-lg text-[var(--color-text-primary)]"
                  style={{
                    fontWeight: value,
                    fontFamily: currentFontVars.heading,
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[var(--color-text-muted)]">{value}</span>
                  <Code className="text-xs">font-{name}</Code>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Line Heights - USING ACTUAL THEME FONTS */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Line Heights ({themes.find(t => t.id === selectedTheme)?.label} Theme)
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Unitless values for better scalability. Examples shown with <strong>{currentThemeFonts.body}</strong>.
          </p>
          <div className="space-y-4">
            {Object.entries(typographySystem.lineHeights).map(([name, value]) => (
              <div key={name} className="border-b border-[var(--color-border)] pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <Code className="text-sm">
                    {name}
                  </Code>
                  <span className="text-sm text-[var(--color-text-muted)]">{value}</span>
                </div>
                <p
                  className="text-[var(--color-text-secondary)] text-sm"
                  style={{
                    lineHeight: value,
                    fontFamily: currentFontVars.body,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Letter Spacing - USING ACTUAL THEME FONTS */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Letter Spacing ({themes.find(t => t.id === selectedTheme)?.label} Theme)
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            In ems for scalability. Examples shown with <strong>{currentThemeFonts.heading}</strong> in all caps.
          </p>
          <div className="space-y-3">
            {Object.entries(typographySystem.letterSpacing).map(([name, value]) => (
              <div key={name} className="flex items-center justify-between p-3 bg-[var(--color-background)] rounded">
                <p
                  className="text-lg text-[var(--color-text-primary)]"
                  style={{
                    letterSpacing: value,
                    fontFamily: currentFontVars.heading,
                  }}
                >
                  LETTER SPACING EXAMPLE
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <Code className="text-xs">{name}</Code>
                  <span className="text-[var(--color-text-muted)]">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Type Presets - USING ACTUAL THEME FONTS */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Type Presets ({themes.find(t => t.id === selectedTheme)?.label} Theme)
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Ready-to-use combinations shown with <strong>{currentThemeFonts.heading}</strong> for headings
            and <strong>{currentThemeFonts.body}</strong> for body text.
          </p>
          <div className="space-y-6">
            {Object.entries(typographySystem.presets).slice(0, 8).map(([name, preset]) => {
              // Use heading font for heading presets, body font for body presets
              const isHeadingPreset = name.includes('heading') || name.includes('display');
              const fontFamily = isHeadingPreset ? currentFontVars.heading : currentFontVars.body;

              return (
                <div key={name} className="border-b border-[var(--color-border)] pb-6 last:border-0">
                  <div className="mb-3">
                    <p
                      className="text-[var(--color-text-primary)]"
                      style={{
                        fontSize: preset.size.base,
                        fontWeight: preset.weight,
                        lineHeight: preset.lineHeight,
                        letterSpacing: preset.letterSpacing,
                        fontFamily: fontFamily,
                      }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </p>
                  </div>
                  <div className="flex items-start gap-6 text-xs">
                    <div>
                      <code className="font-mono text-[var(--color-primary)] px-2 py-1 bg-[var(--color-surface)] rounded">
                        {name}
                      </code>
                    </div>
                    <div className="flex-1 text-[var(--color-text-muted)]">
                      {preset.description}
                    </div>
                    <div className="text-right text-[var(--color-text-muted)]">
                      <div>Size: {preset.size.base}</div>
                      <div>Weight: {preset.weight}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
