/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'www.stashprompt.com'],
      bodySizeLimit: '2mb'
    },
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack']
      },
      rules: {
        // Process CSS with PostCSS
        '*.css': {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['tailwindcss', 'autoprefixer']
            }
          }
        }
      }
    }
  },
  typescript: {
    // Re-enable TypeScript checks
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json'
  },
  eslint: {
    // Re-enable ESLint
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib']
  },
  compiler: {
    // Keep console logs in development
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ['error', 'warn']
    } : false
  },
  images: {
    // Enable image optimization
    unoptimized: false,
    domains: ['www.stashprompt.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
  }
};

export default nextConfig;
