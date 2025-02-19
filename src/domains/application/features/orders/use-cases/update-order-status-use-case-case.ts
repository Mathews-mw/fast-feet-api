import { inject, injectable } from 'tsyringe';

import { failure, Outcome, success } from '@/core/outcome';
import containerKeysConfig from '@/config/container-keys-config';
import { BadRequestError } from '@/core/errors/bad-request-errors';
import { Order, OrderStatus } from '@/domains/models/entities/order';
import { IOrderRepository } from '../repositories/i-order-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface IRequest {
	orderId: string;
	status: OrderStatus;
}

type Response = Outcome<BadRequestError, { order: Order }>;

@injectable()
export class UpdateOrderStatusUseCase {
	constructor(@inject(containerKeysConfig.repositories.orders_repository) private ordersRepository: IOrderRepository) {}

	async execute({ orderId, status }: IRequest): Promise<Response> {
		const order = await this.ordersRepository.findById(orderId);

		if (!order) {
			return failure(new ResourceNotFoundError('Order not found'));
		}

		order.status = status;

		await this.ordersRepository.update(order);

		return success({ order });
	}
}
