import config from "./config.js";

import abertura from "./cena-abertura.js";
// import principal from "./cena-principal.js";
// import game_over from "./cena-game-over.js";
// import fim_feliz from "./cena-fim-feliz.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    
    this.scene.add("abertura", abertura);
    //this.scene.add("principal", principal);
    //this.scene.add("encerramento", game_over);
    //this.scene.add("encerramento", fim_feliz);

    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
