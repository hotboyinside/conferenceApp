import { CookieOptions, Response } from 'express';
import { COOKIE_ACCESS, COOKIE_REFRESH, NODE_ENV } from '../constants/env';
import { addDays, addMinutes } from 'date-fns';

export const REFRESH_PATH = '/auth/refresh';
const secure = NODE_ENV !== 'development';

const defaults: CookieOptions = {
	sameSite: 'strict',
	httpOnly: true,
	secure,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
	...defaults,
	expires: addMinutes(new Date(), 15),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
	...defaults,
	expires: addDays(new Date(), 30),
	path: REFRESH_PATH,
});

type Params = {
	res: Response;
	accessToken: string;
	refreshToken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
	res
		.cookie(COOKIE_ACCESS, accessToken, getAccessTokenCookieOptions())
		.cookie(COOKIE_REFRESH, refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (res: Response) =>
	res
		.clearCookie(COOKIE_ACCESS)
		.clearCookie(COOKIE_REFRESH, { path: REFRESH_PATH });
