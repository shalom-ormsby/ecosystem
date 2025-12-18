/**
 * Central registry of all experiments in the Creative Sandbox
 *
 * To add a new experiment:
 * 1. Create your experiment page in app/[category]/[slug]/page.tsx
 * 2. Add an entry to this array
 * 3. That's it! It will appear in the gallery automatically
 */

import type { Experiment, CategoryInfo } from './types';

export const experiments: Experiment[] = [
  {
    slug: 'fibonacci',
    title: 'Fibonacci Spiral',
    category: 'visualizations',
    description: 'Golden ratio breathing animation with 1000 dots arranged in a Fibonacci spiral pattern.',
    author: 'Creative Powerup',
    path: '/visualizations/fibonacci',
    dateAdded: '2025-12-17',
    tags: ['sacred-geometry', 'math', 'golden-ratio'],
  },
  {
    slug: 'hexgrid',
    title: 'Hexagonal Grid',
    category: 'visualizations',
    description: 'Sacred geometry pattern using hexagonal tiling with golden accents.',
    author: 'Creative Powerup',
    path: '/visualizations/hexgrid',
    dateAdded: '2025-12-17',
    tags: ['sacred-geometry', 'patterns'],
  },
  {
    slug: 'mayan-calendar',
    title: 'Mayan Calendar Converter',
    category: 'tools',
    description: 'Convert Gregorian dates to Mayan Cholq\'ij calendar (K\'iche\' tradition).',
    author: 'Creative Powerup',
    path: '/tools/mayan-calendar',
    dateAdded: '2025-12-17',
    tags: ['calendar', 'cultural', 'utility'],
  },
  {
    slug: 'galaga',
    title: 'Galaga',
    category: 'games',
    description: 'Classic arcade space shooter. Arrow keys to move, Space to fire.',
    author: 'Creative Powerup',
    path: '/games/galaga',
    dateAdded: '2025-12-17',
    tags: ['arcade', 'retro', 'keyboard'],
  },
  {
    slug: 'tetris',
    title: 'Tetris',
    category: 'games',
    description: 'The timeless block puzzle game. Arrow keys to move, Up to rotate.',
    author: 'Creative Powerup',
    path: '/games/tetris',
    dateAdded: '2025-12-17',
    tags: ['arcade', 'retro', 'puzzle'],
  },
  {
    slug: 'kaleidoscope',
    title: 'Kaleidoscope',
    category: 'animations',
    description: 'Interactive generative art with symmetrical patterns. Draw with your mouse!',
    author: 'Creative Powerup',
    path: '/animations/kaleidoscope',
    dateAdded: '2025-12-17',
    tags: ['generative-art', 'interactive', 'p5js'],
  },
  {
    slug: 'particle-flow-v1',
    title: 'Particle Flow, v1',
    category: 'animations',
    description: 'Fluid, organic particle system inspired by antigravity.google. Includes configuration controls.',
    author: 'Creative Powerup',
    path: '/animations/particle-flow-v1',
    dateAdded: '2025-12-17',
    tags: ['particles', 'flow-field', 'interactive', 'canvas'],
  },
  {
    slug: 'particle-flow-v2',
    title: 'Particle Flow, v2',
    category: 'animations',
    description: 'Advanced particle system with On-camera, Flocking, Oceanic, and Brownian motion modes. Includes decay and mesh gradients.',
    author: 'Creative Powerup',
    path: '/animations/particle-flow-v2',
    dateAdded: '2025-12-17',
    tags: ['particles', 'flow-field', 'interactive', 'canvas', 'boids', '3d'],
  },
  {
    slug: 'soccer',
    title: '2v2 Soccer',
    category: 'games',
    description: '2v2 soccer game. WASD to move, Space to shoot, E to pass.',
    author: 'Creative Powerup',
    path: '/games/soccer',
    dateAdded: '2025-12-17',
    tags: ['sports', 'multiplayer'],
  },
];

export const categories: CategoryInfo[] = [
  {
    slug: 'games',
    title: 'Games',
    icon: '🎮',
    description: 'Playable interactive experiences',
  },
  {
    slug: 'visualizations',
    title: 'Visualizations',
    icon: '🌀',
    description: 'Math and generative art',
  },
  {
    slug: 'animations',
    title: 'Animations',
    icon: '✨',
    description: 'Motion technique experiments',
  },
  {
    slug: 'tools',
    title: 'Tools',
    icon: '🔧',
    description: 'Functional utilities',
  },
];

/**
 * Get all experiments in a specific category
 */
export function getExperimentsByCategory(category: string): Experiment[] {
  return experiments.filter(exp => exp.category === category);
}

/**
 * Get a single experiment by slug
 */
export function getExperimentBySlug(slug: string): Experiment | undefined {
  return experiments.find(exp => exp.slug === slug);
}

/**
 * Get experiments by tag
 */
export function getExperimentsByTag(tag: string): Experiment[] {
  return experiments.filter(exp => exp.tags?.includes(tag));
}
