import { AccessToken } from 'livekit-server-sdk';
import { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } from '../constants/env';
import UserModel from '../models/user.model';
import appAssert from '../utils/appAssert';
import { CONFLICT } from '../constants/http';
import MessageModel from '../models/message.model';
import { endOfDay, startOfDay } from 'date-fns';

export type CreateTokenParams = {
	userName: string;
};

const createToken = async (data: CreateTokenParams) => {
	const existingUser = await UserModel.exists({
		userName: data.userName,
	});

	appAssert(
		existingUser,
		CONFLICT,
		'The user with this nickname is not registered'
	);

	const roomName = 'room';
	const participantName = data.userName;

	const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
		identity: participantName,
	});

	at.addGrant({ roomJoin: true, room: roomName, canUpdateOwnMetadata: true });

	return await at.toJwt();
};

export const getLastChatMessages = async (limit = 40) => {
	const startOfToday = startOfDay(new Date());
	const endOfToday = endOfDay(new Date());

	const messages = await MessageModel.find({
		sendTime: { $gte: startOfToday, $lte: endOfToday },
	})
		.sort({ sendTime: 1 })
		.limit(limit);

	return messages;
};

export default createToken;
