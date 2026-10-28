import { Server } from "socket.io"

let io;

export function initSocketIo({ httpServer }) {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        }
    })

    console.log("socket io server is RUNNING")

    io.on("connection" , (socket) => {
        console.log("auser connected" + socket.id)
    })
}

export function getIo () {
    if(!io){
        throw new Error("Socket.io  not initalized")
    }

    return io
}

