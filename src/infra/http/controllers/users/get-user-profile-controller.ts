import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { UserPresenter } from '../../presenters/user-presenter';
import { getUserByIdUseCase } from '@/domains/application/features/users/use-cases/get-user-by-id-use-case';

export async function getUserProfileController(request: FastifyRequest, reply: FastifyReply) {
	const { sub } = request.user;

	const service = container.resolve(getUserByIdUseCase);

	const result = await service.execute({
		id: sub,
	});

	if (result.isFalse()) {
		throw result.value;
	}

	return reply.status(200).send(UserPresenter.toHTTP(result.value.user));
}
