'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Text, Button, Badge, Heading, Input, Label, Tabs, TabsList, TabsTrigger, TabsContent, useMotionPreference } from '@sage/ui';
import { Palette, Box, LayoutTemplate, Layers, Check, ArrowRight, Component } from 'lucide-react';

export function LayerVisualization() {
    const { shouldAnimate, scale } = useMotionPreference();
    const [activeTab, setActiveTab] = useState('tokens');
    const [primaryColor, setPrimaryColor] = useState('hsl(221.2 83.2% 53.3%)'); // Blue-500 default

    const duration = shouldAnimate && scale > 0 ? 0.3 * (5 / scale) : 0;
    const transition = { duration };

    // Custom color palettes
    const palettes = [
        { name: 'Ocean', value: 'hsl(221.2 83.2% 53.3%)', label: 'Blue' },
        { name: 'Forest', value: 'hsl(142.1 76.2% 36.3%)', label: 'Green' },
        { name: 'Berry', value: 'hsl(346.8 77.2% 49.8%)', label: 'Pink' },
        { name: 'Amber', value: 'hsl(38 92% 50%)', label: 'Orange' },
    ];

    return (
        <section className="py-24 px-4 container mx-auto" id="system-layers">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <Badge variant="outline" className="mb-4">The System</Badge>
                <Heading level={2} className="mb-4">The Four-Layer Hierarchy</Heading>
                <Text className="text-lg text-[var(--color-text-secondary)]">
                    See how a single design decision ripples through the entire system.
                    Select a color token below and watch it update every layer.
                </Text>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Controls / Info Side */}
                <div className="space-y-8">
                    <Tabs defaultValue="tokens" onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-4 w-full">
                            <TabsTrigger value="tokens">Tokens</TabsTrigger>
                            <TabsTrigger value="components">Components</TabsTrigger>
                            <TabsTrigger value="blocks">Blocks</TabsTrigger>
                            <TabsTrigger value="templates">Templates</TabsTrigger>
                        </TabsList>

                        <div className="mt-8 min-h-[200px]">
                            <AnimatePresence mode="wait">
                                {activeTab === 'tokens' && (
                                    <motion.div
                                        key="tokens-desc"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={transition}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                                <Palette className="w-6 h-6" />
                                            </div>
                                            <Heading level={3}>1. Design Tokens</Heading>
                                        </div>
                                        <Text className="text-[var(--color-text-secondary)]">
                                            The atomic values—colors, typography, spacing.
                                            Change the "Primary Color" token here:
                                        </Text>

                                        <div className="flex gap-3 mt-4">
                                            {palettes.map((p) => (
                                                <button
                                                    key={p.name}
                                                    onClick={() => setPrimaryColor(p.value)}
                                                    className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center`}
                                                    style={{
                                                        backgroundColor: p.value,
                                                        borderColor: primaryColor === p.value ? 'var(--color-text-primary)' : 'transparent',
                                                        boxShadow: primaryColor === p.value ? '0 0 0 2px var(--color-background), 0 0 0 4px var(--color-text-primary)' : 'none'
                                                    }}
                                                    aria-label={`Select ${p.name} color`}
                                                >
                                                    {primaryColor === p.value && <Check className="w-5 h-5 text-white" />}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'components' && (
                                    <motion.div
                                        key="components-desc"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={transition}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                                <Component className="w-6 h-6" />
                                            </div>
                                            <Heading level={3}>2. Components</Heading>
                                        </div>
                                        <Text className="text-[var(--color-text-secondary)]">
                                            Primitive elements like Buttons and Inputs consume the tokens.
                                            Notice how they inherit the color you selected previously.
                                        </Text>
                                    </motion.div>
                                )}

                                {activeTab === 'blocks' && (
                                    <motion.div
                                        key="blocks-desc"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={transition}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                                <Box className="w-6 h-6" />
                                            </div>
                                            <Heading level={3}>3. Blocks</Heading>
                                        </div>
                                        <Text className="text-[var(--color-text-secondary)]">
                                            Groups of components working together. A "Login Card" or "Hero Section"
                                            is a block. It uses the components, which use the tokens.
                                        </Text>
                                    </motion.div>
                                )}

                                {activeTab === 'templates' && (
                                    <motion.div
                                        key="templates-desc"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={transition}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                                <LayoutTemplate className="w-6 h-6" />
                                            </div>
                                            <Heading level={3}>4. Templates</Heading>
                                        </div>
                                        <Text className="text-[var(--color-text-secondary)]">
                                            Full pages composed of blocks. The highest level of abstraction.
                                        </Text>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Tabs>
                </div>

                {/* Live Preview Side - The "Playground" */}
                <div
                    className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-2xl h-[500px] flex flex-col transition-colors duration-500"
                    style={{
                        '--color-primary': primaryColor,
                        // We're essentially scoping CSS variables here to simulate the token propagation
                    } as React.CSSProperties}
                >
                    {/* Mock Browser Header */}
                    <div className="border-b border-[var(--color-border)] bg-[var(--color-background)] p-3 flex gap-2 items-center">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="ml-4 flex-1 bg-[var(--color-surface)] h-6 rounded text-[10px] flex items-center px-2 text-[var(--color-text-tertiary)]">
                            sage-ui.dev/preview
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto relative">
                        <AnimatePresence mode="popLayout" custom={activeTab}>
                            {activeTab === 'tokens' && (
                                <motion.div
                                    key="preview-token"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={transition}
                                    className="h-full flex flex-col items-center justify-center gap-6"
                                >
                                    <div
                                        className="w-32 h-32 rounded-3xl shadow-2xl flex items-center justify-center text-white font-bold text-xl transition-colors duration-300"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        aa
                                    </div>
                                    <div className="text-center">
                                        <div className="font-mono text-xs text-[var(--color-text-tertiary)] mb-1">--color-primary</div>
                                        <div className="font-mono font-bold text-lg">{primaryColor}</div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'components' && (
                                <motion.div
                                    key="preview-component"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={transition}
                                    className="h-full flex flex-col items-center justify-center gap-8"
                                >
                                    <Button style={{ backgroundColor: primaryColor, color: '#fff' }} size="lg">Primary Button</Button>

                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" checked readOnly className="w-5 h-5 rounded" style={{ accentColor: primaryColor }} />
                                            <Label>Checkbox</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full border-[5px]" style={{ borderColor: primaryColor }} />
                                            <Label>Radio</Label>
                                        </div>
                                    </div>

                                    <Input placeholder="Focus me..." className="w-64 focus:ring-2" style={{ '--color-ring': primaryColor } as any} />
                                </motion.div>
                            )}

                            {activeTab === 'blocks' && (
                                <motion.div
                                    key="preview-block"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={transition}
                                    className="h-full flex items-center justify-center"
                                >
                                    <Card className="w-full max-w-sm p-6 space-y-4 border shadow-lg bg-[var(--color-background)]">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                                            <Box className="w-6 h-6" />
                                        </div>
                                        <Heading level={4}>Ready to Build?</Heading>
                                        <Text className="text-sm text-[var(--color-text-secondary)]">This card block combines heading, text, and button components into a cohesive unit.</Text>
                                        <Button className="w-full" style={{ backgroundColor: primaryColor, color: 'white' }}>Get Started</Button>
                                    </Card>
                                </motion.div>
                            )}

                            {activeTab === 'templates' && (
                                <motion.div
                                    key="preview-template"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={transition}
                                    className="w-full h-full border border-[var(--color-border)] rounded-lg overflow-hidden flex flex-col bg-[var(--color-background)]"
                                >
                                    {/* Mini Header Block */}
                                    <div className="h-12 border-b flex items-center justify-between px-4">
                                        <div className="font-bold text-lg" style={{ color: primaryColor }}>Sage</div>
                                        <div className="flex gap-2">
                                            <div className="w-16 h-2 bg-[var(--color-surface)] rounded" />
                                            <div className="w-16 h-2 bg-[var(--color-surface)] rounded" />
                                        </div>
                                    </div>

                                    {/* Mini Hero Block */}
                                    <div className="p-8 text-center space-y-3 bg-[var(--color-surface)]/50">
                                        <div className="h-6 w-3/4 mx-auto bg-[var(--color-text-primary)]/10 rounded" />
                                        <div className="h-3 w-1/2 mx-auto bg-[var(--color-text-secondary)]/10 rounded" />
                                        <div className="mt-4 inline-block px-4 py-1.5 rounded text-xs text-white" style={{ backgroundColor: primaryColor }}>CTA Button</div>
                                    </div>

                                    {/* Mini Grid Block */}
                                    <div className="flex-1 p-4 grid grid-cols-2 gap-2 bg-[var(--color-background)]">
                                        <div className="bg-[var(--color-surface)] rounded h-20" />
                                        <div className="bg-[var(--color-surface)] rounded h-20" />
                                        <div className="bg-[var(--color-surface)] rounded h-20" />
                                        <div className="bg-[var(--color-surface)] rounded h-20" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
