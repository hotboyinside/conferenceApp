import { Socket } from 'socket.io';
import { rootRouter } from '../../routes';
import { logger } from '../../config/logger';

export const onConnection = (socket: Socket) => {
	logger.info(`socket:connected; ${socket.id}`);

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	// socket.on('message', data => {
	// 	let dataForUser;
	// 	if (Array.isArray(data)) {
	// 		dataForUser = data;
	// 	} else {
	// 		dataForUser = [data];
	// 	}
	// 	socket.broadcast.emit('message', dataForUser);
	// 	socket.emit('message', dataForUser);
	// });

	rootRouter.subscribe(socket);
};
