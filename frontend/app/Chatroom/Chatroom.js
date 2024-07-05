"use client";

import React, { useEffect, useState } from "react";

import socket from "../connect/connection";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import send from "../img/send.png";

function Chatroom() {
  const [mesuser, setMesuser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiveuser, setReceiveuser] = useState("");
  const searchParams = useSearchParams();
  const userName = searchParams.get("user");
  const roomName = searchParams.get("room");
  const [room, setRoom] = useState(roomName);
  const a = 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", { message, room, userName });
    }
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("hiiii");
    });

    socket.emit("join-room", roomName);

    socket.on("history", (messageshistory) => {
      let mes = [];
      for (let i = 0; i < messageshistory.length; i++) {
        if(messageshistory[i].newroom==room){
          // mes.push({
          //   nmessages: messageshistory[i].nmessages,
          //   ruser: messageshistory[i].ruser
          // })
            mes.push(messageshistory[i]);
        }
      }
      setMesuser(mes);
      console.log("MesUser", mesuser);
    });
    socket.on("welcome", (s) => {});
  }, []);

  useEffect(() => {
    console.log("Hiii", receiveuser);
    socket.on("receive-message", ({ message, userName, messageshistory }) => {
      console.log("Message recieved", message, userName);
      let mes = mesuser;
      mes.push({ nmessages: message, ruser: userName });
      setMesuser(mes);
      setMessages((messages) => [...messages, message]);
      setReceiveuser(userName);
    });
  }, [mesuser]);

  return (
    <div className="bg-gradient-to-b from-green-200 to-green-600 h-[100vh]">
      <div className="chatbox">
        <h1>{userName}</h1>
        <div
          className="flex flex-col border-2 justify-end bg-lime-200 border-black w-[30vw] min-w-[820px] h-[90vh] mx-auto mt-4 rounded-3xl"
          style={{
            backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
          }}
        >
          <div className="flex flex-col-reverse p-3 mt-5 mr-2 overflow-auto scrollbar-thin scrollbar-thumb-rounded-sm scrollbar-thumb-black">
            <div className="flex flex-col gap-3 p-3">
              {mesuser.map((m, i) =>
                m.ruser == userName ? (
                  <div className="flex flex-col self-end max-w-xs border-2  border-black rounded-md">
                    <div className="bg-green-700 text-white pl-2 pr-3 py-1 text-wrap h-auto word rounded-[4px]">
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
              className="flex gap-[3px] w-full pt-[2px] px-2 py-2 rounded-3xl"
              style={{
                backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
              }}
            >
              <input
                className="w-full px-4 py-1 bg-gray-600 text-white rounded-3xl focus:outline-none focus:bg-gray-600"
                // style={{ border: "0.5px solid black" }}
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button className="w-20 p-2 m-0 font-semibold text-white input shadow-md hover:bg-green-800 rounded-3xl border-radius: 50%">
                <Image
                  src={send}
                  height={20}
                  width={20}
                  className="inline"
                ></Image>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFF" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="m3 3 3 9-3 9 19-9Z"/></svg> */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Chatroom;
