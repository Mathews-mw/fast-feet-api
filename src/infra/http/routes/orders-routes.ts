import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { authMiddleware } from '../middlewares/auth-middleware';
import { createOrderSchema } from '../schemas/create-order-schema';
import { pickUpOrderSchema } from '../schemas/pick-up-order-schema';
import { uploadPreHandler } from '../pre-handlers/upload-pre-handler';
import { orderDeliveredSchema } from '../schemas/order-delivered-schema';
import { verifyUserPermissions } from '../middlewares/permission-middleware';
import { updateOrderStatusSchema } from '../schemas/update-order-status-schema';
import { listingUserOrdersSchema } from '../schemas/listing-user-orders-schema';
import { createOrderController } from '../controllers/orders/create-order-controller';
import { pickupOrderController } from '../controllers/orders/pickup-order-controller';
import { orderDeliveredController } from '../controllers/orders/order-delivered-controller';
import { updateOrderStatusController } from '../controllers/orders/update-order-status-controller';
import { listingUserOrdersController } from '../controllers/orders/listing-user-orders-controller';
import { listingOrderNearbyUserSchema } from '../schemas/listing-orders-nearby-user-location-schema';
import { listingOrdersNearbyUserLocationController } from '../controllers/orders/listing-orders-nearby-user-location-controller';

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
			'/:orderId/status',
			{
				preHandler: [verifyUserPermissions('Order', 'update')],
				schema: updateOrderStatusSchema,
			},
			updateOrderStatusController
		);

	app
		.withTypeProvider<ZodTypeProvider>()
		.register(authMiddleware)
		.patch(
			'/:orderId/pickup',
			{
				preHandler: [verifyUserPermissions('Order', 'update')],
				schema: pickUpOrderSchema,
			},
			pickupOrderController
		);

	app
		.withTypeProvider<ZodTypeProvider>()
		.register(authMiddleware)
		.patch(
			'/:orderId/delivered',
			{
				preHandler: [verifyUserPermissions('Order', 'update'), uploadPreHandler],
				schema: orderDeliveredSchema,
			},
			orderDeliveredController
		);

	app
		.withTypeProvider<ZodTypeProvider>()
		.register(authMiddleware)
		.get(
			'/user',
			{
				preHandler: [verifyUserPermissions('Order', 'read')],
				schema: listingUserOrdersSchema,
			},
			listingUserOrdersController
		);

	app
		.withTypeProvider<ZodTypeProvider>()
		.register(authMiddleware)
		.get(
			'/user/nearby',
			{
				preHandler: [verifyUserPermissions('Order', 'read')],
				schema: listingOrderNearbyUserSchema,
			},
			listingOrdersNearbyUserLocationController
		);
}
