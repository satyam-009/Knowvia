
import { io } from "socket.io-client";

export const initializeSocketIoConnection = () => {
    const socket = io("http://localhost:3000", {
        withCredentials: true,
    });

    socket.on("connect", () => {
        console.log("Connected to Socket.IO server:", socket.id);
    });

    socket.on("connect_error", (error) => {
        console.error("Socket connection failed:", error.message);
    });

    return socket;
};
