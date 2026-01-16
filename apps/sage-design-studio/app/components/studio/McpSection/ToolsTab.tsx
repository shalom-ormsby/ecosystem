'use client';

import { Card } from '@sds/ui';
import { CheckCircle, Search, Package, Terminal } from 'lucide-react';

export function ToolsTab() {
    return (
        <div className="space-y-12">
            <div className="border-b border-[var(--color-border)] pb-6">
                <h1 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Available Tools
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">
                    The following tools are exposed to AI assistants by the MCP server
                </p>
            </div>

            <div className="space-y-4">
                {/* list_components */}
                <Card className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-green-500/10">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-mono text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                                list_components
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                                List all available components, optionally filtered by category (actions, forms, navigation, overlays, feedback, data-display, layout).
                            </p>
                            <div className="bg-[var(--color-surface)] p-3 rounded-lg">
                                <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">Example prompts:</p>
                                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                                    <li>• "Show me all SDS components"</li>
                                    <li>• "List all form components"</li>
                                    <li>• "What overlay components are available?"</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* search_components */}
                <Card className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-mono text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                                search_components
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                                Search for components by keywords, descriptions, or use cases. Returns matching components with relevance.
                            </p>
                            <div className="bg-[var(--color-surface)] p-3 rounded-lg">
                                <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">Example prompts:</p>
                                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                                    <li>• "Find components for date selection"</li>
                                    <li>• "Search for dropdown components"</li>
                                    <li>• "Show me components for displaying user profiles"</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* get_component */}
                <Card className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-mono text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                                get_component
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                                Get detailed information about a specific component including description, props, use cases, dependencies, and documentation links.
                            </p>
                            <div className="bg-[var(--color-surface)] p-3 rounded-lg">
                                <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">Example prompts:</p>
                                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                                    <li>• "Tell me about the Button component"</li>
                                    <li>• "What props does the DataTable have?"</li>
                                    <li>• "Show me details for the date-picker"</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* install_component */}
                <Card className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-orange-500/10">
                            <Terminal className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-mono text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                                install_component
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                                Get installation instructions including package install commands, peer dependencies, import statements, and usage examples.
                            </p>
                            <div className="bg-[var(--color-surface)] p-3 rounded-lg">
                                <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">Example prompts:</p>
                                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                                    <li>• "Install the Dialog component"</li>
                                    <li>• "How do I add the DataTable to my project?"</li>
                                    <li>• "Show me how to install the Combobox"</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
