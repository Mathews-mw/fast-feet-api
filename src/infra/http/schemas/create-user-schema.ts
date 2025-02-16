import z from 'zod';
import { rolesSchema } from '@/core/auth/roles';
import { FastifySchema } from 'fastify/types/schema';

const bodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	cpf: z.string(),
	password: z.string(),
	role: rolesSchema,
});

const responseSchema = z.object({
	message: z.string(),
	user_id: z.string().uuid(),
});

export type CreateUserRequest = z.infer<typeof bodySchema>;
export type CreateUserResponse = z.infer<typeof responseSchema>;

export const createUserSchema: FastifySchema = {
	tags: ['Users'],
	body: bodySchema,
	response: {
		201: responseSchema,
	},
};
