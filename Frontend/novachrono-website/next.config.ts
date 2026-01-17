import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
