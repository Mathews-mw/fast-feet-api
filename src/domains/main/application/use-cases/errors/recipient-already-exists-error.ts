export class RecipientAlreadyExistsError extends Error {
	constructor(identifier: string) {
		super(`Recipient with the CPF "${identifier}" already exists.`);
	}
}
