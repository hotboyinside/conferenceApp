import { IRouteFn } from "../../../../types/socket";
import { world as worldService } from "../../../services/hello/world";

export const world: IRouteFn = async (socket, data) => {
    const result = await worldService({ name: data.name });
    socket.emit("hello:world:success", result);
    return result;
};
