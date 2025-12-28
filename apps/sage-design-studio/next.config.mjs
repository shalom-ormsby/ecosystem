/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ecosystem/design-system'],
  experimental: {
    optimizePackageImports: ['@ecosystem/design-system'],
  },
}

export default nextConfig
