import { message as messageService } from '../../../services/message/message';
import { IRouteFn } from '../../../types/socket';

export const message: IRouteFn = async (socket, messageData) => {
	const result = await messageService({ messageData });
	socket.broadcast.emit('message', messageData);
	socket.emit('message', messageData);
	return result;
};
