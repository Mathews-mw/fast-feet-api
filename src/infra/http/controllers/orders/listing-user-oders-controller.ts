import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { OrderPresenter } from '../../presenters/orders-presenter';
import { ListingUserOrdersQuery } from '../../schemas/listing-user-orders-schema';
import { ListingUserOrdersUseCase } from '@/domains/application/features/orders/use-cases/listing-user-orders-use-case';

export async function listingUserOrdersController(request: FastifyRequest, reply: FastifyReply) {
	const { status } = request.query as ListingUserOrdersQuery;
	const { sub } = request.user;

	const service = container.resolve(ListingUserOrdersUseCase);

	const result = await service.execute({ ownerId: sub, status });

	if (result.isFalse()) {
		throw result.value;
	}

	const response = {
		amount: result.value.amount,
		orders: result.value.orders.map(OrderPresenter.toHTTP),
	};

	return reply.status(200).send(response);
}
