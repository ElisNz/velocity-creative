import { Suspense } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { list } from '@vercel/blob';


export default async function Showreel() {
  const videoURL = await list({token: process.env.BLOB_STORAGE_READ_TOKEN || '', prefix: 'SHOWREEL'});
  const { downloadUrl } = videoURL.blobs[0];

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
      {downloadUrl &&
        <div className="absolute size-full -z-50">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source src={downloadUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      }
    </Suspense>
  );
};

/* export const getStaticProps: GetStaticProps = async () => {
  const { blobs } = await list({token: process.env.BLOB_STORAGE_READ_TOKEN || '', prefix: 'SHOWREEL'});

  return {
    props: {
      blobs,
    },
  };
}; */
