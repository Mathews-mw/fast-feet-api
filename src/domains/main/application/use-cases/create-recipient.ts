import { Injectable } from '@nestjs/common';

import { Outcome, failure, success } from '@/core/outcome';
import { Recipient } from '../../resources/entities/recipient';
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error';
import { IRecipientRepository } from '../repositories/implementations/IRecipientRepository';

interface CreateRecipientRequest {
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

type EResponse = Outcome<
	RecipientAlreadyExistsError,
	{
		recipient: Recipient;
	}
>;

@Injectable()
export class CreateRecipientUseCase {
	constructor(private recipientsRepository: IRecipientRepository) {}

	async execute({ name, email, cpf, street, number, complement, district, city, state, cep }: CreateRecipientRequest): Promise<EResponse> {
		const recipientWithSameCpf = await this.recipientsRepository.findByCpf(cpf);

		if (recipientWithSameCpf) {
			return failure(new RecipientAlreadyExistsError(cpf));
		}

		const recipient = Recipient.create({
			name,
			email,
			cpf,
			street,
			number,
			complement,
			district,
			city,
			state,
			cep,
		});

		const result = await this.recipientsRepository.create(recipient);

		return success({ recipient: result });
	}
}
