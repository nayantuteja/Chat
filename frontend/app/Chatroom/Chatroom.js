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
  const userName = searchParams.get("user")
  const [room, setRoom] = useState(roomName)
  
console.log({userName});
console.log({roomName});
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
<div className= 'bg-lime-200'>

<h1>{userName}</h1>
<div  className='flex flex-col border-2 justify-end bg-lime-200 border-black rounded-md w-[30vw] min-w-[820px] h-[90vh] mx-auto my-4'
style={{
  backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`
}}>
<div className='flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-sm scrollbar-thumb-black'>
<div className='flex flex-col gap-3 p-3'>





{/* {messages.map((payload, index) =>
    payload.userName == userName ? (
  <div className='flex flex-col self-end max-w-xs rounded-md'>

      <div className='bg-white pl-2 pr-3 py-1 rounded-[4px]'>{payload.message}</div>
              </div>
            ) : (
<div key={index} className='flex flex-col max-w-xs rounded-md w-fit'>
     <span className={`pl-2 pr-3 text-sm font-bold`}>{payload.userName}</span>
     <span className=' bg-white pl-2 pr-3 py-1 rounded-[4px]'>{payload.message}</span>
    </div>
            )
          )} */}


  {
    messages.map((m, i) => (
      <p key={i} className='flex flex-col max-w-3xl bg-black border-2 border-black rounded-md w-fit'>
        <span className=' bg-white pl-2 pr-3 py-1 rounded-[4px]'>{m}</span></p>
    ))
  }

      
      </div>
      </div>
      <form onSubmit={handleSubmit}>

      <div className='flex gap-[6px] w-full bg-black pt-[2px]'>   

        <input className='px-3 py-1 focus:outline-none focus:bg-neutral-100 w-full rounded-[4px]'
          style={{ border: '1px solid black' }}
          placeholder="Enter Message"
          value={message}
          onChange={e => setMessage(e.target.value)} />

        {/* <input className='p-2 m-2 text-black bg-white rounded-lg w-1/8 shadow-m'
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
    </div>
    

  )
}

export default Chatroom