import { Order as PrismaOrder } from '@prisma/client';
import { Order } from '@/domains/models/entities/order';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export class OrderMapper {
	static toDomain(data: PrismaOrder): Order {
		return Order.create(
			{
				recipientId: new UniqueEntityId(data.recipientId),
				ownerId: data.ownerId ? new UniqueEntityId(data.ownerId) : null,
				status: data.status,
				postedAt: data.postedAt,
				withdrawalAt: data.withdrawalAt,
				deliveryAt: data.deliveryAt,
				statusUpdatedAt: data.statusUpdatedAt,
			},
			new UniqueEntityId(data.id)
		);
	}

	static toDatabase(data: Order): PrismaOrder {
		return {
			id: data.id.toString(),
			recipientId: data.recipientId.toString(),
			ownerId: data.ownerId ? data.ownerId.toString() : null,
			status: data.status,
			postedAt: data.postedAt,
			withdrawalAt: data.withdrawalAt ?? null,
			deliveryAt: data.deliveryAt ?? null,
			statusUpdatedAt: data.statusUpdatedAt ?? null,
		};
	}
}
