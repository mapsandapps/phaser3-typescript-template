export class Enemy extends Phaser.GameObjects.Image {
  private speed: number

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame)

    this.initContainer()
    this.scene.add.existing(this)
  }

  private initContainer() {
    this.speed = 100

    this.scene.physics.world.enable(this)
  }

  update(): void {}
}
