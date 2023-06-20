const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("Usuário %s conectado no servidor.", socket.id);

  socket.on("entrar-na-sala", (sala) => {
    socket.join(sala);
    console.log("Usuário %s entrou na sala %s.", socket.id, sala);

    var jogadores = {};
    if (io.sockets.adapter.rooms.get(sala).size === 1) {
      jogadores = {
        primeiro: socket.id,
        segundo: undefined,
      };
    } else if (io.sockets.adapter.rooms.get(sala).size === 2) {
      let [primeiro] = io.sockets.adapter.rooms.get(sala);
      jogadores = {
        primeiro: primeiro,
        segundo: socket.id,
      };
      console.log(
        "Sala %s com 2 jogadores. Partida pronta para iniciar.",
        sala
      );
    }

    io.to(sala).emit("jogadores", jogadores);
  });

  socket.on("disconnect", () => {});

  /* Fase 1 */
  socket.on("estado-publicar-fase1", (sala, estado) => {
    socket.broadcast.to(sala).emit("estado-notificar-fase1", estado);
  });

  socket.on("artefatos-publicar-fase1", (sala, artefatos) => {
    socket.broadcast.to(sala).emit("artefatos-notificar-fase1", artefatos);
  });

  socket.on("cena-publicar-fase1", (sala, cena) => {
    socket.broadcast.to(sala).emit("cena-notificar-fase1", cena);
  });

  socket.on("offer", (sala, description) => {
    socket.broadcast.to(sala).emit("offer", description);
  });

  socket.on("candidate", (sala, candidate) => {
    socket.broadcast.to(sala).emit("candidate", candidate);
  });

  socket.on("answer", (sala, description) => {
    socket.broadcast.to(sala).emit("answer", description);
  });

  /* Fase 2 */
  socket.on("estado-publicar-fase2", (sala, estado) => {
    socket.broadcast.to(sala).emit("estado-notificar-fase2", estado);
  });

  socket.on("artefatos-publicar-fase2", (sala, artefatos) => {
    socket.broadcast.to(sala).emit("artefatos-notificar-fase2", artefatos);
  });

  socket.on("cena-publicar-fase2", (sala, cena) => {
    socket.broadcast.to(sala).emit("cena-notificar-fase", cena);
  });

  /* Fase 3 */
  socket.on("estado-publicar-fase3", (sala, estado) => {
    socket.broadcast.to(sala).emit("estado-notificar-fase3", estado);
  });

  socket.on("artefatos-publicar-fase3", (sala, artefatos) => {
    socket.broadcast.to(sala).emit("artefatos-notificar-fase3", artefatos);
  });

  socket.on("cena-publicar-fase3", (sala, cena) => {
    socket.broadcast.to(sala).emit("cena-notificar-fase3", cena);
  });
});


app.use(express.static("../cliente/"));
server.listen(PORT, () =>
  console.log(`Servidor em execução na porta ${PORT}!`)
);
