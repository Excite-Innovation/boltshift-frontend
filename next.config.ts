import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "ak1.ostkcdn.com",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
