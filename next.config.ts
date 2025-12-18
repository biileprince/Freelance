import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  // Add Referrer-Policy header for FedCM support in development
  // This fixes the "ERR_FAILED" error with Google One Tap
  async headers() {
    return process.env.NODE_ENV !== "production"
      ? [
          {
            source: "/:path*",
            headers: [
              {
                key: "Referrer-Policy",
                value: "no-referrer-when-downgrade",
              },
            ],
          },
        ]
      : [];
  },
};

export default nextConfig;
