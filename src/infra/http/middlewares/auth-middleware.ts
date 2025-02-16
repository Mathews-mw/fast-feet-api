import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { UnauthorizedError } from '@/core/errors/unauthorized-error';
import { Role } from '@/core/auth/roles';

interface IJwtPayload {
	sub: string;
	role: Role;
	iat: number;
	exp: number;
}

export const authMiddleware = fastifyPlugin(async (app: FastifyInstance) => {
	app.addHook('preHandler', async (request) => {
		try {
			const jwtPayload = await request.jwtVerify<IJwtPayload>();

			const { sub, role } = jwtPayload;

			request.user = {
				sub,
				role,
			};
		} catch (error) {
			throw new UnauthorizedError('Invalid auth token');
		}
	});
});
