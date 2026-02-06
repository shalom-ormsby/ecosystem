'use client';

import { Card, Code, Button, CollapsibleCodeBlock } from '@thesage/ui';

export function InteractionsTab() {
    return (
        <div className="space-y-8">
            {/* Introduction */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Interaction System</h3>
                <p className="text-[var(--color-text-secondary)]">
                    Sage Design Engine uses a standardized <strong>State Layer</strong> system for interactions.
                    Instead of manually darkening or lightening specific colors for hover/active states,
                    we apply a semi-transparent overlay (black or white) on top of the interactive element.
                </p>
                <p className="text-[var(--color-text-secondary)]">
                    This ensures that interactive states (Hover, Active) are <strong>consistently visible</strong> regardless
                    of the underlying color, supporting our unlimited custom palette system.
                </p>
            </div>

            {/* The Utility Class */}
            <Card className="p-6">
                <h4 className="text-lg font-medium mb-4 text-[var(--color-text-primary)]">The Primitive</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    The <Code>.sage-interactive</Code> utility class handles the standardized "Interaction Layer" physics and overlay.
                    It is built into the <Code>Button</Code>, <Code>Card</Code> (optional), and <Code>SidebarItem</Code> components.
                </p>
                <CollapsibleCodeBlock
                    id="sage-interactive-css"
                    title="CSS Definition"
                    language="css"
                    defaultCollapsed={false}
                    code={`.sage-interactive {
  position: relative;
  isolation: isolate;
  cursor: pointer;
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}`}
                />
            </Card>

            {/* Interactive Demo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Button Demos */}
                <Card className="p-6">
                    <h4 className="text-lg font-medium mb-4 text-[var(--color-text-primary)]">Button Interactions</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                        Hover to see the overlay (opacity change). Click to see the tactile scale down (transform).
                    </p>

                    <div className="flex flex-wrap gap-4 p-8 border rounded-lg items-center justify-center bg-[var(--color-background-secondary)]">
                        <Button variant="default">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>
                </Card>

                {/* Custom Element Demo */}
                <Card className="p-6">
                    <h4 className="text-lg font-medium mb-4 text-[var(--color-text-primary)]">Applying to Custom Elements</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                        You can add <Code>.sage-interactive</Code> to any div to give it the standard feel.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Custom Card 1 */}
                        <div className="sage-interactive p-4 rounded-lg bg-indigo-500 text-white flex items-center justify-center h-32">
                            <span className="relative z-20 font-medium">Indigo Box</span>
                        </div>

                        {/* Custom Card 2 */}
                        <div className="sage-interactive p-4 rounded-lg bg-emerald-500 text-white flex items-center justify-center h-32">
                            <span className="relative z-20 font-medium">Emerald Box</span>
                        </div>
                    </div>
                </Card>
                {/* Active Scale Demo */}
                <Card className="p-6">
                    <h4 className="text-lg font-medium mb-4 text-[var(--color-text-primary)]">Active State (Scale)</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                        Click and hold the button below to see the <Code>scale(0.98)</Code> effect. This provides tactile feedback.
                    </p>
                    <div className="flex items-center justify-center p-8 border rounded-lg bg-[var(--color-background-secondary)]">
                        <Button size="lg" className="h-16 px-8 text-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
                            Click & Hold Me
                        </Button>
                    </div>
                </Card>

                {/* Focus & Disabled Demo */}
                <Card className="p-6">
                    <h4 className="text-lg font-medium mb-4 text-[var(--color-text-primary)]">Focus & Disabled</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                        Use <kbd className="font-mono bg-muted px-1 rounded">Tab</kbd> to see the focus ring.
                    </p>
                    <div className="flex flex-col gap-4 items-center justify-center p-8 border rounded-lg bg-[var(--color-background-secondary)]">
                        <Button variant="outline" className="w-full max-w-xs">
                            Tab to me (Focus Ring)
                        </Button>
                        <Button disabled className="w-full max-w-xs">
                            Disabled State (Opacity 0.5)
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Token Reference */}
            <Card className="p-6">
                <h4 className="text-lg font-medium mb-4 text-[var(--color-text-primary)]">Interaction Tokens</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-3 bg-[var(--color-background)] border rounded">
                        <div className="text-xs text-[var(--color-text-muted)] uppercase mb-1">Overlay Color</div>
                        <Code>--color-interaction-overlay</Code>
                        <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                            Light: <span className="font-mono">#000000</span><br />
                            Dark: <span className="font-mono">#FFFFFF</span>
                        </div>
                    </div>
                    <div className="p-3 bg-[var(--color-background)] border rounded">
                        <div className="text-xs text-[var(--color-text-muted)] uppercase mb-1">Hover Opacity</div>
                        <Code>--opacity-interaction-hover</Code>
                        <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                            Value: <span className="font-mono">0.08</span> (8%)
                        </div>
                    </div>
                    <div className="p-3 bg-[var(--color-background)] border rounded">
                        <div className="text-xs text-[var(--color-text-muted)] uppercase mb-1">Active Scale</div>
                        <Code>--scale-interaction-active</Code>
                        <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                            Value: <span className="font-mono">0.98</span>
                        </div>
                    </div>
                    <div className="p-3 bg-[var(--color-background)] border rounded">
                        <div className="text-xs text-[var(--color-text-muted)] uppercase mb-1">Focus Ring Color</div>
                        <Code>--color-interaction-focus-ring</Code>
                        <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                            Value: <span className="font-mono">var(--color-ring)</span>
                        </div>
                    </div>
                    <div className="p-3 bg-[var(--color-background)] border rounded">
                        <div className="text-xs text-[var(--color-text-muted)] uppercase mb-1">Disabled Opacity</div>
                        <Code>--opacity-interaction-disabled</Code>
                        <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                            Value: <span className="font-mono">0.5</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
