"use client";

import React, { useEffect, useState, useMemo } from "react";
import socket from "../connect/connection";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Joinroom() {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  // const joinRoomHandler = (e) => {
  //   e.preventDefault();
  //   socket.emit('join-room', roomName)
  //   setRoomName("");
  // }
  // function createRoom() {
  //   const room = nanoid()
  //   setRoomName(room)
  //   socket.emit("create room",  room )
  // }

  function joinRoom() {
    console.log(`Room ${roomName} joined`);
    socket.emit("join-room", roomName);
    router.push(`/Chatroom?room=${roomName}`);
  }

  return (
    <> 
      <h5>Join room</h5>
      <input
        className="p-2 m-2 text-black bg-white rounded-lg w-1/8 shadow-m"
        style={{ border: "1px solid black" }}
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />

      {/* <button
          className='text-white font-semibold rounded-[4px] bg-black border-2 border-white px-3 py-1 w-max
                  hover:text-black hover:bg-white hover:border-black'
          onClick={() => createRoom()}>
          Create Room
        </button> */}

      <button
        className="w-40 p-3 m-2 font-semibold text-white bg-black rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => joinRoom()}
      >
        Join 
      </button>
      {/* <Link href='/Chatroom'><button className='w-40 p-3 m-2 font-semibold text-white bg-black rounded-lg shadow-md hover:bg-blue-700'>Go To Room</button>
            </Link>
        */}
    </>
  );
}

export default Joinroom;
