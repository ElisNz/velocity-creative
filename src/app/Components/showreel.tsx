import { Suspense } from "react";
import Image from "next/image";

export default function Showreel() {
  return (
    <Suspense fallback={<div className="absolute size-full -z-50 bg-black" />}>
      <div className="absolute size-full -z-50">
        {/* <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src="/SHOWREEL_SKISS 04_3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <Image
          src="/Screenshot (92).png"
          alt="Showreel Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </Suspense>
  );
};
