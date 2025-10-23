/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.pexels.com', 'res.cloudinary.com'],
  },
  // Enable standalone output for Docker deployments
  output: 'standalone',
  // Optimize production builds
  swcMinify: true,
  // Compress responses
  compress: true,
  // Strict mode for better error catching
  reactStrictMode: true,
};

module.exports = nextConfig;
