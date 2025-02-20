/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
      bodySizeLimit: '2mb'
    }
  },
  serverExternalPackages: ['@prisma/client', '@ai-sdk/openai'],
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  distDir: '.next',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  }
};

export default nextConfig;
