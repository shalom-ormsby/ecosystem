'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, Badge } from '@ecosystem/design-system';
import type { Node, Cluster } from '@/lib/content/types';

/**
 * Navigation Fallback (Graph-Off Mode)
 *
 * Semantic HTML navigation that works without the Cosmograph.
 * Essential for accessibility, mobile, and users who prefer traditional navigation.
 *
 * Features:
 * - Organized by clusters
 * - Search functionality
 * - Keyboard navigable
 * - Works without JavaScript
 * - Mobile-first design
 */

interface NavigationFallbackProps {
  nodes: Node[];
  className?: string;
}

const CLUSTER_CONFIG: Record<
  Cluster,
  { title: string; description: string; icon: string }
> = {
  work: {
    title: 'Work',
    description: 'Professional case studies and projects',
    icon: '💼',
  },
  play: {
    title: 'Play',
    description: 'Creative experiments, videos, and personal reflections',
    icon: '🎨',
  },
  philosophy: {
    title: 'Philosophy',
    description: 'Design thinking, principles, and approaches',
    icon: '💭',
  },
  meta: {
    title: 'Meta',
    description: 'About this site and Shalom',
    icon: '🌐',
  },
  connections: {
    title: 'Connections',
    description: 'Links to Creative Powerup and other communities',
    icon: '🔗',
  },
};

export function NavigationFallback({
  nodes,
  className = '',
}: NavigationFallbackProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCluster, setActiveCluster] = useState<Cluster | 'all'>('all');

  // Group nodes by cluster
  const nodesByCluster = useMemo(() => {
    const grouped: Record<Cluster, Node[]> = {
      work: [],
      play: [],
      philosophy: [],
      meta: [],
      connections: [],
    };

    nodes.forEach((node) => {
      if (grouped[node.cluster]) {
        grouped[node.cluster].push(node);
      }
    });

    // Sort nodes within each cluster by date (newest first)
    Object.keys(grouped).forEach((cluster) => {
      grouped[cluster as Cluster].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });

    return grouped;
  }, [nodes]);

  // Filter nodes by search query
  const filteredNodes = useMemo(() => {
    if (!searchQuery) return nodesByCluster;

    const query = searchQuery.toLowerCase();
    const filtered: Record<Cluster, Node[]> = {
      work: [],
      play: [],
      philosophy: [],
      meta: [],
      connections: [],
    };

    Object.entries(nodesByCluster).forEach(([cluster, clusterNodes]) => {
      filtered[cluster as Cluster] = clusterNodes.filter(
        (node) =>
          node.title.toLowerCase().includes(query) ||
          node.summary?.toLowerCase().includes(query) ||
          node.themes.some((theme) => theme.toLowerCase().includes(query))
      );
    });

    return filtered;
  }, [nodesByCluster, searchQuery]);

  // Get clusters to display
  const clustersToShow =
    activeCluster === 'all'
      ? (['work', 'play', 'philosophy', 'meta', 'connections'] as Cluster[])
      : [activeCluster];

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Explore Shalom's Digital World
        </h1>
        <p className="text-lg text-foreground opacity-70">
          Navigate through work, creative experiments, philosophy, and more.
        </p>
      </header>

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="sr-only">
          Search content
        </label>
        <input
          type="search"
          id="search"
          placeholder="Search by title, theme, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Cluster Filters */}
      <nav
        className="flex flex-wrap gap-2 mb-8"
        aria-label="Filter by category"
      >
        <button
          onClick={() => setActiveCluster('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCluster === 'all'
              ? 'bg-primary text-white'
              : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
          }`}
        >
          All
        </button>
        {(Object.keys(CLUSTER_CONFIG) as Cluster[]).map((cluster) => (
          <button
            key={cluster}
            onClick={() => setActiveCluster(cluster)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCluster === cluster
                ? 'bg-primary text-white'
                : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
            }`}
          >
            {CLUSTER_CONFIG[cluster].icon} {CLUSTER_CONFIG[cluster].title}
          </button>
        ))}
      </nav>

      {/* Content Clusters */}
      <div className="space-y-8">
        {clustersToShow.map((cluster) => {
          const clusterNodes = filteredNodes[cluster];
          if (clusterNodes.length === 0) return null;

          const config = CLUSTER_CONFIG[cluster];

          return (
            <section key={cluster} id={cluster}>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {config.icon} {config.title}
              </h2>
              <p className="text-foreground opacity-60 mb-4">
                {config.description}
              </p>

              <div className="space-y-3">
                {clusterNodes.map((node) => (
                  <Card
                    key={node.id}
                    hoverEffect={true}
                    className="p-4 transition-all hover:shadow-lg"
                  >
                    <article>
                      <Link
                        href={`/node/${node.slug}`}
                        className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                              {node.title}
                            </h3>
                            {node.summary && (
                              <p className="text-foreground opacity-70 text-sm mb-2">
                                {node.summary}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-2 items-center">
                              <time
                                dateTime={node.date}
                                className="text-xs text-foreground opacity-50"
                              >
                                {new Date(node.date).toLocaleDateString(
                                  'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  }
                                )}
                              </time>
                              {node.themes.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {node.themes.slice(0, 3).map((theme) => (
                                    <Badge key={theme} variant="default" size="sm">
                                      {theme}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-primary opacity-50 group-hover:opacity-100 transition-opacity">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.5 15L12.5 10L7.5 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* No Results */}
      {searchQuery &&
        Object.values(filteredNodes).every((nodes) => nodes.length === 0) && (
          <div className="text-center py-12">
            <p className="text-foreground opacity-60 text-lg">
              No content found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
    </div>
  );
}
