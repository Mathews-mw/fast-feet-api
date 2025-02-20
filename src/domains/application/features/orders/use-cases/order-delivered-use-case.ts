import { inject, injectable } from 'tsyringe';

import { Order } from '@/domains/models/entities/order';
import { failure, Outcome, success } from '@/core/outcome';
import containerKeysConfig from '@/config/container-keys-config';
import { BadRequestError } from '@/core/errors/bad-request-errors';
import { IOrderRepository } from '../repositories/i-order-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface IRequest {
	orderId: string;
	ownerId: string;
}

type Response = Outcome<BadRequestError, { order: Order }>;

@injectable()
export class OrderDeliveredUseCase {
	constructor(@inject(containerKeysConfig.repositories.orders_repository) private ordersRepository: IOrderRepository) {}

	async execute({ orderId, ownerId }: IRequest): Promise<Response> {
		const order = await this.ordersRepository.findById(orderId);

		if (!order) {
			return failure(new ResourceNotFoundError('Order not found'));
		}

		if (order.ownerId == null) {
			return failure(new BadRequestError(`You can't delivery order that have no owner.`));
		}

		if (order.ownerId.toString() !== ownerId) {
			return failure(new BadRequestError(`This order belongs to another delivery man. You can't delivery it.`));
		}

		order.status = 'ENTREGUE';
		order.deliveryAt = new Date();

		await this.ordersRepository.update(order);

		return success({ order });
	}
}
