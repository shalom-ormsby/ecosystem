'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';
import { useCustomizer } from '../../lib/store';

interface VariableWeightTextProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    /**
     * Minimum font weight for the animation
     * @default 200
     */
    minWeight?: number;
    /**
     * Maximum font weight for the animation
     * @default 700
     */
    maxWeight?: number;
    /**
     * Duration of one complete animation cycle (in seconds)
     * @default 2
     */
    duration?: number;
    /**
     * Motion intensity override (0-10). If not provided, uses global customizer setting.
     */
    intensity?: number;
    /**
     * Font family to use. Recommended: 'Clash Display' or another variable font.
     * @default 'Clash Display'
     */
    fontFamily?: string;
    /**
     * Text content to animate
     */
    children?: React.ReactNode;
}

/**
 * VariableWeightText
 *
 * A motion component that creates a "breathing" effect by animating font weight.
 * Works best with variable fonts like Clash Display that support smooth weight transitions.
 *
 * **Key Features:**
 * - Animates font-weight in a continuous loop
 * - Respects global motion intensity settings
 * - Automatically centers text to prevent layout shifts during weight changes
 * - Disables animation when motion intensity is 0 (accessibility)
 *
 * **Usage:**
 * ```tsx
 * <VariableWeightText minWeight={200} maxWeight={700}>
 *   Variable Font Text
 * </VariableWeightText>
 * ```
 */
export const VariableWeightText = ({
    children,
    minWeight = 200,
    maxWeight = 700,
    duration = 2,
    intensity,
    fontFamily = 'Clash Display',
    className,
    style,
    ...props
}: VariableWeightTextProps) => {
    const { motion: motionIntensity } = useCustomizer();

    // Use provided intensity or global intensity
    const effectiveIntensity = intensity ?? motionIntensity;

    // Scale duration based on intensity (higher intensity = faster animation)
    const scaledDuration = effectiveIntensity > 0
        ? duration * (5 / effectiveIntensity)
        : duration;

    // If motion is disabled (intensity 0), render static text at maxWeight
    if (effectiveIntensity === 0) {
        return (
            <div
                className={className}
                style={{
                    fontFamily,
                    fontWeight: maxWeight,
                    fontVariationSettings: `'wght' ${maxWeight}`,
                    textAlign: 'center',
                    width: '100%',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    ...style,
                }}
                {...props as any}
            >
                {children}
            </div>
        );
    }

    return (
        <motion.div
            initial={{
                fontVariationSettings: `'wght' ${minWeight}`
            }}
            animate={{
                fontVariationSettings: `'wght' ${maxWeight}`
            }}
            transition={{
                duration: scaledDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            }}
            style={{
                fontFamily,
                fontWeight: minWeight, // Fallback
                textAlign: 'center',
                width: '100%',
                willChange: 'font-variation-settings', // GPU acceleration hint
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                ...style,
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
