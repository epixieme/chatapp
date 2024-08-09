import React, { useEffect, useState } from "react";
import "../App.css";
import { socket } from "../socket";

export function ChatApp() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  // Use useEffect to listen for incoming messages
  useEffect(() => {
    // client gets the broadcast meessage from the server
    socket.on("chat message", (msg: string) => {
      setMessages((prevMessages): any => [...prevMessages, msg]);
    });

    // Clean up the event listener when the component is unmounted
    return () => {
      socket.off("chat message");
    };
  }, []);

  function onSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);
    // sends to server
    socket.timeout(5000).emit("chat message", value, () => {
      setIsLoading(false);
    });

    setValue("");
  }

  return (
    <>
      <div className="chat-window">
        <h2>Chat Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </ul>
      </div>
      <form onSubmit={onSubmit} className="chat-form">
        <input value={value} onChange={(e) => setValue(e.target.value)} />

        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </>
  );
}
