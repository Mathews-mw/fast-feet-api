import z from 'zod';
import { FastifySchema } from 'fastify/types/schema';

const bodySchema = z.object({
	name: z.string(),
	email: z.string(),
	phone: z.string(),
	cpf: z.string(),
	cep: z.string(),
	street: z.string(),
	number: z.string(),
	complement: z.string().optional().nullable(),
	district: z.string(),
	city: z.string(),
	state: z.string(),
});

const responseSchema = z.object({
	message: z.string(),
	recipient_id: z.string().uuid(),
});

export type CreateRecipientRequest = z.infer<typeof bodySchema>;
export type CreateRecipientResponse = z.infer<typeof responseSchema>;

export const createRecipientSchema: FastifySchema = {
	tags: ['Recipients'],
	summary: 'Create a new recipient',
	security: [{ bearerAuth: [] }],
	body: bodySchema,
	response: {
		201: responseSchema,
	},
};
