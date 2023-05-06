export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    // Tela abertura
    this.load.image("abertura", "./assets/abertura/abertura.png")
  }

  create() {
    this.imagem = this.add.image(400, 225, "abertura")
    this.mensagem = this.add.text(100, 75, "Escolha uma sala para entrar:", {
      fontFamily: "monospace",
      font: "32px Courier",
      fill: "#cccccc",
    });

    this.salas = [
      {
        numero: "0",
        x: 150,
        y: 125,
        botao: undefined,
      },
      {
        numero: "1",
        x: 150,
        y: 175,
        botao: undefined,
      },
      {
        numero: "2",
        x: 150,
        y: 225,
        botao: undefined,
      },
      {
        numero: "3",
        x: 150,
        y: 275,
        botao: undefined,
      },
      {
        numero: "4",
        x: 150,
        y: 325,
        botao: undefined,
      },
      {
        numero: "5",
        x: 450,
        y: 125,
        botao: undefined,
      },
      {
        numero: "6",
        x: 450,
        y: 175,
        botao: undefined,
      },
      {
        numero: "7",
        x: 450,
        y: 225,
        botao: undefined,
      },
      {
        numero: "8",
        x: 450,
        y: 275,
        botao: undefined,
      },
      {
        numero: "9",
        x: 450,
        y: 325,
        botao: undefined,
      },
    ];

    this.salas.forEach((item) => {
      item.botao = this.add
        .text(item.x, item.y, "[Sala " + item.numero + "]", {
          fontFamily: "monospace",
          font: "32px Courier",
          fill: "#cccccc",
        })
        .setInteractive()
        .on("pointerdown", () => {
          this.salas.forEach((item) => {
            item.botao.destroy();
          });
          this.game.sala = item.numero;
          this.game.socket.emit("entrar-na-sala", this.game.sala);
        });
    });

    this.game.socket.on("jogadores", (jogadores) => {
      if (jogadores.segundo) {
        this.mensagem.destroy();
        this.game.jogadores = jogadores;
        this.game.scene.start("principal");
      } else if (jogadores.primeiro) {
        this.grade.destroy();
        this.imagem.destroy();
        this.mensagem.setText("Aguardando segundo jogador...");
      }
    });
  }

  upload() {}
}

