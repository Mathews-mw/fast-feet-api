import { FakerPasswordHasher } from 'test/cryptography/fake-password-hasher';
import { InMemoryAdminsRepository } from '../in-memory/in-memory-admins-repository';
import { RegisterAdminUseCase } from '@/domains/main/application/use-cases/register-admin';

let fakerPasswordHasher: FakerPasswordHasher;
let adminsRepository: InMemoryAdminsRepository;
let registerAdminUseCase: RegisterAdminUseCase;

describe('Register Admin Use Case', () => {
	beforeEach(() => {
		fakerPasswordHasher = new FakerPasswordHasher();
		adminsRepository = new InMemoryAdminsRepository();
		registerAdminUseCase = new RegisterAdminUseCase(adminsRepository, fakerPasswordHasher);
	});

	it('Should be able to register a new admin', async () => {
		const result = await registerAdminUseCase.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			cpf: '07788899905',
			password: 'abc123',
		});

		expect(result.isSucces()).toBe(true);
		expect(result.value).toEqual({
			admin: adminsRepository.items[0],
		});
	});

	it('Should hash admin password upon registration', async () => {
		await registerAdminUseCase.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			cpf: '07788899905',
			password: 'abc123',
		});

		const hashedPassword = await fakerPasswordHasher.hash('abc123');

		expect(adminsRepository.items[0].password).toEqual(hashedPassword);
	});
});
