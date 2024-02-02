import { makePackage } from '../factories/make-package';
import { makeDeliveryman } from '../factories/make-deliveryman';
import { InMemoryPackagesRepository } from '../in-memory/in-memory-packages-repository';
import { FetchDeliverymanPackagesUseCase } from '@/domains/main/application/use-cases/fetch-deliveryman-packages';

let packagesRepository: InMemoryPackagesRepository;
let fetchDeliverymanPackagesUseCase: FetchDeliverymanPackagesUseCase;

describe('Fetch Deliveryman Packages Use Case', () => {
	beforeEach(() => {
		packagesRepository = new InMemoryPackagesRepository();
		fetchDeliverymanPackagesUseCase = new FetchDeliverymanPackagesUseCase(packagesRepository);
	});

	it('Should be able to list all packages from a specific deliveryman', async () => {
		const deliveryman = makeDeliveryman({});

		const package1 = makePackage({ deliverymanId: deliveryman.id });
		const package2 = makePackage({ deliverymanId: deliveryman.id });
		const package3 = makePackage({ deliverymanId: deliveryman.id });

		packagesRepository.items.push(package1);
		packagesRepository.items.push(package2);
		packagesRepository.items.push(package3);

		const result = await fetchDeliverymanPackagesUseCase.execute({ deliverymanId: deliveryman.id.toString() });

		expect(result.isSucces()).toBe(true);
		expect(result.value?.packages).toHaveLength(3);
		expect(result.value?.packages[0].deliverymanId).toEqual(deliveryman.id);
	});
});
