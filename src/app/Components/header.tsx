'use client';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const DropdownMenu = () => {
    return (
      <nav className="size-fit bg-black flex flex-col items-center justify-center space-y-8 p-4 mb-4">
        <button type='button' className="text-white text-2xl">About</button>
        <button type='button' className="text-white text-2xl">Work</button>
        <button type='button' className="text-white text-2xl">Contact</button>
      </nav>
    );
  };

  return (
    <header className="fixed w-full min-h-screen flex flex-col justify-between p-8">
      <h1 className="w-full text-center uppercase text-white text-[24px] tracking-tight self-center bg-black px-4">Velocity Creative</h1>
      
      <div>
        {isOpen && 
          <DropdownMenu />
        }
        <button
          type="button"
          onClick={toggleMenu}
          className="flex items-center justify-center size-12 bg-[black] focus:outline-none"
          >
          {isOpen ? (
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="square" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};
