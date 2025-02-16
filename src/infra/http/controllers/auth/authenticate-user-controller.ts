import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { AuthenticateUserRequest } from '../../schemas/authenticate-user-schema';
import { AuthenticateUserUseCase } from '@/domains/application/features/auth/authenticate-user-use-case';

export async function authenticateUserController(request: FastifyRequest, reply: FastifyReply) {
	const { email, password } = request.body as AuthenticateUserRequest;

	const service = container.resolve(AuthenticateUserUseCase);

	const result = await service.execute({
		email,
		password,
	});

	if (result.isFalse()) {
		throw result.value;
	}

	const { user } = result.value;

	const token = await reply.jwtSign(
		{
			role: user.role,
			sub: user.id.toString(),
		},
		{
			expiresIn: '7d',
		}
	);

	return reply.status(200).send({
		token,
	});
}
