import { Prisma } from '@prisma/client';

import { prisma } from '../prisma';
import { OrderMapper } from './mappers/order-mapper';
import { Order } from '@/domains/models/entities/order';
import { OrderDetailsMapper } from './mappers/order-details-mapper';
import { OrderDetails } from '@/domains/models/entities/value-objects/order-details';
import {
	IFindManyBuOwnerIdQuerySearch,
	IFindManyBuOwnerIdResponse,
	IOrderRepository,
} from '@/domains/application/features/orders/repositories/i-order-repository';

export class PrismaOrdersRepository implements IOrderRepository {
	async create(order: Order): Promise<Order> {
		const data = OrderMapper.toDatabase(order);

		await prisma.order.create({ data });

		return order;
	}

	async update(order: Order): Promise<Order> {
		const data = OrderMapper.toDatabase(order);

		await prisma.order.update({
			data,
			where: {
				id: order.id.toString(),
			},
		});

		return order;
	}

	async delete(order: Order): Promise<void> {
		await prisma.order.delete({
			where: {
				id: order.id.toString(),
			},
		});
	}

	async findMany(): Promise<Order[]> {
		const orders = await prisma.order.findMany();

		return orders.map(OrderMapper.toDomain);
	}

	async findManyByOwnerId({ ownerId, status }: IFindManyBuOwnerIdQuerySearch): Promise<IFindManyBuOwnerIdResponse> {
		const query: Prisma.OrderFindManyArgs = {
			where: {
				ownerId,
				status,
			},
		};

		const [orders, amount] = await prisma.$transaction([
			prisma.order.findMany({
				where: query.where,
				include: {
					recipient: true,
				},
			}),
			prisma.order.count({
				where: query.where,
			}),
		]);

		const response = {
			amount,
			orders: orders.map(OrderDetailsMapper.toDomain),
		};

		return response;
	}

	async findManyByRecipientId(recipientId: string): Promise<Order[]> {
		const orders = await prisma.order.findMany({
			where: {
				recipientId,
			},
		});

		return orders.map(OrderMapper.toDomain);
	}

	async findById(id: string): Promise<Order | null> {
		const order = await prisma.order.findUnique({
			where: {
				id,
			},
		});

		if (!order) {
			return null;
		}

		return OrderMapper.toDomain(order);
	}

	async findWithDetails(id: string): Promise<OrderDetails | null> {
		const order = await prisma.order.findUnique({
			where: {
				id,
			},
			include: {
				recipient: true,
			},
		});

		if (!order) {
			return null;
		}

		return OrderDetailsMapper.toDomain(order);
	}
}
