'use client';

import { CollapsibleCodeBlock, Button, Heading, Text, Badge, Card, useMotionPreference } from '@sage/ui';
import { motion } from 'framer-motion';

export function BuilderSection() {
    const { shouldAnimate } = useMotionPreference();
    const exampleCode = `import { Button, Card, Text } from '@sage/ui';

export function WelcomeCard() {
  return (
    <Card className="p-6 max-w-sm">
      <Text variant="h3" className="mb-2">
        Hello World
      </Text>
      <Text className="mb-4 text-muted-foreground">
        Built with Sage UI components.
      </Text>
      <Button variant="default" className="w-full">
        Click Me
      </Button>
    </Card>
  );
}`;

    return (
        <section className="py-24 px-4 overflow-hidden">
            <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">

                {/* Left: Text & Pitch */}
                <div className="space-y-6">
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Developer Experience</Badge>
                    <Heading level={2} className="text-4xl md:text-5xl">
                        Code that flows like water.
                    </Heading>
                    <Text className="text-xl text-[var(--color-text-secondary)]">
                        Don't fight with CSS class names. Use semantic, typed React components that handle the heavy lifting for you.
                    </Text>

                    <div className="space-y-4 pt-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs">✓</div>
                            <Text>Fully typed with TypeScript</Text>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs">✓</div>
                            <Text>Accessible ARIA attributes included</Text>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs">✓</div>
                            <Text>Consistent API across all components</Text>
                        </div>
                    </div>
                </div>

                {/* Right: Code vs Result Split */}
                <div className="relative">
                    {/* Background decorative blob */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full -z-10" />

                    <div className="grid gap-6">
                        {/* Code Block */}
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-[var(--color-border)] bg-[var(--color-background)]">
                            <div className="flex items-center px-4 py-2 border-b bg-[var(--color-surface)]">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="ml-4 text-xs text-[var(--color-text-tertiary)]">WelcomeCard.tsx</div>
                            </div>
                            <div className="p-0">
                                <CollapsibleCodeBlock
                                    id="builder-demo"
                                    code={exampleCode}
                                    language="typescript"
                                    defaultCollapsed={false}
                                    showCopy={true}
                                    className="border-0 rounded-none"
                                />
                            </div>
                        </div>

                        {/* Arrow pointing down on mobile, right on desktop */}

                        {/* Result Preview */}
                        <motion.div
                            className="md:absolute md:-right-12 md:bottom-[-20px] md:w-80 shadow-2xl"
                            initial={shouldAnimate ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: shouldAnimate ? 0.2 : 0, duration: shouldAnimate ? 0.3 : 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border)] relative overflow-hidden backdrop-blur-xl bg-opacity-90">
                                <Heading level={3} className="mb-2">Hello World</Heading>
                                <Text className="mb-4 text-[var(--color-text-secondary)]">
                                    Built with Sage UI components.
                                </Text>
                                <Button variant="default" size="default" className="w-full">
                                    Click Me
                                </Button>

                                {/* Label */}
                                <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full">
                                    rendered
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
