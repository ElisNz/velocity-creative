export type scene = 'menu' | 'about' | 'work' | 'contact';

export type setScene = (scene: scene) => void;

export interface SceneProps {
  setScene: setScene;
}

export interface HeaderProps {
  currentScene: scene;
  setScene: setScene;
}
