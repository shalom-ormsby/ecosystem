import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['@ecosystem/design-system'],
    async rewrites() {
        // In development, proxy /studio to the Sage Design Studio app running on port 3001
        // In production, this would be configured to proxy to the deployed studio app
        const studioUrl = process.env.STUDIO_URL || 'http://localhost:3001';

        return [
            {
                source: '/studio',
                destination: `${studioUrl}/`,
            },
            {
                source: '/studio/:path*',
                destination: `${studioUrl}/:path*`,
            },
        ];
    },
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
