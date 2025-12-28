/**
 * Content Model for Shalom's Cosmograph
 *
 * These types define the structure of content nodes, themes, and the graph itself.
 * All content is stored as markdown files with YAML frontmatter.
 */

/**
 * Node Types
 * Categorizes different kinds of content in the ecosystem
 */
export type NodeType =
  | 'case-study'       // Professional work
  | 'video'            // TikTok, YouTube, etc.
  | 'blog-post'        // Substack, blog entries
  | 'poem'             // Poetry
  | 'photo'            // Personal photos
  | 'document'         // Philosophy docs, PRDs, etc.
  | 'ai-exchange'      // Conversations with AI
  | 'artwork'          // Art in Space, creative works
  | 'link'             // External connections (Creative Powerup, etc.)
  | 'meta';            // About the Cosmograph itself

/**
 * Content Clusters
 * High-level groupings that organize nodes spatially in the graph
 */
export type Cluster = 'work' | 'play' | 'philosophy' | 'meta' | 'connections';

/**
 * Platforms
 * Where the original content lives
 */
export type Platform =
  | 'portfolio'        // Native to this site
  | 'linkedin'
  | 'tiktok'
  | 'youtube'
  | 'substack'
  | 'github'
  | 'x'
  | 'bluesky'
  | 'joinable'
  | 'notion';

/**
 * Node Frontmatter
 * YAML metadata at the top of each content markdown file
 */
export interface NodeFrontmatter {
  id: string;                    // Unique identifier (e.g., 'tiktok-komorebi')
  title: string;                 // Display title
  type: NodeType;                // What kind of content
  platform?: Platform;           // Where it originated (optional for native content)
  url?: string;                  // External URL if applicable
  date: string;                  // ISO date (YYYY-MM-DD)
  themes: string[];              // Theme tags (e.g., ['presence', 'beauty'])
  cluster: Cluster;              // Which section it belongs to
  connections?: string[];        // IDs of related nodes
  summary?: string;              // Brief description for Tri's context
  featured?: boolean;            // Highlight in navigation
  embedType?: 'iframe' | 'image' | 'video' | 'text'; // How to display
}

/**
 * Full Node
 * Complete node data including parsed content
 */
export interface Node extends NodeFrontmatter {
  content: string;               // Markdown content body
  slug: string;                  // URL-safe identifier
  readingTime?: number;          // Estimated reading time in minutes
}

/**
 * Theme Definition
 * Thematic groupings that reveal conceptual connections
 */
export interface Theme {
  id: string;                    // Theme identifier (e.g., 'conscious-capitalism')
  name: string;                  // Display name
  description: string;           // What this theme represents
  color?: string;                // Optional color for visualization
  nodeIds: string[];             // Nodes tagged with this theme
}

/**
 * Graph Node
 * Simplified node data for Cosmograph visualization
 */
export interface GraphNode {
  id: string;
  label: string;
  cluster: Cluster;
  type: NodeType;
  size?: number;                 // Visual size in graph
  color?: string;                // Visual color
}

/**
 * Graph Link
 * Connection between two nodes
 */
export interface GraphLink {
  source: string;                // Source node ID
  target: string;                // Target node ID
  strength?: number;             // Connection strength (0-1)
}

/**
 * Graph Data
 * Complete graph structure for visualization
 */
export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

/**
 * Navigation Path
 * Sequence of nodes for animated navigation
 */
export interface NavigationPath {
  nodes: string[];               // Ordered array of node IDs
  duration?: number;             // Animation duration in ms
}

/**
 * Tri Navigation Command
 * Structured command for controlling the Cosmograph
 */
export interface TriNavigationCommand {
  type: 'navigate' | 'highlight' | 'filter' | 'zoom';
  nodeId?: string;               // Target node (for navigate, highlight)
  animationPath?: string[];      // Path to animate through
  themeFilter?: string;          // Theme to filter by
  zoomLevel?: number;            // Zoom level (0-1)
}

/**
 * Tri Response
 * Complete response from Tri including message and optional navigation
 */
export interface TriResponse {
  message: string;               // Natural language response
  action?: TriNavigationCommand; // Optional navigation command
  orientation?: 'cosmo' | 'socrates' | 'optimus'; // Which AI Triad member responded
}

/**
 * Content Index
 * Complete catalog of all content
 */
export interface ContentIndex {
  nodes: Record<string, Node>;   // All nodes by ID
  themes: Record<string, Theme>; // All themes by ID
  graph: GraphData;              // Graph structure
  lastUpdated: string;           // ISO timestamp of last build
}

/**
 * User Preferences
 * Cosmograph-specific settings (extends existing Customizer settings)
 */
export interface CosmographPreferences {
  graphEnabled: boolean;         // Graph-off mode toggle
  defaultView: 'graph' | 'list'; // Preferred initial view
  showLabels: boolean;           // Show node labels in graph
  animationSpeed: number;        // 0-10 scale
}
