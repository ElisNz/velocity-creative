'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { workItem } from '../types';

import { Case } from './';
import { scene, scenes } from '../types';
import { set } from 'mongoose';

const work: workItem[] = [
  {
    title: 'mannheimer swartling',
    tags: ['photo', 'ai', 'corporate'],
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
  const [selectedWork, setSelectedWork] = useState<workItem | null>(null);
  const [showCase, setShowCase] = useState<boolean>(false);

  const onCoverClick = (title: string) => {
    window.history.replaceState(null, '', encodeURIComponent(title));
    setSelectedWork(work.find(item => item.title === title) || null);
    setShowCase(true);
  };

  const WorkCover = ({ title, coverImageUrl }: { title: string, coverImageUrl: string }) => (
    <div onClick={() => onCoverClick(title)} className="relative flex flex-col w-full h-[70vh] lg:h-[70vh] overflow-hidden rounded-xs group cursor-pointer z-50">
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

  useEffect(() => {
    const caseName = decodeURI(pathname.split('/').pop() || '');
    if (caseName && caseName !== 'work') {
      const foundWork = work.find(item => item.title === caseName);
      if (foundWork) {
        setSelectedWork(foundWork);
        setShowCase(true);
      }
    } else {
      setShowCase(false);
      setSelectedWork(null);
    }
  }, [pathname]);

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center gap-[2rem]">
      {showWorkCovers &&
        work.map(({ title, coverImageUrl }) => 
          <WorkCover key={title} title={title} coverImageUrl={coverImageUrl} />
        )
      }
      
      {showCase && 
        <Case props={selectedWork} />
      }

    </div>
  );
};
