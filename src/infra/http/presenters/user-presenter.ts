import { User } from '@/domains/models/entities/user';

export class UserPresenter {
	static toHTTP(data: User) {
		return {
			id: data.id.toString(),
			name: data.name,
			email: data.email,
			cpf: data.cpf,
			role: data.role,
			created_at: data.createdAt,
		};
	}
}
