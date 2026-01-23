import { ImageResponse } from 'next/og';
import { createClient } from '@vercel/edge-config';

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
 * 4. The design will automatically load from Edge Config
 */

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

/**
 * Build CSS gradient string from gradient config
 */
function buildGradientCSS(gradient: OGCardConfig['gradient']): string {
    const { type, angle = 135, position = 'circle at 50% 50%', colors } = gradient;

    // Build color stops string
    const colorStops = colors.map((color, index) => {
        const autoStop = (index / (colors.length - 1)) * 100;
        return `${color} ${autoStop}%`;
    }).join(', ');

    if (type === 'radial') {
        return `radial-gradient(${position}, ${colorStops})`;
    }
    return `linear-gradient(${angle}deg, ${colorStops})`;
}

/**
 * Determine if a hex color is light (for text color contrast)
 */
function isLightColor(hex: string): boolean {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    return luma > 186;
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
    }

    // Build gradient background
    const background = buildGradientCSS(config.gradient);
    const accentColor = '#ffffff';

    // Determine if background is light
    const firstColor = config.gradient.colors[0] || '#0a0a0a';
    const isLight = isLightColor(firstColor);
    const textColor = isLight ? '#0a0a0a' : 'white';

    // Determine if we should show the icon
    const showIcon = config.showIcon !== false;

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1200px',
                    height: '630px',
                    background,
                    padding: '80px',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'sans-serif',
                    color: textColor,
                }}
            >
                {/* Ambient Lighting Mesh (optional, only for dark themes) */}
                {!isLight && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 60%)`,
                            opacity: 0.15,
                            transform: 'scale(1.5)',
                        }}
                    />
                )}

                {/* Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '24px',
                        zIndex: 10,
                        maxWidth: '1000px',
                        textAlign: 'center',
                    }}
                >
                    {/* Brand Logo/Icon */}
                    {showIcon && (
                        <div
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '20px',
                                background: isLight ? '#0a0a0a' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                marginBottom: '16px',
                            }}
                        >
                            <div
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: isLight ? 'white' : accentColor,
                                }}
                            />
                        </div>
                    )}

                    {/* Title */}
                    <h1
                        style={{
                            fontSize: `${config.titleFontSize}px`,
                            fontWeight: 900,
                            margin: 0,
                            letterSpacing: '-0.04em',
                            lineHeight: 1.1,
                            textShadow: isLight ? 'none' : '0 4px 30px rgba(0,0,0,0.3)',
                        }}
                    >
                        {config.title}
                    </h1>

                    {/* Description */}
                    {config.description && (
                        <p
                            style={{
                                fontSize: `${config.descriptionFontSize}px`,
                                fontWeight: 500,
                                opacity: 0.9,
                                margin: 0,
                                letterSpacing: '-0.01em',
                                lineHeight: 1.4,
                                maxWidth: '900px',
                            }}
                        >
                            {config.description}
                        </p>
                    )}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
