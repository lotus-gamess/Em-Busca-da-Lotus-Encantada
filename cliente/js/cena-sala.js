export default class sala extends Phaser.Scene {
  constructor() {
    super("sala");
  }

  preload() {
    this.load.image("sala", "./assets/abertura/sala.png");
    this.load.image("grade", "./assets/grade.png");
    this.load.image("sala1", "./assets/botao-sala/sala1.png");
    this.load.image("sala2", "./assets/botao-sala/sala2.png");
    this.load.image("sala3", "./assets/botao-sala/sala3.png");
    this.load.image("sala4", "./assets/botao-sala/sala4.png");
    this.load.image("sala5", "./assets/botao-sala/sala5.png");
    this.load.image("sala6", "./assets/botao-sala/sala6.png");
    this.load.image("sala7", "./assets/botao-sala/sala7.png");
    this.load.image("sala8", "./assets/botao-sala/sala8.png");
    this.load.image("sala9", "./assets/botao-sala/sala9.png");
    this.load.image("sala10", "./assets/botao-sala/sala10.png");
    
  }

  create() {
    this.imagem = this.add.image(400, 225, "sala").setTint(0x666666);
    this.grade = this.add.tileSprite(400, 225, 500, 350, "grade");
    this.mensagem = this.add.text(100, 75, "       Escolha uma sala:", {
      fontFamily: "monospace",
      font: "32px Courier",
      fill: "#cccccc",
    });
    this.salas = [
      {
        numero: "0",
        x: 320,
        y: 140,
        image: "sala1",
        botao: undefined,
      },
      {
        numero: "1",
        x: 320,
        y: 190,
        image: "sala2",
        botao: undefined,
      },
      {
        numero: "2",
        x: 320,
        y: 240,
        image: "sala3",
        botao: undefined,
      },
      {
        numero: "3",
        x: 320,
        y: 290,
        image: "sala4",
        botao: undefined,
      },
      {
        numero: "4",
        x: 320,
        y: 340,
        image: "sala5",
        botao: undefined,
      },
      {
        numero: "5",
        x: 480,
        y: 140,
        image: "sala6",
        botao: undefined,
      },
      {
        numero: "6",
        x: 480,
        y: 190,
        image: "sala7",
        botao: undefined,
      },
      {
        numero: "7",
        x: 480,
        y: 240,
        image: "sala8",
        botao: undefined,
      },
      {
        numero: "8",
        x: 480,
        y: 290,
        image: "sala9",
        botao: undefined,
      },
      {
        numero: "9",
        x: 480,
        y: 340,
        image: "sala10",
        botao: undefined,
      },
    ];

    this.salas.forEach((item) => {
      item.botao = this.add
        .image(item.x, item.y, item.image, {
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
      console.log(jogadores);
      if (jogadores.segundo) {
        this.mensagem.destroy();
        this.game.jogadores = jogadores;
        this.game.scene.start("fase1");
      } else if (jogadores.primeiro) {
        this.grade.destroy();
        this.imagem.destroy();
        this.mensagem.setText("Aguardando segundo jogador...");

        /* Captura de áudio */
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            console.log(stream);
            this.game.midias = stream;
          })
          .catch((error) => console.log(error));
      }
    });
  }

  upload() {}
}
