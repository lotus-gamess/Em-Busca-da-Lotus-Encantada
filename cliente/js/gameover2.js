export default class gameover2 extends Phaser.Scene {
  constructor() {
    super("gameover2");
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
        this.game.scene.start("fase2");
      });
  }
  upload() {}
}
