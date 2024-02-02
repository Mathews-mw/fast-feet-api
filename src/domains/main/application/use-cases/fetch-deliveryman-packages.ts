import { Outcome, success } from '@/core/outcome';
import { Package } from '../../resources/entities/package';
import { IPackageRepository } from '../repositories/implementations/IPackageRepository';

interface FetchDeliverymanPackagesRequest {
	deliverymanId: string;
}

type EResponse = Outcome<
	null,
	{
		packages: Package[];
	}
>;

export class FetchDeliverymanPackagesUseCase {
	constructor(private packagesRepository: IPackageRepository) {}

	async execute({ deliverymanId }: FetchDeliverymanPackagesRequest): Promise<EResponse> {
		const packages = await this.packagesRepository.findManyByDeliverymanId(deliverymanId);

		return success({ packages });
	}
}
