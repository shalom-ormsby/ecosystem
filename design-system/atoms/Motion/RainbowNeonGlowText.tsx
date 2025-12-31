'use client';

import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { useCustomizer } from '../../features/customizer/store';

interface RainbowNeonGlowTextProps {
    /**
     * Rendering variant - 'text' follows text outlines, 'border' creates box outline
     * @default 'text'
     */
    variant?: 'text' | 'border';
    /**
     * Blur amount in pixels - how soft the glow appears
     * @default 12
     */
    blurRadius?: number;
    /**
     * Glow spread distance in pixels
     * @default 3
     */
    spreadDistance?: number;
    /**
     * Border width in pixels (border variant only)
     * @default 2
     */
    borderWidth?: number;
    /**
     * Animation speed in seconds for one full rotation
     * @default 4
     */
    animationSpeed?: number;
    /**
     * Direction of glow rotation
     * @default 'clockwise'
     */
    direction?: 'clockwise' | 'counterclockwise';
    /**
     * Array of colors for the rainbow effect (minimum 2 colors)
     * @default ['#ff0088', '#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#0000ff', '#8800ff']
     */
    colors?: string[];
    /**
     * Motion intensity override (0-10). If not provided, uses global customizer setting.
     */
    intensity?: number;
    /**
     * Border radius for the glow effect (border variant only)
     * @default '0.5rem'
     */
    borderRadius?: string;
    /**
     * Content to animate
     */
    children?: React.ReactNode;
    /**
     * CSS class name
     */
    className?: string;
    /**
     * Inline styles
     */
    style?: React.CSSProperties;
}

/**
 * RainbowNeonGlowText
 *
 * A motion component that creates a subtle rotating rainbow glow.
 * - `variant="text"`: Glow follows actual text letter outlines (for text)
 * - `variant="border"`: Glow creates a border around element (for buttons, cards, etc.)
 *
 * **Key Features:**
 * - Silky-smooth rotating rainbow glow
 * - Text variant follows actual letter shapes, not bounding box
 * - Softer, more refined glow effect
 * - Seamless looping animation
 * - Customizable colors, blur, and rotation speed
 * - Respects global motion intensity settings
 *
 * **Usage:**
 * ```tsx
 * // Text - follows letter outlines
 * <RainbowNeonGlowText variant="text">
 *   Glowing Text
 * </RainbowNeonGlowText>
 *
 * // Button - border around element
 * <RainbowNeonGlowText variant="border" borderRadius="0.5rem">
 *   <button className="px-6 py-3">Click Me</button>
 * </RainbowNeonGlowText>
 * ```
 */
export const RainbowNeonGlowText = ({
    variant = 'text',
    children,
    blurRadius = 12,
    spreadDistance = 3,
    borderWidth = 2,
    animationSpeed = 4,
    direction = 'clockwise',
    colors = ['#ff0088', '#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#0000ff', '#8800ff'],
    intensity,
    borderRadius = '0.5rem',
    className,
    style,
}: RainbowNeonGlowTextProps) => {
    const { motion: motionIntensity } = useCustomizer();

    // Use provided intensity or global intensity
    const effectiveIntensity = intensity ?? motionIntensity;

    // Scale duration based on intensity (higher intensity = faster animation)
    const scaledDuration = effectiveIntensity > 0
        ? animationSpeed * (5 / effectiveIntensity)
        : animationSpeed;

    // Generate text-shadow positions in a circle for text variant
    const textShadowPositions = useMemo(() => {
        const numPositions = 16; // More positions for smoother rotation
        const positions = [];
        for (let i = 0; i < numPositions; i++) {
            const angle = (i / numPositions) * Math.PI * 2;
            const x = Math.cos(angle) * spreadDistance;
            const y = Math.sin(angle) * spreadDistance;
            positions.push({ x, y });
        }
        return positions;
    }, [spreadDistance]);

    // Create rotating text-shadow keyframes for text variant
    const createTextShadowKeyframes = () => {
        const numSteps = 16;
        const keyframes = [];

        for (let step = 0; step <= numSteps; step++) {
            const shadows = textShadowPositions.map((pos, index) => {
                const colorIndex = direction === 'clockwise'
                    ? (index + step) % colors.length
                    : (index - step + colors.length * 100) % colors.length;
                const color = colors[colorIndex];
                return `${pos.x}px ${pos.y}px ${blurRadius}px ${color}`;
            }).join(', ');

            keyframes.push(shadows);
        }

        return keyframes;
    };

    // Create conic gradient for border variant
    const conicGradient = useMemo(() => {
        const colorStops = colors.map((color, index) => {
            const percentage = (index / colors.length) * 100;
            return `${color} ${percentage}%`;
        }).join(', ');
        return `conic-gradient(from 0deg, ${colorStops}, ${colors[0]} 100%)`;
    }, [colors]);

    const textShadowKeyframes = useMemo(() => createTextShadowKeyframes(), [textShadowPositions, blurRadius, direction, colors]);

    // TEXT VARIANT - follows text outlines
    if (variant === 'text') {
        if (effectiveIntensity === 0) {
            const staticShadow = textShadowPositions.map((pos, i) =>
                `${pos.x}px ${pos.y}px ${blurRadius}px ${colors[i % colors.length]}`
            ).join(', ');

            return (
                <div
                    className={className}
                    style={{
                        display: 'inline-block',
                        textShadow: staticShadow,
                        ...style,
                    }}
                >
                    {children}
                </div>
            );
        }

        return (
            <motion.div
                className={className}
                style={{
                    display: 'inline-block',
                    willChange: 'text-shadow',
                    ...style,
                }}
                animate={{
                    textShadow: textShadowKeyframes
                }}
                transition={{
                    duration: scaledDuration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {children}
            </motion.div>
        );
    }

    // BORDER VARIANT - box outline for buttons, cards, etc.
    const wrapperStyle: React.CSSProperties = {
        position: 'relative',
        display: 'inline-block',
        padding: `${borderWidth}px`,
        borderRadius,
        overflow: 'hidden',
        ...style,
    };

    if (effectiveIntensity === 0) {
        return (
            <div
                className={className}
                style={{
                    ...wrapperStyle,
                    background: conicGradient,
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: `-${blurRadius * 2}px`,
                        background: conicGradient,
                        filter: `blur(${blurRadius}px)`,
                        opacity: 0.4,
                        zIndex: 0,
                    }}
                />
                <div
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        background: 'var(--color-background)',
                        borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div
            className={className}
            style={wrapperStyle}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    inset: `-50%`,
                    background: conicGradient,
                    willChange: 'transform',
                    zIndex: 0,
                }}
                animate={{
                    rotate: direction === 'clockwise' ? 360 : -360,
                }}
                transition={{
                    duration: scaledDuration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <motion.div
                style={{
                    position: 'absolute',
                    inset: `-${blurRadius * 2}px`,
                    background: conicGradient,
                    filter: `blur(${blurRadius}px)`,
                    opacity: 0.4,
                    willChange: 'transform',
                    zIndex: 0,
                }}
                animate={{
                    rotate: direction === 'clockwise' ? 360 : -360,
                }}
                transition={{
                    duration: scaledDuration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    background: 'var(--color-background)',
                    borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
                }}
            >
                {children}
            </div>
        </div>
    );
};
