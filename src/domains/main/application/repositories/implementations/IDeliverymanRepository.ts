import { Deliveryman } from '@/domains/main/resources/entities/deliveryman';

export abstract class IDeliverymanRepository {
	abstract create(deliveryman: Deliveryman): Promise<Deliveryman>;
	abstract update(deliveryman: Deliveryman): Promise<void>;
	abstract findByCpf(cpf: string): Promise<Deliveryman | null>;
	abstract findByEmail(email: string): Promise<Deliveryman | null>;
}
