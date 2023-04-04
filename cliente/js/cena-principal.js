export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON(
      "mapa-inicial",
      "./assets/mapa/mapa.json"
    );
    // Tilesets
    this.load.image("tijolos", "./assets/tijolos/tijolos.png");
    //
    this.load.spritesheet("player-1", "./assets/player-1/player1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    //
    this.load.spritesheet("player-2", "./assets/player-2/player2.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }
  create() {
    // Mapa
    // Tilemap
    this.mapa_principal_terreo = this.make.tilemap({
      key: "mapa-inicial",
    });
    // Tilesets
    this.tileset_principal_terreo_parede =
      this.mapa_inicial.addTilesetImage("tijolos", "tijolos");
    // Layer 0: chão
    this.chao = this.mapa_principal_terreo.createLayer(
      "chao",
      this.tileset_principal_terreo_chao,
      0,
      0
    );
  create() {
    this.player_1 = this.physics.add.sprite(200, 225, "player-1");
    //
    this.anims.create({
      key: "player-1-direita",
      frames: this.anims.generateFrameNumbers("player-1", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    //
    this.player_1.anims.play("player-1-direita", true);
    //
    this.player_2 = this.physics.add.sprite(600, 225, "player-2");
    //
    this.anims.create({
      key: "player-2-esquerda",
      frames: this.anims.generateFrameNumbers("player-2", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    //
    this.player_2.anims.play("player-2-esquerda", true);
  }
  
  update() {}
}
