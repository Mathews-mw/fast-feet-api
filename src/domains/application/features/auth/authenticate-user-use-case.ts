import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '@/domains/models/entities/user';
import { failure, Outcome, success } from '@/core/outcome';
import containerKeysConfig from '@/config/container-keys-config';
import { UnauthorizedError } from '@/core/errors/unauthorized-error';
import { IUserRepository } from '../users/repositories/i-user-repository';

interface IRequest {
	email: string;
	password: string;
}

type Response = Outcome<UnauthorizedError, { user: User }>;

@injectable()
export class AuthenticateUserUseCase {
	constructor(@inject(containerKeysConfig.repositories.users_repository) private usersRepository: IUserRepository) {}

	async execute({ email, password }: IRequest): Promise<Response> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			return failure(new UnauthorizedError('Invalid credentials!'));
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return failure(new UnauthorizedError('Invalid credentials!'));
		}

		return success({
			user,
		});
	}
}
