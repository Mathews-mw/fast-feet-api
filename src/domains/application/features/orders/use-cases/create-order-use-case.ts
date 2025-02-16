import { inject, injectable } from 'tsyringe';

import { Outcome, success } from '@/core/outcome';
import { Order } from '@/domains/models/entities/order';
import containerKeysConfig from '@/config/container-keys-config';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { BadRequestError } from '@/core/errors/bad-request-errors';
import { IOrderRepository } from '../repositories/i-order-repository';

interface IRequest {
	recipientId: string;
	ownerId?: string;
}

type Response = Outcome<BadRequestError, { order: Order }>;

@injectable()
export class CreateOrderUseCase {
	constructor(@inject(containerKeysConfig.repositories.orders_repository) private ordersRepository: IOrderRepository) {}

	async execute({ ownerId, recipientId }: IRequest): Promise<Response> {
		const newOrder = Order.create({
			recipientId: new UniqueEntityId(recipientId),
			status: 'POSTADO',
			ownerId: ownerId ? new UniqueEntityId(ownerId) : null,
		});

		await this.ordersRepository.create(newOrder);

		return success({ order: newOrder });
	}
}
