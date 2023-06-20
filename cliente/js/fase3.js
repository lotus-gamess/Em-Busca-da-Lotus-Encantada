export default class fase3 extends Phaser.Scene {
  constructor() {
    super("fase3");
  }

  preload() {
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON("mapa3", "./assets/mapa3/mapa3.json");

    // Tilesets

    // Mapa 3
    this.load.image("plataforma3", "./assets/mapa3/plataforma3.png");

    // Corpo do player 1
    this.load.spritesheet("player-1", "./assets/player-1/player1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    // Corpo do player 2
    this.load.spritesheet("player-2", "./assets/player-2/player2.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    // Objetos

    this.load.image("flor-lilas", "./assets/objeto/flor-lilas.png");

    this.load.image("flor-laranja", "./assets/objeto/flor-laranja.png");

    this.load.image("gameover", "./assets/fim/gameover.png");

    this.load.spritesheet("lava", "./assets/objeto/lava.png", {
      frameWidth: 40,
      frameHeight: 30,
    });

    this.load.spritesheet("porta3", "./assets/mapa3/porta3.png", {
      frameWidth: 100,
      frameHeight: 120,
    });

    // Botões

    this.load.spritesheet("cima", "./assets/botao/cima.png", {
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
    this.flores_laranja_coletadas = 0;
    this.flores_lilas_coletadas = 0;

    // Trilha sonora
    this.trilha = this.sound.add("fairy-tale");
    this.trilha.play();

    // Efeito sonoro
    this.efeito_flor = this.sound.add("efeito-flor");

    // Mapa 3

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

    this.porta = this.physics.add.sprite(1024, 168, "porta3", 0);
    this.porta.body.setAllowGravity(false);
    this.porta.body.setImmovable(true);

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "player-1";
      this.player_1 = this.physics.add.sprite(90, 392, this.local);
      this.remoto = "player-2";
      this.player_2 = this.add.sprite(125, 392, this.remoto);
    } else {
      this.remoto = "player-1";
      this.player_2 = this.add.sprite(90, 392, this.remoto);
      this.local = "player-2";
      this.player_1 = this.physics.add.sprite(125, 392, this.local);
    }

    this.anims.create({
      key: "player-1-paradofrente",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-paradocostas",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 2,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-paradoesquerda",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 4,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-paradodireita",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 6,
        end: 7,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-frente",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 8,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-esquerda",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 11,
        end: 13,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-direita",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 14,
        end: 16,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-1-costas",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 17,
        end: 20,
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
        x: 241,
        y: 320,
        objeto: undefined,
      } /*
      {
        x: 1250,
        y: 450,
        objeto: undefined,
      },
      {
        x: 1710,
        y: 450,
        objeto: undefined,
      },
      {
        x: 2272,
        y: 450,
        objeto: undefined,
      },
      {
        x: 1472,
        y: 200,
        objeto: undefined,
      },
      {
        x: 1983,
        y: 200,
        objeto: undefined,
      },
      {
        x: 2460,
        y: 100,
        objeto: undefined,
      },
      {
        x: 2460,
        y: 550,
        objeto: undefined,
      },*/,
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

    // Animação de lista de flores lilás
    this.flores_lilas = [
      {
        x: 560,
        y: 320,
        objeto: undefined,
      } /*
      {
        x: 1025,
        y: 450,
        objeto: undefined,
      },
      {
        x: 2030,
        y: 450,
        objeto: undefined,
      },
      {
        x: 1870,
        y: 320,
        objeto: undefined,
      },
      {
        x: 1630,
        y: 100,
        objeto: undefined,
      },
      {
        x: 2272,
        y: 200,
        objeto: undefined,
      },
      {
        x: 2465,
        y: 420,
        objeto: undefined,
      },*/,
    ];
    this.flores_lilas.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "flor-lilas");
      item.objeto.body.setAllowGravity(false);
      item.objeto.body.setImmovable();
      this.physics.add.overlap(
        this.player_1,
        item.objeto,
        this.pegar_flor_lilas,
        null,
        this
      );
    });

    // Animação da lava
    this.lava = [
      {
        x: 84,
        y: 598,
        objeto: undefined,
      },
      {
        x: 124,
        y: 598,
        objeto: undefined,
      },
      {
        x: 164,
        y: 598,
        objeto: undefined,
      },
      {
        x: 204,
        y: 598,
        objeto: undefined,
      },
      {
        x: 244,
        y: 598,
        objeto: undefined,
      },
      {
        x: 284,
        y: 598,
        objeto: undefined,
      },
      {
        x: 324,
        y: 598,
        objeto: undefined,
      },
      {
        x: 364,
        y: 598,
        objeto: undefined,
      },
      {
        x: 404,
        y: 598,
        objeto: undefined,
      },
      {
        x: 444,
        y: 598,
        objeto: undefined,
      },
      {
        x: 484,
        y: 598,
        objeto: undefined,
      },
      {
        x: 524,
        y: 598,
        objeto: undefined,
      },
      {
        x: 564,
        y: 598,
        objeto: undefined,
      },
      {
        x: 604,
        y: 598,
        objeto: undefined,
      },
      {
        x: 644,
        y: 598,
        objeto: undefined,
      },
      {
        x: 684,
        y: 598,
        objeto: undefined,
      },
      {
        x: 724,
        y: 598,
        objeto: undefined,
      },
      {
        x: 764,
        y: 598,
        objeto: undefined,
      },
      {
        x: 804,
        y: 598,
        objeto: undefined,
      },
      {
        x: 812,
        y: 598,
        objeto: undefined,
      },
      {
        x: 916,
        y: 598,
        objeto: undefined,
      },
      {
        x: 956,
        y: 598,
        objeto: undefined,
      },
      {
        x: 996,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1036,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1076,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1116,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1156,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1196,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1236,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1276,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1316,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1356,
        y: 598,
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
      .sprite(700, 365, "cima", 0)
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
      .sprite(658, 410, "esquerda", 0)
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
      .sprite(742, 410, "direita", 0)
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

    this.game.socket.on("estado-notificar", ({ frame, x, y }) => {
      this.player_2.setFrame(frame);
      this.player_2.x = x + 24;
      this.player_2.y = y + 24;
    });

    this.game.socket.on("artefatos-notificar", (artefatos) => {
      let coletadas = 0;
      if (artefatos.laranja) {
        for (let i = 0; i < artefatos.laranja.length; i++) {
          if (artefatos.laranja[i]) {
            this.flores_laranja[i].objeto.enableBody(
              false,
              this.flores_laranja[i].x,
              this.flores_laranja[i].y,
              true,
              true
            );
          } else {
            this.flores_laranja[i].objeto.disableBody(true, true);
            coletadas += 1;
          }
        }
        this.flores_laranja_coletadas = coletadas;
      } else if (artefatos.lilas) {
        for (let i = 0; i < artefatos.lilas.length; i++) {
          if (artefatos.lilas[i]) {
            this.flores_lilas[i].objeto.enableBody(
              false,
              this.flores_lilas[i].x,
              this.flores_lilas[i].y,
              true,
              true
            );
          } else {
            this.flores_lilas[i].objeto.disableBody(true, true);
            coletadas += 1;
          }
        }
        this.flores_lilas_coletadas = coletadas;
      }

      if (
        this.flores_laranja_coletadas === this.flores_laranja.length &&
        this.flores_lilas_coletadas === this.flores_lilas.length
      ) {
        this.porta.setFrame(1);
        this.physics.add.collider(
          this.player_1,
          this.porta,
          this.passar_de_fase,
          null,
          this
        );
      }
    });

    this.game.socket.on("cena-notificar", (cena) => {
      this.game.scene.stop("fase1");
      this.game.scene.start(cena);
    });
  }

  update() {
    try {
      this.game.socket.emit("estado-publicar", this.game.sala, {
        frame: this.player_1.anims.getFrameName(),
        x: this.player_1.body.x,
        y: this.player_1.body.y,
      });
    } catch (e) {
      console.log(e);
    }
    console.log(this.flores_laranja_coletadas, this.flores_lilas_coletadas);
  }

  pegar_flor_laranja(jogador, flor) {
    if (this.game.jogadores.primeiro === this.game.socket.id) {
      flor.disableBody(true, true);
      this.efeito_flor.play();
      this.game.socket.emit("artefatos-publicar", this.game.sala, {
        laranja: this.flores_laranja.map((flor) => flor.objeto.visible),
      });
      this.flores_laranja_coletadas += 1;

      if (
        this.flores_laranja_coletadas === this.flores_laranja.length &&
        this.flores_lilas_coletadas === this.flores_lilas.length
      ) {
        this.porta.setFrame(1);
        this.physics.add.collider(
          this.player_1,
          this.porta,
          this.passar_de_fase,
          null,
          this
        );
      }
    }
  }

  pegar_flor_lilas(jogador, flor) {
    if (this.game.jogadores.segundo === this.game.socket.id) {
      flor.disableBody(true, true);
      this.efeito_flor.play();
      this.game.socket.emit("artefatos-publicar", this.game.sala, {
        lilas: this.flores_lilas.map((flor) => flor.objeto.visible),
      });
      this.flores_lilas_coletadas += 1;

      if (
        this.flores_laranja_coletadas === this.flores_laranja.length &&
        this.flores_lilas_coletadas === this.flores_lilas.length
      ) {
        this.porta.setFrame(1);
        this.physics.add.collider(
          this.player_1,
          this.porta,
          this.passar_de_fase,
          null,
          this
        );
      }
    }
  }

  cair_na_lava() {
    this.game.scene.stop("fase3");
    this.game.scene.start("gameover3");
    this.game.socket.emit("cena-publicar", this.game.sala, "gameover3");
  }

  passar_de_fase(jogador, porta) {
    this.game.scene.stop("fase3");
    this.game.scene.start("fimfeliz");
    this.game.socket.emit("cena-publicar", this.game.sala, "fimfeliz");
  }
}