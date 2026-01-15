'use client';

import { Card, Badge, CollapsibleCodeBlock, Breadcrumbs, type BreadcrumbItem } from '@ecosystem/design-system';
import { Bot, Search, Package, Terminal, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface McpSectionProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function McpSection({ breadcrumbs }: McpSectionProps) {
  return (
    <div className="space-y-12 w-full min-w-0">
      {/* Title */}
      <div className="border-b border-[var(--color-border)] pb-6">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">
            MCP Server
          </h1>
          <Badge variant="default">AI-Native</Badge>
        </div>

        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Enable AI assistants to browse, search, and install Sage Design System components through natural language
        </p>

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mt-6">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* What is MCP */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          What is the MCP Server?
        </h2>
        <Card className="p-6">
          <p className="text-[var(--color-text-secondary)] mb-4">
            The Model Context Protocol (MCP) Server connects AI assistants like Claude Desktop, Cursor, and VS Code to the Sage Design System.
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
                  All 48 components across 7 categories instantly accessible to your AI coding assistant
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

      {/* Installation */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Installation
        </h2>

        <Card className="p-6 mb-4">
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            1. Install the Package
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Add the MCP server to your project as a dev dependency:
          </p>
          <CollapsibleCodeBlock
            id="mcp-install"
            code={`pnpm add -D @sds/mcp-server
# or
npm install --save-dev @sds/mcp-server
# or
yarn add -D @sds/mcp-server`}
            defaultCollapsed={false}
            showCopy={true}
          />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Claude Desktop */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-[var(--color-text-primary)]">Claude Desktop</h3>
              <Badge variant="primary">Recommended</Badge>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Add to your Claude Desktop config file:
            </p>
            <div className="mb-4">
              <p className="text-xs text-[var(--color-text-muted)] mb-2 font-mono">
                ~/Library/Application Support/Claude/claude_desktop_config.json
              </p>
              <CollapsibleCodeBlock
                id="claude-config"
                code={`{
  "mcpServers": {
    "sds": {
      "command": "npx",
      "args": ["@sds/mcp-server"]
    }
  }
}`}
                defaultCollapsed={false}
                showCopy={true}
              />
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">⚠️ Important:</strong> Restart Claude Desktop after adding this configuration.
            </div>
          </Card>

          {/* Cursor */}
          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">Cursor</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Create or update in your project root:
            </p>
            <div className="mb-4">
              <p className="text-xs text-[var(--color-text-muted)] mb-2 font-mono">
                .cursor/mcp.json
              </p>
              <CollapsibleCodeBlock
                id="cursor-config"
                code={`{
  "mcpServers": {
    "sds": {
      "command": "npx",
      "args": ["@sds/mcp-server"]
    }
  }
}`}
                defaultCollapsed={false}
                showCopy={true}
              />
            </div>
          </Card>

          {/* VS Code */}
          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-[var(--color-text-primary)]">VS Code</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Create or update in your project root:
            </p>
            <div className="mb-4">
              <p className="text-xs text-[var(--color-text-muted)] mb-2 font-mono">
                .vscode/mcp.json
              </p>
              <CollapsibleCodeBlock
                id="vscode-config"
                code={`{
  "servers": {
    "sds": {
      "command": "npx",
      "args": ["@sds/mcp-server"]
    }
  }
}`}
                defaultCollapsed={false}
                showCopy={true}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Available Tools */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Available Tools
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          The MCP server provides four tools that AI assistants can use:
        </p>

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
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Usage Examples
        </h2>
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
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Troubleshooting
        </h2>
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  Server Not Responding
                </h3>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Verify configuration file syntax is correct</li>
                  <li>• Restart your MCP client (Claude Desktop, Cursor, VS Code)</li>
                  <li>• Check that <code className="text-xs px-1 py-0.5 bg-[var(--color-surface)] rounded">@sds/mcp-server</code> is installed</li>
                  <li>• Try running <code className="text-xs px-1 py-0.5 bg-[var(--color-surface)] rounded">npx @sds/mcp-server</code> directly to test</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  Components Not Found
                </h3>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Component names are case-insensitive (use "button" or "Button")</li>
                  <li>• Use kebab-case or PascalCase ("date-picker" or "DatePicker")</li>
                  <li>• Try using <code className="text-xs px-1 py-0.5 bg-[var(--color-surface)] rounded">search_components</code> instead of exact names</li>
                </ul>
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
              href="https://github.com/shalom-ormsby/ecosystem/tree/main/packages/sds-mcp-server"
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
              href="https://github.com/shalom-ormsby/ecosystem/issues"
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
