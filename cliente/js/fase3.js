export default class fase3 extends Phaser.Scene {
  constructor() {
    super("fase3");
  }

  preload() {
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON("mapa3", "./assets/mapa3/mapa3.json");

    // Tilesets

    // Mapa 1
    this.load.image("plataforma3", "./assets/mapa3/plataforma3.png");

    // Corpo do player 1
    this.load.spritesheet("player-1", "./assets/player-1/player1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet(
      "player-1-parado",
      "./assets/player-1/player1-parado.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );

    // Corpo do player 2
    this.load.spritesheet("player-2", "./assets/player-2/player2.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet(
      "player-2-parado",
      "./assets/player-2/player2-parado.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );

    // Objetos

    this.load.image("flor-lilas", "./assets/objeto/flor-lilas.png");

    this.load.image("flor-laranja", "./assets/objeto/flor-laranja.png");

    this.load.spritesheet("lava", "./assets/objeto/lava.png", {
      frameWidth: 40,
      frameHeight: 30,
    });

    this.load.spritesheet("bandeira", "./assets/objeto/bandeira.png", {
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

    this.load.spritesheet("tela-cheia", "./assets/botao/tela-cheia.png", {
      frameWidth: 64,
      frameWidth: 64,
    });

    // Sons

    this.load.audio("fairy-tale", "./assets/musica/fairy-tale.mp3");
    this.load.audio("efeito-flor", "./assets/musica/efeito-flor.mp3");
  }

  create() {
    // Trilha sonora
    this.trilha = this.sound.add("fairy-tale");
    this.trilha.play();

    // Efeito sonoro
    this.efeito_flor = this.sound.add("efeito-flor");

    // Mapa3

    // Tilemap

    this.mapa3 = this.make.tilemap({
      key: "mapa3",
    });

    this.tileset_plataforma3 = this.mapa3.addTilesetImage("plataforma3");

    // Layer 0: fundo
    this.fundo = this.mapa3.createLayer(
      "fundo",
      this.tileset_plataforma3,
      0,
      0
    );

    this.plataforma = this.mapa3.createLayer(
      "plataforma",
      this.tileset_plataforma3,
      0,
      0
    );

    // Player 1

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "player-1";
      this.local_parado = "player-1-parado";
      this.player_1 = this.physics.add.sprite(300, 225, this.local);
      this.remoto = "player-2";
      this.remoto_parado = "player-2-parado";
      this.player_2 = this.add.sprite(600, 225, this.remoto);
    } else {
      this.remoto = "player-1";
      this.remoto_parado = "player-1-parado";
      this.player_2 = this.add.sprite(300, 225, this.remoto);
      this.local = "player-2";
      this.local_parado = "player-2-parado";
      this.player_1 = this.physics.add.sprite(600, 225, this.local);
    }

    this.anims.create({
      key: "player-1-paradocostas",
      frames: this.anims.generateFrameNumbers(this.local_parado, {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-paradofrente",
      frames: this.anims.generateFrameNumbers(this.local_parado, {
        start: 2,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-paradoesquerda",
      frames: this.anims.generateFrameNumbers(this.local_parado, {
        start: 4,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-paradodireita",
      frames: this.anims.generateFrameNumbers(this.local_parado, {
        start: 6,
        end: 7,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-frente",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-esquerda",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-direita",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-costas",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    //

    /* Colisões por tile */
    this.plataforma.setCollisionByProperty({ collides: true });

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.physics.add.collider(
      this.player_1,
      this.plataforma,
      this.colidir_mapa,
      null,
      this
    );

    // Animação de lista de flores laranja
    this.flores_laranja = [
      {
        x: 450,
        y: 550,
        objeto: undefined,
      },
      {
        x: 250,
        y: 360,
        objeto: undefined,
      },
      {
        x: 90,
        y: 180,
        objeto: undefined,
      },
      {
        x: 850,
        y: 330,
        objeto: undefined,
      },
      {
        x: 1060,
        y: 480,
        objeto: undefined,
      },
      {
        x: 1550,
        y: 550,
        objeto: undefined,
      },
      {
        x: 850,
        y: 110,
        objeto: undefined,
      },
      {
        x: 2150,
        y: 200,
        objeto: undefined,
      },
      {
        x: 2460,
        y: 350,
        objeto: undefined,
      },
    ];
    this.flores_laranja.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "flor-laranja");
      item.objeto.body.setAllowGravity(false);
      item.objeto.body.setImmovable();
      this.physics.add.overlap(
        this.player_1,
        item.objeto,
        this.pegar_flor_laranja,
        null,
        this
      );
    });

    // Animação da lava - Parte 1
    this.lava = [
      {
        x: 85,
        y: 635,
        objeto: undefined,
      },
      {
        x: 120,
        y: 635,
        objeto: undefined,
      },
      {
        x: 160,
        y: 635,
        objeto: undefined,
      },
      {
        x: 200,
        y: 635,
        objeto: undefined,
      },
      {
        x: 240,
        y: 635,
        objeto: undefined,
      },
      {
        x: 280,
        y: 635,
        objeto: undefined,
      },
      {
        x: 320,
        y: 635,
        objeto: undefined,
      },
      {
        x: 360,
        y: 635,
        objeto: undefined,
      },
      {
        x: 400,
        y: 635,
        objeto: undefined,
      },
      {
        x: 440,
        y: 635,
        objeto: undefined,
      },
      {
        x: 480,
        y: 635,
        objeto: undefined,
      },
      {
        x: 520,
        y: 635,
        objeto: undefined,
      },
      {
        x: 560,
        y: 635,
        objeto: undefined,
      },
      {
        x: 600,
        y: 635,
        objeto: undefined,
      },
      {
        x: 640,
        y: 635,
        objeto: undefined,
      },
      {
        x: 680,
        y: 635,
        objeto: undefined,
      },
      {
        x: 720,
        y: 635,
        objeto: undefined,
      },
      {
        x: 760,
        y: 635,
        objeto: undefined,
      },
      {
        x: 800,
        y: 635,
        objeto: undefined,
      },
      {
        x: 812,
        y: 635,
        objeto: undefined,
      },
      {
        x: 916,
        y: 635,
        objeto: undefined,
      },
      {
        x: 956,
        y: 635,
        objeto: undefined,
      },
      {
        x: 996,
        y: 635,
        objeto: undefined,
      },
      {
        x: 1036,
        y: 635,
        objeto: undefined,
      },
      {
        x: 1076,
        y: 635,
        objeto: undefined,
      },
      {
        x: 1116,
        y: 635,
        objeto: undefined,
      },
      {
        x: 1156,
        y: 635,
        objeto: undefined,
      },
      {
        x: 1196,
        y: 635,
        objeto: undefined,
      },
      {
        x: 1236,
        y: 635,
        objeto: undefined,
      },
      {
        x: 1276,
        y: 635,
        objeto: undefined,
      },
      {
        x: 1316,
        y: 635,
        objeto: undefined,
      },
      {
        x: 1356,
        y: 635,
        objeto: undefined,
      },
    ];

    this.anims.create({
      key: "lava-borbulhando",
      frames: this.anims.generateFrameNumbers("lava", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.lava.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "lava");
      item.objeto.body.setAllowGravity(false);
      item.objeto.body.setImmovable();
      item.objeto.play("lava-borbulhando");
      this.physics.add.collider(
        this.player_1,
        item.objeto,
        this.cair_na_lava,
        null,
        this
      );
    });

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

  update() {
    let frame;
    try {
      frame = this.player_1.anims.getFrameName();
    } catch (e) {
      frame = 0;
    }
    this.game.socket.emit("estado-publicar", this.game.sala, {
      frame: frame,
      x: this.player_1.body.x + 32,
      y: this.player_1.body.y + 32,
    });
  }

  pegar_flor_laranja(jogador, flor) {
    if (this.game.jogadores.primeiro === this.game.socket.id) {
      flor.disableBody(true, true);
      this.efeito_flor.play();
    }
  }

  cair_na_lava() {
    this.game.scene.stop();
  }
}
