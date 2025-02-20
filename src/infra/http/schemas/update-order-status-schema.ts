import z from 'zod';
import { FastifySchema } from 'fastify/types/schema';
import { orderStatusSchema } from '@/domains/models/entities/order';

const paramsSchema = z.object({
	orderId: z.string().uuid(),
});

const bodySchema = z.object({
	status: orderStatusSchema,
});

export type UpdateOrderStatusRequest = z.infer<typeof bodySchema>;
export type UpdateOrderStatusParams = z.infer<typeof paramsSchema>;

export const updateOrderStatusSchema: FastifySchema = {
	tags: ['Orders'],
	summary: 'Update order status',
	security: [{ bearerAuth: [] }],
	params: paramsSchema,
	body: bodySchema,
	response: {
		204: z.null(),
	},
};
