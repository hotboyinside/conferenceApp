import { Socket } from "socket.io";
import { rootRouter } from "../../routes";
import { logger } from "../../config/logger";

export const onConnection = (socket: Socket) => {
    logger.info(`socket:connected; ${socket.id}`);

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("message", (data) => {
        console.log(data);
    });

    rootRouter.subscribe(socket);
};
