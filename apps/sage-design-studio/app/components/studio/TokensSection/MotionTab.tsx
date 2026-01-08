'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, Button } from '@sds/ui';
import { Code, CollapsibleCodeBlock } from '@ecosystem/design-system';
import { baseTokens, motion } from '@ecosystem/design-system/tokens';
import { VariableWeightText } from '@ecosystem/design-system';

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
    const containerRef = useRef<HTMLDivElement>(null);
    const [maxDistance, setMaxDistance] = useState(0);

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
        setTimeout(() => setIsAnimating(false), parseInt(duration) + 100);
    };

    return (
        <div className="flex items-center gap-4">
            <div ref={containerRef} className="flex-1 bg-[var(--color-background)] rounded-lg p-4 overflow-hidden">
                <div
                    className="w-12 h-12 bg-[var(--color-primary)] rounded-lg"
                    style={{
                        transform: isAnimating ? `translateX(${maxDistance}px)` : 'translateX(0)',
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

            {/* Variable Weight Motion */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
                    Variable Weight Motion
                </h3>
                <Card className="p-6">
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                        For variable fonts (like <strong>Clash Display</strong>), use the <Code>VariableWeightText</Code> component to create a silky-smooth "breathing" effect that animates font weight.
                        This animation uses <Code>font-variation-settings</Code> for true variable font interpolation.
                    </p>
                    <div className="mb-6 p-4 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
                        <p className="text-xs text-[var(--color-text-muted)] mb-2">
                            <strong>Performance Optimizations:</strong>
                        </p>
                        <ul className="text-xs text-[var(--color-text-muted)] space-y-1">
                            <li>✓ Uses true variable font (continuous weight axis from 200-700)</li>
                            <li>✓ GPU-accelerated with <Code>will-change</Code></li>
                            <li>✓ Custom easing curve <Code>[0.45, 0, 0.55, 1]</Code> for ultra-smooth motion</li>
                            <li>✓ Font smoothing (antialiased) for crisp rendering</li>
                            <li>✓ Centered to prevent layout shifts during weight changes</li>
                        </ul>
                    </div>

                    {/* Live Demo */}
                    <div className="mb-6 p-8 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                        <VariableWeightText
                            minWeight={200}
                            maxWeight={700}
                            duration={2}
                            className="text-4xl text-[var(--color-text-primary)]"
                        >
                            Clash Display
                        </VariableWeightText>
                    </div>

                    {/* Code Example */}
                    <CollapsibleCodeBlock
                        id="variable-weight-text-example"
                        code={`import { VariableWeightText } from '@ecosystem/design-system';

<VariableWeightText minWeight={200} maxWeight={700}>
  Clash Display
</VariableWeightText>`}
                        defaultCollapsed={false}
                        showCopy={true}
                    />

                    <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                        <p className="text-xs text-[var(--color-text-muted)]">
                            <strong>Note:</strong> The VariableWeightText component defaults to using Clash Display, but you can override with the <Code>fontFamily</Code> prop to use any variable font.
                        </p>
                    </div>
                </Card>
            </div>

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
                                        <Code className="text-sm">
                                            {name}
                                        </Code>
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
                                        <Code className="text-sm">
                                            {name}
                                        </Code>
                                    </div>
                                    <span className="text-xs text-[var(--color-text-muted)]">
                                        {name === 'default' && 'Natural, decelerating motion'}
                                        {name === 'spring' && 'Playful, bouncy feel'}
                                        {name === 'linear' && 'Constant speed'}
                                    </span>
                                </div>
                                <Code className="text-xs block mb-3">
                                    {value}
                                </Code>
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
                        <CollapsibleCodeBlock
                            id="css-tailwind-example"
                            code={`/* Using CSS custom properties */
.button {
  transition: all var(--duration-normal) var(--ease-default);
}

/* Using Tailwind */
<button className="transition-all duration-300 ease-out hover:scale-105">
  Hover me
</button>`}
                            defaultCollapsed={false}
                            showCopy={true}
                        />
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
                            <CollapsibleCodeBlock
                                id="framer-motion-basic"
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
                                defaultCollapsed={false}
                                showCopy={true}
                            />
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
                            <CollapsibleCodeBlock
                                id="gsap-example"
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
                                defaultCollapsed={false}
                                showCopy={true}
                            />
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
                    Always respect the <Code>prefers-reduced-motion</Code> media query.
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
import { useMotionPreference } from '@ecosystem/design-system';

function MyComponent() {
  const { shouldAnimate } = useMotionPreference();

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldAnimate ? 0.3 : 0 }}
    >
      Content
    </motion.div>
  );
}`}
                    defaultCollapsed={false}
                    showCopy={true}
                />
            </Card>

            {/* Animation Presets */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
                    Framer Motion Integration
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                    Pre-built animation variants and presets for Framer Motion. Import from{' '}
                    <Code>
                        @ecosystem/design-system/utils
                    </Code>
                </p>

                {/* Animation Variants Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Fade Variants */}
                    <Card className="p-6">
                        <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Fade Variants</h4>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Simple opacity transitions
                        </p>
                        <CollapsibleCodeBlock
                            id="fade-variants"
                            code={`import { fadeVariants } from '@ecosystem/design-system/utils';

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeVariants}
>
  Content
</motion.div>`}
                            defaultCollapsed={true}
                            showCopy={true}
                        />
                    </Card>

                    {/* Slide Variants */}
                    <Card className="p-6">
                        <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Slide Variants</h4>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Slide in from: Left, Right, Top, Bottom
                        </p>
                        <CollapsibleCodeBlock
                            id="slide-variants"
                            code={`import { slideVariants } from '@ecosystem/design-system/utils';

<motion.div
  initial="hidden"
  animate="visible"
  variants={slideVariants.fromBottom}
>
  Content
</motion.div>`}
                            defaultCollapsed={true}
                            showCopy={true}
                        />
                    </Card>

                    {/* Scale Variants */}
                    <Card className="p-6">
                        <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Scale Variants</h4>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Default, Grow, Pop effects
                        </p>
                        <CollapsibleCodeBlock
                            id="scale-variants"
                            code={`import { scaleVariants } from '@ecosystem/design-system/utils';

<motion.div
  initial="hidden"
  animate="visible"
  variants={scaleVariants.pop}
>
  Content
</motion.div>`}
                            defaultCollapsed={true}
                            showCopy={true}
                        />
                    </Card>

                    {/* Modal Variants */}
                    <Card className="p-6">
                        <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Modal Variants</h4>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Overlay + Content animations
                        </p>
                        <CollapsibleCodeBlock
                            id="modal-variants"
                            code={`import { modalVariants } from '@ecosystem/design-system/utils';

<motion.div variants={modalVariants.overlay}>
  <motion.div variants={modalVariants.content}>
    Modal content
  </motion.div>
</motion.div>`}
                            defaultCollapsed={true}
                            showCopy={true}
                        />
                    </Card>

                    {/* Rotate Variants */}
                    <Card className="p-6">
                        <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Rotate Variants</h4>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Rotation animations with fade
                        </p>
                        <CollapsibleCodeBlock
                            id="rotate-variants"
                            code={`import { rotateVariants } from '@ecosystem/design-system/utils';

<motion.div
  initial="hidden"
  animate="visible"
  variants={rotateVariants}
>
  Content
</motion.div>`}
                            defaultCollapsed={true}
                            showCopy={true}
                        />
                    </Card>

                    {/* Drawer Variants */}
                    <Card className="p-6">
                        <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Drawer Variants</h4>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Slide-out panels from: Left, Right, Top, Bottom
                        </p>
                        <CollapsibleCodeBlock
                            id="drawer-variants"
                            code={`import { drawerVariants } from '@ecosystem/design-system/utils';

<motion.div
  initial="hidden"
  animate="visible"
  variants={drawerVariants.fromRight}
>
  Drawer content
</motion.div>`}
                            defaultCollapsed={true}
                            showCopy={true}
                        />
                    </Card>

                    {/* Collapse Variants */}
                    <Card className="p-6">
                        <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Collapse Variants</h4>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Height-based expand/collapse for accordions
                        </p>
                        <CollapsibleCodeBlock
                            id="collapse-variants"
                            code={`import { collapseVariants } from '@ecosystem/design-system/utils';

<motion.div
  initial="collapsed"
  animate="expanded"
  variants={collapseVariants}
>
  Collapsible content
</motion.div>`}
                            defaultCollapsed={true}
                            showCopy={true}
                        />
                    </Card>
                </div>

                {/* Complete Presets */}
                <Card className="p-6">
                    <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Complete Presets</h4>
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
                                    <Code>presets.fade</Code>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Code>presets.slideUp</Code>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Code>presets.scale</Code>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Code>presets.modal</Code>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Code>presets.list</Code>
                                </div>
                            </div>
                        </div>
                        <CollapsibleCodeBlock
                            id="complete-presets"
                            code={`import { presets } from '@ecosystem/design-system/utils';

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
                            defaultCollapsed={true}
                            showCopy={true}
                        />
                    </div>
                </Card>

                {/* Custom Animation Helper */}
                <Card className="p-6 mt-6">
                    <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Create Custom Animations</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                        Use the <Code>createAnimation</Code> helper to build custom variants:
                    </p>
                    <CollapsibleCodeBlock
                        id="custom-animation-helper"
                        code={`import { createAnimation, transitions, easings } from '@ecosystem/design-system/utils';

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
                        defaultCollapsed={true}
                        showCopy={true}
                    />
                </Card>
            </div>
        </div>
    );
}
