"use client";

import React, { useEffect, useState, useMemo } from "react";
//import { io } from "socket.io-client";
import socket from "../connect/connection";
import { useSearchParams } from "next/navigation";

function Chatroom() {
  const [mesuser, setMesuser] = useState([]);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [reciveuser, setReciveuser] = useState("");
  //const [roomName, setRoomName] = useState("")
  const [socketID, setSocketID] = useState("");
  const searchParams = useSearchParams();
  const roomName = searchParams.get("room");
  const userName = searchParams.get("user");
  const [room, setRoom] = useState(roomName);

  console.log({ userName });
  console.log({ roomName });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending message", message);

    socket.emit("message", { message, room, userName });
    setMessage("");
  };

  useEffect(() => {
    setSocketID(socket.id);
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("recive-message", ({ message, userName }) => {
      // console.log("Mesage recieved", data)
      //setMessages((messages) => [...messages, data]);
      mesuser.push({
        nmessages: message,
        ruser: userName,
      });

      console.log("yes", { userName, message });
      setMessages((messages) => [...messages, message]);
      setReciveuser(userName);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    console.log("hello");
  }, []);

  return (
    <div className="bg-lime-200">
      <div className="chatbox">
        <h1>{userName}</h1>
        <div
          className="flex flex-col border-2 justify-end bg-lime-200 border-black w-[30vw] min-w-[820px] h-[90vh] mx-auto my-4"
          style={{
            backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
          }}
        >
          <div className="flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-sm scrollbar-thumb-black">
            <div className="flex flex-col gap-3 p-3">
              {mesuser.map((m, i) =>
                m.ruser == userName ? (
                  <div className="flex flex-col self-end max-w-xs border-2  border-black rounded-md">
                    <div className="bg-green-600 text-white pl-2 pr-3 py-1 text-wrap h-auto word rounded-[4px]">
                      {m.nmessages}
                    </div>
                  </div>
                ) : (
                  <div
                    key={i}
                    className="flex flex-col max-w-xs border-2 border-black word rounded-md w-fit"
                  >
                    <span className={`pl-2 pr-3 text-sm font-bold`}>
                      {m.ruser}
                    </span>
                    <span className=" bg-gray-600 text-white pl-2 pr-3 py-1  text-wrap h-auto ">
                      {m.nmessages}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div
              className="flex gap-[6px] w-full pt-[2px]"
              style={{
                backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
              }}
            >
              <input
                className="w-full px-4 py-1 rounded-xl focus:outline-none focus:bg-neutral-100"
                style={{ border: "1px solid black" }}
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button className="w-40 p-2 m-0 font-semibold text-white bg-green-400 shadow-md rounded-xl hover:bg-blue-700">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
