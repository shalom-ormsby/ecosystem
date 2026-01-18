'use client';

import { useState } from 'react';
import { Card, CollapsibleCodeBlock, Label, Switch, Slider, Backgrounds } from '@sds/ui';
import { Terminal } from 'lucide-react';
const { FaultyTerminal } = Backgrounds;

const TERMINAL_CODE = `import { Backgrounds } from '@sds/ui';
const { FaultyTerminal } = Backgrounds;

export default function NotFoundPage() {
  return (
    <div className="w-full h-screen relative bg-[#1a1a1a]">
      <FaultyTerminal
        glitchAmount={1.0}
        flickerAmount={0.5}
        tint="#ff0000"
        mouseReact={true}
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-9xl font-sans font-black text-red-500 mb-4 opacity-80 tracking-tighter">404</h1>
        <p className="text-xl font-mono text-red-400">System Malfunction</p>
      </div>
    </div>
  );
}`;

export function FaultyTerminalPage() {
    const [terminalConfig, setTerminalConfig] = useState({
        glitchAmount: 1.0,
        flickerAmount: 0.5,
        mouseReact: true,
        tint: '#3b82f6', // blue-500 default
    });

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Faulty Terminal
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] ">
                    A retro CRT monitor effect with configurable glitch and scanlines.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Preview Area */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="p-0 h-[500px] overflow-hidden relative bg-[#1a1a1a] shadow-2xl">
                        <FaultyTerminal
                            glitchAmount={terminalConfig.glitchAmount}
                            flickerAmount={terminalConfig.flickerAmount}
                            tint={terminalConfig.tint}
                            mouseReact={terminalConfig.mouseReact}
                        />
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                            <h1 className="text-9xl font-sans font-black text-white/90 mb-4 mix-blend-overlay tracking-tighter">404</h1>
                            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded border border-white/10">
                                <p className="text-white font-mono text-sm">System Malfunction_</p>
                            </div>
                        </div>
                    </Card>

                    <CollapsibleCodeBlock
                        id="terminal-code"
                        title="Usage Example"
                        code={TERMINAL_CODE}
                        language="typescript"
                        showCopy={true}
                        defaultCollapsed={true}
                    />
                </div>

                {/* Controls Panel */}
                <Card className="p-6 h-fit sticky top-24">
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        Customization
                    </h3>

                    <div className="space-y-8">
                        {/* Glitch Amount */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Glitch Amount</Label>
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">{terminalConfig.glitchAmount}</span>
                            </div>
                            <Slider
                                value={[terminalConfig.glitchAmount]}
                                min={0}
                                max={2}
                                step={0.1}
                                onValueChange={([v]) => setTerminalConfig(prev => ({ ...prev, glitchAmount: v }))}
                            />
                        </div>

                        {/* Flicker Amount */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Flicker Amount</Label>
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">{terminalConfig.flickerAmount}</span>
                            </div>
                            <Slider
                                value={[terminalConfig.flickerAmount]}
                                min={0}
                                max={1}
                                step={0.05}
                                onValueChange={([v]) => setTerminalConfig(prev => ({ ...prev, flickerAmount: v }))}
                            />
                        </div>

                        {/* Tint Color */}
                        <div className="space-y-3">
                            <Label>Tint Color</Label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={terminalConfig.tint}
                                    onChange={(e) => setTerminalConfig(prev => ({ ...prev, tint: e.target.value }))}
                                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                />
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">{terminalConfig.tint}</span>
                            </div>
                        </div>

                        <div className="h-px bg-[var(--color-border)]" />

                        {/* Toggles */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Mouse Scanline React</Label>
                                <Switch
                                    checked={terminalConfig.mouseReact}
                                    onCheckedChange={(checked) => setTerminalConfig(prev => ({ ...prev, mouseReact: checked }))}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
