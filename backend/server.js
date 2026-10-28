
import app from "./src/app.js";
import connectToDb from "./src/config/database.js";
import { createServer } from "node:http";
import { initSocketIo } from "./src/sockets/server.sockets.js";

const httpServer = createServer(app);

initSocketIo({ httpServer });

connectToDb();

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});
