'use client';

import { useState, useMemo, useCallback } from 'react';
import { Transition, TransitionChild } from '@headlessui/react'
import { About, Work, Contact } from '.';

import { scene } from '../types';
import './menu.css';


export default function Menu() {
  const [currentScene, setCurrentScene] = useState<scene>('menu');
  const [isOpen, setIsOpen] = useState(false);
  const [isFinishedOpening, setIsFinishedOpening] = useState(false);


  const labels = ['About', 'Work', 'Contact'];
  const isModuleVisible = useMemo(() => currentScene !== 'menu' && isOpen, [currentScene, isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (scene: scene) => {
    setCurrentScene(scene);
  };

  const Button = ({label, onClick}: {label: string, onClick: () => void}) => (
      <button type='button' onClick={onClick}><h2 className={`${currentScene === label.toLowerCase() ? 'text-[#FFFFFF62]': ''} text-[2rem] transition-all duration-300 data-closed:text-transparent mb-0`}>{label}</h2></button>
  );

  const ModuleBox = useCallback(({children}: {children: React.ReactNode}) => (
    <>
      <Transition show={isModuleVisible && isFinishedOpening} appear>
        <div className="transition-all duration-300 data-closed:h-[0px] data-closed:opacity-0 data-closed:h-0 data-transition:text-white/0 data-transition:w-[10rem] w-full h-[15rem] md:h-[13rem] bg-black/80 p-4 data-transition:mb-0 mb-2 data-transition:overflow-hidden overflow-y-scroll scrollbar-foreground">
          <button
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
          </button>
          {children}
        </div>
      </Transition>
    </>
  ), [isModuleVisible, handleNavigation]);

  const MenuButton = useCallback(() => (
    <button
      type="button"
      title="Menu Button"
      onClick={() => toggleMenu()}
      className="flex items-center justify-center size-[3.5rem] bg-black/80 focus:outline-none"
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

  return (
    <hgroup className="fixed w-full h-screen max-h-full flex flex-col justify-between p-8 z-50">
      <h1 className="select-none w-full text-center align-middle md:text-[4rem] uppercase text-white self-center bg-black/80 py-2 mb-2 text-nowrap">Velocity Creative</h1>
      
      <div>      
        <ModuleBox>
          {renderScene}
        </ModuleBox>

        <Transition show={isOpen} afterLeave={() => setIsFinishedOpening(false)} afterEnter={() => setIsFinishedOpening(true)}>
          <nav className={`transition-all duration-100 data-closed:h-[0px] data-transition:opacity-0 data-transition:w-[3.5rem] w-[10rem] h-[10rem] data-open:md:size-fit bg-black/80 flex flex-col gap-y-2 items-center justify-center data-transition:p-0 data-transition:m-0 p-4 mb-2 overflow-hidden`}>
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
