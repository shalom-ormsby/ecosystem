/**
 * Animation Presets
 *
 * Reusable animation configurations for consistent motion throughout the design system.
 * Works with Framer Motion and respects user motion preferences.
 */

// Type definitions (compatible with Framer Motion)
export type Variant = {
  [key: string]: any;
};

export type Variants = {
  [key: string]: Variant;
};

export type Transition = {
  duration?: number;
  ease?: readonly number[] | number[] | string;
  type?: 'spring' | 'tween' | 'inertia';
  damping?: number;
  stiffness?: number;
  [key: string]: any;
};

/**
 * Animation Duration Presets
 * Based on Material Design motion guidelines
 */
export const durations = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
} as const;

/**
 * Easing Presets
 * Common easing curves for smooth animations
 */
export const easings = {
  // Standard easing - default for most transitions
  standard: [0.4, 0.0, 0.2, 1],

  // Deceleration - use when objects enter screen
  decelerate: [0.0, 0.0, 0.2, 1],

  // Acceleration - use when objects exit screen
  accelerate: [0.4, 0.0, 1, 1],

  // Sharp - use for very quick transitions
  sharp: [0.4, 0.0, 0.6, 1],

  // Bounce - playful animation
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

/**
 * Common transition presets
 */
export const transitions = {
  default: {
    duration: durations.normal,
    ease: easings.standard,
  } as Transition,

  fast: {
    duration: durations.fast,
    ease: easings.standard,
  } as Transition,

  slow: {
    duration: durations.slow,
    ease: easings.standard,
  } as Transition,

  bounce: {
    duration: durations.normal,
    ease: easings.bounce,
  } as Transition,

  spring: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300,
  } as Transition,

  springBouncy: {
    type: 'spring' as const,
    damping: 10,
    stiffness: 100,
  } as Transition,
} as const;

/**
 * Fade Animation Variants
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Slide Animation Variants
 */
export const slideVariants = {
  fromLeft: {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  },
  fromRight: {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  },
  fromTop: {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  fromBottom: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  },
} as const;

/**
 * Scale Animation Variants
 */
export const scaleVariants = {
  default: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
  grow: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
  pop: {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    exit: { scale: 0 },
  },
} as const;

/**
 * Rotate Animation Variants
 */
export const rotateVariants = {
  default: {
    hidden: { rotate: -10, opacity: 0 },
    visible: { rotate: 0, opacity: 1 },
    exit: { rotate: 10, opacity: 0 },
  },
  flip: {
    hidden: { rotateX: 90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
    exit: { rotateX: -90, opacity: 0 },
  },
} as const;

/**
 * List/Stagger Animation Variants
 */
export const listVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  },
} as const;

/**
 * Modal/Overlay Animation Variants
 */
export const modalVariants = {
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  content: {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.95, opacity: 0, y: 20 },
  },
} as const;

/**
 * Drawer/Sheet Animation Variants
 */
export const drawerVariants = {
  fromLeft: {
    hidden: { x: '-100%' },
    visible: { x: 0 },
    exit: { x: '-100%' },
  },
  fromRight: {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  },
  fromTop: {
    hidden: { y: '-100%' },
    visible: { y: 0 },
    exit: { y: '-100%' },
  },
  fromBottom: {
    hidden: { y: '100%' },
    visible: { y: 0 },
    exit: { y: '100%' },
  },
} as const;

/**
 * Collapse/Expand Animation Variants
 */
export const collapseVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: durations.fast },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: durations.normal },
  },
} as const;

/**
 * Preset Animations
 * Complete animation configurations ready to use
 */
export const presets = {
  /**
   * Fade in/out animation
   */
  fade: {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants: fadeVariants,
    transition: transitions.default,
  },

  /**
   * Slide from bottom animation
   */
  slideUp: {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants: slideVariants.fromBottom,
    transition: transitions.default,
  },

  /**
   * Scale animation
   */
  scale: {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants: scaleVariants.default,
    transition: transitions.default,
  },

  /**
   * Modal animation (overlay + content)
   */
  modal: {
    overlay: {
      initial: 'hidden',
      animate: 'visible',
      exit: 'exit',
      variants: modalVariants.overlay,
      transition: transitions.fast,
    },
    content: {
      initial: 'hidden',
      animate: 'visible',
      exit: 'exit',
      variants: modalVariants.content,
      transition: transitions.default,
    },
  },

  /**
   * List stagger animation
   */
  list: {
    container: {
      initial: 'hidden',
      animate: 'visible',
      variants: listVariants.container,
    },
    item: {
      variants: listVariants.item,
    },
  },
} as const;

/**
 * Helper to create a custom animation preset
 *
 * @example
 * ```tsx
 * const customFade = createAnimation({
 *   hidden: { opacity: 0, scale: 0.8 },
 *   visible: { opacity: 1, scale: 1 },
 * }, transitions.bounce);
 * ```
 */
export function createAnimation(
  variants: Variants,
  transition: Transition = transitions.default
) {
  return {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants,
    transition,
  };
}

/**
 * Helper to scale transition duration based on motion preference
 *
 * @example
 * ```tsx
 * const { scale } = useMotionPreference();
 * const duration = scaleDuration(durations.normal, scale);
 * ```
 */
export function scaleDuration(duration: number, scale: number): number {
  return duration * (scale / 10);
}
