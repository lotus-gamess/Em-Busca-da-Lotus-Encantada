import config from "./config.js";

import abertura from "./cena-abertura.js";
import sala from "./cena-sala.js";
import fase1 from "./fase1.js";
import fase2 from "./fase2.js";
import fase3 from "./fase3.js";
// import game_over from "./cena-game-over.js";
// import fim_feliz from "./cena-fim-feliz.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.socket = io();
    this.socket.on("connect", () => {
      console.log("Conectado ao servidor para troca de mensagens.");
    });

    this.scene.add("abertura", abertura);
    this.scene.add("sala", sala);
    this.scene.add("fase1", fase1);
    this.scene.add("fase2", fase2);
    this.scene.add("fase3", fase3);
    //this.scene.add("encerramento", game_over);
    //this.scene.add("encerramento", fim_feliz);

    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
