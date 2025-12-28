import { NavigationFallback } from '@/components/cosmograph/NavigationFallback';
import { getAllNodes } from '@/lib/content/parser';

/**
 * Cosmograph Page
 *
 * Entry point for exploring Shalom's digital ecosystem.
 * Currently showing navigation fallback (graph-off mode).
 * Will be enhanced with Cosmograph visualization in next phase.
 */

export const metadata = {
  title: "Explore Shalom's Cosmograph",
  description:
    "Navigate through Shalom's interconnected digital ecosystem - work, creative experiments, philosophy, and more.",
};

export default function CosmographPage() {
  // Get all content nodes
  const nodes = getAllNodes();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <NavigationFallback nodes={nodes} />
      </div>
    </main>
  );
}
