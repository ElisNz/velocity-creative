'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (scene: scene) => {
    window.history.replaceState(null, '', `/${scene}`);
    setCurrentScene(scene);
  };

  const Button = ({label, onClick}: {label: string, onClick: () => void}) => (
      <button type='button' onClick={onClick} className='w-full'><h2 className={`${currentScene === label.toLowerCase() ? 'text-[#FFFFFF62]': ''} w-full text-left transition-all duration-300 data-closed:text-transparent mb-0`}>{label}</h2></button>
  );

  const ModuleBox = useCallback(({children}: {children: React.ReactNode}) => (
    <Transition show={isModuleVisible && isFinishedOpening} appear>
      <div className='transition-all duration-300 data-closed:h-[0px] data-closed:opacity-0 data-transition:text-white/0 data-closed:w-[0px] h-[50vh] w-full p-4 mb-2 bg-[#141215]/90 overflow-hidden'>
      
        <div className="h-full w-full h-[15rem] md:h-[13rem] rounded-xs px-4 data-transition:mb-0 data-transition:overflow-hidden overflow-y-auto scrollbar-foreground ">
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
      className="flex items-center justify-center size-[3.5rem] bg-[#141215]/90 rounded-xs focus:outline-none"
    >
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-10 text-white menu-fade-in"
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
          className="size-10 text-white menu-fade-in"
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
    <hgroup className="fixed w-full h-screen max-h-full flex flex-col justify-between px-4 md:px-8 py-[5vh] z-50">
      <h1 className="select-none max-md:w-full text-center max-md:align-middle md:text-[4rem] uppercase text-white max-md:self-center md:self-start bg-[#141215]/90 pb-2 pt-3 px-4 md:px-8 mb-2 text-nowrap">Velocity Creative</h1>

      {/* <Image src="/velocity-header-logo.png" loading='eager' alt="Velocity Creative Logo" width={500} height={43} className="select-none max-md:self-center mb-2" /> */}

      <div className='max-h-[85vh]'>      
        <ModuleBox>
          {renderScene}
        </ModuleBox>

        <Transition show={isOpen} afterLeave={() => setIsFinishedOpening(false)} afterEnter={() => setIsFinishedOpening(true)}>
          <nav className={`transition-all duration-300 data-closed:h-[0px] data-closed:opacity-0 data-closed:w-[0px] w-[20vh] min-w-fit h-[20vh] bg-[#141215]/90 rounded-xs flex flex-col items-center justify-center px-4 mb-2 overflow-hidden`}>
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
