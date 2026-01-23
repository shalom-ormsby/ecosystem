'use client';

import { cn } from '../../lib/utils';
import { Badge } from '../data-display/Badge';
import { Button } from '../actions/Button';
import { Text } from '../data-display/Text';
import { ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useMotionPreference } from '../../hooks/useMotionPreference';

export interface HeroBlockProps {
    className?: string;
    badge?: string;
    headline: string | React.ReactNode;
    description: string;
    primaryCta?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    secondaryCta?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    background?: React.ReactNode;
    children?: React.ReactNode; // For extra slots like animations
}

export function HeroBlock({
    className,
    badge,
    headline,
    description,
    primaryCta,
    secondaryCta,
    background,
    children,
}: HeroBlockProps) {
    const { shouldAnimate, scale } = useMotionPreference();
    const durationMultiplier = shouldAnimate && scale > 0 ? (5 / scale) : 0;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldAnimate ? 0.1 * durationMultiplier : 0,
                delayChildren: shouldAnimate ? 0.2 * durationMultiplier : 0
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: shouldAnimate ? 20 : 0 },
        visible: {
            opacity: 1,
            y: 0,
            transition: shouldAnimate ? {
                type: 'spring',
                stiffness: 100,
                // Adjust mass/damping if we really want to speed up spring based on intensity,
                // but usually spring stiffness is enough. 
                // To obey strictly the speed:
                duration: 0.5 * durationMultiplier
            } : { duration: 0 }
        },
    };

    return (
        <div className={cn("relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden w-full", className)}>
            {/* Background with Full-Frame & Smooth Falloff */}
            {background && (
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    {/* The Background Layer */}
                    <div className="absolute inset-0">
                        {background}
                    </div>

                    {/* Smooth Falloff Gradient (Bottom Fade) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-background)] z-10" />
                </div>
            )}

            {/* Content */}
            <motion.div
                className="relative z-20 container max-w-4xl px-4 text-center space-y-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* Badge Slot */}
                {badge && (
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <Badge variant="outline" className="backdrop-blur-md bg-[var(--color-surface)]/30 border-[var(--color-border)] px-4 py-1.5">
                            {badge}
                        </Badge>
                    </motion.div>
                )}

                {/* Headline Slot */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-text-primary)]"
                >
                    {headline}
                </motion.h1>

                {/* Description Slot */}
                <motion.div variants={itemVariants}>
                    <Text variant="secondary" className="text-xl md:text-2xl max-w-2xl mx-auto">
                        {description}
                    </Text>
                </motion.div>

                {/* Extra Slot (e.g. Typewriter) */}
                {children && (
                    <motion.div variants={itemVariants} className="flex justify-center">
                        {children}
                    </motion.div>
                )}

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    {primaryCta && (
                        <Button size="lg" variant="default" onClick={primaryCta.onClick}>
                            {primaryCta.label}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                    {secondaryCta && (
                        <Button size="lg" variant="outline" className="bg-[var(--color-surface)]/50 backdrop-blur-md" onClick={secondaryCta.onClick}>
                            {secondaryCta.label}
                        </Button>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
