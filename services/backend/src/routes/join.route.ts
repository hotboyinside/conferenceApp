import { Router } from 'express';
import {
	getLastMessages,
	getTokenHandler,
} from '../controllers/join.controller';

const joinRoom = Router();

joinRoom.get('/', getTokenHandler);

joinRoom.get('/messages', getLastMessages);

export default joinRoom;
