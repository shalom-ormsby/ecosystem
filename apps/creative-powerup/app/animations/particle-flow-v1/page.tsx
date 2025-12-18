'use client';

import { useState } from 'react';
import AntigravityCanvas, { type AntigravityConfig } from './AntigravityCanvas';
import Controls from './Controls';

const DEFAULT_CONFIG: AntigravityConfig = {
    particleCount: 200,
    speed: 1.5,
    trailLength: 0.8,
    baseColor: '#4285F4',
    flowIntensity: 1.0,
};

export default function AntigravityPage() {
    const [config, setConfig] = useState<AntigravityConfig>(DEFAULT_CONFIG);

    return (
        <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans">
            {/* Background Layer */}
            <AntigravityCanvas config={config} />

            {/* UI Overlay Layer */}
            <Controls config={config} onConfigChange={setConfig} />

            {/* Back button handled by Layout usually, but ensuring navigation is clear */}
        </div>
    );
}
