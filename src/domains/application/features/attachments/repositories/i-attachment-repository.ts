import { Attachment } from '@/domains/models/entities/attachment';

export interface IAttachmentRepository {
	create(attachment: Attachment): Promise<Attachment>;
	update(attachment: Attachment): Promise<Attachment>;
	delete(attachment: Attachment): Promise<void>;
	findMany(): Promise<Attachment[]>;
	findById(id: string): Promise<Attachment | null>;
	findByOrderId(orderId: string): Promise<Attachment | null>;
}
