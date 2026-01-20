'use client';

import { Card, Badge, CollapsibleCodeBlock } from '@sage/ui';

export function InstallationTab() {
    return (
        <div className="space-y-12">
            <div className="border-b border-[var(--color-border)] pb-6">
                <h1 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Installation
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">
                    Add the MCP server to your project and configure your AI assistant
                </p>
            </div>

            <section>
                <Card className="p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                        1. Install the Package
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                        Add the MCP server to your project as a dev dependency:
                    </p>
                    <CollapsibleCodeBlock
                        id="mcp-install"
                        code={`pnpm add -D @sage/mcp
# or
npm install --save-dev @sage/mcp
# or
yarn add -D @sage/mcp`}
                        defaultCollapsed={false}
                        showCopy={true}
                    />
                </Card>

                <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                    2. Configure Your Client
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Claude Desktop */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <h3 className="font-semibold text-[var(--color-text-primary)]">Claude Desktop</h3>
                            <Badge variant="default">Recommended</Badge>
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
      "args": ["@sage/mcp"]
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
      "args": ["@sage/mcp"]
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
      "args": ["@sage/mcp"]
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
        </div>
    );
}
