import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IAttachmentProps {
	title: string;
	url: string;
	orderId?: UniqueEntityId | null;
}

export class Attachment extends Entity<IAttachmentProps> {
	get title() {
		return this.props.title;
	}

	set title(title: string) {
		this.props.title = title;
	}

	get url() {
		return this.props.url;
	}

	set url(url: string) {
		this.props.url = url;
	}

	get orderId() {
		return this.props.orderId;
	}

	set orderId(orderId: UniqueEntityId | undefined | null) {
		this.props.orderId = orderId;
	}

	static create(props: IAttachmentProps, id?: UniqueEntityId) {
		const attachment = new Attachment(props, id);

		return attachment;
	}
}
