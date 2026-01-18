'use client';

import { Card, Motion } from '@sds/ui';
import { useRouter } from 'next/navigation';
const { SplashCursor } = Motion;

export function CursorsSection() {
    const router = useRouter();

    const navigateTo = (path: string) => {
        // Using hash navigation as per other sections
        window.location.hash = path;
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Cursor Effects
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] ">
                    Custom cursor animations and effects that follow user movement. Create immersive experiences with gradient pointers, magnetic effects, and custom cursors.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Splash Cursor Card */}
                <Card
                    className="group relative overflow-hidden bg-[#1a1a1a] min-h-[300px] cursor-pointer transition-all duration-300 hover:shadow-2xl border-[var(--color-border)]"
                    onClick={() => navigateTo('#motion/splash-cursor')}
                >
                    <div className="absolute inset-0">
                        <SplashCursor
                            SPLAT_RADIUS={0.2}
                            SPLAT_FORCE={3000}
                            style={{ position: 'absolute' }}
                        />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent">
                        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                            <h2 className="text-xl font-bold text-white mb-2">
                                Splash Cursor
                            </h2>
                            <p className="text-white/80 text-sm">
                                High-performance fluid simulation reacting to mouse velocity and clicks.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Target Cursor Card */}
                <Card
                    className="group relative overflow-hidden bg-[#1a1a1a] min-h-[300px] cursor-pointer transition-all duration-300 hover:shadow-2xl border-[var(--color-border)]"
                    onClick={() => navigateTo('#motion/target-cursor')}
                >
                    {/* Visual Preview */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Simulated Trailing Ring */}
                            <div className="absolute w-12 h-12 border border-white/40 rounded-full transition-transform duration-700 ease-out group-hover:scale-110" />
                            {/* Dot */}
                            <div className="absolute w-2 h-2 bg-white rounded-full" />
                            {/* Crosshairs (decorative) */}
                            <div className="absolute w-24 h-[1px] bg-white/10" />
                            <div className="absolute h-24 w-[1px] bg-white/10" />
                        </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent">
                        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                            <h2 className="text-xl font-bold text-white mb-2">
                                Target Cursor
                            </h2>
                            <p className="text-white/80 text-sm">
                                Precision cursor replacement with a tracking ring and magnetic hover states.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Gradient Pointer Card (Coming Soon) */}
                <Card className="p-6 cursor-pointer group opacity-60">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-[var(--color-text-muted)]">Gradient Pointer</h2>
                        <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Planned</span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-4">Radial gradient that follows the cursor.</p>
                    <div className="aspect-video bg-[var(--color-surface)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
                        <span className="text-[var(--color-text-muted)] text-sm">Coming Soon</span>
                    </div>
                </Card>

                {/* Magnetic Filings Card (Coming Soon) */}
                <Card className="p-6 cursor-pointer group opacity-60">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-[var(--color-text-muted)]">Magnetic Filings</h2>
                        <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Planned</span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-4">Particles that follow the cursor like iron filings.</p>
                    <div className="aspect-video bg-[var(--color-surface)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
                        <span className="text-[var(--color-text-muted)] text-sm">Coming Soon</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
