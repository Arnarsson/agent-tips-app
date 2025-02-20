/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Only keep essential experimental features
    serverActions: {
      allowedOrigins: ['localhost:3000', 'www.stashprompt.com'],
      bodySizeLimit: '2mb'
    },
    // Optimize Turbopack for performance
    turbo: {
      // Enable Turbopack optimizations
      enabled: true,
      // Resolve modules from node_modules
      resolveAlias: {
        // Add common aliases
        '@/*': './*',
      }
    }
  },
  typescript: {
    // Speed up development by checking types on build only
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
    tsconfigPath: './tsconfig.json'
  },
  eslint: {
    // Speed up development by checking lint on build only
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
    dirs: ['app', 'components', 'lib']
  },
  compiler: {
    // Optimize compilation
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ['error', 'warn']
    } : false
  },
  // Optimize image handling
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    domains: ['www.stashprompt.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Cache optimization
  onDemandEntries: {
    // Increase cache duration in development
    maxInactiveAge: 120 * 1000, // 2 minutes
    pagesBufferLength: 5,
  },
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
  },
  webpack: (config) => {
    // SVG Configuration
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  }
};

export default nextConfig;
