/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.printify.com', 'images.printify.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.printify.com',
        pathname: '/**',
      },
    ],
  },
  // Enable SWC minification for faster builds
  swcMinify: true,
  // Optimize for Vercel deployment
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig

