import { inject, injectable } from 'tsyringe';

import { Outcome, success } from '@/core/outcome';
import containerKeysConfig from '@/config/container-keys-config';
import { BadRequestError } from '@/core/errors/bad-request-errors';
import { Order, OrderStatus } from '@/domains/models/entities/order';
import { IOrderRepository } from '../repositories/i-order-repository';

interface IRequest {
	ownerId: string;
	status?: OrderStatus;
}

type Response = Outcome<BadRequestError, { amount: number; orders: Order[] }>;

@injectable()
export class ListingUserOrdersUseCase {
	constructor(@inject(containerKeysConfig.repositories.orders_repository) private ordersRepository: IOrderRepository) {}

	async execute({ ownerId, status }: IRequest): Promise<Response> {
		const { amount, orders } = await this.ordersRepository.findManyByOwnerId({ ownerId, status });

		return success({ amount, orders });
	}
}
