'use client';

import { useState } from 'react';
import { Header, About } from './Components';

import { scene } from '../types';

export default function Home() {
  const [currentScene, setCurrentScene] = useState<scene>('menu');

  const renderScene = () => {
    switch (currentScene) {
      case 'about':
        return <About />;
      // Add other cases for 'work' and 'contact' as needed
      default:
        return null;
    }
  };


  
  return (
      <main className="h-screen w-full p-8">
        <Header currentScene={currentScene} setCurrentScene={setCurrentScene} />
        {/* <div className='absolute top-40 left-0 w-full h-[50vh] -z-10'>
          {renderScene()}
        </div> */}
      </main>
  );
}
