'use client';
import React from 'react';
import { useCustomizer } from './store';
import { useThemeStore } from '../../store/theme';

export const CustomizerPanel = () => {
    const [mounted, setMounted] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const { motion, xrayMode, setMotion, toggleXray } = useCustomizer();
    const { theme, mode, setTheme, setMode } = useThemeStore();

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
                <span className="text-lg">🎛️</span>
                Customizer
            </button>
        );
    }

    return (
        <div
            className="fixed bottom-4 right-4 bg-background p-6 rounded-2xl shadow-2xl border border-[var(--color-glass-border)] z-50 text-foreground w-80"
            style={{
                boxShadow: 'var(--effect-shadow-xl)',
                backdropFilter: 'var(--effect-blur-md)',
                backgroundColor: 'var(--color-glass)'
            }}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Experience Customizer</h3>
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
                {/* Motion Intensity Slider */}
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
                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>

                {/* Theme Selector */}
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
                                        ? 'bg-primary text-white shadow-md border-primary'
                                        : 'bg-background-secondary text-foreground opacity-60 hover:opacity-100 border-[var(--color-glass-border)]'
                                    }
                                `}
                                style={theme === t.id ? {
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'var(--color-background)'
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

                {/* Mode Selector */}
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
                                    ${mode === m.id
                                        ? 'bg-primary text-white shadow-md border-primary'
                                        : 'bg-background-secondary text-foreground opacity-60 hover:opacity-100 border-[var(--color-glass-border)]'
                                    }
                                `}
                                style={mode === m.id ? {
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'var(--color-background)'
                                } : {}}
                            >
                                <span>{m.emoji}</span>
                                <span>{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* X-Ray Mode Toggle */}
                <button
                    onClick={toggleXray}
                    className={`
                        w-full p-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border
                        ${xrayMode
                            ? 'bg-accent text-white shadow-md border-accent'
                            : 'bg-foreground text-background hover:opacity-90 border-foreground'
                        }
                    `}
                    style={xrayMode ? {
                        backgroundColor: 'var(--color-accent)',
                        borderColor: 'var(--color-accent)',
                        color: 'var(--color-background)'
                    } : {
                        backgroundColor: 'var(--color-foreground)',
                        borderColor: 'var(--color-foreground)',
                        color: 'var(--color-background)'
                    }}
                >
                    {xrayMode ? 'Hide X-Ray Mode' : 'Reveal X-Ray Mode'}
                </button>
            </div>
        </div>
    );
};
