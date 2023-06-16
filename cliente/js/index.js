import config from "./config.js";
import abertura from "./cena-abertura.js";
import sala from "./cena-sala.js";
import fase1 from "./fase1.js";
import fase2 from "./fase2.js";
import fase3 from "./fase3.js";
import gameover from "./gameover.js";
import gameover2 from "./gameover2.js";
import gameover3 from "./gameover3.js";
import fimfeliz from "./fimfeliz.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    let iceServers;
    if (window.location.host === "ifsc.digital") {
      this.socket = io.connect({
        path: "/Em-busca-das-flores-magicas/socket.io/",
      });

      iceServers = [
        {
          urls: "stun:ifsc.digital",
        },
        {
          urls: "turns:ifsc.digital",
          username: "Em-busca-das-flores-magicas",
          credential: "Em-busca-das-flores-magicas",
        },
      ];
    } else {
      this.socket = io();

      iceServers = [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ];
    }
    this.ice_servers = { iceServers };
    this.audio = document.querySelector("audio");

    this.socket.on("connect", () => {
      console.log("Conectado ao servidor para troca de mensagens.");
    });

    this.scene.add("abertura", abertura);
    this.scene.add("sala", sala);
    this.scene.add("fase1", fase1);
    this.scene.add("fase2", fase2);
    this.scene.add("fase3", fase3);
    this.scene.add("gameover", gameover);
    this.scene.add("gameover2", gameover2);
    this.scene.add("gameover3", gameover3);
    this.scene.add("fimfeliz", fimfeliz);

    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
