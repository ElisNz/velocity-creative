'use client';

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { workItem } from "../types";

type ImageOrientation = 'landscape' | 'portrait' | 'unknown';

type MosaicRow =
  | { type: 'full'; src: string }
  | { type: 'pair'; srcs: [string, string] }
  | { type: 'solo-portrait'; src: string };

function buildMosaicRows(images: string[], orientations: Record<string, ImageOrientation>): MosaicRow[] {
  const rows: MosaicRow[] = [];
  let i = 0;
  while (i < images.length) {
    const src = images[i];
    const orientation = orientations[src] ?? 'unknown';
    if (orientation === 'landscape') {
      rows.push({ type: 'full', src });
      i++;
    } else if (orientation === 'portrait') {
      const next = images[i + 1];
      if (next && (orientations[next] === 'portrait' || orientations[next] === 'unknown')) {
        rows.push({ type: 'pair', srcs: [src, next] });
        i += 2;
      } else {
        rows.push({ type: 'solo-portrait', src });
        i++;
      }
    } else {
      // unknown — render full width as fallback
      rows.push({ type: 'full', src });
      i++;
    }
  }
  return rows;
}

function ImageMosaic({ images, caseName }: { images: string[], caseName: string }) {
  const [orientations, setOrientations] = useState<Record<string, ImageOrientation>>({});

  const onImageLoad = useCallback((src: string, naturalWidth: number, naturalHeight: number) => {
    setOrientations(prev => ({
      ...prev,
      [src]: naturalWidth >= naturalHeight ? 'landscape' : 'portrait',
    }));
  }, []);

  // Pre-load all images to detect orientation before rendering mosaic
  useEffect(() => {
    images.forEach(src => {
      if (orientations[src]) return;
      const img = new window.Image();
      img.onload = () => onImageLoad(src, img.naturalWidth, img.naturalHeight);
      img.src = src;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const allResolved = images.every(src => orientations[src]);
  const rows = allResolved ? buildMosaicRows(images, orientations) : [];

  return (
    <div className="w-full flex flex-col gap-8">
      {rows.map((row, i) => {
        if (row.type === 'full' || row.type === 'solo-portrait') {
          return (
            <div key={i} className="w-full">
              <Image
                src={row.src}
                alt={`${caseName} ${i + 1}`}
                width={1600}
                height={1}
                quality={75}
                loading="lazy"
                className="w-full h-auto"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          );
        }
        return (
          <div key={i} className="w-full grid grid-cols-2 gap-8">
            {row.srcs.map((src, j) => (
              <Image
                key={j}
                src={src}
                alt={`${caseName} ${i + 1}-${j + 1}`}
                width={800}
                height={1}
                quality={75}
                loading="lazy"
                className="w-full h-auto"
                style={{ width: '100%', height: 'auto' }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}


export default function Case({ images, workInfo }: { images: string[], workInfo: workItem }) {
  const path = usePathname();
  const caseName = decodeURI(path.split('/').pop() || '');

  return (
      <div className="w-full h-fit flex flex-col gap-4">

          <div className="w-full grid grid-cols-2 gap-4 max-lg:grid-cols-1">
            <section className="flex flex-col h-full">
              <div className="">
                <h1 className="uppercase w-full text-left wrap-anywhere mb-2 self-start">{caseName}</h1>
                <span className="self-start flex flex-wrap">
                  {workInfo.tags && 
                    workInfo.tags.map((tag: string, index: number) =>
                      <span className="uppercase text-background bg-foreground font-black rounded-xs px-2 py-1 mr-2" key={index}>{tag}</span>
                    )
                  }
                </span>
              </div>
              <p className="h-fit mb-[0px] mt-4 text-balance self-center">{workInfo.description}</p>
            </section>

            {/* <Image
              src={`${images[0]}`}
              alt="Showreel Background"
              height={1600}
              width={1600}
              loading='lazy'
              quality={75}
              className="object-cover"
            /> */}
          </div>

          <div className="sticky top-5 flex h-20 w-fit justify-start z-50 items-center px-4">
            <button onClick={() => window.history.replaceState(null, '', '/work')} title="back" type="button" className="flex items-center w-fit h-fit z-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="square" strokeLinejoin="bevel" d="M15 19l-7-7 7-7"/>
              </svg>
              <p className="w-fit align-middle">All Works</p>
            </button>
          </div>
        
        {/* <ImageCarousel images={images ?? []} caseName={caseName} /> */}

        <div id="mosaic" className="max-lg:hidden">
          <ImageMosaic images={images ?? []} caseName={caseName} />
        </div>

        <div id="mosaic-mobile" className="lg:hidden"></div>
          {images.map((image, i) => {
              return (
                <div key={i} className="w-full">
                  <Image
                    src={image}
                    alt={`${caseName} ${i + 1}`}
                    width={1600}
                    height={1}
                    quality={75}
                    loading="lazy"
                    className="w-full h-auto"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              );
          })}
        </div>

  );
};
