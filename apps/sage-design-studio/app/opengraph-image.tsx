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

export default async function Image() {
    // CUSTOMIZE YOUR OG IMAGE HERE
    // Replace these values with your saved design configuration
    const config = {
        title: 'Sage UI',
        description: "The Solopreneur's Development Stack",
        variant: 'gradient' as const,
        gradient: {
            type: 'linear' as const,
            angle: 135,
            colors: ['#171717', '#0a0a0a'],
        },
        titleFontSize: 96,
        descriptionFontSize: 42,
    };

    return new ImageResponse(
        (
            <OpenGraphCard
                title={config.title}
                description={config.description}
                variant={config.variant}
                gradient={config.gradient}
                titleFontSize={config.titleFontSize}
                descriptionFontSize={config.descriptionFontSize}
            />
        ),
        {
            ...size,
        }
    );
}
