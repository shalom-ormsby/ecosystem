'use client';
import React from 'react';
import { useCustomizer } from '../../lib/store/customizer';
import { useThemeStore } from '../../lib/store/theme';

export interface CustomizerPanelProps {
    /**
     * Mode of the customizer:
     * - "full": Shows all controls (theme, mode, motion, x-ray)
     * - "lightweight": Shows only light/dark mode toggle
     * @default "full"
     */
    mode?: 'full' | 'lightweight';
}

export const CustomizerPanel = ({ mode = 'full' }: CustomizerPanelProps) => {
    const [mounted, setMounted] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const { motion, xrayMode, setMotion, toggleXray } = useCustomizer();
    const { theme, mode: colorMode, setTheme, setMode } = useThemeStore();

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
                <span className="text-lg">{mode === 'lightweight' ? '🌓' : '🎛️'}</span>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="space-y-6">
                {/* Motion Intensity Slider - Full mode only */}
                {mode === 'full' && (
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
                                { id: 'studio', label: 'Studio', emoji: '🏢' },
                                { id: 'sage', label: 'Sage', emoji: '🌿' },
                                { id: 'volt', label: 'Volt', emoji: '⚡' },
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
                                    <span className="text-base">{t.emoji}</span>
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
                            { id: 'light', label: 'Light', emoji: '☀️' },
                            { id: 'dark', label: 'Dark', emoji: '🌙' },
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
                                <span>{m.emoji}</span>
                                <span>{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* X-Ray Mode Toggle - Full mode only */}
                {mode === 'full' && (
                    <button
                        onClick={toggleXray}
                        className="w-full p-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border shadow-md"
                        style={xrayMode ? {
                            backgroundColor: 'var(--color-accent)',
                            borderColor: 'var(--color-accent)',
                            color: 'var(--color-accent-foreground)'
                        } : {
                            backgroundColor: 'var(--color-foreground)',
                            borderColor: 'var(--color-foreground)',
                            color: 'var(--color-background)'
                        }}
                    >
                        {xrayMode ? 'Hide X-Ray Mode' : 'Reveal X-Ray Mode'}
                    </button>
                )}
            </div>
        </div>
    );
};
