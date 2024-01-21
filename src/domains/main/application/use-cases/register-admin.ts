import { Admin } from '../../resources/entities/admin';
import { Outcome, failure, success } from '@/core/outcome';
import { IPasswordHasher } from '../cryptography/IPasswordHasher';
import { AdminAlreadyExistsError } from './errors/admin-already-exists-error';
import { IAdminRepository } from '../repositories/implementations/IAdminRepository';

interface RegisterAdminRequest {
	name: string;
	email: string;
	cpf: string;
	password: string;
}

type EResponse = Outcome<
	AdminAlreadyExistsError,
	{
		admin: Admin;
	}
>;

export class RegisterAdminUseCase {
	constructor(
		private adminsRepository: IAdminRepository,
		private passwordHasher: IPasswordHasher
	) {}

	async execute({ name, email, cpf, password }: RegisterAdminRequest): Promise<EResponse> {
		const adminWithSameCpf = await this.adminsRepository.findByCpf(cpf);

		if (adminWithSameCpf) {
			return failure(new AdminAlreadyExistsError(cpf));
		}

		const hashedPassword = await this.passwordHasher.hash(password);

		const admin = Admin.create({
			name,
			email,
			cpf,
			password: hashedPassword,
			isAdmin: true,
		});

		const result = await this.adminsRepository.create(admin);

		return success({ admin: result });
	}
}
