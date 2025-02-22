import { inject, injectable } from 'tsyringe';

import { Outcome, success } from '@/core/outcome';
import { OrderStatus } from '@/domains/models/entities/order';
import containerKeysConfig from '@/config/container-keys-config';
import { BadRequestError } from '@/core/errors/bad-request-errors';
import { IOrderRepository } from '../repositories/i-order-repository';
import { OrderDetails } from '@/domains/models/entities/value-objects/order-details';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

interface IRequest {
	ownerId: string;
	status?: OrderStatus;
	userLatitude: number;
	userLongitude: number;
	distanceInKm: number;
}

type Response = Outcome<BadRequestError, { amount: number; orders: OrderDetails[] }>;

@injectable()
export class ListingOrdersNearbyUserLocationUseCase {
	constructor(@inject(containerKeysConfig.repositories.orders_repository) private ordersRepository: IOrderRepository) {}

	async execute({ ownerId, status, distanceInKm, userLatitude, userLongitude }: IRequest): Promise<Response> {
		const { orders } = await this.ordersRepository.findManyByOwnerId({ ownerId, status });

		const nearbyOrders: OrderDetails[] = [];

		for (const order of orders) {
			const distance = getDistanceBetweenCoordinates({
				from: {
					latitude: userLatitude,
					longitude: userLongitude,
				},
				to: {
					latitude: order.recipient.latitude,
					longitude: order.recipient.longitude,
				},
			});

			if (distance <= distanceInKm) {
				nearbyOrders.push(order);
			}
		}

		return success({ amount: nearbyOrders.length, orders: nearbyOrders });
	}
}
