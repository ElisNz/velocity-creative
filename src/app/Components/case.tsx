'use client';

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useCallback } from "react";
import { workItem } from "../types";

type ImageOrientation = 'landscape' | 'portrait';

function ImageMosaic({ images, caseName }: { images: string[], caseName: string }) {
  const [orientations, setOrientations] = useState<Record<string, ImageOrientation>>({});

  const onImageLoadingComplete = useCallback((src: string, naturalWidth: number, naturalHeight: number) => {
    setOrientations(prev => {
      const orientation: ImageOrientation = naturalWidth >= naturalHeight ? 'landscape' : 'portrait';
      if (prev[src] === orientation) return prev;
      return { ...prev, [src]: orientation };
    });
  }, []);

  return (
    <div className="w-full flex flex-wrap gap-2">
      {images.map((src, i) => {
        const orientation = orientations[src];
        const widthClass = orientation === 'portrait' ? 'w-[calc(50%-0.25rem)]' : 'w-full';
        return (
          <div key={src} className={widthClass}>
            <Image
              src={src}
              alt={`${caseName} ${i + 1}`}
              width={1600}
              height={1}
              quality={75}
              loading="lazy"
              className="w-full h-auto"
              style={{ width: '100%', height: 'auto' }}
              onLoad={(e) => { const img = e.currentTarget; onImageLoadingComplete(src, img.naturalWidth, img.naturalHeight); }}
            />
          </div>
        );
      })}
    </div>
  );
}


export default function Case({ images, workInfo, workList }: { images: string[], workInfo: workItem, workList: string[] }) {
  const path = usePathname();
  const caseName = decodeURI(path.split('/').pop() || '');

  return (
    <div className="lg:flex">

      <div className="max-[1024px]:hidden flex flex-col w-1/4 sticky top-4 p-2 gap-2 h-fit">
        {workList.map((work, index) => (
          <button key={index} onClick={() => window.history.replaceState(null, '', `/work/${encodeURIComponent(work)}`)}><h3 className={`${caseName === work ? 'text-[#FF0000]/50' : 'foreground-secondary'} text-[1.25rem] uppercase text-start`} key={index}>{work}</h3></button>
        ))}
      </div>

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
          </div>

        {/* <div className="lg:hidden sticky top-5 flex h-20 w-fit justify-start z-50 items-center px-4">
          <button onClick={() => window.history.replaceState(null, '', '/work')} title="back" type="button" className="flex items-center w-fit h-fit z-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="square" strokeLinejoin="bevel" d="M15 19l-7-7 7-7"/>
            </svg>
            <p className="w-fit align-middle font-black">Back</p>
          </button>
        </div> */}


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

        <div className="max-lg:hidden sticky top-5 flex h-20 w-fit justify-start z-50 items-center px-4">
          <button onClick={() => window.history.replaceState(null, '', '/work')} title="back" type="button" className="flex items-center w-fit h-fit z-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="square" strokeLinejoin="bevel" d="M15 19l-7-7 7-7"/>
            </svg>
            <p className="w-fit align-middle font-black">Back</p>
          </button>
        </div>

      </div>
  );
};
