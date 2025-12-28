import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { marked } from 'marked';
import type { Node, NodeFrontmatter } from './types';

/**
 * Content Parser
 *
 * Parses markdown files with YAML frontmatter into Node objects.
 * Validates frontmatter schema and enriches with derived data.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content', 'nodes');

// Configure marked for better HTML output
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
});

/**
 * Parse a single markdown file into a Node
 */
export function parseNode(filePath: string): Node {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Validate required frontmatter fields
  validateFrontmatter(data, filePath);

  const frontmatter = data as NodeFrontmatter;

  // Generate slug from ID (URL-safe)
  const slug = frontmatter.id.toLowerCase().replace(/\s+/g, '-');

  // Calculate reading time for text content
  const stats = readingTime(content);

  // Convert markdown to HTML
  const htmlContent = marked(content) as string;

  return {
    ...frontmatter,
    content: htmlContent,
    slug,
    readingTime: Math.ceil(stats.minutes),
  };
}

/**
 * Get all nodes from a specific cluster directory
 */
export function getNodesByCluster(cluster: string): Node[] {
  const clusterDir = path.join(CONTENT_DIR, cluster);

  if (!fs.existsSync(clusterDir)) {
    console.warn(`Cluster directory not found: ${clusterDir}`);
    return [];
  }

  const files = fs.readdirSync(clusterDir);
  const markdownFiles = files.filter(
    (file) => file.endsWith('.md') || file.endsWith('.mdx')
  );

  return markdownFiles.map((file) => {
    const filePath = path.join(clusterDir, file);
    return parseNode(filePath);
  });
}

/**
 * Get all nodes from all clusters
 */
export function getAllNodes(): Node[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(`Content directory not found: ${CONTENT_DIR}`);
    return [];
  }

  const clusters = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const allNodes = clusters.flatMap((cluster) => getNodesByCluster(cluster));

  return allNodes;
}

/**
 * Get a single node by ID
 */
export function getNodeById(id: string): Node | null {
  const allNodes = getAllNodes();
  return allNodes.find((node) => node.id === id) || null;
}

/**
 * Get nodes by theme
 */
export function getNodesByTheme(themeId: string): Node[] {
  const allNodes = getAllNodes();
  return allNodes.filter((node) => node.themes.includes(themeId));
}

/**
 * Get connected nodes (following the connections array)
 */
export function getConnectedNodes(nodeId: string): Node[] {
  const node = getNodeById(nodeId);
  if (!node || !node.connections) return [];

  return node.connections
    .map((connId) => getNodeById(connId))
    .filter((n): n is Node => n !== null);
}

/**
 * Validate frontmatter has required fields
 */
function validateFrontmatter(data: any, filePath: string): void {
  const required = ['id', 'title', 'type', 'date', 'themes', 'cluster'];

  for (const field of required) {
    if (!data[field]) {
      throw new Error(
        `Missing required frontmatter field "${field}" in ${filePath}`
      );
    }
  }

  // Validate themes is an array
  if (!Array.isArray(data.themes)) {
    throw new Error(`Field "themes" must be an array in ${filePath}`);
  }

  // Normalize date to string (gray-matter may parse as Date object)
  if (data.date instanceof Date) {
    data.date = data.date.toISOString().split('T')[0];
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(data.date)) {
    throw new Error(
      `Field "date" must be in YYYY-MM-DD format in ${filePath}. Got: ${data.date}`
    );
  }
}

/**
 * Get all unique themes from all nodes
 */
export function getAllThemes(): string[] {
  const allNodes = getAllNodes();
  const themeSet = new Set<string>();

  allNodes.forEach((node) => {
    node.themes.forEach((theme) => themeSet.add(theme));
  });

  return Array.from(themeSet).sort();
}

/**
 * Search nodes by text (title, content, themes)
 */
export function searchNodes(query: string): Node[] {
  const allNodes = getAllNodes();
  const lowerQuery = query.toLowerCase();

  return allNodes.filter((node) => {
    const titleMatch = node.title.toLowerCase().includes(lowerQuery);
    const contentMatch = node.content.toLowerCase().includes(lowerQuery);
    const themeMatch = node.themes.some((theme) =>
      theme.toLowerCase().includes(lowerQuery)
    );

    return titleMatch || contentMatch || themeMatch;
  });
}
