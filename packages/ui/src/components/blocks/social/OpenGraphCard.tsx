import React from 'react';
import { cn } from '../../../lib/utils';

export interface GradientConfig {
    type: 'linear' | 'radial';
    angle?: number;  // For linear gradients (default: 135deg)
    position?: string;  // For radial gradients (default: 'circle at 50% 50%')
    colors: string[];  // Array of hex colors (2-5 colors recommended)
    stops?: number[];  // Optional color stop positions in % (0-100)
}

export interface OpenGraphCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'sage' | 'gradient';
    icon?: React.ReactNode | null;  // Custom logo, icon, or image element (pass null to hide)
    gradient?: GradientConfig;  // Custom gradient configuration
    primaryColor?: string;  // Override primary color (hex)
    secondaryColor?: string;  // Override secondary color (hex)
    accentColor?: string;  // Override accent color (hex)
    titleFontSize?: number;  // Title font size in px (default: 96)
    descriptionFontSize?: number;  // Description font size in px (default: 42)
}

/**
 * Helper: Build CSS gradient string from GradientConfig
 */
function buildGradientCSS(config: GradientConfig): string {
    const { type, angle = 135, position = 'circle at 50% 50%', colors, stops } = config;

    // Build color stops string
    const colorStops = colors.map((color, index) => {
        if (stops && stops[index] !== undefined) {
            return `${color} ${stops[index]}%`;
        }
        // Auto-distribute stops evenly if not specified
        const autoStop = (index / (colors.length - 1)) * 100;
        return `${color} ${autoStop}%`;
    }).join(', ');

    if (type === 'radial') {
        return `radial-gradient(${position}, ${colorStops})`;
    }
    return `linear-gradient(${angle}deg, ${colorStops})`;
}

/**
 * Helper: Determine if background is light (for text color)
 */
function isLightColor(hex: string): boolean {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    return luma > 186;
}

/**
 * OpenGraphCard
 *
 * A specialized component designed for generating Open Graph images (1200x630px).
 * Supports custom icons, gradients, and theme color overrides.
 *
 * NOTE: This component uses inline styles to ensure compatibility with Next.js Open Graph generation (Satori).
 * CSS variables cannot be used in OG images - all colors must be explicit hex values.
 */
export function OpenGraphCard({
    title = 'Sage UI',
    description = "The Solopreneur's Development Stack",
    variant = 'sage',
    icon,
    gradient,
    primaryColor,
    secondaryColor,
    accentColor,
    titleFontSize = 96,
    descriptionFontSize = 42,
    className,
    ...props
}: OpenGraphCardProps) {
    // Map variants to background styles
    // If color overrides are provided, use them; otherwise use defaults
    const backgroundStyles: Record<string, { background: string; accentColor: string; textColor?: string }> = {
        primary: {
            background: primaryColor
                ? `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`
                : 'linear-gradient(135deg, #0a0a0a 0%, #171717 100%)',
            accentColor: accentColor || '#ffffff'
        },
        sage: {
            background: primaryColor && secondaryColor
                ? `radial-gradient(circle at 50% 0%, ${primaryColor} 0%, ${secondaryColor} 80%)`
                : 'radial-gradient(circle at 50% 0%, #171717 0%, #0a0a0a 80%)',
            accentColor: accentColor || '#ffffff'
        },
        secondary: {
            background: secondaryColor
                ? `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor}dd 100%)`
                : 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
            accentColor: primaryColor || '#0a0a0a',
            textColor: primaryColor || '#0a0a0a'
        },
        accent: {
            background: accentColor
                ? `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`
                : 'linear-gradient(135deg, #0070f3 0%, #0066cc 100%)',
            accentColor: '#ffffff'
        },
        emerald: {
            background: 'radial-gradient(circle at 50% 100%, #022c22 20%, #0f172a 100%)',
            accentColor: '#10b981'
        },
        gradient: {
            background: gradient
                ? buildGradientCSS(gradient)
                : props.style?.background?.toString() || 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            accentColor: accentColor || '#ffffff'
        }
    };

    const activeStyle = backgroundStyles[variant] || backgroundStyles.sage;

    // Determine if background is light for text color
    const firstColor = gradient?.colors[0] || primaryColor || '#0a0a0a';
    const isLight = variant === 'secondary' || isLightColor(firstColor);

    return (
        <div
            className={cn(className)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '1200px',
                height: '630px',
                background: activeStyle.background,
                padding: '80px',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'sans-serif',
                color: activeStyle.textColor || 'white',
                ...props.style,
            }}
            {...props}
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
                        background: `radial-gradient(circle at 50% 50%, ${activeStyle.accentColor} 0%, transparent 60%)`,
                        opacity: 0.15,
                        transform: 'scale(1.5)',
                        pointerEvents: 'none',
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
                {icon !== null && (
                    icon !== undefined ? (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '16px',
                            }}
                        >
                            {icon}
                        </div>
                    ) : (
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
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: isLight ? 'white' : activeStyle.accentColor }} />
                        </div>
                    )
                )}

                <h1
                    style={{
                        fontSize: `${titleFontSize}px`,
                        fontWeight: 900,
                        margin: 0,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.1,
                        textShadow: isLight ? 'none' : '0 4px 30px rgba(0,0,0,0.3)',
                    }}
                >
                    {title}
                </h1>

                {description && (
                    <p
                        style={{
                            fontSize: `${descriptionFontSize}px`,
                            fontWeight: 500,
                            opacity: 0.9,
                            margin: 0,
                            letterSpacing: '-0.01em',
                            lineHeight: 1.4,
                            maxWidth: '900px',
                        }}
                    >
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
