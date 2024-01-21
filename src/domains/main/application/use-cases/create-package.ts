import { Injectable } from '@nestjs/common';

import { Package } from '../../resources/entities/package';
import { Outcome, failure, success } from '@/core/outcome';
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error';
import { IPackageRepository } from '../repositories/implementations/IPackageRepository';
import { IRecipientRepository } from '../repositories/implementations/IRecipientRepository';

interface CreatePackageRequest {
	recipientCpf: string;
}

type EResponse = Outcome<
	RecipientDoesNotExistsError,
	{
		package: Package;
	}
>;

@Injectable()
export class CreatePackageUseCase {
	constructor(
		private recipientsRepositoru: IRecipientRepository,
		private packagesRepository: IPackageRepository
	) {}

	async execute({ recipientCpf }: CreatePackageRequest): Promise<EResponse> {
		const recipient = await this.recipientsRepositoru.findByCpf(recipientCpf);

		if (!recipient) {
			return failure(new RecipientDoesNotExistsError(recipientCpf));
		}

		const _package = Package.create({
			recipientId: recipient.id,
		});

		const result = await this.packagesRepository.create(_package);

		return success({ package: result });
	}
}
