export default class fimfeliz extends Phaser.Scene {
  constructor() {
    super("fimfeliz");
  }

  preload() {
    this.load.image("fimfeliz", "./assets/final/fimfeliz.png");
  }

  create() {
    this.imagem = this.add
      .image(800, 450, "fimfeliz")
      .setTint(0xffff00)
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.texto.destroy();
        this.game.scene.start("abertura");
      });
  }

  upload() {}
}
