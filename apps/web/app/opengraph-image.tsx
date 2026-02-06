import { ImageResponse } from 'next/og';
import { createClient } from '@vercel/edge-config';

export const runtime = 'edge';

export const alt = 'Sage Design Engine - The Solopreneur\'s Development Stack';
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
    fontFamily?: string;
}

/**
 * Load font data from Google Fonts
 *
 * IMPORTANT: Satori only supports TTF, OTF, and WOFF (NOT WOFF2).
 * We must use an old browser User-Agent to force Google Fonts to return TTF/OTF.
 *
 * Reference: https://github.com/vercel/satori/blob/main/playground/pages/api/font.ts
 */
async function loadFont(fontFamily: string, weight = 400): Promise<ArrayBuffer | null> {
    try {
        // Normalize font family for Google Fonts API (replace spaces with +)
        const fontParam = fontFamily.replace(/ /g, '+');

        // Fetch CSS from Google Fonts with old browser User-Agent to get TTF/OTF
        const cssUrl = `https://fonts.googleapis.com/css2?family=${fontParam}:wght@${weight}`;
        const cssResponse = await fetch(cssUrl, {
            headers: {
                // Critical: Old browser User-Agent forces Google to return TTF/OTF instead of WOFF2
                'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
            },
        });

        if (!cssResponse.ok) {
            console.error(`[OG Image] Failed to fetch font CSS for "${fontFamily}":`, cssResponse.statusText);
            return null;
        }

        const css = await cssResponse.text();

        // Extract font URL from CSS (matches TTF or OTF format)
        const fontUrlMatch = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

        if (!fontUrlMatch || !fontUrlMatch[1]) {
            console.error(`[OG Image] Could not extract font URL from CSS for "${fontFamily}"`);
            return null;
        }

        const fontUrl = fontUrlMatch[1];

        // Fetch the actual font file
        const fontResponse = await fetch(fontUrl);

        if (!fontResponse.ok) {
            console.error(`[OG Image] Failed to fetch font file for "${fontFamily}":`, fontResponse.statusText);
            return null;
        }

        const fontData = await fontResponse.arrayBuffer();
        console.log(`[OG Image] Successfully loaded font: ${fontFamily} (${(fontData.byteLength / 1024).toFixed(1)}KB)`);

        return fontData;
    } catch (error) {
        console.error(`[OG Image] Error loading font "${fontFamily}":`, error);
        return null;
    }
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
    console.log('[OG Image] Starting image generation...');

    // Default fallback config
    const defaultConfig: OGCardConfig = {
        title: 'Sage Design Engine',
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
        fontFamily: 'Space Grotesk',
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

    // Load font (with error handling to prevent crashes)
    const fontFamily = config.fontFamily || 'Space Grotesk';
    let fontData: ArrayBuffer | null = null;
    try {
        fontData = await loadFont(fontFamily);
        if (fontData) {
            console.log(`[OG Image] Successfully loaded font: ${fontFamily}`);
        }
    } catch (error) {
        console.error(`[OG Image] Font loading failed for ${fontFamily}, using fallback:`, error);
    }

    // Build gradient using buildGradientCSS (Satori supports gradients via backgroundImage)
    const backgroundImage = buildGradientCSS(config.gradient);

    // Determine text color based on first gradient color luminosity
    const firstColor = config.gradient.colors[0] || '#a855f7';
    const isLight = isLightColor(firstColor);
    const textColor = isLight ? '#0a0a0a' : '#ffffff';

    // Build fonts array (Satori requires this format)
    // CRITICAL: If no font is loaded, Satori will crash
    const fonts = fontData
        ? [
              {
                  name: fontFamily,
                  data: fontData,
                  style: 'normal' as const,
                  weight: 400 as const,
              },
          ]
        : [];

    console.log('[OG Image] Rendering with config:', {
        title: config.title,
        description: config.description,
        backgroundImage,
        textColor,
        fontFamily,
        hasFont: !!fontData,
    });

    try {
        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        backgroundImage, // Satori supports gradients via backgroundImage property
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '80px',
                        fontFamily: fontData ? fontFamily : 'sans-serif',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            maxWidth: '1000px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: config.titleFontSize,
                                fontWeight: 900,
                                color: textColor,
                                marginBottom: 24,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.1,
                            }}
                        >
                            {config.title}
                        </div>
                        <div
                            style={{
                                fontSize: config.descriptionFontSize,
                                fontWeight: 500,
                                color: textColor,
                                opacity: 0.9,
                                letterSpacing: '-0.01em',
                                lineHeight: 1.4,
                            }}
                        >
                            {config.description}
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts,
            }
        );
    } catch (error) {
        console.error('[OG Image] ERROR generating image:', error);
        throw error;
    }
}
