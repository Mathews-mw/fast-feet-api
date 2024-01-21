import { Deliveryman } from '@/domains/main/resources/entities/deliveryman';
import { IDeliverymanRepository } from '@/domains/main/application/repositories/implementations/IDeliverymanRepository';

export class InMemoryDeliverymansRepository implements IDeliverymanRepository {
	public items: Deliveryman[] = [];

	async create(deliveryman: Deliveryman): Promise<Deliveryman> {
		this.items.push(deliveryman);

		return deliveryman;
	}

	async update(deliveryman: Deliveryman): Promise<void> {
		const deliverymanIndex = this.items.findIndex((item) => item.id === deliveryman.id);

		this.items[deliverymanIndex] = deliveryman;
	}

	async findByCpf(cpf: string): Promise<Deliveryman | null> {
		const deliveryman = this.items.find((deliveryman) => deliveryman.cpf === cpf);

		if (!deliveryman) {
			return null;
		}

		return deliveryman;
	}

	async findByEmail(email: string): Promise<Deliveryman | null> {
		const deliveryman = this.items.find((deliveryman) => deliveryman.email === email);

		if (!deliveryman) {
			return null;
		}

		return deliveryman;
	}
}
