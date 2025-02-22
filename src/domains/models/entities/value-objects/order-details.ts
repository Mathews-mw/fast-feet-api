import { OrderStatus } from '../order';
import { Recipient } from '../recipient';
import { ValueObject } from '@/core/entities/value-object';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IOrderDetailsProps {
	id: UniqueEntityId;
	recipientId: UniqueEntityId;
	ownerId?: UniqueEntityId | null;
	status: OrderStatus;
	postedAt: Date;
	withdrawalAt?: Date | null;
	deliveryAt?: Date | null;
	statusUpdatedAt?: Date | null;
	recipient: Recipient;
}

export class OrderDetails extends ValueObject<IOrderDetailsProps> {
	get id() {
		return this.props.id;
	}

	get recipientId() {
		return this.props.recipientId;
	}

	get ownerId() {
		return this.props.ownerId;
	}

	get status() {
		return this.props.status;
	}

	get postedAt() {
		return this.props.postedAt;
	}

	get withdrawalAt() {
		return this.props.withdrawalAt;
	}

	get deliveryAt() {
		return this.props.deliveryAt;
	}

	get statusUpdatedAt() {
		return this.props.statusUpdatedAt;
	}

	get recipient() {
		return this.props.recipient;
	}

	static create(props: IOrderDetailsProps) {
		return new OrderDetails(props);
	}
}
