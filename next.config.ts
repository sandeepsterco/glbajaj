import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "sd7",
        port: "8080",
        pathname: "/jss/assets/img/banners/**",
      },
      {
        protocol: "https",
        hostname: "glbajaj-topaz.vercel.app",
        pathname: "/**",
      },
    ],
    domains: ["sd7", "localhost", "glbajaj-topaz.vercel.app"],
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://project-demo.in/gl-bajaj/api/:path*",
      },
    ];
  },
};

export default nextConfig;
