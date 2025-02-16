import 'fastify';
import { Role } from '@/core/auth/roles';

declare module 'fastify' {
	export interface FastifyRequest {
		user: {
			sub: string;
			role: Role;
		};
	}
}
