'use client';
import React from 'react';
import { useCustomizer } from './store';

export const CustomizerPanel = () => {
    const [mounted, setMounted] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const { motion, theme, xrayMode, setMotion, setTheme, toggleXray } = useCustomizer();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg border border-neutral-200 font-medium hover:bg-neutral-50 transition-colors z-50 flex items-center gap-2"
            >
                <span className="text-lg">🎛️</span>
                Customizer
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 bg-white p-6 rounded-2xl shadow-2xl border border-neutral-200 z-50 text-black w-80 animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Experience Customizer</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-neutral-600">Motion Intensity</label>
                        <span className="text-sm text-neutral-400">{motion}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={motion}
                        onChange={(e) => setMotion(Number(e.target.value))}
                        className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-2">Theme</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['light', 'dark', 'sage'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTheme(t as any)}
                                className={`
                                    px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all
                                    ${theme === t
                                        ? 'bg-black text-white shadow-md'
                                        : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                                    }
                                `}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={toggleXray}
                    className={`
                        w-full p-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2
                        ${xrayMode
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg shadow-neutral-900/20'
                        }
                    `}
                >
                    {xrayMode ? 'Hide X-Ray Mode' : 'Reveal X-Ray Mode'}
                </button>
            </div>
        </div>
    );
};
