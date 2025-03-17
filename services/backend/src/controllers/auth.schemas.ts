import { z } from 'zod';

export const loginSchema = z.object({
	userName: z.string().min(1).max(255),
	userAgent: z.string().optional(),
});

export const registerSchema = loginSchema;
