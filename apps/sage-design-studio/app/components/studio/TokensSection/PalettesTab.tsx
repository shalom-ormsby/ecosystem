'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@sage/ui';
import { useTheme } from '@sage/ui/hooks';
import { useCustomizer } from '@sage/ui';
import { colorPalettes, type PaletteCategory } from '@sage/tokens';
import { Check } from 'lucide-react';

const CATEGORIES: { value: PaletteCategory; label: string; icon: string }[] = [
  { value: 'professional', label: 'Professional', icon: '💼' },
  { value: 'creative', label: 'Creative', icon: '🎨' },
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'vibrant', label: 'Vibrant', icon: '⚡' },
  { value: 'minimal', label: 'Minimal', icon: '◻️' },
  { value: 'luxury', label: 'Luxury', icon: '👑' },
  { value: 'playful', label: 'Playful', icon: '🎈' },
];

export function PalettesTab() {
  const [selectedCategory, setSelectedCategory] = useState<PaletteCategory>('professional');
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const { theme, mode } = useTheme();
  const { setCustomPrimaryColor, getActiveColorPalette, resetCustomColors } = useCustomizer();

  const currentPalette = getActiveColorPalette(theme, mode);

  const filteredPalettes = colorPalettes
    .filter(p => p.category === selectedCategory)
    .filter(p => !accessibleOnly || p.wcagAA);

  const applyPalette = (paletteId: string) => {
    const palette = colorPalettes.find(p => p.id === paletteId);
    if (!palette) return;

    setCustomPrimaryColor(theme, mode, palette.primary);
  };

  const resetColors = () => {
    resetCustomColors(theme, mode);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Curated Color Palettes</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Pre-designed, accessible color schemes for quick customization.
          Choose a palette to instantly update your {mode} mode theme.
        </p>
      </div>

      {/* Current Status */}
      {currentPalette && (
        <Card className="p-4 border-[var(--color-primary)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded border border-[var(--color-border)]"
                style={{ backgroundColor: currentPalette.primary }}
              />
              <div>
                <p className="text-sm font-medium">Custom color active</p>
                <p className="text-xs text-[var(--color-text-secondary)] font-mono">
                  {currentPalette.primary.toUpperCase()}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetColors}
            >
              Reset to Theme Default
            </Button>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Accessibility Filter */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="accessible-only"
            checked={accessibleOnly}
            onChange={(e) => setAccessibleOnly(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="accessible-only" className="text-sm">
            Show only WCAG AA compliant palettes
          </label>
        </div>
      </div>

      {/* Palette Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPalettes.map(palette => {
          const isActive = currentPalette?.primary === palette.primary;

          return (
            <Card
              key={palette.id}
              className={`
                p-4 cursor-pointer transition-all
                hover:shadow-lg hover:border-[var(--color-primary)]
                ${isActive ? 'ring-2 ring-[var(--color-primary)]' : ''}
              `}
            >
              {/* Color Preview */}
              <div className="flex gap-2 mb-3">
                {/* Primary Color */}
                <div className="flex-1">
                  <div
                    className="h-16 rounded mb-1"
                    style={{ backgroundColor: palette.primary }}
                    title={`Primary: ${palette.primary}`}
                  />
                  <div className="text-xs text-center text-[var(--color-text-secondary)] font-medium">
                    Primary
                  </div>
                </div>
                {/* Accent Color */}
                <div className="flex-1">
                  <div
                    className="h-16 rounded mb-1"
                    style={{ backgroundColor: palette.accent }}
                    title={`Accent: ${palette.accent}`}
                  />
                  <div className="text-xs text-center text-[var(--color-text-secondary)] font-medium">
                    Accent
                  </div>
                </div>
              </div>

              {/* Palette Info */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">{palette.name}</h4>
                  {isActive && (
                    <Badge variant="default" className="ml-2">
                      <Check className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-[var(--color-text-secondary)]">
                  {palette.description}
                </p>

                {/* Mood Tags */}
                <div className="flex flex-wrap gap-1">
                  {palette.mood.map(mood => (
                    <Badge key={mood} variant="secondary" className="text-xs">
                      {mood}
                    </Badge>
                  ))}
                </div>

                {/* Accessibility Badge */}
                {palette.wcagAAA && (
                  <Badge variant="default" className="text-xs bg-green-600">AAA</Badge>
                )}
                {palette.wcagAA && !palette.wcagAAA && (
                  <Badge variant="default" className="text-xs">AA</Badge>
                )}
                {!palette.wcagAA && (
                  <Badge variant="outline" className="text-xs">Vibrant</Badge>
                )}

                {/* Best For */}
                {palette.bestFor && (
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Best for: {palette.bestFor.join(', ')}
                  </p>
                )}
              </div>

              {/* Apply Button */}
              <Button
                onClick={() => applyPalette(palette.id)}
                variant={isActive ? 'outline' : 'default'}
                size="sm"
                className="w-full mt-3"
              >
                {isActive ? 'Currently Active' : 'Apply Palette'}
              </Button>
            </Card>
          );
        })}
      </div>

      {filteredPalettes.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-secondary)]">
          No palettes found. Try a different category or disable accessibility filter.
        </div>
      )}
    </div>
  );
}
