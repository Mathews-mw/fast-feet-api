import z from 'zod';
import { FastifySchema } from 'fastify/types/schema';
import { orderStatusSchema } from '@/domains/models/entities/order';

const querySchema = z.object({
	status: z.optional(orderStatusSchema),
});

const responseSchema = z.object({
	amount: z.number(),
	orders: z.array(
		z.object({
			id: z.string(),
			recipient_id: z.string(),
			owner_id: z.string().nullable(),
			status: orderStatusSchema,
			posted_at: z.coerce.date(),
			withdrawal_at: z.coerce.date().nullable(),
			delivery_at: z.coerce.date().nullable(),
			status_updated_at: z.coerce.date().nullable(),
			recipient: z.object({
				id: z.string(),
				email: z.string().email(),
				phone: z.string(),
				cpf: z.string(),
				cep: z.string(),
				street: z.string(),
				number: z.string(),
				complement: z.string().optional().nullable(),
				district: z.string(),
				city: z.string(),
				state: z.string(),
				latitude: z.coerce.number(),
				longitude: z.coerce.number(),
			}),
		})
	),
});

export type ListingUserOrdersQuery = z.infer<typeof querySchema>;
export type ListingUserOrdersResponse = z.infer<typeof responseSchema>;

export const listingUserOrdersSchema: FastifySchema = {
	tags: ['Orders'],
	summary: 'Listing user orders',
	security: [{ bearerAuth: [] }],
	querystring: querySchema,
	response: {
		200: responseSchema,
	},
};
