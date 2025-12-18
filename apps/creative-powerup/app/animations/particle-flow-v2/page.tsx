'use client';

import { useState } from 'react';
import ParticleFlowCanvas, { type ParticleFlowConfig } from './ParticleFlowCanvas';
import Controls from './Controls';

const DEFAULT_CONFIG: ParticleFlowConfig = {
    particleCount: 200,
    speed: 1.5,
    trailLength: 0.8,
    baseColor: '#4285F4',
    flowIntensity: 1.0,
    motionMode: 'right-to-left',
    decay: 0.5,
    isInteractive: true,
};

export default function ParticleFlowV2Page() {
    const [config, setConfig] = useState<ParticleFlowConfig>(DEFAULT_CONFIG);

    return (
        <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans">
            {/* Background Layer */}
            <ParticleFlowCanvas config={config} />

            {/* UI Overlay Layer */}
            <Controls config={config} onConfigChange={setConfig} />

            {/* Back button handled by Layout usually, but ensuring navigation is clear */}
        </div>
    );
}
