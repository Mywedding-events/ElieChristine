import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Omit search so content-version query strings are allowed for uploads.
    localPatterns: [{ pathname: "/uploads/**" }],
  },
};

export default nextConfig;
