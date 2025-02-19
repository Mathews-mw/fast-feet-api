import { FastifyInstance } from 'fastify';
import { authRoutes } from './auth-routes';
import { usersRoutes } from './users-routes';
import { ordersRoutes } from './orders-routes';
import { recipientsRoutes } from './recipients-routes';

export async function routes(app: FastifyInstance) {
	app.register(authRoutes, { prefix: '/auth' });
	app.register(usersRoutes, { prefix: '/users' });
	app.register(ordersRoutes, { prefix: '/orders' });
	app.register(recipientsRoutes, { prefix: '/recipients' });
}
