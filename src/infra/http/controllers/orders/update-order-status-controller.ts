import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { UpdateOrderStatusParams, UpdateOrderStatusRequest } from '../../schemas/update-order-status-schema';
import { UpdateOrderStatusUseCase } from '@/domains/application/features/orders/use-cases/update-order-status-use-case-case';

export async function updateOrderStatusController(request: FastifyRequest, reply: FastifyReply) {
	const { orderId } = request.params as UpdateOrderStatusParams;
	const { status } = request.body as UpdateOrderStatusRequest;

	const service = container.resolve(UpdateOrderStatusUseCase);

	const result = await service.execute({ orderId, status });

	if (result.isFalse()) {
		throw result.value;
	}

	return reply.status(204).send();
}
