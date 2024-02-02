import { makePackage } from '../factories/make-package';
import { InMemoryPackagesRepository } from '../in-memory/in-memory-packages-repository';
import { UpdatePackageStatusUseCase } from '@/domains/main/application/use-cases/update-package-status';

let packagesRepository: InMemoryPackagesRepository;
let updatePackageStatusUseCase: UpdatePackageStatusUseCase;

describe('Update Package Status Use Case', () => {
	beforeEach(() => {
		packagesRepository = new InMemoryPackagesRepository();
		updatePackageStatusUseCase = new UpdatePackageStatusUseCase(packagesRepository);
	});

	it('Should be able to update package status to dispatched', async () => {
		const package_ = makePackage({});
		packagesRepository.items.push(package_);

		const result = await updatePackageStatusUseCase.execute({ packageId: package_.id.toValue(), status: 'dispatched' });

		const packageStatus = packagesRepository.items[0].status;

		expect(result.isSucces()).toBe(true);
		expect(packageStatus).toEqual('dispatched');
	});

	it('Should be able to update package status to delivered', async () => {
		const package_ = makePackage({});
		packagesRepository.items.push(package_);

		const result = await updatePackageStatusUseCase.execute({ packageId: package_.id.toValue(), status: 'delivered' });

		const packageStatus = packagesRepository.items[0].status;

		expect(result.isSucces()).toBe(true);
		expect(packageStatus).toEqual('delivered');
	});

	it('Should be able to update package status to returned', async () => {
		const package_ = makePackage({});
		packagesRepository.items.push(package_);

		const result = await updatePackageStatusUseCase.execute({ packageId: package_.id.toValue(), status: 'returned' });

		const packageStatus = packagesRepository.items[0].status;

		expect(result.isSucces()).toBe(true);
		expect(packageStatus).toEqual('returned');
	});
});
