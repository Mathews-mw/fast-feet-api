import { RecipientPresenter } from './recipient-presenter';
import { OrderDetails } from '@/domains/models/entities/value-objects/order-details';

export class OrderDetailsPresenter {
	static toHTTP(data: OrderDetails) {
		return {
			id: data.id.toString(),
			recipient_id: data.recipientId.toString(),
			owner_id: data.ownerId ? data.ownerId.toString() : null,
			status: data.status,
			posted_at: data.postedAt,
			withdrawal_at: data.withdrawalAt,
			delivery_at: data.deliveryAt,
			status_updated_at: data.statusUpdatedAt,
			recipient: RecipientPresenter.toHTTP(data.recipient),
		};
	}
}
