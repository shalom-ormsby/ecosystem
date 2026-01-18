'use client';

import { useState } from 'react';
import { Card, CollapsibleCodeBlock, Label, Slider, Switch, Motion } from '@sds/ui';
import { MousePointer2 } from 'lucide-react';
const { SplashCursor } = Motion;

const USAGE_CODE = `import SplashCursor from './SplashCursor';

export default function App() {
  return (
    <div className="relative w-full h-screen bg-black">
      <SplashCursor 
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1 className="text-white text-4xl font-bold">Move your cursor</h1>
      </div>
    </div>
  );
}`;

export function SplashCursorPage() {
    const [config, setConfig] = useState({
        splatRadius: 0.2,
        splatForce: 6000,
        shading: true,
    });

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Splash Cursor
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    A WebGL-based fluid simulation cursor effect.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Preview Area */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl bg-black border border-[var(--color-border)]">
                        <SplashCursor
                            SPLAT_RADIUS={config.splatRadius}
                            SPLAT_FORCE={config.splatForce}
                            SHADING={config.shading}
                            style={{ position: 'absolute' }}
                        />
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                            <h1 className="text-4xl font-bold text-white/90 mb-2 mix-blend-overlay">Fluid Interaction</h1>
                            <p className="text-white/60">Move your mouse to create splashes</p>
                        </div>
                    </div>

                    <CollapsibleCodeBlock
                        id="splash-cursor-code"
                        title="Usage Example"
                        code={USAGE_CODE}
                        language="typescript"
                        showCopy={true}
                        defaultCollapsed={true}
                    />
                </div>

                {/* Controls Panel */}
                <Card className="p-6 h-fit sticky top-24">
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                        <MousePointer2 className="w-4 h-4" />
                        Customization
                    </h3>

                    <div className="space-y-8">

                        {/* Splat Radius */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Splat Radius</Label>
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">{config.splatRadius.toFixed(2)}</span>
                            </div>
                            <Slider
                                value={[config.splatRadius]}
                                min={0.05}
                                max={1.0}
                                step={0.05}
                                onValueChange={([v]) => setConfig(prev => ({ ...prev, splatRadius: v }))}
                            />
                        </div>

                        {/* Splat Force */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Splat Force</Label>
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">{config.splatForce}</span>
                            </div>
                            <Slider
                                value={[config.splatForce]}
                                min={1000}
                                max={10000}
                                step={500}
                                onValueChange={([v]) => setConfig(prev => ({ ...prev, splatForce: v }))}
                            />
                        </div>

                        <div className="h-px bg-[var(--color-border)]" />

                        {/* Toggles */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Shading</Label>
                                <Switch
                                    checked={config.shading}
                                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, shading: checked }))}
                                />
                            </div>
                        </div>

                    </div>
                </Card>
            </div>
        </div>
    );
}
