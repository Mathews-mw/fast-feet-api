import { inject, injectable } from 'tsyringe';

import { User } from '@/domains/models/entities/user';
import { failure, Outcome, success } from '@/core/outcome';
import containerKeysConfig from '@/config/container-keys-config';
import { IUserRepository } from '../repositories/i-user-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface IRequest {
	id: string;
}

type Response = Outcome<ResourceNotFoundError, { user: User }>;

@injectable()
export class getUserByIdUseCase {
	constructor(@inject(containerKeysConfig.repositories.users_repository) private usersRepository: IUserRepository) {}

	async execute({ id }: IRequest): Promise<Response> {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			return failure(new ResourceNotFoundError('User not found'));
		}

		return success({ user });
	}
}
