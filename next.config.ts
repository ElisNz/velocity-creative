require('dotenv').config();
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(process.env.BLOB_STORAGE_URL || "https://w5nf8fhejxyus9xc.public.blob.vercel-storage.com/SHOWREEL_SKISS%2004_3.mp4"),
    ],
  },
};

export default nextConfig;
