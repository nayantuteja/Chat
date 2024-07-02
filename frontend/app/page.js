'use client'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import socket from "./connect/connection"
import Joinroom from './Joinroom/Joinroom'
import Chatroom from './Chatroom/Chatroom'


export default function Page() {

  const [userName, setUserName] = useState("");
  // const [hasUserName, setHasUserName] = useState(true);
  const router = useRouter();

  function goto(){
    console.log(`user ${userName} joined`)
   // socket.emit('user', { userName });
    router.push(`./Joinroom?user=${userName}`);
  }

   
  // function goto() {
  //   if (userName) {
  //     socket.emit('username', { userName });
  //     socket.on('approved username', () => {
  //         router.push(`./Joinroom?user=${userName}`);
  //     });
  //     socket.on('duplicate username', (payload) => {
  //       setHasUserName(`Username ${payload.userName} is taken.`);
  //     });
  //   } else {
  //     setHasUserName(`Please enter a username`);
  //   }
  // }
  
  return (
   <>
   <div className='flex flex-col justify-center h-screen mx-auto w-max'>
   <div className='flex flex-col items-center justify-center gap-3 '>

   <input
          className='p-2 m-2 text-black bg-white rounded-lg w-1/8 shadow-m'
          type='text'
          name='userName'
          placeholder='Enter your User name...'
          value={userName}
          onChange={(e) => { setUserName(e.target.value);
          }}
        />
   <button  className='w-40 p-3 m-2 font-semibold text-white bg-black rounded-lg shadow-md hover:bg-blue-700'
          onClick={() => goto()}>
          Enter
        </button> 
     
     {/* <Joinroom/> */}

   {/* <Chatroom/> */}
   </div>
   </div>
   </>
  )
}

