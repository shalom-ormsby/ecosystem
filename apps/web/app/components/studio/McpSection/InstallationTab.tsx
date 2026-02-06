'use client';

import { Card, Badge, CollapsibleCodeBlock } from '@thesage/ui';

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
                        title="Install Command"
                        language="bash"
                        code={`pnpm add -D @thesage/mcp
# or
npm install --save-dev @thesage/mcp
# or
yarn add -D @thesage/mcp`}
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
                            <Badge variant="default" size="md" className="" dot={false}>Recommended</Badge>
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
                                title="Claude Config"
                                language="json"
                                code={`{
  "mcpServers": {
    "sds": {
      "command": "npx",
      "args": ["@thesage/mcp"]
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
                                title="Cursor Config"
                                language="json"
                                code={`{
  "mcpServers": {
    "sds": {
      "command": "npx",
      "args": ["@thesage/mcp"]
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
                                title="VS Code Config"
                                language="json"
                                code={`{
  "servers": {
    "sds": {
      "command": "npx",
      "args": ["@thesage/mcp"]
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

            {/* LOCAL DEVELOPMENT SETUP */}
            <section className="border-t border-[var(--color-border)] pt-12">
                <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Local Development Setup
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                    If you're contributing to the Sage Design Engine or want to use the latest unreleased MCP server, follow these steps:
                </p>

                {/* Step 1: Clone */}
                <Card className="p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                        1. Clone the Repository
                    </h3>
                    <CollapsibleCodeBlock
                        id="local-clone"
                        title="Clone Repository"
                        language="bash"
                        code={`git clone https://github.com/shalomormsby/ecosystem.git
cd ecosystem`}
                        defaultCollapsed={false}
                        showCopy={true}
                    />
                </Card>

                {/* Step 2: Install */}
                <Card className="p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                        2. Install Dependencies
                    </h3>
                    <CollapsibleCodeBlock
                        id="local-install"
                        title="Install Dependencies"
                        language="bash"
                        code={`pnpm install`}
                        defaultCollapsed={false}
                        showCopy={true}
                    />
                </Card>

                {/* Step 3: Build */}
                <Card className="p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                        3. Build the MCP Server
                    </h3>
                    <CollapsibleCodeBlock
                        id="local-build"
                        title="Build Server"
                        language="bash"
                        code={`pnpm build --filter @thesage/mcp`}
                        defaultCollapsed={false}
                        showCopy={true}
                    />
                </Card>

                {/* Step 4: Configure */}
                <Card className="p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                        4. Configure Your Client
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                        Update your config to point to the local build:
                    </p>

                    <div className="space-y-6">
                        {/* Claude Desktop Local */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-[var(--color-text-primary)]">Claude Desktop</h4>
                            </div>
                            <p className="text-xs text-[var(--color-text-muted)] mb-2 font-mono">
                                ~/Library/Application Support/Claude/claude_desktop_config.json
                            </p>
                            <CollapsibleCodeBlock
                                id="claude-local-config"
                                title="Claude Local Config"
                                language="json"
                                code={`{
  "mcpServers": {
    "sds-local": {
      "command": "node",
      "args": ["/absolute/path/to/ecosystem/packages/mcp/dist/index.js"]
    }
  }
}`}
                                defaultCollapsed={false}
                                showCopy={true}
                            />
                            <p className="text-xs text-[var(--color-text-muted)] mt-2">
                                ⚠️ Replace <code className="text-[var(--color-text-primary)]">/absolute/path/to/</code> with your actual clone location.
                            </p>
                        </div>

                        {/* Cursor Local */}
                        <div>
                            <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Cursor</h4>
                            <p className="text-xs text-[var(--color-text-muted)] mb-2 font-mono">
                                .cursor/mcp.json (in your project root)
                            </p>
                            <CollapsibleCodeBlock
                                id="cursor-local-config"
                                title="Cursor Local Config"
                                language="json"
                                code={`{
  "mcpServers": {
    "sds-local": {
      "command": "node",
      "args": ["/absolute/path/to/ecosystem/packages/mcp/dist/index.js"]
    }
  }
}`}
                                defaultCollapsed={false}
                                showCopy={true}
                            />
                        </div>
                    </div>
                </Card>

                {/* Step 5: Restart */}
                <Card className="p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                        5. Restart Your Client
                    </h3>
                    <ul className="text-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
                        <li><strong className="text-[var(--color-text-primary)]">Claude Desktop:</strong> Fully quit and restart the application</li>
                        <li><strong className="text-[var(--color-text-primary)]">Cursor:</strong> Reload window (Cmd/Ctrl + Shift + P → "Reload Window")</li>
                    </ul>
                </Card>

                {/* Step 6: Verify */}
                <Card className="p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                        6. Verify Connection
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                        Try asking your AI assistant:
                    </p>
                    <div className="p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)] text-sm">
                        <code className="text-[var(--color-text-primary)]">"Show me all Sage Design Engine components"</code>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-2">
                        If it lists components, you're connected!
                    </p>
                </Card>

                {/* Making Changes */}
                <Card className="p-6 bg-[var(--color-surface)]">
                    <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                        Making Changes
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                        When you modify the MCP server source:
                    </p>
                    <CollapsibleCodeBlock
                        id="local-rebuild"
                        title="Rebuild Command"
                        language="bash"
                        code={`# Rebuild
pnpm build --filter @thesage/mcp

# Then restart your MCP client to pick up changes`}
                        defaultCollapsed={false}
                        showCopy={true}
                    />
                    <p className="text-sm text-[var(--color-text-secondary)] mt-4">
                        For faster iteration, use watch mode:
                    </p>
                    <CollapsibleCodeBlock
                        id="local-watch"
                        title="Watch Command"
                        language="bash"
                        code={`pnpm dev --filter @thesage/mcp  # Rebuilds on file changes`}
                        defaultCollapsed={true}
                        showCopy={true}
                    />
                </Card>
            </section>
        </div>
    );
}
