import z from 'zod';
import { FastifySchema } from 'fastify/types/schema';

const paramsSchema = z.object({
	orderId: z.string().uuid(),
});

const querySchema = z.object({
	lat: z.coerce.number(),
	long: z.coerce.number(),
});

export type OrderDeliveredQuery = z.infer<typeof querySchema>;
export type OrderDeliveredParams = z.infer<typeof paramsSchema>;

export const orderDeliveredSchema: FastifySchema = {
	tags: ['Orders'],
	summary: 'Mark a order as delivered',
	description: 'This route require to upload an image',
	security: [{ bearerAuth: [] }],
	params: paramsSchema,
	querystring: querySchema,
	response: {
		200: z.object({
			message: z.string().default('Order delivered successfully'),
		}),
	},
};
