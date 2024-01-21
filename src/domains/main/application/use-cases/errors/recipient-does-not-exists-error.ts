export class RecipientDoesNotExistsError extends Error {
	constructor(identifier: string) {
		super(`Recipient with the CPF "${identifier}" does not exists. Please, provide a valid recipient`);
	}
}
