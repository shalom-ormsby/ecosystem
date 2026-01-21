'use client';
import React from 'react';
import { SlidersHorizontal, Sun, Moon, SunMoon, Building2, Leaf, Zap, X, Palette } from 'lucide-react';
import { useCustomizer } from '../../lib/store/customizer';
import { useThemeStore } from '../../lib/store/theme';
import { ColorPicker } from '../forms/ColorPicker';
import { Button } from '../actions/Button';

export interface CustomizerPanelProps {
    /**
     * Mode of the customizer:
     * - "full": Shows all controls (theme, mode, motion)
     * - "lightweight": Shows only light/dark mode toggle
     * @default "full"
     */
    mode?: 'full' | 'lightweight';
    /**
     * Whether to show the Motion Intensity slider
     * @default false
     */
    showMotionIntensity?: boolean;
}

export const CustomizerPanel = ({ mode = 'full', showMotionIntensity = false }: CustomizerPanelProps) => {
    const [mounted, setMounted] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const {
        motion,
        setMotion,
        customizationMode,
        setCustomizationMode,
        setCustomPrimaryColor,
        setCustomSecondaryColor,
        setCustomAccentColor,
        getActiveColorPalette,
        resetCustomColors
    } = useCustomizer();
    const { theme, mode: colorMode, setTheme, setMode } = useThemeStore();

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
        setCustomPrimaryColor(theme, colorMode, tempPrimaryColor);
        if (customizationMode === 'advanced') {
            setCustomSecondaryColor(theme, colorMode, tempSecondaryColor);
            setCustomAccentColor(theme, colorMode, tempAccentColor);
        }
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

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-background text-foreground px-4 py-2 rounded-full shadow-lg border border-[var(--color-glass-border)] font-medium hover:opacity-80 transition-all z-50 flex items-center gap-2"
                style={{ backdropFilter: 'var(--effect-blur-sm)' }}
            >
                {mode === 'lightweight' ? <SunMoon className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
                {mode === 'lightweight' ? 'Theme' : 'Customizer'}
            </button>
        );
    }

    return (
        <div
            className={`
                fixed bottom-4 right-4 z-50
                bg-background p-6 rounded-2xl shadow-2xl border border-[var(--color-glass-border)]
                text-foreground
                left-4 sm:left-auto
                w-auto sm:w-80
            `}
            style={{
                boxShadow: 'var(--effect-shadow-xl)',
                backdropFilter: 'var(--effect-blur-md)',
                backgroundColor: 'var(--color-glass)'
            }}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">{mode === 'lightweight' ? 'Theme Settings' : 'Experience Customizer'}</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-foreground opacity-60 hover:opacity-100 transition-opacity p-1"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-6">
                {/* Motion Intensity Slider - Full mode only + showMotionIntensity enabled */}
                {mode === 'full' && showMotionIntensity && (
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium opacity-80">Motion Intensity</label>
                            <span className="text-sm opacity-60">{motion}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={motion}
                            onChange={(e) => setMotion(Number(e.target.value))}
                            className="w-full h-2 bg-[var(--color-surface)] rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                )}

                {/* Theme Selector - Full mode only */}
                {mode === 'full' && (
                    <div>
                        <label className="block text-sm font-medium opacity-80 mb-3">Theme</label>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                            {[
                                { id: 'studio', label: 'Studio', icon: <Building2 className="w-4 h-4" /> },
                                { id: 'sage', label: 'Sage', icon: <Leaf className="w-4 h-4" /> },
                                { id: 'volt', label: 'Volt', icon: <Zap className="w-4 h-4" /> },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTheme(t.id as any)}
                                    className={`
                                        px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex flex-col items-center gap-1 border
                                        ${theme === t.id
                                            ? 'shadow-md'
                                            : 'bg-background-secondary text-foreground opacity-60 hover:opacity-100 border-[var(--color-glass-border)]'
                                        }
                                    `}
                                    style={theme === t.id ? {
                                        backgroundColor: 'var(--color-primary)',
                                        color: 'var(--color-primary-foreground)',
                                        borderColor: 'var(--color-primary)'
                                    } : {}}
                                >
                                    <span className="text-base">{t.icon}</span>
                                    <span>{t.label}</span>
                                </button>
                            ))}
                        </div>
                        {/* Typography Preview */}
                        <div className="text-xs opacity-60 space-y-1">
                            <div>
                                <span className="font-heading">Heading:</span> {
                                    theme === 'studio' ? 'Outfit' :
                                        theme === 'sage' ? 'Lora' :
                                            'Space Grotesk'
                                }
                            </div>
                            <div>
                                <span className="font-body">Body:</span> {
                                    theme === 'studio' ? 'Manrope' :
                                        theme === 'sage' ? 'Instrument Sans' :
                                            'Space Grotesk'
                                }
                            </div>
                        </div>
                    </div>
                )}

                {/* Mode Selector - Always visible */}
                <div>
                    <label className="block text-sm font-medium opacity-80 mb-3">Mode</label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { id: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
                            { id: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
                        ].map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMode(m.id as any)}
                                className={`
                                    px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 border
                                    ${colorMode === m.id
                                        ? 'shadow-md'
                                        : 'bg-background-secondary text-foreground opacity-60 hover:opacity-100 border-[var(--color-glass-border)]'
                                    }
                                `}
                                style={colorMode === m.id ? {
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'var(--color-primary-foreground)',
                                    borderColor: 'var(--color-primary)'
                                } : {}}
                            >
                                <span>{m.icon}</span>
                                <span>{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Customizer - Full mode only */}
                {mode === 'full' && (
                    <div className="pt-4 border-t border-[var(--color-border)]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 opacity-80" />
                                <label className="text-sm font-medium opacity-80">Color Customization</label>
                            </div>
                            {/* Mode Toggle */}
                            <div className="flex gap-1 bg-[var(--color-surface)] rounded-md p-0.5">
                                <button
                                    onClick={() => setCustomizationMode('simple')}
                                    className={`
                                        px-2 py-1 text-xs rounded transition-all
                                        ${customizationMode === 'simple'
                                            ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                                            : 'opacity-60 hover:opacity-100'
                                        }
                                    `}
                                >
                                    Simple
                                </button>
                                <button
                                    onClick={() => setCustomizationMode('advanced')}
                                    className={`
                                        px-2 py-1 text-xs rounded transition-all
                                        ${customizationMode === 'advanced'
                                            ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                                            : 'opacity-60 hover:opacity-100'
                                        }
                                    `}
                                >
                                    Advanced
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Primary Color */}
                            <div>
                                <label className="text-xs font-medium opacity-70 mb-2 block">Primary Color</label>
                                <ColorPicker
                                    value={tempPrimaryColor}
                                    onChange={setTempPrimaryColor}
                                />
                            </div>

                            {/* Secondary Color - Advanced mode only */}
                            {customizationMode === 'advanced' && (
                                <div>
                                    <label className="text-xs font-medium opacity-70 mb-2 block">Secondary Color</label>
                                    <ColorPicker
                                        value={tempSecondaryColor}
                                        onChange={setTempSecondaryColor}
                                    />
                                </div>
                            )}

                            {/* Accent Color - Advanced mode only */}
                            {customizationMode === 'advanced' && (
                                <div>
                                    <label className="text-xs font-medium opacity-70 mb-2 block">Accent Color</label>
                                    <ColorPicker
                                        value={tempAccentColor}
                                        onChange={setTempAccentColor}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4">
                            <Button
                                onClick={handleApplyColor}
                                size="sm"
                                className="flex-1"
                                disabled={currentPalette?.primary === tempPrimaryColor &&
                                         (customizationMode === 'simple' ||
                                          (currentPalette?.secondary === tempSecondaryColor &&
                                           currentPalette?.accent === tempAccentColor))}
                            >
                                Apply Colors
                            </Button>
                            {currentPalette && (
                                <Button
                                    onClick={handleResetColors}
                                    variant="outline"
                                    size="sm"
                                >
                                    Reset
                                </Button>
                            )}
                        </div>

                        {/* Status Indicator */}
                        {currentPalette && (
                            <p className="text-xs opacity-60 mt-2">
                                Custom colors active for {theme} {colorMode} mode
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
