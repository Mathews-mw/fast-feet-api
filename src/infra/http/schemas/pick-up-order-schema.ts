import z from 'zod';
import { FastifySchema } from 'fastify/types/schema';

const paramsSchema = z.object({
	orderId: z.string().uuid(),
});

const responseSchema = z.object({
	message: z.string(),
});

export type PickUpOrderParams = z.infer<typeof paramsSchema>;
export type PickUpOrderResponse = z.infer<typeof responseSchema>;

export const pickUpOrderSchema: FastifySchema = {
	tags: ['Orders'],
	summary: 'Pick up an order',
	security: [{ bearerAuth: [] }],
	params: paramsSchema,
	response: {
		200: responseSchema,
	},
};
