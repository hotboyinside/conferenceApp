import Joi from 'joi';
import { MESSAGE_MAX_LENGTH } from '../../const/message';

export const messageValidationScheme = () =>
	Joi.string().max(MESSAGE_MAX_LENGTH);
