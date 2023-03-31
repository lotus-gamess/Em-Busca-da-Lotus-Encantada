export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    this.load.image("teste.webp", "./assets/teste/teste.webp");
  }

  create() {
    this.imagem = this.add
      .image(400, 225, "teste.webp")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.texto.destroy();
        this.game.scene.start("principal");
      });

    this.texto = this.add.text(490, 50, "Clique no prédio para entrar...", {
      fill: "#000000",
    });
  }

  upload() {}
}
