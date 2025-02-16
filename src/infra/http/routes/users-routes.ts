import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { authMiddleware } from '../middlewares/auth-middleware';
import { createUserSchema } from '../schemas/create-user-schema';
import { verifyUserPermissions } from '../middlewares/permission-middleware';
import { createUserController } from '../controllers/users/create-user-controller';
import { getUserProfileController } from '../controllers/users/get-user-profile-controller';

export async function usersRoutes(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(authMiddleware)
		.post(
			'/',
			{
				preHandler: verifyUserPermissions('User', 'create'),
				schema: createUserSchema,
			},
			createUserController
		);

	app.withTypeProvider<ZodTypeProvider>().register(authMiddleware).get('/me', getUserProfileController);
}
