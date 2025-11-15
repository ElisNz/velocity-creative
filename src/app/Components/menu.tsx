'use client';

import { useState, useMemo, memo, useCallback } from 'react';
import { Transition } from '@headlessui/react'
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

  const handleNavigation = useCallback((scene: scene) => {
    setCurrentScene(scene);
  }, []);

  const Button = ({label, onClick}: {label: string, onClick: () => void}) => (
    <button type='button' className={`${currentScene === label.toLowerCase() ? 'text-white/50': ''} text-3xl`} onClick={onClick}>{label}</button>
  );

  const ModuleBox = ({children}: {children: React.ReactNode}) => (
    <>
      <Transition show={isModuleVisible && isFinishedOpening} appear>
        <div className="transition-all duration-300 data-closed:opacity-0 data-closed:h-0 data-transition:text-white/0 data-transition:w-[10rem] w-full h-[15rem] md:h-[13rem] bg-black p-4 data-transition:overflow-hidden overflow-y-scroll">
          <button
            type="button"
            title='Menu Button'
            onClick={handleNavigation.bind(null, 'menu')}
            className="size-12 bg-black focus:outline-none"
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
  );

  const MenuButton = useCallback(() => (
    <button
      type="button"
      title="Menu Button"
      onClick={() => toggleMenu()}
      className="flex items-center justify-center size-[3.5rem] bg-black focus:outline-none"
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
      <h1 className="w-full text-center align-middle md:text-[4rem] uppercase text-white self-center bg-black py-2 mb-2 text-nowrap">Velocity Creative</h1>
      
      <div>      
        <ModuleBox>
          {renderScene}
        </ModuleBox>

        <Transition show={isOpen} afterLeave={() => setIsFinishedOpening(false)} afterEnter={() => setIsFinishedOpening(true)}>
          <nav className={`transition-all duration-300 data-closed:h-0 data-transition:text-black data-transition:w-[3.5rem] w-[10rem] h-[10rem] data-open:md:size-fit bg-black flex flex-col gap-y-2 items-center justify-center data-transition:p-0 data-transition:m-0 p-4 my-2 overflow-hidden`}>
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
