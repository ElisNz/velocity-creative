'use client';

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { workItem } from "../types";

function ImageCarousel({ images, caseName }: { images: string[], caseName: string }) {
  const [index, setIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragged = useRef(false);

  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragged.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 40) {
      dragged.current = true;
      if (delta < 0) { next(); } else { prev(); }
    }
    dragStartX.current = null;
  };

  if (!images.length) return null;

  return (
    <div className="relative w-full max-h-[90%] select-none">
      <div
        className="w-full overflow-hidden rounded-xs cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          className="flex max-lg:flex-col gap-2 max-lg:items-center transition-transform duration-500 ease-in-out"
          data-offset={index}
          ref={(el) => { if (el) el.style.transform = `translateX(-${index * 100}%)`; }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full flex flex-col relative shrink-0 overflow-y-hidden">
              <Image
                src={src}
                alt={`${caseName} ${i + 1}`}
                width={1600}
                height={1}
                priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                quality={100}
                className="w-full h-auto object-contain rounded-xs pointer-events-none"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="max-lg:hidden">
          <button
            type="button"
            title="Previous"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center size-[3rem] bg-background/70 hover:bg-background transition-colors rounded-xs z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="square" strokeLinejoin="bevel" d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            type="button"
            title="Next"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center size-[3rem] bg-background/70 hover:bg-background transition-colors rounded-xs z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="square" strokeLinejoin="bevel" d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}


export default function Case({ images, workInfo }: { images: string[], workInfo: workItem }) {
  const path = usePathname();
  const caseName = decodeURI(path.split('/').pop() || '');

  return (
      <div className="w-full h-fit flex flex-col gap-4">
        
          <section className="flex-1 gap-0 mb-0">
            <h1 className="uppercase w-full text-left wrap-anywhere mb-2">{caseName}</h1>
            {workInfo.tags && 
              workInfo.tags.map((tag: string, index: number) =>
                <span className="uppercase text-background bg-foreground font-black rounded-xs px-2 py-1 mr-2" key={index}>{tag}</span>
              )
            }
            <p className="mb-[0px] mt-4 text-balance">{workInfo.description}</p>
          </section>

          <div className="flex h-fit w-full justify-start">
            <button onClick={() => window.history.replaceState(null, '', '/work')} title="back" type="button" className="flex items-center w-fit h-full z-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="square" strokeLinejoin="bevel" d="M15 19l-7-7 7-7"/>
              </svg>
              <p className="w-fit">All Works</p>
            </button>
          </div>
        
        <ImageCarousel images={images ?? []} caseName={caseName} />

      </div>
  );
};
