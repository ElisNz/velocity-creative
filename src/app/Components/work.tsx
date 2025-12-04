'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';


import { Case } from './';
import { scene, scenes } from '../types';

const work = [
  {
    title: 'mannheimer swartling',
    description: 'Description for project one.',
    coverImageUrl: '/work/mannheimer-swartling/JOACHIM_LUNDGREN_E9A0812-Edit.jpg',
  },
  {
    title: 'sas',
    description: 'Description for project two.',
    coverImageUrl: '/work/sas/JOACHIM_LUNDGREN_MG_0640-Edit.jpg',
  },
  {
    title: 'seb',
    description: 'Description for project three.',
    coverImageUrl: '/work/seb/JOACHIM_LUNDGREN_E9A0565-Edit.jpg',
  },
];

export default function Work(props?: any) {
  const pathname = usePathname();
  const showWorkCovers = pathname === '/work';
  const showCase = !scenes.includes(pathname.split('/').pop() as scene) && pathname !== '/';

  const WorkCover = ({ title, coverImageUrl }: { title: string, coverImageUrl: string }) => (
    <div onClick={() => window.history.replaceState(null, '', encodeURIComponent(title))} className="relative flex flex-col w-full h-[70vh] lg:h-[70vh] overflow-hidden rounded-xs group cursor-pointer z-50">
      <h3 className='uppercase rounded-xs'>{title}</h3>
      <div className='relative w-full h-full'>
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          className="object-cover transform transition-all duration-500 z-10"
        />
      </div>
      <div className="absolute size-full flex items-center justify-center z-50">
        {/* <h1 className='uppercase bg-background text-center capitalize p-4 rounded-xs'>{title}</h1> */}
      </div>
    </div>
  );

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center gap-[2rem]">
      {showWorkCovers &&
        work.map(({ title, coverImageUrl }) => 
          <WorkCover key={title} title={title} coverImageUrl={coverImageUrl} />
        )
      }
      
      {showCase &&
        <Case />
      }

    </div>
  );
};
