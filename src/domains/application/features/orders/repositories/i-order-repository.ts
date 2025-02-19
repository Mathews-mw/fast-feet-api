import { Order } from '@/domains/models/entities/order';

export interface IOrderRepository {
	create(order: Order): Promise<Order>;
	update(order: Order): Promise<Order>;
	delete(order: Order): Promise<void>;
	findMany(): Promise<Order[]>;
	findManyByOwnerId(ownerId: string): Promise<Order[]>;
	findManyByRecipientId(recipientId: string): Promise<Order[]>;
	findById(id: string): Promise<Order | null>;
}
