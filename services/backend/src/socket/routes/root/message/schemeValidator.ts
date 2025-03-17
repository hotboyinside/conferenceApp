import Joi from 'joi';
import { schemeValidator } from '../../../services/socket/schemeValidator';
import { messageValidationScheme } from '../../../services/message/schemeValidator';

export const message = schemeValidator(
	Joi.object({
		text: messageValidationScheme(),
		name: messageValidationScheme(),
		sendTime: messageValidationScheme(),
	})
);
