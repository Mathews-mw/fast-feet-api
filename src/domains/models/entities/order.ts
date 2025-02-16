import z from 'zod';

import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export const orderStatusSchema = z.union([
	z.literal('POSTADO'),
	z.literal('EM_PREPARO'),
	z.literal('ROTA_ENTREGA'),
	z.literal('ENTREGUE'),
	z.literal('DEVOLVIDO'),
	z.literal('AUSENTE'),
]);

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export interface IOrderProps {
	recipientId: UniqueEntityId;
	ownerId?: UniqueEntityId | null;
	status: OrderStatus;
	postedAt: Date;
	withdrawalAt?: Date | null;
	deliveryAt?: Date | null;
	statusUpdatedAt?: Date | null;
}

export class Order extends Entity<IOrderProps> {
	get recipientId() {
		return this.props.recipientId;
	}

	set recipientId(recipientId: UniqueEntityId) {
		this.props.recipientId = recipientId;
	}

	get ownerId() {
		return this.props.ownerId;
	}

	set ownerId(ownerId: UniqueEntityId | null | undefined) {
		this.props.ownerId = ownerId;
	}

	get status() {
		return this.props.status;
	}

	set status(status: OrderStatus) {
		this.props.status = status;
		this.props.statusUpdatedAt = new Date();
	}

	get postedAt() {
		return this.props.postedAt;
	}

	set postedAt(postedAt: Date) {
		this.props.postedAt = postedAt;
	}

	get withdrawalAt() {
		return this.props.withdrawalAt;
	}

	set withdrawalAt(withdrawalAt: Date | undefined | null) {
		this.props.withdrawalAt = withdrawalAt;
	}

	get deliveryAt() {
		return this.props.deliveryAt;
	}

	set deliveryAt(deliveryAt: Date | undefined | null) {
		this.props.deliveryAt = deliveryAt;
	}

	get statusUpdatedAt() {
		return this.props.statusUpdatedAt;
	}

	static create(
		props: Optional<IOrderProps, 'ownerId' | 'postedAt' | 'deliveryAt' | 'withdrawalAt' | 'statusUpdatedAt'>,
		id?: UniqueEntityId
	) {
		const order = new Order(
			{
				...props,
				postedAt: props.postedAt ?? new Date(),
			},
			id
		);

		return order;
	}
}
