import express from 'express'
import { Server } from 'socket.io';
import {createServer} from "http";
import cors from 'cors'

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

    socket.on("message",({room,message})=>{
        console.log({room,message});
       if(room){
        io.to(room).emit("recive-message",message);
       }
       else{
        socket.broadcast.emit("recive-message",message);
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

server.listen(port,()=>{
    console.log(`server is working at ${port}`);
});     