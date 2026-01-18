'use client';

import { useState } from 'react';
import { Card, CollapsibleCodeBlock, Label, Switch, Slider, Backgrounds } from '@sds/ui';
import { Sparkles } from 'lucide-react';
const { WarpBackground } = Backgrounds;

const WARP_CODE = `import { Backgrounds } from '@sds/ui';
const { WarpBackground } = Backgrounds;

export default function HeroSection() {
  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden">
      <WarpBackground
        starSpeed={0.5}
        density={1.5}
        mouseInteraction={true}
        transparent={true}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <h1 className="text-6xl font-bold text-white tracking-tighter">
          Explore the Universe
        </h1>
      </div>
    </div>
  );
}`;

export function WarpSpeedPage() {
    const [warpConfig, setWarpConfig] = useState({
        starSpeed: 0.5,
        density: 1.5,
        mouseInteraction: true,
        transparent: false,
    });

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Warp Speed
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] ">
                    A stunning 3D starfield animation using WebGL. Perfect for immersive hero sections.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Preview Area */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="p-1 h-[500px] overflow-hidden relative bg-black border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
                        <WarpBackground
                            starSpeed={warpConfig.starSpeed}
                            density={warpConfig.density}
                            mouseInteraction={warpConfig.mouseInteraction}
                            transparent={warpConfig.transparent}
                        />
                        {/* Overlay Content Example */}
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                            <h3 className="text-4xl font-bold text-white tracking-tight mb-2 opacity-90">
                                Warp Speed
                            </h3>
                            <p className="text-indigo-200 text-sm font-mono opacity-70">
                                Interactive WebGL Background
                            </p>
                        </div>
                    </Card>

                    <CollapsibleCodeBlock
                        id="warp-code"
                        title="Usage Example"
                        code={WARP_CODE}
                        language="typescript"
                        showCopy={true}
                        defaultCollapsed={true}
                    />
                </div>

                {/* Controls Panel */}
                <Card className="p-6 h-fit sticky top-24">
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Customization
                    </h3>

                    <div className="space-y-8">
                        {/* Star Speed */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Star Speed</Label>
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">{warpConfig.starSpeed}</span>
                            </div>
                            <Slider
                                value={[warpConfig.starSpeed]}
                                min={0}
                                max={2}
                                step={0.1}
                                onValueChange={([v]) => setWarpConfig(prev => ({ ...prev, starSpeed: v }))}
                            />
                        </div>

                        {/* Density */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Density</Label>
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">{warpConfig.density}</span>
                            </div>
                            <Slider
                                value={[warpConfig.density]}
                                min={0.5}
                                max={3}
                                step={0.5}
                                onValueChange={([v]) => setWarpConfig(prev => ({ ...prev, density: v }))}
                            />
                        </div>

                        <div className="h-px bg-[var(--color-border)]" />

                        {/* Toggles */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Mouse Interaction</Label>
                                <Switch
                                    checked={warpConfig.mouseInteraction}
                                    onCheckedChange={(checked) => setWarpConfig(prev => ({ ...prev, mouseInteraction: checked }))}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Label>Transparent Background</Label>
                                <Switch
                                    checked={warpConfig.transparent}
                                    onCheckedChange={(checked) => setWarpConfig(prev => ({ ...prev, transparent: checked }))}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
