'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { workItem } from '../types';

import { Case } from './';


const work: workItem[] = [
  {
    title: 'mannheimer swartling',
    tags: ['photo', 'ai'],
    description: `A collaboration with Scandinavia’s leading business law firm, spanning years and
shaping a photographic visual identity while building a tailored image bank.`,
    coverImageUrl: '/work/mannheimer-swartling/JOACHIM_LUNDGREN_E9A0812-Edit.jpg',
  },
  {
    title: 'sas',
    tags: ['photo', 'ai'],
    description: `Photography for Scandinavian Airlines’ inflight magazines Scanorama and
Scandinavian Traveller, along with commercial campaigns and image bank work.`,
    coverImageUrl: '/work/sas/JOACHIM_LUNDGREN_MG_0640-Edit.jpg',
  },
  {
    title: 'seb',
    tags: ['photo', 'ai'],
    description: `Long-term global work for Sweden’s leading corporate and private bank, including the
development of a photographic visual identity and the ongoing curation of an
exclusive image bank.`,
    coverImageUrl: '/work/seb/JOACHIM_LUNDGREN_E9A0565-Edit.jpg',
  },
  {
    title: 'afry',
    tags: ['photo'],
    description: 'We teamed up with lighting designers at AFRY, a major international engineering and consulting group, to visualise an experimental façade lighting scheme in Rosengård, Malmö. The proposal secured the commission, and the project is now under construction.',
    coverImageUrl: '/work/afry/velocity_afry_2.png',
  },
  {
    title: 'brabo',
    tags: ['photo'],
    description: 'Long-term work with property developer Brabo, incorporating AI-based visualisation since 2024 to illustrate proposals and visions for future developments.',
    coverImageUrl: '/work/brabo/benjamin_m_httpss.mj.runDevQAClpvMQ_httpss.mj.runai2rJL9QbXw__e1fb4e29-c179-4ee3-b7a0-7b5c2044a4fe_1.png',
  },
];

type Item = { pathname: string; image: string };

type BlobItem = { pathname: string; url: string };

type Grouped = Record<string, string[]>;

const re = /\.(?:png|jpe?g|gif|webp|svg|avif|bmp|tiff?)$/i;

function groupBySecondPath(items: Item[]): Grouped {
  return items.reduce<Grouped>((acc, item) => {
    if (!re.test(item.image)) {
      return acc;
    }
    const parts = item.pathname.split("/").filter(Boolean);
    const key = parts[1] ?? "unknown";

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item.image);
    return acc;
  }, {});
}

export default function Work({ props } : { props?: { blobs?: BlobItem[] } }) {
  const pathname = usePathname();
  const showWorkCovers = pathname === '/work';
  const [selectedWork, setSelectedWork] = useState<workItem | null>(null);
  const [showCase, setShowCase] = useState<boolean>(false);

  const { blobs } = props || {};

  const imageList = useMemo(() => groupBySecondPath(
    blobs?.map((blob: BlobItem) => ({
      pathname: blob.pathname,
      image: blob.url,
    })) || []
  ), [blobs]);

  const activeCaseImages = selectedWork ? imageList[selectedWork.title.replace(' ', '-')] || [] : [];

  const onCoverClick = (title: string) => {
    window.history.replaceState(null, '', encodeURIComponent(title));
    setSelectedWork(work.find(item => item.title === title) || null);
    setShowCase(true);
  };

  const WorkCover = ({ title, coverImageUrl }: { title: string, coverImageUrl: string }) => (
    <div onClick={() => onCoverClick(title)} className="relative flex flex-col w-full h-[70vh] lg:h-[70vh] overflow-hidden rounded-xs group cursor-pointer z-50">
      <h1 className='uppercase'>{title}</h1>
      <div className='relative w-full h-full'>
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          quality={75}
          loading='lazy'
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
    <div className={`w-full h-fit ${showWorkCovers ? 'lg:grid grid-cols-2' : 'flex flex-col'} items-center justify-center gap-[2rem]`}>
      {showWorkCovers &&
        work.map(({ title, coverImageUrl }) => 
          <WorkCover key={title} title={title} coverImageUrl={coverImageUrl} />
        )
      }
      
      {showCase && selectedWork &&
        <Case images={activeCaseImages} workInfo={selectedWork} />
      }

    </div>
  );
};
