'use client';

import { usePathname } from "next/navigation";
import Image from "next/image";


export default function Case({ props }: any) {
  const path = usePathname();
  const caseName = decodeURI(path.split('/').pop() || '');

  const { tags } = props;

  return (
      <div className="w-full h-fit flex flex-col items-center justify-center gap-4">
        
          <section className="flex-1 gap-0 mb-0">
            <h2 className="uppercase w-full text-left wrap-anywhere text-[2.4rem] mb-4">{caseName}</h2>
            {tags && 
              tags?.map((tag: string, index: number) =>
                <span className="uppercase text-background bg-foreground font-black rounded-xs px-2 py-1 mr-2" key={index}>{tag}</span>
              )
            }
            <p className="mb-[0px] mt-4 text-balance">A collaboration with Scandinavia’s leading business law firm, spanning years and shaping a photographic visual identity while building a tailored image bank. </p>
          </section>
          <div className="flex h-fit w-full justify-start">
            <button onClick={() => window.history.replaceState(null, '', '/work')} title="back" type="button" className="flex items-center w-fit h-full z-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="none" viewBox="fit" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="square" strokeLinejoin="bevel" d="M15 19l-7-7 7-7"/>
              </svg>
              <p className="w-fit">All Works</p>
            </button>
          </div>
        
        <div className="relative overflow-hidden rounded-xs group cursor-pointer z-50">
          <Image
            src={`/work/mannheimer-swartling/JOACHIM_LUNDGREN_E9A0812-Edit.jpg`}
            alt={caseName}
            height={800}
            width={1200}
            className="object-fit transform transition-all duration-500 z-10"
          />
        </div>
        <div className="relative overflow-hidden rounded-xs group cursor-pointer z-50">
          <Image
            src={`/work/seb/JOACHIM_LUNDGREN_E9A0565-Edit.jpg`}
            alt={caseName}
            height={800}
            width={1200}
            className="object-fit transform transition-all duration-500 z-10"
          />
        </div>
        <div className="relative overflow-hidden rounded-xs group cursor-pointer z-50">
          <Image
            src={`/work/mannheimer-swartling/JOACHIM_LUNDGREN_E9A0812-Edit.jpg`}
            alt={caseName}
            height={800}
            width={1200}
            className="object-fit transform transition-all duration-500 z-10"
          />
        </div>

      </div>
  );
};
