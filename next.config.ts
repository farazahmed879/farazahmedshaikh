import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // mongoose must stay a server-side external package
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
