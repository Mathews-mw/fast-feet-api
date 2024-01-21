import { Controller, Get } from '@nestjs/common';

@Controller('/check')
export class ApiHealthCheckController {
	@Get()
	async handle() {
		return { message: 'API is running everything ok.' };
	}
}
