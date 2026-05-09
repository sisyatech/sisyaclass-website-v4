import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
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
    domains: [
      "api.microlink.io",
    ],
  },
  async redirects() {
    return [
      {
        source: '/10xboostercourse',
        destination: '/3dayslp',
        statusCode: 302,
      },
      {
        source: '/vadic-maths',
        destination: '/vedic-maths',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:type(syllabus|pyq|sample-paper|course-detail|revision-notes)/:slug',
        destination: '/web-pages/:type/:slug',
      },
      {
        source: '/10xboostercourse/payment/success.php',
        destination: '/10xboostercourse/payment/success',
      },
      {
        source: '/10xboostercourse/payment/failed.php',
        destination: '/10xboostercourse/payment/failed',
      },
      {
        source: '/jee_foundation/payment/success.php',
        destination: '/jee_foundation/payment/success',
      },
      {
        source: '/jee_foundation/payment/failed.php',
        destination: '/jee_foundation/payment/failed',
      },
      {
        source: '/vedic-maths/payment/success.php',
        destination: '/vedic-maths/payment/success',
      },
      {
        source: '/vedic-maths/payment/failed.php',
        destination: '/vedic-maths/payment/failed',
      },
      {
        source: '/jee_foundation_masterclass/payment/success.php',
        destination: '/jee_foundation_masterclass/payment/success',
      },
      {
        source: '/jee_foundation_masterclass/payment/failed.php',
        destination: '/jee_foundation_masterclass/payment/failed',
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
        source: '/ltc/payment/success.php',
        destination: '/ltc/payment/success',
      },
      {
        source: '/ltc/payment/failed.php',
        destination: '/ltc/payment/failed',
      },
      {
        source: '/ltc/success.php',
        destination: '/ltc/payment/success',
      },
      {
        source: '/mathltc/payment/success.php',
        destination: '/mathltc/payment/success',
      },
      {
        source: '/mathltc/payment/failed.php',
        destination: '/mathltc/payment/failed',
      },
      {
        source: '/mathltc/success.php',
        destination: '/mathltc/payment/success',
      },
      {
        source: '/askme/payment/success.php',
        destination: '/askme/payment/success',
      },
      {
        source: '/askme/payment/failed.php',
        destination: '/askme/payment/failed',
      },
      {
        source: '/askme/success.php',
        destination: '/askme/payment/success',
      },
      {
        source: '/6-18monthslp/payment/success.php',
        destination: '/6-18monthslp/payment/success',
      },
      {
        source: '/6-18monthslp/payment/failed.php',
        destination: '/6-18monthslp/payment/failed',
      },
      {
        source: '/6-18monthslp/success.php',
        destination: '/6-18monthslp/payment/success',
      },
      {
        source: '/pyq/payment/success.php',
        destination: '/pyq/payment/success',
      },
      {
        source: '/pyq/payment/failed.php',
        destination: '/pyq/payment/failed',
      },
      {
        source: '/pyq/success.php',
        destination: '/pyq/payment/success',
      },
      {
        source: '/pyq/failed.php',
        destination: '/pyq/payment/failed',
      },
      {
        source: '/3worksheet/payment/failed.php',
        destination: '/3worksheet/payment/failed',
      },
      {
        source: '/3worksheet/payment/success.php',
        destination: '/3worksheet/payment/success',
      },
      {
        source: '/doubt-solving/payment/success.php',
        destination: '/doubt-solving/payment/success',
      },
      {
        source: '/doubt-solving/payment/failed.php',
        destination: '/doubt-solving/payment/failed',
      },
      {
        source: '/doubt-solving/success.php',
        destination: '/doubt-solving/payment/success',
      },
      {
        source: '/mathlp/payment/success.php',
        destination: '/mathlp/payment/success',
      },
      {
        source: '/mathlp/payment/failed.php',
        destination: '/mathlp/payment/failed',
      },
      {
        source: '/mathlp/success.php',
        destination: '/mathlp/payment/success',
      },
      {
        source: '/mathlp2/payment/success.php',
        destination: '/mathlp2/payment/success',
      },
      {
        source: '/mathlp2/payment/failed.php',
        destination: '/mathlp2/payment/failed',
      },
      {
        source: '/mathlp2/success.php',
        destination: '/mathlp2/payment/success',
      },
      {
        source: '/ltc2/payment/success.php',
        destination: '/ltc2/payment/success',
      },
      {
        source: '/ltc2/payment/failed.php',
        destination: '/ltc2/payment/failed',
      },
      {
        source: '/ltc2/success.php',
        destination: '/ltc2/payment/success',
      },
      {
        source: '/summercamp/payment/success.php',
        destination: '/summercamp/payment/success',
      },
      {
        source: '/summercamp/payment/failed.php',
        destination: '/summercamp/payment/failed',
      },
      {
        source: '/summercamp/success.php',
        destination: '/summercamp/payment/success',
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
