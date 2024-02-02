import { Injectable } from '@nestjs/common';

import { Outcome, failure, success } from '@/core/outcome';
import { Package, TPackageStatus } from '../../resources/entities/package';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { IPackageRepository } from '../repositories/implementations/IPackageRepository';

interface UpdatePackageStatusRequest {
	packageId: string;
	status: TPackageStatus;
}

type EResponse = Outcome<
	ResourceNotFoundError,
	{
		package: Package;
	}
>;

@Injectable()
export class UpdatePackageStatusUseCase {
	constructor(private packagesRepository: IPackageRepository) {}

	async execute({ packageId, status }: UpdatePackageStatusRequest): Promise<EResponse> {
		const package_ = await this.packagesRepository.findById(packageId);

		if (!package_) {
			return failure(new ResourceNotFoundError());
		}

		package_.status = status;

		await this.packagesRepository.update(package_);

		return success({ package: package_ });
	}
}
