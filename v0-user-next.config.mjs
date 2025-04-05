/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'v0.blob.com',
      'www.paypalobjects.com',
      'maps.googleapis.com'
    ],
  },
  // No experimental options needed for React 18
}

export default nextConfig

