import 'phaser';
import { GameScene } from './scenes/game-scene';
import { MenuScene } from './scenes/menu-scene';
import { WinScene } from './scenes/win-scene';

// main game configuration
const config: GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [MenuScene, GameScene, WinScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  render: {
    pixelArt: false,
    antialias: true
  }
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }

  preload(): void {
    this.scene.start('MenuScene')
  }
}

// when the page is loaded, create our game instance
window.addEventListener('load', () => {
  var game = new Game(config);
});
