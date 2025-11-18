import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sisya-class-52660.appspot.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sisyaclass.xyz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/10xboostercourse',
        destination: '/3dayslp',
        statusCode: 302,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/10xboostercourse/payment/success.php',
        destination: '/10xboostercourse/payment/success',
      },
      {
        source: '/10xboostercourse/payment/failed.php',
        destination: '/10xboostercourse/payment/failed',
      },
      {
        source: '/3dayslp/payment/success.php',
        destination: '/3dayslp/payment/success',
      },
      {
        source: '/3dayslp/payment/failed.php',
        destination: '/3dayslp/payment/failed',
      },
      {
        source: '/3dayslp/success.php',
        destination: '/3dayslp/payment/success',
      },
      {
        source: '/3worksheet/payment/failed.php',
        destination: '/3worksheet/payment/failed',
      },
      {
        source: '/3worksheet/payment/success.php',
        destination: '/3worksheet/payment/success',
      },
    ];
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
