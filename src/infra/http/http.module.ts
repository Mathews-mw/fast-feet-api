import { Module } from '@nestjs/common';

import { ApiHealthCheckController } from './controllers/api-health-check.controller';

@Module({ controllers: [ApiHealthCheckController] })
export class HttpModule {}
