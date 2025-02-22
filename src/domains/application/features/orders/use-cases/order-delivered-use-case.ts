import { inject, injectable } from 'tsyringe';

import { Order } from '@/domains/models/entities/order';
import { failure, Outcome, success } from '@/core/outcome';
import containerKeysConfig from '@/config/container-keys-config';
import { BadRequestError } from '@/core/errors/bad-request-errors';
import { IOrderRepository } from '../repositories/i-order-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { IRecipientRepository } from '../../recipients/repositories/i-recipient-repository';

interface IRequest {
	orderId: string;
	ownerId: string;
	userLatitude: number;
	userLongitude: number;
}

type Response = Outcome<BadRequestError, { order: Order }>;

const MAX_ALLOWED_DISTANCE_IN_KM = 0.015;

@injectable()
export class OrderDeliveredUseCase {
	constructor(
		@inject(containerKeysConfig.repositories.orders_repository) private ordersRepository: IOrderRepository,
		@inject(containerKeysConfig.repositories.recipients_repository) private recipientsRepository: IRecipientRepository
	) {}

	async execute({ orderId, ownerId, userLatitude, userLongitude }: IRequest): Promise<Response> {
		const order = await this.ordersRepository.findById(orderId);

		if (!order) {
			return failure(new ResourceNotFoundError('Order not found'));
		}

		const recipient = await this.recipientsRepository.findById(order.recipientId.toString());

		if (!recipient) {
			return failure(new ResourceNotFoundError('Recipient not found'));
		}

		if (order.ownerId == null) {
			return failure(new BadRequestError(`You can't delivery order that have no owner.`));
		}

		if (order.ownerId.toString() !== ownerId) {
			return failure(new BadRequestError(`This order belongs to another delivery man. You can't delivery it.`));
		}

		const distance = getDistanceBetweenCoordinates({
			from: {
				latitude: userLatitude,
				longitude: userLongitude,
			},
			to: {
				latitude: recipient.latitude,
				longitude: recipient.longitude,
			},
		});

		console.log('distance: ', distance);

		if (distance > MAX_ALLOWED_DISTANCE_IN_KM) {
			return failure(
				new BadRequestError(
					'Max distance not allowed! You can only deliver this order at least 5 meters distance from the location'
				)
			);
		}

		order.status = 'ENTREGUE';
		order.deliveryAt = new Date();

		await this.ordersRepository.update(order);

		return success({ order });
	}
}
