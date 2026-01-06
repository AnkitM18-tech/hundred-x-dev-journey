import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");
  setInterval(() => {
    ws.send("Current time is " + new Date().toISOString());
  }, 1000);

  ws.on("message", (message) => {
    console.log(message.toString());
  });
});
