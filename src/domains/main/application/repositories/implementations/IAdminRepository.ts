import { Admin } from '@/domains/main/resources/entities/admin';

export abstract class IAdminRepository {
	abstract create(admin: Admin): Promise<Admin>;
	abstract update(admin: Admin): Promise<void>;
	abstract findByCpf(cpf: string): Promise<Admin | null>;
	abstract findByEmail(email: string): Promise<Admin | null>;
}
