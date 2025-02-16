import { FastifyInstance } from 'fastify';
import { authRoutes } from './auth-routes';
import { usersRoutes } from './users-routes';

export async function routes(app: FastifyInstance) {
	app.register(authRoutes, { prefix: '/auth' });
	app.register(usersRoutes, { prefix: '/users' });
}
