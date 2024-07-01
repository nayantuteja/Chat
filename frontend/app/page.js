'use client'
import React from 'react'
import Joinroom from './Joinroom/Joinroom'
import Chatroom from './Chatroom/Chatroom'

function page() {
  return (
   <>
   
   <div className='flex flex-col justify-center h-screen mx-auto w-max'>
   <div className='flex flex-col items-center justify-center gap-3 '>
   {/* <App/> */}

   <Joinroom/>

   
   
   {/* <Chatroom/> */}
   </div>
   </div>
   </>
  )
}

export default page