import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Sage UI - The Solopreneur\'s Development Stack';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    // Primary: Emerald 500 (#10b981), Secondary: Teal 500 (#14b8a6)
    // We use darker shades for the background to ensure contrast with white text.
    // Primary Dark: #064e3b (Emerald 900), Secondary Dark: #0f172a (Slate 900)

    const title = 'Sage UI';
    const description = "The Solopreneur's Development Stack";

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center', // Centered for impact
                    width: '1200px',
                    height: '630px',
                    // Linear gradient from Top-Left (Primary branding) to Bottom-Right (Darkness/Depth)
                    background: 'linear-gradient(135deg, #059669 0%, #0f172a 100%)', // Emerald 600 -> Slate 900
                    padding: '80px',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Subtle Gradient Overlay for depth */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)', // Teal accent
                        pointerEvents: 'none',
                    }}
                />

                {/* Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        zIndex: 10,
                        maxWidth: '900px',
                    }}
                >
                    {/* Brand Label */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '16px',
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            {/* Simple geometric logo representation */}
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#059669' }} />
                        </div>
                        <span
                            style={{
                                fontSize: '24px',
                                fontWeight: 600,
                                color: 'rgba(255,255,255,0.9)',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                            }}
                        >
                            Sage UI
                        </span>
                    </div>

                    <h1
                        style={{
                            fontSize: '84px',
                            fontWeight: 800,
                            color: 'white',
                            margin: 0,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
                        }}
                    >
                        {title}
                    </h1>
                    <p
                        style={{
                            fontSize: '42px',
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.9)',
                            margin: 0,
                            letterSpacing: '-0.01em',
                            lineHeight: 1.4,
                            maxWidth: '1000px',
                        }}
                    >
                        {description}
                    </p>
                </div>

                {/* Decorative bottom bar */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '12px',
                        background: 'linear-gradient(90deg, #34d399 0%, #2dd4bf 50%, #38bdf8 100%)', // Emerald 400 -> Teal 400 -> Sky 400
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
