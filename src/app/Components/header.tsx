'use client';
import { useState } from 'react';


export default function Header({currentScene, setCurrentScene}: {currentScene: string, setCurrentScene: (scene: 'menu' | 'about' | 'work' | 'contact') => void}) {
  const [isOpen, setIsOpen] = useState(false);
  const labels = ['About', 'Work', 'Contact'];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleNavigation = (scene: 'about' | 'work' | 'contact') => {
    setCurrentScene(scene);
  };

  const Button = ({label, onClick}: {label: string, onClick: () => void}) => (
    <button type='button' className={`${currentScene === label.toLowerCase() ? 'text-white/50': ''} text-3xl`} onClick={onClick}>{label}</button>
  );

  const DropdownMenu = () => {
    return (
      <nav className={`${!isOpen ? 'invisible': ''} size-fit bg-black flex flex-col gap-y-2 items-center justify-center px-4 py-2 my-2`}>
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
    );
  };

  return (
    <header className="w-full h-full flex flex-col justify-between z-50">
      <h1 className="w-full text-center uppercase text-white text-[22px] self-center bg-black py-2 text-nowrap overflow-hidden">Velocity Creative</h1>
      
      <div>
        {
          currentScene === 'about' &&
          <div className="w-full h-[40vh] bg-black p-4 overflow-y-scroll">
            <h2>Crafted by Insight - Elevated by AI</h2>
            <p>Lorem Ipsum is simply dummy text of the 
              printing and typesetting industry. Lorem 
              Ipsum has been the industry's standard 
              dummy text ever since the 1500s, when an 
              unknown printer took a galley of type and 
              scrambled it to make a type specimen book. 
              It has survived not only five centuries, but 
              also the leap into electronic typesetting, 
              remaining essentially unchanged. It was 
              popularised in the 1960s with the release of 
              Letraset sheets containing Lorem Ipsum
            </p>
          </div>
        }

        <DropdownMenu />
        
        <button
          type="button"
          title='Menu Button'
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
