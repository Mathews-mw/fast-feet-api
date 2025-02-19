import { prisma } from '../prisma';
import { RecipientMapper } from './mappers/recipient-mapper';
import { Recipient } from '@/domains/models/entities/recipient';
import { IRecipientRepository } from '@/domains/application/features/recipients/repositories/i-recipient-repository';

export class PrismaRecipientsRepository implements IRecipientRepository {
	async create(recipient: Recipient): Promise<Recipient> {
		const data = RecipientMapper.toDatabase(recipient);

		await prisma.recipient.create({ data });

		return recipient;
	}

	async update(recipient: Recipient): Promise<Recipient> {
		const data = RecipientMapper.toDatabase(recipient);

		await prisma.recipient.update({
			data,
			where: {
				id: recipient.id.toString(),
			},
		});

		return recipient;
	}

	async delete(recipient: Recipient): Promise<void> {
		await prisma.recipient.delete({
			where: {
				id: recipient.id.toString(),
			},
		});
	}

	async findMany(): Promise<Recipient[]> {
		const recipients = await prisma.recipient.findMany();

		return recipients.map(RecipientMapper.toDomain);
	}

	async findById(id: string): Promise<Recipient | null> {
		const recipient = await prisma.recipient.findUnique({
			where: {
				id,
			},
		});

		if (!recipient) {
			return null;
		}

		return RecipientMapper.toDomain(recipient);
	}
}
