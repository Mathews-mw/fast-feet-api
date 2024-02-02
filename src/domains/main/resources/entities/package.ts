import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optionals';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export enum EPackageStatus {
	waiting,
	delivered,
	returned,
	dispatched,
}

export type TPackageStatus = keyof typeof EPackageStatus;

export interface IPackageProps {
	deliverymanId?: UniqueEntityId | null;
	recipientId: UniqueEntityId;
	status: TPackageStatus;
	postedAt: Date;
	updatedAt?: Date | null;
}

export class Package extends Entity<IPackageProps> {
	get deliverymanId() {
		return this.props.deliverymanId;
	}

	get recipientId() {
		return this.props.recipientId;
	}

	get status() {
		return this.props.status;
	}

	set status(status: TPackageStatus) {
		this.props.status = status;
		this.touch();
	}

	get postedAt() {
		return this.props.postedAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	static create(props: Optional<IPackageProps, 'postedAt' | 'updatedAt' | 'status'>, id?: UniqueEntityId) {
		const deliveryman = new Package(
			{
				...props,
				status: 'waiting',
				postedAt: props.postedAt ?? new Date(),
			},
			id
		);

		return deliveryman;
	}
}
