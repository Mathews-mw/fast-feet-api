import { Package } from '@/domains/main/resources/entities/package';
import { IPackageRepository } from '@/domains/main/application/repositories/implementations/IPackageRepository';

export class InMemoryPackagesRepository implements IPackageRepository {
	public items: Package[] = [];

	async create(_package: Package): Promise<Package> {
		this.items.push(_package);

		return _package;
	}

	async update(_package: Package): Promise<void> {
		const packageIndex = this.items.findIndex((item) => item.id === _package.id);

		this.items[packageIndex] = _package;
	}

	async findById(packageId: string): Promise<Package | null> {
		const packageIndex = this.items.findIndex((item) => item.id.toString() === packageId);

		return this.items[packageIndex];
	}

	async findManyByDeliverymanId(deliverymanId: string): Promise<Package[]> {
		const packages = this.items.filter((_package) => _package.deliverymanId?.toString() === deliverymanId);

		return packages;
	}

	async findManyByRecipientId(recipientId: string): Promise<Package[]> {
		const packages = this.items.filter((_package) => _package.recipientId.toString() === recipientId);

		return packages;
	}
}
