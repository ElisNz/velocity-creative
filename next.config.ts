// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheMaxMemorySize: 128 * 1024 * 1024, // 128 MB
  images: {
    remotePatterns: [
      new URL(process.env.BLOB_STORAGE_URL || "https://w5nf8fhejxyus9xc.public.blob.vercel-storage.com/SHOWREEL_SKISS%2004_3.mp4"),
      {
        protocol: 'https',
        hostname: 'w5nf8fhejxyus9xc.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
