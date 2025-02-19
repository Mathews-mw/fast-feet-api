import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateRecipientRequest } from '../../schemas/create-recipient-schema';
import { CreateRecipientUseCase } from '@/domains/application/features/recipients/use-cases/create-recipient-use-case';

export async function createRecipientController(request: FastifyRequest, reply: FastifyReply) {
	const { name, email, phone, cpf, cep, street, number, complement, district, city, state } =
		request.body as CreateRecipientRequest;

	const service = container.resolve(CreateRecipientUseCase);

	const result = await service.execute({
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

	if (result.isFalse()) {
		throw result.value;
	}

	return reply
		.status(201)
		.send({ message: 'Recipient created successfully', recipient_id: result.value.recipient.id.toString() });
}
