import { z } from 'zod';
import { ErrorRequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../constants/http';
import AppError from '../utils/AppError';

const handleZodError = (res: any, error: z.ZodError) => {
	const errors = error.issues.map(err => ({
		path: err.path.join('.'),
		message: err.message,
	}));

	return res.status(BAD_REQUEST).json({
		errors,
		message: error.message,
	});
};

const handleAppError = (res: any, error: AppError) => {
	return res.status(error.statusCode).json({
		message: error.message,
		errorCode: error.errorCode,
	});
};

// @ts-ignore
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	console.log(`PATH ${req.path}`, error);

	if (error instanceof z.ZodError) {
		return handleZodError(res, error);
	}

	if (error instanceof AppError) {
		return handleAppError(res, error);
	}

	return res.status(INTERNAL_SERVER_ERROR).send('Internal server error');
};

export default errorHandler;
