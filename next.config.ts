import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Phone screenshots are shipped as WebP already; keep the optimizer on WebP.
    formats: ["image/webp"],
  },
};

export default nextConfig;
