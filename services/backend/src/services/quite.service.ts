import UserModel from '../models/user.model';
import appAssert from '../utils/appAssert';
import { CONFLICT } from '../constants/http';

export type CreateTokenParams = {
	userName: string;
};

const deleteUser = async (data: CreateTokenParams) => {
	const existingUser = await UserModel.exists({
		userName: data.userName,
	});

	appAssert(
		existingUser,
		CONFLICT,
		'The user with this nickname is not registered'
	);

	await UserModel.findOneAndDelete({ userName: data.userName });
};

export default deleteUser;
