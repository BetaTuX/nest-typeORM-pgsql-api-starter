import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  public catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(404).json({
      message: {
        statusCode: 404,
        error: 'Entity Not Found',
        message: exception.message,
      },
    });
  }
}
