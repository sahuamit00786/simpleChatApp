const app = require('express')();
const { createServer } = require("http");

const httpServer = createServer(app);
const io = require("socket.io")(httpServer,{
    cors:{
        origin: "http://localhost:5173",
    }
});

io.on('connection', (socket)=>{
    console.log('A user connected',socket.id);

    socket.on("chat",(payload)=>{
        console.log("This is payload",payload) 
        // we are listening to this event and we need to send the response too
        io.emit("chat",payload)
    })

    socket.on("join",(name)=>{
        io.emit("join",name)
        console.log("This is name",name) 
    })
})

httpServer.listen(3000,()=>{
    console.log('Server is running on port 3000');
})