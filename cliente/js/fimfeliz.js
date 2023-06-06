export default class fimfeliz extends Phaser.Scene {
  constructor() {
    super("fimfeliz");
  }

  preload() {
    // Tela final feliz
    this.load.image("fimfeliz", "./assets/fim/fimfeliz.png");
  }

  create() {
    this.imagem = this.add
      .image(400, 225, "fimfeliz")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.game.scene.start("abertura");
      });
  }
  upload() {}
}
