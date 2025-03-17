import { MAX_USERS } from '../constants/env';
import { CONFLICT } from '../constants/http';
import SessionModel from '../models/session.model';
import UserModel from '../models/user.model';
import appAssert from '../utils/appAssert';
import { refreshTokenSignOptions, signToken } from '../utils/jwt';

export type CreateAccountParams = {
	userName: string;
	userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
	const existingUser = await UserModel.exists({
		userName: data.userName,
	});

	const countUsers = await UserModel.countDocuments();
	const isLimitUsers = countUsers >= Number(MAX_USERS);

	appAssert(!isLimitUsers, CONFLICT, 'Room is full');
	appAssert(!existingUser, CONFLICT, 'This name already exists');

	const user = await UserModel.create({
		userName: data.userName,
	});

	const userId = user._id;

	const session = await SessionModel.create({
		userId: userId,
		userAgent: data.userAgent,
	});

	const refreshToken = signToken(
		{
			sessionId: session._id,
		},
		refreshTokenSignOptions
	);

	const accessToken = signToken({
		userId,
		sessionId: session._id,
	});

	return {
		user,
		accessToken,
		refreshToken,
	};
};
