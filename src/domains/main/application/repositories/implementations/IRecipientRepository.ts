import { Recipient } from '@/domains/main/resources/entities/recipient';

export abstract class IRecipientRepository {
	abstract create(recipient: Recipient): Promise<Recipient>;
	abstract update(recipient: Recipient): Promise<void>;
	abstract findByEmail(email: string): Promise<Recipient | null>;
	abstract findByCpf(cpf: string): Promise<Recipient | null>;
}
