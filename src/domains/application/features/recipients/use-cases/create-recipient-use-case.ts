import { inject, injectable } from 'tsyringe';

import { Outcome, success } from '@/core/outcome';
import { Recipient } from '@/domains/models/entities/recipient';
import containerKeysConfig from '@/config/container-keys-config';
import { IRecipientRepository } from '../repositories/i-recipient-repository';

interface IRequest {
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
}

type Response = Outcome<null, { recipient: Recipient }>;

@injectable()
export class CreateRecipientUseCase {
	constructor(
		@inject(containerKeysConfig.repositories.recipients_repository) private recipientsRepository: IRecipientRepository
	) {}

	async execute({
		name,
		email,
		phone,
		cpf,
		cep,
		street,
		number,
		complement,
		district,
		city,
		state,
	}: IRequest): Promise<Response> {
		const recipient = Recipient.create({
			name,
			email,
			phone,
			cpf,
			cep,
			street,
			number,
			complement,
			district,
			city,
			state,
		});

		await this.recipientsRepository.create(recipient);

		return success({ recipient });
	}
}
