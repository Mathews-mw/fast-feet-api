import { Package } from '@/domains/main/resources/entities/package';

export abstract class IPackageRepository {
	abstract create(_package: Package): Promise<Package>;
	abstract update(_package: Package): Promise<void>;
	abstract findManyByDeliverymanId(deliverymanId: string): Promise<Package[]>;
	abstract findManyByRecipientId(recipientId: string): Promise<Package[]>;
}
