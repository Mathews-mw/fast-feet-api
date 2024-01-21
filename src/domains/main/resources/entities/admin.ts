import { Optional } from '@/core/types/optionals';
import { IUserProps, User } from './user';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface IAdminProps extends IUserProps {
	isAdmin: boolean;
}

export class Admin extends User<IAdminProps> {
	public isAdmin() {
		return this.props.isAdmin;
	}

	static create(props: Optional<IAdminProps, 'createdAt'>, id?: UniqueEntityId) {
		const admin = new Admin(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id
		);

		return admin;
	}
}
