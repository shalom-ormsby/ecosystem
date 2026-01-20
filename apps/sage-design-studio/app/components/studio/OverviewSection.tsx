'use client';

import { useState } from 'react';
import { Card, Button } from '@sds/ui';
import { Code, CollapsibleCodeBlock } from '@sds/ui';
import { useTheme } from '@sds/ui/hooks';
import {
  Sliders, Building2, Leaf, Zap, Sun, Moon, Laptop, Palette, Bot, BookOpen,
  Construction, XCircle, CheckCircle, Heart, Search, Sprout, Check
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
                  { id: 'sage', icon: <Leaf className="w-3 h-3" /> },
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
            Sage UI
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
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/AGENTS.md"
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

      {/* 3. PHILOSOPHY IN ACTION */}
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
                Design tokens are encapsulated in components, never manually applied. This is the foundation of the entire system.
              </p>
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
                  href="https://github.com/shalom-ormsby/ecosystem/blob/main/apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  USAGE_GUIDE.md
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
                Three distinct themes (Studio, Sage, Volt) with unique personalities. Motion that enhances rather than distracts. Color palettes that respect accessibility while expressing emotion.
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
                  href="https://github.com/shalom-ormsby/ecosystem/blob/main/AGENTS.md"
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
            href="https://github.com/shalom-ormsby/ecosystem/blob/main/DESIGN-PHILOSOPHY.md"
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
                  code={`import { parseCode } from '@sds/ui';

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
                  code={`import { useMotion } from '@sds/ui';

export function MyComponent() {
  const { motionLevel, setMotionLevel } = useMotion();

  return (
    <div>
      <p>Current motion: {motionLevel}</p>
      <button onClick={() => setMotionLevel(5)}>
        Set to moderate
      </button>
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
                  onClick={() => setTheme('sage')}
                  className={`p-4 rounded-lg border-2 transition-all ${theme === 'sage'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                    }`}
                >
                  <div className="mb-2 text-[var(--color-primary)]">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-[var(--color-text-primary)]">Sage</h4>
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
                code={`import { useTheme } from '@sds/ui';

export function ThemeSwitcher() {
  const { theme, setTheme, mode, setMode } = useTheme();

  return (
    <>
      <button onClick={() => setTheme('sage')}>Sage</button>
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
                href="https://github.com/shalom-ormsby/ecosystem/tree/main/packages/ui"
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
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md"
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
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/DESIGN-PHILOSOPHY.md"
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
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md#architecture"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                1. Architecture Guide →
              </a>
              <a
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md#development-workflow"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                2. Component Workflow →
              </a>
              <a
                href="https://github.com/shalom-ormsby/ecosystem"
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
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/AGENTS.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                1. AGENTS.md →
              </a>
              <a
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md"
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
            code={`import { colorTokens, spacingTokens } from '@sds/ui/tokens';

// Tokens are available for reference
const primaryColor = colorTokens.studio.light.primary;
const spacing = spacingTokens.lg; // "1.5rem" (24px)

// But consumed through components:
import { Button, Text } from '@sds/ui';
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
│   ├── ui/                      # @sds/ui - Component library
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
│   └── tokens/                  # @sds/tokens - Design system tokens
│
└── apps/
    ├── sage-design-studio/      # This documentation site
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

        <div className="space-y-6">
          {/* Step 1: Installation */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Install the package
                </h3>
                <CollapsibleCodeBlock
                  id="installation"
                  code={`pnpm add @sds/ui
# or
npm install @sds/ui
# or
yarn add @sds/ui`}
                  defaultCollapsed={false}
                  showCopy={true}
                />
              </div>
            </div>
          </Card>

          {/* Step 2: Basic Usage */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Import and use components
                </h3>
                <CollapsibleCodeBlock
                  id="basic-usage-example"
                  code={`import { Button, Card, Badge } from '@sds/ui';

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

          {/* Step 3: Add Theme Provider */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Wrap your app with ThemeProvider
                </h3>
                <CollapsibleCodeBlock
                  id="theme-provider-example"
                  code={`import { ThemeProvider } from '@sds/ui/providers';

export default function App({ children }) {
  return (
    <ThemeProvider defaultTheme="studio" defaultMode="light">
      {children}
    </ThemeProvider>
  );
}`}
                  defaultCollapsed={false}
                  showCopy={true}
                />
              </div>
            </div>
          </Card>

          {/* Step 4: Use Hooks */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Control themes and motion
                </h3>
                <CollapsibleCodeBlock
                  id="hooks-example"
                  code={`import { useTheme, useMotionPreference } from '@sds/ui/hooks';

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
              </div>
            </div>
          </Card>
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
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md"
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
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md#development-workflow"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                → Component Workflow
              </a>
              <a
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md#architecture"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                → Architecture Guide
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
              Known issues and solutions
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md#roadmap"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--color-primary)] hover:underline"
              >
                → Unresolved Issues
              </a>
              <p className="text-xs text-[var(--color-text-muted)]">
                Current known issues with root causes and context
              </p>
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
                If you're developing or modifying Sage Design Studio (this documentation site), start here:
              </p>
              <a
                href="https://github.com/shalom-ormsby/ecosystem/blob/main/apps/sage-design-studio/README.md"
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
              href="https://github.com/shalom-ormsby/ecosystem"
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
