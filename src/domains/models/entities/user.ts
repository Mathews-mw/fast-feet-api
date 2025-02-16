import { Role } from '@/core/auth/roles';
import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IUserProps {
	name: string;
	email: string;
	cpf: string;
	password: string;
	role: Role;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class User extends Entity<IUserProps> {
	get name() {
		return this.props.name;
	}

	set name(name: string) {
		this.props.name = name;
		this._touch();
	}

	get email() {
		return this.props.email;
	}

	set email(email: string) {
		this.props.email = email;
		this._touch();
	}

	get cpf() {
		return this.props.cpf;
	}

	set cpf(cpf: string) {
		this.props.cpf = cpf;
		this._touch();
	}

	get password() {
		return this.props.password;
	}

	set password(password: string) {
		this.props.password = password;
		this._touch();
	}

	get role() {
		return this.props.role;
	}

	set role(role: Role) {
		this.props.role = role;
		this._touch();
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	private _touch() {
		this.props.updatedAt = new Date();
	}

	static create(props: Optional<IUserProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityId) {
		const user = new User(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id
		);

		return user;
	}
}
