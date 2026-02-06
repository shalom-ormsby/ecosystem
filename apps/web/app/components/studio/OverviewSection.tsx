'use client';

import { useState } from 'react';
import { Card, Button, Heading, Text, Badge } from '@thesage/ui';
import { Code, CollapsibleCodeBlock } from '@thesage/ui';
import { COMPONENT_COUNTS, COMPONENT_REGISTRY, MARKETING_COPY, BRAND } from '@thesage/ui';
import { useTheme } from '@thesage/ui/hooks';
import {
  Sliders, Building2, Leaf, Zap, Sun, Moon, Laptop, Palette, Bot, BookOpen,
  Construction, XCircle, CheckCircle, Heart, Search, Sprout, Check, Package,
  Sparkles, Layers, Code2
} from 'lucide-react';

// Mini Customizer Demo for Overview
function OverviewCustomizerPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [motion, setMotion] = useState(5);
  const [demoTheme, setDemoTheme] = useState('studio');
  const [demoMode, setDemoMode] = useState('light');

  return (
    <div className="relative w-full aspect-[4/3] bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] overflow-hidden flex items-center justify-center">
      <p className="text-xs text-[var(--color-text-muted)] px-4 text-center">
        Interactive preview - click the button to explore
      </p>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-2 right-2 bg-background text-foreground px-3 py-1.5 rounded-full shadow-lg border border-[var(--color-glass-border)] text-xs font-medium hover:opacity-80 transition-all flex items-center gap-1.5"
          style={{ backdropFilter: 'var(--effect-blur-sm)' }}
        >
          <Sliders className="w-4 h-4" />
          <span>Customizer</span>
        </button>
      ) : (
        <div
          className="absolute bottom-2 right-2 bg-background p-4 rounded-xl shadow-2xl border border-[var(--color-glass-border)] text-foreground w-64 max-h-[90%] overflow-y-auto"
          style={{
            boxShadow: 'var(--effect-shadow-xl)',
            backdropFilter: 'var(--effect-blur-md)',
            backgroundColor: 'var(--color-glass)'
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-sm">Experience Customizer</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-foreground opacity-60 hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="space-y-3 text-xs">
            {/* Motion Slider */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="font-medium opacity-80">Motion</label>
                <span className="opacity-60">{motion}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={motion}
                onChange={(e) => setMotion(Number(e.target.value))}
                className="w-full h-1.5 bg-[var(--color-surface)] rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            {/* Theme */}
            <div>
              <label className="block font-medium opacity-80 mb-2">Theme</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'studio', icon: <Building2 className="w-3 h-3" /> },
                  { id: 'terra', icon: <Leaf className="w-3 h-3" /> },
                  { id: 'volt', icon: <Zap className="w-3 h-3" /> },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setDemoTheme(t.id)}
                    className={`px-2 py-1.5 rounded text-xs flex items-center justify-center border transition-all ${demoTheme === t.id ? 'shadow-sm' : 'opacity-60 hover:opacity-100'
                      }`}
                    style={demoTheme === t.id ? {
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-primary-foreground)',
                      borderColor: 'var(--color-primary)'
                    } : { borderColor: 'var(--color-glass-border)' }}
                  >
                    {t.icon}
                  </button>
                ))}
              </div>
            </div>
            {/* Mode */}
            <div>
              <label className="block font-medium opacity-80 mb-2">Mode</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'light', label: 'Light', icon: <Sun className="w-3 h-3" /> },
                  { id: 'dark', label: 'Dark', icon: <Moon className="w-3 h-3" /> },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setDemoMode(m.id)}
                    className={`px-2 py-1.5 rounded text-xs flex items-center justify-center gap-1 border transition-all ${demoMode === m.id ? 'shadow-sm' : 'opacity-60 hover:opacity-100'
                      }`}
                    style={demoMode === m.id ? {
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-primary-foreground)',
                      borderColor: 'var(--color-primary)'
                    } : { borderColor: 'var(--color-glass-border)' }}
                  >
                    <span>{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function OverviewSection() {
  const { theme, setTheme, mode, setMode } = useTheme();

  return (
    <div className="space-y-16">
      {/* 1. WELCOME & VALUE PROPOSITION */}
      <section className="border-b border-[var(--color-border)] pb-12">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[var(--color-text-primary)]">
            {BRAND.productName}
          </h1>
          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
            The Solopreneur's Development Stack. AI-Native components for velocity.
          </p>
        </div>
      </section>

      {/* 2. WHO IS THIS FOR? */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)] text-center">
          Who Is This For?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Developers */}
          <Card className="p-6">
            <div className="mb-4 text-[var(--color-primary)]">
              <Laptop className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              Developers
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Build faster with TypeScript-first components, comprehensive examples, and a ~2KB syntax parser that just works.
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              → Jump to <a href="#quick-start" className="text-[var(--color-primary)] hover:underline">Quick Start</a>
            </p>
          </Card>

          {/* Designers */}
          <Card className="p-6">
            <div className="mb-4 text-[var(--color-primary)]">
              <Palette className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              Designers
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Explore live components, customize themes with the built-in Customizer, and see design tokens as importable JavaScript objects.
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              → Explore <a href="#tokens" className="text-[var(--color-primary)] hover:underline">Tokens</a> and <a href="#components" className="text-[var(--color-primary)] hover:underline">Components</a>
            </p>
          </Card>

          {/* AI Agents */}
          <Card className="p-6">
            <div className="mb-4 text-[var(--color-primary)]">
              <Bot className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              AI Agents
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              All components include prop interfaces, usage examples, and transparent documentation. Built with AI collaboration from day one.
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              → Read{' '}
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/AGENTS.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] hover:underline"
              >
                AGENTS.md
              </a>
            </p>
          </Card>

          {/* Learners */}
          <Card className="p-6">
            <div className="mb-4 text-[var(--color-primary)]">
              <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              Learners
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Study functional component organization, understand design tokens, and see how philosophy translates to production code.
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              → Start with <a href="#architecture" className="text-[var(--color-primary)] hover:underline">How It Works</a>
            </p>
          </Card>
        </div>
      </section>

      {/* 3. WHAT'S INCLUDED - HIGH-LEVEL OVERVIEW */}
      <section id="whats-included" className="border-t border-[var(--color-border)] pt-12">
        <Heading level={2} className="mb-6 text-center">
          What's Included
        </Heading>

        <Text variant="secondary" size="lg" className="max-w-3xl mx-auto text-center mb-12">
          Everything you need to build beautiful, accessible, user-controlled interfaces
        </Text>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Components */}
          <a href="#components" className="block group">
            <Card className="p-6 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-6 h-6 text-[var(--color-primary)]" />
                <Badge variant="secondary">{COMPONENT_COUNTS.total} Components</Badge>
              </div>
              <Heading level={3} className="text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                Component Library
              </Heading>
              <Text variant="secondary" size="sm" className="mb-4">
                {Object.keys(COMPONENT_REGISTRY.coreCategories).length} functional categories covering actions, forms, navigation, overlays, feedback, data display, and layout.
              </Text>
              <Text variant="primary" size="sm" className="font-medium">
                Explore Components →
              </Text>
            </Card>
          </a>

          {/* Themes */}
          <a href="#themes" className="block group">
            <Card className="p-6 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-[var(--color-primary)]" />
                <Badge variant="secondary">3 Themes</Badge>
              </div>
              <Heading level={3} className="text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                Themes
              </Heading>
              <Text variant="secondary" size="sm" className="mb-4">
                Studio, Terra, and Volt themes with light and dark modes. Each with unique personality and complete token systems.
              </Text>
              <Text variant="primary" size="sm" className="font-medium">
                Explore Themes →
              </Text>
            </Card>
          </a>

          {/* Motion System */}
          <a href="#motion" className="block group">
            <Card className="p-6 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-[var(--color-primary)]" />
                <Badge variant="secondary">Motion System</Badge>
              </div>
              <Heading level={3} className="text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                User-Controlled Motion
              </Heading>
              <Text variant="secondary" size="sm" className="mb-4">
                0-10 intensity scale respecting prefers-reduced-motion. Text effects, backgrounds, cursors, and micro-interactions.
              </Text>
              <Text variant="primary" size="sm" className="font-medium">
                Explore Motion →
              </Text>
            </Card>
          </a>

          {/* Blocks */}
          <a href="#blocks" className="block group">
            <Card className="p-6 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="w-6 h-6 text-[var(--color-primary)]" />
                <Badge variant="secondary">Blocks</Badge>
              </div>
              <Heading level={3} className="text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                Composed Blocks
              </Heading>
              <Text variant="secondary" size="sm" className="mb-4">
                Pre-built page sections like Hero, OpenGraph cards, code blocks, and navigation patterns.
              </Text>
              <Text variant="primary" size="sm" className="font-medium">
                View Blocks →
              </Text>
            </Card>
          </a>

          {/* Hooks */}
          <a href="#hooks" className="block group">
            <Card className="p-6 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Code2 className="w-6 h-6 text-[var(--color-primary)]" />
                <Badge variant="secondary">React Hooks</Badge>
              </div>
              <Heading level={3} className="text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                Hooks & Utilities
              </Heading>
              <Text variant="secondary" size="sm" className="mb-4">
                useTheme, useMotionPreference, useForm, and more. Complete utilities for theme and motion control.
              </Text>
              <Text variant="primary" size="sm" className="font-medium">
                View Hooks →
              </Text>
            </Card>
          </a>

          {/* MCP Server */}
          <a href="#mcp-server" className="block group">
            <Card className="p-6 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Bot className="w-6 h-6 text-[var(--color-primary)]" />
                <Badge variant="secondary">AI-Native</Badge>
              </div>
              <Heading level={3} className="text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                MCP Server
              </Heading>
              <Text variant="secondary" size="sm" className="mb-4">
                AI-powered component discovery and code generation for Claude Desktop, Cursor, and compatible editors.
              </Text>
              <Text variant="primary" size="sm" className="font-medium">
                Setup MCP →
              </Text>
            </Card>
          </a>
        </div>
      </section>

      {/* 4. PHILOSOPHY IN ACTION */}
      <section id="philosophy" className="border-t border-[var(--color-border)] pt-12">
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)] text-center">
          Philosophy in Action
        </h2>
        <p className="text-center text-[var(--color-text-secondary)] mb-8  mx-auto">
          These aren't abstract principles. They're design decisions you can see, touch, and fork.
        </p>

        {/* Component-First Architecture Callout */}
        <Card className="p-6 mb-8 border-2 border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5">
          <div className="flex items-start gap-4">
            <div className="text-[var(--color-primary)]">
              <Construction className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                Component-First Architecture
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Sage Design Engine encapsulates design tokens inside components rather than exposing them as CSS classes. This approach is the foundation of the entire system and provides several key advantages:
              </p>

              {/* Benefits List */}
              <div className="space-y-2 mb-4 text-sm text-[var(--color-text-secondary)]">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                  <span><strong className="text-[var(--color-text-primary)]">Ensures consistency</strong> - Impossible to use wrong token combinations or values</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                  <span><strong className="text-[var(--color-text-primary)]">Simplifies API</strong> - {`<Text>`} instead of remembering {`text-[var(--color-text-primary)]`}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                  <span><strong className="text-[var(--color-text-primary)]">Enables smart defaults</strong> - Components choose appropriate tokens automatically</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                  <span><strong className="text-[var(--color-text-primary)]">Improves DX</strong> - TypeScript autocomplete for semantic props like {`variant`} and {`size`}</span>
                </div>
              </div>

              {/* Example Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                  <p className="font-semibold text-red-600 dark:text-red-400 mb-1 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    Don't do this:
                  </p>
                  <Code className="text-xs block">{`<span className="text-[var(--color-text-primary)]">Text</span>`}</Code>
                </div>
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                  <p className="font-semibold text-green-600 dark:text-green-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    Do this instead:
                  </p>
                  <Code className="text-xs block">{`<Text>Text</Text>`}</Code>
                </div>
              </div>

              <p className="text-xs text-[var(--color-text-muted)] mt-3">
                → See{' '}
                <a
                  href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  Usage Guide
                </a>{' '}
                for complete component-first documentation
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Principle 1: Emotionally Resonant */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-[var(--color-primary)]">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                  Emotionally Resonant
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Touch hearts, don't just solve problems. Every interaction should feel like it was made by someone who genuinely cares.
                </p>
              </div>
            </div>
            <div className="pl-12 border-l-2 border-[var(--color-border)] ml-6">
              <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
                In practice:
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Three distinct themes (Studio, Terra, Volt) with unique personalities. Motion that enhances rather than distracts. Color palettes that respect accessibility while expressing emotion.
              </p>
            </div>
          </Card>

          {/* Principle 2: User Control & Freedom */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-[var(--color-primary)]">
                <Sliders className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                  User Control & Freedom
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  The user is the controller of their own experience. From motion controls to theme preferences, nothing forced, everything explained.
                </p>
              </div>
            </div>
            <div className="pl-12 border-l-2 border-[var(--color-border)] ml-6">
              <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
                In practice:
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                User-controlled motion scale (0-10) with automatic <Code className="text-xs">prefers-reduced-motion</Code> support. Theme and mode switching with localStorage persistence. Built-in Customizer for real-time experimentation.
              </p>
            </div>
          </Card>

          {/* Principle 3: Transparent by Design */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-[var(--color-primary)]">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                  Transparent by Design
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Show the receipts. AI collaboration documented, design tokens exposed, code that teaches.
                </p>
              </div>
            </div>
            <div className="pl-12 border-l-2 border-[var(--color-border)] ml-6">
              <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
                In practice:
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Design tokens as importable JavaScript objects. Comprehensive prop tables and examples for every component. AI collaboration history documented in{' '}
                <a
                  href="https://github.com/shalomormsby/ecosystem/blob/main/AGENTS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  AGENTS.md
                </a>.
              </p>
            </div>
          </Card>

          {/* Principle 4: Generous by Design */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-[var(--color-primary)]">
                <Sprout className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                  Generous by Design
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Open source. Teachable. Accessible to all. MIT License from day one.
                </p>
              </div>
            </div>
            <div className="pl-12 border-l-2 border-[var(--color-border)] ml-6">
              <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
                In practice:
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                MIT licensed, fully documented, with commented code that explains the "why." WCAG AA compliance. Detailed architecture documentation. Fork-friendly structure.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://github.com/shalomormsby/ecosystem/blob/main/DESIGN-PHILOSOPHY.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] hover:underline text-sm font-medium"
          >
            Read the full Design Philosophy →
          </a>
        </div>
      </section>

      {/* 4. WHAT MAKES THIS DIFFERENT */}
      <section id="features" className="border-t border-[var(--color-border)] pt-12">
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)] text-center">
          What Makes This Different
        </h2>

        <div className="space-y-8">
          {/* Feature 1: Automatic Syntax Parser */}
          <Card className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
                  Automatic Syntax Parser
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-4">
                  A ~2KB regex-based tokenizer with 14 token types, zero dependencies, and automatic theme awareness. No heavy libraries like Prism or Highlight.js required.
                </p>
                <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                    <span>Automatically detects TypeScript, JavaScript, JSX, TSX</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                    <span>Theme-aware colors adapt to light/dark mode</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                    <span>Built-in copy button and collapsible code blocks</span>
                  </div>
                </div>
              </div>
              <div>
                <CollapsibleCodeBlock
                  id="syntax-parser-demo"
                  code={`import { parseCode } from '@thesage/ui';

const code = \`function hello() {
  return "world";
}\`;

const tokens = parseCode(code, 'typescript');
// Returns 14 classified token types`}
                  defaultCollapsed={false}
                  showCopy={true}
                />
              </div>
            </div>
          </Card>

          {/* Feature 2: User-Controlled Motion */}
          <Card className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
                  User-Controlled Motion
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-4">
                  A 0-10 scale motion system that respects user preferences. Automatically honors <Code className="text-xs">prefers-reduced-motion</Code> while allowing fine-grained control.
                </p>
                <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                    <span>System preference override (0 = respects OS setting)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                    <span>Granular control from subtle (1-3) to playful (8-10)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                    <span>Accessible by default, customizable by choice</span>
                  </div>
                </div>
              </div>
              <div>
                <CollapsibleCodeBlock
                  id="motion-control-demo"
                  code={`import { useMotionPreference } from '@thesage/ui';

export function MotionAwareComponent() {
  const { scale, shouldAnimate } = useMotionPreference();

  return (
    <div>
      <p>Motion Scale: {scale} (0-10)</p>
      <p>Animations Enabled: {shouldAnimate ? 'Yes' : 'No'}</p>
    </div>
  );
}`}
                  defaultCollapsed={false}
                  showCopy={true}
                />
              </div>
            </div>
          </Card>

          {/* Feature 3: Three Living Themes */}
          <Card className="p-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
                Three Living Themes
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Each theme has its own personality, typography pairing, and emotional resonance. All components automatically adapt via CSS custom properties.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setTheme('studio')}
                  className={`p-4 rounded-lg border-2 transition-all ${theme === 'studio'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                    }`}
                >
                  <div className="mb-2 text-[var(--color-primary)]">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-[var(--color-text-primary)]">Studio</h4>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Professional, balanced, modern
                  </p>
                </button>

                <button
                  onClick={() => setTheme('terra')}
                  className={`p-4 rounded-lg border-2 transition-all ${theme === 'terra'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                    }`}
                >
                  <div className="mb-2 text-[var(--color-primary)]">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-[var(--color-text-primary)]">Terra</h4>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Calm, organic, thoughtful
                  </p>
                </button>

                <button
                  onClick={() => setTheme('volt')}
                  className={`p-4 rounded-lg border-2 transition-all ${theme === 'volt'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                    }`}
                >
                  <div className="mb-2 text-[var(--color-primary)]">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-[var(--color-text-primary)]">Volt</h4>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Bold, electric, energetic
                  </p>
                </button>
              </div>

              <CollapsibleCodeBlock
                id="theme-switching-demo"
                code={`import { useTheme } from '@thesage/ui';

export function ThemeSwitcher() {
  const { theme, setTheme, mode, setMode } = useTheme();

  return (
    <>
      <button onClick={() => setTheme('terra')}>Sage</button>
      <button onClick={() => setMode('dark')}>Dark Mode</button>
    </>
  );
}`}
                defaultCollapsed={true}
                showCopy={true}
              />
            </div>
          </Card>

          {/* Feature 4: Built-in Customizer */}
          <Card className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
                  Built-in Customizer
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-4">
                  A floating panel that lets users experiment with themes, motion, and preferences in real-time. All changes persist to localStorage.
                </p>
                <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                    <span>Live theme and mode switching</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                    <span>Motion scale control with instant feedback</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                    <span>Preferences saved across sessions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5" />
                    <span>Two modes: full-featured or lightweight</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-text-muted)]">
                    <strong>→ Full documentation:</strong> Navigate to <strong className="text-[var(--color-text-primary)]">Patterns &gt; Customization &gt; Customizer</strong> in the sidebar for interactive demos and code examples.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-6 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] space-y-3">
                <OverviewCustomizerPreview />
                <p className="text-xs text-[var(--color-text-muted)] text-center">
                  Try the interactive preview above, then explore the full component documentation in the sidebar
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. CHOOSE YOUR PATH */}
      <section id="paths" className="border-t border-[var(--color-border)] pt-12">
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)] text-center">
          Choose Your Path
        </h2>
        <p className="text-center text-[var(--color-text-secondary)] mb-8  mx-auto">
          Different starting points for different goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Path 1: Start Building */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              "I want to start building"
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Jump straight to installation, grab components, and start shipping.
            </p>
            <div className="space-y-2 text-sm">
              <a href="#quick-start" className="block text-[var(--color-primary)] hover:underline">
                1. Quick Start →
              </a>
              <a href="#components" className="block text-[var(--color-primary)] hover:underline">
                2. Browse Components →
              </a>
              <a
                href="https://github.com/shalomormsby/ecosystem/tree/main/packages/ui"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                3. GitHub Repository →
              </a>
            </div>
          </Card>

          {/* Path 2: Understand the System */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              "I want to understand the system"
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Learn the architecture, philosophy, and design decisions.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                1. Usage Guide →
              </a>
              <a href="#tokens" className="block text-[var(--color-primary)] hover:underline">
                2. Explore Tokens →
              </a>
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/DESIGN-PHILOSOPHY.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                3. Design Philosophy →
              </a>
            </div>
          </Card>

          {/* Path 3: Extend or Fork */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              "I want to extend or fork this"
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Understand the file structure, add components, or create your own theme.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md#architecture"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                1. Architecture Guide →
              </a>
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md#development-workflow"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                2. Component Workflow →
              </a>
              <a
                href="https://github.com/shalomormsby/ecosystem"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                3. Fork on GitHub →
              </a>
            </div>
          </Card>

          {/* Path 4: AI Agent Integration */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              "I'm an AI agent"
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Access structured documentation, prop tables, and integration patterns.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/AGENTS.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                1. AGENTS.md →
              </a>
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                2. Usage Guide →
              </a>
              <a href="#components" className="block text-[var(--color-primary)] hover:underline">
                3. Component Catalog →
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section id="architecture" className="border-t border-[var(--color-border)] pt-12">
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)] text-center">
          How It Works
        </h2>

        {/* Token-Driven Design */}
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
            Token-Driven Design
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            All design decisions are encoded as importable JavaScript objects, not locked in Figma. This makes them version-controllable, type-safe, and usable in code.
          </p>
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded mb-4">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">Important:</strong> Tokens are consumed through components, not applied directly. Use <Code className="text-xs">{`<Button>`}</Code> instead of manually styling with <Code className="text-xs">{`className="bg-[var(--color-primary)]"`}</Code>.
            </p>
          </div>
          <CollapsibleCodeBlock
            id="tokens-example"
            code={`import { colorTokens, spacingTokens } from '@thesage/ui/tokens';

// Tokens are available for reference
const primaryColor = colorTokens.studio.light.primary;
const spacing = spacingTokens.lg; // "1.5rem" (24px)

// But consumed through components:
import { Button, Text } from '@thesage/ui';
<Button variant="default">Click me</Button>  // ✅ Correct
<Text>Hello</Text>                           // ✅ Correct

// NOT manually applied:
// <button className="bg-[var(--color-primary)]">...</button> // ❌ Wrong`}
            defaultCollapsed={false}
            showCopy={true}
          />
        </Card>

        {/* Functional Organization */}
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
            Functional Organization
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Components are organized by what they do, not by abstract hierarchy. This eliminates classification ambiguity and improves developer discoverability.
          </p>
          <div className="space-y-3 pl-4 border-l-2 border-[var(--color-border)]">
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Actions (3)</span>
              <span className="text-[var(--color-text-secondary)]"> — Interactive elements that trigger behaviors (Button, Toggle, ToggleGroup)</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Forms (11)</span>
              <span className="text-[var(--color-text-secondary)]"> — Input controls for data collection (Input, Select, Checkbox, Switch, Slider...)</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Navigation (6)</span>
              <span className="text-[var(--color-text-secondary)]"> — Moving through content hierarchy (Breadcrumb, Tabs, Pagination, Command...)</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Overlays (9)</span>
              <span className="text-[var(--color-text-secondary)]"> — Contextual content above main UI (Dialog, Sheet, Popover, Tooltip, Drawer...)</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Feedback (5)</span>
              <span className="text-[var(--color-text-secondary)]"> — Communicating system state (Alert, Toast, Progress, Skeleton, Sonner)</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Data Display (6)</span>
              <span className="text-[var(--color-text-secondary)]"> — Presenting information (Table, DataTable, Card, Avatar, Badge, Calendar)</span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Layout (8)</span>
              <span className="text-[var(--color-text-secondary)]"> — Spatial organization (Accordion, Carousel, ScrollArea, Separator...)</span>
            </div>
          </div>
        </Card>

        {/* File Structure */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
            File Structure
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Everything lives in a monorepo with clear separation between the design system package and consuming applications.
          </p>
          <CollapsibleCodeBlock
            id="file-structure"
            code={`ecosystem/
├── packages/
│   ├── ui/                      # @thesage/ui - Component library
│   │   └── src/
│   │       ├── components/
│   │       │   ├── actions/     # Button, Toggle, ToggleGroup
│   │       │   ├── forms/       # Input, Select, Checkbox, etc. (11 components)
│   │       │   ├── navigation/  # Breadcrumb, Tabs, Pagination, etc. (6 components)
│   │       │   ├── overlays/    # Dialog, Sheet, Popover, etc. (9 components)
│   │       │   ├── feedback/    # Alert, Toast, Progress, etc. (5 components)
│   │       │   ├── data-display/ # Card, Table, Avatar, etc. (6 components)
│   │       │   └── layout/      # Accordion, Carousel, Separator, etc. (8 components)
│   │       ├── lib/             # Utilities, validation, animations, stores
│   │       ├── hooks/           # useTheme, useMotionPreference, useForm
│   │       └── providers/       # ThemeProvider
│   └── tokens/                  # @thesage/tokens - Design system tokens
│
└── apps/
    ├── web/      # This documentation site
    ├── portfolio/               # Example consumer app
    └── creative-powerup/        # Example consumer app`}
            defaultCollapsed={false}
            showCopy={true}
          />
        </Card>
      </section>

      {/* 7. GET STARTED IN 5 MINUTES */}
      <section id="quick-start" className="border-t border-[var(--color-border)] pt-12">
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)] text-center">
          Get Started in 5 Minutes
        </h2>

        {/* Prerequisites */}
        <Card className="p-6 mb-6 bg-[var(--color-surface)]/50">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[var(--color-primary)]" />
            Prerequisites
          </h3>
          <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
            <div>
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">System Requirements</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Node.js 18.0.0 or later</li>
                <li>Package Manager: pnpm 8.15.0+ (or npm 9+, yarn 3+)</li>
                <li>React 18+ or React 19+ (React 19 recommended)</li>
                <li>Tailwind CSS 3.0.0 or later</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Compatible Frameworks</h4>
              <p className="mb-2">Sage Design Engine works with:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Next.js 15+ (App Router or Pages Router)</li>
                <li>Vite 5+</li>
                <li>Remix 2+</li>
                <li>Create React App (with Tailwind)</li>
                <li>Any React framework with Tailwind CSS support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">TypeScript (Optional)</h4>
              <p>TypeScript 5.0+ for full type support. All components include TypeScript definitions.</p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {/* Step 1: Installation */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Install dependencies
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Sage Design Engine requires React and Framer Motion as peer dependencies:
                </p>
                <CollapsibleCodeBlock
                  id="installation"
                  code={`pnpm add react framer-motion @thesage/ui
# or
npm install react framer-motion @thesage/ui
# or
yarn add react framer-motion @thesage/ui`}
                  defaultCollapsed={false}
                  showCopy={true}
                />
              </div>
            </div>
          </Card>

          {/* Step 2: Configure Tailwind CSS */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Configure Tailwind CSS
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Add Sage Design Engine to your Tailwind content paths:
                </p>
                <CollapsibleCodeBlock
                  id="tailwind-config"
                  code={`// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@thesage/ui/**/*.{js,ts,jsx,tsx}', // Add this line
  ],
  // ... rest of your config
} satisfies Config;`}
                  defaultCollapsed={false}
                  showCopy={true}
                />
                <p className="text-xs text-[var(--color-text-muted)] mt-3">
                  <strong>Note:</strong> Sage Design Engine uses CSS custom properties for theming. No additional Tailwind configuration required—themes are injected at runtime by the ThemeProvider.
                </p>
              </div>
            </div>
          </Card>

          {/* Step 3: Import and use components */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Import and use components
                </h3>
                <CollapsibleCodeBlock
                  id="basic-usage-example"
                  code={`import { Button, Card, Badge } from '@thesage/ui';

export function MyComponent() {
  return (
    <Card>
      <h2>Hello, Sage!</h2>
      <Badge variant="success">New</Badge>
      <Button variant="default" size="lg">
        Get Started
      </Button>
    </Card>
  );
}`}
                  defaultCollapsed={false}
                  showCopy={true}
                />
              </div>
            </div>
          </Card>

          {/* Step 4: Add Theme Provider */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Wrap your app with ThemeProvider
                </h3>
                <CollapsibleCodeBlock
                  id="theme-provider-example"
                  code={`import { ThemeProvider } from '@thesage/ui/providers';

export default function App({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}`}
                  defaultCollapsed={false}
                  showCopy={true}
                />

                {/* ThemeProvider Props Documentation */}
                <div className="mt-6 space-y-4">
                  <h4 className="text-base font-semibold text-[var(--color-text-primary)]">
                    ThemeProvider Props
                  </h4>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--color-border)]">
                          <th className="text-left py-2 px-3 font-semibold text-[var(--color-text-primary)]">Prop</th>
                          <th className="text-left py-2 px-3 font-semibold text-[var(--color-text-primary)]">Type</th>
                          <th className="text-left py-2 px-3 font-semibold text-[var(--color-text-primary)]">Required</th>
                          <th className="text-left py-2 px-3 font-semibold text-[var(--color-text-primary)]">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-[var(--color-text-secondary)]">
                        <tr className="border-b border-[var(--color-border)]">
                          <td className="py-3 px-3">
                            <Code className="text-xs">children</Code>
                          </td>
                          <td className="py-3 px-3">
                            <Code className="text-xs">ReactNode</Code>
                          </td>
                          <td className="py-3 px-3">
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          </td>
                          <td className="py-3 px-3">
                            Your application content
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] space-y-3">
                    <div>
                      <h5 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                        Default Theme & Mode
                      </h5>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                        The ThemeProvider starts with <Code className="text-xs">theme: "volt"</Code> and <Code className="text-xs">mode: "dark"</Code> by default. User preferences are automatically persisted to localStorage.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                        Programmatic Control
                      </h5>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                        Use the <Code className="text-xs">useTheme()</Code> hook to control theme and mode:
                      </p>
                      <CollapsibleCodeBlock
                        id="programmatic-theme-control"
                        code={`import { useTheme } from '@thesage/ui/hooks';
import { useEffect } from 'react';

export function MyApp() {
  const { setTheme, setMode } = useTheme();

  // Set initial theme/mode on mount
  useEffect(() => {
    setTheme('studio');
    setMode('light');
  }, []);

  return <YourContent />;
}`}
                        defaultCollapsed={true}
                        showCopy={true}
                      />
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                        Available Options
                      </h5>
                      <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 list-disc list-inside">
                        <li><strong>Themes:</strong> <Code className="text-xs">"studio"</Code>, <Code className="text-xs">"terra"</Code>, <Code className="text-xs">"volt"</Code></li>
                        <li><strong>Modes:</strong> <Code className="text-xs">"light"</Code>, <Code className="text-xs">"dark"</Code></li>
                        <li><strong>Storage:</strong> Automatically persists to localStorage key <Code className="text-xs">"ecosystem-theme"</Code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 5: Use Hooks */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold flex-shrink-0">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Control themes and motion
                </h3>
                <CollapsibleCodeBlock
                  id="hooks-example"
                  code={`import { useTheme, useMotionPreference } from '@thesage/ui/hooks';

export function Controls() {
  const { theme, setTheme, mode, setMode } = useTheme();
  const { scale, shouldAnimate } = useMotionPreference();

  return (
    <div>
      <button onClick={() => setTheme('sage')}>Sage Theme</button>
      <button onClick={() => setMode('dark')}>Dark Mode</button>
      <p>Motion Scale: {scale}/10 - Animations {shouldAnimate ? 'enabled' : 'disabled'}</p>
    </div>
  );
}`}
                  defaultCollapsed={false}
                  showCopy={true}
                />

                {/* Motion System Explanation */}
                <div className="mt-6 space-y-4">
                  <h4 className="text-base font-semibold text-[var(--color-text-primary)]">
                    Understanding the Motion System
                  </h4>

                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Sage Design Engine uses a <strong>0-10 motion scale</strong> that gives users fine-grained control over animation intensity. This respects accessibility needs while allowing users who enjoy motion to customize their experience.
                  </p>

                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      <strong className="text-[var(--color-text-primary)]">Implementation Status:</strong> The motion system API is complete and functional, but currently only a subset of animated components use it. Integration is ongoing - developers should use <Code className="text-xs">useMotionPreference()</Code> when implementing new animations.
                    </p>
                  </div>

                  {/* Motion Scale Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--color-border)]">
                          <th className="text-left py-2 px-3 font-semibold text-[var(--color-text-primary)]">Scale</th>
                          <th className="text-left py-2 px-3 font-semibold text-[var(--color-text-primary)]">Behavior</th>
                          <th className="text-left py-2 px-3 font-semibold text-[var(--color-text-primary)]">Use Case</th>
                        </tr>
                      </thead>
                      <tbody className="text-[var(--color-text-secondary)]">
                        <tr className="border-b border-[var(--color-border)]">
                          <td className="py-3 px-3">
                            <Code className="text-xs">0</Code>
                          </td>
                          <td className="py-3 px-3">
                            No animations (instant state changes)
                          </td>
                          <td className="py-3 px-3">
                            Vestibular disorders, motion sensitivity
                          </td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]">
                          <td className="py-3 px-3">
                            <Code className="text-xs">1-3</Code>
                          </td>
                          <td className="py-3 px-3">
                            Subtle animations (~100-200ms)
                          </td>
                          <td className="py-3 px-3">
                            Minimal, professional interfaces
                          </td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]">
                          <td className="py-3 px-3">
                            <Code className="text-xs">5</Code>
                          </td>
                          <td className="py-3 px-3">
                            Balanced animations (default)
                          </td>
                          <td className="py-3 px-3">
                            General purpose, most users
                          </td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]">
                          <td className="py-3 px-3">
                            <Code className="text-xs">7-9</Code>
                          </td>
                          <td className="py-3 px-3">
                            Expressive animations
                          </td>
                          <td className="py-3 px-3">
                            Engaging, playful interfaces
                          </td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]">
                          <td className="py-3 px-3">
                            <Code className="text-xs">10</Code>
                          </td>
                          <td className="py-3 px-3">
                            Maximum animation intensity
                          </td>
                          <td className="py-3 px-3">
                            Highly interactive, game-like experiences
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Automatic Accessibility */}
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h5 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      Automatic Accessibility
                    </h5>
                    <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 list-disc list-inside">
                      <li>Respects <Code className="text-xs">prefers-reduced-motion: reduce</Code> automatically</li>
                      <li><Code className="text-xs">shouldAnimate</Code> returns <Code className="text-xs">false</Code> when scale is 0 OR system preference is reduce</li>
                      <li>Motion scale 0 must work perfectly - no broken layouts or missing UI states</li>
                      <li>No additional code needed - the hook handles everything</li>
                    </ul>
                  </div>

                  {/* Setting User Preferences */}
                  <div className="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] space-y-4">
                    <h5 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      How Users Set Motion Preferences
                    </h5>

                    {/* Method 1: The Customizer */}
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
                        1. The Customizer Component (Recommended)
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                        Add the built-in Customizer for a complete user control panel:
                      </p>
                      <CollapsibleCodeBlock
                        id="customizer-motion-control"
                        code={`import { CustomizerPanel } from '@thesage/ui';

export function App() {
  return (
    <>
      <YourContent />
      <CustomizerPanel /> {/* Floating panel with motion slider */}
    </>
  );
}`}
                        defaultCollapsed={true}
                        showCopy={true}
                      />
                    </div>

                    {/* Method 2: Programmatically */}
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
                        2. Programmatically via Hook
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                        Build your own motion controls:
                      </p>
                      <CollapsibleCodeBlock
                        id="programmatic-motion-control"
                        code={`import { useMotionPreference } from '@thesage/ui/hooks';

export function MotionControls() {
  const { scale, setMotionPreference } = useMotionPreference();

  return (
    <input
      type="range"
      min="0"
      max="10"
      value={scale}
      onChange={(e) => setMotionPreference(Number(e.target.value))}
    />
  );
}`}
                        defaultCollapsed={true}
                        showCopy={true}
                      />
                    </div>

                    {/* Method 3: System Setting */}
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
                        3. System Preference (Automatic)
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        When a user enables <Code className="text-xs">prefers-reduced-motion: reduce</Code> in their OS settings, <Code className="text-xs">shouldAnimate</Code> automatically returns <Code className="text-xs">false</Code> regardless of the scale value.
                      </p>
                    </div>

                    {/* Persistence Note */}
                    <div className="pt-2 border-t border-[var(--color-border)]">
                      <p className="text-xs text-[var(--color-text-muted)]">
                        <strong>Persistence:</strong> Motion preferences automatically save to localStorage and sync across sessions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* NEXT STEPS */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <h3 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)] text-center">
            Next Steps
          </h3>
          <p className="text-center text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            You're all set up! Here's how to continue building with Sage Design Engine:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Explore Components */}
            <Card className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-[var(--color-primary)]">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                    1. Explore Components
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    Browse all 89 components organized by function:
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <a href="#actions" className="text-[var(--color-primary)] hover:underline">Actions</a>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <a href="#forms" className="text-[var(--color-primary)] hover:underline">Forms</a>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <a href="#navigation" className="text-[var(--color-primary)] hover:underline">Navigation</a>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <a href="#overlays" className="text-[var(--color-primary)] hover:underline">Overlays</a>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <a href="#feedback" className="text-[var(--color-primary)] hover:underline">Feedback</a>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <a href="#data-display" className="text-[var(--color-primary)] hover:underline">Data Display</a>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <a href="#layout" className="text-[var(--color-primary)] hover:underline">Layout</a>
                  </div>
                </div>
              </div>
            </Card>

            {/* 2. Try the Customizer */}
            <Card className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-[var(--color-primary)]">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                    2. Try the Customizer
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    See how themes and motion work with a floating control panel:
                  </p>
                  <CollapsibleCodeBlock
                    id="next-steps-customizer"
                    code={`import { CustomizerPanel } from '@thesage/ui';

export function App() {
  return (
    <>
      <YourApp />
      <CustomizerPanel />
    </>
  );
}`}
                    defaultCollapsed={true}
                    showCopy={true}
                  />
                </div>
              </div>
            </Card>

            {/* 3. Read the Usage Guide */}
            <Card className="p-5">
              <div className="flex items-start gap-3">
                <div className="text-[var(--color-primary)]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                    3. Read the Usage Guide
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    Understand architecture and best practices:
                  </p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• Component-First Architecture</li>
                    <li>• Common Patterns</li>
                    <li>• Theming Deep Dive</li>
                  </ul>
                  <a
                    href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-[var(--color-primary)] hover:underline"
                  >
                    → Read the Guide
                  </a>
                </div>
              </div>
            </Card>

            {/* 4. Build Something */}
            <Card className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-[var(--color-primary)]">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                    4. Build Something!
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    Start with a simple page:
                  </p>
                  <CollapsibleCodeBlock
                    id="next-steps-build-example"
                    code={`import { Button, Card, Badge } from '@thesage/ui';

export function Dashboard() {
  return (
    <Card>
      <h1>My Dashboard</h1>
      <Badge variant="success">Active</Badge>
      <Button variant="default">Get Started</Button>
    </Card>
  );
}`}
                    defaultCollapsed={true}
                    showCopy={true}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Need Help? */}
          <div className="mt-6 p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] text-center">
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
              Need Help?
            </p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <a
                href="#getting-started"
                className="text-[var(--color-primary)] hover:underline"
              >
                📖 Full Documentation
              </a>
              <a
                href="https://github.com/shalomormsby/ecosystem/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] hover:underline"
              >
                🐛 Report Issues
              </a>
              <a
                href="https://github.com/shalomormsby/ecosystem/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] hover:underline"
              >
                💬 Discussions
              </a>
            </div>
          </div>

          {/* Pro Tip: Navigation Shortcuts */}
          <div className="mt-6 p-4 bg-[var(--color-primary)]/5 rounded-lg border border-[var(--color-primary)]/20">
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Pro Tip: Navigation Shortcuts</span>
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mb-2">
              You can use these quick shortcuts to navigate the documentation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <code className="text-[var(--color-primary)]">#quick-start</code>
                <span className="text-[var(--color-text-muted)]"> → Quick Start Guide</span>
              </div>
              <div>
                <code className="text-[var(--color-primary)]">#getting-started</code>
                <span className="text-[var(--color-text-muted)]"> → Overview</span>
              </div>
              <div>
                <code className="text-[var(--color-primary)]">#components</code>
                <span className="text-[var(--color-text-muted)]"> → Component Dashboard</span>
              </div>
              <div>
                <code className="text-[var(--color-primary)]">#resources</code>
                <span className="text-[var(--color-text-muted)]"> → Templates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTATION & RESOURCES */}
      <section id="documentation" className="border-t border-[var(--color-border)] pt-12">
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)] text-center">
          Documentation & Resources
        </h2>
        <p className="text-center text-[var(--color-text-secondary)] mb-8  mx-auto">
          Comprehensive guides organized by your role and needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* For Users */}
          <Card className="p-6">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              For Users
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Building with the design system
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                → Usage Guide
              </a>
              <p className="text-xs text-[var(--color-text-muted)]">
                Complete guide to component-first architecture, component inventory, common patterns
              </p>
            </div>
          </Card>

          {/* For Contributors */}
          <Card className="p-6">
            <div className="text-3xl mb-3">🔧</div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              For Contributors
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Extending the design system
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md#development-workflow"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                → Component Workflow
              </a>
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md#architecture"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                → Architecture Guide
              </a>
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/CLI_COMMANDS.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                → CLI Commands Reference
              </a>
            </div>
          </Card>

          {/* For Troubleshooting */}
          <Card className="p-6">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              Troubleshooting
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Common issues and solutions
            </p>

            <div className="space-y-4 text-sm">
              {/* Issue 1: Components are Unstyled */}
              <div className="p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                  Components are Unstyled
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                  <strong>Symptoms:</strong> Components render but have no styling, wrong colors, or broken layout.
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                  <strong>Common Causes:</strong>
                </p>
                <ul className="text-xs text-[var(--color-text-secondary)] list-disc list-inside space-y-1 ml-2 mb-2">
                  <li>Tailwind CSS not configured to include Sage Design Engine paths</li>
                  <li>ThemeProvider not wrapping your app</li>
                  <li>CSS not loaded in your bundler</li>
                </ul>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  <strong>Solutions:</strong> Add <Code className="text-xs">./node_modules/@thesage/ui/**/*.{`{js,ts,jsx,tsx}`}</Code> to Tailwind content, wrap app with <Code className="text-xs">{`<ThemeProvider>`}</Code>, and ensure Tailwind CSS is imported in your root file.
                </p>
              </div>

              {/* Issue 2: Motion/Animations Not Working */}
              <div className="p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                  Motion/Animations Not Working
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                  <strong>Symptoms:</strong> Components appear instantly without transitions.
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                  <strong>Common Causes:</strong> ThemeProvider not wrapping your app, or motion preference set to 0.
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  <strong>Solutions:</strong> Wrap app with <Code className="text-xs">{`<ThemeProvider>`}</Code>, check motion preference using <Code className="text-xs">useMotionPreference()</Code> (should not be 0), and verify browser doesn't have <Code className="text-xs">prefers-reduced-motion: reduce</Code> enabled.
                </p>
              </div>

              {/* Issue 3: TypeScript Errors on Import */}
              <div className="p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                  TypeScript Errors on Import
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                  <strong>Symptoms:</strong> <Code className="text-xs">Cannot find module '@thesage/ui' or its corresponding type declarations</Code>
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                  <strong>Common Causes:</strong>
                </p>
                <ul className="text-xs text-[var(--color-text-secondary)] list-disc list-inside space-y-1 ml-2 mb-2">
                  <li>Package not installed</li>
                  <li>Package installed but TypeScript declarations not built</li>
                  <li>Wrong import path</li>
                </ul>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  <strong>Solutions:</strong> Run <Code className="text-xs">pnpm install @thesage/ui</Code>, if using monorepo run <Code className="text-xs">pnpm build --filter @thesage/ui</Code>, and verify import uses <Code className="text-xs">{`import { Button } from '@thesage/ui'`}</Code> not <Code className="text-xs">'@thesage/ui/Button'</Code>.
                </p>
              </div>

              {/* Issue 4: Peer Dependency Warnings */}
              <div className="p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                  Peer Dependency Warnings
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                  <strong>Symptoms:</strong> <Code className="text-xs">npm WARN @thesage/ui requires a peer of react@* but none is installed</Code>
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                  <strong>Cause:</strong> Missing required peer dependencies.
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  <strong>Solution:</strong> Install peer dependencies with <Code className="text-xs">pnpm add react framer-motion</Code>
                </p>
              </div>

              {/* Still Having Issues */}
              <div className="pt-3 border-t border-[var(--color-border)]">
                <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
                  Still Having Issues?
                </p>
                <div className="space-y-1">
                  <a
                    href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-[var(--color-primary)] hover:underline"
                  >
                    📖 Check the Usage Guide
                  </a>
                  <a
                    href="https://github.com/shalomormsby/ecosystem/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-[var(--color-primary)] hover:underline"
                  >
                    🐛 Report a bug
                  </a>
                  <a
                    href="https://github.com/shalomormsby/ecosystem/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-[var(--color-primary)] hover:underline"
                  >
                    💬 Ask a question
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Studio Developers */}
        <Card className="p-6 bg-[var(--color-surface)]">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🎨</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
                Working on the Studio itself?
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                If you're developing or modifying Sage Studio (this documentation site), start here:
              </p>
              <a
                href="https://github.com/shalomormsby/ecosystem/blob/main/apps/web/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-primary)] hover:underline font-medium"
              >
                → Studio Development Guide
              </a>
            </div>
          </div>
        </Card>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-[var(--color-border)] pt-12 text-center">
        <div className=" mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
            Ready to Build?
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            The design system is open source and MIT licensed. Fork it, extend it, make it yours.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/shalomormsby/ecosystem"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" size="lg">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
