export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON("mapa1", "./assets/mapa1/mapa1.json");

    // Tilesets

    // Mapa 1
    this.load.image("plataforma5", "./assets/mapa1/plataforma5.png");

    // Corpo do player 1
    this.load.spritesheet("player-1", "./assets/player-1/player1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("player-1-parado", "./assets/player-1/player1-parado.png", {
          frameWidth: 48,
          frameHeight: 48,
    });
    
    // Corpo do player 2
    this.load.spritesheet("player-2", "./assets/player-2/player2.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    // Botões 
    
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

    // Mapa1

    // Tilemap
    
    this.mapa1 = this.make.tilemap({
      key: "mapa1",
    });
    
    this.tileset_plataforma5 = this.mapa1.addTilesetImage(
      "platformertiles",
      "plataforma5"
    );

    // Layer 0: fundo
    this.fundo = this.mapa1.createLayer(
      "platformertiles",
      this.tileset_plataforma5,
      0,
      0
    );
    
    // Player 1 - animações

    this.player_1 = this.physics.add.sprite(200, 225, "player-1");
    
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

    // Botões //

    this.cima = this.add
      .sprite(700, 360, "cima", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.cima.setFrame(1);
        this.player_1.setVelocityY(-300);
        this.player_1.anims.play("player-1-costas");
      })
      .on("pointerout", () => {
        this.cima.setFrame(0);
        this.player_1.setVelocityY(0);
        this.player_1.anims.play("player-1-paradocostas");
      })
      .setScrollFactor(0);

    this.esquerda = this.add
      .sprite(665, 400, "esquerda", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.esquerda.setFrame(1);
        this.player_1.setVelocityX(-200);
        this.player_1.anims.play("player-1-esquerda");
      })
      .on("pointerout", () => {
        this.esquerda.setFrame(0);
        this.player_1.setVelocityX(0);
        this.player_1.anims.play("player-1-paradoesquerda");
      })
      .setScrollFactor(0);

    this.direita = this.add
      .sprite(735, 400, "direita", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.direita.setFrame(1);
        this.player_1.setVelocityX(200);
        this.player_1.anims.play("player-1-direita");
      })
      .on("pointerout", () => {
        this.direita.setFrame(0);
        this.player_1.setVelocityX(0);
        this.player_1.anims.play("player-1-paradodireita");
      })
      .setScrollFactor(0);
    
    this.tela_cheia = this.add
      .sprite(750, 50, "tela-cheia", 0)
      .setInteractive()
      .on("pointerdown", () => {
        if (this.scale.isFullscreen) {
          this.tela_cheia.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          this.tela_cheia.setFrame(1);
          this.scale.startFullscreen();
        }
      })
      .setScrollFactor(0);
    
      /* Colisão com os limites da cena */
      this.player_1.setCollideWorldBounds(true);

      /* Cena maior que a tela (800x450) */
      this.cameras.main.setBounds(0, 0, 2496, 640); 
      this.physics.world.setBounds(0, 0, 2496, 640);
      this.cameras.main.startFollow(this.player_1);
  }
  }

