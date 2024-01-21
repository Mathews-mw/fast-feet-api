export class DeliverymanDoesNotExistsError extends Error {
	constructor(identifier: string) {
		super(`Deliveryman with the CPF "${identifier}" does not exists. Please, provide a valid deliveryman`);
	}
}
