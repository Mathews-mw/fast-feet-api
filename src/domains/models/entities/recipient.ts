import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IRecipientProps {
	name: string;
	email: string;
	phone: string;
	cpf: string;
	cep: string;
	street: string;
	number: string;
	complement?: string | null;
	district: string;
	city: string;
	state: string;
	latitude: number;
	longitude: number;
}

export class Recipient extends Entity<IRecipientProps> {
	get name() {
		return this.props.name;
	}

	set name(name: string) {
		this.props.name = name;
	}

	get email() {
		return this.props.email;
	}

	set email(email: string) {
		this.props.email = email;
	}

	get phone() {
		return this.props.phone;
	}

	set phone(phone: string) {
		this.props.phone = phone;
	}

	get cpf() {
		return this.props.cpf;
	}

	set cpf(cpf: string) {
		this.props.cpf = cpf;
	}

	get cep() {
		return this.props.cep;
	}

	set cep(cep: string) {
		this.props.cep = cep;
	}

	get street() {
		return this.props.street;
	}

	set street(street: string) {
		this.props.street = street;
	}

	get number() {
		return this.props.number;
	}

	set number(number: string) {
		this.props.number = number;
	}

	get complement() {
		return this.props.complement;
	}

	set complement(complement: string | null | undefined) {
		this.props.complement = complement;
	}

	get district() {
		return this.props.district;
	}

	set district(district: string) {
		this.props.district = district;
	}

	get city() {
		return this.props.city;
	}

	set city(city: string) {
		this.props.city = city;
	}

	get state() {
		return this.props.state;
	}

	set state(state: string) {
		this.props.state = state;
	}

	get latitude() {
		return this.props.latitude;
	}

	set latitude(latitude: number) {
		this.props.latitude = latitude;
	}

	get longitude() {
		return this.props.longitude;
	}

	set longitude(longitude: number) {
		this.props.longitude = longitude;
	}

	static create(props: Optional<IRecipientProps, 'complement'>, id?: UniqueEntityId) {
		const recipient = new Recipient(props, id);

		return recipient;
	}
}
