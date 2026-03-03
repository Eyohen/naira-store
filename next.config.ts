import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile coinley packages for Next.js compatibility
  transpilePackages: ['coinley-pay', 'coinley-test'],

  // Empty turbopack config to enable Turbopack
  turbopack: {},
};

export default nextConfig;
