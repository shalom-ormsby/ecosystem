'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, Button, useMotionPreference } from '@sage/ui';
import { CollapsibleCodeBlock } from '@sage/ui';
import type { SyntaxToken } from '@sage/ui';
import { baseTokens, motion } from '@sage/ui/tokens';
import { CheckCircle, XCircle } from 'lucide-react';

/**
 * Interactive example component for motion demonstrations
 */
function MotionExample({
  duration,
  easing,
  label,
}: {
  duration: string;
  easing: string;
  label: string;
}) {
  const { shouldAnimate, scale } = useMotionPreference();
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxDistance, setMaxDistance] = useState(0);

  const durationMs = parseInt(duration);
  const scaledDurationMs = shouldAnimate && scale > 0 ? durationMs * (5 / scale) : 0;

  useEffect(() => {
    const updateMaxDistance = () => {
      if (containerRef.current) {
        // Calculate max travel distance: container width - element width - padding
        const containerWidth = containerRef.current.offsetWidth;
        const elementWidth = 48; // w-12 = 48px
        const padding = 16; // p-4 = 16px on each side
        setMaxDistance(containerWidth - elementWidth - (padding * 2));
      }
    };

    updateMaxDistance();
    window.addEventListener('resize', updateMaxDistance);
    return () => window.removeEventListener('resize', updateMaxDistance);
  }, []);

  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), scaledDurationMs + 100);
  };

  return (
    <div className="flex items-center gap-4">
      <div ref={containerRef} className="flex-1 bg-[var(--color-background)] rounded-lg p-4 overflow-hidden">
        <div
          className="w-12 h-12 bg-[var(--color-primary)] rounded-lg"
          style={{
            transform: isAnimating ? `translateX(${maxDistance}px)` : 'translateX(0)',
            transition: shouldAnimate ? `transform ${scaledDurationMs}ms ${easing}` : 'none',
          }}
        />
      </div>
      <Button onClick={handleAnimate} variant="secondary" size="sm">
        Play
      </Button>
    </div>
  );
}

export function MotionFoundationsSection() {
  const [selectedDuration, setSelectedDuration] = useState<keyof typeof baseTokens.duration>('normal');
  const [selectedEasing, setSelectedEasing] = useState<keyof typeof motion.easing>('default');

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Motion Foundations
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] ">
          Core principles, duration scales, easing curves, and motion preferences that form the foundation of our motion system.
        </p>
      </div>

      {/* Overview Card */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          What is Motion?
        </h2>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <p>
            Motion brings interfaces to life. Our motion system provides a carefully crafted set of durations,
            easing curves, and components that create smooth, purposeful animations. Use motion to guide attention,
            provide feedback, and create delightful experiences.
          </p>
          <p>
            Every motion in our design system respects accessibility preferences, particularly <code className="px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">prefers-reduced-motion</code>,
            ensuring all users have a comfortable experience.
          </p>
        </div>
      </Card>

      {/* When to Use Motion */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          When to Use Motion
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />
              Good Uses
            </h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>• State changes (hover, active, disabled)</li>
              <li>• Page transitions and navigation</li>
              <li>• Drawing attention to important elements</li>
              <li>• Providing feedback for user actions</li>
              <li>• Revealing and hiding content</li>
              <li>• Loading and progress indicators</li>
            </ul>
          </div>
          <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-[var(--color-error)]" />
              Avoid
            </h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>• Gratuitous animations without purpose</li>
              <li>• Blocking critical content with motion</li>
              <li>• Overly long durations (keep it fast)</li>
              <li>• Animating layout properties (use transform)</li>
              <li>• Motion that distracts from content</li>
              <li>• Ignoring reduced motion preferences</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Duration Scale */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Duration Scale
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Consistent timing creates rhythm. Choose durations based on the size and complexity of the animation.
        </p>
        <div className="space-y-4">
          {Object.entries(baseTokens.duration).map(([name, value]) => (
            <div key={name} className="border-b border-[var(--color-border)] pb-4 last:border-0">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <code className="text-sm font-mono text-[var(--color-primary)] px-2 py-1 bg-[var(--color-surface)] rounded">
                    {name}
                  </code>
                  <span className="ml-3 text-sm text-[var(--color-text-muted)]">{value}</span>
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {name === 'instant' && 'Immediate feedback'}
                  {name === 'fast' && 'Micro-interactions'}
                  {name === 'normal' && 'Standard transitions'}
                  {name === 'slow' && 'Complex animations'}
                  {name === 'slower' && 'Dramatic effects'}
                </span>
              </div>
              <MotionExample
                duration={value}
                easing={motion.easing.default}
                label={name}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Easing Curves */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Easing Curves
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Easing curves define the acceleration of animations. Different curves create different feelings of motion.
        </p>
        <div className="space-y-4">
          {Object.entries(motion.easing).map(([name, value]) => (
            <div key={name} className="border-b border-[var(--color-border)] pb-4 last:border-0">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <code className="text-sm font-mono text-[var(--color-primary)] px-2 py-1 bg-[var(--color-surface)] rounded">
                    {name}
                  </code>
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {name === 'default' && 'Natural, decelerating motion'}
                  {name === 'spring' && 'Playful, bouncy feel'}
                  {name === 'linear' && 'Constant speed'}
                </span>
              </div>
              <code className="text-xs font-mono text-[var(--color-text-muted)] block mb-3">
                {value}
              </code>
              <MotionExample
                duration={baseTokens.duration.normal}
                easing={value}
                label={name}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Interactive Playground */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Interactive Playground
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Experiment with different combinations of duration and easing to find the perfect motion.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Duration Selector */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
              Duration
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(baseTokens.duration).map(([name, value]) => (
                <button
                  key={name}
                  onClick={() => setSelectedDuration(name as keyof typeof baseTokens.duration)}
                  className={`
                    px-3 py-2 rounded text-sm transition-all border
                    ${selectedDuration === name
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-[var(--color-border)]'
                    }
                  `}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Easing Selector */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
              Easing
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(motion.easing).map(([name]) => (
                <button
                  key={name}
                  onClick={() => setSelectedEasing(name as keyof typeof motion.easing)}
                  className={`
                    px-3 py-2 rounded text-sm transition-all border
                    ${selectedEasing === name
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-[var(--color-border)]'
                    }
                  `}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
          <p className="text-xs font-mono text-[var(--color-text-muted)] mb-4">
            transition: transform {baseTokens.duration[selectedDuration]} {motion.easing[selectedEasing]}
          </p>
          <MotionExample
            duration={baseTokens.duration[selectedDuration]}
            easing={motion.easing[selectedEasing]}
            label="custom"
          />
        </div>
      </Card>

      {/* Accessibility */}
      <Card className="p-8 mb-8 bg-[var(--color-surface)]">
        <h2 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
          Accessibility: Respecting User Preferences
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          Always respect the <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">prefers-reduced-motion</code> media query.
          Some users experience motion sickness or find animations distracting.
        </p>

        <CollapsibleCodeBlock
          id="accessibility-motion"
          code={`/* CSS approach */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

// React Hook approach (recommended)
import { useMotionPreference } from '@sage/ui';

function MyComponent() {
  const { shouldAnimate, scale } = useMotionPreference();

  // Scale 5 (default) = 1x duration
  // Duration: 0.3 is base duration for this animation
  const duration = shouldAnimate && scale > 0 
    ? 0.3 * (5 / scale) 
    : 0;

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration }}
    >
      Content
    </motion.div>
  );
}`}
          language="typescript"
          showCopy={true}
          defaultCollapsed={false}
        />
      </Card>

      {/* Implementation Guide */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Implementation Guide
        </h2>
        <div className="space-y-6">
          {/* CSS/Tailwind */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              CSS / Tailwind
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              For simple transitions and states, use CSS transitions with our motion tokens.
            </p>

            <CollapsibleCodeBlock
              id="css-tailwind-motion"
              code={`/* Using CSS custom properties */
.button {
  transition: all var(--duration-normal) var(--ease-default);
}

/* Using Tailwind */
<button className="transition-all duration-300 ease-out hover:scale-105">
  Hover me
</button>`}
              language="css"
              showCopy={true}
              defaultCollapsed={false}
            />
          </Card>

          {/* Framer Motion */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Framer Motion
              </h3>
              <span className="text-xs px-2 py-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded">
                Recommended
              </span>
            </div>
            <a
              href="https://motion.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-primary)] hover:underline inline-block mb-3"
            >
              motion.dev →
            </a>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Framer Motion is our recommended animation library for React. It provides declarative animations,
              gesture support, and excellent TypeScript integration.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                  When to use Framer Motion:
                </p>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1 ml-4">
                  <li>• Component animations and transitions</li>
                  <li>• Page transitions in React apps</li>
                  <li>• Gesture-based interactions (drag, swipe)</li>
                  <li>• Layout animations and shared element transitions</li>
                  <li>• When you need React-aware animations</li>
                </ul>
              </div>

              <CollapsibleCodeBlock
                id="framer-motion-basics"
                code={`import { motion } from 'framer-motion';

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.3, // 300ms = normal
    ease: [0, 0, 0.2, 1] // ease-out
  }}
>
  Content
</motion.div>

// Using design system tokens
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{
    duration: 0.15, // fast
    ease: [0.16, 1, 0.3, 1] // spring
  }}
>
  Click me
</motion.button>`}
                language="typescript"
                showCopy={true}
                defaultCollapsed={false}
              />
            </div>
          </Card>

          {/* GSAP */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                GSAP (GreenSock Animation Platform)
              </h3>
              <span className="text-xs px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded border border-[var(--color-border)]">
                Specialized
              </span>
            </div>
            <a
              href="https://gsap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-primary)] hover:underline inline-block mb-3"
            >
              gsap.com →
            </a>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              GSAP is the industry-standard animation library for complex, timeline-based animations.
              Use it when you need precise control or advanced animation sequences.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                  When to use GSAP:
                </p>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1 ml-4">
                  <li>• Complex animation timelines and sequences</li>
                  <li>• SVG animations and morphing</li>
                  <li>• Scroll-triggered animations (ScrollTrigger)</li>
                  <li>• When you need maximum performance</li>
                  <li>• Framework-agnostic animations</li>
                </ul>
              </div>

              <CollapsibleCodeBlock
                id="gsap-basics"
                code={`import { gsap } from 'gsap';

// Basic animation
gsap.to('.element', {
  opacity: 1,
  y: 0,
  duration: 0.3, // 300ms = normal
  ease: 'power2.out' // Similar to ease-out
});

// Timeline sequence
const tl = gsap.timeline();
tl.to('.hero', { opacity: 1, duration: 0.5 })
  .to('.cta', { scale: 1, duration: 0.15 }, '-=0.2')
  .to('.features', {
    y: 0,
    stagger: 0.1, // Stagger items
    duration: 0.3
  });`}
                language="javascript"
                showCopy={true}
                defaultCollapsed={false}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Framer Motion Integration */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Framer Motion Integration
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Pre-built animation variants and presets for Framer Motion. Import from{' '}
          <code className="px-1 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">
            @sage/ui/utils
          </code>
        </p>

        {/* Animation Variants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Fade Variants */}
          <Card className="p-6">
            <h3 className="font-medium text-[var(--color-text-primary)] mb-3">Fade Variants</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Simple opacity transitions
            </p>
            <CollapsibleCodeBlock
              id="fade-variants"
              code={`import { fadeVariants } from '@sage/ui/utils';

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeVariants}
>
  Content
</motion.div>`}
              language="typescript"
              showCopy={true}
              defaultCollapsed={true}
            />
          </Card>

          {/* Slide Variants */}
          <Card className="p-6">
            <h3 className="font-medium text-[var(--color-text-primary)] mb-3">Slide Variants</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Slide in from: Left, Right, Top, Bottom
            </p>
            <CollapsibleCodeBlock
              id="slide-variants"
              code={`import { slideVariants } from '@sage/ui/utils';

<motion.div
  initial="hidden"
  animate="visible"
  variants={slideVariants.fromBottom}
>
  Content
</motion.div>`}
              language="typescript"
              showCopy={true}
              defaultCollapsed={true}
            />
          </Card>

          {/* Scale Variants */}
          <Card className="p-6">
            <h3 className="font-medium text-[var(--color-text-primary)] mb-3">Scale Variants</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Default, Grow, Pop effects
            </p>
            <CollapsibleCodeBlock
              id="scale-variants"
              code={`import { scaleVariants } from '@sage/ui/utils';

<motion.div
  initial="hidden"
  animate="visible"
  variants={scaleVariants.pop}
>
  Content
</motion.div>`}
              language="typescript"
              showCopy={true}
              defaultCollapsed={true}
            />
          </Card>

          {/* Modal Variants */}
          <Card className="p-6">
            <h3 className="font-medium text-[var(--color-text-primary)] mb-3">Modal Variants</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Overlay + Content animations
            </p>
            <CollapsibleCodeBlock
              id="modal-variants"
              code={`import { modalVariants } from '@sage/ui/utils';

<motion.div variants={modalVariants.overlay}>
  <motion.div variants={modalVariants.content}>
    Modal content
  </motion.div>
</motion.div>`}
              language="typescript"
              showCopy={true}
              defaultCollapsed={true}
            />
          </Card>

          {/* Rotate Variants */}
          <Card className="p-6">
            <h3 className="font-medium text-[var(--color-text-primary)] mb-3">Rotate Variants</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Rotation animations with fade
            </p>
            <CollapsibleCodeBlock
              id="rotate-variants"
              code={`import { rotateVariants } from '@sage/ui/utils';

<motion.div
  initial="hidden"
  animate="visible"
  variants={rotateVariants}
>
  Content
</motion.div>`}
              language="typescript"
              showCopy={true}
              defaultCollapsed={true}
            />
          </Card>

          {/* Drawer Variants */}
          <Card className="p-6">
            <h3 className="font-medium text-[var(--color-text-primary)] mb-3">Drawer Variants</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Slide-out panels from: Left, Right, Top, Bottom
            </p>
            <CollapsibleCodeBlock
              id="drawer-variants"
              code={`import { drawerVariants } from '@sage/ui/utils';

<motion.div
  initial="hidden"
  animate="visible"
  variants={drawerVariants.fromRight}
>
  Drawer content
</motion.div>`}
              language="typescript"
              showCopy={true}
              defaultCollapsed={true}
            />
          </Card>

          {/* Collapse Variants */}
          <Card className="p-6">
            <h3 className="font-medium text-[var(--color-text-primary)] mb-3">Collapse Variants</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Height-based expand/collapse for accordions
            </p>
            <CollapsibleCodeBlock
              id="collapse-variants"
              code={`import { collapseVariants } from '@sage/ui/utils';

<motion.div
  initial="collapsed"
  animate="expanded"
  variants={collapseVariants}
>
  Collapsible content
</motion.div>`}
              language="typescript"
              showCopy={true}
              defaultCollapsed={true}
            />
          </Card>
        </div>

        {/* Complete Presets */}
        <Card className="p-6 mb-6">
          <h3 className="font-medium text-[var(--color-text-primary)] mb-3">Complete Presets</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Ready-to-use animation configurations with variants + transitions included:
          </p>
          <div className="space-y-4">
            <div className="bg-[var(--color-surface)] p-4 rounded">
              <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Available Presets
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <code className="text-[var(--color-primary)] font-mono">presets.fade</code>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-[var(--color-primary)] font-mono">presets.slideUp</code>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-[var(--color-primary)] font-mono">presets.scale</code>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-[var(--color-primary)] font-mono">presets.modal</code>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-[var(--color-primary)] font-mono">presets.list</code>
                </div>
              </div>
            </div>
            <CollapsibleCodeBlock
              id="complete-presets"
              code={`import { presets } from '@sage/ui/utils';

// Simple fade animation
<motion.div {...presets.fade}>
  Fades in
</motion.div>

// Slide up animation
<motion.div {...presets.slideUp}>
  Slides up from bottom
</motion.div>

// Staggered list animation
<motion.ul {...presets.list.container}>
  {items.map(item => (
    <motion.li key={item.id} {...presets.list.item}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>`}
              language="typescript"
              showCopy={true}
              defaultCollapsed={true}
            />
          </div>
        </Card>

        {/* Custom Animation Helper */}
        <Card className="p-6">
          <h3 className="font-medium text-[var(--color-text-primary)] mb-3">Create Custom Animations</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Use the <code className="px-1 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">createAnimation</code> helper to build custom variants:
          </p>
          <CollapsibleCodeBlock
            id="custom-animations"
            code={`import { createAnimation, transitions, easings } from '@sage/ui/utils';

const customAnimation = createAnimation(
  {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
  },
  transitions.bounce
);

<motion.div {...customAnimation}>
  Custom bouncy fade-in with rotation
</motion.div>`}
            language="typescript"
            showCopy={true}
            defaultCollapsed={true}
          />
        </Card>

        {/* CollapsibleCodeBlock Example */}
        <Card className="p-6 mt-8">
          <h3 className="font-medium text-[var(--color-text-primary)] mb-3">CollapsibleCodeBlock Component</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Use the <code className="px-1 py-0.5 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">CollapsibleCodeBlock</code> component for reusable, syntax-highlighted code blocks with smooth animations:
          </p>

          <CollapsibleCodeBlock
            id="example-usage"
            title="Example Usage"
            code={[
              { text: 'import', type: 'keyword' },
              { text: ' { ', type: 'plain' },
              { text: 'CollapsibleCodeBlock', type: 'className' },
              { text: ' } ', type: 'plain' },
              { text: 'from', type: 'keyword' },
              { text: ' ', type: 'plain' },
              { text: "'@sage/ui'", type: 'string' },
              { text: ';', type: 'punctuation' },
              { text: '\n\n', type: 'plain' },
              { text: 'const', type: 'keyword' },
              { text: ' codeTokens ', type: 'plain' },
              { text: '=', type: 'operator' },
              { text: ' [', type: 'punctuation' },
              { text: '\n  ', type: 'plain' },
              { text: '{ ', type: 'punctuation' },
              { text: 'text', type: 'property' },
              { text: ': ', type: 'punctuation' },
              { text: '"const"', type: 'string' },
              { text: ', ', type: 'punctuation' },
              { text: 'type', type: 'property' },
              { text: ': ', type: 'punctuation' },
              { text: '"keyword"', type: 'string' },
              { text: ' }', type: 'punctuation' },
              { text: ',', type: 'punctuation' },
              { text: '\n  ', type: 'plain' },
              { text: '{ ', type: 'punctuation' },
              { text: 'text', type: 'property' },
              { text: ': ', type: 'punctuation' },
              { text: '" example "', type: 'string' },
              { text: ', ', type: 'punctuation' },
              { text: 'type', type: 'property' },
              { text: ': ', type: 'punctuation' },
              { text: '"plain"', type: 'string' },
              { text: ' }', type: 'punctuation' },
              { text: '\n];', type: 'punctuation' },
              { text: '\n\n', type: 'plain' },
              { text: '<', type: 'tag' },
              { text: 'CollapsibleCodeBlock', type: 'className' },
              { text: '\n  ', type: 'plain' },
              { text: 'id', type: 'attribute' },
              { text: '=', type: 'operator' },
              { text: '"my-code"', type: 'string' },
              { text: '\n  ', type: 'plain' },
              { text: 'code', type: 'attribute' },
              { text: '=', type: 'operator' },
              { text: '{', type: 'punctuation' },
              { text: 'codeTokens', type: 'variable' },
              { text: '}', type: 'punctuation' },
              { text: '\n  ', type: 'plain' },
              { text: 'showCopy', type: 'attribute' },
              { text: '=', type: 'operator' },
              { text: '{', type: 'punctuation' },
              { text: 'true', type: 'boolean' },
              { text: '}', type: 'punctuation' },
              { text: '\n/>', type: 'tag' },
            ]}
            language="typescript"
          />
        </Card>
      </div>
    </div>
  );
}
