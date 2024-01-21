import { Admin } from '@/domains/main/resources/entities/admin';
import { IAdminRepository } from '@/domains/main/application/repositories/implementations/IAdminRepository';

export class InMemoryAdminsRepository implements IAdminRepository {
	public items: Admin[] = [];

	async create(admin: Admin): Promise<Admin> {
		this.items.push(admin);

		return admin;
	}

	async update(admin: Admin): Promise<void> {
		const adminIndex = this.items.findIndex((item) => item.id === admin.id);

		this.items[adminIndex] = admin;
	}

	async findByCpf(cpf: string): Promise<Admin | null> {
		const admin = this.items.find((admin) => admin.cpf === cpf);

		if (!admin) {
			return null;
		}

		return admin;
	}

	async findByEmail(email: string): Promise<Admin | null> {
		const admin = this.items.find((admin) => admin.email === email);

		if (!admin) {
			return null;
		}

		return admin;
	}
}
