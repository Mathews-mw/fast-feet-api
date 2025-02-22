import { inject, injectable } from 'tsyringe';

import { env } from '@/env';
import { failure, Outcome, success } from '@/core/outcome';
import { googleMapsApi } from '@/lib/axios/google-maps-api';
import { Recipient } from '@/domains/models/entities/recipient';
import containerKeysConfig from '@/config/container-keys-config';
import { BadRequestError } from '@/core/errors/bad-request-errors';
import { IRecipientRepository } from '../repositories/i-recipient-repository';
import { GoogleMapsCoordinates } from '@/shared/interfaces/google-maps-interfaces';

interface IRequest {
	name: string;
	email: string;
	phone: string;
	cpf: string;
	cep: string;
	street: string;
	number: string;
	complement?: string | null;
	district: string;
	city: string;
	state: string;
}

type Response = Outcome<BadRequestError, { recipient: Recipient }>;

@injectable()
export class CreateRecipientUseCase {
	constructor(
		@inject(containerKeysConfig.repositories.recipients_repository) private recipientsRepository: IRecipientRepository
	) {}

	async execute({
		name,
		email,
		phone,
		cpf,
		cep,
		street,
		number,
		complement,
		district,
		city,
		state,
	}: IRequest): Promise<Response> {
		const recipientAddress = `${street}, ${number} - ${district}, ${city} - ${state}, ${cep}`;

		const recipient = Recipient.create({
			name,
			email,
			phone,
			cpf,
			cep,
			street,
			number,
			complement,
			district,
			city,
			state,
			latitude: 0,
			longitude: 0,
		});

		const response = await googleMapsApi.get<GoogleMapsCoordinates>('/geocode/json', {
			params: {
				address: recipientAddress,
				key: env.GOOGLE_MAPS_API_KEY,
			},
		});

		if (response.data.status === 'OK') {
			const location = response.data.results[0].geometry.location;

			recipient.latitude = location.lat;
			recipient.longitude = location.lng;
		} else {
			return failure(new BadRequestError('Error fetching coordinates'));
		}

		await this.recipientsRepository.create(recipient);

		return success({ recipient });
	}
}
