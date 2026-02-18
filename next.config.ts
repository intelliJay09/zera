import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Remove X-Powered-By: Next.js header
  poweredByHeader: false,

  // Standalone output for VPS deployment
  output: 'standalone',

  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },

  // Security headers - Enterprise-grade protection
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://assets.calendly.com",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
      "font-src 'self' data:",
      "img-src 'self' data: blob: https://cdn.sanity.io https://www.google-analytics.com https://www.googletagmanager.com",
      "connect-src 'self' https://api.paystack.co https://api.frankfurter.dev https://www.googleapis.com https://oauth2.googleapis.com https://www.google.com https://calendly.com https://assets.calendly.com https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
      "frame-src 'self' https://calendly.com https://checkout.paystack.com https://www.google.com",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  // Redirects for removed WaaS pages (SEO preservation)
  async redirects() {
    return [
      {
        source: '/waas-plans',
        destination: '/solutions',
        permanent: true, // 301 redirect
      },
      {
        source: '/checkout',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/checkout/verify',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/checkout/success',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/discovery-form',
        destination: '/contact',
        permanent: true,
      },
    ];
  },

  // Experimental features (optional - enable as needed)
  experimental: {
    // Enable if using Server Actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
