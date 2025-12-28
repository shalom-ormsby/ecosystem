import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['@ecosystem/design-system'],
    async redirects() {
        // Redirect /studio to Sage Design Studio
        // In development, use localhost; in production, use deployed URL
        const studioUrl = process.env.STUDIO_URL || 'http://localhost:3001';

        return [
            {
                source: '/studio',
                destination: studioUrl,
                permanent: false,
            },
            {
                source: '/studio/:path*',
                destination: `${studioUrl}/:path*`,
                permanent: false,
            },
        ];
    },
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
