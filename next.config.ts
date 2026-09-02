import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
