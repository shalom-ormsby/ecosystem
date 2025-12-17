/**
 * Type definitions for Creative Sandbox experiments
 */

export type ExperimentCategory = 'games' | 'visualizations' | 'animations' | 'tools';

export interface Experiment {
  /** URL-friendly slug (e.g., 'fibonacci-spiral') */
  slug: string;

  /** Display title */
  title: string;

  /** Category classification */
  category: ExperimentCategory;

  /** Short description (1-2 sentences) */
  description: string;

  /** Creator's name or username */
  author: string;

  /** Full path to experiment */
  path: string;

  /** ISO date string when added */
  dateAdded: string;

  /** Optional thumbnail image path */
  thumbnail?: string;

  /** Optional tags for filtering */
  tags?: string[];

  /** Optional external link (GitHub, etc.) */
  sourceUrl?: string;
}

export interface CategoryInfo {
  slug: ExperimentCategory;
  title: string;
  icon: string;
  description: string;
}
