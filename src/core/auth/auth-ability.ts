import z from 'zod';
import { Role } from './roles';
import { UserAuth } from './models/user-auth-model';

const entities = z.union([z.literal('User'), z.literal('Order'), z.literal('Recipient')]);
export type Entities = z.infer<typeof entities>;

const actions = z.union([z.literal('create'), z.literal('read'), z.literal('update'), z.literal('delete')]);
export type Actions = z.infer<typeof actions>;

export type PermissionsMap = Record<Role, Record<Entities, Actions[]>>;

export const rolePermissions: PermissionsMap = {
	ADMIN: {
		User: ['create', 'read', 'update', 'delete'],
		Order: ['create', 'read', 'update', 'delete'],
		Recipient: ['create', 'read', 'update', 'delete'],
	},

	DELIVERY_MAN: {
		User: ['read'],
		Order: ['read', 'update'],
		Recipient: ['read'],
	},
};

export class AuthAbility {
	static canPerformAction(user: UserAuth, action: Actions, entity: Entities): boolean {
		const permissions = rolePermissions[user.role] || {};
		const allowedActions = permissions[entity] || [];
		return allowedActions.includes(action);
	}
}
