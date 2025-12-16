'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';
import { useCustomizer } from '../../features/customizer/store';
import { useThemeStore } from '../../store/theme';
import { studioTokens } from '../../tokens/studio';
import { sageTokens } from '../../tokens/sage';
import { voltTokens } from '../../tokens/volt';

// Theme token map
const themeTokens = {
  studio: studioTokens,
  sage: sageTokens,
  volt: voltTokens,
};

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  intensity?: number; // Optional override for motion intensity
}

export const FadeIn = ({ children, delay = 0, duration, intensity, className, ...props }: FadeInProps) => {
  const { motion: motionIntensity } = useCustomizer();
  const { theme } = useThemeStore();

  // Use provided intensity or global intensity
  const effectiveIntensity = intensity ?? motionIntensity;

  // Get duration from theme tokens based on intensity
  const tokens = themeTokens[theme];
  const calculatedDuration = duration ?? parseFloat(tokens.motion.getDuration(effectiveIntensity)) / 1000; // Convert ms to seconds

  // If motion is disabled (intensity 0), skip animation
  if (effectiveIntensity === 0) {
    return <div className={className} {...props as any}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: calculatedDuration,
        delay,
        ease: tokens.motion.ease.default.replace('cubic-bezier', '').replace(/[()]/g, '').split(',').map(Number) as any
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, delay = 0, stagger = 0.1, intensity, className, ...props }: FadeInProps & { stagger?: number }) => {
  const { motion: motionIntensity } = useCustomizer();
  const effectiveIntensity = intensity ?? motionIntensity;

  // If motion is disabled, render without animation
  if (effectiveIntensity === 0) {
    return <div className={className} {...props as any}>{children}</div>;
  }

  // Scale stagger timing based on intensity
  const scaledStagger = stagger * (effectiveIntensity / 5); // 5 is mid-range

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: scaledStagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className, ...props }: HTMLMotionProps<'div'>) => {
  const { motion: motionIntensity } = useCustomizer();
  const { theme } = useThemeStore();

  // Get duration from theme tokens
  const tokens = themeTokens[theme];
  const duration = parseFloat(tokens.motion.getDuration(motionIntensity)) / 1000;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: tokens.motion.ease.default.replace('cubic-bezier', '').replace(/[()]/g, '').split(',').map(Number) as any
          }
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
