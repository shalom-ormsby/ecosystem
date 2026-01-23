'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Slider, Switch, Label, SecondaryNav, useMotionPreference } from '@sage/ui';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { baseTokens, motion as motionTokens } from '@sage/ui/tokens';

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

// ... (parseCubicBezier stays the same) ...
function parseCubicBezier(cssString: string): [number, number, number, number] | 'linear' | 'easeOut' {
  if (cssString === 'linear') return 'linear';
  const match = cssString.match(/cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
  if (match) {
    return [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4])];
  }
  return 'easeOut'; // Fallback
}

export function PrimitivesSection() {
  const { shouldAnimate, scale: motionScale } = useMotionPreference();
  // Client-side only flag to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  // Playground State
  const [activeDuration, setActiveDuration] = useState<DurationToken>('normal');
  const [activeEasing, setActiveEasing] = useState<EasingToken>('default');
  const [activeProperty, setActiveProperty] = useState<AnimationProperty>('scale');
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0); // Force re-render for replay

  // New Controls
  const [isLooping, setIsLooping] = useState(true);
  const [loopDelay, setLoopDelay] = useState(2); // Seconds
  const [previewScale, setPreviewScale] = useState(1.5); // Default scale adjusted

  // Guide State
  const [activeTab, setActiveTab] = useState('duration');

  // Only enable animations after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleReplay = () => {
    setKey(k => k + 1);
    setIsPlaying(true);
  };

  // Safe tokens with fallbacks
  const safeDurationTokens = baseTokens?.duration || {
    instant: '0ms', fast: '150ms', normal: '300ms', slow: '500ms', slower: '800ms'
  };
  const safeEasingTokens = motionTokens?.easing || {
    default: 'ease-out', spring: 'spring', linear: 'linear'
  };

  // Calculate scaled duration
  const getScaledDuration = (token: DurationToken) => {
    const rawMs = parseInt(safeDurationTokens[token] || '300ms');
    return shouldAnimate && motionScale > 0 ? (rawMs * (5 / motionScale)) / 1000 : 0;
  };

  // ... (handleReplay and other side logic)

  // Auto-reset playing state after animation (if not looping)
  useEffect(() => {
    if (isPlaying && !isLooping) {
      const durationStr = safeDurationTokens[activeDuration] || '300ms';
      const durationMs = parseInt(durationStr);
      const timer = setTimeout(() => setIsPlaying(false), (durationMs * (shouldAnimate ? (5 / motionScale) : 0)) + 500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, activeDuration, isLooping, safeDurationTokens, shouldAnimate, motionScale]);

  const navItems = [
    { id: 'duration', label: 'Duration Scale' },
    { id: 'easing', label: 'Easing Curves' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Motion Primitives
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)]">
          The foundational grammar of Sage's motion language. Compose duration and easing tokens to create fluid, meaningful interactions.
        </p>
      </div>

      {/* --- Interactive Playground (Hero) --- */}
      <Card className="p-0 overflow-hidden mb-16 border-[var(--color-border)] shadow-xl bg-[var(--color-surface)]">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 min-h-[550px]">
          {/* Controls Panel (Left) */}
          <div className="lg:col-span-4 p-6 border-t lg:border-t-0 lg:border-r border-[var(--color-border)] bg-[var(--color-background)] overflow-y-auto max-h-[600px]">
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

            {/* Loop Controls */}
            <div className="mb-8 p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-4">
                <Label className="cursor-pointer" htmlFor="loop-switch">Loop Animation</Label>
                <Switch
                  id="loop-switch"
                  checked={isLooping}
                  onCheckedChange={(checked: boolean) => { setIsLooping(checked); handleReplay(); }}
                />
              </div>

              {isLooping && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="overflow-hidden"
                >
                  <Label className="mb-2 block text-xs text-[var(--color-text-muted)]">Pause between loops: {loopDelay}s</Label>
                  <Slider
                    value={[loopDelay]}
                    min={0}
                    max={5}
                    step={0.5}
                    onValueChange={([v]: number[]) => { setLoopDelay(v); handleReplay(); }}
                  />
                </motion.div>
              )}
            </div>

            {/* Scale Control */}
            <div className="mb-8">
              <Label className="mb-2 block flex justify-between">
                <span>Preview Scale</span>
                <span className="text-[var(--color-text-muted)] text-xs">{previewScale}x</span>
              </Label>
              <Slider
                value={[previewScale]}
                min={0.5}
                max={4}
                step={0.1}
                onValueChange={([v]: number[]) => setPreviewScale(v)}
              />
            </div>

            {/* Duration Selector */}
            <div className="mb-8">
              <Label className="mb-2 block">Duration</Label>
              <div className="space-y-2">
                {(Object.keys(safeDurationTokens) as DurationToken[]).map((token) => (
                  <button
                    key={token}
                    onClick={() => { setActiveDuration(token); handleReplay(); }}
                    className={`w-full px-3 py-2 rounded-md text-sm flex justify-between items-center transition-all ${activeDuration === token
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                      : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]'
                      }`}
                  >
                    <span className="capitalize">{token}</span>
                    <span className="opacity-60 font-mono text-xs">{safeDurationTokens[token]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Easing Selector */}
            <div className="mb-4">
              <Label className="mb-2 block">Easing</Label>
              <div className="space-y-2">
                {Object.keys(safeEasingTokens).map((token) => (
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
          <div className="lg:col-span-8 relative flex flex-col items-center justify-center min-h-[400px] lg:h-auto p-12 bg-grid-pattern overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>

            <div style={{ transform: `scale(${previewScale})`, transformOrigin: 'center' }}>
              <motion.div
                key={key}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-purple-600 shadow-2xl flex items-center justify-center relative z-10"
                initial={{
                  opacity: activeProperty === 'opacity' ? 0.2 : 1,
                  scale: activeProperty === 'scale' ? 0.5 : 1,
                  x: activeProperty === 'x' ? -50 : 0,
                  rotate: activeProperty === 'rotate' ? 0 : 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: activeProperty === 'x' ? 50 : 0,
                  rotate: activeProperty === 'rotate' ? 180 : 0,
                }}
                transition={shouldAnimate ? {
                  duration: getScaledDuration(activeDuration),
                  ease: activeEasing === 'linear' ? 'linear' : parseCubicBezier(safeEasingTokens[activeEasing as keyof typeof safeEasingTokens]),
                  repeat: isLooping ? Infinity : 0,
                  repeatType: isLooping ? "reverse" : undefined,
                  repeatDelay: isLooping ? loopDelay : 0
                } : { duration: 0 }}
              >
                <span className="text-white sr-only">Box</span>
              </motion.div>
            </div>

            {/* Replay Button - Only show if not looping */}
            {!isLooping && (
              <div className="absolute bottom-8 right-8">
                <Button onClick={handleReplay} size="lg" className="rounded-full shadow-lg gap-2">
                  <RotateCcw className="w-4 h-4" /> Replay
                </Button>
              </div>
            )}

            {/* Code Snippet */}
            <div className="absolute top-8 right-8 left-8 flex justify-center pointer-events-none">
              <div className="bg-[var(--color-surface)]/90 backdrop-blur border border-[var(--color-border)] rounded-full px-4 py-2 font-mono text-xs text-[var(--color-text-secondary)] shadow-sm">
                duration: {safeDurationTokens[activeDuration]} • ease: {activeEasing} {isLooping && `• delay: ${loopDelay}s`}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* --- Documentation Guide (Below Fold) --- */}
      <div className="relative">
        <SecondaryNav
          items={navItems}
          activeId={activeTab}
          onItemChange={setActiveTab}
          maxWidth="max-w-4xl"
          mode="stacked"
          top="top-0"
          className="mb-8 bg-[var(--color-surface)]/80 backdrop-blur-md border-0"
        />

        <div className="max-w-4xl mx-auto">
          {activeTab === 'duration' ? (
            <div className="space-y-8 fade-in">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Duration Scale</h2>
              <p className="text-[var(--color-text-secondary)]">
                Timing is the heartbeat of interface motion. We use a restricted scale to maintain consistency. Faster durations are for small changes and utility; slower durations are for emphasis and complex transitions.
              </p>

              <div className="grid gap-6">
                {(Object.entries(safeDurationTokens) as [DurationToken, string][]).map(([name, value]) => (
                  <Card key={name} className="p-6 hover:border-[var(--color-primary)] transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold capitalize">{name}</span>
                        <code className="text-xs bg-[var(--color-surface)] px-2 py-1 rounded border border-[var(--color-border)]">{value}</code>
                      </div>
                      <div className="h-1 w-24 bg-[var(--color-surface)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--color-primary)]"
                          style={{ width: name === 'instant' ? '100%' : '0%' }}
                          animate={isMounted ? (name === 'instant'
                            ? { opacity: [1, 0, 1] }
                            : { width: ['0%', '100%', '0%'] }
                          ) : undefined}
                          transition={shouldAnimate ? {
                            duration: (name === 'instant' ? 1 : (parseInt(value) / 1000) * 2) * (motionScale > 0 ? 5 / motionScale : 1),
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: 'linear'
                          } : { duration: 0 }}
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

              <div className="grid gap-8">
                {/* Default Easing */}
                <Card className="p-0 overflow-hidden">
                  <div className="grid md:grid-cols-2 h-full">
                    <div className="p-8 flex items-center justify-center bg-[var(--color-surface)] border-r border-[var(--color-border)]">
                      <div className="relative w-full h-12 flex items-center">
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--color-border)] rounded-full"></div>
                        <motion.div
                          className="absolute top-0 w-12 h-12 bg-[var(--color-primary)] rounded-full shadow-md"
                          style={{ left: '0%' }}
                          animate={isMounted ? { left: ['0%', 'calc(100% - 3rem)', '0%'] } : undefined}
                          transition={shouldAnimate ? {
                            duration: 4 * (motionScale > 0 ? 5 / motionScale : 1),
                            ease: parseCubicBezier(safeEasingTokens.default),
                            repeat: Infinity,
                            repeatDelay: 2
                          } : { duration: 0 }}
                        />
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-lg font-bold mb-2">Default</h3>
                      <code className="text-xs text-[var(--color-text-muted)] mb-4 block px-2 py-1 bg-[var(--color-surface)] rounded w-fit">{safeEasingTokens.default}</code>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        A standard "ease-out" curve. Objects start quickly to gain attention and decelerate smoothly as they reach their destination. Use this for 80% of UI transitions.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Spring Easing */}
                <Card className="p-0 overflow-hidden">
                  <div className="grid md:grid-cols-2 h-full">
                    <div className="p-8 flex items-center justify-center bg-[var(--color-surface)] border-r border-[var(--color-border)]">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 bg-[var(--color-primary)] rounded-xl shadow-md"
                          style={{ scale: 1, rotate: 0 }}
                          animate={isMounted ? { scale: [1, 1.4, 1], rotate: [0, 10, 0] } : undefined}
                          transition={shouldAnimate ? {
                            duration: 1.5 * (motionScale > 0 ? 5 / motionScale : 1),
                            ease: parseCubicBezier(safeEasingTokens.spring),
                            repeat: Infinity,
                            repeatDelay: 2
                          } : { duration: 0 }}
                        />
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-lg font-bold mb-2">Spring</h3>
                      <code className="text-xs text-[var(--color-text-muted)] mb-4 block px-2 py-1 bg-[var(--color-surface)] rounded w-fit">{safeEasingTokens.spring}</code>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        An animated curve that overshoots its target slightly before settling, mimicking physical elasticity. Creates a "bouncy," playful feel.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Linear Easing */}
                <Card className="p-0 overflow-hidden">
                  <div className="grid md:grid-cols-2 h-full">
                    <div className="p-8 flex items-center justify-center bg-[var(--color-surface)] border-r border-[var(--color-border)]">
                      <motion.div
                        className="w-16 h-16 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full"
                        style={{ rotate: 0 }}
                        animate={isMounted ? { rotate: 360 } : undefined}
                        transition={shouldAnimate ? {
                          duration: 1.5 * (motionScale > 0 ? 5 / motionScale : 1),
                          ease: "linear",
                          repeat: Infinity,
                          repeatDelay: 2
                        } : { duration: 0 }}
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-lg font-bold mb-2">Linear</h3>
                      <code className="text-xs text-[var(--color-text-muted)] mb-4 block px-2 py-1 bg-[var(--color-surface)] rounded w-fit">linear</code>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Constant velocity with no acceleration. Feels mechanical. Use ONLY for continuous loops like loading spinners.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
