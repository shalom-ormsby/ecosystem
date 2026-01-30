'use client';

import { Card, Badge } from '@thesage/ui';
import { Bot, Zap, Search, Package, Terminal } from 'lucide-react';

export function OverviewTab() {
    return (
        <div className="space-y-12">
            {/* Title */}
            <div className="border-b border-[var(--color-border)] pb-6">
                <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">
                        MCP Server
                    </h1>
                    <Badge variant="default" size="md" className="" dot={false}>AI-Native</Badge>
                </div>

                <p className="text-sm text-[var(--color-text-muted)]">
                    Enable AI assistants to browse, search, and install Sage Design Engine components through natural language
                </p>
            </div>

            {/* What is MCP */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
                    What is the MCP Server?
                </h2>
                <Card className="p-6">
                    <p className="text-[var(--color-text-secondary)] mb-4">
                        The Model Context Protocol (MCP) Server connects AI assistants like Claude Desktop, Cursor, and VS Code to the Sage Design Engine.
                        It enables LLMs to discover, search, and install components directly through natural conversation.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <Bot className="w-5 h-5 text-[var(--color-primary)] mt-1" />
                            <div>
                                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">AI-Native Integration</h3>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    Built specifically for LLM interaction with semantic search and natural language queries
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Zap className="w-5 h-5 text-[var(--color-primary)] mt-1" />
                            <div>
                                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Instant Access</h3>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    All 89 components across 7 core categories instantly accessible to your AI coding assistant
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Key Features */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10">
                                <Search className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-text-primary)]">Semantic Search</h3>
                                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                                    Search by keywords, use cases, or functionality. Find components that match your intent, not just names.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10">
                                <Package className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-text-primary)]">Component Details</h3>
                                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                                    Get complete information including props, dependencies, use cases, and code examples for any component.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10">
                                <Terminal className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-text-primary)]">Installation Instructions</h3>
                                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                                    Automatic generation of install commands, import statements, and peer dependencies for any component.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10">
                                <Bot className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-text-primary)]">Multi-Client Support</h3>
                                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                                    Works with Claude Desktop, Cursor, VS Code, and any MCP-compatible AI coding assistant.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Resources */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Additional Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-5">
                        <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Package Documentation</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            View the complete README and API documentation
                        </p>
                        <a
                            href="https://github.com/shalomormsby/ecosystem/tree/main/packages/mcp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[var(--color-primary)] hover:underline"
                        >
                            View on GitHub →
                        </a>
                    </Card>

                    <Card className="p-5">
                        <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">MCP Specification</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Learn more about the Model Context Protocol
                        </p>
                        <a
                            href="https://modelcontextprotocol.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[var(--color-primary)] hover:underline"
                        >
                            Visit MCP Docs →
                        </a>
                    </Card>

                    <Card className="p-5">
                        <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Component Browser</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Browse all components with live examples
                        </p>
                        <a
                            href="#actions"
                            className="text-sm text-[var(--color-primary)] hover:underline"
                        >
                            View Components →
                        </a>
                    </Card>

                    <Card className="p-5">
                        <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Report Issues</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Found a bug or have a feature request?
                        </p>
                        <a
                            href="https://github.com/shalomormsby/ecosystem/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[var(--color-primary)] hover:underline"
                        >
                            Open an Issue →
                        </a>
                    </Card>
                </div>
            </section>
        </div>
    );
}
