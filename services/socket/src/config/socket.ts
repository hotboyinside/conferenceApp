import { Server } from "socket.io";

import { auth } from "../services/socket/auth";
import { onConnection } from "../services/socket/onConnection";

const socketConfig = {
    cors: { origin: "http://localhost:3001" },
    pingInterval: 10000,
    pingTimeout: 10000,
};

const io = new Server(socketConfig);

io.use(auth);

io.on("connection", onConnection);

export { io };
