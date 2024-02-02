import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optionals';

export interface IRecipientProps {
	name: string;
	email: string;
	cpf: string;
	street: string;
	number: string;
	complement?: string;
	district: string;
	city: string;
	state: string;
	cep: string;
}

export class Recipient extends Entity<IRecipientProps> {
	get name() {
		return this.props.name;
	}

	get email() {
		return this.props.email;
	}

	get cpf() {
		return this.props.cpf;
	}

	get street() {
		return this.props.street;
	}

	get number() {
		return this.props.number;
	}

	get complement() {
		return this.props.complement;
	}

	get district() {
		return this.props.district;
	}

	get city() {
		return this.props.city;
	}

	get state() {
		return this.props.state;
	}

	get cep() {
		return this.props.cep;
	}

	static create(props: Optional<IRecipientProps, 'complement'>, id?: UniqueEntityId) {
		const deliveryman = new Recipient(props, id);

		return deliveryman;
	}
}
