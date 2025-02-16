import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { authenticateUserSchema } from '../schemas/authenticate-user-schema';
import { authenticateUserController } from '../controllers/auth/authenticate-user-controller';

export async function authRoutes(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/',
		{
			schema: authenticateUserSchema,
		},
		(request, reply) => authenticateUserController(request, reply)
	);
}
