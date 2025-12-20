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
    ],
  },
};

export default nextConfig;
