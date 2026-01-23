'use client';

import { Button, Heading, Text, Magnetic } from '@sage/ui';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export function CallToAction() {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] -z-10" />

            {/* Decorative large circles */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto text-center max-w-3xl">
                <Heading level={1} className="mb-6">
                    Ready to standardise your workflow?
                </Heading>
                <Text className="text-xl text-[var(--color-text-secondary)] mb-10">
                    Stop rebuilding the same components. Start shipping unique value.
                    Join the ecosystem today.
                </Text>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Magnetic>
                        <Link href="/docs#overview">
                            <Button size="lg" variant="default" className="min-w-[200px]">
                                Get Started
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </Magnetic>

                    <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md font-mono text-sm text-[var(--color-text-secondary)]">
                        <Terminal className="w-4 h-4" />
                        <span>npx create-sage-app@latest</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
