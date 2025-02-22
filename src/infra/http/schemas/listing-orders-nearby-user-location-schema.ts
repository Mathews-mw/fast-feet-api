import z from 'zod';
import { FastifySchema } from 'fastify/types/schema';
import { orderStatusSchema } from '@/domains/models/entities/order';

const querySchema = z.object({
	status: z.optional(orderStatusSchema),
	lat: z.coerce.number(),
	long: z.coerce.number(),
	distanceInKm: z.optional(z.coerce.number()).default(5),
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

export type ListingOrderNearbyUserLocationQuery = z.infer<typeof querySchema>;
export type ListingOrderNearbyUserLocationResponse = z.infer<typeof responseSchema>;

export const listingOrderNearbyUserSchema: FastifySchema = {
	tags: ['Orders'],
	summary: 'Listing orders nearby user location',
	description:
		'This route require the a user location (**latitude** and **longitude**) to calculate nearby orders. Use the parameter `distanceInKm` to specify the desired distance to be calculated. For example, if `distanceInKm` equals 3, then all the orders in a radius of 3km will be returned.',
	security: [{ bearerAuth: [] }],
	querystring: querySchema,
	response: {
		200: responseSchema,
	},
};
