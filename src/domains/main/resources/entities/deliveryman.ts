import { Optional } from '@/core/types/optionals';
import { IUserProps, User } from './user';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IDeliverymanProps extends IUserProps {
	isDeliveryman: boolean;
	city: string;
	cep: string;
}

export class Deliveryman extends User<IDeliverymanProps> {
	get isDeliveryman() {
		return this.props.isDeliveryman;
	}

	get city() {
		return this.props.city;
	}

	set city(city: string) {
		this.props.city = city;
	}

	get cep() {
		return this.props.cep;
	}

	set cep(cep: string) {
		this.props.cep = cep;
	}

	static create(props: Optional<IDeliverymanProps, 'createdAt'>, id?: UniqueEntityId) {
		const deliveryman = new Deliveryman(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id
		);

		return deliveryman;
	}
}
