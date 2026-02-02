import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '6620',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '45.145.229.20',
        port: '6124',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://45.145.229.20:6124/graphql',
      },
      {
        source: '/wp-content/:path*',
        destination: 'http://45.145.229.20:6124/wp-content/:path*',
      },
    ];
  },
};

export default nextConfig;
