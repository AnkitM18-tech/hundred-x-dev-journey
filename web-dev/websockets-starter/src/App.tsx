import { useEffect, useRef, useState } from "react";

function App() {
  const [socket, setSocket] = useState<WebSocket>();
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId: "1" },
        })
      );
    };

    ws.onmessage = (e) => {
      setReceivedMessages((messages) => [...messages, e.data]);
    };
    return () => ws.close();
  }, []);

  function sendMessage() {
    setSentMessages((m) => [...m, inputRef.current?.value as string]);
    socket?.send(
      JSON.stringify({
        type: "chat",
        payload: { message: inputRef.current?.value, roomId: "1" },
      })
    );
  }

  return (
    <div className="h-screen bg-linear-to-t from-indigo-300 to-indigo-500">
      <div className="h-96 w-11/12 md:max-w-1/2 border-2 border-indigo-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
        <h1 className="text-xl font-bold text-center my-2 border-b-2">
          WS Chat
        </h1>
        <div className="fixed h-3/5 max-h-4/5 w-full overflow-y-scroll">
          {receivedMessages.map((m, index) => (
            <div
              key={index}
              className="my-2 mx-2 px-2 py-1 bg-amber-200 rounded-md text-start"
            >
              {m}
            </div>
          ))}
          {/* {sentMessages.map((m, index) => (
            <div
              key={index}
              className="my-2 px-2 py-1 mx-2 bg-indigo-200 rounded-md text-end"
            >
              {m}
            </div>
          ))} */}
        </div>
        <div className="flex w-full absolute z-10 bottom-0 justify-between">
          <input
            type="text"
            placeholder="Type your message..."
            ref={inputRef}
            className=" w-3/4 md:w-11/12 font-bold focus:outline-none px-4 py-2 border-t-2 border-r-2 border-indigo-950"
          />
          <button
            className="text-2xl w-1/4 md:w-1/12 border-t-2 cursor-pointer"
            onClick={sendMessage}
          >
            ↗
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
