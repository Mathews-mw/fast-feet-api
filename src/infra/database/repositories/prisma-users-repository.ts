import { prisma } from '../prisma';
import { UserMapper } from './mappers/user-mapper';
import { User } from '@/domains/models/entities/user';
import { IUserRepository } from '@/domains/application/features/users/repositories/i-user-repository';

export class PrismaUsersRepository implements IUserRepository {
	async create(user: User): Promise<User> {
		const data = UserMapper.toDatabase(user);

		await prisma.user.create({ data });

		return user;
	}

	async update(user: User): Promise<User> {
		const data = UserMapper.toDatabase(user);

		await prisma.user.update({
			data,
			where: {
				id: user.id.toString(),
			},
		});

		return user;
	}

	async delete(user: User): Promise<void> {
		await prisma.user.delete({
			where: {
				id: user.id.toString(),
			},
		});
	}

	async findMany(): Promise<User[]> {
		const users = await prisma.user.findMany();

		return users.map(UserMapper.toDomain);
	}

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			return null;
		}

		return UserMapper.toDomain(user);
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return null;
		}

		return UserMapper.toDomain(user);
	}

	async findByCpf(cpf: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				cpf,
			},
		});

		if (!user) {
			return null;
		}

		return UserMapper.toDomain(user);
	}
}
