import { User as PrismaUser } from '@prisma/client';
import { User } from '@/domains/models/entities/user';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export class UserMapper {
	static toDomain(data: PrismaUser): User {
		return User.create(
			{
				name: data.name,
				email: data.email,
				cpf: data.cpf,
				password: data.password,
				role: data.role,
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
			},
			new UniqueEntityId(data.id)
		);
	}

	static toDatabase(data: User): PrismaUser {
		return {
			id: data.id.toString(),
			name: data.name,
			email: data.email,
			cpf: data.cpf,
			password: data.password,
			role: data.role,
			createdAt: data.createdAt,
			updatedAt: data.updatedAt ?? null,
		};
	}
}
