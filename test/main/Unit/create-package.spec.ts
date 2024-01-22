import { faker } from '@faker-js/faker';

import { makeRecipient } from '../factories/make-recipient';
import { InMemoryPackagesRepository } from '../in-memory/in-memory-packages-repository';
import { CreatePackageUseCase } from '@/domains/main/application/use-cases/create-package';
import { InMemoryRecipientsRepository } from '../in-memory/in-memory-recipients-repository';
import { RecipientDoesNotExistsError } from '@/domains/main/application/use-cases/errors/recipient-does-not-exists-error';

let packagesRepository: InMemoryPackagesRepository;
let recipientsRepository: InMemoryRecipientsRepository;
let createPackageUseCase: CreatePackageUseCase;

describe('Create Package Use Case', () => {
	beforeEach(() => {
		recipientsRepository = new InMemoryRecipientsRepository();
		packagesRepository = new InMemoryPackagesRepository();
		createPackageUseCase = new CreatePackageUseCase(recipientsRepository, packagesRepository);
	});

	it('Should be able to create a new package', async () => {
		const recipient = makeRecipient({});

		recipientsRepository.items.push(recipient);

		const result = await createPackageUseCase.execute({
			recipientCpf: recipient.cpf,
		});

		expect(result.isSucces()).toBe(true);
		expect(result.value).toEqual({
			package: packagesRepository.items[0],
		});

		if (result.isSucces()) {
			expect(result.value.package.recipientId).toEqual(recipient.id);
		}
	});

	it('Not should be able to create a package to unknown recipient', async () => {
		const result = await createPackageUseCase.execute({
			recipientCpf: '00114477885',
		});

		expect(result.isSucces()).toBe(false);
		expect(result.value).toBeInstanceOf(RecipientDoesNotExistsError);
	});
});
