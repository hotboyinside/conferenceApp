import catchErrors from '../utils/catchErrors';
import createToken from '../services/join.service';
import { getLastChatMessages } from '../services/join.service';
import { joinSchema } from './join.schemas';

export const getTokenHandler = catchErrors(async (req, res) => {
	const request = joinSchema.parse({
		...req.query,
	});

	const token = await createToken(request);
	res.send({ token: token });
});

export const getLastMessages = catchErrors(async (req, res) => {
	const messages = await getLastChatMessages();
	res.send({ messages });
});
