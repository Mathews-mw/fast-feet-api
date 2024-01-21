import { FakerPasswordHasher } from 'test/cryptography/fake-password-hasher';
import { InMemoryDeliverymansRepository } from '../in-memory/in-memory-deliverymans-repository';
import { RegisterDeliverymanUseCase } from '@/domains/main/application/use-cases/register-deliveryman';

let fakerPasswordHasher: FakerPasswordHasher;
let deliverymansRepository: InMemoryDeliverymansRepository;
let registerDeliverymanUseCase: RegisterDeliverymanUseCase;

describe('Register Deliveryman Use Case', () => {
	beforeEach(() => {
		fakerPasswordHasher = new FakerPasswordHasher();
		deliverymansRepository = new InMemoryDeliverymansRepository();
		registerDeliverymanUseCase = new RegisterDeliverymanUseCase(deliverymansRepository, fakerPasswordHasher);
	});

	it('Should be able to register a new deliveryman', async () => {
		const result = await registerDeliverymanUseCase.execute({
			name: 'John Deliveryman',
			email: 'johndeliveryman@example.com',
			cpf: '07788899905',
			password: 'abc123',
			city: 'Manaus',
			cep: '69000000',
		});

		expect(result.isSucces()).toBe(true);
		expect(result.value).toEqual({
			deliveryman: deliverymansRepository.items[0],
		});
	});

	it('Should hash deliveryman password upon registration', async () => {
		await registerDeliverymanUseCase.execute({
			name: 'John Deliveryman',
			email: 'johndeliveryman@example.com',
			cpf: '07788899905',
			password: 'abc123',
			city: 'Manaus',
			cep: '69000000',
		});

		const hashedPassword = await fakerPasswordHasher.hash('abc123');

		expect(deliverymansRepository.items[0].password).toEqual(hashedPassword);
	});
});
