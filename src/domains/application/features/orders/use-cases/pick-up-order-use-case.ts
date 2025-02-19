import { inject, injectable } from 'tsyringe';

import { Order } from '@/domains/models/entities/order';
import { failure, Outcome, success } from '@/core/outcome';
import containerKeysConfig from '@/config/container-keys-config';
import { IOrderRepository } from '../repositories/i-order-repository';
import { IUserRepository } from '../../users/repositories/i-user-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface IRequest {
	ownerId: string;
	orderId: string;
}

type Response = Outcome<ResourceNotFoundError, { order: Order }>;

@injectable()
export class PickUpOrderUseCase {
	constructor(
		@inject(containerKeysConfig.repositories.users_repository) private usersRepository: IUserRepository,
		@inject(containerKeysConfig.repositories.orders_repository) private ordersRepository: IOrderRepository
	) {}

	async execute({ ownerId, orderId }: IRequest): Promise<Response> {
		const user = await this.usersRepository.findById(ownerId);
		const order = await this.ordersRepository.findById(orderId);

		if (!user) {
			return failure(new ResourceNotFoundError('User not found'));
		}
		if (!order) {
			return failure(new ResourceNotFoundError('Order not found'));
		}

		order.ownerId = user.id;
		order.withdrawalAt = new Date();

		await this.ordersRepository.update(order);

		return success({ order });
	}
}
