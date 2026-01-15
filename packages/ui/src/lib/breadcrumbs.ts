import type { BreadcrumbItemLegacy } from '../components/navigation/Breadcrumbs';

export interface RouteConfig {
  [key: string]: {
    label: string;
    children?: RouteConfig;
  };
}

/**
 * Generates breadcrumb items from hash-based routing
 *
 * @param hash - Current window.location.hash (e.g., '#atoms/button')
 * @param routeConfig - Configuration mapping routes to labels
 * @param baseUrl - Base URL for href generation (default: '#')
 * @returns Array of breadcrumb items with the last item having no href
 *
 * @example
 * ```ts
 * const routeConfig = {
 *   atoms: {
 *     label: 'Components',
 *     children: {
 *       button: { label: 'Button' }
 *     }
 *   }
 * };
 *
 * // With hash: '#atoms/button'
 * const breadcrumbs = generateBreadcrumbs('#atoms/button', routeConfig);
 * // Returns: [
 * //   { label: 'Home', href: '#' },
 * //   { label: 'Components', href: '#atoms' },
 * //   { label: 'Button' }  // No href for current page
 * // ]
 * ```
 */
export function generateBreadcrumbs(
  hash: string,
  routeConfig: RouteConfig,
  baseUrl: string = '#'
): BreadcrumbItemLegacy[] {
  // Remove '#' prefix and clean up
  const cleanHash = hash.replace(/^#/, '').trim();

  // If no hash, return just home
  if (!cleanHash) {
    return [{ label: 'Home', href: baseUrl }];
  }

  // Split path into segments
  const segments = cleanHash.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItemLegacy[] = [{ label: 'Home', href: baseUrl }];

  let currentPath = '';
  let currentConfig = routeConfig;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const isLast = i === segments.length - 1;

    currentPath += (currentPath ? '/' : '') + segment;

    // Look up label in config
    const config = currentConfig[segment];

    if (!config) {
      // Fallback: convert kebab-case to Title Case
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        // No href for the last item (current page)
        href: isLast ? undefined : `${baseUrl}${currentPath}`,
      });
    } else {
      breadcrumbs.push({
        label: config.label,
        // No href for the last item (current page)
        href: isLast ? undefined : `${baseUrl}${currentPath}`,
      });

      // Update config for next level of nesting
      if (config.children) {
        currentConfig = config.children;
      }
    }
  }

  return breadcrumbs;
}
