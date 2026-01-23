import { ImageResponse } from 'next/og';
import { OpenGraphCard } from '@sage/ui';

export const runtime = 'edge';

export const alt = 'Sage UI - The Solopreneur\'s Development Stack';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

/**
 * Open Graph Image Generator
 *
 * To use a custom design from the playground:
 * 1. Go to /docs#blocks/open-graph-card
 * 2. Customize your design
 * 3. Click "Set Active" on your saved design
 * 4. Copy the config values below and update this file
 *
 * Alternatively, copy the generated code from the "Code" tab and paste it here.
 */

import { createClient } from '@vercel/edge-config';

export default async function Image() {
    let config = {
        title: 'Sage UI',
        description: 'Lovable by Design',
        variant: 'gradient' as const,
        gradient: {
            type: 'radial' as const,
            position: 'circle at 50% 0%',
            colors: ['#a855f7', '#3b0764'], // Purple gradient
        },
        titleFontSize: 96,
        descriptionFontSize: 42,
    };

    try {
        const edgeConfig = createClient(process.env.EDGE_CONFIG);
        const dynamicConfig = await edgeConfig.get('og_card_config');

        if (dynamicConfig) {
            config = { ...config, ...(dynamicConfig as any) };
        }
    } catch (e) {
        console.error('Failed to load Edge Config:', e);
        // Fallback to default/hardcoded config
    }

    return new ImageResponse(
        (
            <OpenGraphCard
                title={config.title}
                description={config.description}
                variant={config.variant}
                gradient={config.gradient}
                titleFontSize={config.titleFontSize}
                descriptionFontSize={config.descriptionFontSize}
                icon={null} // Keep icon null for now or make it dynamic if we store icon preferences
            />
        ),
        {
            ...size,
        }
    );
}
