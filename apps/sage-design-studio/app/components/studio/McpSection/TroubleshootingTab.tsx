'use client';

import { Card } from '@sage/ui';
import { AlertCircle } from 'lucide-react';

export function TroubleshootingTab() {
    return (
        <div className="space-y-12">
            <div className="border-b border-[var(--color-border)] pb-6">
                <h1 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Troubleshooting
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">
                    Common issues and how to resolve them
                </p>
            </div>

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
                                <li>• Check that <code className="text-xs px-1 py-0.5 bg-[var(--color-surface)] rounded">@sage/mcp</code> is installed</li>
                                <li>• Try running <code className="text-xs px-1 py-0.5 bg-[var(--color-surface)] rounded">npx @sage/mcp</code> directly to test</li>
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
        </div>
    );
}
