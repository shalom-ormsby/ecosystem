'use client';

import { Card } from '@sds/ui';

export function BackgroundsSection() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Backgrounds
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
                    Immersive, shader-based backgrounds to create depth and atmosphere. Use these for Hero sections, 404 pages, or feature reveals.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-2">Galaxy</h2>
                    <p className="text-[var(--color-text-secondary)] mb-4">A 3D starfield animation using WebGL.</p>
                    <div className="aspect-video bg-black rounded-lg mb-4 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
                            Selection Required
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-2">Faulty Terminal</h2>
                    <p className="text-[var(--color-text-secondary)] mb-4">Retro CRT monitor effect with glitches.</p>
                    <div className="aspect-video bg-[#1a1a1a] rounded-lg mb-4 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-green-500/50 text-sm font-mono">
                            Selection Required
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
