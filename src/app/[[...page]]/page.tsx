
import { list } from '@vercel/blob';
import Link from 'next/link';
import { Menu, Showreel } from '../../Components';


function Watermarks() {
  return (
    <div className="fixed bottom-0 right-4 z-50 flex flex-col lg:flex-row items-end justify-end gap-2 p-4 text-[0.75rem] text-[#FFFFFF]/50">

      <Link href="/privacy-policy" className="h-full text-[#FFFFFF]/50 hover:text-[#FFFFFF]/75 transition-colors duration-300 text-[1rem]">
        Privacy Policy
      </Link>

      <h4 className="select-none text-[1rem] h-full">© Velocity Creative {new Date().getFullYear()}</h4>
    </div>
  );
}


export default async function Home() {
  const imageList = await list({ token: process.env.BLOB_STORAGE_READ_TOKEN || '', mode: 'expanded', prefix: 'work/' });

  return (
      <main className="h-full w-full">
        <Menu imagePromise={imageList} />
        <Showreel />
        {/* <Watermarks /> */}
      </main>
  );
};
