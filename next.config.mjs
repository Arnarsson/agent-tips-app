/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  images: {
    unoptimized: true,
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
