'use client';

import { Card } from '@sds/ui';
import { useRouter } from 'next/navigation';
import Galaxy from './examples/galaxy/Galaxy';
import FaultyTerminal from './examples/faulty-terminal/FaultyTerminal';

export function BackgroundsSection() {
    const router = useRouter();

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Backgrounds
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    Immersive, shader-based backgrounds to create depth and atmosphere. Use these for Hero sections, 404 pages, or feature reveals.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Galaxy Card */}
                <Card
                    className="p-6 cursor-pointer group"
                    hoverEffect={true}
                    onClick={() => {
                        // Using window.location.hash for internal router navigation in the studio
                        // Or if onItemChange is available in context, use that. 
                        // Since this is a child of MotionSections which manages tabs via state, 
                        // we might need to rely on the parent updating or hash change if supported.
                        // Given the implementation of MotionSections uses activeItemId prop, 
                        // the safest bet for a "drill down" in this specific studio architecture 
                        // (which seems to check hash via a parent or similar mechanism) 
                        // is to update the URL hash which usually drives the active item.
                        window.location.hash = '#motion/galaxy';
                    }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors">Galaxy</h2>
                        <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">WebGL</span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-4">A 3D starfield animation using WebGL.</p>
                    <div className="aspect-video bg-black rounded-lg mb-4 overflow-hidden relative pointer-events-none">
                        <Galaxy
                            starSpeed={0.5}
                            density={1}
                            mouseInteraction={false} // Disable interaction for preview card
                        />
                    </div>
                </Card>

                {/* Faulty Terminal Card */}
                <Card
                    className="p-6 cursor-pointer group"
                    hoverEffect={true}
                    onClick={() => {
                        window.location.hash = '#motion/faulty-terminal';
                    }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors">Faulty Terminal</h2>
                        <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">GLSL</span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-4">Retro CRT monitor effect with glitches.</p>
                    <div className="aspect-video bg-[#1a1a1a] rounded-lg mb-4 overflow-hidden relative pointer-events-none">
                        <FaultyTerminal
                            scale={0.5} // Scale down for preview
                            mouseReact={false} // Disable interaction for preview card
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}
