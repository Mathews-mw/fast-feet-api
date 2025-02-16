export class BadRequestError extends Error {
	constructor(message?: string) {
		super(message); // Passa a mensagem para a classe Error
		this.name = 'BadRequestError'; // Define o nome do erro corretamente

		// Corrige o prototype para manter a cadeia de herança correta
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}
