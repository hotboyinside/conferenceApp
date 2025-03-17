import { world as worldService } from '../../../services/hello/world';
import { IRouteFn } from '../../../types/socket';

export const world: IRouteFn = async (socket, data) => {
	const result = await worldService({ name: data.name });
	socket.emit('hello:world:success', result);
	return result;
};
