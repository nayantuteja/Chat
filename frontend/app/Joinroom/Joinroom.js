"use client";

import React, { useEffect, useState, useMemo } from "react";
import socket from "../connect/connection";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function Joinroom() {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("user");

  function joinRoom() {
    console.log(` Room ${roomName} joined`);
    socket.emit("join-room", roomName);
    router.push(`/Chatroom?user=${userName}&room=${roomName}`);
  }

  return (
    <>
      <div className="flex flex-col justify-center h-screen mx-auto w-max">
        <div className="flex flex-col items-center justify-center gap-3 ">
          <h5 className="text-4xl">Join room</h5>
          <input
            className="p-2 m-2 text-black bg-white rounded-lg w-1/8 shadow-m"
            style={{ border: "1px solid black" }}
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />

          <button
            className="w-40 p-3 m-2 font-semibold text-white bg-black rounded-lg shadow-md hover:bg-blue-700"
            onClick={() => joinRoom()}
          >
            Join
          </button>
        </div>
      </div>
    </>
  );
}

export default Joinroom;
