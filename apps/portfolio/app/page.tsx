'use client';

import Link from 'next/link';
import { Button, Card } from '@shalom/design-system/atoms';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-8">
              Shalom Ormsby
              <span className="block text-4xl md:text-5xl text-foreground opacity-60 mt-4 font-medium">Product Design Leader</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl text-foreground opacity-70 max-w-2xl mx-auto mb-12 leading-relaxed">
              I help teams shape bold, human-centered products from strategy through delivery.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-lg text-foreground opacity-60 mb-12">
              This portfolio isn't a static gallery of artifacts. It's an interactive, customizable, open source experience that demonstrates how I think, design, and build.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <p className="text-foreground font-medium">Where would you like to begin?</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <Card className="h-full flex flex-col justify-between p-8 hover:border-primary/50 group">
                <div>
                  <div className="text-4xl mb-6">🧭</div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Product Strategy & Vision</h3>
                  <p className="text-foreground opacity-70 mb-6">How I define the right problems and align design with real opportunities.</p>
                </div>
                <Link href="/strategy" className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Explore Product Strategy →
                </Link>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="h-full flex flex-col justify-between p-8 hover:border-primary/50 group">
                <div>
                  <div className="text-4xl mb-6">✍️</div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Experience Design</h3>
                  <p className="text-foreground opacity-70 mb-6">How I craft and validate solutions that serve people and products.</p>
                </div>
                <Link href="/design" className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Explore Experience Design →
                </Link>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="h-full flex flex-col justify-between p-8 hover:border-primary/50 group">
                <div>
                  <div className="text-4xl mb-6">🚀</div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Product Delivery</h3>
                  <p className="text-foreground opacity-70 mb-6">How I ship, scale, and sustain high-quality design in the real world.</p>
                </div>
                <Link href="/delivery" className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Explore Product Delivery →
                </Link>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Ecosystem Features */}
      <section className="py-20 px-6 bg-background-secondary border-t border-[var(--color-glass-border)]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Built with "Transparent by Design"</h2>
              <p className="text-xl text-foreground opacity-70">This portfolio proves its philosophy through the experience itself.</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StaggerItem>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Customizer</h3>
                <p className="text-foreground opacity-70">Control your own experience. Adjust motion (0–10), choose your theme, and reveal the code beneath.</p>
                <p className="text-sm text-foreground opacity-50 italic">Demonstrating: User Control & Freedom</p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">X-Ray Mode <span className="text-xs bg-background-secondary px-2 py-1 rounded text-foreground opacity-60 ml-2">Coming Soon</span></h3>
                <p className="text-foreground opacity-70">See the design system tokens, component structure, and AI collaboration notes in real time.</p>
                <p className="text-sm text-foreground opacity-50 italic">Demonstrating: Design × Engineering transparency</p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Open Source</h3>
                <p className="text-foreground opacity-70">The entire codebase is MIT licensed. Learn from it, fork it, build with it.</p>
                <p className="text-sm text-foreground opacity-50 italic">Demonstrating: Teaching at scale</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
