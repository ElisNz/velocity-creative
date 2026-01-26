
import { list } from '@vercel/blob';
import { Menu, Showreel } from '../Components';


export default async function Home() {
  const imageList = await list({ token: process.env.BLOB_STORAGE_READ_TOKEN || '', mode: 'expanded', prefix: 'work/' });

  return (
      <main className="h-full w-full">
        <Menu imagePromise={imageList} />
        <Showreel />
      </main>
  );
};
