import z from 'zod';
import { FastifySchema } from 'fastify/types/schema';

const paramsSchema = z.object({
	orderId: z.string().uuid(),
});

export type OrderDeliveredParams = z.infer<typeof paramsSchema>;

export const orderDeliveredSchema: FastifySchema = {
	tags: ['Orders'],
	summary: 'Mark a order as delivered',
	description: 'This route require to upload an image',
	security: [{ bearerAuth: [] }],
	params: paramsSchema,
	response: {
		204: z.null(),
	},
};
