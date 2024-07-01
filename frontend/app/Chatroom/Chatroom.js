'use client'

import React, { useEffect, useState, useMemo } from 'react';
//import { io } from "socket.io-client";
import socket from '../connect/connection';
import { useSearchParams } from "next/navigation"



function Chatroom() {
  
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("")
 
  //const [roomName, setRoomName] = useState("")
  const [socketID, setSocketID] = useState("")
  const searchParams = useSearchParams()
  const roomName = searchParams.get("room")
  const [room, setRoom] = useState(roomName)
  
console.log(roomName);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending message", message)
    
    socket.emit("message", { message ,room});
    setMessage("")
  }

  

  useEffect(() => {
    setSocketID(socket.id)
    socket.on("connect", () => {
      setSocketID(socket.id)
      console.log("connected", socket.id);

    });

    socket.on("recive-message", (data) => {
      console.log("Mesage recieved", data)
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    })

        // return() => {
        //   socket.disconnect();
        // };   
    console.log("hello")

  }, []);

  return (
    <>

      <h1>{socketID}</h1>
      <div className='flex flex-col border-2 justify-end border-black rounded-md w-[30vw] min-w-[320px] h-[95vh] mx-auto my-4'>
      <div className='flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-sm scrollbar-thumb-black'>
      <div className='flex flex-col gap-3 p-3'>
      {/* <stack> */}
        {
          messages.map((m, i) => (
            <p key={i}>{m}</p>
          ))
        }
      {/* </stack> */}
      
      </div>
      </div>
      <form onSubmit={handleSubmit}>

      <div className='flex gap-[3px] w-full bg-black pt-[2px]'>   

        <input className='px-3 py-1 focus:outline-none focus:bg-neutral-100 w-full rounded-[4px]'
          style={{ border: '1px solid black' }}
          placeholder="Enter Message"
          value={message}
          onChange={e => setMessage(e.target.value)} />

        {/* <input className='rounded-lg w-1/8 bg-white text-black m-2 p-2 shadow-m'
          style={{ border: '1px solid black' }}
          placeholder="Enter Room"
          value={room}
          onChange={e => setRoom(e.target.value)}
        /> */}
                 
        {/* <input className='='rounded-lg w-1 bg-white text-black m-2 p-2 shadow-m
         style={{border: '1px solid black'}}
                 placeholder='enter room'
                 value={room}
                 onChange={e => setRoom(roomName)}
                 /> */}


    
        <button type='submit' variant='contained' color='primary'>Send</button>
        </div>
      </form>
      
      </div>
    </>
    

  )
}

export default Chatroom