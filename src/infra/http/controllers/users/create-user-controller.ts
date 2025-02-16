import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateUserRequest } from '../../schemas/create-user-schema';
import { CreateUserUseCase } from '@/domains/application/features/users/use-cases/create-user-use-case';

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
	const { name, email, password, cpf, role } = request.body as CreateUserRequest;

	const service = container.resolve(CreateUserUseCase);

	const result = await service.execute({
		name,
		email,
		cpf,
		password,
		role,
	});

	if (result.isFalse()) {
		throw result.value;
	}

	return reply.status(201).send({ message: 'User created successfully', user_id: result.value.user.id.toString() });
}
