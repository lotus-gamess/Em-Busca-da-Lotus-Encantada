import config from "./config.js";

import abertura from "./cena-abertura.js";
import sala from "./cena-sala.js";
import principal from "./cena-principal.js";
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
    this.scene.add("fase3", fase3);
    this.scene.add("principal", principal);
    //this.scene.add("encerramento", game_over);
    //this.scene.add("encerramento", fim_feliz);

    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
