import { Enemy } from '../objects/enemy'
import { Player } from '../objects/player'

export class GameScene extends Phaser.Scene {
  private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer
  private layer: Phaser.Tilemaps.StaticTilemapLayer
  private map: Phaser.Tilemaps.Tilemap
  private tileset: Phaser.Tilemaps.Tileset

  private enemies: Phaser.GameObjects.Group
  private player: Player

  constructor() {
    super({
      key: "GameScene"
    })
  }

  init(): void {}

  create(): void {
    this.map = this.make.tilemap({ key: 'levelMap' })

    this.tileset = this.map.addTilesetImage('RPGpack_sheet', 'RPGpack_sheet', 64, 64, 1, 2)
    this.backgroundLayer = this.map.createStaticLayer('Background', this.tileset, 0, 0)
    this.layer = this.map.createStaticLayer('Map', this.tileset, 0, 0)
    this.layer.setCollisionByProperty({ collide: true })

    this.enemies = this.add.group({ })

    this.convertObjects()

    this.physics.add.collider(this.player, this.layer)

    this.cameras.main.startFollow(this.player)
  }

  update(): void {
    this.player.update()

    this.enemies.children.each((enemy: Enemy) => {

      enemy.update()
    }, this)
  }

  private restartScene(): void {
    this.scene.restart()
  }

  private setObjectsInactive(): void {
    this.player.setActive(false)
    this.enemies.children.each(enemy => {
      enemy.setActive(false)
    })
  }

  private gameLost(enemy): void {
    this.setObjectsInactive()

    this.add.text(
      this.player.x,
      this.player.y,
      'Oh no!\nYou lost!', {
        align: 'center'
      }
    ).setOrigin(0.5, 0.5)
  }

  private convertObjects(): void {
    const objects = this.map.getObjectLayer('Objects').objects as any[]

    objects.forEach((object, i) => {
      if (object.name === 'Player') {
        this.player = new Player({
          scene: this,
          x: object.x,
          y: object.y,
          key: 'player'
        })
      } else if (object.name === 'Enemy') {
        let enemy = new Enemy({
          scene: this,
          x: object.x,
          y: object.y,
          key: `enemy${i % 3}`
        })

        this.physics.add.collider(enemy, this.layer)
        this.physics.add.collider(enemy, this.player)

        this.enemies.add(enemy)
      }
    })
  }

  private exitToWinScene(): void {
    this.setObjectsInactive()
    this.scene.stop()
    this.scene.get('WinScene').scene.start()
  }
}
