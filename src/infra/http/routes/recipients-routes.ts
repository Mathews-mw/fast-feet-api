import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { authMiddleware } from '../middlewares/auth-middleware';
import { createRecipientSchema } from '../schemas/create-recipient-schema';
import { verifyUserPermissions } from '../middlewares/permission-middleware';
import { createRecipientController } from '../controllers/recipients/create-recipient-controller';

export async function recipientsRoutes(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(authMiddleware)
		.post(
			'/',
			{
				preHandler: verifyUserPermissions('Recipient', 'create'),
				schema: createRecipientSchema,
			},
			createRecipientController
		);
}
