import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { OrderDetailsPresenter } from '../../presenters/order-details-presenter';
import { ListingOrdersNearbyUserLocationUseCase } from '@/domains/application/features/orders/use-cases/listing-orders-nearby-user-location-use-case';
import { ListingOrderNearbyUserLocationQuery } from '../../schemas/listing-orders-nearby-user-location-schema';

export async function listingOrdersNearbyUserLocationController(request: FastifyRequest, reply: FastifyReply) {
	const { status, lat, long, distanceInKm } = request.query as ListingOrderNearbyUserLocationQuery;
	const { sub } = request.user;

	const service = container.resolve(ListingOrdersNearbyUserLocationUseCase);

	const result = await service.execute({ ownerId: sub, status, distanceInKm, userLatitude: lat, userLongitude: long });

	if (result.isFalse()) {
		throw result.value;
	}

	const response = {
		amount: result.value.amount,
		orders: result.value.orders.map(OrderDetailsPresenter.toHTTP),
	};

	return reply.status(200).send(response);
}
