import { inject, injectable } from 'tsyringe';

import { Order } from '@/domains/models/entities/order';
import { failure, Outcome, success } from '@/core/outcome';
import containerKeysConfig from '@/config/container-keys-config';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { BadRequestError } from '@/core/errors/bad-request-errors';
import { IOrderRepository } from '../repositories/i-order-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { IRecipientRepository } from '../../recipients/repositories/i-recipient-repository';

interface IRequest {
	recipientId: string;
	ownerId?: string;
}

type Response = Outcome<BadRequestError | ResourceNotFoundError, { order: Order }>;

@injectable()
export class CreateOrderUseCase {
	constructor(
		@inject(containerKeysConfig.repositories.orders_repository) private ordersRepository: IOrderRepository,
		@inject(containerKeysConfig.repositories.recipients_repository) private recipientRepository: IRecipientRepository
	) {}

	async execute({ ownerId, recipientId }: IRequest): Promise<Response> {
		const recipient = await this.recipientRepository.findById(recipientId);

		if (!recipient) {
			return failure(new ResourceNotFoundError('Recipient not found'));
		}

		const newOrder = Order.create({
			recipientId: new UniqueEntityId(recipientId),
			status: 'POSTADO',
			ownerId: ownerId ? new UniqueEntityId(ownerId) : null,
		});

		await this.ordersRepository.create(newOrder);

		return success({ order: newOrder });
	}
}
