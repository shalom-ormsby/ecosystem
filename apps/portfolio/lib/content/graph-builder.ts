import type {
  Node,
  GraphData,
  GraphNode,
  GraphLink,
  Theme,
  Cluster,
} from './types';
import { getAllNodes, getAllThemes } from './parser';

/**
 * Graph Builder
 *
 * Generates graph data structure from content nodes for Cosmograph visualization.
 * Creates nodes, links, and enriches with visual properties.
 */

/**
 * Cluster colors for visual differentiation
 */
const CLUSTER_COLORS: Record<Cluster, string> = {
  work: '#3b82f6', // Blue
  play: '#ec4899', // Pink
  philosophy: '#8b5cf6', // Purple
  meta: '#64748b', // Gray
  connections: '#10b981', // Green
};

/**
 * Build complete graph data from all content nodes
 */
export function buildGraph(): GraphData {
  const nodes = getAllNodes();

  const graphNodes: GraphNode[] = nodes.map((node) => ({
    id: node.id,
    label: node.title,
    cluster: node.cluster,
    type: node.type,
    size: calculateNodeSize(node),
    color: CLUSTER_COLORS[node.cluster],
  }));

  const graphLinks: GraphLink[] = [];

  // Create links based on explicit connections
  nodes.forEach((node) => {
    if (node.connections) {
      node.connections.forEach((targetId) => {
        graphLinks.push({
          source: node.id,
          target: targetId,
          strength: 1.0, // Default strength
        });
      });
    }
  });

  // Create additional links based on shared themes
  const thematicLinks = createThematicLinks(nodes);
  graphLinks.push(...thematicLinks);

  return {
    nodes: graphNodes,
    links: deduplicateLinks(graphLinks),
  };
}

/**
 * Calculate visual size of node based on importance
 */
function calculateNodeSize(node: Node): number {
  let size = 1; // Base size

  // Featured nodes are larger
  if (node.featured) {
    size += 0.5;
  }

  // Case studies are emphasized
  if (node.type === 'case-study') {
    size += 0.3;
  }

  // Philosophy docs are emphasized
  if (node.cluster === 'philosophy') {
    size += 0.2;
  }

  return size;
}

/**
 * Create links between nodes that share themes
 * (weaker than explicit connections)
 */
function createThematicLinks(nodes: Node[]): GraphLink[] {
  const links: GraphLink[] = [];
  const themeMap = new Map<string, string[]>(); // theme -> node IDs

  // Build theme -> nodes map
  nodes.forEach((node) => {
    node.themes.forEach((theme) => {
      if (!themeMap.has(theme)) {
        themeMap.set(theme, []);
      }
      themeMap.get(theme)!.push(node.id);
    });
  });

  // Create links between nodes that share themes
  themeMap.forEach((nodeIds) => {
    // Only create links if there are 2+ nodes with this theme
    if (nodeIds.length < 2) return;

    // Create links between each pair
    for (let i = 0; i < nodeIds.length; i++) {
      for (let j = i + 1; j < nodeIds.length; j++) {
        links.push({
          source: nodeIds[i],
          target: nodeIds[j],
          strength: 0.3, // Weaker than explicit connections
        });
      }
    }
  });

  return links;
}

/**
 * Remove duplicate links (same source/target pair)
 */
function deduplicateLinks(links: GraphLink[]): GraphLink[] {
  const seen = new Set<string>();
  const deduplicated: GraphLink[] = [];

  links.forEach((link) => {
    // Create a normalized key (source and target in alphabetical order)
    const key = [link.source, link.target].sort().join('->');

    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(link);
    }
  });

  return deduplicated;
}

/**
 * Build theme definitions from content
 */
export function buildThemes(): Record<string, Theme> {
  const nodes = getAllNodes();
  const themeIds = getAllThemes();

  const themes: Record<string, Theme> = {};

  themeIds.forEach((themeId) => {
    const nodesWithTheme = nodes.filter((node) =>
      node.themes.includes(themeId)
    );

    themes[themeId] = {
      id: themeId,
      name: formatThemeName(themeId),
      description: `Nodes exploring ${formatThemeName(themeId).toLowerCase()}`,
      nodeIds: nodesWithTheme.map((node) => node.id),
    };
  });

  return themes;
}

/**
 * Format theme ID into display name
 * e.g., 'conscious-capitalism' -> 'Conscious Capitalism'
 */
function formatThemeName(themeId: string): string {
  return themeId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get nodes in a specific cluster
 */
export function getClusterNodes(cluster: Cluster): GraphNode[] {
  const graph = buildGraph();
  return graph.nodes.filter((node) => node.cluster === cluster);
}

/**
 * Find shortest path between two nodes (for animation)
 */
export function findPath(
  sourceId: string,
  targetId: string
): string[] | null {
  const graph = buildGraph();
  const adjacencyList = new Map<string, string[]>();

  // Build adjacency list
  graph.links.forEach((link) => {
    if (!adjacencyList.has(link.source)) {
      adjacencyList.set(link.source, []);
    }
    if (!adjacencyList.has(link.target)) {
      adjacencyList.set(link.target, []);
    }
    adjacencyList.get(link.source)!.push(link.target);
    adjacencyList.get(link.target)!.push(link.source); // Undirected
  });

  // BFS to find shortest path
  const queue: { nodeId: string; path: string[] }[] = [
    { nodeId: sourceId, path: [sourceId] },
  ];
  const visited = new Set<string>([sourceId]);

  while (queue.length > 0) {
    const { nodeId, path } = queue.shift()!;

    if (nodeId === targetId) {
      return path;
    }

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({
          nodeId: neighbor,
          path: [...path, neighbor],
        });
      }
    }
  }

  // No path found - return direct connection
  return [sourceId, targetId];
}

/**
 * Get suggested related nodes for a given node
 * Based on connections + shared themes
 */
export function getSuggestedNodes(nodeId: string, limit = 5): string[] {
  const nodes = getAllNodes();
  const currentNode = nodes.find((n) => n.id === nodeId);

  if (!currentNode) return [];

  const suggestions = new Set<string>();

  // Add explicit connections first
  currentNode.connections?.forEach((connId) => suggestions.add(connId));

  // Add nodes with shared themes
  nodes.forEach((node) => {
    if (node.id === nodeId) return;

    const sharedThemes = node.themes.filter((theme) =>
      currentNode.themes.includes(theme)
    );

    if (sharedThemes.length > 0) {
      suggestions.add(node.id);
    }
  });

  // Convert to array and limit
  return Array.from(suggestions).slice(0, limit);
}
