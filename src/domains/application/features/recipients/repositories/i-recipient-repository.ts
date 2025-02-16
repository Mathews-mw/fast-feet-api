import { Recipient } from '@/domains/models/entities/recipient';

export interface IRecipientRepository {
	create(recipient: Recipient): Promise<Recipient>;
	update(recipient: Recipient): Promise<Recipient>;
	delete(recipient: Recipient): Promise<void>;
	findMany(): Promise<Recipient[]>;
	findById(id: string): Promise<Recipient | null>;
}
