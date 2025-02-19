import { inject, injectable } from 'tsyringe';

import { failure, Outcome, success } from '@/core/outcome';
import containerKeysConfig from '@/config/container-keys-config';
import { Attachment } from '@/domains/models/entities/attachment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { IAttachmentRepository } from '../repositories/i-attachment-repository';

interface IRequest {
	id: string;
	title?: string;
	url?: string;
	orderId?: string;
}

type Response = Outcome<ResourceNotFoundError, { attachment: Attachment }>;

@injectable()
export class UpdateAttachmentUseCase {
	constructor(
		@inject(containerKeysConfig.repositories.attachments_repository)
		private attachmentsRepository: IAttachmentRepository
	) {}

	async execute({ id, title, url, orderId }: IRequest): Promise<Response> {
		const attachment = await this.attachmentsRepository.findById(id);

		if (!attachment) {
			return failure(new ResourceNotFoundError('Attachment not found'));
		}

		attachment.title = title ?? attachment.title;
		attachment.url = url ?? attachment.url;
		attachment.orderId = orderId ? new UniqueEntityId(orderId) : attachment.orderId;

		await this.attachmentsRepository.update(attachment);

		return success({ attachment });
	}
}
