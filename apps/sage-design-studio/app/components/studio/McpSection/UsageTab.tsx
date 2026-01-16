'use client';

import { Card } from '@sds/ui';

export function UsageTab() {
    return (
        <div className="space-y-12">
            <div className="border-b border-[var(--color-border)] pb-6">
                <h1 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Usage Guide
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">
                    Examples of natural language interactions with the MCP server
                </p>
            </div>

            <Card className="p-6">
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                    Once configured, interact with the MCP server through natural conversation with your AI assistant:
                </p>

                <div className="space-y-6">
                    <div className="border-l-4 border-[var(--color-primary)] pl-4">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                            You: "Show me all components in the Sage Design System"
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                            The AI uses <code className="text-xs px-1 py-0.5 bg-[var(--color-surface)] rounded">list_components</code> to display all 48 components organized by category
                        </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                            You: "I need a component for selecting dates"
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)] mb-2">
                            The AI uses <code className="text-xs px-1 py-0.5 bg-[var(--color-surface)] rounded">search_components</code> to find Calendar and DatePicker
                        </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                            You: "Tell me about the Button component"
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                            The AI uses <code className="text-xs px-1 py-0.5 bg-[var(--color-surface)] rounded">get_component</code> to show description, use cases, dependencies, and import statements
                        </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                            You: "Add the Dialog component to my project"
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                            The AI uses <code className="text-xs px-1 py-0.5 bg-[var(--color-surface)] rounded">install_component</code> to provide package installation, peer dependencies, and usage code
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
