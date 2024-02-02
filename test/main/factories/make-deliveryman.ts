import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Deliveryman } from '@/domains/main/resources/entities/deliveryman';

export function makeDeliveryman(override: Partial<Deliveryman>, id?: UniqueEntityId) {
	const deliveryman = Deliveryman.create(
		{
			name: faker.person.fullName(),
			email: faker.internet.email(),
			cpf: faker.number.int({ min: 11, max: 11 }).toString(),
			password: faker.internet.password(),
			city: faker.location.city(),
			cep: faker.location.zipCode(),
			isDeliveryman: true,
			...override,
		},
		id
	);

	return deliveryman;
}
