// import { list } from '@vercel/blob';
import { Menu, Showreel } from '../Components';

export default function Home() {
  // const imageList = list({ token: process.env.BLOB_STORAGE_READ_TOKEN || '', prefix: 'WORK' });

  return (
      <main className="h-full w-full">
        <Menu /* imagePromise={imageList} */ />
        <Showreel />
      </main>
  );
};
