import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
  },
  experimental: {
    // Enable View Transitions API for smoother page transitions
    viewTransition: true,
  },
};

export default nextConfig;
