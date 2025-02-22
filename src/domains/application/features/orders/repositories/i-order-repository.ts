import { Order, OrderStatus } from '@/domains/models/entities/order';
import { OrderDetails } from '@/domains/models/entities/value-objects/order-details';

export interface IFindManyBuOwnerIdQuerySearch {
	ownerId: string;
	status?: OrderStatus;
}

export interface IFindManyBuOwnerIdResponse {
	amount: number;
	orders: Array<OrderDetails>;
}

export interface IOrderRepository {
	create(order: Order): Promise<Order>;
	update(order: Order): Promise<Order>;
	delete(order: Order): Promise<void>;
	findMany(): Promise<Order[]>;
	findManyByOwnerId(query: IFindManyBuOwnerIdQuerySearch): Promise<IFindManyBuOwnerIdResponse>;
	findManyByRecipientId(recipientId: string): Promise<Order[]>;
	findById(id: string): Promise<Order | null>;
	findWithDetails(id: string): Promise<OrderDetails | null>;
}
