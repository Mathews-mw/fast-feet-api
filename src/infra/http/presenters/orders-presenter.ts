import { Order } from '@/domains/models/entities/order';

export class OrderPresenter {
	static toHTTP(data: Order) {
		return {
			id: data.id.toString(),
			recipient_id: data.recipientId.toString(),
			owner_id: data.ownerId ? data.ownerId.toString() : null,
			status: data.status,
			posted_at: data.postedAt,
			withdrawal_at: data.withdrawalAt,
			delivery_at: data.deliveryAt,
			status_updated_at: data.statusUpdatedAt,
		};
	}
}
