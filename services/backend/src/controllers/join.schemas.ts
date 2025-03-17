import { z } from 'zod';

export const joinSchema = z.object({
	userName: z.string().min(1).max(255),
});
