export type scene = 'menu' | 'about' | 'work' | 'contact';
export const scenes:scene[] = ['menu', 'about', 'work', 'contact'];
export enum StatusCodes {
  NotFound = 404,
  Rejected = 403,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
};

export type setScene = (scene: scene) => void;

export interface SceneProps {
  setScene: setScene;
};

export interface HeaderProps {
  currentScene: scene;
  setScene: setScene;
};
