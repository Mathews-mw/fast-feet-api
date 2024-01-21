import { Recipient } from '@/domains/main/resources/entities/recipient';
import { IRecipientRepository } from '@/domains/main/application/repositories/implementations/IRecipientRepository';

export class InMemoryRecipientsRepository implements IRecipientRepository {
	public items: Recipient[] = [];

	async create(recipient: Recipient): Promise<Recipient> {
		this.items.push(recipient);

		return recipient;
	}

	async update(recipient: Recipient): Promise<void> {
		const recipientIndex = this.items.findIndex((item) => item.id === recipient.id);

		this.items[recipientIndex] = recipient;
	}

	async findByCpf(cpf: string): Promise<Recipient | null> {
		const recipient = this.items.find((recipient) => recipient.cpf === cpf);

		if (!recipient) {
			return null;
		}

		return recipient;
	}

	async findByEmail(email: string): Promise<Recipient | null> {
		const recipient = this.items.find((recipient) => recipient.email === email);

		if (!recipient) {
			return null;
		}

		return recipient;
	}
}
