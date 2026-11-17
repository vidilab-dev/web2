import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Admin-uploaded photos live in Supabase Storage; allow only that host
    // (public objects) so next/image can optimise them.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tawaripdiyxrnzztqqjf.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Some local networks resolve public hostnames to private IPv6 (fd00::),
    // which trips Next's SSRF guard during `next dev`. Off in production.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    formats: ["image/avif", "image/webp"],
    qualities: [60, 72, 75, 78, 82, 90],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
