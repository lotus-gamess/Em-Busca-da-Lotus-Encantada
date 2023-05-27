export default class fase1 extends Phaser.Scene {
  constructor() {
    super("fase1");
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

    // Corpo do player 2
    this.load.spritesheet("player-2", "./assets/player-2/player2.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    // Objetos

    this.load.image("flor-lilas", "./assets/objeto/flor-lilas.png");

    this.load.image("flor-laranja", "./assets/objeto/flor-laranja.png");

    this.load.spritesheet("lava", "./assets/objeto/lava.png", {
      frameWidth: 40,
      frameHeight: 30,
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

    // Mapa1

    // Tilemap

    this.mapa1 = this.make.tilemap({
      key: "mapa1",
    });

    this.tileset_plataforma5 = this.mapa1.addTilesetImage("plataforma5");

    // Layer 0: fundo
    this.fundo = this.mapa1.createLayer(
      "fundo",
      this.tileset_plataforma5,
      0,
      0
    );

    this.plataforma = this.mapa1.createLayer(
      "plataforma",
      this.tileset_plataforma5,
      0,
      0
    );

    // Player 1

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "player-1";
      this.player_1 = this.physics.add.sprite(150, 520, this.local);
      this.remoto = "player-2";
      this.player_2 = this.add.sprite(200, 520, this.remoto);
    } else {
      this.remoto = "player-1";
      this.player_2 = this.add.sprite(150, 520, this.remoto);
      this.local = "player-2";
      this.player_1 = this.physics.add.sprite(200, 520, this.local);

      /* Captura de áudio */
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          console.log(stream);

          /* Consulta ao(s) servidor(es) ICE */
          this.game.localConnection = new RTCPeerConnection(
            this.game.ice_servers
          );

          /* Associação de mídia com conexão remota */
          stream
            .getTracks()
            .forEach((track) =>
              this.game.localConnection.addTrack(track, stream)
            );

          /* Oferta de candidatos ICE */
          this.game.localConnection.onicecandidate = ({ candidate }) => {
            candidate &&
              this.game.socket.emit("candidate", this.game.sala, candidate);
          };

          /* Associação com o objeto HTML de áudio */
          this.game.localConnection.ontrack = ({ streams: [stream] }) => {
            this.game.audio.srcObject = stream;
          };

          /* Oferta de mídia */
          this.game.localConnection
            .createOffer()
            .then((offer) =>
              this.game.localConnection.setLocalDescription(offer)
            )
            .then(() => {
              this.game.socket.emit(
                "offer",
                this.game.sala,
                this.game.localConnection.localDescription
              );
            });

          this.game.midias = stream;
        })
        .catch((error) => console.log(error));
    }

    /* Recebimento de oferta de mídia */
    this.game.socket.on("offer", (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.ice_servers);

      /* Associação de mídia com conexão remota */
      this.game.midias
        .getTracks()
        .forEach((track) =>
          this.game.remoteConnection.addTrack(track, this.game.midias)
        );

      /* Contraoferta de candidatos ICE */
      this.game.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          this.game.socket.emit("candidate", this.game.sala, candidate);
      };

      /* Associação com o objeto HTML de áudio */
      let midias = this.game.midias;
      this.game.remoteConnection.ontrack = ({ streams: [midias] }) => {
        this.game.audio.srcObject = this.game.midias;
      };

      /* Contraoferta de mídia */
      this.game.remoteConnection
        .setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) =>
          this.game.remoteConnection.setLocalDescription(answer)
        )
        .then(() => {
          this.game.socket.emit(
            "answer",
            this.game.sala,
            this.game.remoteConnection.localDescription
          );
        });
    });

    /* Recebimento de contraoferta de mídia */
    this.game.socket.on("answer", (description) => {
      this.game.localConnection.setRemoteDescription(description);
    });

    /* Recebimento de candidato ICE */
    this.game.socket.on("candidate", (candidate) => {
      let conn = this.game.localConnection || this.game.remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });

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

    this.anims.create({
      key: "player-1-paradofrente",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 2,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

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
        x: 580,
        y: 340,
        objeto: undefined,
      },
      {
        x: 90,
        y: 240,
        objeto: undefined,
      },
      {
        x: 295,
        y: 205,
        objeto: undefined,
      },
      {
        x: 850,
        y: 330,
        objeto: undefined,
      },
      {
        x: 1152,
        y: 400,
        objeto: undefined,
      },
      {
        x: 1535,
        y: 200,
        objeto: undefined,
      },
      {
        x: 1660,
        y: 550,
        objeto: undefined,
      },
      {
        x: 2460,
        y: 550,
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

    // Animação de lista de flores lilás
    this.flores_lilas = [
      {
        x: 770,
        y: 550,
        objeto: undefined,
      },
      {
        x: 1540,
        y: 550,
        objeto: undefined,
      },
      {
        x: 1250,
        y: 305,
        objeto: undefined,
      },
      {
        x: 870,
        y: 100,
        objeto: undefined,
      },
      {
        x: 1600,
        y: 100,
        objeto: undefined,
      },
      {
        x: 1660,
        y: 238,
        objeto: undefined,
      },
      {
        x: 2238,
        y: 135,
        objeto: undefined,
      },
      {
        x: 1850,
        y: 400,
        objeto: undefined,
      },
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
        x: 883,
        y: 598,
        objeto: undefined,
      },
      {
        x: 920,
        y: 598,
        objeto: undefined,
      },
      {
        x: 941,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1139,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1176,
        y: 598,
        objeto: undefined,
      },
      {
        x: 1197,
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
          }
        }
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
          }
        }
      }
    });
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
      x: this.player_1.body.x,
      y: this.player_1.body.y,
    });
  }

  pegar_flor_laranja(jogador, flor) {
    if (this.game.jogadores.primeiro === this.game.socket.id) {
      flor.disableBody(true, true);
      this.efeito_flor.play();
      this.game.socket.emit("artefatos-publicar", this.game.sala, {
        laranja: this.flores_laranja.map((flor) => flor.objeto.visible),
      });
    }
  }

  pegar_flor_lilas(jogador, flor) {
    if (this.game.jogadores.segundo === this.game.socket.id) {
      flor.disableBody(true, true);
      this.efeito_flor.play();
      this.game.socket.emit("artefatos-publicar", this.game.sala, {
        lilas: this.flores_lilas.map((flor) => flor.objeto.visible),
      });
    }
  }

  cair_na_lava() {
    this.game.scene.stop();
  }
}
