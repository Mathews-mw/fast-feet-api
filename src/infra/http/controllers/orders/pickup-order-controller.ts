import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { PickUpOrderParams } from '../../schemas/pick-up-order-schema';
import { PickUpOrderUseCase } from '@/domains/application/features/orders/use-cases/pick-up-order-use-case';

export async function pickupOrderController(request: FastifyRequest, reply: FastifyReply) {
	const { orderId } = request.params as PickUpOrderParams;
	const { sub } = request.user;

	const service = container.resolve(PickUpOrderUseCase);

	const result = await service.execute({ orderId, ownerId: sub });

	if (result.isFalse()) {
		throw result.value;
	}

	return reply.status(200).send({ message: 'Order withdrawn successfully' });
}
