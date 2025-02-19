import { prisma } from '../prisma';
import { OrderMapper } from './mappers/order-mapper';
import { Order } from '@/domains/models/entities/order';
import { IOrderRepository } from '@/domains/application/features/orders/repositories/i-order-repository';

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

	async findManyByOwnerId(ownerId: string): Promise<Order[]> {
		const orders = await prisma.order.findMany({
			where: {
				ownerId,
			},
		});

		return orders.map(OrderMapper.toDomain);
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
}
