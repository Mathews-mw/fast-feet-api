import { Injectable } from '@nestjs/common';

import { Outcome, failure, success } from '@/core/outcome';
import { Recipient } from '../../resources/entities/recipient';
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error';
import { IRecipientRepository } from '../repositories/implementations/IRecipientRepository';

interface CreateRecipientRequest {
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

type EResponse = Outcome<
	RecipientAlreadyExistsError,
	{
		recipient: Recipient;
	}
>;

@Injectable()
export class CreateRecipientUseCase {
	constructor(private recipientsRepository: IRecipientRepository) {}

	async execute({ name, email, cpf, rua, numero, complemento, bairro, cidade, estado, cep }: CreateRecipientRequest): Promise<EResponse> {
		const recipientWithSameCpf = await this.recipientsRepository.findByCpf(cpf);

		if (recipientWithSameCpf) {
			return failure(new RecipientAlreadyExistsError(cpf));
		}

		const recipient = Recipient.create({
			name,
			email,
			cpf,
			rua,
			numero,
			complemento,
			bairro,
			cidade,
			estado,
			cep,
		});

		const result = await this.recipientsRepository.create(recipient);

		return success({ recipient: result });
	}
}
