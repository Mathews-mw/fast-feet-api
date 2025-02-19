import 'reflect-metadata';
import '@/shared/containers/index';

import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifyMultipart from '@fastify/multipart';
import fastifySwaggerUi from '@fastify/swagger-ui';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { env } from '@/env';
import { routes } from './http/routes';
import { errorHandler } from './error-handler';

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyMultipart, { attachFieldsToBody: true });

app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Fast Feet API',
			description: 'An API from Fast Feet services',
			version: '1.0.0',
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

app.register(fastifyCors);

app.register(routes, { prefix: '/api' });
