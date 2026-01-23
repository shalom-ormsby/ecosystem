'use client';

import { HeroBlock, Card, Heading, Text, Stack, CollapsibleCodeBlock, OrbBackground, Typewriter, ThemeToggle } from '@sage/ui';

const CONST_CODE = `import { HeroBlock, OrbBackground, Typewriter } from '@sage/ui';

export function LandingPage() {
  return (
    <HeroBlock
      headline="Build Faster"
      description="The ultimate design system for solopreneurs."
      badge="v2.0 Released"
      primaryCta={{ label: "Get Started", href: "/docs" }}
      secondaryCta={{ label: "View Components", href: "/components" }}
      background={
        <OrbBackground 
           hue={314} 
           hoverIntensity={0.6}
        />
      }
    >
      <div className="mt-4">
         <Typewriter text={['Ship faster.', 'Scale better.']} loop={true} />
      </div>
    </HeroBlock>
  );
}`;

export function HeroBlockPage() {
    return (
        <div className="space-y-12 pb-24">
            {/* Header */}
            <Stack className="space-y-2">
                <div className="flex items-center justify-between">
                    <Heading level={1}>Hero Block</Heading>
                    <ThemeToggle />
                </div>
                <Text variant="secondary" className="text-xl max-w-2xl">
                    A high-impact hero section component with built-in background slot,
                    gradient falloff, and content slots for headline, description, and CTAs.
                </Text>
            </Stack>

            {/* Preview */}
            <Card className="p-0 overflow-hidden border-none ring-1 ring-white/10">
                <HeroBlock
                    headline={
                        <span>
                            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">UI Design</span>
                        </span>
                    }
                    description="Build stunning, immersive web applications with a system designed for motion and depth."
                    badge="New Component"
                    primaryCta={{ label: "Start Building", onClick: () => alert('Clicked!') }}
                    secondaryCta={{ label: "Documentation", onClick: () => { } }}
                    background={
                        <OrbBackground
                            hue={280}
                            hoverIntensity={0.8}
                        />
                    }
                >
                    <div className="mt-2 h-8 flex items-center justify-center text-[var(--color-text-secondary)]">
                        <Typewriter text={['React 19 Ready', 'Framer Motion Powered', 'WebGL Enhanced']} loop={true} delay={1} />
                    </div>
                </HeroBlock>
            </Card>

            {/* Code */}
            <section className="space-y-4">
                <Heading level={2}>Usage</Heading>
                <CollapsibleCodeBlock
                    id="hero-block-usage"
                    code={CONST_CODE}
                    language="tsx"
                    defaultCollapsed={false}
                />
            </section>
        </div>
    );
}
