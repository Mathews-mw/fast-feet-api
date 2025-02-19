import z from 'zod';
import { FastifySchema } from 'fastify/types/schema';

const responseSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string(),
	cpf: z.string(),
	role: z.string(),
	created_at: z.coerce.date(),
});

export type GetUserProfileResponse = z.infer<typeof responseSchema>;

export const getUserProfileSchema: FastifySchema = {
	tags: ['Users'],
	summary: 'Get user profile',
	description: 'User needs to be authenticated to get profile info',
	security: [{ bearerAuth: [] }],
	response: {
		200: responseSchema,
	},
};
