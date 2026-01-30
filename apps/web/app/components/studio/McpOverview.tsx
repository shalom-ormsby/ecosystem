'use client';

import { Bot, Zap, Search, Package, Terminal, FileDown, Wrench, Book, AlertCircle } from 'lucide-react';
import { Heading, Text, Card, Badge } from '@thesage/ui';

interface McpOverviewProps {
  onNavigate: (itemId: string) => void;
}

export function McpOverview({ onNavigate }: McpOverviewProps) {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="text-[var(--color-primary)]">
            <Bot className="w-12 h-12" />
          </div>
          <div>
            <Heading level={1} className="mb-2">
              MCP Server
            </Heading>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" size="md" className="" dot={false}>AI-Native</Badge>
              <Badge variant="outline" size="md" className="" dot={false}>89 components</Badge>
            </div>
          </div>
        </div>
        <Text variant="secondary" size="lg" className="max-w-3xl">
          Enable AI assistants to browse, search, and install Sage Design Engine components through natural language
        </Text>
      </div>

      {/* What is MCP */}
      <section>
        <Heading level={2} className="mb-4">
          What is the MCP Server?
        </Heading>
        <Card className="p-6">
          <Text variant="secondary" className="mb-4">
            The Model Context Protocol (MCP) Server connects AI assistants like Claude Desktop, Cursor, and VS Code to the Sage Design Engine.
            It enables LLMs to discover, search, and install components directly through natural conversation.
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Bot className="w-5 h-5 text-[var(--color-primary)] mt-1" />
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">AI-Native Integration</h3>
                <Text variant="secondary" size="sm">
                  Built specifically for LLM interaction with semantic search and natural language queries
                </Text>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[var(--color-primary)] mt-1" />
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Instant Access</h3>
                <Text variant="secondary" size="sm">
                  All 89 components across 7 core categories instantly accessible to your AI coding assistant
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Key Features */}
      <section>
        <Heading level={2} className="mb-4">
          Key Features
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-[var(--color-primary)]/10">
                <Search className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)]">Semantic Search</h3>
                <Text variant="secondary" size="sm" className="mt-1">
                  Search by keywords, use cases, or functionality. Find components that match your intent, not just names.
                </Text>
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
                <Text variant="secondary" size="sm" className="mt-1">
                  Get complete information including props, dependencies, use cases, and code examples for any component.
                </Text>
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
                <Text variant="secondary" size="sm" className="mt-1">
                  Automatic generation of install commands, import statements, and peer dependencies for any component.
                </Text>
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
                <Text variant="secondary" size="sm" className="mt-1">
                  Works with Claude Desktop, Cursor, VS Code, and any MCP-compatible AI coding assistant.
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Documentation Navigation */}
      <section>
        <Heading level={2} className="mb-4">
          Documentation
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('installation')}
            className="text-left group"
          >
            <Card className="p-4 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 p-2 rounded-md group-hover:bg-[var(--color-primary)]/20 transition-colors">
                  <FileDown className="w-6 h-6" />
                </div>
                <Heading level={3} className="text-base group-hover:text-[var(--color-primary)] transition-colors">
                  Installation
                </Heading>
              </div>
              <Text variant="secondary" size="sm">
                Step-by-step guide to installing and configuring the MCP Server for your AI coding assistant.
              </Text>
            </Card>
          </button>

          <button
            onClick={() => onNavigate('tools')}
            className="text-left group"
          >
            <Card className="p-4 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 p-2 rounded-md group-hover:bg-[var(--color-primary)]/20 transition-colors">
                  <Wrench className="w-6 h-6" />
                </div>
                <Heading level={3} className="text-base group-hover:text-[var(--color-primary)] transition-colors">
                  Available Tools
                </Heading>
              </div>
              <Text variant="secondary" size="sm">
                Complete reference of all MCP tools: search, browse, install, and component details.
              </Text>
            </Card>
          </button>

          <button
            onClick={() => onNavigate('usage')}
            className="text-left group"
          >
            <Card className="p-4 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 p-2 rounded-md group-hover:bg-[var(--color-primary)]/20 transition-colors">
                  <Book className="w-6 h-6" />
                </div>
                <Heading level={3} className="text-base group-hover:text-[var(--color-primary)] transition-colors">
                  Usage Guide
                </Heading>
              </div>
              <Text variant="secondary" size="sm">
                Real-world examples and patterns for using the MCP Server with AI assistants.
              </Text>
            </Card>
          </button>

          <button
            onClick={() => onNavigate('troubleshooting')}
            className="text-left group"
          >
            <Card className="p-4 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 p-2 rounded-md group-hover:bg-[var(--color-primary)]/20 transition-colors">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <Heading level={3} className="text-base group-hover:text-[var(--color-primary)] transition-colors">
                  Troubleshooting
                </Heading>
              </div>
              <Text variant="secondary" size="sm">
                Common issues, solutions, and debugging tips for MCP Server setup and usage.
              </Text>
            </Card>
          </button>
        </div>
      </section>

      {/* Additional Resources */}
      <section>
        <Heading level={2} className="mb-4">
          Additional Resources
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Package Documentation</h3>
            <Text variant="secondary" size="sm" className="mb-3">
              View the complete README and API documentation
            </Text>
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
            <Text variant="secondary" size="sm" className="mb-3">
              Learn more about the Model Context Protocol
            </Text>
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
            <Text variant="secondary" size="sm" className="mb-3">
              Browse all components with live examples
            </Text>
            <a
              href="#actions"
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              View Components →
            </a>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Report Issues</h3>
            <Text variant="secondary" size="sm" className="mb-3">
              Found a bug or have a feature request?
            </Text>
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
