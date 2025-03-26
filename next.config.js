/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Ignore ESLint errors during build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'authjs.dev',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google profile pictures
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs', 'child_process', etc. modules on the client
      config.resolve.fallback = {
        fs: false,
        child_process: false,
        'fs/promises': false,
        async_hooks: false,
        net: false,
        tls: false,
        dns: false,
        path: false,
        os: false,
        crypto: false,
      };
      
      // For client-side, replace Prisma with empty modules
      config.resolve.alias = {
        ...config.resolve.alias,
        '@prisma/client$': path.resolve(__dirname, './src/lib/prisma-browser.ts'),
        '@prisma/client/runtime/library': path.resolve(__dirname, './src/lib/prisma-browser.ts'),
        '.prisma/client$': path.resolve(__dirname, './src/lib/prisma-browser.ts'),
        '@auth/prisma-adapter$': path.resolve(__dirname, './src/lib/empty-module.ts'),
      };
    }
    return config;
  },
};

module.exports = nextConfig;
