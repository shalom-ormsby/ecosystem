'use client';

import { useState } from 'react';
import { VariableWeightText, Card, Slider, Label, CollapsibleCodeBlock } from '@sds/ui';
import { Monitor, RefreshCcw } from 'lucide-react';

export function VariableWeightPage() {
    const [minWeight, setMinWeight] = useState(200);
    const [maxWeight, setMaxWeight] = useState(700);
    const [duration, setDuration] = useState(2);

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Variable Weight Text
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    Create organic, breathing typography using variable font weight interpolation.
                </p>
            </div>

            {/* Playground */}
            <Card className="p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                        Interactive Playground
                    </h2>
                    <div className="flex gap-2">
                        <button
                            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                            onClick={() => {
                                setMinWeight(200);
                                setMaxWeight(700);
                                setDuration(2);
                            }}
                            title="Reset to defaults"
                        >
                            <RefreshCcw size={18} />
                        </button>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-12 mb-8 flex items-center justify-center min-h-[300px] overflow-hidden relative">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--color-surface)_25%,transparent_25%,transparent_75%,var(--color-surface)_75%,var(--color-surface)),linear-gradient(45deg,var(--color-surface)_25%,transparent_25%,transparent_75%,var(--color-surface)_75%,var(--color-surface))] bg-[length:20px_20px] opacity-20 pointer-events-none" />

                    <VariableWeightText
                        minWeight={minWeight}
                        maxWeight={maxWeight}
                        duration={duration}
                        className="text-6xl md:text-8xl text-[var(--color-text-primary)] z-10"
                        fontFamily="Clash Display"
                    >
                        Clash Display
                    </VariableWeightText>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Minimum Weight</Label>
                                <span className="text-sm font-mono text-[var(--color-text-muted)]">{minWeight}</span>
                            </div>
                            <Slider
                                value={[minWeight]}
                                min={100}
                                max={900}
                                step={10}
                                onValueChange={(val) => setMinWeight(val[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Maximum Weight</Label>
                                <span className="text-sm font-mono text-[var(--color-text-muted)]">{maxWeight}</span>
                            </div>
                            <Slider
                                value={[maxWeight]}
                                min={100}
                                max={900}
                                step={10}
                                onValueChange={(val) => setMaxWeight(val[0])}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Duration (s)</Label>
                                <span className="text-sm font-mono text-[var(--color-text-muted)]">{duration}s</span>
                            </div>
                            <Slider
                                value={[duration]}
                                min={0.2}
                                max={5}
                                step={0.1}
                                onValueChange={(val) => setDuration(val[0])}
                            />
                        </div>
                    </div>
                </div>

                {/* Code Block */}
                <CollapsibleCodeBlock
                    id="variable-weight-playground"
                    title="Code"
                    code={`import { VariableWeightText } from '@sds/ui';

<VariableWeightText 
  minWeight={${minWeight}} 
  maxWeight={${maxWeight}} 
  duration={${duration}}
  fontFamily="Clash Display"
>
  Clash Display
</VariableWeightText>`}
                    language="tsx"
                    showCopy={true}
                    defaultCollapsed={false}
                />
            </Card>

            {/* Implementation Notes */}
            <Card className="p-8">
                <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
                    Implementation Notes
                </h2>
                <div className="text-[var(--color-text-secondary)] space-y-2">
                    <p>
                        This component uses <code className="text-xs bg-[var(--color-surface)] px-1 py-0.5 rounded border border-[var(--color-border)]">font-variation-settings</code> to animate the 'wght' axis of variable fonts.
                    </p>
                    <p>
                        Ensure you satisfy the following for best results:
                    </p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                        <li>Use a supported Variable Font (e.g. Clash Display, Inter, Roboto Flex).</li>
                        <li>Ensure the font file is loaded correctly in your application.</li>
                        <li>The component automatically handles accessibility via the motion preferences hook.</li>
                    </ul>
                </div>
            </Card>
        </div>
    );
}
