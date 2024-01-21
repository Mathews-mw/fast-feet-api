import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optionals';

export interface IRecipientProps {
	name: string;
	email: string;
	cpf: string;
	rua: string;
	numero: string;
	complemento?: string;
	bairro: string;
	cidade: string;
	estado: string;
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

	get rua() {
		return this.props.rua;
	}

	get numero() {
		return this.props.numero;
	}

	get complemento() {
		return this.props.complemento;
	}

	get bairro() {
		return this.props.bairro;
	}

	get cidade() {
		return this.props.cidade;
	}

	get estado() {
		return this.props.estado;
	}

	get cep() {
		return this.props.cep;
	}

	static create(props: Optional<IRecipientProps, 'complemento'>, id?: UniqueEntityId) {
		const deliveryman = new Recipient(props, id);

		return deliveryman;
	}
}
