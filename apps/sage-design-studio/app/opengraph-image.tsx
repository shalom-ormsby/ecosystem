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
    fontFamily?: string;
}

// Supported fonts with their Google Fonts URLs (Regular 400 weight)
const FONT_URLS: Record<string, string> = {
    'Space Grotesk': 'https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff',
    'Inter': 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff',
    'Lora': 'https://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkq0.woff2',
    'Roboto': 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu72xKOzY.woff',
    'Outfit': 'https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4W61O4a0Ew.woff',
    'Manrope': 'https://fonts.gstatic.com/s/manrope/v14/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59FO_F87jxeN7B.woff2',
    'Instrument Sans': 'https://fonts.gstatic.com/s/instrumentsans/v1/pximypc9vsFDm051Uf6KVwgkfoSbK_-6GUo1nvtOb_mi.woff2',
    'Fira Code': 'https://fonts.gstatic.com/s/firacode/v21/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sFVc.woff2',
    'JetBrains Mono': 'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOVkWM.woff',
    'Playfair Display': 'https://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff',
    'Source Sans Pro': 'https://fonts.gstatic.com/s/sourcesanspro/v22/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2',
    'Open Sans': 'https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVI.woff2',
    'Quicksand': 'https://fonts.gstatic.com/s/quicksand/v30/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58a-wg.woff2',
    'Cormorant Garamond': 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQWJ5heb_w.woff2',
    'Raleway': 'https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrEVIT9d0c8.woff2',
};

/**
 * Load font data from Google Fonts
 */
async function loadFont(fontFamily: string): Promise<ArrayBuffer | null> {
    const url = FONT_URLS[fontFamily];
    if (!url) {
        console.warn(`[OG Image] Font "${fontFamily}" not found in FONT_URLS, using fallback`);
        return null;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`[OG Image] Failed to fetch font "${fontFamily}":`, response.statusText);
            return null;
        }
        return await response.arrayBuffer();
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

    // IMPORTANT: Satori doesn't support CSS gradients
    // Use solid background color (first color from gradient config)
    const backgroundColor = config.gradient.colors[0] || '#a855f7';

    // Determine text color based on background luminosity
    const isLight = isLightColor(backgroundColor);
    const textColor = isLight ? '#0a0a0a' : '#ffffff';

    // Build fonts array (Satori requires this format)
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
        backgroundColor,
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
                        backgroundColor,
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
