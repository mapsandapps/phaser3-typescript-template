export class WinScene extends Phaser.Scene {
  private texts: Phaser.GameObjects.Text[] = []

  constructor() {
    super({
      key: 'WinScene'
    })
  }

  create(): void {
    this.texts.push(
      this.add.text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2,
        'You won!', {
          align: 'center'
        }
      ).setOrigin(0.5, 0.5)
    )
  }
}
