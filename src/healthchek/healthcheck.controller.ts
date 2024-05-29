import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { IHealthCheckResponse } from './interfaces/healthcheck.interface';

@Controller({
  path: 'healthcheck',
})
@ApiTags('Monitoring')
export class HealthcheckController {
  @Get()
  public getStatus(): IHealthCheckResponse {
    return {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date(),
    };
  }
}
