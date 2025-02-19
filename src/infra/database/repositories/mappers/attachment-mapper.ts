import { Attachment as PrismaAttachment } from '@prisma/client';
import { Attachment } from '@/domains/models/entities/attachment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export class AttachmentMapper {
	static toDomain(data: PrismaAttachment): Attachment {
		return Attachment.create(
			{
				title: data.title,
				url: data.url,
				orderId: data.orderId ? new UniqueEntityId(data.orderId) : null,
			},
			new UniqueEntityId(data.id)
		);
	}

	static toDatabase(data: Attachment): PrismaAttachment {
		return {
			id: data.id.toString(),
			title: data.title,
			url: data.url,
			orderId: data.orderId ? data.orderId.toString() : null,
		};
	}
}
