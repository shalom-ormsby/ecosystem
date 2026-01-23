
import { NextResponse } from 'next/server';
import { createClient } from '@vercel/edge-config';

const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID;
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const EDGE_CONFIG = process.env.EDGE_CONFIG;

// GET endpoint to debug current Edge Config values
export async function GET() {
    try {
        if (!EDGE_CONFIG) {
            return NextResponse.json(
                { error: 'EDGE_CONFIG environment variable not set' },
                { status: 500 }
            );
        }

        const edgeConfig = createClient(EDGE_CONFIG);
        const currentConfig = await edgeConfig.get('og_card_config');

        return NextResponse.json({
            success: true,
            currentConfig,
            environmentCheck: {
                hasEdgeConfig: !!EDGE_CONFIG,
                hasEdgeConfigId: !!EDGE_CONFIG_ID,
                hasApiToken: !!VERCEL_API_TOKEN,
                hasTeamId: !!VERCEL_TEAM_ID,
            }
        });
    } catch (error) {
        console.error('[Edge Config API] Error reading Edge Config:', error);
        return NextResponse.json(
            { error: 'Failed to read Edge Config', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    // Validate environment variables
    if (!EDGE_CONFIG_ID || !VERCEL_API_TOKEN) {
        console.error('[Edge Config API] Missing environment variables:', {
            hasEdgeConfigId: !!EDGE_CONFIG_ID,
            hasApiToken: !!VERCEL_API_TOKEN,
            hasTeamId: !!VERCEL_TEAM_ID,
        });
        return NextResponse.json(
            { error: 'Missing Vercel credentials (EDGE_CONFIG_ID or VERCEL_API_TOKEN)' },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const { key, value } = body;

        if (!key || !value) {
            return NextResponse.json(
                { error: 'Missing key or value' },
                { status: 400 }
            );
        }

        console.log(`[Edge Config API] Updating key "${key}" with value:`, JSON.stringify(value, null, 2));

        // Use Vercel API to update Edge Config Item
        // Docs: https://vercel.com/docs/rest-api/endpoints#update-an-edge-config-item
        const updateUrl = `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items${VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ''}`;

        console.log(`[Edge Config API] Sending PATCH to: ${updateUrl}`);

        const response = await fetch(updateUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: [
                    {
                        operation: 'upsert',
                        key: key,
                        value: value,
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('[Edge Config API] Vercel API error:', errorData);
            return NextResponse.json(
                { error: 'Failed to update Edge Config', details: errorData },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('[Edge Config API] Successfully updated Edge Config:', data);
        return NextResponse.json({
            success: true,
            data,
            message: 'Edge Config updated successfully. Changes may take up to 5 seconds to propagate.'
        });

    } catch (error) {
        console.error('[Edge Config API] Error updating Edge Config:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
