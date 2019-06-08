export class MenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key
  private texts: Phaser.GameObjects.Text[] = []

  constructor() {
    super({
      key: 'MenuScene'
    })
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.X
    )
    this.startKey.isDown = false
  }

  preload(): void {
    this.load.pack('preload', './src/assets/pack.json', 'preload')
  }

  create(): void {
    this.texts.push(
      this.add.text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2 - 60,
        'GAME'
      ).setOrigin(0.5, 0.5)
    )

    this.texts.push(
      this.add.text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2 + 60,
        'PRESS X TO PLAY'
      ).setOrigin(0.5, 0.5)
    )
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start('GameScene')
    }
  }
}
