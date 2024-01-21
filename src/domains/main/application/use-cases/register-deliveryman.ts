import { Outcome, failure, success } from '@/core/outcome';
import { IPasswordHasher } from '../cryptography/IPasswordHasher';
import { Deliveryman } from '../../resources/entities/deliveryman';
import { DeliverymanAlreadyExistsError } from './errors/deliveryman-already-exists-error';
import { IDeliverymanRepository } from '../repositories/implementations/IDeliverymanRepository';

interface RegisterDeliverymanRequest {
	name: string;
	email: string;
	cpf: string;
	password: string;
	city: string;
	cep: string;
}

type EResponse = Outcome<
	DeliverymanAlreadyExistsError,
	{
		deliveryman: Deliveryman;
	}
>;

export class RegisterDeliverymanUseCase {
	constructor(
		private deliverymansRepository: IDeliverymanRepository,
		private passwordHasher: IPasswordHasher
	) {}

	async execute({ name, email, cpf, password, cep, city }: RegisterDeliverymanRequest): Promise<EResponse> {
		const deliverymanWithSameCpf = await this.deliverymansRepository.findByCpf(cpf);

		if (deliverymanWithSameCpf) {
			return failure(new DeliverymanAlreadyExistsError(cpf));
		}

		const hashedPassword = await this.passwordHasher.hash(password);

		const deliveryman = Deliveryman.create({
			name,
			email,
			cpf,
			password: hashedPassword,
			city,
			cep,
			isDeliveryman: true,
		});

		const result = await this.deliverymansRepository.create(deliveryman);

		return success({ deliveryman: result });
	}
}
