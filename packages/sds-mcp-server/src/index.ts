#!/usr/bin/env node

/**
 * Sage UI MCP Server
 *
 * Model Context Protocol server that enables AI assistants to:
 * - Browse and search Sage UI components
 * - Get detailed component information
 * - Install components into projects
 *
 * Usage:
 *   sds-mcp
 *
 * Configuration in .mcp.json or similar:
 * {
 *   "mcpServers": {
 *     "sds": {
 *       "command": "npx",
 *       "args": ["@sage/mcp"]
 *     }
 *   }
 * }
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

import {
  COMPONENT_CATEGORIES,
  COMPONENT_REGISTRY,
  getComponentsByCategory,
  searchComponents,
  getComponent,
  getAllComponentNames,
  getComponentCount,
  type ComponentMetadata,
} from './registry.js';

// Server instance
const server = new Server(
  {
    name: 'sds-mcp-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ============================================================================
// TOOL DEFINITIONS
// ============================================================================

const TOOLS: Tool[] = [
  {
    name: 'list_components',
    description:
      'List all available Sage UI components. Optionally filter by category (actions, forms, navigation, overlays, feedback, data-display, layout).',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description:
            'Filter by category: actions, forms, navigation, overlays, feedback, data-display, or layout',
          enum: [
            'actions',
            'forms',
            'navigation',
            'overlays',
            'feedback',
            'data-display',
            'layout',
          ],
        },
      },
    },
  },
  {
    name: 'search_components',
    description:
      'Search for components by keyword, description, or use case. Returns matching components with relevance.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query (keywords, use cases, or component names)',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_component',
    description:
      'Get detailed information about a specific component including description, props, use cases, and dependencies.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Component name (e.g., "button", "Button", "data-table", "DataTable")',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'install_component',
    description:
      'Get installation instructions for a component including import statements and dependencies.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Component name to install',
        },
      },
      required: ['name'],
    },
  },
];

// ============================================================================
// TOOL HANDLERS
// ============================================================================

/**
 * Format component list for display
 */
function formatComponentList(components: ComponentMetadata[]): string {
  if (components.length === 0) {
    return 'No components found.';
  }

  const groupedByCategory: Record<string, ComponentMetadata[]> = {};

  components.forEach((comp) => {
    if (!groupedByCategory[comp.category]) {
      groupedByCategory[comp.category] = [];
    }
    groupedByCategory[comp.category].push(comp);
  });

  let output = `## Sage UI Components\n\n`;
  output += `Total: ${components.length} components\n\n`;

  Object.entries(groupedByCategory).forEach(([category, comps]) => {
    const categoryInfo = COMPONENT_CATEGORIES[category as keyof typeof COMPONENT_CATEGORIES];
    output += `### ${categoryInfo.label} (${comps.length})\n`;
    output += `${categoryInfo.description}\n\n`;

    comps.forEach((comp) => {
      output += `**${comp.name}** - ${comp.description}\n`;
    });
    output += '\n';
  });

  return output;
}

/**
 * Format component details for display
 */
function formatComponentDetails(component: ComponentMetadata): string {
  let output = `# ${component.name}\n\n`;
  output += `**Category:** ${component.category}\n\n`;
  output += `## Description\n${component.description}\n\n`;

  output += `## Use Cases\n`;
  component.useCases.forEach((useCase) => {
    output += `- ${useCase}\n`;
  });
  output += '\n';

  output += `## Keywords\n`;
  output += component.keywords.join(', ') + '\n\n';

  if (component.dependencies.length > 0) {
    output += `## Dependencies\n`;
    component.dependencies.forEach((dep) => {
      output += `- ${dep}\n`;
    });
    output += '\n';
  }

  if (component.radixPrimitive) {
    output += `## Radix Primitive\n`;
    output += `Built on: ${component.radixPrimitive}\n\n`;
  }

  output += `## Import\n`;
  output += `\`\`\`typescript\nimport { ${component.name} } from '@sage/ui';\n\`\`\`\n\n`;

  output += `## Documentation\n`;
  output += `View full documentation at: https://ui.shalomormsby.com/#${component.category}/${component.name.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}\n`;

  return output;
}

/**
 * Generate installation instructions
 */
function formatInstallationInstructions(component: ComponentMetadata): string {
  let output = `# Install ${component.name}\n\n`;

  output += `## 1. Install @sage/ui package\n\n`;
  output += `\`\`\`bash\n`;
  output += `pnpm add @sage/ui\n`;
  output += `# or\n`;
  output += `npm install @sage/ui\n`;
  output += `# or\n`;
  output += `yarn add @sage/ui\n`;
  output += `\`\`\`\n\n`;

  if (component.dependencies.length > 0) {
    output += `## 2. Install peer dependencies\n\n`;
    output += `The following peer dependencies are required:\n\n`;
    output += `\`\`\`bash\n`;
    output += `pnpm add ${component.dependencies.join(' ')}\n`;
    output += `\`\`\`\n\n`;
  }

  output += `## ${component.dependencies.length > 0 ? '3' : '2'}. Import and use\n\n`;
  output += `\`\`\`typescript\n`;
  output += `import { ${component.name} } from '@sage/ui';\n\n`;
  output += `export function MyComponent() {\n`;
  output += `  return (\n`;
  output += `    <${component.name}>\n`;
  output += `      {/* Your content */}\n`;
  output += `    </${component.name}>\n`;
  output += `  );\n`;
  output += `}\n`;
  output += `\`\`\`\n\n`;

  output += `## Additional Resources\n\n`;
  output += `- **Documentation:** https://ui.shalomormsby.com/#${component.category}/${component.name.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}\n`;
  output += `- **GitHub:** https://github.com/shalomormsby/ecosystem/tree/main/packages/ui/src/components/${component.category}\n`;

  return output;
}

// ============================================================================
// SERVER SETUP
// ============================================================================

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_components': {
        const category = args?.category as string | undefined;

        if (category) {
          const components = getComponentsByCategory(category);

          return {
            content: [
              {
                type: 'text',
                text: formatComponentList(components),
              },
            ],
          };
        } else {
          const allComponents = Object.values(COMPONENT_REGISTRY);
          return {
            content: [
              {
                type: 'text',
                text: formatComponentList(allComponents),
              },
            ],
          };
        }
      }

      case 'search_components': {
        const query = args?.query as string;

        if (!query) {
          return {
            content: [
              {
                type: 'text',
                text: 'Error: query parameter is required',
              },
            ],
            isError: true,
          };
        }

        const results = searchComponents(query);

        if (results.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: `No components found matching "${query}".\n\nTry searching for:\n- Component names (e.g., "button", "dialog")\n- Use cases (e.g., "form", "navigation")\n- Keywords (e.g., "overlay", "input")`,
              },
            ],
          };
        }

        let output = `# Search Results for "${query}"\n\n`;
        output += `Found ${results.length} component${results.length === 1 ? '' : 's'}:\n\n`;

        results.forEach((comp) => {
          output += `## ${comp.name}\n`;
          output += `**Category:** ${comp.category}\n\n`;
          output += `${comp.description}\n\n`;
          output += `**Use cases:** ${comp.useCases.join(', ')}\n\n`;
          output += `---\n\n`;
        });

        return {
          content: [
            {
              type: 'text',
              text: output,
            },
          ],
        };
      }

      case 'get_component': {
        const name = args?.name as string;

        if (!name) {
          return {
            content: [
              {
                type: 'text',
                text: 'Error: name parameter is required',
              },
            ],
            isError: true,
          };
        }

        const component = getComponent(name);

        if (!component) {
          const allNames = getAllComponentNames();
          return {
            content: [
              {
                type: 'text',
                text: `Component "${name}" not found.\n\nAvailable components:\n${allNames.join(', ')}`,
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: formatComponentDetails(component),
            },
          ],
        };
      }

      case 'install_component': {
        const name = args?.name as string;

        if (!name) {
          return {
            content: [
              {
                type: 'text',
                text: 'Error: name parameter is required',
              },
            ],
            isError: true,
          };
        }

        const component = getComponent(name);

        if (!component) {
          return {
            content: [
              {
                type: 'text',
                text: `Component "${name}" not found. Use search_components to find available components.`,
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: formatInstallationInstructions(component),
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: 'text',
              text: `Unknown tool: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// ============================================================================
// START SERVER
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Log to stderr (stdout is used for MCP protocol)
  console.error('Sage UI MCP Server running');
  console.error(`Components available: ${getComponentCount()}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
