import { Suspense } from "react";
import Image from "next/image";
import { list } from '@vercel/blob';

import { StatusCodes } from "../types";


export default async function Showreel() {
  const videoURL = await list({token: process.env.BLOB_STORAGE_READ_TOKEN || '', prefix: 'SHOWREEL'});

  // * use downloadUrl to force download. Currently displaying inline *
  const { url } = videoURL.blobs[0];
  const isStatusOk = (await fetch(url)).status === StatusCodes.Success;

  return (
    <Suspense fallback={
      <div className="absolute size-full -z-50">
        <Image
          src="/Screenshot (92).png"
          alt="Showreel Background loader"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>}
    >
      {isStatusOk ?
        <div className="absolute size-full -z-50">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> 
        :
        <div className="absolute size-full -z-50">
          <Image
            src="/Screenshot (92).png"
            alt="Showreel Background fallback"
            fill
            className="object-cover"
            priority
          />
        </div>
      }
    </Suspense>
  );
};
