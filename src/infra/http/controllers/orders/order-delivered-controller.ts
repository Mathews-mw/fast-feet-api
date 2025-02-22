import fs from 'node:fs';
import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { OrderDeliveredParams, OrderDeliveredQuery } from '../../schemas/order-delivered-schema';
import { OrderDeliveredUseCase } from '@/domains/application/features/orders/use-cases/order-delivered-use-case';
import { CreateAttachmentUseCase } from '@/domains/application/features/attachments/use-cases/create-attachment-use-case';

export async function orderDeliveredController(request: FastifyRequest, reply: FastifyReply) {
	const { orderId } = request.params as OrderDeliveredParams;
	const { lat, long } = request.query as OrderDeliveredQuery;
	const { sub } = request.user;

	const orderService = container.resolve(OrderDeliveredUseCase);
	const attachmentService = container.resolve(CreateAttachmentUseCase);

	const deliveredResult = await orderService.execute({ orderId, ownerId: sub, userLatitude: lat, userLongitude: long });

	if (deliveredResult.isFalse()) {
		fs.unlink(request.filePath, (err) => console.log('unlink file error: ', err));
		throw deliveredResult.value;
	}

	const attachmentResult = await attachmentService.execute({ title: request.fileName, url: request.filePath, orderId });

	if (attachmentResult.isFalse()) {
		throw attachmentResult.value;
	}

	return reply.status(200).send({
		message: 'Order delivered successfully',
	});
}
