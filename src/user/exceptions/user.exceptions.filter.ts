import { Catch, HttpStatus } from '@nestjs/common';
import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import type { Request, Response } from 'express';
import { UserError } from './user.error';

@Catch(UserError)
export class UserExceptionsFilter implements ExceptionFilter {
  catch(exception: UserError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.BAD_REQUEST;

    if (request)
      response.status(status).json({
        statusCode: 400,
        ...(exception.message ? { message: exception.message } : {}),
      });
  }
}
