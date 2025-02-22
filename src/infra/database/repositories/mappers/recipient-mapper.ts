import { Recipient as PrismaRecipient } from '@prisma/client';
import { Recipient } from '@/domains/models/entities/recipient';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export class RecipientMapper {
	static toDomain(data: PrismaRecipient): Recipient {
		return Recipient.create(
			{
				name: data.name,
				email: data.email,
				phone: data.phone,
				cpf: data.cpf,
				cep: data.cep,
				street: data.street,
				number: data.number,
				complement: data.complement,
				district: data.district,
				city: data.city,
				state: data.state,
				latitude: data.latitude,
				longitude: data.longitude,
			},
			new UniqueEntityId(data.id)
		);
	}

	static toDatabase(data: Recipient): PrismaRecipient {
		return {
			id: data.id.toString(),
			name: data.name,
			email: data.email,
			phone: data.phone,
			cpf: data.cpf,
			cep: data.cep,
			street: data.street,
			number: data.number,
			complement: data.complement ?? null,
			district: data.district,
			city: data.city,
			state: data.state,
			latitude: data.latitude,
			longitude: data.longitude,
		};
	}
}
