'use client';

import { HeroBlock, OrbBackground, Typewriter, useTheme, BRAND } from '@thesage/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SageHero() {
    const router = useRouter();
    const { theme, mode } = useTheme();

    const [hue, setHue] = useState(260); // Start with purple/blue
    const [orbColor1, setOrbColor1] = useState('#9c43fe'); // Purple (original)
    const [orbColor2, setOrbColor2] = useState('#4cc2e9'); // Cyan (original)
    const [orbColor3, setOrbColor3] = useState('#101499'); // Deep blue (original)
    const [showControls, setShowControls] = useState(false);

    return (
        <HeroBlock
            className="min-h-[90vh]" /* Increased height */
            headline={
                <span>
                    The Solopreneur's <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] animate-gradient-x">
                        Development Stack
                    </span>
                </span>
            }
            description="Ship stunning, full-stack web applications faster with a systematic collection of tokens, components, and templates."
            badge="Human Touch x AI Power"
            primaryCta={{
                label: "Get Started",
                onClick: () => router.push('/docs#getting-started'),
                variant: 'secondary'
            }}
            background={
                <OrbBackground
                    hue={hue}
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    forceHoverState={false}
                    orbColor1={orbColor1}
                    orbColor2={orbColor2}
                    orbColor3={orbColor3}
                />
            }
        >
            <div className="mt-8 h-8 flex items-center justify-center text-[var(--color-text-secondary)] font-medium">
                <span className="mr-2">Build smarter with {BRAND.productName}</span>
                <span className="text-[var(--color-primary)]">
                    <Typewriter
                        text={['Tokens.', 'Components.', 'Blocks.', 'Templates.']}
                        speed={0.1}
                        loop={true}
                        delay={2}
                        cursor="|"
                    />
                </span>
            </div>

            {/* Color Controls - Toggle with Cmd/Ctrl + K */}
            <button
                onClick={() => setShowControls(!showControls)}
                className="fixed bottom-4 right-4 px-3 py-2 text-xs bg-[var(--color-background)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-muted)] transition-colors opacity-50 hover:opacity-100"
            >
                🎨 Orb Colors
            </button>

            {showControls && (
                <div className="fixed bottom-16 right-4 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg shadow-lg space-y-3 z-50">
                    <div className="text-sm font-semibold text-[var(--color-foreground)]">Orb Colors</div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                            <span className="w-20">Primary:</span>
                            <input
                                type="color"
                                value={orbColor1}
                                onChange={(e) => setOrbColor1(e.target.value)}
                                className="w-12 h-8 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={orbColor1}
                                onChange={(e) => setOrbColor1(e.target.value)}
                                className="flex-1 px-2 py-1 text-xs bg-[var(--color-muted)] border border-[var(--color-border)] rounded"
                            />
                        </label>

                        <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                            <span className="w-20">Secondary:</span>
                            <input
                                type="color"
                                value={orbColor2}
                                onChange={(e) => setOrbColor2(e.target.value)}
                                className="w-12 h-8 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={orbColor2}
                                onChange={(e) => setOrbColor2(e.target.value)}
                                className="flex-1 px-2 py-1 text-xs bg-[var(--color-muted)] border border-[var(--color-border)] rounded"
                            />
                        </label>

                        <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                            <span className="w-20">Tertiary:</span>
                            <input
                                type="color"
                                value={orbColor3}
                                onChange={(e) => setOrbColor3(e.target.value)}
                                className="w-12 h-8 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={orbColor3}
                                onChange={(e) => setOrbColor3(e.target.value)}
                                className="flex-1 px-2 py-1 text-xs bg-[var(--color-muted)] border border-[var(--color-border)] rounded"
                            />
                        </label>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-[var(--color-border)]">
                        <button
                            onClick={() => {
                                setOrbColor1('#9c43fe');
                                setOrbColor2('#4cc2e9');
                                setOrbColor3('#101499');
                            }}
                            className="flex-1 px-2 py-1 text-xs bg-[var(--color-muted)] hover:bg-[var(--color-accent)] rounded transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setShowControls(false)}
                            className="flex-1 px-2 py-1 text-xs bg-[var(--color-primary)] text-white hover:opacity-80 rounded transition-opacity"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </HeroBlock>
    );
}
