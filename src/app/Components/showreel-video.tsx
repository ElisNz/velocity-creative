'use client';

import { useEffect, useState } from "react";

interface ShowreelVideoProps {
  mobileUrl: string;
  desktopUrl: string;
  breakpoint?: number;
}

function getUrl(mobileUrl: string, desktopUrl: string, breakpoint: number): string {
  return window.innerWidth < breakpoint ? mobileUrl : desktopUrl;
}

export default function ShowreelVideo({ mobileUrl, desktopUrl, breakpoint = 1024 }: ShowreelVideoProps) {
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    const update = () => setSrc(getUrl(mobileUrl, desktopUrl, breakpoint));
    update();

    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [mobileUrl, desktopUrl, breakpoint]);

  if (!src) return null;

  return (
    <div className="absolute size-full -z-50">
      <video key={src} className="w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
