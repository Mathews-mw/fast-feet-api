import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Package } from '@/domains/main/resources/entities/package';

export function makePackage(override: Partial<Package>, id?: UniqueEntityId) {
	const _package = Package.create(
		{
			recipientId: new UniqueEntityId(),
			deliverymanId: new UniqueEntityId(),
			status: 'waiting',
			...override,
		},
		id
	);

	return _package;
}
