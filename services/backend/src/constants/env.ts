const getEnv = (key: string, defaultValue?: string): string => {
	const value = process.env[key] || defaultValue;

	if (value === undefined) {
		throw Error(`Missing String environment variable for ${key}`);
	}

	return value;
};

export const NODE_ENV = getEnv('NODE_ENV', 'development');
export const PORT = getEnv('PORT', '3000');
export const MONGO_URL = getEnv('MONGO_URL');
export const APP_ORIGIN = getEnv('APP_ORIGIN');
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');
export const LIVEKIT_API_KEY = getEnv('LIVEKIT_API_KEY');
export const LIVEKIT_API_SECRET = getEnv('LIVEKIT_API_SECRET');
export const COOKIE_ACCESS = getEnv('COOKIE_ACCESS');
export const COOKIE_REFRESH = getEnv('COOKIE_REFRESH');
export const MAX_USERS = getEnv('MAX_USERS');
