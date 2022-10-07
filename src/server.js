import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({
  server,
});

const sockets = [];

wss.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";
  sockets.push(socket);

  console.log("Connection to the Browser: ✅");

  socket.on("close", () => {
    console.log("Connection to the Browser: ❌");
  });

  socket.on("message", (message) => {
    const { type, payload } = JSON.parse(message.toString());

    switch (type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = payload;
        break;
    }
  });
});

server.listen(3000, handleListen);
