'use client';

import { OrbBackground, Card, Heading, Text, Stack, Slider, Label, CollapsibleCodeBlock, ThemeToggle } from '@sage/ui';
import { useState } from 'react';

const CONST_CODE = `import { OrbBackground } from '@sage/ui';

export function MyHero() {
  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden rounded-xl">
      <OrbBackground 
        hue={314} 
        hoverIntensity={0.5} 
        backgroundColor="#ff00cc" 
      />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl font-bold text-white z-10">Orb Effect</h1>
      </div>
    </div>
  );
}`;

export function OrbBackgroundPage() {
    const [hue, setHue] = useState(314);
    const [intensity, setIntensity] = useState(0.8);
    const [primaryColor, setPrimaryColor] = useState('#8b5cf6'); // Default violet

    return (
        <div className="space-y-12 pb-24">
            {/* Header */}
            <Stack className="space-y-2">
                <div className="flex items-center justify-between">
                    <Heading level={1}>Orb Background</Heading>
                    <ThemeToggle />
                </div>
                <Text variant="secondary" className="text-xl max-w-2xl">
                    A WebGL-powered glowing orb animation with organic noise movement and dynamic color support.
                    Perfect for hero sections and feature highlights.
                </Text>
            </Stack>

            {/* Preview */}
            <Card className="p-6 space-y-8">
                <div className="relative w-full h-[500px] overflow-hidden rounded-xl bg-black border border-white/10 group">
                    <OrbBackground
                        hue={hue}
                        hoverIntensity={intensity}
                        backgroundColor={primaryColor}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none z-10">
                        <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter drop-shadow-2xl">
                            Radiant Energy
                        </h2>
                        <p className="text-white/80 max-w-md">
                            A high-performance shader effect that reacts to theme colors.
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <Stack className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Hue Shift ({hue}°)</Label>
                            </div>
                            <Slider
                                value={[hue]}
                                min={0}
                                max={360}
                                step={1}
                                onValueChange={(v) => setHue(v[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Intensity ({intensity})</Label>
                            </div>
                            <Slider
                                value={[intensity]}
                                min={0.1}
                                max={2.0}
                                step={0.1}
                                onValueChange={(v) => setIntensity(v[0])}
                            />
                        </div>
                    </Stack>

                    <Stack className="space-y-4">
                        <div className="space-y-2">
                            <Label>Base Color</Label>
                            <div className="flex gap-2">
                                {['#8b5cf6', '#3b82f6', '#ec4899', '#f59e0b', '#10b981'].map((c) => (
                                    <button
                                        key={c}
                                        className={`w-8 h-8 rounded-full border-2 ${primaryColor === c ? 'border-white ring-2 ring-primary/50' : 'border-transparent'}`}
                                        style={{ backgroundColor: c }}
                                        onClick={() => setPrimaryColor(c)}
                                    />
                                ))}
                            </div>
                        </div>
                    </Stack>
                </div>
            </Card>

            {/* Code */}
            <section className="space-y-4">
                <Heading level={2}>Installation & Usage</Heading>
                <CollapsibleCodeBlock
                    id="orb-background-usage"
                    code={CONST_CODE}
                    language="tsx"
                    defaultCollapsed={false}
                />
            </section>
        </div>
    );
}
