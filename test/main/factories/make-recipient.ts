import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Recipient } from '@/domains/main/resources/entities/recipient';

export function makeRecipient(override: Partial<Recipient>, id?: UniqueEntityId) {
	const recipient = Recipient.create(
		{
			name: faker.person.fullName(),
			email: faker.internet.email(),
			cpf: faker.number.int({ min: 11, max: 11 }).toString(),
			rua: faker.location.street(),
			numero: faker.location.buildingNumber(),
			complemento: 'Apt 202',
			bairro: 'Jardim das Americas',
			cidade: faker.location.city(),
			estado: faker.location.state(),
			cep: faker.location.zipCode(),
			...override,
		},
		id
	);

	return recipient;
}
