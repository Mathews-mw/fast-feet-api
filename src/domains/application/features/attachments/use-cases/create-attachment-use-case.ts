import { inject, injectable } from 'tsyringe';

import { Outcome, success } from '@/core/outcome';
import containerKeysConfig from '@/config/container-keys-config';
import { Attachment } from '@/domains/models/entities/attachment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { IAttachmentRepository } from '../repositories/i-attachment-repository';

interface IRequest {
	title: string;
	url: string;
	orderId?: string;
}

type Response = Outcome<null, { attachment: Attachment }>;

@injectable()
export class CreateAttachmentUseCase {
	constructor(
		@inject(containerKeysConfig.repositories.attachments_repository)
		private attachmentsRepository: IAttachmentRepository
	) {}

	async execute({ title, url, orderId }: IRequest): Promise<Response> {
		const newAttachment = Attachment.create({
			title,
			url,
			orderId: orderId ? new UniqueEntityId(orderId) : null,
		});

		await this.attachmentsRepository.create(newAttachment);

		return success({ attachment: newAttachment });
	}
}
