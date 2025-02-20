import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { authMiddleware } from '../middlewares/auth-middleware';
import { createOrderSchema } from '../schemas/create-order-schema';
import { verifyUserPermissions } from '../middlewares/permission-middleware';
import { createOrderController } from '../controllers/orders/create-order-controller';
import { orderDeliveredController } from '../controllers/orders/order-delivered-controller';
import { uploadPreHandler } from '../pre-handlers/upload-pre-handler';

export async function ordersRoutes(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(authMiddleware)
		.post(
			'/',
			{
				preHandler: verifyUserPermissions('Order', 'create'),
				schema: createOrderSchema,
			},
			createOrderController
		);

	app
		.withTypeProvider<ZodTypeProvider>()
		.register(authMiddleware)
		.patch(
			'/:orderId/delivered',
			{
				preHandler: [verifyUserPermissions('Order', 'update'), uploadPreHandler],
				// schema: createUserSchema,
			},
			orderDeliveredController
		);
}
