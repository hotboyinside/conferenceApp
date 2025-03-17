import deleteUser from '../services/quite.service';
import catchErrors from '../utils/catchErrors';
import { joinSchema } from './join.schemas';

export const deleteUserHandler = catchErrors(async (req, res) => {
	const request = joinSchema.parse({
		...req.body,
	});

	const response = await deleteUser(request);
	res.send({ response: response });
});

export default deleteUserHandler;
