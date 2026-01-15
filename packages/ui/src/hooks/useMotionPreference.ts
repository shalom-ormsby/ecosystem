'use client';

import { useEffect } from 'react';
import { useCustomizer } from '../lib/store/customizer';

export interface MotionPreference {
  /**
   * Motion intensity level (0-10)
   * 0 = no motion, 10 = full motion
   */
  scale: number;

  /**
   * Whether animations should be displayed
   * False when scale is 0 or prefersReducedMotion is true
   */
  shouldAnimate: boolean;

  /**
   * System preference for reduced motion
   */
  prefersReducedMotion: boolean;
}

/**
 * Hook to access motion preferences
 *
 * Automatically syncs with system `prefers-reduced-motion` media query
 * and respects user's manual motion intensity setting.
 *
 * @example
 * ```tsx
 * function AnimatedComponent() {
 *   const { scale, shouldAnimate } = useMotionPreference();
 *
 *   if (!shouldAnimate) {
 *     return <div>Content without animation</div>;
 *   }
 *
 *   return (
 *     <motion.div
 *       animate={{ opacity: 1 }}
 *       transition={{ duration: 0.3 * (scale / 10) }}
 *     >
 *       Content with scaled animation
 *     </motion.div>
 *   );
 * }
 * ```
 */
export function useMotionPreference(): MotionPreference {
  const { motion, prefersReducedMotion, setPrefersReducedMotion } = useCustomizer();

  // Listen for system prefers-reduced-motion changes
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setPrefersReducedMotion]);

  return {
    scale: motion,
    shouldAnimate: motion > 0 && !prefersReducedMotion,
    prefersReducedMotion,
  };
}
