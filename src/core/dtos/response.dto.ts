import { ApiProperty } from '@nestjs/swagger';
import type { IResponse } from '../interfaces/response.interface';

export class ResponseDto<Dto> implements IResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: Dto;

  constructor(
    statusCode: number,
    message: string,
    dto: any,
    dataName = 'data',
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this[dataName] = dto;
  }
}

export enum MessagesEnum {
  'ok' = 'SUCCESS',
}
