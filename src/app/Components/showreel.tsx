import { Suspense } from "react";
import Image from "next/image";
import { list } from '@vercel/blob';

import { StatusCodes } from "../types";
import ShowreelVideo from "./showreel-video";

const MOBILE_BREAKPOINT = 1024;

export default async function Showreel() {
  const videoList = await list({ token: process.env.BLOB_STORAGE_READ_TOKEN || '', prefix: 'SHOWREEL' });

  const blobs = videoList.blobs;
  const mobileBlob = blobs.find(b => b.pathname.toLowerCase().includes('mobile'));
  const desktopBlob = blobs.find(b => b.pathname.toLowerCase().includes('desktop')) ?? blobs[0];

  const mobileUrl = mobileBlob?.url ?? desktopBlob?.url ?? '';
  const desktopUrl = desktopBlob?.url ?? '';

  const probeUrl = desktopUrl || mobileUrl;
  const isStatusOk = probeUrl
    ? (await fetch(probeUrl, { method: 'HEAD' })).status === StatusCodes.Success
    : false;

  const fallback = (
    <div className="absolute size-full -z-50">
      <Image
        src="/Screenshot (92).png"
        alt="Showreel Background"
        fill
        className="object-cover"
        priority
      />
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      {isStatusOk ? (
        <ShowreelVideo
          mobileUrl={mobileUrl}
          desktopUrl={desktopUrl}
          breakpoint={MOBILE_BREAKPOINT}
        />
      ) : fallback}
    </Suspense>
  );
};
