# @sage/mcp

**Model Context Protocol server for Sage UI**

Enable AI assistants like Claude Desktop, Cursor, and VS Code to browse, search, and install Sage UI components directly through natural language.

## Features

- 🔍 **Browse all 48 components** across 7 functional categories
- 🔎 **Semantic search** by keywords, use cases, or functionality
- 📖 **Detailed component info** including props, dependencies, and examples
- 📦 **Installation instructions** with all required dependencies
- 🤖 **AI-native** - Built specifically for LLM interaction

## Installation

### Quick Start

```bash
pnpm add -D @sage/mcp
# or
npm install --save-dev @sage/mcp
# or
yarn add -D @sage/mcp
```

### MCP Client Configuration

#### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "sds": {
      "command": "npx",
      "args": ["@sage/mcp"]
    }
  }
}
```

Restart Claude Desktop to activate.

#### Cursor

Add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "sds": {
      "command": "npx",
      "args": ["@sage/mcp"]
    }
  }
}
```

#### VS Code

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "sds": {
      "command": "npx",
      "args": ["@sage/mcp"]
    }
  }
}
```

## Available Tools

The MCP server provides four tools for AI interaction:

### 1. `list_components`

List all available components, optionally filtered by category.

**Parameters:**
- `category` (optional): Filter by `actions`, `forms`, `navigation`, `overlays`, `feedback`, `data-display`, or `layout`

**Example AI prompts:**
- "Show me all Sage UI components"
- "List all form components"
- "What overlay components are available?"

### 2. `search_components`

Search for components by keywords, descriptions, or use cases.

**Parameters:**
- `query` (required): Search term

**Example AI prompts:**
- "Find components for date selection"
- "Search for dropdown components"
- "Show me components for displaying user profiles"

### 3. `get_component`

Get detailed information about a specific component.

**Parameters:**
- `name` (required): Component name (case-insensitive, accepts PascalCase or kebab-case)

**Example AI prompts:**
- "Tell me about the Button component"
- "What props does the DataTable have?"
- "Show me details for the date-picker"

### 4. `install_component`

Get installation instructions for a component.

**Parameters:**
- `name` (required): Component name to install

**Example AI prompts:**
- "Install the Dialog component"
- "How do I add the DataTable to my project?"
- "Show me how to install the ComboBox"

## Component Categories

The Sage UI organizes components functionally (not atomically):

- **Actions** (3) - Interactive elements that trigger behaviors
- **Forms** (11) - Input controls for data collection
- **Navigation** (6) - Moving through content and hierarchy
- **Overlays** (9) - Contextual content above the main UI
- **Feedback** (5) - System state communication
- **Data Display** (6) - Presenting information visually
- **Layout** (8) - Spatial organization

## Usage Examples

Once configured, you can interact with the server through your AI assistant:

### Browse Components

> "Show me all components in the Sage UI"

The AI will use `list_components` to display all 48 components organized by category.

### Search for Specific Functionality

> "I need a component for selecting dates"

The AI will use `search_components` with query "date" and find:
- Calendar
- DatePicker

### Get Component Details

> "Tell me about the Button component"

The AI will use `get_component` to show:
- Description
- Use cases
- Dependencies
- Import statements
- Documentation link

### Install a Component

> "Add the Dialog component to my project"

The AI will use `install_component` to provide:
- Package installation commands
- Peer dependency requirements
- Import examples
- Usage code

## Architecture

The MCP server consists of:

1. **Component Registry** (`src/registry.ts`) - Metadata for all 48 @sage/ui components
2. **MCP Server** (`src/index.ts`) - Model Context Protocol implementation
3. **Tool Handlers** - Four tools for listing, searching, viewing, and installing

All data is statically defined - no network requests or external dependencies required.

## Development

### Build

```bash
pnpm build
```

### Test Locally

```bash
pnpm start
```

The server runs in stdio mode, communicating via stdin/stdout per the MCP specification.

## Documentation

- **Full Documentation**: https://studio.shalomormsby.com/
- **GitHub**: https://github.com/shalom-ormsby/ecosystem
- **MCP Specification**: https://modelcontextprotocol.io/

## Support

For issues or questions:
- GitHub Issues: https://github.com/shalom-ormsby/ecosystem/issues
- Documentation: https://studio.shalomormsby.com/#mcp-server

## License

MIT © Shalom Ormsby

---

**Part of the [Sage UI](https://studio.shalomormsby.com/) - Build lovable products at AI speed.**
