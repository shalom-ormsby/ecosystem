'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Slider, CollapsibleCodeBlock, Switch, Label } from '@sds/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Play, CheckCircle, XCircle } from 'lucide-react';
import { baseTokens, motion as motionTokens } from '@sds/ui/tokens';

// Types for our Motion Playground
type DurationToken = keyof typeof baseTokens.duration;
type EasingToken = keyof typeof motionTokens.easing | 'linear';
type AnimationProperty = 'opacity' | 'scale' | 'x' | 'rotate';

const PROPERTIES: { id: AnimationProperty; label: string }[] = [
  { id: 'opacity', label: 'Fade' },
  { id: 'scale', label: 'Scale' },
  { id: 'x', label: 'Slide' },
  { id: 'rotate', label: 'Rotate' },
];

export function PrimitivesSection() {
  // Playground State
  const [activeDuration, setActiveDuration] = useState<DurationToken>('normal');
  const [activeEasing, setActiveEasing] = useState<EasingToken>('default');
  const [activeProperty, setActiveProperty] = useState<AnimationProperty>('scale');
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0); // Force re-render for replay

  // Guide State
  const [activeTab, setActiveTab] = useState<'duration' | 'easing'>('duration');

  const handleReplay = () => {
    setKey(k => k + 1);
    setIsPlaying(true);
  };

  // Auto-reset playing state after animation
  useEffect(() => {
    if (isPlaying) {
      const durationMs = parseInt(baseTokens.duration[activeDuration]);
      const timer = setTimeout(() => setIsPlaying(false), durationMs + 500); // Buffer
      return () => clearTimeout(timer);
    }
  }, [isPlaying, activeDuration]);

  // Derived animation values
  const getAnimationProps = () => {
    const duration = parseInt(baseTokens.duration[activeDuration]) / 1000;
    // Map token name to actual bezier/string value
    const easeToken = activeEasing === 'linear' ? 'linear' : motionTokens.easing[activeEasing as keyof typeof motionTokens.easing];
    // Cast strict string to Easing
    const ease = easeToken as any; // Framer motion accepts cubic-bezier strings but types are strict

    const variants = {
      initial: {
        opacity: activeProperty === 'opacity' ? 0.2 : 1,
        scale: activeProperty === 'scale' ? 0.5 : 1,
        x: activeProperty === 'x' ? -50 : 0,
        rotate: activeProperty === 'rotate' ? -45 : 0,
      },
      animate: {
        opacity: 1,
        scale: 1,
        x: activeProperty === 'x' ? 50 : 0,
        rotate: 0,
      },
    };

    return {
      variants,
      initial: 'initial',
      animate: 'animate',
      transition: { duration, ease }
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Motion Primitives
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
          The foundational grammar of Sage's motion language. Compose duration and easing tokens to create fluid, meaningful interactions.
        </p>
      </div>

      {/* --- Interactive Playground (Hero) --- */}
      <Card className="p-0 overflow-hidden mb-16 border-[var(--color-border)] shadow-xl bg-[var(--color-surface)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">

          {/* Controls Panel (Left) */}
          <div className="lg:col-span-4 p-6 border-r border-[var(--color-border)] bg-[var(--color-background)]">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-6">
              Configure Motion
            </h3>

            {/* Property Selector */}
            <div className="mb-8">
              <Label className="mb-2 block">Property</Label>
              <div className="grid grid-cols-2 gap-2">
                {PROPERTIES.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => { setActiveProperty(prop.id); handleReplay(); }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${activeProperty === prop.id
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                      }`}
                  >
                    {prop.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selector */}
            <div className="mb-8">
              <Label className="mb-2 block">Duration</Label>
              <div className="space-y-2">
                {(Object.keys(baseTokens.duration) as DurationToken[]).map((token) => (
                  <button
                    key={token}
                    onClick={() => { setActiveDuration(token); handleReplay(); }}
                    className={`w-full px-3 py-2 rounded-md text-sm flex justify-between items-center transition-all ${activeDuration === token
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                      : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]'
                      }`}
                  >
                    <span className="capitalize">{token}</span>
                    <span className="opacity-60 font-mono text-xs">{baseTokens.duration[token]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Easing Selector */}
            <div className="mb-4">
              <Label className="mb-2 block">Easing</Label>
              <div className="space-y-2">
                {['linear', ...Object.keys(motionTokens.easing)].map((token) => (
                  <button
                    key={token}
                    onClick={() => { setActiveEasing(token as EasingToken); handleReplay(); }}
                    className={`w-full px-3 py-2 rounded-md text-sm flex justify-between items-center transition-all ${activeEasing === token
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                      : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]'
                      }`}
                  >
                    <span className="capitalize">{token}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stage (Right) */}
          <div className="lg:col-span-8 relative flex flex-col items-center justify-center p-12 bg-grid-pattern">
            {/* Background Grid Pattern (Pseudo) */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-purple-600 shadow-2xl flex items-center justify-center relative z-10"
                {...getAnimationProps()}
              >
                <span className="text-white sr-only">Box</span>
              </motion.div>
            </AnimatePresence>

            {/* Replay Button */}
            <div className="absolute bottom-8 right-8">
              <Button onClick={handleReplay} size="lg" className="rounded-full shadow-lg gap-2">
                <RotateCcw className="w-4 h-4" /> Replay
              </Button>
            </div>

            {/* Code Snippet */}
            <div className="absolute top-8 right-8 left-8 flex justify-center pointer-events-none">
              <div className="bg-[var(--color-surface)]/90 backdrop-blur border border-[var(--color-border)] rounded-full px-4 py-2 font-mono text-xs text-[var(--color-text-secondary)] shadow-sm">
                duration: {baseTokens.duration[activeDuration]} • ease: {activeEasing}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* --- Documentation Guide (Below Fold) --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Navigation Tabs (Sticky) */}
        <div className="md:col-span-3">
          <div className="sticky top-24 space-y-2">
            <button
              onClick={() => setActiveTab('duration')}
              className={`text-left w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'duration' ? 'bg-[var(--color-surface)] text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
            >
              Duration Scale
            </button>
            <button
              onClick={() => setActiveTab('easing')}
              className={`text-left w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'easing' ? 'bg-[var(--color-surface)] text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
            >
              Easing Curves
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9">
          {activeTab === 'duration' ? (
            <div className="space-y-8 fade-in">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Duration Scale</h2>
              <p className="text-[var(--color-text-secondary)]">
                Timing is the heartbeat of interface motion. We use a restricted scale to maintain consistency. Faster durations are for small changes and utility; slower durations are for emphasis and complex transitions.
              </p>

              <div className="grid gap-6">
                {(Object.entries(baseTokens.duration) as [DurationToken, string][]).map(([name, value]) => (
                  <Card key={name} className="p-6 hover:border-[var(--color-primary)] transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold capitalize">{name}</span>
                        <code className="text-xs bg-[var(--color-surface)] px-2 py-1 rounded border border-[var(--color-border)]">{value}</code>
                      </div>
                      <div className="h-1 w-24 bg-[var(--color-surface)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--color-primary)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{
                            duration: parseInt(value) / 1000,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: 'linear'
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {name === 'instant' && "Used for immediate feedback where delay would feel unresponsive."}
                      {name === 'fast' && "Best for micro-interactions like button hovers, toggles, and small scale changes."}
                      {name === 'normal' && "The workhorse of the system. Use for modal opens, drawer slides, and major state changes."}
                      {name === 'slow' && "For large layout shifts or transitions that require the user to follow the path of motion."}
                      {name === 'slower' && "Reserved for background effects, emotional moments, or brand-specific storytelling."}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 fade-in">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Easing Curves</h2>
              <p className="text-[var(--color-text-secondary)]">
                In the real world, nothing starts or stops instantly. Easing curves mimic the physics of the physical world, giving weight and momentum to digital objects.
              </p>

              <div className="grid gap-6">
                {/* Default Easing */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1">Default</h3>
                      <code className="text-xs text-[var(--color-text-muted)]">{motionTokens.easing.default}</code>
                    </div>
                    <div className="bg-[var(--color-surface)] p-2 rounded">
                      <motion.div
                        className="w-8 h-8 bg-[var(--color-primary)] rounded-full"
                        animate={{ x: [0, 100, 0] }}
                        transition={{ duration: 2, ease: motionTokens.easing.default as any, repeat: Infinity }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    A standard "ease-out" curve. Objects start quickly and decelerate smoothly as they reach their destination. Use this for 80% of UI transitions (entering elements, moving items).
                  </p>
                </Card>

                {/* Spring Easing */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1">Spring</h3>
                      <code className="text-xs text-[var(--color-text-muted)]">{motionTokens.easing.spring}</code>
                    </div>
                    <div className="bg-[var(--color-surface)] p-2 rounded">
                      <motion.div
                        className="w-8 h-8 bg-[var(--color-primary)] rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, ease: motionTokens.easing.spring as any, repeat: Infinity }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    An animated curve that overshoots its target slightly before settling. Creates a "bouncy," playful, and responsive feel. Great for success states, notifications, and delight moments.
                  </p>
                </Card>

                {/* Linear Easing */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1">Linear</h3>
                      <code className="text-xs text-[var(--color-text-muted)]">linear</code>
                    </div>
                    <div className="bg-[var(--color-surface)] p-2 rounded">
                      <motion.div
                        className="w-8 h-8 bg-[var(--color-primary)] rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Constant velocity with no acceleration. Feels mechanical. Use ONLY for continuous loops (like spinners) or opacity fades where acceleration isn't noticeable.
                  </p>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
