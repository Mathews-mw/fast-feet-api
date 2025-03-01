export class ForbiddenError extends Error {
	constructor(message?: string) {
		super(message ?? 'Forbidden');
		this.name = 'ForbiddenError';

		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}
