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

interface OGCardConfig {
    title: string;
    description: string;
    variant: 'gradient';
    gradient: {
        type: 'linear' | 'radial';
        angle?: number;
        position?: string;
        colors: string[];
    };
    titleFontSize: number;
    descriptionFontSize: number;
    showIcon?: boolean;
}

export default async function Image() {
    // Default fallback config
    const defaultConfig: OGCardConfig = {
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
        showIcon: false,
    };

    let config = defaultConfig;

    // Attempt to load dynamic config from Edge Config
    try {
        if (process.env.EDGE_CONFIG) {
            const edgeConfig = createClient(process.env.EDGE_CONFIG);
            const dynamicConfig = await edgeConfig.get<OGCardConfig>('og_card_config');

            if (dynamicConfig) {
                console.log('[OG Image] Loaded config from Edge Config:', JSON.stringify(dynamicConfig));
                config = { ...defaultConfig, ...dynamicConfig };
            } else {
                console.log('[OG Image] No custom config found in Edge Config, using default');
            }
        } else {
            console.warn('[OG Image] EDGE_CONFIG environment variable not set, using default config');
        }
    } catch (e) {
        console.error('[OG Image] Failed to load Edge Config:', e);
        console.log('[OG Image] Falling back to default config');
        // Fallback to default config
    }

    // Determine icon value: undefined (default icon) or null (no icon)
    const iconValue = config.showIcon === false ? null : undefined;

    return new ImageResponse(
        (
            <OpenGraphCard
                title={config.title}
                description={config.description}
                variant={config.variant}
                gradient={config.gradient}
                titleFontSize={config.titleFontSize}
                descriptionFontSize={config.descriptionFontSize}
                icon={iconValue}
            />
        ),
        {
            ...size,
        }
    );
}
