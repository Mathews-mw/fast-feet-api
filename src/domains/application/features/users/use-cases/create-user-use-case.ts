import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { Role } from '@/core/auth/roles';
import { User } from '@/domains/models/entities/user';
import { failure, Outcome, success } from '@/core/outcome';
import cryptographyConfig from '@/config/cryptography-config';
import containerKeysConfig from '@/config/container-keys-config';
import { BadRequestError } from '@/core/errors/bad-request-errors';
import { IUserRepository } from '../repositories/i-user-repository';

interface IRequest {
	name: string;
	email: string;
	cpf: string;
	password: string;
	role: Role;
}

type Response = Outcome<BadRequestError, { user: User }>;

@injectable()
export class CreateUserUseCase {
	constructor(@inject(containerKeysConfig.repositories.users_repository) private usersRepository: IUserRepository) {}

	async execute({ name, email, cpf, password, role }: IRequest): Promise<Response> {
		const user = await this.usersRepository.findByEmail(email);

		if (user) {
			return failure(new BadRequestError('User with same e-mail already exists'));
		}

		const hashPassword = await hash(password, cryptographyConfig.HASH_SALT_LENGTH);

		const newUser = User.create({
			name,
			email,
			password: hashPassword,
			cpf,
			role,
		});

		await this.usersRepository.create(newUser);

		return success({ user: newUser });
	}
}
