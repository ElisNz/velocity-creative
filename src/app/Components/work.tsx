'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';


import { Case } from './';

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
  const showWorkCovers = pathname === '/';
  const showCase = pathname !== '/';

  const WorkCover = ({ title, coverImageUrl }: { title: string, coverImageUrl: string }) => (
    <div onClick={() => window.history.replaceState(null, '', encodeURIComponent(title))} className="relative w-full h-[45vh] lg:h-[50vh] overflow-hidden rounded-xs group cursor-pointer z-50">
      <Image
        src={coverImageUrl}
        alt={title}
        fill
        className="object-cover transform transition-all duration-500 z-10"
      />
      <div className="absolute size-full flex items-center justify-center z-50">
        <h1 className='bg-black/40 text-center capitalize p-4 rounded-xs'>{title}</h1>
      </div>
    </div>
  );

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
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
