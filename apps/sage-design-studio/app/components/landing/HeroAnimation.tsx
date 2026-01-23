'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme, AnimatedBeam, useMotionPreference } from '@sage/ui';

export function HeroAnimation() {
    const { shouldAnimate, scale } = useMotionPreference();
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const durationMultiplier = shouldAnimate && scale > 0 ? (5 / scale) : 0;

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        updateDimensions();
        // Use ResizeObserver for more robust resizing
        const resizeObserver = new ResizeObserver(updateDimensions);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        window.addEventListener('resize', updateDimensions);
        return () => {
            window.removeEventListener('resize', updateDimensions);
            resizeObserver.disconnect();
        };
    }, []);

    const isMobile = dimensions.width < 768;

    // Node Positions (Center points)
    // Mobile: Stacked vertically
    // Desktop: Horizontal
    const start = isMobile
        ? { x: dimensions.width * 0.5, y: dimensions.height * 0.15 }
        : { x: dimensions.width * 0.15, y: dimensions.height * 0.5 };

    const mid = isMobile
        ? { x: dimensions.width * 0.5, y: dimensions.height * 0.5 }
        : { x: dimensions.width * 0.5, y: dimensions.height * 0.5 };

    const end = isMobile
        ? { x: dimensions.width * 0.5, y: dimensions.height * 0.85 }
        : { x: dimensions.width * 0.85, y: dimensions.height * 0.5 };

    // Curvature based on orientation
    const curvature = isMobile ? 0 : 150;

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden" suppressHydrationWarning>

            {/* 1. Token Node */}
            <motion.div
                className="absolute z-10 flex items-center justify-center"
                style={{ left: start.x - 24, top: start.y - 24, width: 48, height: 48 }}
                initial={{ scale: shouldAnimate ? 0 : 1 }}
                animate={{ scale: 1 }}
                transition={shouldAnimate ? { delay: 0.2 * durationMultiplier } : { duration: 0 }}
            >
                <div className="relative w-full h-full">
                    {/* Pulsing Core */}
                    {shouldAnimate && (
                        <div className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-full animate-ping" style={{ animationDuration: `${3 * durationMultiplier}s` }} />
                    )}
                    <div className="absolute inset-0 bg-[var(--color-surface)] border-2 border-[var(--color-primary)] rounded-full flex items-center justify-center shadow-[0_0_30px_-5px_var(--color-primary)]">
                        <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full" />
                    </div>
                    {/* Satellites */}
                    {shouldAnimate && (
                        <motion.div
                            className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"
                            animate={{ rotate: 360 }}
                            style={{ originX: 0, originY: 24 }} // orbiting
                            transition={{ duration: 4 * durationMultiplier, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </div>
            </motion.div>

            {/* Beam 1: Token -> Component */}
            {dimensions.width > 0 && (
                <AnimatedBeam
                    containerRef={containerRef}
                    startX={start.x}
                    startY={start.y}
                    endX={mid.x}
                    endY={mid.y}
                    pathColor="var(--color-border)"
                    pathWidth={2}
                    gradientStartColor="var(--color-primary)"
                    gradientStopColor="var(--color-accent)"
                    duration={2}
                    curvature={curvature}
                />
            )}

            {/* 2. Component Node */}
            <motion.div
                className="absolute z-10 flex items-center justify-center"
                style={{ left: mid.x - 32, top: mid.y - 32, width: 64, height: 64 }}
                initial={{ scale: shouldAnimate ? 0 : 1 }}
                animate={{ scale: 1 }}
                transition={shouldAnimate ? { delay: 1.0 * durationMultiplier } : { duration: 0 }}
            >
                <div className="w-full h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xl flex flex-col items-center justify-center gap-1 p-2">
                    <div className="w-3/4 h-2 bg-[var(--color-text-secondary)]/20 rounded-full" />
                    <div className="w-1/2 h-2 bg-[var(--color-text-secondary)]/20 rounded-full" />
                    <motion.div
                        className="w-full h-8 bg-[var(--color-primary)]/10 rounded-md mt-1 border border-[var(--color-primary)]/20"
                        animate={shouldAnimate ? {
                            backgroundColor: ["rgba(var(--color-primary), 0.1)", "rgba(var(--color-primary), 0.3)", "rgba(var(--color-primary), 0.1)"],
                            scale: [1, 1.05, 1]
                        } : {}}
                        transition={{ duration: 2 * durationMultiplier, repeat: Infinity, repeatDelay: 1 }}
                    />
                </div>
            </motion.div>

            {/* Beam 2: Component -> Blocks */}
            {dimensions.width > 0 && (
                <AnimatedBeam
                    containerRef={containerRef}
                    startX={mid.x}
                    startY={mid.y}
                    endX={end.x}
                    endY={end.y}
                    pathColor="var(--color-border)"
                    pathWidth={2}
                    gradientStartColor="var(--color-accent)"
                    gradientStopColor="var(--color-primary)"
                    duration={2}
                    delay={1} // Stagger
                    curvature={-curvature} // Convex curve
                />
            )}

            {/* 3. Blocks Node (Tetris Assembly) */}
            <div
                className="absolute z-10"
                style={{ left: end.x - 40, top: end.y - 40, width: 80, height: 80 }}
            >
                <motion.div className="relative w-full h-full">
                    {/* Block A */}
                    <motion.div
                        className="absolute w-8 h-8 bg-[var(--color-surface)] border border-[var(--color-primary)] rounded-md"
                        style={{ left: 0, top: 0 }}
                        initial={shouldAnimate ? { x: -20, y: -20, opacity: 0 } : { x: 20, y: 20, opacity: 1 }}
                        animate={{ x: 20, y: 20, opacity: 1 }} // Center
                        transition={shouldAnimate ? { delay: 2.2 * durationMultiplier, duration: 0.8 * durationMultiplier, type: "spring" } : { duration: 0 }}
                    />
                    {/* Block B */}
                    <motion.div
                        className="absolute w-8 h-8 bg-[var(--color-primary)]/80 border border-[var(--color-primary)] rounded-md"
                        style={{ left: 0, top: 0 }}
                        initial={shouldAnimate ? { x: 60, y: -20, opacity: 0 } : { x: 44, y: 20, opacity: 1 }}
                        animate={{ x: 44, y: 20, opacity: 1 }} // Right of Center
                        transition={shouldAnimate ? { delay: 2.4 * durationMultiplier, duration: 0.8 * durationMultiplier, type: "spring" } : { duration: 0 }}
                    />
                    {/* Block C */}
                    <motion.div
                        className="absolute w-8 h-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md"
                        style={{ left: 0, top: 0 }}
                        initial={shouldAnimate ? { x: -20, y: 60, opacity: 0 } : { x: 20, y: 44, opacity: 1 }}
                        animate={{ x: 20, y: 44, opacity: 1 }} // Below Center
                        transition={shouldAnimate ? { delay: 2.6 * durationMultiplier, duration: 0.8 * durationMultiplier, type: "spring" } : { duration: 0 }}
                    />
                    {/* Block D */}
                    <motion.div
                        className="absolute w-8 h-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md"
                        style={{ left: 0, top: 0 }}
                        initial={shouldAnimate ? { x: 60, y: 60, opacity: 0 } : { x: 44, y: 44, opacity: 1 }}
                        animate={{ x: 44, y: 44, opacity: 1 }} // Below Right
                        transition={shouldAnimate ? { delay: 2.8 * durationMultiplier, duration: 0.8 * durationMultiplier, type: "spring" } : { duration: 0 }}
                    />
                </motion.div>
            </div>

            {/* Background Fade Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-[var(--color-background)] pointer-events-none" />
        </div>
    );
}
