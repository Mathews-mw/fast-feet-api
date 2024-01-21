export class AdminAlreadyExistsError extends Error {
	constructor(identifier: string) {
		super(`User with the CPF "${identifier}" already exists.`);
	}
}
