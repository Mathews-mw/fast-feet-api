import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { OrderDeliveredParams } from '../../schemas/order-delivered-schema';
import { OrderDeliveredUseCase } from '@/domains/application/features/orders/use-cases/order-delivered-use-case';
import { CreateAttachmentUseCase } from '@/domains/application/features/attachments/use-cases/create-attachment-use-case';

export async function orderDeliveredController(request: FastifyRequest, reply: FastifyReply) {
	const { orderId } = request.params as OrderDeliveredParams;

	const orderService = container.resolve(OrderDeliveredUseCase);
	const attachmentService = container.resolve(CreateAttachmentUseCase);

	await orderService.execute({ orderId });
	await attachmentService.execute({ title: request.fileName, url: request.filePath, orderId });

	return reply.status(204).send();
}
