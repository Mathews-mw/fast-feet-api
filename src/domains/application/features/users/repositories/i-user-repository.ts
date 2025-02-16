import { User } from '@/domains/models/entities/user';

export interface IUserRepository {
	create(user: User): Promise<User>;
	update(user: User): Promise<User>;
	delete(user: User): Promise<void>;
	findMany(): Promise<User[]>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByCpf(cpf: string): Promise<User | null>;
}
