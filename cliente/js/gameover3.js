export default class gameover3 extends Phaser.Scene {
  constructor() {
    super("gameover3");
  }

  preload() {
    // Tela game over
    this.load.image("gameover", "./assets/fim/gameover.png");
  }

  create() {
    this.imagem = this.add
      .image(400, 225, "gameover")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.game.scene.start("fase3");
      });
  }
  upload() {}
}
