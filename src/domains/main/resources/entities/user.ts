import { Entity } from '@/core/entities/entity';

export interface IUserProps {
	name: string;
	email: string;
	cpf: string;
	password: string;
	createdAt: Date;
}

export abstract class User<Props extends IUserProps> extends Entity<Props> {
	get name() {
		return this.props.name;
	}

	set name(name: string) {
		this.props.name = name;
	}

	get email() {
		return this.props.email;
	}

	get cpf() {
		return this.props.cpf;
	}

	get password() {
		return this.props.password;
	}

	set password(password: string) {
		this.props.password = password;
	}

	get createdAt() {
		return this.props.createdAt;
	}
}
