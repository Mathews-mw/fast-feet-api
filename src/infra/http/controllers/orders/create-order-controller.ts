import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateOrderRequest } from '../../schemas/create-order-schema';
import { CreateOrderUseCase } from '@/domains/application/features/orders/use-cases/create-order-use-case';

export async function createOrderController(request: FastifyRequest, reply: FastifyReply) {
	const { recipient_id, owner_id } = request.body as CreateOrderRequest;

	const service = container.resolve(CreateOrderUseCase);

	const result = await service.execute({
		recipientId: recipient_id,
		ownerId: owner_id,
	});

	if (result.isFalse()) {
		throw result.value;
	}

	return reply.status(201).send({ message: 'Order created successfully', order_id: result.value.order.id.toString() });
}
