import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSockets: Map<string, WebSocket[]> = new Map();

wss.on("connection", (socket) => {
  socket.on("error", (e) => console.log(e.message));

  socket.on("message", (e) => {
    const parsedEvent = JSON.parse(e as unknown as string);

    if (parsedEvent.type === "join") {
      if (allSockets.get(parsedEvent.payload.roomId)) {
        allSockets.get(parsedEvent.payload.roomId)?.push(socket);
      } else {
        allSockets.set(parsedEvent.payload.roomId, [socket]);
      }
    }

    if (parsedEvent.type === "chat") {
      const socketsToSend = allSockets
        .get(parsedEvent.payload?.roomId)
        ?.filter((s) => s !== socket);
      socketsToSend?.forEach((s) => s.send(parsedEvent.payload.message));
    }
  });

  socket.on("close", (e) => {
    const parsedEvent = JSON.parse(e.toString());
    const updatedSockets = allSockets
      .get(parsedEvent.payload?.roomId)
      ?.filter((x) => x !== socket);

    if (!updatedSockets?.length) allSockets.delete(parsedEvent.payload.roomId);
    else allSockets.set(parsedEvent.payload?.roomId, updatedSockets);
  });
});

//! Global Broadcasting Chat
// let userCount = 0;
// let allSockets: WebSocket[] = [];

// wss.on("connection", (ws) => {
//   allSockets.push(ws);
//   ws.on("error", (e) => console.log(e.message));
//   userCount++;
//   console.log(`${userCount} user(s) connected`);

//   ws.on("message", (message) => {
//     console.log(message.toString());
//     allSockets.forEach((s) => s.send(message.toString()));
//   });

//   ws.on("close", () => {
//     allSockets = allSockets.filter((s) => s !== ws);
//     userCount--;
//   });
// });
