import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile coinley-pay for Next.js compatibility
  transpilePackages: ['coinley-pay'],

  // Empty turbopack config to enable Turbopack
  turbopack: {},
};

export default nextConfig;
