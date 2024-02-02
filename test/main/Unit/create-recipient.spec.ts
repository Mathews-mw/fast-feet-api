import { faker } from '@faker-js/faker';

import { makeRecipient } from '../factories/make-recipient';
import { InMemoryRecipientsRepository } from '../in-memory/in-memory-recipients-repository';
import { CreateRecipientUseCase } from '@/domains/main/application/use-cases/create-recipient';
import { RecipientAlreadyExistsError } from '@/domains/main/application/use-cases/errors/recipient-already-exists-error';

let recipientsRepository: InMemoryRecipientsRepository;
let createRecipientUseCase: CreateRecipientUseCase;

describe('Create Recipient Use Case', () => {
	beforeEach(() => {
		recipientsRepository = new InMemoryRecipientsRepository();
		createRecipientUseCase = new CreateRecipientUseCase(recipientsRepository);
	});

	it('Should be able to create a new recipient', async () => {
		const result = await createRecipientUseCase.execute({
			name: 'John Doe',
			email: faker.internet.email(),
			cpf: '02288899977',
			rua: faker.location.street(),
			numero: faker.location.buildingNumber(),
			complemento: 'Apt 202',
			bairro: 'Jardim das Americas',
			cidade: faker.location.city(),
			estado: faker.location.state(),
			cep: faker.location.zipCode(),
		});

		expect(result.isSucces()).toBe(true);
		expect(result.value).toEqual({
			recipient: recipientsRepository.items[0],
		});
	});

	it('Not should be able to create the same recipient twice', async () => {
		const recipient = makeRecipient({ cpf: '02288899977' });

		recipientsRepository.items.push(recipient);

		const result = await createRecipientUseCase.execute({
			name: 'John Doe',
			email: faker.internet.email(),
			cpf: '02288899977',
			rua: faker.location.street(),
			numero: faker.location.buildingNumber(),
			complemento: 'Apt 202',
			bairro: 'Jardim das Americas',
			cidade: faker.location.city(),
			estado: faker.location.state(),
			cep: faker.location.zipCode(),
		});

		expect(result.isSucces()).toBe(false);
		expect(result.value).toBeInstanceOf(RecipientAlreadyExistsError);
	});
});
