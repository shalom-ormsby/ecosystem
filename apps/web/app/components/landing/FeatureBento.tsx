'use client';

import { Card, Badge, Heading, Text, ThemeToggle, Button } from '@thesage/ui';
import { Accessibility, Zap, LayoutGrid, Smartphone, Moon, Sun, Github, ShieldCheck } from 'lucide-react';


export function FeatureBento() {
    return (
        <section className="py-24 px-4 bg-[var(--color-surface)]/30">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4">Why Sage Design Engine?</Badge>
                    <Heading level={2} className="mb-4">Everything You Need to Ship</Heading>
                    <Text className="text-lg text-[var(--color-text-secondary)]">
                        A complete toolkit designed for modern web development.
                    </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* Feature 1: Accessibility (Large) */}
                    <Card className="col-span-1 md:col-span-2 p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className="z-10 relative">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                                <Accessibility className="w-6 h-6" />
                            </div>
                            <Heading level={3} className="mb-2">Accessibility First</Heading>
                            <Text className="text-[var(--color-text-secondary)] max-w-md">
                                Every component is built with WCAG AA/AAA standards in mind. Keyboard navigation and screen reader support are baked in, not bolted on.
                            </Text>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity transform translate-x-1/4 translate-y-1/4">
                            <Accessibility className="w-64 h-64" />
                        </div>
                    </Card>

                    {/* Feature 2: Dark Mode */}
                    <Card className="col-span-1 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="mb-4">
                            <ThemeToggle />
                        </div>
                        <Heading level={4} className="mb-2">Dark Mode Native</Heading>
                        <Text className="text-sm text-[var(--color-text-secondary)]">
                            Switch modes instantly. All tokens adapt automatically. Try it now!
                        </Text>
                    </Card>

                    {/* Feature 3: Solopreneur Velocity */}
                    <Card className="col-span-1 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <Heading level={4} className="mb-2">Built for Speed</Heading>
                            <Text className="text-sm text-[var(--color-text-secondary)]">
                                Copy, paste, ship. Designed to get you from idea to production in record time.
                            </Text>
                        </div>
                    </Card>

                    {/* Feature 4: Responsive (Large) */}
                    <Card className="col-span-1 md:col-span-2 p-8 flex flex-col md:flex-row items-center gap-8 hover:shadow-lg transition-shadow">
                        <div className="flex-1">
                            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <Heading level={3} className="mb-2">Responsive by Default</Heading>
                            <Text className="text-[var(--color-text-secondary)]">
                                Components look great on mobile, tablet, and desktop. No complex media queries required to get started.
                            </Text>
                        </div>
                        {/* Mini representation of responsiveness */}
                        <div className="flex gap-2 items-end opacity-50">
                            <div className="w-8 h-12 border-2 border-[var(--color-border)] rounded-md bg-[var(--color-surface)]" />
                            <div className="w-16 h-20 border-2 border-[var(--color-border)] rounded-md bg-[var(--color-surface)]" />
                            <div className="w-32 h-24 border-2 border-[var(--color-border)] rounded-md bg-[var(--color-surface)]" />
                        </div>
                    </Card>

                    {/* Feature 5: Open Source */}
                    <Card className="col-span-1 md:col-span-3 p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-shadow bg-[var(--color-surface)]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                                <Github className="w-6 h-6" />
                            </div>
                            <div>
                                <Heading level={4}>Open Source & MIT Licensed</Heading>
                                <Text className="text-sm text-[var(--color-text-secondary)]">Free for personal and commercial projects.</Text>
                            </div>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Github className="w-4 h-4" />
                            Star on GitHub
                        </Button>
                    </Card>

                </div>
            </div>
        </section>
    );
}
