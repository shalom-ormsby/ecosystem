'use client';
import React from 'react';
import { SlidersHorizontal, Sun, Moon, Building2, Leaf, Zap, Palette } from 'lucide-react';
import { useCustomizer, useTheme, ColorPicker, Button, Card } from '@sage/ui';

export function CustomizerTab() {
    const [mounted, setMounted] = React.useState(false);
    const {
        motion,
        setMotion,
        customizationMode,
        setCustomizationMode,
        applyColorPalette,
        getActiveColorPalette,
        resetCustomColors
    } = useCustomizer();
    const { theme, mode: colorMode, setTheme, setMode } = useTheme();

    // Get current custom colors
    const currentPalette = getActiveColorPalette(theme, colorMode);
    const [tempPrimaryColor, setTempPrimaryColor] = React.useState(currentPalette?.primary || '#0a0a0a');
    const [tempSecondaryColor, setTempSecondaryColor] = React.useState(currentPalette?.secondary || '#5a67d8');
    const [tempAccentColor, setTempAccentColor] = React.useState(currentPalette?.accent || '#ff6b35');

    // Update temp color when palette changes
    React.useEffect(() => {
        if (currentPalette) {
            setTempPrimaryColor(currentPalette.primary);
            setTempSecondaryColor(currentPalette.secondary || currentPalette.primary);
            setTempAccentColor(currentPalette.accent || '#ff6b35');
        }
    }, [currentPalette]);

    const handleApplyColor = () => {
        // Apply all colors atomically, clearing secondary/accent in simple mode
        applyColorPalette(theme, colorMode, {
            primary: tempPrimaryColor,
            secondary: customizationMode === 'advanced' ? tempSecondaryColor : undefined,
            accent: customizationMode === 'advanced' ? tempAccentColor : undefined,
        });
    };

    const handleResetColors = () => {
        resetCustomColors(theme, colorMode);
        setTempPrimaryColor('#0a0a0a');
        setTempSecondaryColor('#5a67d8');
        setTempAccentColor('#ff6b35');
    };

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Experience Customizer</h2>
                <p className="text-[var(--color-text-secondary)]">
                    Fine-tune the global theme and motion settings for the entire application.
                </p>
            </div>

            <div className="space-y-6">
                {/* Motion Intensity Slider */}
                <Card className="p-6">
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 opacity-80" />
                            <label className="text-lg font-medium opacity-80">Motion Intensity</label>
                        </div>
                        <span className="text-sm opacity-60 font-mono bg-[var(--color-surface)] px-2 py-1 rounded">
                            {motion} / 10
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={motion}
                        onChange={(e) => setMotion(Number(e.target.value))}
                        className="w-full h-2 bg-[var(--color-surface)] rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <p className="text-sm text-[var(--color-text-secondary)] mt-3">
                        Controls the speed and intensity of animations across the ecosystem.
                        Lower values result in faster, subtler motion.
                    </p>
                </Card>

                {/* Theme Selector */}
                <Card className="p-6">
                    <label className="block text-lg font-medium opacity-80 mb-4">Base Theme</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        {[
                            { id: 'studio', label: 'Studio', icon: <Building2 className="w-5 h-5" /> },
                            { id: 'sage', label: 'Sage', icon: <Leaf className="w-5 h-5" /> },
                            { id: 'volt', label: 'Volt', icon: <Zap className="w-5 h-5" /> },
                        ].map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id as any)}
                                className={`
                  px-4 py-4 rounded-xl text-base font-medium transition-all flex flex-col items-center gap-2 border
                  ${theme === t.id
                                        ? 'shadow-md border-[var(--color-primary)]'
                                        : 'bg-background-secondary text-foreground opacity-60 hover:opacity-100 border-[var(--color-border)]'
                                    }
                `}
                                style={theme === t.id ? {
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'var(--color-primary-foreground)',
                                } : {}}
                            >
                                <span className="text-lg">{t.icon}</span>
                                <span>{t.label}</span>
                            </button>
                        ))}
                    </div>
                    {/* Typography Preview */}
                    <div className="text-sm opacity-60 space-y-1 bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
                        <div className="flex justify-between">
                            <span className="font-heading">Heading Font:</span>
                            <span className="font-medium">{
                                theme === 'studio' ? 'Outfit' :
                                    theme === 'sage' ? 'Lora' :
                                        'Space Grotesk'
                            }</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-body">Body Font:</span>
                            <span className="font-medium">{
                                theme === 'studio' ? 'Manrope' :
                                    theme === 'sage' ? 'Instrument Sans' :
                                        'Space Grotesk'
                            }</span>
                        </div>
                    </div>
                </Card>

                {/* Mode Selector */}
                <Card className="p-6">
                    <label className="block text-lg font-medium opacity-80 mb-4">Color Mode</label>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'light', label: 'Light', icon: <Sun className="w-5 h-5" /> },
                            { id: 'dark', label: 'Dark', icon: <Moon className="w-5 h-5" /> },
                        ].map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMode(m.id as any)}
                                className={`
                  px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 border
                  ${colorMode === m.id
                                        ? 'shadow-md border-[var(--color-primary)]'
                                        : 'bg-background-secondary text-foreground opacity-60 hover:opacity-100 border-[var(--color-border)]'
                                    }
                `}
                                style={colorMode === m.id ? {
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'var(--color-primary-foreground)',
                                } : {}}
                            >
                                <span>{m.icon}</span>
                                <span>{m.label}</span>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Color Customizer */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Palette className="w-5 h-5 opacity-80" />
                            <label className="text-lg font-medium opacity-80">Color Customization</label>
                        </div>
                        {/* Mode Toggle */}
                        <div className="flex gap-1 bg-[var(--color-surface)] rounded-md p-1 border border-[var(--color-border)]">
                            <button
                                onClick={() => setCustomizationMode('simple')}
                                className={`
                  px-3 py-1.5 text-xs rounded transition-all font-medium
                  ${customizationMode === 'simple'
                                        ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm'
                                        : 'opacity-60 hover:opacity-100'
                                    }
                `}
                            >
                                Simple
                            </button>
                            <button
                                onClick={() => setCustomizationMode('advanced')}
                                className={`
                  px-3 py-1.5 text-xs rounded transition-all font-medium
                  ${customizationMode === 'advanced'
                                        ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm'
                                        : 'opacity-60 hover:opacity-100'
                                    }
                `}
                            >
                                Advanced
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Primary Color */}
                        <div>
                            <label className="text-sm font-medium opacity-70 mb-2 block">Primary Color</label>
                            <ColorPicker
                                value={tempPrimaryColor}
                                onChange={setTempPrimaryColor}
                            />
                            <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                                Used for main actions, active states, and focus rings.
                            </p>
                        </div>

                        {/* Secondary Color - Advanced mode only */}
                        {customizationMode === 'advanced' && (
                            <div className="pt-4 border-t border-[var(--color-border)]">
                                <label className="text-sm font-medium opacity-70 mb-2 block">Secondary Color</label>
                                <ColorPicker
                                    value={tempSecondaryColor}
                                    onChange={setTempSecondaryColor}
                                />
                                <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                                    Used for secondary actions and supporting elements.
                                </p>
                            </div>
                        )}

                        {/* Accent Color - Advanced mode only */}
                        {customizationMode === 'advanced' && (
                            <div className="pt-4 border-t border-[var(--color-border)]">
                                <label className="text-sm font-medium opacity-70 mb-2 block">Accent Color</label>
                                <ColorPicker
                                    value={tempAccentColor}
                                    onChange={setTempAccentColor}
                                />
                                <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                                    Used for highlights and special emphasis.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-8 pt-6 border-t border-[var(--color-border)]">
                        <Button
                            onClick={handleApplyColor}
                            className="flex-1"
                            disabled={currentPalette?.primary === tempPrimaryColor &&
                                (customizationMode === 'simple' ||
                                    (currentPalette?.secondary === tempSecondaryColor &&
                                        currentPalette?.accent === tempAccentColor))}
                        >
                            Apply Changes
                        </Button>
                        {currentPalette && (
                            <Button
                                onClick={handleResetColors}
                                variant="outline"
                            >
                                Reset to Default
                            </Button>
                        )}
                    </div>

                    {/* Status Indicator */}
                    {currentPalette && (
                        <p className="text-sm opacity-60 mt-4 text-center">
                            Custom settings active for <strong>{theme}</strong> ({colorMode})
                        </p>
                    )}
                </Card>
            </div>
        </div>
    );
}
