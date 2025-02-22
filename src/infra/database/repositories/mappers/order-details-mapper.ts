import { RecipientMapper } from './recipient-mapper';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Order as PrismaOrder, Recipient as PrismaRecipient } from '@prisma/client';
import { OrderDetails } from '@/domains/models/entities/value-objects/order-details';

type PrismaOrderDetails = PrismaOrder & {
	recipient: PrismaRecipient;
};

export class OrderDetailsMapper {
	static toDomain(data: PrismaOrderDetails): OrderDetails {
		return OrderDetails.create({
			id: new UniqueEntityId(data.id),
			recipientId: new UniqueEntityId(data.recipientId),
			ownerId: data.ownerId ? new UniqueEntityId(data.ownerId) : null,
			status: data.status,
			postedAt: data.postedAt,
			withdrawalAt: data.withdrawalAt,
			deliveryAt: data.deliveryAt,
			statusUpdatedAt: data.statusUpdatedAt,
			recipient: RecipientMapper.toDomain(data.recipient),
		});
	}
}
