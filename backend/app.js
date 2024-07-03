import express from 'express'
import { Server } from 'socket.io';
import {createServer} from "http";
import cors from 'cors'
let users = {}
const port=3000;
const app = express();
const server = createServer(app); 
const io = new Server(server,{
    cors:{
        origin:'*'
    }
})

app.use(cors({
    origin:'*'
}));

app.get("/",(req,res)=>{
    res.send("hellooooeeerrre");
});



io.on("connection",(socket)=> {
    console.log("user connected", socket.id)

    socket.on("username", (m) => {
        if (!nameTaken(m.userName)) {
          console.log(socket.id, "assigend to",m)
          users[socket.id] = m
          console.log("Users", users)
          socket.emit("approved username")
        }
        else {
              console.log("Username Taken")
              console.log(socket.id, "already has", m)
              socket.emit("duplicate username", m)
        }
      })

    socket.on("message",({room,message,userName})=>{
         console.log({room,message,userName});
       if(room){
         io.to(room).emit("recive-message",{message,userName});
       }
       else{
            io.emit("recive-message",message);
       }
    })
    socket.on("join-room",(room)=>{
        socket.join(room);
        console.log(`user joined ${room}`)
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    })
})


function nameTaken(userName) {
    for (const socketid in users) {
      if (users[socketid].userName === userName) {
        return true
      }
    }
    return false
  }
server.listen(port,()=>{
    console.log(`server is working at ${port}`);
});     