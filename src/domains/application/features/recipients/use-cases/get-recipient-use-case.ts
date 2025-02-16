import { inject, injectable } from 'tsyringe';

import { failure, Outcome, success } from '@/core/outcome';
import { Recipient } from '@/domains/models/entities/recipient';
import containerKeysConfig from '@/config/container-keys-config';
import { IRecipientRepository } from '../repositories/i-recipient-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface IRequest {
	id: string;
}

type Response = Outcome<ResourceNotFoundError, { recipient: Recipient }>;

@injectable()
export class getRecipientUseCase {
	constructor(
		@inject(containerKeysConfig.repositories.recipients_repository) private recipientsRepository: IRecipientRepository
	) {}

	async execute({ id }: IRequest): Promise<Response> {
		const recipient = await this.recipientsRepository.findById(id);

		if (!recipient) {
			return failure(new ResourceNotFoundError('Recipient not found'));
		}

		return success({ recipient });
	}
}
