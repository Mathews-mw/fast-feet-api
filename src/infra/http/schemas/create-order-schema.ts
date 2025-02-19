import z from 'zod';
import { FastifySchema } from 'fastify/types/schema';

const bodySchema = z.object({
	recipient_id: z.string().uuid(),
	owner_id: z.string().uuid().optional(),
});

const responseSchema = z.object({
	message: z.string(),
	order_id: z.string().uuid(),
});

export type CreateOrderRequest = z.infer<typeof bodySchema>;
export type CreateOrderResponse = z.infer<typeof responseSchema>;

export const createOrderSchema: FastifySchema = {
	tags: ['Orders'],
	summary: 'Create a new order',
	security: [{ bearerAuth: [] }],
	body: bodySchema,
	response: {
		201: responseSchema,
	},
};
