export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    // Tela abertura
    this.load.image("abertura", "./assets/abertura/abertura.png");
  }

  create() {
    this.imagem = this.add
      .image(400, 225, "abertura")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.game.scene.start("sala");
      });
  }
  upload() {}
}
