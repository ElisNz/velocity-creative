'use client';

import { usePathname } from "next/navigation";
import Image from "next/image";


export default function Case(props?: any) {
  const path = usePathname();
  const caseName = decodeURI(path.split('/').pop() || '');

  return (
      <div className="w-full h-fit flex flex-col items-center justify-center gap-0">
        
          <section className="flex-1 gap-0 mb-0">
            <h2 className="uppercase w-full text-left mb-4 wrap-anywhere text-[2.4rem]">{caseName}</h2>
            <p className="mb-[0px] text-balance">A collaboration with Scandinavia’s leading business law firm, spanning years and shaping a photographic visual identity while building a tailored image bank. </p>
          </section>
          <div className="flex h-fit w-full justify-start mb-2">
            <button onClick={() => window.history.replaceState(null, '', '/work')} title="back" type="button" className="w-fit h-full z-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 20" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="square" strokeLinejoin="bevel" d="M15 19l-7-7 7-7"/>
            </svg>
            </button>
          </div>
        
        <div className="relative w-full h-[40vh] lg:h-[70vh] overflow-hidden rounded-xs group cursor-pointer z-50">
          <Image
            src={`/work/mannheimer-swartling/JOACHIM_LUNDGREN_E9A0812-Edit.jpg`}
            alt={caseName}
            fill
            className="object-cover transform transition-all duration-500 z-10"
          />
        </div>
        <div className="relative w-full h-[40vh] lg:h-[70vh] overflow-hidden rounded-xs group cursor-pointer z-50">
          <Image
            src={`/work/seb/JOACHIM_LUNDGREN_E9A0565-Edit.jpg`}
            alt={caseName}
            fill
            className="object-cover transform transition-all duration-500 z-10"
          />
        </div>
        <div className="relative w-full h-[40vh] lg:h-[70vh] overflow-hidden rounded-xs group cursor-pointer z-50">
          <Image
            src={`/work/mannheimer-swartling/JOACHIM_LUNDGREN_E9A0812-Edit.jpg`}
            alt={caseName}
            fill
            className="object-cover transform transition-all duration-500 z-10"
          />
        </div>

      </div>
  );
};
