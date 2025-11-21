import Image from 'next/image';

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

const WorkCover = ({ title, coverImageUrl }: { title: string, coverImageUrl: string }) => (
  <div className="relative w-full h-[45vh] lg:h-[50vh] overflow-hidden rounded-xs group cursor-pointer z-50">
    <Image
      src={coverImageUrl}
      alt={title}
      fill
      className="object-cover transform transition-all duration-500 z-10"
    />
    <div className="absolute size-full bg-black/20 flex items-center justify-center z-50">
      <h1 className='text-center capitalize'>{title}</h1>
    </div>
  </div>
);

export default function Work(props?: any) {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
      {work.map(({ title, coverImageUrl }) => (
        <WorkCover key={title} title={title} coverImageUrl={coverImageUrl} />
      ))
      }
    </div>
  );
};
