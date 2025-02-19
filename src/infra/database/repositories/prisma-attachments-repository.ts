import { prisma } from '../prisma';
import { AttachmentMapper } from './mappers/attachment-mapper';
import { Attachment } from '@/domains/models/entities/attachment';
import { IAttachmentRepository } from '@/domains/application/features/attachments/repositories/i-attachment-repository';

export class PrismaAttachmentsRepository implements IAttachmentRepository {
	async create(attachment: Attachment): Promise<Attachment> {
		const data = AttachmentMapper.toDatabase(attachment);

		await prisma.attachment.create({ data });

		return attachment;
	}

	async update(attachment: Attachment): Promise<Attachment> {
		const data = AttachmentMapper.toDatabase(attachment);

		await prisma.attachment.update({
			data,
			where: {
				id: attachment.id.toString(),
			},
		});

		return attachment;
	}

	async delete(attachment: Attachment): Promise<void> {
		await prisma.attachment.delete({
			where: {
				id: attachment.id.toString(),
			},
		});
	}

	async findMany(): Promise<Attachment[]> {
		const attachments = await prisma.attachment.findMany();

		return attachments.map(AttachmentMapper.toDomain);
	}

	async findById(id: string): Promise<Attachment | null> {
		const attachment = await prisma.attachment.findUnique({
			where: {
				id,
			},
		});

		if (!attachment) {
			return null;
		}

		return AttachmentMapper.toDomain(attachment);
	}

	async findByOrderId(orderId: string): Promise<Attachment | null> {
		const attachment = await prisma.attachment.findUnique({
			where: {
				orderId,
			},
		});

		if (!attachment) {
			return null;
		}

		return AttachmentMapper.toDomain(attachment);
	}
}
