import { Recipient } from '@/domains/models/entities/recipient';

export class RecipientPresenter {
	static toHTTP(data: Recipient) {
		return {
			id: data.id.toString(),
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
		};
	}
}
