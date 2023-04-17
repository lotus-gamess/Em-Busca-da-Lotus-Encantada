export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    // Mapa
    // Tilemap
    //this.load.tilemapTiledJSON("mapa-inicial", "./assets/mapa/mapa.json");

    // Tilesets
    //this.load.image("tijolos", "./assets/tijolos/tijolos.png");
    //
    this.load.spritesheet("player-1", "./assets/player-1/player1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("player-1-parado", "./assets/player-1/player1-parado.png", {
          frameWidth: 48,
          frameHeight: 48,
        });
    //
    this.load.spritesheet("player-2", "./assets/player-2/player2.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    /* botões */
    this.load.spritesheet("cima", "./assets/botao/cima.png", {
      frameWidth: 64,
      frameWidth: 64,
    });
    this.load.spritesheet("baixo", "./assets/botao/baixo.png", {
      frameWidth: 64,
      frameWidth: 64,
    });
    this.load.spritesheet("esquerda", "./assets/botao/esquerda.png", {
      frameWidth: 64,
      frameWidth: 64,
    });
    this.load.spritesheet("direita", "./assets/botao/direita.png", {
      frameWidth: 64,
      frameWidth: 64,
    });
  }

  create() {
    // Mapa
    // Tilemap
    /*
    this.mapa_principal_terreo = this.make.tilemap({
      key: "mapa-inicial",
    });
    */
    // Tilesets
    /*
    this.tileset_principal_terreo_parede = this.mapa_inicial.addTilesetImage(
      "tijolos",
      "tijolos"
    );
    // Layer 0: chão
    this.chao = this.mapa_principal_terreo.createLayer(
      "chao",
      this.tileset_principal_terreo_chao,
      0,
      0
    );
*/
    
    this.player_1 = this.physics.add.sprite(200, 225, "player-1");
    //
    this.anims.create({
      key: "player-1-paradocostas",
      frames: this.anims.generateFrameNumbers("player-1-parado", {
        start: 0,
        end: 1
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-paradofrente",
      frames: this.anims.generateFrameNumbers("player-1-parado", {
        start: 2,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-paradoesquerda",
      frames: this.anims.generateFrameNumbers("player-1-parado", {
        start: 4,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-paradodireita",
      frames: this.anims.generateFrameNumbers("player-1-parado", {
        start: 6,
        end: 7,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-frente",
      frames: this.anims.generateFrameNumbers("player-1", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-esquerda",
      frames: this.anims.generateFrameNumbers("player-1", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-direita",
      frames: this.anims.generateFrameNumbers("player-1", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-costas",
      frames: this.anims.generateFrameNumbers("player-1", {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    //
    this.player_2 = this.add.sprite(600, 225, "player-2");
    //

    /* botões */
    this.cima = this.add
      .sprite(120, 330, "cima", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.cima.setFrame(1);
        this.player_1.setVelocityY(-100);
        this.player_1.anims.play("player-1-costas");
      })
      .on("pointerout", () => {
        this.cima.setFrame(0);
        this.player_1.setVelocityY(0);
        this.player_1.anims.play("player-1-paradocostas");
      });

    this.baixo = this.add
      .sprite(120, 400, "baixo", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.baixo.setFrame(1);
        this.player_1.setVelocityY(100);
        this.player_1.anims.play("player-1-paradofrente");
      })
      .on("pointerout", () => {
        this.baixo.setFrame(0);
        this.player_1.setVelocityY(0);
        this.player_1.anims.play("player1-paradofrente");
      });

    this.esquerda = this.add
      .sprite(50, 400, "esquerda", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.esquerda.setFrame(1);
        this.player_1.setVelocityX(-100);
        this.player_1.anims.play("player-1-esquerda");
      })
      .on("pointerout", () => {
        this.esquerda.setFrame(0);
        this.player_1.setVelocityX(0);
        this.player_1.anims.play("player-1-paradoesquerda");
      });

    this.direita = this.add
      .sprite(190, 400, "direita", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.direita.setFrame(1);
        this.player_1.setVelocityX(100);
        this.player_1.anims.play("player-1-direita");
      })
      .on("pointerout", () => {
        this.direita.setFrame(0);
        this.player_1.setVelocityX(0);
        this.player_1.anims.play("player-1-paradodireita");
      });
    
      /* Colisão com os limites da cena */
      this.player_1.setCollideWorldBounds(true);

      /* Cena maior que a tela (800x450) */
      this.cameras.main.setBounds(0, 0, 2496, 640); 
      this.physics.world.setBounds(0, 0, 2496, 640);
      this.cameras.main.startFollow(this.player_1);
  }
  }

