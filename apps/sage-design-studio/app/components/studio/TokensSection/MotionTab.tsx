'use client';

import { useState } from 'react';
import { Card, Button } from '@ecosystem/design-system';
import { baseTokens, motion } from '@ecosystem/design-system';

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
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), parseInt(duration) + 100);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 bg-[var(--color-background)] rounded-lg p-4 overflow-hidden">
        <div
          className="w-12 h-12 bg-[var(--color-primary)] rounded-lg"
          style={{
            transform: isAnimating ? 'translateX(200px)' : 'translateX(0)',
            transition: `transform ${duration} ${easing}`,
          }}
        />
      </div>
      <Button onClick={handleAnimate} variant="secondary" size="sm">
        Play
      </Button>
    </div>
  );
}

export function MotionTab() {
  const [selectedDuration, setSelectedDuration] = useState<keyof typeof baseTokens.duration>('normal');
  const [selectedEasing, setSelectedEasing] = useState<keyof typeof motion.easing>('default');

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="p-6 bg-[var(--color-surface)]">
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Motion System
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-4">
          Motion brings interfaces to life. Our motion system provides a carefully crafted set of durations and easing curves
          that create smooth, purposeful animations. Use motion to guide attention, provide feedback, and create delightful experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">When to Use Motion</h4>
            <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
              <li>• State changes (hover, active, disabled)</li>
              <li>• Page transitions and navigation</li>
              <li>• Drawing attention to important elements</li>
              <li>• Providing feedback for user actions</li>
              <li>• Revealing and hiding content</li>
            </ul>
          </div>
          <div className="p-4 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Motion Best Practices</h4>
            <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
              <li>• Keep animations fast (150-500ms)</li>
              <li>• Use consistent easing curves</li>
              <li>• Respect prefers-reduced-motion</li>
              <li>• Animate transform and opacity (performant)</li>
              <li>• Avoid animating layout properties</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Duration Scale */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Duration Scale
        </h3>
        <Card className="p-6">
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
      </div>

      {/* Easing Curves */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Easing Curves
        </h3>
        <Card className="p-6">
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
      </div>

      {/* Variable Weight Motion */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Variable Weight Motion
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            For variable fonts (like Clash Display), use the <code>VariableWeightText</code> behavior to create a "breathing" effect that animates font weight.
            This animation automatically centers the text to ensure symmetrical expansion and contraction, preventing layout shifts.
          </p>
          <div className="bg-[var(--color-background)] p-4 rounded border border-[var(--color-border)] overflow-x-auto">
            <pre className="text-sm font-mono text-[var(--color-text-primary)]">
              {`import { VariableWeightText } from '@ecosystem/design-system';

<VariableWeightText minWeight={200} maxWeight={700}>
  Variable Font Text
</VariableWeightText>`}
            </pre>
          </div>
        </Card>
      </div>

      {/* Interactive Playground */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Interactive Playground
        </h3>
        <Card className="p-6">
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
      </div>

      {/* Implementation Guide */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Implementation Guide
        </h3>
        <div className="space-y-6">
          {/* CSS/Tailwind */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
              CSS / Tailwind
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              For simple transitions and states, use CSS transitions with our motion tokens.
            </p>
            <div className="bg-[var(--color-background)] p-4 rounded border border-[var(--color-border)] overflow-x-auto">
              <pre className="text-sm font-mono text-[var(--color-text-primary)]">
                {`/* Using CSS custom properties */
.button {
  transition: all var(--duration-normal) var(--ease-default);
}

/* Using Tailwind */
<button className="transition-all duration-300 ease-out hover:scale-105">
  Hover me
</button>`}
              </pre>
            </div>
          </Card>

          {/* Framer Motion */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Framer Motion
                </h4>
                <a
                  href="https://motion.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-primary)] hover:underline"
                >
                  motion.dev →
                </a>
              </div>
              <span className="text-xs px-2 py-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded">
                Recommended
              </span>
            </div>
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
              <div className="bg-[var(--color-background)] p-4 rounded border border-[var(--color-border)] overflow-x-auto">
                <pre className="text-sm font-mono text-[var(--color-text-primary)]">
                  {`import { motion } from 'framer-motion';

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
                </pre>
              </div>
            </div>
          </Card>

          {/* GSAP */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  GSAP (GreenSock Animation Platform)
                </h4>
                <a
                  href="https://gsap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-primary)] hover:underline"
                >
                  gsap.com →
                </a>
              </div>
              <span className="text-xs px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded border border-[var(--color-border)]">
                Specialized
              </span>
            </div>
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
              <div className="bg-[var(--color-background)] p-4 rounded border border-[var(--color-border)] overflow-x-auto">
                <pre className="text-sm font-mono text-[var(--color-text-primary)]">
                  {`import { gsap } from 'gsap';

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
                </pre>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Accessibility */}
      <Card className="p-6 bg-[var(--color-surface)]">
        <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          Accessibility: Respecting User Preferences
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          Always respect the <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">prefers-reduced-motion</code> media query.
          Some users experience motion sickness or find animations distracting.
        </p>
        <div className="bg-[var(--color-background)] p-4 rounded border border-[var(--color-border)] overflow-x-auto">
          <pre className="text-sm font-mono text-[var(--color-text-primary)]">
            {`/* CSS approach */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

// Framer Motion approach
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

<motion.div
  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
>
  Content
</motion.div>`}
          </pre>
        </div>
      </Card>
    </div>
  );
}
