
import { NextResponse } from 'next/server';

const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID;
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

export async function POST(request: Request) {
    if (!EDGE_CONFIG_ID || !VERCEL_API_TOKEN) {
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

        // Use Vercel API to update Edge Config Item
        // Docs: https://vercel.com/docs/rest-api/endpoints#update-an-edge-config-item
        const updateUrl = `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items${VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ''}`;

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
            return NextResponse.json(
                { error: 'Failed to update Edge Config', details: errorData },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('Error updating Edge Config:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
