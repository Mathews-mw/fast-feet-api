export class DeliverymanAlreadyExistsError extends Error {
	constructor(identifier: string) {
		super(`User with the CPF "${identifier}" already exists.`);
	}
}
