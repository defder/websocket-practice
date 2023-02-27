import * as express from "express";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 3000);

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./src/client/index.html"));
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("message", (message: any) => {
    console.log(message);
  });

  setInterval(() => {
    io.emit('pingForUpdate', 'Pinging client for info');
  }, 5000);

  socket.on("updateServer", (update: any) => {
    console.log(`Update received from client ${update}`);
  });
});

const server = http.listen(3000, () => {
  console.log("Listening on *:3000");
});