
interface IGameConstants {
  TRANSFORM: string;
  TRANSFORMORIGIN: string;
  TRANSITION: string;
  ANIMATION: string;
  STRANSFORM: string;
  STRANSITION: string;
  EVT_TRANSITION_END: string;
  EVT_ANIMATION_END: string;

  WIDTH: number;
  HEIGHT: number;
  RATIO: number;
  DISPLAY_TOP: number;
  DISPLAY_LEFT: number;
  DISPLAY_WIDTH: number;
  DISPLAY_HEIGHT: number;
  DISPLAY_SCALE: number;
}

class GameConstants implements IGameConstants {
  TRANSFORM = "";
  TRANSFORMORIGIN = "";
  TRANSITION = "";
  ANIMATION = "";
  STRANSFORM = "";
  STRANSITION = "";
  EVT_TRANSITION_END = "";
  EVT_ANIMATION_END = "";

  WIDTH = 960;
  HEIGHT = 540;
  RATIO = 960 / 540;
  DISPLAY_TOP = 0;
  DISPLAY_LEFT = 0;
  DISPLAY_WIDTH = 0;
  DISPLAY_HEIGHT = 0;
  DISPLAY_SCALE = 0;
}


var game = new GameConstants();
export = game;
