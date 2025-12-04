'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Transition } from '@headlessui/react';

import { usePathname, useRouter } from 'next/navigation';
import { About, Work, Contact } from '.';

import { scene, scenes } from '../types';
import './menu.css';


export default function Menu({ imagePromise }: { imagePromise?: any }) {
  const [currentScene, setCurrentScene] = useState<scene>('menu');
  const [isOpen, setIsOpen] = useState(false);
  const [isFinishedOpening, setIsFinishedOpening] = useState(false);

  const labels = ['About', 'Work', 'Contact'];
  const isModuleVisible = useMemo(() => currentScene !== 'menu' && isOpen, [currentScene, isOpen]);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (scene: scene) => {
    window.history.replaceState(null, '', `/${scene}`);
    setCurrentScene(scene);
  };

  const Button = ({label, onClick}: {label: string, onClick: () => void}) => (
      <button type='button' onClick={onClick} className='w-full'><h3 className={`${currentScene === label.toLowerCase() ? 'text-[#FF0000]/50 italic': ''}  uppercase w-full text-left mb-0`}>{label}</h3></button>
  );

  const ModuleBox = useCallback(({children}: {children: React.ReactNode}) => (
    <Transition show={isModuleVisible && isFinishedOpening} appear>
      <div className='w-full h-full transition-all duration-300 data-transition:mb-0 data-closed:h-[0px] data-closed:opacity-0 data-transition:text-white/0 data-closed:w-[0px] w-full px-2 py-4 mb-2 bg-background overflow-hidden'>
      
        <div className="w-full h-full rounded-xs pl-2 pr-3 overflow-y-auto scrollbar-background ">
          {/* <button
            type="button"
            title='Menu Button'
            onClick={handleNavigation.bind(null, 'menu')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="square" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
          {children}
        </div>
      
    </div>
    </Transition>
  ), [isModuleVisible, handleNavigation]);

  const MenuButton = useCallback(() => (
    <button
      type="button"
      title="Menu Button"
      onClick={() => toggleMenu()}
      className="flex items-center justify-center size-[4rem] bg-background rounded-xs focus:outline-none"
    >
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-10 menu-fade-in"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          key="cross"
        >
          <path strokeLinecap="square" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-10 menu-fade-in"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          key="hamburger"
        >
          <path strokeLinecap="square" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  ), [isOpen]);

  const renderScene = useMemo(() => {
    switch (currentScene) {
      case 'about':
        return <About />;
      case 'work':
        return <Work />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  }, [currentScene]);

  
  useEffect(() => {
    if (pathname === '/') { return; }

    if (scenes.includes(pathname.split('/').pop() as scene)){
      setCurrentScene(pathname.split('/').pop() as scene);
    } else {
      setCurrentScene('work');
    }

    setIsOpen(true);
  }, []);

  return (
    <hgroup className="absolute w-full h-full flex max-lg:flex-col justify-between p-4 md:p-8 z-50 gap-x-2">

      <div className='w-full flex flex-col grow max-h-[90vh]'>
        <a title='home' href='/' className='w-full md:w-fit'>
          <h1 className="lg:h-[4rem] rounded-xs text-foreground align-middle select-none md:w-fit text-center max-md:align-middle uppercase max-md:self-center md:self-start bg-background py-2 px-4 md:px-8 text-nowrap">Velocity Creative</h1>
        </a>

        <div className='max-lg:w-full lg:w-1/2 max-lg:h-[40vh] lg:max-h-full grow max-lg:mb-2 mt-2 overflow-hidden rounded-xs'>
          <ModuleBox>
            {renderScene}
          </ModuleBox>
        </div>
      </div>

      <div className='flex max-lg:flex-col lg:flex-col-reverse lg:justify-end lg:items-end'>
        <Transition show={isOpen} afterLeave={() => setIsFinishedOpening(false)} afterEnter={() => setIsFinishedOpening(true)}>
          <nav className={`transition-all duration-300 data-closed:h-[0px] data-closed:opacity-0 data-closed:w-[0px] min-w-fit w-[15vh] min-h-fit h-[15vh] lg:h-[10rem] lg:w-[10rem] bg-background rounded-xs flex flex-col items-center justify-center px-4 py-2 max-lg:mb-2 lg:mt-2 overflow-hidden`}>
              {labels.map((label) => (
                <Button
                  key={label}
                  label={label}
                  onClick={() => {
                    handleNavigation(label.toLowerCase() as 'about' | 'work' | 'contact');
                  }}
                />
              ))}
          </nav>
        </Transition>

        <MenuButton />
      </div>
 
    </hgroup>
  );
};
