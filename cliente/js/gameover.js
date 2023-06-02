export default class fim_do_jogo extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  preload() {
    this.load.image("gameover", "./asset/fim/gameover.png");
  }

  create() {
    this.imagem = this.add
      .image(400, 225, "gameover")
      .setTint(0xff0000)
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.texto.destroy();
        this.game.scene.start("fase1");
      });
  }

  upload() {}
}
