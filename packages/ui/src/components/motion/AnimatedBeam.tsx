'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';
import { cn } from '../../lib/utils';

export interface AnimatedBeamProps {
    className?: string;
    containerRef: React.RefObject<HTMLElement | null>;
    fromRef?: React.RefObject<HTMLElement | null>;
    toRef?: React.RefObject<HTMLElement | null>;
    curvature?: number;
    reverse?: boolean;
    pathColor?: string;
    pathWidth?: number;
    pathOpacity?: number;
    gradientStartColor?: string;
    gradientStopColor?: string;
    delay?: number;
    duration?: number;
    startX?: number;
    startY?: number;
    endX?: number;
    endY?: number;
}

import { useMotionPreference } from '../../hooks/useMotionPreference';

export const AnimatedBeam = ({
    className,
    containerRef,
    fromRef,
    toRef,
    curvature = 0,
    reverse = false,
    duration = Math.random() * 3 + 4,
    delay = 0,
    pathColor = "gray",
    pathWidth = 2,
    pathOpacity = 0.2,
    gradientStartColor = "#ffaa40",
    gradientStopColor = "#9c40ff",
    startX,
    startY,
    endX,
    endY,
}: AnimatedBeamProps) => {
    const { shouldAnimate, scale } = useMotionPreference();
    const id = useId();
    const pathId = `beam-path-${id}`;
    const gradientId = `beam-gradient-${id}`;
    const maskId = `beam-mask-${id}`;

    // Calculate effective duration based on intensity
    const durationMultiplier = scale > 0 ? (5 / scale) : 1;
    const effectiveDuration = duration * durationMultiplier;

    // ... (refs logic omitted as in original)

    const x1 = startX || 0;
    const y1 = startY || 0;
    const x2 = endX || 0;
    const y2 = endY || 0;

    // Calculate Bezier control points
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    const controlY = y1;
    const controlX = x2;

    const path = `M ${x1},${y1} C ${x1 + curvature},${y1} ${x2 - curvature},${y2} ${x2},${y2}`;

    return (
        <svg
            fill="none"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("pointer-events-none absolute inset-0 transform-gpu overflow-visible", className)}
        >
            <defs>
                <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop stopColor={gradientStartColor} stopOpacity="0" />
                    <stop stopColor={gradientStartColor} />
                    <stop offset="32.5%" stopColor={gradientStopColor} />
                    <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
                </linearGradient>

                <marker id={`arrow-${id}`} markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto" markerUnits="strokeWidth">
                    <circle cx="2.5" cy="2.5" r="2.5" fill={gradientStopColor} />
                </marker>
            </defs>

            {/* Base Path (faint line) */}
            <path
                d={path}
                stroke={pathColor}
                strokeWidth={pathWidth}
                strokeOpacity={pathOpacity}
                strokeLinecap="round"
            />

            {/* Animated Path Mask */}
            {shouldAnimate && (
                <path
                    d={path}
                    stroke={`url(#${gradientId})`}
                    strokeWidth={pathWidth}
                    strokeLinecap="round"
                    fill="none"
                >
                    <animate
                        attributeName="stroke-dasharray"
                        values={`0, 1000; 1000, 0`}
                        dur={`${effectiveDuration}s`}
                        repeatCount="indefinite"
                    />
                </path>
            )}

            {/* Framer Motion Particle */}
            {shouldAnimate && (
                <motion.circle
                    r={pathWidth * 1.5}
                    fill={gradientStartColor}
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{
                        duration: effectiveDuration,
                        delay: delay,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                    style={{ offsetPath: `path('${path}')` }}
                />
            )}

            {/* Secondary Particle for "Tail" effect */}
            {shouldAnimate && (
                <motion.circle
                    r={pathWidth}
                    fill={gradientStopColor}
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{ offsetDistance: "100%", opacity: [0, 1, 0] }}
                    transition={{
                        duration: effectiveDuration,
                        delay: delay + 0.05,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                    style={{ offsetPath: `path('${path}')` }}
                />
            )}
        </svg>
    );
};
