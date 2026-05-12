import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.tsx",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ttoyhiyjlocjofpwzkoz.supabase.co" },
    ],
  },
};

export default nextConfig;
