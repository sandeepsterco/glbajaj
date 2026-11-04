import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["isomorphic-dompurify", "jsdom"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
    unoptimized: true,  
    // domains is deprecated, remotePatterns above covers it
  },

  async headers() { 
    return [
      {
        source: "/(.*)",
        headers: [
          // X-Frame-Options removed — frame-ancestors in CSP handles this now
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },

  async rewrites() {
    return {
      // beforeFiles so /sitemap.xml is not swallowed by [parentSlug]
      beforeFiles: [
        {
          source: "/sitemap.xml",
          destination: "/sitemap-proxy",
        },
      ],
      afterFiles: [
        {
          source: "/api/:path*",
          destination: "https://project-demo.in/gl-bajaj/api/:path*",
        },
      ],
    };
  },
};

export default nextConfig;