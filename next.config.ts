import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 🔴 REQUIRED for GitHub Pages

  images: {
    unoptimized: true, // 🔴 REQUIRED (no server on GitHub Pages)

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],

    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
