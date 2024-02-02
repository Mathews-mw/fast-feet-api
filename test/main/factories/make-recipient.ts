import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Recipient } from '@/domains/main/resources/entities/recipient';

export function makeRecipient(override: Partial<Recipient>, id?: UniqueEntityId) {
	const recipient = Recipient.create(
		{
			name: faker.person.fullName(),
			email: faker.internet.email(),
			cpf: faker.number.int({ min: 11, max: 11 }).toString(),
			street: faker.location.street(),
			number: faker.location.buildingNumber(),
			complement: 'Apt 202',
			district: 'Jardim das Americas',
			city: faker.location.city(),
			state: faker.location.state(),
			cep: faker.location.zipCode(),
			...override,
		},
		id
	);

	return recipient;
}
