'use client';

import {
  Button,
  Card,
  Container,
  ThemeSwitcher,
  Badge,
  Code,
} from '@sage/ui';
import Link from 'next/link';
import {
  Layers,
  Palette,
  Box,
  Grid3x3,
  FileText,
  Zap,
  Eye,
  Smartphone,
  Code2,
  Shield,
  Users,
  Rocket,
  Building,
  Sparkles,
  ArrowRight,
  Github,
  Download
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-heading font-bold">Sage UI</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/#tokens" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tokens
              </Link>
              <Link href="/#components" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Components
              </Link>
              <ThemeSwitcher />
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4">
              A Systematic Design Language
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-heading font-bold tracking-tight">
              Build with <span className="text-primary">Purpose</span>,
              <br />
              Design with <span className="text-primary">System</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A four-layer design system that brings systematic thinking to your UI—from atomic tokens to production-ready templates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Github className="w-4 h-4" /> View on GitHub
              </Button>
            </div>

            {/* Four Layer Diagram */}
            <div className="pt-16 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { icon: Palette, title: 'Tokens', subtitle: 'Foundation', level: 1 },
                { icon: Box, title: 'Components', subtitle: 'Elements', level: 2 },
                { icon: Grid3x3, title: 'Blocks', subtitle: 'Patterns', level: 3 },
                { icon: FileText, title: 'Templates', subtitle: 'Pages', level: 4 },
              ].map((layer, index) => (
                <div
                  key={layer.title}
                  className="relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                      <layer.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-sm font-semibold text-foreground mb-1">
                      {layer.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {layer.subtitle} Layer
                    </div>
                  </Card>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* The Four Layers Section */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold">
                The Four-Layer Hierarchy
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each layer builds upon the previous, creating a systematic approach where changes cascade intelligently through your entire design system.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Layer 1: Tokens */}
              <Card className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold">Design Tokens</h3>
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
                  Foundation Layer
                </p>
                <p className="text-muted-foreground">
                  The atomic values that define your brand's visual language—colors, typography, spacing, shadows, and motion. Tokens ensure consistency across all implementations and enable dynamic theming.
                </p>
                <div className="pt-2">
                  <span className="text-sm font-semibold text-primary">Value:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Single source of truth for design decisions, enabling brand consistency and theme flexibility.
                  </p>
                </div>
              </Card>

              {/* Layer 2: Components */}
              <Card className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Box className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold">Components</h3>
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
                  Element Layer
                </p>
                <p className="text-muted-foreground">
                  Primitive, reusable UI elements—buttons, inputs, cards, dialogs—that implement design tokens and handle core interactions. Each component follows accessibility standards (WCAG AA/AAA).
                </p>
                <div className="pt-2">
                  <span className="text-sm font-semibold text-primary">Value:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Accelerated development with pre-built, accessible, production-ready elements.
                  </p>
                </div>
              </Card>

              {/* Layer 3: Blocks */}
              <Card className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Grid3x3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold">Blocks</h3>
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
                  Pattern Layer
                </p>
                <p className="text-muted-foreground">
                  Pre-composed sections combining multiple components into common UI patterns—hero sections, feature grids, pricing tables, testimonial layouts. Context-aware compositions that solve specific design problems.
                </p>
                <div className="pt-2">
                  <span className="text-sm font-semibold text-primary">Value:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Rapid prototyping and consistent implementation of proven UX patterns across products.
                  </p>
                </div>
              </Card>

              {/* Layer 4: Templates */}
              <Card className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold">Templates</h3>
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
                  Page Layer
                </p>
                <p className="text-muted-foreground">
                  Complete page layouts that combine blocks into cohesive experiences—landing pages, dashboards, documentation sites. Templates demonstrate best-practice composition and provide production-ready starting points.
                </p>
                <div className="pt-2">
                  <span className="text-sm font-semibold text-primary">Value:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Accelerated time-to-market with battle-tested layouts that maintain brand consistency.
                  </p>
                </div>
              </Card>
            </div>

            {/* Cascade Demo */}
            <Card className="p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Layers className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">Cascading Changes</h4>
                  <p className="text-muted-foreground">
                    Update a color token, and watch it automatically refine all components, blocks, and templates that use it. This systematic approach ensures consistency and dramatically reduces maintenance overhead.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Live Examples Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold">
                See It In Action
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the power of dynamic theming and systematic design with live examples.
              </p>
            </div>

            {/* Theme Switcher Demo */}
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2">Dynamic Theming</h3>
                    <p className="text-muted-foreground">
                      Switch themes instantly and watch every component adapt. All powered by design tokens.
                    </p>
                  </div>
                  <ThemeSwitcher />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <Button variant="default">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>
            </Card>

            {/* Component Showcase */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4">
                <Eye className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">50+ Components</h4>
                <p className="text-sm text-muted-foreground">
                  From buttons to data tables, all accessible and themeable.
                </p>
              </Card>
              <Card className="p-6 space-y-4">
                <Zap className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">3 Built-in Themes</h4>
                <p className="text-sm text-muted-foreground">
                  Studio, Sage, and Volt themes ready to use out of the box.
                </p>
              </Card>
              <Card className="p-6 space-y-4">
                <Palette className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">Custom Palettes</h4>
                <p className="text-sm text-muted-foreground">
                  Create unlimited custom color palettes with full token support.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Key Features Grid */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold">
                Built for Production
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to ship high-quality products faster.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 space-y-4">
                <Shield className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-heading font-bold">Accessibility First</h3>
                <p className="text-muted-foreground">
                  WCAG AA/AAA compliant components with proper ARIA labels, keyboard navigation, and screen reader support built in.
                </p>
              </Card>

              <Card className="p-8 space-y-4">
                <Palette className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-heading font-bold">Dynamic Theming</h3>
                <p className="text-muted-foreground">
                  Token-based theming system with light/dark mode and unlimited custom themes. Change your entire brand in seconds.
                </p>
              </Card>

              <Card className="p-8 space-y-4">
                <Smartphone className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-heading font-bold">Responsive by Default</h3>
                <p className="text-muted-foreground">
                  Mobile-first design approach ensures your UI looks perfect on every screen size, from phones to ultrawide displays.
                </p>
              </Card>

              <Card className="p-8 space-y-4">
                <Code2 className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-heading font-bold">Developer Friendly</h3>
                <p className="text-muted-foreground">
                  TypeScript-first with comprehensive type definitions, intelligent autocomplete, and clear documentation.
                </p>
              </Card>

              <Card className="p-8 space-y-4">
                <Zap className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-heading font-bold">Production Ready</h3>
                <p className="text-muted-foreground">
                  Battle-tested components used in real products. Optimized for performance with tree-shaking and lazy loading.
                </p>
              </Card>

              <Card className="p-8 space-y-4">
                <Github className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-heading font-bold">Open Source</h3>
                <p className="text-muted-foreground">
                  MIT licensed and open source. Use it however you want, contribute back, or fork for your needs.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold">
                Who Is Sage UI For?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From startups to enterprises, Sage UI scales with your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 space-y-3">
                <Users className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">Design Teams</h4>
                <p className="text-sm text-muted-foreground">
                  Scale your design system across products with systematic thinking and reusable patterns.
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <Rocket className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">Product Teams</h4>
                <p className="text-sm text-muted-foreground">
                  Ship faster with production-ready components and proven UX patterns that just work.
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <Building className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">Agencies</h4>
                <p className="text-sm text-muted-foreground">
                  Build client projects efficiently with customizable themes and flexible components.
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <Sparkles className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">Startups</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on your product, not reinventing UI patterns. Get to market faster with quality design.
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <Code2 className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">Solo Developers</h4>
                <p className="text-sm text-muted-foreground">
                  Build professional-looking products without a design team. Everything you need in one package.
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <Shield className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">Enterprise</h4>
                <p className="text-sm text-muted-foreground">
                  Maintain brand consistency across teams with a centralized, scalable design system.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Get Started Section */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold">
                Get Started in Minutes
              </h2>
              <p className="text-lg text-muted-foreground">
                Install Sage UI and start building with systematic design.
              </p>
            </div>

            <Card className="p-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Installation</h3>
                <Code className="block">
                  npm install @sage/ui @sage/tokens
                </Code>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Start</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Import the theme provider</p>
                      <Code className="mt-2 text-xs">
                        {`import { ThemeProvider } from '@sage/ui';`}
                      </Code>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Wrap your app</p>
                      <Code className="mt-2 text-xs">
                        {`<ThemeProvider theme="studio">\n  <App />\n</ThemeProvider>`}
                      </Code>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Start using components</p>
                      <Code className="mt-2 text-xs">
                        {`import { Button, Card } from '@sage/ui';\n\n<Card>\n  <Button>Click me</Button>\n</Card>`}
                      </Code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="gap-2">
                  Read Documentation <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/">View Components</Link>
                </Button>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">Built-in Themes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">4</div>
                <div className="text-sm text-muted-foreground">System Layers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Open Source</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-heading font-bold">Sage UI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/#components" className="hover:text-foreground transition-colors">
                Components
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8">
            Built with Sage UI. Open source and MIT licensed.
          </div>
        </Container>
      </footer>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
